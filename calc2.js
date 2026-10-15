/* Mở rộng lõi tính toán: tải tháp, quy đổi gió, p-y, Rayleigh, mỏi, jacket, trọng lực, móng nổi */
(function (root) {
  const C = root.CALC;
  const G = 9.81;
  const RHO_W = 1025;
  const RHO_A = 1.225;

  /* ---------- Tải gió lên tháp (profile lũy thừa) ---------- */
  C.towerDrag = function ({ V, hHub, alpha, Db, Dt, h0, Cd, d }) {
    const n = 60;
    const L = hHub - h0;
    if (!(L > 0)) return { F: 0, M: 0 };
    const dz = L / n;
    let F = 0, M = 0;
    for (let i = 0; i < n; i++) {
      const z = h0 + (i + 0.5) * dz;
      const D = Db + ((Dt - Db) * (z - h0)) / L;
      const v = V * Math.pow(z / hHub, alpha);
      const f = 0.5 * RHO_A * Cd * D * v * v * dz / 1000;
      F += f;
      M += f * (z + d);
    }
    return { F, M };
  };

  /* Tổng tải gió: rotor + tháp, tại đáy biển */
  C.windLoads = function (p) {
    const T = C.windThrust({ V: p.V, Dr: p.Dr, Ct: p.Ct }) * (p.k || 1);
    const tw = C.towerDrag({ V: p.V, hHub: p.hHub, alpha: p.alpha, Db: p.Db, Dt: p.Dt, h0: p.h0, Cd: p.Cd, d: p.d });
    return { T, Ft: tw.F, Mt: tw.M, F: T + tw.F, M: T * (p.hHub + p.d) + tw.M };
  };

  /* ---------- Quy đổi tốc độ gió (ISO 19901-1 / API RP 2MET) ---------- */
  C.isoIu = (U0, z) => 0.06 * (1 + 0.043 * U0) * Math.pow(z / 10, -0.22);
  C.isoU = (U0, z) => U0 * (1 + 0.0573 * Math.sqrt(1 + 0.15 * U0) * Math.log(z / 10));
  C.isoU3600 = (U0, z, t) => C.isoU(U0, z) * (1 - 0.41 * C.isoIu(U0, z) * Math.log(t / 3600));
  C.windConvert = function ({ v, z1, t1, z2, t2 }) {
    let lo = 0.01, hi = 200;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (C.isoU3600(mid, z1, t1) < v) lo = mid; else hi = mid;
    }
    const U0 = (lo + hi) / 2;
    return { U0, out: C.isoU3600(U0, z2, t2), Iu: C.isoIu(U0, z2) };
  };

  /* ---------- Sóng: lý thuyết thích hợp ---------- */
  C.waveTheory = function (H, T, d) {
    const w = C.waveProps(H, T, d);
    const Ur = (H * w.L * w.L) / Math.pow(d, 3);
    const Hd = H / d;
    let th;
    if (w.steep > w.steepMax) th = 'Sóng vượt độ dốc giới hạn: kiểm tra lại H và T.';
    else if (Ur < 15 && Hd < 0.4) th = 'Stokes bậc cao (bậc 2 đến 5). Airy chỉ đủ cho sóng nhỏ.';
    else if (Ur <= 40) th = 'Vùng chuyển tiếp: nên dùng hàm dòng bậc cao.';
    else th = 'Nước nông, sóng dài: dùng cnoidal hoặc hàm dòng bậc cao.';
    return { Ur, Hd, th };
  };

  /* ---------- Ống thép: ổn định vỏ (DNV-RP-C202 dạng giản lược) ---------- */
  C.shellBuckling = function ({ D, t, fy, E = 210000 }) {
    const R = (D - t) / 2;
    const sigE = 0.605 * E * (t / R);
    const lam2 = fy / sigE;
    const fks = fy / Math.sqrt(1 + lam2 * lam2);
    return { sigE, lam: Math.sqrt(lam2), fks, Dt: D / t };
  };

  /* ---------- Cọc: p-y API cho cát ---------- */
  C.apiSandCoeffs = function (phi) {
    const f = (phi * Math.PI) / 180, a = f / 2, b = Math.PI / 4 + f / 2;
    const K0 = 0.4, Ka = Math.pow(Math.tan(Math.PI / 4 - f / 2), 2);
    const tb = Math.tan(b), tbf = Math.tan(b - f);
    const C1 = (K0 * Math.tan(f) * Math.sin(b)) / (tbf * Math.cos(a)) + (tb / tbf) * tb * Math.tan(a) + K0 * tb * (Math.tan(f) * Math.sin(b) - Math.tan(a));
    const C2 = tb / tbf - Ka;
    const C3 = Ka * (Math.pow(tb, 8) - 1) + K0 * Math.tan(f) * Math.pow(tb, 4);
    return { C1, C2, C3 };
  };

  function solveLinear(A, b) {
    const n = b.length;
    for (let i = 0; i < n; i++) {
      let p = i;
      for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
      if (p !== i) { [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]]; }
      const piv = A[i][i];
      for (let r = i + 1; r < n; r++) {
        const f = A[r][i] / piv;
        if (f === 0) continue;
        for (let c = i; c < n; c++) A[r][c] -= f * A[i][c];
        b[r] -= f * b[i];
      }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let s = b[i];
      for (let c = i + 1; c < n; c++) s -= A[i][c] * x[c];
      x[i] = s / A[i][i];
    }
    return x;
  }

  /* Dầm trên nền Winkler phi tuyến. z hướng xuống từ đáy biển. Tải H (kN), M (kN·m) tại đầu cọc */
  C.pileResponse = function ({ EI, D, L, H, M, gp, phi, k, n = 70, EsConst }) {
    const h = L / n, N = n + 1;
    const co = C.apiSandCoeffs(phi);
    const pu = (z) => {
      if (z <= 0) return 0;
      return Math.min((co.C1 * z + co.C2 * D) * gp * z, co.C3 * D * gp * z);
    };
    let y = new Array(N).fill(0);
    let Es = new Array(N);
    for (let i = 0; i < N; i++) Es[i] = EsConst !== undefined ? EsConst : k * i * h + 1e-6;
    const w = EI / Math.pow(h, 4);
    const c1 = (h * h * M) / EI;
    const c2 = (2 * Math.pow(h, 3) * H) / EI;
    let iter = 0;
    for (; iter < 60; iter++) {
      const A = Array.from({ length: N }, () => new Array(N).fill(0));
      const b = new Array(N).fill(0);
      const coef = [1, -4, 6, -4, 1];
      for (let i = 0; i < N; i++) {
        for (let s = -2; s <= 2; s++) {
          const j = i + s, wc = w * coef[s + 2];
          if (j >= 0 && j <= n) A[i][j] += wc;
          else if (j === -1) { A[i][0] += 2 * wc; A[i][1] -= wc; b[i] -= wc * c1; }
          else if (j === -2) { A[i][0] += 4 * wc; A[i][1] -= 4 * wc; A[i][2] += wc; b[i] -= wc * (2 * c1 - c2); }
          else if (j === n + 1) { A[i][n] += 2 * wc; A[i][n - 1] -= wc; }
          else if (j === n + 2) { A[i][n] += 4 * wc; A[i][n - 1] -= 4 * wc; A[i][n - 2] += wc; }
        }
        A[i][i] += Es[i];
      }
      const ny = solveLinear(A, b);
      let diff = 0, mx = 0;
      for (let i = 0; i < N; i++) { diff = Math.max(diff, Math.abs(ny[i] - y[i])); mx = Math.max(mx, Math.abs(ny[i])); }
      for (let i = 0; i < N; i++) y[i] = 0.5 * y[i] + 0.5 * ny[i];
      if (EsConst !== undefined) { y = ny; break; }
      for (let i = 0; i < N; i++) {
        const z = i * h;
        const ap = 0.9 * pu(z); // tải chu kỳ A = 0,9
        const yy = Math.max(Math.abs(y[i]), 1e-9);
        Es[i] = ap > 0 ? (ap * Math.tanh((k * z * yy) / ap)) / yy : 1e-6;
      }
      if (diff < 1e-6 * Math.max(mx, 1e-6)) { iter++; break; }
    }
    const ym1 = 2 * y[0] - y[1] + c1;
    const theta0 = (y[1] - ym1) / (2 * h);
    const Mz = new Array(N);
    Mz[0] = M; Mz[n] = 0;
    for (let i = 1; i < n; i++) Mz[i] = (EI * (y[i - 1] - 2 * y[i] + y[i + 1])) / (h * h);
    let Mmax = 0, zM = 0;
    for (let i = 0; i < N; i++) if (Math.abs(Mz[i]) > Math.abs(Mmax)) { Mmax = Mz[i]; zM = i * h; }
    return { y, Mz, h, y0: y[0], theta0, yToe: y[n], Mmax, zM, iter };
  };

  /* ---------- Tần số riêng: Rayleigh, nhiều đoạn ---------- */
  C.rayleighFreq = function ({ secs, zSeabed, zMSL, zTop, Mrna, mg = 0, secondary = 0, E = 2.1e11, rho = 7850, nEl = 160 }) {
    const dz = zTop / nEl;
    const el = [];
    for (let i = 0; i < nEl; i++) {
      const z = (i + 0.5) * dz;
      const s = secs.find((q) => z >= q.z0 && z <= q.z1) || secs[secs.length - 1];
      const D = s.D0 + ((s.D1 - s.D0) * (z - s.z0)) / (s.z1 - s.z0);
      const di = D - 2 * s.t;
      const A = (Math.PI / 4) * (D * D - di * di);
      const I = (Math.PI / 64) * (Math.pow(D, 4) - Math.pow(di, 4));
      let m = rho * A * (1 + secondary);
      if (z >= zSeabed && z <= zMSL) m += RHO_W * (Math.PI / 4) * Math.pow(D + 2 * mg, 2);
      el.push({ z, EI: E * I, m: m * dz });
    }
    // lực quán tính tĩnh tỷ lệ khối lượng, tải đầu là RNA
    const wTop = Mrna * 1000;
    const Mo = new Array(nEl);
    for (let k = 0; k < nEl; k++) {
      const zk = k * dz;
      let s = wTop * (zTop - zk);
      for (let j = k; j < nEl; j++) s += el[j].m * (el[j].z - zk);
      Mo[k] = s;
    }
    const u = new Array(nEl + 1).fill(0);
    let th = 0;
    for (let k = 0; k < nEl; k++) {
      const kap = Mo[k] / el[k].EI;
      const th2 = th + kap * dz;
      u[k + 1] = u[k] + ((th + th2) / 2) * dz;
      th = th2;
    }
    let num = wTop * u[nEl], den = wTop * u[nEl] * u[nEl];
    let mTot = 0;
    for (let k = 0; k < nEl; k++) {
      const uk = (u[k] + u[k + 1]) / 2;
      num += el[k].m * uk; den += el[k].m * uk * uk; mTot += el[k].m;
    }
    const w2 = num / den;
    const shape = { z: el.map((e) => e.z), m: el.map((e) => e.m), u: el.map((_, k) => (u[k] + u[k + 1]) / 2), wTop, uTop: u[nEl], zTop };
    return { f: Math.sqrt(w2) / (2 * Math.PI), mStruct: mTot, uTop: u[nEl], shape };
  };

  /* ---------- Mỏi: đường cong S-N loại D (DNV-RP-C203) và cộng Miner ---------- */
  C.snN = function ({ S, curve, t, tref = 25, k = 0.2 }) {
    const Seff = S * Math.pow(Math.max(t, tref) / tref, k);
    if (curve === 'free') return Math.pow(10, 11.687) / Math.pow(Seff, 3);
    const a1 = curve === 'air' ? 12.164 : 11.764;
    const knee = curve === 'air' ? 1e7 : 1e6;
    const N1 = Math.pow(10, a1) / Math.pow(Seff, 3);
    if (N1 <= knee) return N1;
    return Math.pow(10, 15.606) / Math.pow(Seff, 5);
  };
  C.miner = function ({ bins, curve, t, scf, dff, years }) {
    const rows = bins.map((b) => {
      const S = b.S * scf;
      const N = C.snN({ S, curve, t });
      return { S, n: b.n, N, D: b.n / N };
    });
    const D = rows.reduce((a, r) => a + r.D, 0);
    return { rows, D, util: D * dff, life: D > 0 ? years / (D * dff) : Infinity };
  };

  /* ---------- Jacket ---------- */
  C.apiColumn = function ({ D, t, Lk, K, fy, E = 210000 }) {
    const s = C.tube(D, t);
    const r = Math.sqrt(s.I / s.A);
    const lam = ((K * Lk) / r / Math.PI) * Math.sqrt(fy / E);
    const Fxc = lam <= 1.34 ? fy * (1 - 0.25 * lam * lam) : (0.88 * fy) / (lam * lam);
    return { lam, Fxc, Rc: Fxc * s.A * 1000, Rt: fy * s.A * 1000, A: s.A, r, Dt: D / t };
  };

  /* ---------- Móng trọng lực: độ lún và xoay (đế cứng hình tròn trên bán không gian đàn hồi) ---------- */
  C.gbsElastic = function ({ Db, V, M, Es, nu }) {
    const a = Db / 2;
    const E = Es * 1000; // kPa
    const s = (V * (1 - nu * nu)) / (2 * a * E);
    const th = (3 * (1 - nu * nu) * M) / (4 * E * Math.pow(a, 3));
    return { s, th, thDeg: (th * 180) / Math.PI };
  };

  /* ---------- Móng nổi: spar, các chu kỳ riêng ---------- */
  C.sparPeriods = function ({ D, T, KG, Kmoor, C55 }) {
    const Vol = (Math.PI * D * D / 4) * T;
    const m = RHO_W * Vol;
    const Icyl = m * (D * D / 16 + T * T / 12) + m * Math.pow(T / 2 - KG, 2);
    const A55 = (RHO_W * Math.PI * D * D / 4) * ((Math.pow(T - KG, 3) + Math.pow(KG, 3)) / 3);
    const A11 = RHO_W * (Math.PI * D * D / 4) * T;
    const Tpitch = 2 * Math.PI * Math.sqrt((Icyl + A55) / (C55 * 1000));
    const Tsurge = Kmoor > 0 ? 2 * Math.PI * Math.sqrt((m + A11) / (Kmoor * 1000)) : NaN;
    return { Icyl, A55, A11, Tpitch, Tsurge, m };
  };

  /* ---------- Gió theo IEC 61400-3-1 ---------- */
  C.IEC_CLASS = { I: { Vref: 50, Vave: 10 }, II: { Vref: 42.5, Vave: 8.5 }, III: { Vref: 37.5, Vave: 7.5 }, T: { Vref: 57, Vave: NaN } };
  C.IEC_IREF = { 'A+': 0.18, A: 0.16, B: 0.14, C: 0.12 };
  /* Quy đổi 3 s <-> 10 phút theo IEC: V_e50 = gf · V_ref (gf = 1,4), cùng độ cao */
  C.iecConvert = function ({ v, z1, t1, z2, t2, alpha, gf }) {
    const isoTo600 = (val, z, t) => (t === 600 ? val : t === 3 ? val / gf : C.windConvert({ v: val, z1: z, t1: t, z2: z, t2: 600 }).out);
    const v10 = isoTo600(v, z1, t1) * Math.pow(z2 / z1, alpha);
    const out = (t) => (t === 600 ? v10 : t === 3 ? gf * v10 : C.windConvert({ v: v10, z1: z2, t1: 600, z2: z2, t2: t }).out);
    return { v10, out };
  };
  C.iecWindAt = function ({ Vref, z, zhub, alphaE, k1 = 0.8, gf = 1.4 }) {
    const V50 = Vref * Math.pow(z / zhub, alphaE);
    return { V50, V1: k1 * V50, Ve50: gf * V50, Ve1: k1 * gf * V50 };
  };
  C.iecSigma1 = (Iref, Vhub) => Iref * (0.75 * Vhub + 5.6);
  C.kaimalS1 = function ({ f, sigma1, z, Vhub }) {
    const L1 = z <= 60 ? 0.7 * z : 42;
    return 0.05 * sigma1 * sigma1 * Math.pow(L1 / Vhub, -2 / 3) * Math.pow(f, -5 / 3);
  };
  C.rayleighCdf = (V, Vave) => 1 - Math.exp(-Math.PI * Math.pow(V / (2 * Vave), 2));
  C.weibullCdf = (V, A, k) => 1 - Math.exp(-Math.pow(V / A, k));

  /* ---------- Thống kê sóng (Rayleigh) ---------- */
  C.waveStats = function ({ Hs, Tp, hours = 3 }) {
    const Tz = Tp / 1.28;
    const N = (hours * 3600) / Tz;
    return { Tz, N, Hmax: Hs * Math.sqrt(0.5 * Math.log(N)), Hmean: 0.627 * Hs };
  };
  /* Giới hạn vỡ theo Goda: Hb = 0,17 L0 {1 - exp[-1,5π d/L0 (1 + 15 tan^(4/3)α)]} */
  C.godaHb = function ({ T, d, slope }) {
    const L0 = (G * T * T) / (2 * Math.PI);
    return 0.17 * L0 * (1 - Math.exp(-1.5 * Math.PI * (d / L0) * (1 + 15 * Math.pow(slope, 4 / 3))));
  };
  /* Lực xung kích sóng vỡ: F = ½ Cs ρ D c² · λ η_b */
  C.slamming = function ({ D, c, Cs, lam, etaB }) {
    const q = 0.5 * Cs * RHO_W * D * c * c / 1000; // kN/m
    return { q, h: lam * etaB, F: q * lam * etaB };
  };
  /* Số Reynolds rút gọn và thông số ổn định VIV */
  C.viv = function ({ U, fn, D, me, delta }) {
    const Ur = fn > 0 && D > 0 ? U / (fn * D) : 0;
    const ks = (2 * me * delta) / (RHO_W * D * D);
    return { Ur, ks };
  };

  /* ---------- Phổ phản ứng gia tốc nền theo API RP 2A (5% cản) ---------- */
  C.apiSpectrum = function (T, soil) {
    const kk = { A: 1.8, B: 1.2, C: 0.8 }[soil] || 1.2;
    if (T <= 0.05) return 1;
    if (T <= 0.125) return 20 * T;
    return Math.min(2.5, kk / T);
  };

  /* ---------- Dạng dao động bằng phần tử dầm (Euler-Bernoulli, khối lượng nhất quán) ---------- */
  function choleskyL(M) {
    const n = M.length;
    const L = Array.from({ length: n }, () => new Float64Array(n));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        let s = M[i][j];
        for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
        L[i][j] = i === j ? Math.sqrt(s) : s / L[j][j];
      }
    }
    return L;
  }
  function jacobiEig(A, sweeps = 30) {
    const n = A.length;
    for (let sw = 0; sw < sweeps; sw++) {
      let off = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
      if (off < 1e-18) break;
      for (let p = 0; p < n - 1; p++) {
        for (let q = p + 1; q < n; q++) {
          const apq = A[p][q];
          if (Math.abs(apq) < 1e-300) continue;
          const th = (A[q][q] - A[p][p]) / (2 * apq);
          const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
          const c = 1 / Math.sqrt(t * t + 1), sn = t * c;
          for (let k = 0; k < n; k++) {
            const akp = A[k][p], akq = A[k][q];
            A[k][p] = c * akp - sn * akq; A[k][q] = sn * akp + c * akq;
          }
          for (let k = 0; k < n; k++) {
            const apk = A[p][k], aqk = A[q][k];
            A[p][k] = c * apk - sn * aqk; A[q][k] = sn * apk + c * aqk;
          }
        }
      }
    }
    return Array.from({ length: n }, (_, i) => A[i][i]).sort((a, b) => a - b);
  }
  /* secs như rayleighFreq. Trả về f1, f2 (Hz). Ngàm tại z = 0. */
  C.beamModes = function ({ secs, zSeabed, zMSL, zTop, Mrna, mg = 0, secondary = 0, E = 2.1e11, rho = 7850, nEl = 36 }) {
    const L = zTop / nEl;
    const N = nEl + 1;
    const nd = 2 * N;
    const K = Array.from({ length: nd }, () => new Float64Array(nd));
    const M = Array.from({ length: nd }, () => new Float64Array(nd));
    for (let e = 0; e < nEl; e++) {
      const z = (e + 0.5) * L;
      const s = secs.find((q) => z >= q.z0 && z <= q.z1) || secs[secs.length - 1];
      const D = s.D0 + ((s.D1 - s.D0) * (z - s.z0)) / (s.z1 - s.z0);
      const di = D - 2 * s.t;
      const A = (Math.PI / 4) * (D * D - di * di);
      const I = (Math.PI / 64) * (Math.pow(D, 4) - Math.pow(di, 4));
      let mm = rho * A * (1 + secondary);
      if (z >= zSeabed && z <= zMSL) mm += RHO_W * (Math.PI / 4) * Math.pow(D + 2 * mg, 2);
      const k0 = (E * I) / Math.pow(L, 3), m0 = (mm * L) / 420;
      const ke = [[12, 6 * L, -12, 6 * L], [6 * L, 4 * L * L, -6 * L, 2 * L * L], [-12, -6 * L, 12, -6 * L], [6 * L, 2 * L * L, -6 * L, 4 * L * L]];
      const me = [[156, 22 * L, 54, -13 * L], [22 * L, 4 * L * L, 13 * L, -3 * L * L], [54, 13 * L, 156, -22 * L], [-13 * L, -3 * L * L, -22 * L, 4 * L * L]];
      const idx = [2 * e, 2 * e + 1, 2 * e + 2, 2 * e + 3];
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { K[idx[i]][idx[j]] += k0 * ke[i][j]; M[idx[i]][idx[j]] += m0 * me[i][j]; }
    }
    M[2 * nEl][2 * nEl] += Mrna * 1000;
    // bỏ hai bậc tự do tại ngàm (nút 0)
    const n = nd - 2;
    const Kr = K.slice(2).map((r) => Array.from(r.slice(2)));
    const Mr = M.slice(2).map((r) => Array.from(r.slice(2)));
    const Lc = choleskyL(Mr);
    const fwd = (B) => { // giải L X = B (theo cột)
      const X = Array.from({ length: n }, () => new Float64Array(n));
      for (let c = 0; c < n; c++) {
        for (let i = 0; i < n; i++) {
          let s = B[i][c];
          for (let k = 0; k < i; k++) s -= Lc[i][k] * X[k][c];
          X[i][c] = s / Lc[i][i];
        }
      }
      return X;
    };
    const Y = fwd(Kr);
    const Yt = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Y[j][i]));
    const A = fwd(Yt).map((r) => Array.from(r));
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const m = 0.5 * (A[i][j] + A[j][i]); A[i][j] = m; A[j][i] = m; }
    const ev = jacobiEig(A);
    return { f: ev.slice(0, 3).map((x) => Math.sqrt(Math.max(x, 0)) / (2 * Math.PI)) };
  };

  /* ---------- Động đất: đóng góp dạng dao động thứ nhất, từ kết quả Rayleigh ---------- */
  C.seismicMode1 = function ({ shape, zSeabed, Sa }) {
    const { z, m, u, wTop, uTop, zTop } = shape;
    let num = wTop * uTop, den = wTop * uTop * uTop;
    for (let k = 0; k < z.length; k++) { num += m[k] * u[k]; den += m[k] * u[k] * u[k]; }
    const gam = num / den;
    const Ft = gam * wTop * uTop * Sa;
    let Vb = Ft, Mb = Ft * (zTop - zSeabed);
    for (let k = 0; k < z.length; k++) {
      if (z[k] < zSeabed) continue;
      const F = gam * m[k] * u[k] * Sa;
      Vb += F; Mb += F * (z[k] - zSeabed);
    }
    return { gam, V: Vb / 1000, M: Mb / 1000 };
  };

  /* ---------- Ví dụ bài giảng chương 4: Morison tại một pha, Airy không kéo dãn, dòng chảy (z+h)/h ^ 1/7 ---------- */
  C.morisonTable = function ({ H, T, h, D, CD, CM, Uc0, phase, rho = 1025, dzTab = 5, nInt = 3000 }) {
    const g = 9.81, w = (2 * Math.PI) / T;
    const k = C.waveNumber(T, h);
    const at = (zAbs) => {                          /* zAbs: cao độ so với MSL (âm xuống đáy) */
      const ch = Math.cosh(k * (zAbs + h)) / Math.sinh(k * h);
      const uw = (H / 2) * w * ch * Math.cos(phase);
      const aw = (H / 2) * w * w * ch * Math.sin(phase);
      const uc = Uc0 * Math.pow(Math.max(zAbs + h, 0) / h, 1 / 7);
      const ur = uw + uc;
      const fD = 0.5 * rho * CD * D * Math.abs(ur) * ur / 1000;       /* kN/m */
      const fI = rho * CM * (Math.PI * D * D / 4) * aw / 1000;        /* kN/m */
      return { z: zAbs, uw, aw, uc, ur, fD, fI, f: fD + fI };
    };
    const rows = [];
    for (let z = 0; z >= -h - 1e-9; z -= dzTab) rows.push(at(z));
    /* hình thang theo bảng (như slide) */
    let Ft = 0, Mt = 0, FD = 0, FI = 0;
    for (let i = 0; i < rows.length - 1; i++) {
      const a = rows[i], b = rows[i + 1], dz = a.z - b.z;
      Ft += 0.5 * (a.f + b.f) * dz; FD += 0.5 * (a.fD + b.fD) * dz; FI += 0.5 * (a.fI + b.fI) * dz;
      Mt += 0.5 * (a.f * (a.z + h) + b.f * (b.z + h)) * dz;
    }
    /* tích phân chi tiết */
    let Fc = 0, Mc = 0;
    const dz = h / nInt;
    for (let i = 0; i < nInt; i++) {
      const r = at(-h + (i + 0.5) * dz);
      Fc += r.f * dz; Mc += r.f * dz * (r.z + h);
    }
    return { k, L: (2 * Math.PI) / k, w, rows, F: Ft, M: Mt / 1000, FD, FI, Fc, Mc: Mc / 1000 };
  };

  /* Tải gió lên tuabin 8 MW trên monopile: T, nacelle, tháp (đường kính thay đổi tuyến tính), mô men tại đáy biển */
  C.windMonopile = function ({ DR, zhub, V, alpha, CT, CDn, AN, Dtb, Dtt, Ht, CDt, h, rho = 1.225 }) {
    const T = (0.5 * rho * (Math.PI * DR * DR / 4) * CT * V * V) / 1000;
    const FN = (0.5 * rho * CDn * AN * V * V) / 1000;
    let Ft = 0, Mz = 0;
    const n = 2000;
    for (let i = 0; i < n; i++) {
      const z = ((i + 0.5) * Ht) / n;
      const D = Dtb + ((Dtt - Dtb) * z) / Ht;
      const v = V * Math.pow(z / zhub, alpha);
      const p = (0.5 * rho * CDt * D * v * v) / 1000;
      Ft += (p * Ht) / n; Mz += (p * z * Ht) / n;
    }
    const zt = Ft > 0 ? Mz / Ft : 0;
    const Mm = (T * (zhub + h) + FN * (zhub + h) + Ft * (zt + h)) / 1000;
    return { T, FN, FT: Ft, zT: zt, F: T + FN + Ft, M: Mm };
  };

  /* Tổ hợp tải đồng thời (vector) và kiểm tra ULS */
  C.vecCombine = function ({ N, Vx, Vy, Mx, My, Tq, gf, MR }) {
    const d = { N: N * gf, Vx: Vx * gf, Vy: Vy * gf, Mx: Mx * gf, My: My * gf, T: Tq * gf };
    const Vd = Math.hypot(d.Vx, d.Vy), Mb = Math.hypot(d.Mx, d.My);
    return { d, Vd, Mb, UR: MR > 0 ? Mb / MR : NaN };
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

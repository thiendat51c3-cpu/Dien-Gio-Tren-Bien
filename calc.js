/* Hàm tính thuần (không phụ thuộc DOM). Đơn vị: m, s, kN, kN·m, kPa, kN/m3 */
(function (root) {
  const G = 9.81;
  const RHO_W = 1025;
  const RHO_A = 1.225;
  const C = {};

  /* ---------- Sóng ---------- */
  C.waveNumber = function (T, d) {
    const w = (2 * Math.PI) / T;
    let k = (w * w) / G;
    for (let i = 0; i < 200; i++) {
      const th = Math.tanh(k * d);
      const f = G * k * th - w * w;
      const df = G * th + (G * k * d) / Math.pow(Math.cosh(k * d), 2);
      let kn = k - f / df;
      if (!(kn > 0)) kn = k / 2;
      if (Math.abs(kn - k) < 1e-12) { k = kn; break; }
      k = kn;
    }
    return k;
  };

  C.waveProps = function (H, T, d) {
    const k = C.waveNumber(T, d);
    const L = (2 * Math.PI) / k;
    const c = L / T;
    const kd = k * d;
    const ratio = d / L;
    const regime = ratio > 0.5 ? 'sâu' : ratio < 0.05 ? 'nông' : 'trung gian';
    const Hb = 0.78 * d;
    return {
      k, L, c, kd, ratio, regime, Hb,
      steep: H / L,
      steepMax: 0.142 * Math.tanh(kd),
    };
  };

  /* Lực Morison lên trụ đứng tại pha theta (rad), kéo dãn Wheeler */
  C.cylForce = function (p, theta) {
    const { d, H, T, D, CD, CM } = p;
    const rho = p.rho || RHO_W;
    const w = (2 * Math.PI) / T;
    const k = p.k || C.waveNumber(T, d);
    const eta = (H / 2) * Math.cos(theta);
    const zBot = -d;
    const n = p.n || 120;
    const dz = (eta - zBot) / n;
    const sh = Math.sinh(k * d);
    let F = 0, M = 0;
    for (let i = 0; i < n; i++) {
      const z = zBot + (i + 0.5) * dz;
      const zs = (d * (z - eta)) / (d + eta);
      const ch = Math.cosh(k * (zs + d)) / sh;
      const u = (H / 2) * w * ch * Math.cos(theta);
      const a = (H / 2) * w * w * ch * Math.sin(theta);
      const dF = 0.5 * rho * CD * D * u * Math.abs(u) + rho * CM * (Math.PI * D * D / 4) * a;
      F += dF * dz;
      M += dF * dz * (z + d);
    }
    return { F: F / 1000, M: M / 1000 };
  };

  /* Quét pha, cộng lực của nhiều trụ (legs: [{x, D}]) */
  C.envLoads = function (p) {
    const k = C.waveNumber(p.T, p.d);
    const legs = p.legs;
    const mult = 1 + (p.kb || 0);
    const steps = 180;
    const curve = [];
    let Fmax = 0, MatF = 0, Mmax = 0, thF = 0;
    for (let i = 0; i < steps; i++) {
      const th = (2 * Math.PI * i) / steps;
      let F = 0, M = 0;
      for (const lg of legs) {
        const r = C.cylForce({ d: p.d, H: p.H, T: p.T, D: lg.D, CD: p.CD, CM: p.CM, k }, th + k * lg.x);
        F += r.F; M += r.M;
      }
      F *= mult; M *= mult;
      curve.push({ th: (th * 180) / Math.PI, F, M });
      if (Math.abs(F) > Math.abs(Fmax)) { Fmax = F; MatF = M; thF = (th * 180) / Math.PI; }
      if (Math.abs(M) > Math.abs(Mmax)) Mmax = M;
    }
    return { Fmax: Math.abs(Fmax), Mmax: Math.abs(Mmax), MatF: Math.abs(MatF), thF, curve, k };
  };

  /* ---------- Gió ---------- */
  C.windThrust = function ({ V, Dr, Ct }) {
    return (0.5 * RHO_A * (Math.PI * Dr * Dr / 4) * Ct * V * V) / 1000;
  };
  C.windAt = function (Vref, zref, z, alpha) {
    return Vref * Math.pow(z / zref, alpha);
  };

  /* ---------- Monopile ---------- */
  C.tube = function (D, t) {
    const di = D - 2 * t;
    const A = (Math.PI / 4) * (D * D - di * di);
    const I = (Math.PI / 64) * (Math.pow(D, 4) - Math.pow(di, 4));
    return { A, I, W: I / (D / 2) };
  };

  C.monopileStress = function ({ D, t, Md, Nd, fy, gM }) {
    const s = C.tube(D, t);
    const sig = (Md / s.W + Nd / s.A) / 1000; // kPa -> MPa
    const res = fy / gM;
    return { sigma: sig, resist: res, util: sig / res, W: s.W, A: s.A, I: s.I };
  };

  C.bromsLength = function ({ H, M, gp, D, phi, FS }) {
    const Kp = Math.pow(Math.tan(((45 + phi / 2) * Math.PI) / 180), 2);
    const e = M / H;
    const Hu = (L) => (0.5 * gp * D * L * L * L * Kp) / (e + L);
    const need = FS * H;
    if (Hu(400) < need) return { L: null, Kp, e };
    let lo = 0.1, hi = 400;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (Hu(mid) < need) lo = mid; else hi = mid;
    }
    return { L: hi, Kp, e };
  };

  /* ---------- Tần số ---------- */
  C.cantileverFreq = function ({ D, t, Leff, Mrna, E = 210e9, rho = 7850 }) {
    const s = C.tube(D, t);
    const EI = E * s.I;
    const mTot = rho * s.A * Leff;
    const Meff = Mrna * 1000 + 0.2357 * mTot;
    const f = (1 / (2 * Math.PI)) * Math.sqrt((3 * EI) / (Math.pow(Leff, 3) * Meff));
    return { f, EI, mTot, Meff };
  };

  C.freqWindow = function ({ f1, rpmMin, rpmMax, margin }) {
    const m = margin;
    const p1 = [(rpmMin / 60) * (1 - m), (rpmMax / 60) * (1 + m)];
    const p3 = [((3 * rpmMin) / 60) * (1 - m), ((3 * rpmMax) / 60) * (1 + m)];
    let zone, ok;
    if (f1 >= p1[0] && f1 <= p1[1]) { zone = 'Rơi vào dải 1P'; ok = false; }
    else if (f1 >= p3[0] && f1 <= p3[1]) { zone = 'Rơi vào dải 3P'; ok = false; }
    else if (f1 < p1[0]) { zone = 'Soft-soft (dưới 1P)'; ok = true; }
    else if (f1 < p3[0]) { zone = 'Soft-stiff (giữa 1P và 3P)'; ok = true; }
    else { zone = 'Stiff-stiff (trên 3P)'; ok = true; }
    return { p1, p3, zone, ok };
  };

  /* ---------- Jacket ---------- */
  C.jacketLegs = function ({ N, M, B, dir }) {
    const k = dir === 'diag' ? 1 / Math.SQRT2 : 0.5;
    const dN = (M * k) / B;
    return { comp: N / 4 + dN, tens: N / 4 - dN, dN };
  };

  C.pileTensionLength = function ({ Q, Dp, FS, soil, beta, gp, alpha, su }) {
    const need = Q * FS;
    if (need <= 0) return { L: 0 };
    if (soil === 'sand') {
      return { L: Math.sqrt((2 * need) / (Math.PI * Dp * beta * gp)) };
    }
    return { L: need / (Math.PI * Dp * alpha * su) };
  };

  /* ---------- Móng trọng lực ---------- */
  C.gbs = function ({ Db, V, H, M, soil, phi, su, gp, Df }) {
    const R = Db / 2;
    const e = M / V;
    if (e >= R) return { fail: 'Lệch tâm vượt bán kính đáy: móng bị lật.', e };
    const Aeff = 2 * (R * R * Math.acos(e / R) - e * Math.sqrt(R * R - e * e));
    const Deq = Math.sqrt((4 * Aeff) / Math.PI);
    const q0 = gp * Df;
    let qu, Rh;
    const ph = (phi * Math.PI) / 180;
    if (soil === 'sand') {
      const Nq = Math.exp(Math.PI * Math.tan(ph)) * Math.pow(Math.tan(Math.PI / 4 + ph / 2), 2);
      const Ng = 2 * (Nq + 1) * Math.tan(ph);
      const sq = 1 + Math.tan(ph);
      const sg = 0.6;
      const iq = Math.pow(Math.max(0, 1 - (0.5 * H) / V), 5);
      const ig = Math.pow(Math.max(0, 1 - (0.7 * H) / V), 5);
      qu = q0 * Nq * sq * iq + 0.5 * gp * Deq * Ng * sg * ig;
      const delta = Math.atan((2 / 3) * Math.tan(ph));
      Rh = V * Math.tan(delta);
    } else {
      const Nc = 5.14;
      const lim = H / (Aeff * su);
      const ic = lim >= 1 ? 0 : 0.5 * (1 + Math.sqrt(1 - lim));
      qu = su * Nc * 1.2 * ic + q0;
      Rh = su * Aeff;
    }
    return {
      e, Aeff, Deq, qu,
      Qult: qu * Aeff,
      FSb: (qu * Aeff) / V,
      FSs: Rh / H,
      FSo: (V * R) / M,
      core: Db / 8,
      Rh,
    };
  };

  /* ---------- Móng nổi (spar trụ tròn) ---------- */
  C.spar = function ({ D, T, KG, thrust, hHub }) {
    const Vol = (Math.PI * D * D / 4) * T;
    const disp = (RHO_W * Vol) / 1000; // tấn
    const KB = T / 2;
    const BM = (D * D) / (16 * T);
    const GM = KB + BM - KG;
    const Awp = (Math.PI * D * D) / 4;
    const C55 = RHO_W * G * Vol * GM / 1000; // kN·m/rad
    const arm = hHub + T - KG;
    const Mth = thrust * arm;
    const heel = GM > 0 ? ((Mth / C55) * 180) / Math.PI : NaN;
    const m = RHO_W * Vol;
    const A33 = (RHO_W * Math.pow(D, 3)) / 3;
    const Th = 2 * Math.PI * Math.sqrt((m + A33) / (RHO_W * G * Awp));
    return { Vol, disp, KB, BM, GM, C55, arm, Mth, heel, Th };
  };

  root.CALC = C;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== Giao diện ứng dụng (phiên bản 2) ===== */
const LS = 'mdgb.v1';
const store = { tab: 'hoc', calc: 'chung', vals: {}, known: {}, best: 0, dir: 'en', fcg: 'all', kng: 'all', qch: 'all', qlv: 0, qn: 10, tcsec: 'topic' };
function load() {
  try { const s = localStorage.getItem(LS); if (s) Object.assign(store, JSON.parse(s)); } catch (e) { /* bỏ qua */ }
}
function save() {
  try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) { /* bỏ qua */ }
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = (x, d = 0) => (isFinite(x) ? x.toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d }) : '–');
const sci = (x) => (isFinite(x) ? x.toExponential(2).replace('e+', '·10^').replace('.', ',') : '–');
const $ = (s, r = document) => r.querySelector(s);

/* ---------- Định nghĩa trường nhập ---------- */
const FIELD = {};
function fd(id, lb, u, d, hint) { FIELD[id] = { id, lb, u, d, hint }; return id; }
function fsel(id, lb, opts, d, hint) { FIELD[id] = { id, lb, sel: opts, d, hint }; return id; }

const BIN_S = [5, 10, 15, 20, 30, 40];
const BIN_N = [1e8, 3e7, 8e6, 2e6, 3e5, 4e4];

const MODS = [
  {
    id: 'chung', nm: 'Chung và sóng',
    intro: 'Điều kiện địa điểm, tua bin, tháp và hệ số thủy động dùng chung cho mọi mô-đun. Nhập một lần ở đây.',
    groups: [
      { h: 'Địa điểm và sóng', f: [
        fd('d', 'Độ sâu nước tại mực nước tĩnh', 'm', 25),
        fd('Hs', 'H_s chu kỳ lặp 50 năm', 'm', 6.26, 'dự án mẫu (bài giảng, slide 29)'),
        fd('kH', 'Tỷ số H_max / H_s', '', 1.647, 'dự án mẫu 10,31 / 6,26. IEC: 1,86'),
        fd('Tp', 'Chu kỳ sóng đi kèm H_max', 's', 9.44, 'dự án mẫu: 9,44 s'),
        fd('Tpk', 'Chu kỳ đỉnh phổ T_p', 's', 11.03, 'dự án mẫu; để so với tần số riêng'),
        fd('slope', 'Độ dốc đáy biển tan α', '', 0.01, 'dùng cho giới hạn vỡ Goda'),
        fd('mg', 'Chiều dày sinh vật bám', 'mm', 50, 'cộng vào đường kính thủy động'),
      ] },
      { h: 'Dòng chảy (DnV)', f: [
        fd('c_vT', 'Dòng chảy thủy triều ở mặt nước', 'm/s', 0.6, 'giả định, lấy từ khảo sát hải văn'),
        fd('c_vW', 'Dòng chảy do gió ở mặt nước', 'm/s', 0.4, 'giả định'),
        fd('c_h0', 'Chiều sâu chịu dòng chảy do gió h₀', 'm', 50, 'DnV: 50 m'),
      ] },
      { h: 'Tua bin và gió', f: [
        fd('hHub', 'Cao độ trục rotor so với MSL', 'm', 110),
        fd('Dr', 'Đường kính rotor', 'm', 200),
        fd('Vw', 'Tốc độ gió tại trục rotor', 'm/s', 11, 'trung bình 10 phút'),
        fd('Ct', 'Hệ số lực đẩy C_t', '', 0.8, 'khoảng 0,8 ở định mức'),
        fd('alpha', 'Hệ số mũ profile gió α (thường)', '', 0.151, 'dự án mẫu 0,151. IEC NWP ngoài khơi: 0,14'),
        fd('alphaE', 'Hệ số mũ profile gió cực hạn', '', 0.11, 'IEC EWM: 0,11'),
      ] },
      { h: 'Tháp', f: [
        fd('tw_h0', 'Cao độ chân tháp so với MSL', 'm', 20),
        fd('tw_Db', 'Đường kính chân tháp', 'm', 6.5),
        fd('tw_Dt', 'Đường kính đỉnh tháp', 'm', 4.2),
        fd('tw_Cd', 'Hệ số cản gió của tháp', '', 0.7),
      ] },
      { h: 'Hệ số thủy động (Morison)', f: [
        fd('CD', 'Hệ số cản C_D', '', 1.05, 'trụ nhám (API); trụ nhẵn 0,65'),
        fd('CM', 'Hệ số quán tính C_M', '', 1.2, 'trụ nhám (API); trụ nhẵn 1,6'),
      ] },
      { h: 'Sóng vỡ (tải xung kích)', f: [
        fd('sl_Cs', 'Hệ số xung kích C_s', '', 5, 'bài giảng: 3 đến 7'),
        fd('sl_lam', 'Hệ số cuộn sóng λ', '', 0.46, 'theo IEC, kiểm tra bản gốc'),
        fd('sl_eta', 'η_b / H_b', '', 0.7, 'cao đỉnh sóng vỡ, theo IEC'),
      ] },
    ],
    formulas: `<p>Bước sóng từ phương trình tán sắc: <span class="eq">ω² = g·k·tanh(k·d)</span>, <span class="eq">L = 2π/k</span>, <span class="eq">c = L/T</span>.</p>
<p>Giới hạn vỡ: <span class="eq">H_b ≈ 0,78·d</span>. Độ dốc giới hạn Miche: <span class="eq">(H/L)_max = 0,142·tanh(k·d)</span>.</p>
<p>Số Ursell: <span class="eq">U_r = H·L²/d³</span>. Dùng để chọn lý thuyết sóng. Tọa độ H/(g·T²) và d/(g·T²) dùng để tra đồ thị API (bài giảng, slide 14).</p>
<p>Thống kê sóng: <span class="eq">H_max = H_s·√(0,5·ln N)</span>, <span class="eq">N = τ/T_z</span>, <span class="eq">T_p = 1,28·T_z</span>.</p>
<p>Giới hạn vỡ Goda: <span class="eq">H_b = 0,17·L₀·{1 − exp[−1,5π·(d/L₀)·(1 + 15·tan^(4/3)α)]}</span>.</p>
<p>Dòng chảy (DnV): <span class="eq">v_c(z) = v_T·((h − z)/h)^(1/7) + v_W·((h₀ − z)/h₀)</span>, z là độ sâu dưới mặt nước. Morison có dòng chảy: <span class="eq">q = ½·ρ·C_D·D·|u + v_c|·(u + v_c) + ρ·C_M·(π·D²/4)·a</span>.</p>
<p>Xung kích sóng vỡ: <span class="eq">F_s = ½·C_s·ρ·D·c²·λ·η_b</span>, với c là vận tốc truyền sóng.</p>
<p>Lực đẩy rotor: <span class="eq">T = ½·ρ_a·(π·D_r²/4)·C_t·V²</span>, ρ_a = 1,225 kg/m³.</p>
<p>Lực gió lên tháp: <span class="eq">dF = ½·ρ_a·C_d·D(z)·V(z)²·dz</span>, <span class="eq">V(z) = V_hub·(z/z_hub)^α</span>.</p>`,
  },
  {
    id: 'gio', nm: 'Quy đổi gió',
    intro: 'Đổi tốc độ gió giữa gió giật 3 giây và trung bình 10 phút, và giữa các độ cao, theo IEC 61400-3-1 (gió giật 3 giây = 1,4 × trung bình 10 phút). Có bảng đối chiếu ISO 19901-1.',
    groups: [
      { h: 'Số liệu đã có', f: [
        fd('gv_v', 'Tốc độ gió', 'm/s', 75.05, 'dự án mẫu: giật 3 giây, 50 năm'),
        fd('gv_z1', 'Độ cao đo', 'm', 110),
        fsel('gv_t1', 'Thời gian lấy trung bình', [['3', 'Giật 3 giây'], ['60', '1 phút'], ['120', '2 phút'], ['600', '10 phút'], ['3600', '1 giờ']], '3'),
      ] },
      { h: 'Cần quy đổi về', f: [
        fd('gv_z2', 'Độ cao cần', 'm', 110, 'trục rotor'),
        fsel('gv_t2', 'Thời gian lấy trung bình', [['3', 'Giật 3 giây'], ['60', '1 phút'], ['120', '2 phút'], ['600', '10 phút'], ['3600', '1 giờ']], '600'),
      ] },
      { h: 'Tham số', f: [
        fd('gv_g', 'Hệ số giật 3 giây / 10 phút', '', 1.4, 'IEC: 1,4'),
        fd('gv_a', 'Hệ số mũ profile gió', '', 0.11, 'cực hạn IEC: 0,11'),
      ] },
    ],
    formulas: `<p>IEC 61400-3-1: <span class="eq">V_e50(z) = 1,4·V_ref·(z/z_hub)^0,11</span>, <span class="eq">V_e1 = 0,8·V_e50</span>. Hệ số 1,4 nối gió giật 3 giây với trung bình 10 phút tại cùng độ cao.</p>
<p>Đổi độ cao: <span class="eq">V(z₂) = V(z₁)·(z₂/z₁)^α</span>.</p>
<p>Với thời gian khác (1 phút, 2 phút, 1 giờ), IEC không đưa hệ số. Ứng dụng dùng quan hệ ISO 19901-1 để đổi từ hoặc về 10 phút: <span class="eq">U(z) = U₀·[1 + C·ln(z/10)]</span>, <span class="eq">C = 0,0573·√(1 + 0,15·U₀)</span>, <span class="eq">I_u = 0,06·(1 + 0,043·U₀)·(z/10)^(−0,22)</span>, <span class="eq">u(z,t) = U(z)·[1 − 0,41·I_u·ln(t/3600)]</span>.</p>`,
  },
  {
    id: 'iec', nm: 'Gió IEC',
    intro: 'Hạng tua bin IEC, V_ref, gió cực hạn V_e50 và V_e1 theo độ cao, cường độ rối, phổ Kaimal và xác suất theo phân bố Weibull hoặc Rayleigh.',
    groups: [
      { h: 'Hạng tua bin', f: [
        fsel('iec_cls', 'Hạng tua bin', [['I', 'I (V_ref 50 m/s)'], ['II', 'II (V_ref 42,5 m/s)'], ['III', 'III (V_ref 37,5 m/s)'], ['T', 'T, bão nhiệt đới (V_ref 57 m/s)'], ['S', 'S, nhà thiết kế quy định']], 'S'),
        fd('iec_Vs', 'V_ref hạng S', 'm/s', 53.62, 'dự án mẫu: trung bình 10 phút, 50 năm'),
        fsel('iec_I', 'Hạng rối I_ref', [['A+', 'A+ (0,18)'], ['A', 'A (0,16)'], ['B', 'B (0,14)'], ['C', 'C (0,12)']], 'B'),
      ] },
      { h: 'Phân bố gió dài hạn', f: [
        fd('iec_A', 'Weibull A', 'm/s', 5.87, 'dự án mẫu'),
        fd('iec_k', 'Weibull k', '', 1.709, 'dự án mẫu'),
        fd('iec_Vave', 'V_ave (cho Rayleigh)', 'm/s', 5.8, 'trung bình năm tại trục'),
        fd('iec_Vin', 'Gió khởi động V_in', 'm/s', 3),
        fd('iec_Vout', 'Gió dừng V_out', 'm/s', 25),
      ] },
    ],
    formulas: `<p>Hạng tua bin (IEC 61400-1, dẫn lại trong bài giảng): I, II, III có V_ref = 50; 42,5; 37,5 m/s và V_ave = 10; 8,5; 7,5 m/s. Hạng T dùng V_ref = 57 m/s cho vùng bão nhiệt đới.</p>
<p>Gió cực hạn: <span class="eq">V_50(z) = V_ref·(z/z_hub)^0,11</span> (10 phút), <span class="eq">V_e50(z) = 1,4·V_50(z)</span> (3 giây), <span class="eq">V_1 = 0,8·V_50</span>, <span class="eq">V_e1 = 0,8·V_e50</span>.</p>
<p>Rối thường: <span class="eq">σ₁ = I_ref·(0,75·V_hub + b)</span>, b = 5,6 m/s. Phổ Kaimal: <span class="eq">S₁(f) = 0,05·σ₁²·(Λ₁/V_hub)^(−2/3)·f^(−5/3)</span>, Λ₁ = 0,7·z nếu z ≤ 60 m, bằng 42 m nếu z ≥ 60 m.</p>
<p>Phân bố: Rayleigh <span class="eq">P(V) = 1 − exp[−π·(V/(2·V_ave))²]</span>; Weibull <span class="eq">P(V) = 1 − exp[−(V/A)^k]</span>.</p>`,
  },
  {
    id: 'dlc', nm: 'DLC',
    intro: 'Bảng tổng hợp các tổ hợp tải cực hạn chính và xác định trường hợp chi phối mô men đáy. Đặt "Dùng DLC chi phối" thành Bật để các mô-đun móng tính theo trường hợp đó.',
    groups: [
      { h: 'Chọn móng và chế độ', f: [
        fsel('dl_type', 'Loại móng tính tải sóng', [['mono', 'Monopile'], ['jac', 'Jacket'], ['gbs', 'Trọng lực']], 'mono'),
        fsel('dl_use', 'Dùng DLC chi phối cho các mô-đun', [['off', 'Tắt'], ['on', 'Bật']], 'off'),
      ] },
      { h: 'Vận hành (DLC 1.3 và 1.6)', f: [
        fd('dl_Vr', 'Tốc độ gió định mức', 'm/s', 11),
        fd('dl_k13', 'Hệ số khuếch đại lực đẩy (ETM)', '', 1.3, 'giả định, lấy từ mô phỏng'),
        fd('dl_k16', 'Hệ số khuếch đại lực đẩy (NTM)', '', 1.1, 'giả định'),
        fd('dl_HsN', 'H_s trạng thái biển thường', 'm', 2.5),
        fd('dl_TpN', 'T_p trạng thái biển thường', 's', 8),
        fd('dl_HsS', 'H_s trạng thái biển mạnh', 'm', 5),
        fd('dl_TpS', 'T_p trạng thái biển mạnh', 's', 10),
      ] },
      { h: 'Đỗ trong bão (DLC 6.1 và 7.1)', f: [
        fd('dl_Ve50', 'V_ref (10 phút, 50 năm) tại trục', 'm/s', 53.62, 'dự án mẫu (slide 29)'),
        fd('dl_k1', 'Tỷ số gió 1 năm / 50 năm', '', 0.8, 'IEC: 0,8'),
        fd('dl_kc1', 'Tỷ số dòng chảy 1 năm / 50 năm', '', 0.8, 'giả định'),
        fd('dl_Ctp', 'C_t rotor đỗ, cánh vê', '', 0.04, 'giả định, hỏi nhà chế tạo'),
        fd('dl_Hs1', 'H_s chu kỳ lặp 1 năm', 'm', 4.8, 'giả định'),
        fd('dl_Tp1', 'T chu kỳ lặp 1 năm', 's', 9, 'giả định'),
      ] },
      { h: 'Hệ số tải', f: [
        fd('dl_g', 'γ_f thông thường', '', 1.35),
        fd('dl_ga', 'γ_f bất thường (sự cố)', '', 1.1),
      ] },
    ],
    formulas: `<p>Với mỗi DLC: <span class="eq">H = F_sóng + F_rotor + F_tháp</span>, <span class="eq">M = M_sóng + M_gió</span> (tại đáy biển).</p>
<p>Mô men tính toán: <span class="eq">M_d = γ_f · M</span>. Trường hợp chi phối là M_d lớn nhất.</p>
<p>Sóng cực đại <span class="eq">H = k·H_s</span> bị giới hạn bởi <span class="eq">0,78·d</span>. Tải sóng quét pha để lấy cực đại, cộng thẳng với tải gió nên thiên về an toàn.</p>
<p>Các DLC mỏi (1.2, 6.4...) cần phổ ứng suất, xem mô-đun Mỏi.</p>`,
  },
  {
    id: 'mono', nm: 'Monopile',
    intro: 'Tải sóng và gió tại đáy biển, ứng suất ống, ổn định vỏ, đáp ứng cọc theo p-y (API cát) và xoay đáy biển.',
    groups: [
      { h: 'Ống thép', f: [
        fd('mp_D', 'Đường kính ngoài D', 'm', 8),
        fd('mp_t', 'Chiều dày thành t', 'mm', 80),
        fd('mp_corr', 'Chiều dày dự phòng ăn mòn', 'mm', 3),
        fd('mp_L', 'Chiều sâu ngàm L', 'm', 30),
        fd('mp_fy', 'Giới hạn chảy f_y', 'MPa', 355),
        fd('mp_gM', 'Hệ số vật liệu γ_M', '', 1.1),
      ] },
      { h: 'Tải', f: [
        fd('mp_gf', 'Hệ số tải γ_f', '', 1.35, 'bị thay khi bật DLC'),
        fd('mp_N', 'Tải đứng tại đáy', 'kN', 20000, 'RNA + tháp + kết cấu'),
      ] },
      { h: 'Đất cát', f: [
        fd('mp_phi', 'Góc ma sát trong φ', 'độ', 35),
        fd('mp_gp', 'Trọng lượng đẩy nổi γ\'', 'kN/m³', 9),
        fd('mp_k', 'Mô đun nền ban đầu k (API)', 'kN/m³', 22000, 'cát chặt vừa'),
        fd('mp_FS', 'Hệ số an toàn Broms', '', 2),
        fd('mp_rot', 'Xoay cho phép tại đáy biển', 'độ', 0.25, 'SLS'),
      ] },
    ],
    formulas: `<p>Mô men đáy: <span class="eq">M = M_sóng + T·(h_hub + d) + M_tháp</span>.</p>
<p>Ứng suất: <span class="eq">σ = γ_f·M/W + γ_f·N/A</span>, so với <span class="eq">f_y/γ_M</span>. Ống dày thành mỏng dùng <span class="eq">W = I/(D/2)</span> với chiều dày đã trừ ăn mòn.</p>
<p>Ổn định vỏ (dạng giản lược DNV-RP-C202): <span class="eq">σ_E = 0,605·E·t/R</span>, <span class="eq">λ̄² = f_y/σ_E</span>, <span class="eq">f_ks = f_y/√(1 + λ̄⁴)</span>.</p>
<p>p-y API cát: <span class="eq">p = A·p_u·tanh(k·z·y/(A·p_u))</span>, <span class="eq">p_u = min[(C₁z + C₂D)γ'z ; C₃Dγ'z]</span>, A = 0,9 (tải chu kỳ).</p>
<p>Dầm trên nền: <span class="eq">EI·y'''' + p(y) = 0</span>, giải sai phân hữu hạn với lặp độ cứng cát tuyến.</p>
<p>Broms (cọc cứng, cát): <span class="eq">H_u = ½·γ'·D·L³·K_p/(e + L)</span>, <span class="eq">e = M/H</span>.</p>`,
  },
  {
    id: 'tan', nm: 'Tần số',
    intro: 'Tần số riêng f₁ bằng phương pháp Rayleigh cho cả cọc, tháp thon và RNA, so với dải 1P và 3P. Có phân tích độ nhạy theo độ sâu ngàm.',
    groups: [
      { h: 'Móng và tháp', f: [
        fd('fq_Dp', 'Đường kính móng (đến chân tháp)', 'm', 8),
        fd('fq_tp', 'Chiều dày móng', 'mm', 80),
        fsel('fq_soil', 'Cách chọn độ sâu ngàm giả định', [['man', 'Nhập tay'], ['clay', 'Sét: 4,0 D (3,5 đến 4,5)'], ['soft', 'Đất mềm, cát rời: 7,75 D (7,0 đến 8,5)'], ['nodata', 'Không có số liệu: 6,0 D']], 'man'),
        fd('fq_Ld', 'Độ sâu ngàm tương đương (khi nhập tay)', 'm', 30, 'khoảng 3,5–8,5 D tùy đất'),
        fd('fq_tt', 'Chiều dày tháp', 'mm', 35, 'đường kính lấy ở mô-đun Chung'),
        fd('fq_M', 'Khối lượng RNA', 't', 600, 'rotor + nacelle'),
        fd('fq_sec', 'Thép phụ (mặt bích, thang, sàn)', '%', 15),
        fd('fq_f1', 'f₁ nhập tay (0 để dùng ước tính)', 'Hz', 0, 'từ mô hình chi tiết'),
        fd('fq_delta', 'Giảm lượng loga δ (cho VIV)', '', 0.05, 'giả định'),
      ] },
      { h: 'Rotor', f: [
        fd('fq_rmin', 'Tốc độ quay nhỏ nhất', 'v/ph', 5),
        fd('fq_rmax', 'Tốc độ quay lớn nhất', 'v/ph', 9),
        fd('fq_mg', 'Biên an toàn', '%', 10),
      ] },
    ],
    formulas: `<p>Các tần số f₁, f₂ giải bằng phần tử dầm Euler–Bernoulli với khối lượng nhất quán: <span class="eq">det[K − ω²·M] = 0</span>. Rayleigh dùng làm đối chiếu: <span class="eq">ω² = Σ m·u / Σ m·u²</span>, với u là độ võng tĩnh khi tải ngang tỷ lệ với khối lượng.</p>
<p>Độ sâu ngàm giả định theo bài giảng (slide 32): sét 3,5–4,5 D; đất mềm, cát rời 7,0–8,5 D; không có số liệu 6,0 D. Đây là quy ước cho cọc nhỏ và vừa, cần cẩn thận với monopile đường kính lớn.</p>
<p>Cộng hưởng xoáy: <span class="eq">U_r = U/(f_n·D)</span>, <span class="eq">k_s = 2·m_e·δ/(ρ·D²)</span>.</p>
<p>Mô men cắt công-xon từ ngàm: <span class="eq">M(z) = Σ w_j·(z_j − z)</span>, <span class="eq">κ = M/EI</span>, tích phân hai lần ra độ võng.</p>
<p>Khối lượng nước nâng thêm cho đoạn ngập: <span class="eq">m_a = ρ_w·π·(D + 2·t_mg)²/4</span>.</p>
<p>Dải tránh: <span class="eq">1P ± biên</span> và <span class="eq">3P ± biên</span>, 1P = vòng/phút/60.</p>`,
  },
  {
    id: 'moi', nm: 'Mỏi',
    intro: 'Cộng dồn hư hỏng Miner theo đường cong S–N loại D (DNV-RP-C203). Nhập phổ biên độ ứng suất danh nghĩa theo số chu kỳ trong tuổi thọ thiết kế.',
    groups: [
      { h: 'Chi tiết mối hàn', f: [
        fsel('mo_curve', 'Môi trường', [['cp', 'Nước biển có bảo vệ catốt'], ['air', 'Trong không khí'], ['free', 'Nước biển ăn mòn tự do']], 'cp'),
        fd('mo_t', 'Chiều dày chi tiết', 'mm', 80),
        fd('mo_scf', 'Hệ số tập trung ứng suất SCF', '', 1.5),
        fd('mo_dff', 'Hệ số hư hỏng mỏi DFF', '', 3, 'chi tiết khó kiểm tra: 3'),
        fd('mo_yr', 'Tuổi thọ thiết kế', 'năm', 25),
      ] },
      { h: 'Phổ ứng suất (biên độ ứng suất, số chu kỳ)', f: BIN_S.flatMap((s, i) => [
        fd('mo_S' + (i + 1), 'Biên độ ' + (i + 1), 'MPa', s),
        fd('mo_n' + (i + 1), 'Số chu kỳ ' + (i + 1), 'chu kỳ', BIN_N[i]),
      ]) },
    ],
    formulas: `<p>Số chu kỳ chịu được: <span class="eq">log N = log ā − m·log(Δσ·(t/25)^k)</span>, k = 0,20 cho loại D khi t &gt; 25 mm.</p>
<p>Loại D: m = 3, log ā = 12,164 (không khí, N ≤ 10⁷) hoặc 11,764 (nước biển có catốt, N ≤ 10⁶); sau điểm gãy m = 5, log ā = 15,606. Ăn mòn tự do: m = 3, log ā = 11,687.</p>
<p>Hư hỏng Miner: <span class="eq">D = Σ n_i/N_i</span>. Yêu cầu <span class="eq">D·DFF ≤ 1</span>.</p>
<p>Biên độ ứng suất tại điểm nóng: <span class="eq">Δσ_hs = SCF·Δσ_danh nghĩa</span>.</p>`,
  },
  {
    id: 'jac', nm: 'Jacket',
    intro: 'Tải lên giàn 4 chân, lực chân và thanh giằng X, ổn định cột, và chiều dài cọc chịu nhổ.',
    groups: [
      { h: 'Hình học giàn', f: [
        fd('jk_Dl', 'Đường kính chân', 'm', 2),
        fd('jk_t', 'Chiều dày chân', 'mm', 50),
        fd('jk_Lk', 'Chiều dài chân giữa các nút', 'm', 15),
        fd('jk_B', 'Khoảng cách chân ở đáy B', 'm', 25),
        fd('jk_Db', 'Đường kính thanh giằng', 'm', 1.2),
        fd('jk_tb', 'Chiều dày thanh giằng', 'mm', 30),
        fd('jk_hb', 'Chiều cao một khoang giằng', 'm', 20),
        fd('jk_kb', 'Hệ số thêm thanh giằng cho tải sóng', '', 0.35),
        fsel('jk_dir', 'Hướng tải', [['side', 'Vuông góc cạnh'], ['diag', 'Theo đường chéo']], 'diag'),
      ] },
      { h: 'Vật liệu và tải', f: [
        fd('jk_fy', 'Giới hạn chảy f_y', 'MPa', 355),
        fd('jk_gM', 'Hệ số vật liệu γ_M', '', 1.15),
        fd('jk_gf', 'Hệ số tải γ_f', '', 1.35, 'bị thay khi bật DLC'),
        fd('jk_N', 'Tải đứng tổng', 'kN', 20000),
      ] },
      { h: 'Cọc và đất', f: [
        fd('jk_Dp', 'Đường kính cọc', 'm', 2.4),
        fsel('jk_soil', 'Loại đất', [['sand', 'Cát'], ['clay', 'Sét']], 'sand'),
        fd('jk_beta', 'β (cát)', '', 0.4, 'ma sát bên'),
        fd('jk_alpha', 'α (sét)', '', 0.6),
        fd('jk_su', 's_u (sét)', 'kPa', 80),
        fd('jk_gp', 'γ\' (cát)', 'kN/m³', 9),
        fd('jk_FS', 'Hệ số an toàn nhổ', '', 2),
      ] },
    ],
    formulas: `<p>Lực chân từ mô men: <span class="eq">ΔN = k·M/B</span>, k = 0,5 khi tải vuông góc cạnh, k = 1/√2 khi theo đường chéo. Chân nén <span class="eq">N/4 + ΔN</span>, chân nhổ <span class="eq">N/4 − ΔN</span>.</p>
<p>Giằng X, hai mặt phẳng: <span class="eq">N_b = V/(4·cos α)</span>, <span class="eq">α = atan(h_b/B)</span>.</p>
<p>Cột (API RP 2A): <span class="eq">λ_c = (K·L/r)/π·√(f_y/E)</span>; nếu λ_c ≤ 1,34: <span class="eq">F_xc = f_y·(1 − 0,25·λ_c²)</span>; ngược lại <span class="eq">F_xc = 0,88·f_y/λ_c²</span>.</p>
<p>Cọc nhổ, cát: <span class="eq">Q = π·D·β·γ'·L²/2</span>. Sét: <span class="eq">Q = π·D·α·s_u·L</span>.</p>`,
  },
  {
    id: 'gbs', nm: 'Trọng lực',
    intro: 'Trượt, lật, sức chịu tải, lún đàn hồi và xoay của móng bê tông đáy tròn.',
    groups: [
      { h: 'Hình học và tải', f: [
        fd('gb_Dc', 'Đường kính thân ở vùng sóng', 'm', 8),
        fd('gb_Db', 'Đường kính đáy móng', 'm', 36),
        fd('gb_V', 'Tải đứng thực tại đáy', 'kN', 90000, 'sau trừ đẩy nổi'),
        fd('gb_Df', 'Chiều sâu chôn móng', 'm', 0),
      ] },
      { h: 'Đất nền', f: [
        fsel('gb_soil', 'Loại đất', [['sand', 'Cát (thoát nước)'], ['clay', 'Sét (không thoát nước)']], 'sand'),
        fd('gb_phi', 'φ (cát)', 'độ', 35),
        fd('gb_su', 's_u (sét)', 'kPa', 50),
        fd('gb_gp', 'γ\'', 'kN/m³', 9),
        fd('gb_Es', 'Mô đun biến dạng E_s', 'MPa', 50),
        fd('gb_nu', 'Hệ số Poisson ν', '', 0.3),
      ] },
      { h: 'Giới hạn tham khảo', f: [
        fd('gb_FSb', 'FS sức chịu tải tối thiểu', '', 2.5, 'TCVN 9362: 2 đến 3'),
        fd('gb_FSs', 'FS trượt tối thiểu', '', 1.5),
        fd('gb_FSo', 'FS lật tối thiểu', '', 1.5),
        fd('gb_rot', 'Xoay cho phép', 'độ', 0.25),
      ] },
    ],
    formulas: `<p>Độ lệch tâm: <span class="eq">e = M/V</span>, trong lõi nếu <span class="eq">e ≤ D/8</span>. Diện tích hữu hiệu tròn: <span class="eq">A' = 2·[R²·acos(e/R) − e·√(R² − e²)]</span>.</p>
<p>Cát: <span class="eq">q_u = q·N_q·s_q·i_q + ½·γ'·D'·N_γ·s_γ·i_γ</span>, <span class="eq">N_q = e^(π·tanφ)·tan²(45° + φ/2)</span>, <span class="eq">N_γ = 2·(N_q + 1)·tanφ</span>.</p>
<p>Sét: <span class="eq">q_u = 5,14·s_u·1,2·i_c + q</span>.</p>
<p>Trượt: cát <span class="eq">R_h = V·tan(⅔φ)</span>, sét <span class="eq">R_h = s_u·A'</span>.</p>
<p>Đế cứng tròn trên bán không gian đàn hồi: lún <span class="eq">s = V·(1 − ν²)/(2·a·E)</span>, xoay <span class="eq">θ = 3·(1 − ν²)·M/(4·E·a³)</span>.</p>`,
  },
  {
    id: 'flo', nm: 'Móng nổi',
    intro: 'Spar trụ tròn: ổn định, nghiêng tĩnh, chu kỳ riêng nhún, lắc dọc và trôi dạt.',
    groups: [
      { h: 'Spar', f: [
        fd('fl_D', 'Đường kính trụ', 'm', 18),
        fd('fl_T', 'Chiều chìm', 'm', 80),
        fd('fl_KG', 'Trọng tâm KG so với đáy trụ', 'm', 28),
        fd('fl_lim', 'Góc nghiêng cho phép', 'độ', 10),
        fd('fl_Km', 'Độ cứng ngang hệ neo', 'kN/m', 300),
      ] },
    ],
    formulas: `<p>Thủy tĩnh: <span class="eq">KB = T/2</span>, <span class="eq">BM = D²/(16·T)</span>, <span class="eq">GM = KB + BM − KG</span>, <span class="eq">C₅₅ = ρ·g·∇·GM</span>.</p>
<p>Nghiêng tĩnh: <span class="eq">θ = T_gió·(h_hub + T − KG)/C₅₅</span>.</p>
<p>Nhún: <span class="eq">T_h = 2π·√((m + A₃₃)/(ρ·g·A_wp))</span>, <span class="eq">A₃₃ = ρ·D³/3</span>. Với trụ tròn T_h ≈ 2π·√(T/g).</p>
<p>Lắc dọc: <span class="eq">T_p = 2π·√((I₅₅ + A₅₅)/C₅₅)</span>. Trôi dạt: <span class="eq">T_s = 2π·√((m + A₁₁)/K_neo)</span>.</p>`,
  },
  {
    id: 'dd', nm: 'Động đất',
    intro: 'Phổ phản ứng gia tốc nền theo API RP 2A (cản 5%), tải động đất theo dạng dao động thứ nhất của tháp và móng monopile, so với mô men do gió và sóng.',
    groups: [
      { h: 'Điều kiện động đất', f: [
        fsel('dd_soil', 'Loại đất nền (API)', [['A', 'A, đá hoặc đất rất cứng'], ['B', 'B, đất cứng'], ['C', 'C, đất mềm']], 'B'),
        fd('dd_ag', 'Gia tốc nền hiệu dụng a_g', 'g', 0.1, 'giả định, lấy theo nghiên cứu địa chấn dự án và TCVN 9386:2012'),
      ] },
    ],
    formulas: `<p>Phổ API: <span class="eq">S_A/a_g = 1</span> khi T ≤ 0,05 s; <span class="eq">20·T</span> đến 2,5 tại T = 0,125 s; giữ 2,5 trên đoạn phẳng; sau đó giảm theo <span class="eq">1,8/T</span> (đất A), <span class="eq">1,2/T</span> (đất B), <span class="eq">0,8/T</span> (đất C).</p>
<p>Dạng dao động thứ nhất lấy từ độ võng tĩnh: lực quán tính <span class="eq">F_j = Γ·m_j·u_j·S_A</span>, hệ số tham gia <span class="eq">Γ = Σ m·u / Σ m·u²</span>. Lực cắt đáy là tổng F_j, mô men đáy là tổng F_j nhân độ cao so với đáy biển.</p>`,
  },
  {
    id: 'vd4', nm: 'Ví dụ Ch.4',
    intro: 'Tái hiện ba ví dụ của bài giảng Chương 4: tải sóng và dòng chảy lên monopile (Morison, sóng Airy), tải gió lên tuabin 8 MW và tổ hợp tải đồng thời DLC 6.1 theo vector. Dùng để đối chiếu cách tính. Số mặc định lấy theo slide, có thể thay.',
    groups: [
      { h: 'Sóng và dòng chảy lên monopile (slide 21–22)', f: [
        fd('v4_H', 'Chiều cao sóng H', 'm', 2.5),
        fd('v4_T', 'Chu kỳ sóng T', 's', 8),
        fd('v4_h', 'Độ sâu nước h', 'm', 30),
        fd('v4_D', 'Đường kính trụ D', 'm', 8),
        fd('v4_CD', 'Hệ số cản C_D', '', 1.0, 'slide dùng 1,0'),
        fd('v4_CM', 'Hệ số quán tính C_M', '', 2.0, 'slide dùng 2,0 (trụ trơn); trụ nhám dùng nhỏ hơn'),
        fd('v4_Uc', 'Vận tốc dòng chảy ở mặt U_c0', 'm/s', 0.5, 'phân bố (z + h)/h mũ 1/7'),
      ] },
      { h: 'Tải gió lên tuabin 8 MW (slide 12)', f: [
        fd('v4_DR', 'Đường kính rotor D_R', 'm', 170),
        fd('v4_zh', 'Cao độ hub so với MSL', 'm', 110),
        fd('v4_V', 'Vận tốc gió tại hub', 'm/s', 12),
        fd('v4_al', 'Hệ số shear α', '', 0.1),
        fd('v4_CT', 'Hệ số lực đẩy C_T', '', 0.8, 'thường 0,7 đến 0,9'),
        fd('v4_CDn', 'C_D của nacelle', '', 1.2, 'thường 1,0 đến 1,2'),
        fd('v4_AN', 'Diện tích chiếu nacelle A_N', 'm²', 65, 'giả định để khớp 6,9 kN của slide'),
        fd('v4_Dtb', 'Đường kính đáy tháp', 'm', 6.5),
        fd('v4_Dtt', 'Đường kính đỉnh tháp', 'm', 4.0),
        fd('v4_Ht', 'Chiều cao tháp', 'm', 105),
        fd('v4_CDt', 'C_D của tháp', '', 1.2, 'thường 1,0 đến 1,2'),
      ] },
      { h: 'Tổ hợp tải đồng thời DLC 6.1 (slide 5)', f: [
        fd('v4_N', 'Lực dọc N_k tại mudline', 'MN', -60, 'âm là nén'),
        fd('v4_Vx', 'Lực cắt V_x,k', 'MN', 8.0),
        fd('v4_Vy', 'Lực cắt V_y,k', 'MN', 3.0),
        fd('v4_Mx', 'Mô men M_x,k', 'MN·m', 260),
        fd('v4_My', 'Mô men M_y,k', 'MN·m', 760),
        fd('v4_Tq', 'Mô men xoắn T_k', 'MN·m', 15),
        fd('v4_gf', 'Hệ số tải γ_f', '', 1.35),
        fd('v4_MR', 'Sức kháng mô men R_d', 'MN·m', 1290, 'giả định, suy từ UR = 0,84 của slide'),
      ] },
    ],
    formulas: `<p>Morison tại một pha, sóng Airy không kéo dãn (đúng như slide): <span class="eq">dF = ½·ρ·C_D·D·|u_r|·u_r·dz + ρ·C_M·(π·D²/4)·a_w·dz</span> với <span class="eq">u_r = u_w + U_c(z)</span>, <span class="eq">U_c(z) = U_c0·((z + h)/h)^(1/7)</span>. Pha đỉnh sóng đặt kx − ωt = 0 (gia tốc bằng 0, chỉ có cản). Pha mặt nước tại tim cọc bằng MSL: kx − ωt = π/2 (vận tốc sóng bằng 0, quán tính chi phối).</p>
<p>Lực tổng và mô men tại mudline lấy bằng tích phân hình thang theo bảng cao độ cách nhau 5 m như slide. Ứng dụng đồng thời tích phân chi tiết để so sánh sai số cầu phương.</p>
<p>Gió: <span class="eq">T = ½·ρ_a·A_R·C_T·V²</span>, <span class="eq">F_N = ½·ρ_a·C_D,n·A_N·V²</span>, tháp <span class="eq">p_T(z) = ½·ρ_a·C_D,T·D(z)·V(z)²</span>, <span class="eq">M = T·(z_hub + h) + F_N·(z_hub + h) + ∫p_T·(z + h)·dz</span>.</p>
<p>Tổ hợp: <span class="eq">X_d = γ_f·X_k</span>, <span class="eq">V_d = √(V_x,d² + V_y,d²)</span>, <span class="eq">M_b,d = √(M_x,d² + M_y,d²)</span>, <span class="eq">UR = M_b,d/R_d</span>. Phải dùng bộ tải đồng thời tại cùng một thời điểm.</p>`,
  },
];

function V(id) {
  const f = FIELD[id];
  const raw = store.vals[id];
  if (f.sel) return raw === undefined ? f.d : raw;
  if (raw === undefined || raw === '') return f.d;
  const n = parseFloat(String(raw).replace(',', '.'));
  return isFinite(n) ? n : f.d;
}

/* ---------- Dữ liệu dùng chung ---------- */
function base() {
  const d = V('d'), Hs = V('Hs'), Tp = V('Tp');
  if (!(d > 0) || !(Tp > 0) || !(Hs > 0)) return { err: 'Độ sâu, H_s và T_p phải lớn hơn 0.' };
  if (V('hHub') <= V('tw_h0')) return { err: 'Cao độ trục rotor phải lớn hơn cao độ chân tháp.' };
  return {
    d, Hs, Tp, kH: V('kH'), hHub: V('hHub'), Dr: V('Dr'), Vw: V('Vw'), Ct: V('Ct'), alpha: V('alpha'), alphaE: V('alphaE'),
    Tpk: V('Tpk'), slope: V('slope'), curr: { vT: V('c_vT'), vW: V('c_vW'), h0: V('c_h0') },
    mg: V('mg') / 1000,
    tw: { h0: V('tw_h0'), Db: V('tw_Db'), Dt: V('tw_Dt'), Cd: V('tw_Cd') },
  };
}

function windFor(b, Vv, Ct, k, al) {
  return CALC.windLoads({ V: Vv, Dr: b.Dr, Ct, k: k || 1, hHub: b.hHub, d: b.d, alpha: al !== undefined ? al : b.alpha, Db: b.tw.Db, Dt: b.tw.Dt, h0: b.tw.h0, Cd: b.tw.Cd });
}

function foundation(type, b) {
  const mg2 = 2 * b.mg;
  const CD = V('CD'), CM = V('CM');
  if (type === 'jac') {
    const B = V('jk_B'), dir = V('jk_dir'), Dl = V('jk_Dl') + mg2;
    const xs = dir === 'diag' ? [-B / Math.SQRT2, 0, 0, B / Math.SQRT2] : [-B / 2, -B / 2, B / 2, B / 2];
    return { legs: xs.map((x) => ({ x, D: Dl })), kb: V('jk_kb'), CD, CM };
  }
  if (type === 'gbs') return { legs: [{ x: 0, D: V('gb_Dc') + mg2 }], kb: 0, CD, CM };
  return { legs: [{ x: 0, D: V('mp_D') + mg2 }], kb: 0, CD, CM };
}

function dlcCases(type, b) {
  const geo = foundation(type, b);
  const Ve50 = V('dl_Ve50');
  const defs = [
    { id: '1.3', nm: 'DLC 1.3 · ETM + NSS', V: V('dl_Vr'), Ct: b.Ct, k: V('dl_k13'), Hs: V('dl_HsN'), Tp: V('dl_TpN'), gf: V('dl_g'), al: b.alpha, curr: { vT: b.curr.vT, vW: 0, h0: b.curr.h0 } },
    { id: '1.6', nm: 'DLC 1.6 · NTM + SSS', V: V('dl_Vr'), Ct: b.Ct, k: V('dl_k16'), Hs: V('dl_HsS'), Tp: V('dl_TpS'), gf: V('dl_g'), al: b.alpha, curr: { vT: b.curr.vT, vW: 0, h0: b.curr.h0 } },
    { id: '6.1', nm: 'DLC 6.1 · EWM 50 năm + ESS 50 năm', V: Ve50, Ct: V('dl_Ctp'), k: 1, Hs: b.Hs, Tp: b.Tp, gf: V('dl_g'), al: b.alphaE, curr: b.curr, hmax: true },
    { id: '7.1', nm: 'DLC 7.1 · EWM 1 năm + ESS 1 năm, sự cố', V: Ve50 * V('dl_k1'), Ct: V('dl_Ctp'), k: 1, Hs: V('dl_Hs1'), Tp: V('dl_Tp1'), gf: V('dl_ga'), al: b.alphaE, curr: { vT: b.curr.vT * V('dl_kc1'), vW: b.curr.vW * V('dl_kc1'), h0: b.curr.h0 } },
  ];
  let gov = null;
  const cases = defs.map((c) => {
    const wl = windFor(b, c.V, c.Ct, c.k, c.al);
    const Hmax = (c.hmax ? b.kH : 1.86) * c.Hs;
    const Hd = Math.min(Hmax, 0.78 * b.d);
    const env = CALC.envLoads({ d: b.d, H: Hd, T: c.Tp, legs: geo.legs, CD: geo.CD, CM: geo.CM, kb: geo.kb, curr: c.curr });
    const out = Object.assign({}, c, {
      T: wl.T, Ft: wl.Ft, Fwind: wl.F, Mwind: wl.M, Hd, limited: Hmax > 0.78 * b.d,
      Fw: env.Fmax, Mw: env.Mmax,
      H: env.Fmax + wl.F, M: env.Mmax + wl.M,
    });
    out.Md = out.gf * out.M;
    if (!gov || out.Md > gov.Md) gov = out;
    return out;
  });
  return { cases, gov };
}

function site(type) {
  const b = base();
  if (b.err) return b;
  const w0 = windFor(b, b.Vw, b.Ct, 1);
  const s = Object.assign({}, b, { Hmax: b.kH * b.Hs, Hb: 0.78 * b.d, thrust: w0.T, Fwind: w0.F, Mwind: w0.M, gf: null, caseId: null });
  s.Hd = Math.min(s.Hmax, s.Hb);
  s.limited = s.Hmax > s.Hb;
  if (type && V('dl_use') === 'on') {
    const r = dlcCases(type, b);
    if (r.gov) {
      const g = r.gov;
      Object.assign(s, { Hd: g.Hd, Tp: g.Tp, Fwind: g.Fwind, Mwind: g.Mwind, gf: g.gf, caseId: g.id, thrust: g.T, limited: g.limited, curr: g.curr });
    }
  }
  s.w = CALC.waveProps(s.Hd, s.Tp, s.d);
  return s;
}

const R = (l, v, u, s, st) => ({ l, v, u: u || '', s: s || '', st });
const chip = (s, t) => (s ? `<i class="chip ${s}">${s === 'ok' ? '✓' : s === 'warn' ? '!' : '✕'} ${t || ''}</i>` : '');
const utilSt = (u) => (u <= 0.9 ? 'ok' : u <= 1 ? 'warn' : 'bad');
const fsSt = (v, min) => (v >= min ? 'ok' : v >= min * 0.85 ? 'warn' : 'bad');
const perSt = (T, Tp) => (T >= 1.5 * Tp || T <= 0.6 * Tp ? 'ok' : T >= 0.8 * Tp && T <= 1.2 * Tp ? 'bad' : 'warn');
const caseNote = (s) => (s.caseId ? 'Đang dùng DLC ' + s.caseId + ' (trường hợp chi phối), γ_f = ' + nf(s.gf, 2) + '.' : null);

function rowsHtml(rows) {
  return rows.map((r) => `<div class="r"><span>${r.l}</span><b>${r.v}${r.u ? ' <u>' + r.u + '</u>' : ''}</b>${r.s ? chip(r.s, r.st) : ''}</div>`).join('');
}
function tableHtml(head, rows) {
  return `<div class="tw"><table><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}

/* ---------- Biểu đồ SVG ---------- */
function svgForce(curve) {
  const W = 340, H = 150, pl = 46, pr = 10, pt = 12, pb = 24;
  const ys = curve.map((p) => p.F);
  let mn = Math.min(...ys, 0), mx = Math.max(...ys, 0);
  if (mx - mn < 1) mx = mn + 1;
  const sx = (th) => pl + ((W - pl - pr) * th) / 360;
  const sy = (v) => pt + (H - pt - pb) * (1 - (v - mn) / (mx - mn));
  const path = curve.map((p, i) => `${i ? 'L' : 'M'}${sx(p.th).toFixed(1)} ${sy(p.F).toFixed(1)}`).join('');
  let ticks = '';
  [0, 90, 180, 270, 360].forEach((t) => {
    ticks += `<line class="gr" x1="${sx(t)}" x2="${sx(t)}" y1="${pt}" y2="${H - pb}"/><text class="tx" x="${sx(t)}" y="${H - 8}" text-anchor="middle">${t}°</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Lực sóng tổng cộng theo pha sóng">
${ticks}
<line class="ax" x1="${pl}" x2="${W - pr}" y1="${sy(0)}" y2="${sy(0)}"/>
<path class="ln" d="${path}"/>
<text class="tx" x="${pl - 6}" y="${sy(mx) + 4}" text-anchor="end">${nf(mx)}</text>
<text class="tx" x="${pl - 6}" y="${sy(mn) + 4}" text-anchor="end">${nf(mn)}</text>
<text class="tx" x="${pl - 6}" y="${sy(0) + 4}" text-anchor="end">0</text>
</svg>`;
}

function svgFreq(res, f1, f2) {
  const W = 340, H = 118, pl = 12, pr = 12, pt = 18, pb = 26;
  const xmax = Math.max(0.6, res.p3[1] * 1.12, f1 * 1.25);
  const sx = (f) => pl + ((W - pl - pr) * f) / xmax;
  const band = (b, cls) => `<rect class="${cls}" x="${sx(b[0]).toFixed(1)}" y="${pt}" width="${(sx(b[1]) - sx(b[0])).toFixed(1)}" height="${H - pt - pb}"/>`;
  let ticks = '';
  for (let f = 0; f <= xmax + 1e-9; f += 0.1) {
    ticks += `<line class="ax" x1="${sx(f)}" x2="${sx(f)}" y1="${H - pb}" y2="${H - pb + 4}"/><text class="tx" x="${sx(f)}" y="${H - 8}" text-anchor="middle">${nf(f, 1)}</text>`;
  }
  const mid = (b) => (sx(b[0]) + sx(b[1])) / 2;
  const my = pt + (H - pt - pb) / 2;
  let f2s = '';
  if (f2 > 0) {
    if (f2 <= xmax) f2s = `<line class="mk" x1="${sx(f2)}" x2="${sx(f2)}" y1="${pt - 2}" y2="${H - pb}"/><circle class="mk2" cx="${sx(f2)}" cy="${my}" r="4"/><text class="tx2" x="${Math.min(sx(f2) + 7, W - 70)}" y="${my + 16}">f₂ = ${nf(f2, 3)} Hz</text>`;
    else f2s = `<text class="tx2" x="${W - pr}" y="${my + 16}" text-anchor="end">f₂ = ${nf(f2, 3)} Hz ▸</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cửa sổ tần số 1P, 3P và tần số riêng">
${band(res.p1, 'b1')}${band(res.p3, 'b3')}
<line class="ax" x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}"/>
${ticks}
<text class="tx" x="${mid(res.p1)}" y="${pt - 5}" text-anchor="middle">1P</text>
<text class="tx" x="${mid(res.p3)}" y="${pt - 5}" text-anchor="middle">3P</text>
<line class="mk" x1="${sx(f1)}" x2="${sx(f1)}" y1="${pt - 2}" y2="${H - pb}"/>
<circle class="mk2" cx="${sx(f1)}" cy="${my}" r="4"/>
<text class="tx2" x="${Math.min(sx(f1) + 7, W - 70)}" y="${my - 8}">f₁ = ${nf(f1, 3)} Hz</text>
${f2s}
<text class="tx" x="${W - pr}" y="${H - 8}" text-anchor="end">Hz</text>
</svg>`;
}

/* Thanh ngang: items [{l, v, hi}] */
function svgBars(items, unit) {
  const W = 340, rowH = 30, pl = 84, pr = 64, pt = 6;
  const H = pt + rowH * items.length + 4;
  const mx = Math.max(...items.map((i) => i.v), 1e-9);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="So sánh các trường hợp">`;
  items.forEach((it, i) => {
    const y = pt + i * rowH;
    const w = ((W - pl - pr) * it.v) / mx;
    s += `<text class="tx2" x="${pl - 8}" y="${y + 17}" text-anchor="end">${it.l}</text>`;
    s += `<rect class="${it.hi ? 'bar hi' : 'bar'}" x="${pl}" y="${y + 5}" width="${Math.max(w, 1).toFixed(1)}" height="16" rx="2"/>`;
    s += `<text class="tx" x="${pl + w + 6}" y="${y + 17}">${nf(it.v, it.d || 0)}${unit ? ' ' + unit : ''}</text>`;
  });
  return s + '</svg>';
}

/* Hai biểu đồ theo độ sâu: độ võng và mô men */
function svgPile(res, L) {
  const W = 340, H = 210, pt = 18, pb = 8;
  const panels = [
    { x0: 12, w: 150, vals: res.y.map((v) => v * 1000), name: 'Độ võng (mm)' },
    { x0: 188, w: 150, vals: res.Mz.map((v) => v / 1000), name: 'Mô men (MN·m)' },
  ];
  const n = res.y.length - 1;
  const sy = (i) => pt + ((H - pt - pb) * i) / n;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Độ võng và mô men dọc cọc">`;
  panels.forEach((p) => {
    let mn = Math.min(...p.vals, 0), mx = Math.max(...p.vals, 0);
    if (mx - mn < 1e-9) mx = mn + 1;
    const sx = (v) => p.x0 + (p.w * (v - mn)) / (mx - mn);
    const path = p.vals.map((v, i) => `${i ? 'L' : 'M'}${sx(v).toFixed(1)} ${sy(i).toFixed(1)}`).join('');
    s += `<line class="ax" x1="${sx(0)}" x2="${sx(0)}" y1="${pt}" y2="${H - pb}"/>`;
    s += `<path class="ln" d="${path}"/>`;
    s += `<text class="tx2" x="${p.x0}" y="11">${p.name}</text>`;
    s += `<text class="tx" x="${p.x0}" y="${H - 0}" >${nf(mn, 1)}</text><text class="tx" x="${p.x0 + p.w}" y="${H - 0}" text-anchor="end">${nf(mx, 1)}</text>`;
  });
  s += `<text class="tx" x="${W - 4}" y="${pt + 8}" text-anchor="end">z = 0</text><text class="tx" x="${W - 4}" y="${H - pb - 12}" text-anchor="end">z = ${nf(L, 0)} m</text></svg>`;
  return s;
}

/* ---------- Mô hình tần số dùng chung ---------- */
function fixityLd() {
  const sel = V('fq_soil'), D = V('fq_Dp');
  if (sel === 'clay') return 4 * D;
  if (sel === 'soft') return 7.75 * D;
  if (sel === 'nodata') return 6 * D;
  return V('fq_Ld');
}
function freqModel(s, Ld, mgx) {
  const Dp = V('fq_Dp'), tp = V('fq_tp') / 1000, tt = V('fq_tt') / 1000;
  const zTP = Ld + s.d + s.tw.h0, zTop = Ld + s.d + s.hHub;
  const secs = [
    { z0: 0, z1: zTP, D0: Dp, D1: Dp, t: tp },
    { z0: zTP, z1: zTop, D0: s.tw.Db, D1: s.tw.Dt, t: tt },
  ];
  const p = { secs, zSeabed: Ld, zMSL: Ld + s.d, zTop, Mrna: V('fq_M'), mg: mgx, secondary: V('fq_sec') / 100 };
  return { ray: CALC.rayleighFreq(p), fe: CALC.beamModes(p), zSeabed: Ld };
}

/* ---------- Tính toán từng mô-đun ---------- */
const COMPUTE = {
  chung() {
    const s = site();
    if (s.err) return { err: s.err };
    const w = s.w;
    const th = CALC.waveTheory(s.Hd, s.Tp, s.d);
    const V10 = CALC.windAt(s.Vw, s.hHub, 10, s.alpha);
    const Vtip = CALC.windAt(s.Vw, s.hHub, s.hHub + s.Dr / 2, s.alpha);
    const wl = windFor(s, s.Vw, s.Ct, 1);
    const steepSt = w.steep <= w.steepMax ? 'ok' : 'bad';
    const st = CALC.waveStats({ Hs: s.Hs, Tp: s.Tpk, hours: 3 });
    const hbG = CALC.godaHb({ T: s.Tp, d: s.d, slope: s.slope });
    const gT2 = 9.81 * s.Tp * s.Tp;
    const cu = s.curr;
    const cuAt = (dep) => cu.vT * Math.pow(Math.max(s.d - dep, 0) / s.d, 1 / 7) + (cu.h0 > 0 ? cu.vW * Math.max(0, (cu.h0 - dep) / cu.h0) : 0);
    const geo = foundation('mono', s);
    const e0 = CALC.envLoads({ d: s.d, H: s.Hd, T: s.Tp, legs: geo.legs, CD: geo.CD, CM: geo.CM, kb: 0 });
    const e1 = CALC.envLoads({ d: s.d, H: s.Hd, T: s.Tp, legs: geo.legs, CD: geo.CD, CM: geo.CM, kb: 0, curr: cu });
    const etaB = V('sl_eta') * s.Hb;
    const sl = CALC.slamming({ D: geo.legs[0].D, c: w.c, Cs: V('sl_Cs'), lam: V('sl_lam'), etaB });
    const nearBreak = s.Hd >= 0.9 * Math.min(s.Hb, hbG);
    const sum = [R('H thiết kế', nf(s.Hd, 2), 'm'), R('Bước sóng L', nf(w.L, 0), 'm'), R('Lực gió tại đáy', nf(wl.F, 0), 'kN')];
    const det = [
      { h: 'Sóng', rows: [
        R('H_max = k · H_s', nf(s.Hmax, 2), 'm'),
        R('Giới hạn sóng vỡ 0,78 d', nf(s.Hb, 2), 'm', s.limited ? 'warn' : 'ok', s.limited ? 'bị khống chế' : 'không vỡ'),
        R('H dùng cho tính tải', nf(s.Hd, 2), 'm'),
        R('Vùng nước', w.regime),
        R('Tích k·d', nf(w.kd, 2)),
        R('Bước sóng L', nf(w.L, 1), 'm'),
        R('Vận tốc truyền sóng c', nf(w.c, 2), 'm/s'),
        R('Độ dốc H/L', nf(w.steep, 3), '', steepSt, 'giới hạn ' + nf(w.steepMax, 3)),
        R('Số Ursell U_r', nf(th.Ur, 1)),
        R('H/d', nf(th.Hd, 2)),
      ] },
      { h: 'Thống kê sóng (Rayleigh, cơn biển 3 giờ)', rows: [
        R('T_z = T_p / 1,28', nf(st.Tz, 2), 's'),
        R('Số sóng N = 3 giờ / T_z', nf(st.N, 0)),
        R('H_max = H_s·√(0,5·ln N)', nf(st.Hmax, 2), 'm'),
        R('H_max dùng trong tính toán', nf(s.Hmax, 2), 'm'),
        R('Chiều cao trung bình 0,627·H_s', nf(st.Hmean, 2), 'm'),
      ] },
      { h: 'Lý thuyết sóng đề xuất', rows: [
        R('Gợi ý', th.th),
        R('H / (g·T²)', nf(s.Hd / gT2, 4)),
        R('d / (g·T²)', nf(s.d / gT2, 4)),
      ] },
      { h: 'Giới hạn vỡ', rows: [
        R('0,78 · d', nf(s.Hb, 2), 'm'),
        R('Goda, độ dốc đáy ' + nf(s.slope, 3), nf(hbG, 2), 'm'),
        R('H thiết kế / giới hạn nhỏ hơn', nf(s.Hd / Math.min(s.Hb, hbG), 2), '', nearBreak ? 'warn' : 'ok', nearBreak ? 'gần vỡ' : 'không vỡ'),
      ] },
      { h: 'Dòng chảy (DnV)', rows: [
        R('Ở mặt nước', nf(cuAt(0), 2), 'm/s'),
        R('Ở nửa độ sâu', nf(cuAt(s.d / 2), 2), 'm/s'),
        R('Gần đáy (0,9 d)', nf(cuAt(0.9 * s.d), 2), 'm/s'),
        R('Lực sóng lớn nhất, không dòng chảy', nf(e0.Fmax, 0), 'kN'),
        R('Lực sóng lớn nhất, có dòng chảy', nf(e1.Fmax, 0), 'kN', '', '+' + nf((e1.Fmax / e0.Fmax - 1) * 100, 0) + '%'),
        R('Mô men sóng lớn nhất, có dòng chảy', nf(e1.Mmax, 0), 'kN·m'),
      ] },
      { h: 'Xung kích sóng vỡ (nếu sóng vỡ ở giới hạn)', rows: [
        R('Vận tốc truyền sóng c', nf(w.c, 2), 'm/s'),
        R('Chiều cao đỉnh sóng vỡ η_b', nf(etaB, 2), 'm'),
        R('Lực trên mét dài ½·C_s·ρ·D·c²', nf(sl.q, 0), 'kN/m'),
        R('Chiều cao tác dụng λ·η_b', nf(sl.h, 2), 'm'),
        R('Lực xung kích F_s', nf(sl.F, 0), 'kN', nearBreak ? 'warn' : '', nearBreak ? 'cần xét' : 'không vỡ ở H này'),
        R('So với lực Morison', nf(sl.F / e1.Fmax, 1), 'lần'),
      ] },
      { h: 'Gió tại đáy biển', rows: [
        R('Lực đẩy rotor T', nf(wl.T, 0), 'kN'),
        R('Lực gió lên tháp', nf(wl.Ft, 0), 'kN'),
        R('Mô men do rotor', nf(wl.T * (s.hHub + s.d), 0), 'kN·m'),
        R('Mô men do tháp', nf(wl.Mt, 0), 'kN·m'),
        R('Tổng mô men gió', nf(wl.M, 0), 'kN·m'),
        R('Tốc độ gió ở 10 m', nf(V10, 1), 'm/s'),
        R('Tốc độ gió ở đỉnh cánh', nf(Vtip, 1), 'm/s'),
      ] },
      { h: 'Đường kính thủy động', rows: [
        R('Sinh vật bám mỗi phía', nf(s.mg * 1000, 0), 'mm'),
        R('Monopile D + 2·t_mg', nf(V('mp_D') + 2 * s.mg, 2), 'm'),
      ] },
    ];
    const notes = [];
    if (s.limited || nearBreak) notes.push('Sóng bị khống chế hoặc gần vỡ: lực xung kích ở trên chưa cộng vào tổng tải, cần xét riêng theo IEC 61400-3-1 và DNV-RP-C205.');
    notes.push('Dòng chảy được cộng vector với vận tốc hạt sóng theo cùng một hướng, thiên về an toàn. Giá trị mặc định 0,6 và 0,4 m/s là giả định.');
    notes.push('Số Ursell lớn cho thấy sóng tuyến tính (Airy) kém chính xác. Ứng dụng vẫn dùng Airy với kéo dãn Wheeler, kết quả mang tính ước lượng.');
    return { sum, det, notes };
  },

  gio() {
    const v = V('gv_v'), z1 = V('gv_z1'), z2 = V('gv_z2'), gf = V('gv_g'), al = V('gv_a');
    const t1 = parseFloat(V('gv_t1')), t2 = parseFloat(V('gv_t2'));
    if (!(v > 0) || !(z1 > 0) || !(z2 > 0) || !(gf > 0) || !(al >= 0)) return { err: 'Tốc độ gió, độ cao và hệ số phải hợp lệ (lớn hơn 0).' };
    const r = CALC.iecConvert({ v, z1, t1, z2, t2, alpha: al, gf });
    let iso = null;
    try { iso = CALC.windConvert({ v, z1, t1, z2, t2: 600 }); } catch (e) { iso = null; }
    const lbl = { 3: '3 giây', 60: '1 phút', 120: '2 phút', 600: '10 phút', 3600: '1 giờ' };
    const rows = [3, 60, 120, 600, 3600].map((t) => {
      const u = r.out(t);
      const isoU = iso ? CALC.isoU3600(iso.U0, z2, t) : NaN;
      return [lbl[t] + (t === t2 ? ' (cần)' : ''), nf(u, 1) + ' m/s', nf(u / r.out(t2), 2), isFinite(isoU) ? nf(isoU, 1) + ' m/s' : '–'];
    });
    const sum = [R('Kết quả', nf(r.out(t2), 1), 'm/s'), R('Trung bình 10 phút tại ' + nf(z2, 0) + ' m', nf(r.v10, 1), 'm/s'), R('Hệ số giật', nf(gf, 2))];
    const det = [
      { h: 'Kết quả theo độ cao ' + nf(z2, 0) + ' m', tbl: { head: ['Thời gian', 'IEC', 'Tỷ lệ so với kết quả', 'ISO 19901-1'], rows } },
      { h: 'Cơ sở', rows: [
        R('Số liệu đầu vào', nf(v, 1) + ' m/s', 'tại ' + nf(z1, 0) + ' m, ' + lbl[t1]),
        R('Trung bình 10 phút tại độ cao đo', nf(r.v10 / Math.pow(z2 / z1, al), 1), 'm/s'),
        R('Đổi độ cao (z₂/z₁)^α', nf(Math.pow(z2 / z1, al), 3)),
      ] },
    ];
    return { sum, det, notes: [
      'IEC 61400-3-1 chỉ nối gió giật 3 giây với trung bình 10 phút bằng hệ số 1,4 (V_e50 = 1,4·V_ref). Các thời gian khác trong bảng IEC suy từ quan hệ ISO để tham khảo.',
      'Cột ISO 19901-1 dùng profile loga và hệ số giật theo cường độ rối, cho tỷ lệ 3 giây / 10 phút nhỏ hơn 1,4 ở độ cao trục rotor. Hai cách khác nhau rõ, hãy ghi rõ cách dùng trong cơ sở thiết kế.',
    ] };
  },

  iec() {
    const cls = V('iec_cls');
    const Vref = cls === 'S' ? V('iec_Vs') : CALC.IEC_CLASS[cls].Vref;
    const Iref = CALC.IEC_IREF[V('iec_I')];
    const zhub = V('hHub'), aE = V('alphaE'), gf = V('gv_g'), k1 = V('dl_k1');
    const Vr = V('dl_Vr');
    if (!(Vref > 0) || !(zhub > 0)) return { err: 'V_ref và cao độ trục rotor phải lớn hơn 0.' };
    const ord = [['III', 37.5], ['II', 42.5], ['I', 50], ['T', 57]];
    const fit = ord.find((o) => o[1] >= Vref - 1e-9);
    const zs = [10, 30, 60, zhub, zhub + V('Dr') / 2];
    const lw = zs.map((z) => { const w = CALC.iecWindAt({ Vref, z, zhub, alphaE: aE, k1, gf }); return [nf(z, 0) + ' m', nf(w.V50, 1), nf(w.V1, 1), nf(w.Ve50, 1), nf(w.Ve1, 1)]; });
    const sig = CALC.iecSigma1(Iref, Vr);
    const ks = [0.01, 0.03, 0.1, 0.3, 1].map((f) => [nf(f, 2) + ' Hz', nf(CALC.kaimalS1({ f, sigma1: sig, z: zhub, Vhub: Vr }), 3)]);
    const A = V('iec_A'), kk = V('iec_k'), Va = V('iec_Vave'), Vin = V('iec_Vin'), Vout = V('iec_Vout');
    const pr = [[Vin, 'V_in'], [Vr, 'V_r'], [Vout, 'V_out']].map(([x, n]) => [n + ' = ' + nf(x, 1) + ' m/s', nf(CALC.weibullCdf(x, A, kk) * 100, 1) + '%', nf(CALC.rayleighCdf(x, Va) * 100, 1) + '%']);
    const sum = [R('V_ref', nf(Vref, 2), 'm/s'), R('V_e50 tại trục', nf(CALC.iecWindAt({ Vref, z: zhub, zhub, alphaE: aE, k1, gf }).Ve50, 1), 'm/s'), R('Hạng phù hợp', fit ? fit[0] : 'S', '', fit && fit[0] !== 'T' ? 'ok' : 'warn', fit && fit[0] === 'T' ? 'bão' : '')];
    const det = [
      { h: 'Gió cực hạn theo độ cao', tbl: { head: ['Độ cao', 'V_50 (10 phút)', 'V_1', 'V_e50 (3 giây)', 'V_e1'], rows: lw } },
      { h: 'Rối thường (NTM)', rows: [
        R('I_ref', nf(Iref, 2)),
        R('V_hub dùng tính', nf(Vr, 1), 'm/s'),
        R('σ₁ = I_ref·(0,75·V_hub + 5,6)', nf(sig, 2), 'm/s'),
        R('Cường độ rối σ₁/V_hub', nf(sig / Vr, 3)),
        R('Λ₁ tại trục rotor', nf(zhub <= 60 ? 0.7 * zhub : 42, 1), 'm'),
      ] },
      { h: 'Phổ Kaimal S₁(f)', tbl: { head: ['Tần số', 'S₁ (m²/s²/Hz)'], rows: ks } },
      { h: 'Xác suất V ≤ giá trị', tbl: { head: ['Tốc độ gió', 'Weibull', 'Rayleigh'], rows: pr } },
    ];
    const notes = [
      fit && fit[0] === 'T' ? 'V_ref lớn hơn hạng I (50 m/s) nên cần hạng T cho bão nhiệt đới hoặc hạng S do nhà thiết kế quy định.' : 'V_ref nằm trong phạm vi hạng ' + (fit ? fit[0] : 'S') + '.',
      'Giá trị V_e50 dùng hệ số 1,4 cho gió giật 3 giây. Nếu bạn muốn cách khác, đổi hệ số trong mô-đun Quy đổi gió.',
      'Phổ Kaimal chỉ áp dụng cho vùng quán tính của phổ, dùng để tham khảo bậc độ lớn.',
    ];
    return { sum, det, notes };
  },

  dlc() {
    const b = base();
    if (b.err) return { err: b.err };
    const type = V('dl_type');
    const r = dlcCases(type, b);
    const g = r.gov;
    const sum = [R('Chi phối', 'DLC ' + g.id), R('M tính toán', nf(g.Md / 1000, 1), 'MN·m'), R('Lực ngang H', nf(g.H, 0), 'kN')];
    const rows = r.cases.map((c) => [
      (c.id === g.id ? '<b>' : '') + 'DLC ' + c.id + (c.id === g.id ? '</b>' : ''),
      nf(c.Hd, 1), nf(c.Fw, 0), nf(c.Fwind, 0), nf(c.H, 0), nf(c.M / 1000, 1), nf(c.gf, 2), nf(c.Md / 1000, 1),
    ]);
    const det = [
      { h: 'Tổng hợp tại đáy biển', tbl: { head: ['DLC', 'H sóng (m)', 'F sóng', 'F gió', 'H tổng (kN)', 'M (MN·m)', 'γ_f', 'γ_f·M (MN·m)'], rows } },
      ...r.cases.map((c) => ({ h: c.nm, rows: [
        R('Tốc độ gió', nf(c.V, 1), 'm/s'),
        R('Lực đẩy rotor', nf(c.T, 0), 'kN'),
        R('Lực gió lên tháp', nf(c.Ft, 0), 'kN'),
        R('H sóng · T_p', nf(c.Hd, 2) + ' m · ' + nf(c.Tp, 1) + ' s', '', c.limited ? 'warn' : '', c.limited ? 'bị khống chế bởi độ sâu' : ''),
        R('Lực sóng · mô men sóng', nf(c.Fw, 0) + ' kN · ' + nf(c.Mw, 0) + ' kN·m'),
        R('Mô men gió', nf(c.Mwind, 0), 'kN·m'),
      ] })),
    ];
    const chart = { h: 'Mô men tính toán γ_f · M (MN·m)', svg: svgBars(r.cases.map((c) => ({ l: 'DLC ' + c.id, v: c.Md / 1000, hi: c.id === g.id, d: 1 })), '') };
    const notes = [
      'Hệ số khuếch đại lực đẩy (1,3 và 1,1) và C_t khi đỗ (0,04) là giả định để minh họa. Hãy thay bằng số liệu từ nhà chế tạo hoặc mô phỏng khí động đàn hồi.',
      'DLC 6.1 dùng H_max = k · H_s theo mô-đun Chung. Các DLC còn lại lấy H_max = 1,86 · H_s như một cách thiên về an toàn. IEC cho phép dùng mô phỏng sóng ngẫu nhiên.',
      'Gió cực hạn (6.1, 7.1) dùng profile α cực hạn 0,11. Dòng chảy: DLC 1.3 và 1.6 chỉ tính phần thủy triều, 6.1 tính đủ, 7.1 nhân tỷ số dòng chảy 1 năm / 50 năm. Các tỷ số này là giả định.',
      V('dl_use') === 'on' ? 'Đang bật: các mô-đun Monopile, Jacket, Trọng lực dùng DLC ' + g.id + '.' : 'Đang tắt: các mô-đun khác dùng điều kiện ở mô-đun Chung.',
    ];
    return { sum, det, notes, chart };
  },

  mono() {
    const s = site('mono');
    if (s.err) return { err: s.err };
    const D = V('mp_D'), t = V('mp_t') / 1000, corr = V('mp_corr') / 1000, L = V('mp_L');
    const te = t - corr;
    if (!(D > 0) || !(t > 0) || te <= 0 || t * 2 >= D) return { err: 'Đường kính và chiều dày chưa hợp lệ.' };
    if (!(L > 1)) return { err: 'Chiều sâu ngàm phải lớn hơn 1 m.' };
    const geo = foundation('mono', s);
    const env = CALC.envLoads({ d: s.d, H: s.Hd, T: s.Tp, legs: geo.legs, CD: geo.CD, CM: geo.CM, kb: 0, curr: s.curr });
    const Hc = env.Fmax + s.Fwind;
    const Mc = env.Mmax + s.Mwind;
    const gf = s.gf !== null ? s.gf : V('mp_gf');
    const fy = V('mp_fy'), gM = V('mp_gM');
    const st = CALC.monopileStress({ D, t: te, Md: gf * Mc, Nd: gf * V('mp_N'), fy, gM });
    const sb = CALC.shellBuckling({ D, t: te, fy });
    const resB = sb.fks / gM;
    const utilB = st.sigma / resB;
    const br = CALC.bromsLength({ H: Hc, M: Mc, gp: V('mp_gp'), D, phi: V('mp_phi'), FS: V('mp_FS') });
    const sec = CALC.tube(D, t);
    const EI = 2.1e8 * sec.I;
    const pp = { EI, D, L, gp: V('mp_gp'), phi: V('mp_phi'), k: V('mp_k') };
    const sls = CALC.pileResponse(Object.assign({ H: Hc, M: Mc }, pp));
    const uls = CALC.pileResponse(Object.assign({ H: gf * Hc, M: gf * Mc }, pp));
    const th0 = Math.abs(sls.theta0) * 180 / Math.PI;
    const rotLim = V('mp_rot');
    const Wc = CALC.tube(D, te).W;
    const sigPile = Math.abs(uls.Mmax) / Wc / 1000;
    const utilPile = sigPile / (fy / gM);
    const utilMax = Math.max(st.util, utilB, utilPile);
    const scour = 1.3 * D;
    const sum = [
      R('Sử dụng thép', nf(utilMax * 100, 0), '%', utilSt(utilMax)),
      R('Xoay đáy biển', nf(th0, 3), '°', th0 <= rotLim ? 'ok' : 'bad'),
      R('Mô men đáy M', nf(Mc / 1000, 1), 'MN·m'),
    ];
    const notes = [];
    const cn = caseNote(s);
    if (cn) notes.push(cn);
    notes.push('API p-y chưa hiệu chỉnh cho monopile đường kính lớn, thường dùng làm kiểm tra sơ bộ. Thiết kế chính thức dùng PISA hoặc phần tử hữu hạn 3D.');
    notes.push('Cộng thẳng lực sóng cực đại với lực gió là cách làm thiên về an toàn. Phân tích tích hợp cho giá trị nhỏ hơn.');
    if (Math.abs(sls.yToe) > 0.1 * Math.abs(sls.y0) + 0.002) notes.push('Mũi cọc còn chuyển vị đáng kể so với đầu cọc. Hãy thử tăng chiều sâu ngàm.');
    if (L / D < 3) notes.push('L/D rất thấp, ứng xử rất cứng và kết quả kém tin cậy.');
    if (s.limited) notes.push('Sóng bị khống chế bởi độ sâu: xét thêm tải xung kích sóng vỡ.');
    const det = [
      { h: 'Tải tại đáy biển (tiêu chuẩn)', rows: [
        R('Lực sóng lớn nhất', nf(env.Fmax, 0), 'kN'),
        R('Mô men sóng lớn nhất', nf(env.Mmax, 0), 'kN·m'),
        R('Lực gió (rotor + tháp)', nf(s.Fwind, 0), 'kN'),
        R('Lực ngang tổng H', nf(Hc, 0), 'kN'),
        R('Mô men tổng M', nf(Mc, 0), 'kN·m'),
        R('Mô men tính toán γ_f·M', nf(gf * Mc, 0), 'kN·m'),
      ] },
      { h: 'Tiết diện tại đáy biển', rows: [
        R('Chiều dày hữu hiệu (đã trừ ăn mòn)', nf(te * 1000, 0), 'mm'),
        R('Mô đun chống uốn W', nf(st.W, 2), 'm³'),
        R('Ứng suất σ', nf(st.sigma, 1), 'MPa'),
        R('Khả năng f_y/γ_M', nf(st.resist, 1), 'MPa'),
        R('Hệ số sử dụng (chảy)', nf(st.util, 2), '', utilSt(st.util), st.util <= 1 ? 'đạt' : 'vượt'),
      ] },
      { h: 'Ổn định vỏ ống', rows: [
        R('Tỷ số D/t', nf(sb.Dt, 0)),
        R('Ứng suất tới hạn đàn hồi σ_E', nf(sb.sigE, 0), 'MPa'),
        R('Độ mảnh quy đổi λ̄', nf(sb.lam, 2)),
        R('Cường độ ổn định f_ks', nf(sb.fks, 0), 'MPa'),
        R('Hệ số sử dụng (ổn định)', nf(utilB, 2), '', utilSt(utilB), utilB <= 1 ? 'đạt' : 'vượt'),
      ] },
      { h: 'Đáp ứng cọc theo p-y (tải tiêu chuẩn)', rows: [
        R('Độ võng tại đáy biển', nf(sls.y0 * 1000, 1), 'mm'),
        R('Xoay tại đáy biển', nf(th0, 3), '°', th0 <= rotLim ? 'ok' : 'bad', 'cho phép ' + nf(rotLim, 2) + '°'),
        R('Chuyển vị mũi cọc', nf(sls.yToe * 1000, 1), 'mm'),
        R('Số lần lặp', nf(sls.iter, 0)),
      ] },
      { h: 'Mô men trong cọc dưới đáy biển (tải tính toán)', rows: [
        R('Mô men lớn nhất', nf(Math.abs(uls.Mmax), 0), 'kN·m'),
        R('Độ sâu xuất hiện', nf(uls.zM, 1), 'm'),
        R('Ứng suất uốn', nf(sigPile, 1), 'MPa'),
        R('Hệ số sử dụng', nf(utilPile, 2), '', utilSt(utilPile)),
      ] },
      { h: 'Kiểm tra nhanh bằng Broms', rows: [
        R('Hệ số bị động K_p', nf(br.Kp, 2)),
        R('Cánh tay lực e = M/H', nf(br.e, 1), 'm'),
        R('Chiều sâu ngàm cần', br.L ? nf(br.L, 1) : 'không đủ', 'm', br.L && br.L <= L ? 'ok' : 'warn', br.L && br.L <= L ? 'nhỏ hơn L' : 'lớn hơn L'),
        R('Xói cân bằng ước tính 1,3 D', nf(scour, 1), 'm'),
      ] },
    ];
    return { sum, det, notes, chart: { h: 'Độ võng và mô men dọc cọc (tải tiêu chuẩn)', svg: svgPile(sls, L) }, chart2: { h: 'Lực sóng tổng theo pha sóng (kN)', svg: svgForce(env.curve) } };
  },

  tan() {
    const s = site();
    if (s.err) return { err: s.err };
    const Dp = V('fq_Dp'), tp = V('fq_tp') / 1000, tt = V('fq_tt') / 1000, Ld = fixityLd();
    if (!(Dp > 0) || !(tp > 0) || !(tt > 0) || tp * 2 >= Dp || tt * 2 >= Math.min(s.tw.Db, s.tw.Dt) || !(Ld > 0)) return { err: 'Kích thước móng, tháp hoặc độ sâu ngàm chưa hợp lệ.' };
    const rmin = V('fq_rmin'), rmax = V('fq_rmax');
    if (!(rmin > 0) || rmax < rmin) return { err: 'Tốc độ quay chưa hợp lệ (nhỏ nhất > 0 và không vượt lớn nhất).' };
    const fm = freqModel(s, Ld, s.mg);
    const est = fm.ray, fe = fm.fe.f;
    const manual = V('fq_f1');
    const f1 = manual > 0 ? manual : fe[0];
    const f2 = fe[1];
    const wp = { rpmMin: rmin, rpmMax: rmax, margin: V('fq_mg') / 100 };
    const win = CALC.freqWindow(Object.assign({ f1 }, wp));
    const f2in = f2 >= win.p3[0] && f2 <= win.p3[1];
    const sens = [
      ['Ngàm −30%', freqModel(s, Ld * 0.7, s.mg).fe.f[0]],
      ['Ngàm +30%', freqModel(s, Ld * 1.3, s.mg).fe.f[0]],
      ['Sinh vật bám +100 mm', freqModel(s, Ld, s.mg + 0.1).fe.f[0]],
    ].map(([l, f]) => { const w2 = CALC.freqWindow(Object.assign({ f1: f }, wp)); return [l, nf(f, 3) + ' Hz', w2.zone.split(' (')[0], chip(w2.ok ? 'ok' : 'bad', w2.ok ? 'tránh được' : 'cộng hưởng')]; });
    const Dw = Dp + 2 * s.mg;
    const Ucur = V('c_vT') + V('c_vW');
    const secArea = CALC.tube(Dp, tp).A;
    const me = 7850 * secArea * (1 + V('fq_sec') / 100) + 1025 * Math.PI * Dw * Dw / 4;
    const vv = CALC.viv({ U: Ucur, fn: f1, D: Dw, me, delta: V('fq_delta') });
    const vivSt = vv.Ur >= 4 && vv.Ur <= 10 ? 'warn' : 'ok';
    const fp = 1 / s.Tpk;
    const sum = [R('f₁', nf(f1, 3), 'Hz'), R('f₂', nf(f2, 3), 'Hz', f2in ? 'bad' : 'ok', f2in ? 'trong dải 3P' : ''), R('Đánh giá f₁', win.ok ? 'Tránh được' : 'Cộng hưởng', '', win.ok ? 'ok' : 'bad')];
    const det = [
      { h: 'Tần số riêng', rows: [
        R('Độ sâu ngàm giả định', nf(Ld, 1), 'm', '', nf(Ld / Dp, 1) + ' D'),
        R('Khối lượng kết cấu (không kể RNA)', nf(est.mStruct / 1000, 0), 't'),
        R('f₁ phần tử dầm', nf(fe[0], 3), 'Hz'),
        R('f₁ Rayleigh (cận trên)', nf(est.f, 3), 'Hz'),
        R('f₂ phần tử dầm', nf(f2, 3), 'Hz'),
        R('f₃ phần tử dầm', nf(fm.fe.f[2], 3), 'Hz'),
        R('f₁ dùng để đánh giá', nf(f1, 3), 'Hz'),
      ] },
      { h: 'Dải tần số tránh', rows: [
        R('Dải 1P', nf(win.p1[0], 3) + ' – ' + nf(win.p1[1], 3), 'Hz'),
        R('Dải 3P', nf(win.p3[0], 3) + ' – ' + nf(win.p3[1], 3), 'Hz'),
        R('Kết luận f₁', win.zone, '', win.ok ? 'ok' : 'bad'),
        R('f₂ so với dải 3P', f2in ? 'Rơi vào dải 3P' : f2 < win.p3[0] ? 'Dưới dải 3P' : 'Trên dải 3P', '', f2in ? 'bad' : 'ok'),
        R('Đỉnh phổ sóng 1/T_p', nf(fp, 3), 'Hz', f1 > 2 * fp || f1 < 0.5 * fp ? 'ok' : 'warn', f1 > 2 * fp ? 'xa phổ sóng' : f1 < 0.5 * fp ? 'xa phổ sóng' : 'gần phổ sóng'),
      ] },
      { h: 'Cộng hưởng xoáy (VIV)', rows: [
        R('Vận tốc dòng chảy lớn nhất ở mặt', nf(Ucur, 2), 'm/s'),
        R('Đường kính thủy động', nf(Dw, 2), 'm'),
        R('U_r = U / (f₁·D)', nf(vv.Ur, 2), '', vivSt, vv.Ur < 4 ? 'dưới vùng nguy cơ' : vv.Ur <= 10 ? 'trong vùng nguy cơ' : 'trên vùng nguy cơ'),
        R('Thông số ổn định k_s', nf(vv.ks, 2)),
      ] },
      { h: 'Độ nhạy', tbl: { head: ['Thay đổi', 'f₁', 'Vùng', 'Đánh giá'], rows: sens } },
    ];
    const notes = [
      'Phần tử dầm cho f₁ và f₂ với ngàm tại độ sâu giả định. Đất mềm, độ đàn hồi quay ở ngàm và xói đều làm giảm tần số. Bài giảng quy ước độ sâu ngàm 3,5–4,5 D (sét) đến 7,0–8,5 D (đất mềm).',
      'Bài giảng nhấn mạnh cần kiểm tra cả tần số riêng thứ nhất và thứ hai, vì với tua bin lớn dải 3P có thể trải đến khoảng 0,5 đến 0,65 Hz.',
      'Khi f₁ nằm sát biên dải 3P, hãy kiểm tra độ nhạy như bảng trên và xét tổ hợp có xói.',
      'Dải nguy cơ VIV U_r từ 4 đến 10 lấy theo đồ thị trong bài giảng (slide 25), chỉ là mức tham khảo. Giảm lượng loga δ là giả định.',
    ];
    return { sum, det, notes, chart: { h: 'Cửa sổ tần số', svg: svgFreq(win, f1, f2) } };
  },

  moi() {
    const bins = [];
    for (let i = 1; i <= 6; i++) { const S = V('mo_S' + i), n = V('mo_n' + i); if (S > 0 && n > 0) bins.push({ S, n }); }
    if (!bins.length) return { err: 'Cần ít nhất một dải biên độ ứng suất có số chu kỳ lớn hơn 0.' };
    const t = V('mo_t'), scf = V('mo_scf'), dff = V('mo_dff'), yr = V('mo_yr');
    if (!(t > 0) || !(scf > 0) || !(dff > 0) || !(yr > 0)) return { err: 'Chiều dày, SCF, DFF và tuổi thọ phải lớn hơn 0.' };
    const curve = V('mo_curve');
    const m = CALC.miner({ bins, curve, t, scf, dff, years: yr });
    const sum = [
      R('Hư hỏng D', nf(m.D, 3)),
      R('D · DFF', nf(m.util, 2), '', utilSt(m.util)),
      R('Tuổi thọ mỏi', isFinite(m.life) ? nf(m.life, 0) : '∞', 'năm', m.life >= yr ? 'ok' : 'bad'),
    ];
    const rows = m.rows.map((r) => [nf(r.S, 1), sci(r.n), sci(r.N), nf(r.D, 4), nf((r.D / m.D) * 100, 0) + '%']);
    const k = Math.pow(Math.max(t, 25) / 25, 0.2);
    const det = [
      { h: 'Kết quả theo từng dải', tbl: { head: ['Δσ điểm nóng (MPa)', 'n', 'N chịu được', 'n/N', 'Tỷ trọng'], rows } },
      { h: 'Thông số', rows: [
        R('Hệ số chiều dày (t/25)^0,2', nf(k, 3)),
        R('Tổng hư hỏng D', nf(m.D, 4)),
        R('Yêu cầu D · DFF ≤ 1', nf(m.util, 3), '', utilSt(m.util), m.util <= 1 ? 'đạt' : 'vượt'),
        R('Tuổi thọ mỏi tính được', isFinite(m.life) ? nf(m.life, 1) : '∞', 'năm'),
      ] },
    ];
    const chart = { h: 'Tỷ trọng hư hỏng theo dải ứng suất (%)', svg: svgBars(m.rows.map((r) => ({ l: nf(r.S, 0) + ' MPa', v: (r.D / m.D) * 100, d: 0 })), '%') };
    const notes = [
      'Phổ ứng suất thật lấy từ phân tích mỏi tích hợp theo DLC 1.2, 6.4 và các DLC mỏi khác, đếm chu kỳ bằng rainflow.',
      'Giá trị mặc định là phổ minh họa. Hãy thay bằng kết quả từ phần mềm tải tích hợp.',
    ];
    return { sum, det, notes, chart };
  },

  jac() {
    const s = site('jac');
    if (s.err) return { err: s.err };
    const Dl = V('jk_Dl'), B = V('jk_B'), tl = V('jk_t') / 1000, Db = V('jk_Db'), tb = V('jk_tb') / 1000, hb = V('jk_hb');
    if (!(Dl > 0) || !(B > 0) || !(tl > 0) || tl * 2 >= Dl || !(Db > 0) || !(tb > 0) || tb * 2 >= Db || !(hb > 0)) return { err: 'Kích thước chân, thanh giằng hoặc khoảng cách chưa hợp lệ.' };
    const dir = V('jk_dir');
    const geo = foundation('jac', s);
    const env = CALC.envLoads({ d: s.d, H: s.Hd, T: s.Tp, legs: geo.legs, CD: geo.CD, CM: geo.CM, kb: geo.kb, curr: s.curr });
    const Hc = env.Fmax + s.Fwind;
    const Mc = env.Mmax + s.Mwind;
    const gf = s.gf !== null ? s.gf : V('jk_gf');
    const fy = V('jk_fy'), gM = V('jk_gM');
    const lg = CALC.jacketLegs({ N: V('jk_N'), M: Mc, B, dir });
    const uplift = lg.tens < 0;
    const leg = CALC.apiColumn({ D: Dl, t: tl, Lk: V('jk_Lk'), K: 0.8, fy });
    const Nd = gf * Math.max(lg.comp, 0);
    const utilLeg = Nd / (leg.Rc / gM);
    const alpha = Math.atan(hb / B);
    const Lb = Math.sqrt(B * B + hb * hb);
    const Nb = (gf * Hc) / (4 * Math.cos(alpha));
    const br = CALC.apiColumn({ D: Db, t: tb, Lk: Lb, K: 0.8, fy });
    const utilBr = Nb / (br.Rc / gM);
    const soil = V('jk_soil');
    const pl = CALC.pileTensionLength({ Q: uplift ? -lg.tens : 0, Dp: V('jk_Dp'), FS: V('jk_FS'), soil, beta: V('jk_beta'), gp: V('jk_gp'), alpha: V('jk_alpha'), su: V('jk_su') });
    const utilMax = Math.max(utilLeg, utilBr);
    const sum = [
      R('Sử dụng chân/giằng', nf(utilMax * 100, 0), '%', utilSt(utilMax)),
      R('Nhổ / chân', uplift ? nf(-lg.tens, 0) : '0', 'kN', uplift ? 'warn' : 'ok', uplift ? 'có nhổ' : 'chỉ nén'),
      R('Cọc cần (nhổ)', uplift ? nf(pl.L, 1) : '–', 'm'),
    ];
    const det = [
      { h: 'Tải lên giàn (tiêu chuẩn)', rows: [
        R('Lực sóng lớn nhất', nf(env.Fmax, 0), 'kN'),
        R('Mô men sóng lớn nhất', nf(env.Mmax, 0), 'kN·m'),
        R('Lực gió (rotor + tháp)', nf(s.Fwind, 0), 'kN'),
        R('Lực ngang H', nf(Hc, 0), 'kN'),
        R('Mô men đáy M', nf(Mc, 0), 'kN·m'),
      ] },
      { h: 'Lực trong chân (tiêu chuẩn)', rows: [
        R('Phần do tải đứng N/4', nf(V('jk_N') / 4, 0), 'kN'),
        R('Phần do mô men', nf(lg.dN, 0), 'kN'),
        R('Nén lớn nhất', nf(lg.comp, 0), 'kN'),
        R('Nhổ (âm = nhổ)', nf(lg.tens, 0), 'kN'),
      ] },
      { h: 'Chân chịu nén (API RP 2A)', rows: [
        R('Nén tính toán γ_f·N', nf(Nd, 0), 'kN'),
        R('Độ mảnh quy đổi λ_c', nf(leg.lam, 2)),
        R('Ứng suất giới hạn F_xc', nf(leg.Fxc, 0), 'MPa'),
        R('Sức kháng nén R_c/γ_M', nf(leg.Rc / gM, 0), 'kN'),
        R('Hệ số sử dụng', nf(utilLeg, 2), '', utilSt(utilLeg)),
        R('D/t', nf(leg.Dt, 0), '', leg.Dt <= 60 ? 'ok' : 'warn', leg.Dt <= 60 ? '' : 'xét ổn định cục bộ'),
      ] },
      { h: 'Thanh giằng X', rows: [
        R('Góc nghiêng so với phương ngang', nf((alpha * 180) / Math.PI, 1), '°'),
        R('Chiều dài thanh Lb', nf(Lb, 1), 'm'),
        R('Lực dọc N_b', nf(Nb, 0), 'kN'),
        R('Sức kháng nén R_c/γ_M', nf(br.Rc / gM, 0), 'kN'),
        R('Hệ số sử dụng', nf(utilBr, 2), '', utilSt(utilBr)),
      ] },
      { h: 'Cọc chịu nhổ', rows: [
        R('Sức kháng cần = FS · Q', uplift ? nf(-lg.tens * V('jk_FS'), 0) : '0', 'kN'),
        R('Chiều dài ngàm tối thiểu', uplift ? nf(pl.L, 1) : 'không có nhổ', 'm'),
      ] },
    ];
    const notes = [];
    const cn = caseNote(s);
    if (cn) notes.push(cn);
    notes.push('Tính cho giàn 4 chân. Mô-đun chưa kiểm tra mối nối ống, độ mỏi tại nút và tải trên từng thanh. Cần dùng mô hình giàn đầy đủ cho thiết kế chính thức.');
    notes.push('Sức kháng nhổ chỉ gồm ma sát bên. Cọc còn phải đủ sức chịu nén (xem TCVN 10304:2014) và tải ngang.');
    return { sum, det, notes, chart: { h: 'Lực sóng tổng lên giàn theo pha (kN)', svg: svgForce(env.curve) } };
  },

  gbs() {
    const s = site('gbs');
    if (s.err) return { err: s.err };
    const Dc = V('gb_Dc'), Db = V('gb_Db'), Vg = V('gb_V');
    if (!(Dc > 0) || !(Db > 0) || !(Vg > 0)) return { err: 'Kích thước và tải đứng phải lớn hơn 0.' };
    const geo = foundation('gbs', s);
    const env = CALC.envLoads({ d: s.d, H: s.Hd, T: s.Tp, legs: geo.legs, CD: geo.CD, CM: geo.CM, kb: 0, curr: s.curr });
    const Hc = env.Fmax + s.Fwind;
    const Mc = env.Mmax + s.Mwind;
    const g = CALC.gbs({ Db, V: Vg, H: Hc, M: Mc, soil: V('gb_soil'), phi: V('gb_phi'), su: V('gb_su'), gp: V('gb_gp'), Df: V('gb_Df') });
    if (g.fail) return { err: g.fail };
    const el = CALC.gbsElastic({ Db, V: Vg, M: Mc, Es: V('gb_Es'), nu: V('gb_nu') });
    const DL = Dc / s.w.L;
    const fb = V('gb_FSb'), fsl = V('gb_FSs'), fo = V('gb_FSo'), rotLim = V('gb_rot');
    const sum = [
      R('FS sức chịu tải', nf(g.FSb, 1), '', fsSt(g.FSb, fb)),
      R('FS trượt', nf(g.FSs, 1), '', fsSt(g.FSs, fsl)),
      R('FS lật', nf(g.FSo, 1), '', fsSt(g.FSo, fo)),
    ];
    const coreOk = g.e <= g.core;
    const Vmin1 = (8 * Mc) / Db;
    const Vmin2 = (fo * Mc) / (Db / 2);
    const det = [
      { h: 'Tải tại đáy móng (tiêu chuẩn)', rows: [
        R('Lực sóng lớn nhất', nf(env.Fmax, 0), 'kN'),
        R('Lực gió (rotor + tháp)', nf(s.Fwind, 0), 'kN'),
        R('Lực ngang H', nf(Hc, 0), 'kN'),
        R('Mô men đáy M', nf(Mc, 0), 'kN·m'),
        R('Tải đứng V', nf(Vg, 0), 'kN'),
      ] },
      { h: 'Ổn định', rows: [
        R('Độ lệch tâm e = M/V', nf(g.e, 2), 'm', coreOk ? 'ok' : 'warn', coreOk ? 'trong lõi' : 'ngoài lõi'),
        R('Giới hạn lõi D/8', nf(g.core, 2), 'm'),
        R('Diện tích hữu hiệu', nf(g.Aeff, 0), 'm²'),
        R('Áp lực giới hạn q_u', nf(g.qu, 0), 'kPa'),
        R('FS sức chịu tải', nf(g.FSb, 2), '', fsSt(g.FSb, fb), 'yêu cầu ≥ ' + nf(fb, 1)),
        R('FS trượt', nf(g.FSs, 2), '', fsSt(g.FSs, fsl), 'yêu cầu ≥ ' + nf(fsl, 1)),
        R('FS lật', nf(g.FSo, 2), '', fsSt(g.FSo, fo), 'yêu cầu ≥ ' + nf(fo, 1)),
      ] },
      { h: 'Biến dạng (đàn hồi, tải tiêu chuẩn)', rows: [
        R('Độ lún', nf(el.s * 1000, 1), 'mm'),
        R('Xoay do mô men', nf(el.thDeg, 3), '°', el.thDeg <= rotLim ? 'ok' : 'bad', 'cho phép ' + nf(rotLim, 2) + '°'),
      ] },
      { h: 'Tải đứng tối thiểu để tham khảo', rows: [
        R('Để lực nằm trong lõi (e ≤ D/8)', nf(Vmin1, 0), 'kN'),
        R('Để đạt FS lật yêu cầu', nf(Vmin2, 0), 'kN'),
      ] },
    ];
    const notes = [];
    const cn = caseNote(s);
    if (cn) notes.push(cn);
    notes.push('Hệ số an toàn nhập ở trên chỉ để tham khảo. Hồ sơ thật phải dùng hệ số riêng phần của tiêu chuẩn đã chọn (IEC 61400-3-1 với ISO 19901-4 hoặc TCVN 9362:2012).');
    notes.push('Chưa kiểm tra tải chu kỳ làm tăng áp lực nước lỗ rỗng, xói dưới mép móng và phá hoại cục bộ.');
    if (DL > 0.2) notes.push('D/L = ' + nf(DL, 2) + ' vượt 0,2: Morison không còn phù hợp, cần tính nhiễu xạ (MacCamy–Fuchs).');
    return { sum, det, notes, chart: { h: 'Lực sóng lên thân móng theo pha (kN)', svg: svgForce(env.curve) } };
  },

  dd() {
    const s = site();
    if (s.err) return { err: s.err };
    const Dp = V('fq_Dp');
    const Ld = fixityLd();
    const fm = freqModel(s, Ld, s.mg);
    const manual = V('fq_f1');
    const f1 = manual > 0 ? manual : fm.fe.f[0];
    const T1 = 1 / f1;
    const soil = V('dd_soil'), agg = V('dd_ag');
    if (!(agg > 0)) return { err: 'Gia tốc nền phải lớn hơn 0.' };
    const rat = CALC.apiSpectrum(T1, soil);
    const Sa = rat * agg * 9.81;
    const r = CALC.seismicMode1({ shape: fm.ray.shape, zSeabed: Ld, Sa });
    const dl = dlcCases('mono', s);
    const Mg = dl.gov.M;
    const spec = [0.1, 0.2, 0.5, 1, 2, 5].map((T) => [nf(T, 1) + ' s', nf(CALC.apiSpectrum(T, soil), 2), nf(CALC.apiSpectrum(T, soil) * agg, 3) + ' g']);
    const sum = [R('T₁', nf(T1, 2), 's'), R('Lực cắt đáy biển', nf(r.V, 0), 'kN'), R('Mô men đáy biển', nf(r.M / 1000, 1), 'MN·m')];
    const det = [
      { h: 'Phản ứng phổ', rows: [
        R('Chu kỳ riêng T₁ = 1/f₁', nf(T1, 2), 's', '', 'f₁ = ' + nf(f1, 3) + ' Hz'),
        R('S_A / a_g (đất ' + soil + ')', nf(rat, 2)),
        R('Gia tốc nền a_g', nf(agg, 3), 'g'),
        R('Gia tốc phổ S_A', nf(rat * agg, 3), 'g'),
        R('Hệ số tham gia Γ', nf(r.gam, 2)),
      ] },
      { h: 'Tải động đất tại đáy biển', rows: [
        R('Lực cắt đáy V', nf(r.V, 0), 'kN'),
        R('Mô men đáy M', nf(r.M, 0), 'kN·m'),
        R('Mô men chi phối từ gió và sóng (DLC)', nf(Mg, 0), 'kN·m', '', 'DLC ' + dl.gov.id),
        R('Tỷ số M động đất / M gió-sóng', nf((r.M / Mg) * 100, 1), '%', r.M / Mg < 0.5 ? 'ok' : 'warn', r.M / Mg < 0.5 ? 'không chi phối' : 'cần xét'),
      ] },
      { h: 'Phổ phản ứng theo chu kỳ', tbl: { head: ['Chu kỳ T', 'S_A / a_g', 'S_A'], rows: spec } },
    ];
    const notes = [
      'Phản ứng đàn hồi theo dạng dao động thứ nhất, cản 5%, chưa chia cho hệ số ứng xử. Tính chất đàn hồi dẻo, tương tác đất–kết cấu và các dạng dao động cao hơn chưa kể.',
      'Tua bin gió có chu kỳ riêng dài (cỡ vài giây) nên gia tốc phổ nhỏ. Động đất thường không chi phối so với gió và sóng, nhưng cần kiểm tra thêm hóa lỏng nền và tải đồng thời với tua bin.',
      'Hồ sơ thật dùng phổ riêng của địa điểm theo ISO 19901-2 và đối chiếu TCVN 9386:2012.',
    ];
    return { sum, det, notes };
  },

  vd4() {
    const H = V('v4_H'), T = V('v4_T'), h = V('v4_h'), D = V('v4_D'), CD = V('v4_CD'), CM = V('v4_CM'), Uc0 = V('v4_Uc');
    if (!(H > 0 && T > 0 && h > 0 && D > 0)) return { err: 'H, T, h và D phải lớn hơn 0.' };
    const p = { H, T, h, D, CD, CM, Uc0 };
    const cr = CALC.morisonTable({ ...p, phase: 0 });
    const m0 = CALC.morisonTable({ ...p, phase: Math.PI / 2 });
    const w = CALC.windMonopile({ DR: V('v4_DR'), zhub: V('v4_zh'), V: V('v4_V'), alpha: V('v4_al'), CT: V('v4_CT'), CDn: V('v4_CDn'), AN: V('v4_AN'), Dtb: V('v4_Dtb'), Dtt: V('v4_Dtt'), Ht: V('v4_Ht'), CDt: V('v4_CDt'), h });
    const vc = CALC.vecCombine({ N: V('v4_N'), Vx: V('v4_Vx'), Vy: V('v4_Vy'), Mx: V('v4_Mx'), My: V('v4_My'), Tq: V('v4_Tq'), gf: V('v4_gf'), MR: V('v4_MR') });
    const tbl = (m, withI) => withI
      ? { head: ['z (m)', 'a_w', 'U_c', 'f_D', 'f_I', 'f tổng'], rows: m.rows.map((r) => [nf(r.z, 0), nf(r.aw, 3), nf(r.uc, 3), nf(r.fD, 2), nf(r.fI, 2), nf(r.f, 2)]) }
      : { head: ['z (m)', 'u_w', 'U_c', 'u_r', 'f_D (kN/m)'], rows: m.rows.map((r) => [nf(r.z, 0), nf(r.uw, 3), nf(r.uc, 3), nf(r.ur, 3), nf(r.fD, 2)]) };
    const sum = [
      R('F sóng + dòng, đỉnh sóng', nf(cr.F, 1), 'kN', '', 'M = ' + nf(cr.M, 2) + ' MN·m'),
      R('F sóng + dòng, η = 0', nf(m0.F, 1), 'kN', '', 'M = ' + nf(m0.M, 1) + ' MN·m'),
      R('UR tổ hợp ULS', nf(vc.UR, 2), '', vc.UR <= 1 ? 'ok' : 'bad', vc.UR <= 1 ? 'đạt' : 'không đạt'),
    ];
    const det = [
      { h: 'Đỉnh sóng trùng tim cọc (kx − ωt = 0)', rows: [
        R('Bước sóng L', nf(cr.L, 2), 'm', '', 'k = ' + nf(cr.k, 5) + ' 1/m'),
        R('Lực tổng (hình thang, bảng 5 m)', nf(cr.F, 2), 'kN', '', 'slide: 115,38'),
        R('Mô men tại mudline', nf(cr.M, 3), 'MN·m', '', 'slide: 2,34'),
        R('Lực tổng (tích phân chi tiết)', nf(cr.Fc, 2), 'kN', '', nf(((cr.Fc - cr.F) / cr.F) * 100, 1) + '%'),
      ] },
      { h: 'Bảng đỉnh sóng', tbl: tbl(cr, false) },
      { h: 'Mặt nước tại tim cọc bằng MSL (kx − ωt = π/2)', rows: [
        R('Lực tổng (hình thang, bảng 5 m)', nf(m0.F, 2), 'kN', '', 'slide: 1 248,46'),
        R('Mô men tại mudline', nf(m0.M, 2), 'MN·m', '', 'slide: 23,30'),
        R('Thành phần cản F_D', nf(m0.FD, 2), 'kN'),
        R('Thành phần quán tính F_I', nf(m0.FI, 2), 'kN', '', nf((m0.FI / m0.F) * 100, 1) + '% tổng'),
        R('Lực tổng (tích phân chi tiết)', nf(m0.Fc, 2), 'kN', '', nf(((m0.Fc - m0.F) / m0.F) * 100, 1) + '%'),
      ] },
      { h: 'Bảng pha π/2', tbl: tbl(m0, true) },
      { h: 'Tải gió lên tuabin', rows: [
        R('Lực đẩy rotor T', nf(w.T / 1000, 2), 'MN', '', 'slide: 1,60'),
        R('Lực lên nacelle F_N', nf(w.FN, 1), 'kN', '', 'slide: 6,9'),
        R('Lực gió lên tháp F_T', nf(w.FT, 1), 'kN', '', 'tại ' + nf(w.zT, 1) + ' m; slide: 46'),
        R('Tổng lực ngang F_wind', nf(w.F / 1000, 2), 'MN', '', 'slide: 1,65'),
        R('Mô men tại mudline M_wind', nf(w.M, 1), 'MN·m', '', 'slide: 229'),
      ] },
      { h: 'Tổ hợp ULS', rows: [
        R('N_d', nf(vc.d.N, 1), 'MN'), R('V_x,d', nf(vc.d.Vx, 2), 'MN'), R('V_y,d', nf(vc.d.Vy, 2), 'MN'),
        R('M_x,d', nf(vc.d.Mx, 0), 'MN·m'), R('M_y,d', nf(vc.d.My, 0), 'MN·m'), R('T_d', nf(vc.d.T, 2), 'MN·m'),
        R('Lực cắt tổng hợp V_d', nf(vc.Vd, 2), 'MN', '', 'slide: 11,53'),
        R('Mô men uốn tổng hợp M_b,d', nf(vc.Mb, 0), 'MN·m', '', 'slide: 1 084'),
        R('UR = M_b,d / R_d', nf(vc.UR, 2), '', vc.UR <= 1 ? 'ok' : 'bad', vc.UR <= 1 ? 'đạt' : 'không đạt'),
      ] },
    ];
    const notes = [
      'Hai ví dụ sóng dùng sóng nhỏ (H = 2,5 m) để minh họa cách tính. Khác với dự án bão cực hạn của các mô-đun khác (H_max = 10,31 m, C_M = 1,2).',
      'Kết quả khớp slide: sai khác nhỏ do slide làm tròn các giá trị trung gian. Sai khác 0,8% giữa tích phân hình thang bảng 5 m và tích phân chi tiết là sai số cầu phương, không phải sai số của công thức.',
      'Tải gió lấy tháp từ MSL đến 105 m. Diện tích nacelle 65 m² là giả định để khớp 6,9 kN của slide, sức kháng R_d = 1 290 MN·m suy từ UR = 0,84, bài giảng không cho trực tiếp. Số liệu DLC 6.1 của slide là số giả định minh họa.',
    ];
    return { sum, det, notes };
  },

  flo() {
    const s = site();
    if (s.err) return { err: s.err };
    const D = V('fl_D'), T = V('fl_T'), KG = V('fl_KG');
    if (!(D > 0) || !(T > 0)) return { err: 'Đường kính và chiều chìm phải lớn hơn 0.' };
    const sp = CALC.spar({ D, T, KG, thrust: s.thrust, hHub: s.hHub });
    const Km = V('fl_Km');
    const pr = CALC.sparPeriods({ D, T, KG, Kmoor: Km, C55: sp.C55 });
    const lim = V('fl_lim');
    const heelSt = !isFinite(sp.heel) ? 'bad' : sp.heel <= lim ? 'ok' : 'bad';
    const sum = [
      R('GM', nf(sp.GM, 2), 'm', sp.GM > 0 ? 'ok' : 'bad'),
      R('Nghiêng tĩnh', isFinite(sp.heel) ? nf(sp.heel, 1) : '–', '°', heelSt),
      R('T riêng nhún', nf(sp.Th, 1), 's', perSt(sp.Th, s.Tpk)),
    ];
    const det = [
      { h: 'Thủy tĩnh', rows: [
        R('Thể tích chiếm nước', nf(sp.Vol, 0), 'm³'),
        R('Lượng giãn nước', nf(sp.disp, 0), 't'),
        R('KB', nf(sp.KB, 2), 'm'),
        R('BM', nf(sp.BM, 2), 'm'),
        R('GM = KB + BM − KG', nf(sp.GM, 2), 'm', sp.GM > 0 ? 'ok' : 'bad', sp.GM > 0 ? 'ổn định' : 'mất ổn định'),
        R('Độ cứng hồi phục C₅₅', nf(sp.C55 / 1000, 0), 'MN·m/rad'),
      ] },
      { h: 'Nghiêng do lực đẩy gió', rows: [
        R('Lực đẩy gió', nf(s.thrust, 0), 'kN'),
        R('Cánh tay so với trọng tâm', nf(sp.arm, 1), 'm'),
        R('Mô men nghiêng', nf(sp.Mth, 0), 'kN·m'),
        R('Góc nghiêng tĩnh', isFinite(sp.heel) ? nf(sp.heel, 2) : '–', '°', heelSt, 'cho phép ' + nf(lim, 0) + '°'),
        R('Trôi dạt ngang tĩnh', Km > 0 ? nf(s.thrust / Km, 1) : '–', 'm'),
      ] },
      { h: 'Chu kỳ riêng và cộng hưởng với sóng', rows: [
        R('Chu kỳ sóng T_p', nf(s.Tpk, 1), 's'),
        R('Nhún T_h', nf(sp.Th, 1), 's', perSt(sp.Th, s.Tpk), sp.Th / s.Tpk >= 1.5 ? 'xa cộng hưởng' : sp.Th / s.Tpk >= 0.8 ? 'gần cộng hưởng' : ''),
        R('Lắc dọc T_p', nf(pr.Tpitch, 1), 's', perSt(pr.Tpitch, s.Tpk), pr.Tpitch / s.Tpk >= 1.5 ? 'xa cộng hưởng' : pr.Tpitch / s.Tpk >= 0.8 ? 'gần cộng hưởng' : ''),
        R('Trôi dạt T_s', isFinite(pr.Tsurge) ? nf(pr.Tsurge, 1) : '–', 's', isFinite(pr.Tsurge) ? perSt(pr.Tsurge, s.Tpk) : ''),
      ] },
      { h: 'Khối lượng và quán tính', rows: [
        R('Khối lượng khô + dằn', nf(sp.disp, 0), 't'),
        R('Quán tính I₅₅ (không gồm nước nâng)', nf(pr.Icyl / 1e9, 1), 'GN·m²·s²'),
        R('Khối lượng nước nâng lắc dọc A₅₅', nf(pr.A55 / 1e9, 1), 'GN·m²·s²'),
      ] },
    ];
    const notes = [
      'Chưa kể độ cứng hồi phục của dây neo, giảm chấn thủy động và tải sóng. Góc nghiêng thực tế sẽ nhỏ hơn khi neo hỗ trợ.',
      'Trụ tròn có chu kỳ nhún gần bằng 2π√(T/g). Muốn tăng chu kỳ nhún cần tấm giảm chấn hoặc phần đáy thon, nằm ngoài mô hình này.',
      'Chỉ dành cho spar. Bán chìm và TLP có nguyên lý khác (xem IEC TS 61400-3-2 và DNV-ST-0119).',
    ];
    return { sum, det, notes };
  },
};

/* ---------- Dựng giao diện ---------- */
const main = $('#main');
const nav = $('#nav');

const ICONS = {
  hoc: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  tinh: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>',
  tu: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v10"/>',
  quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h0"/>',
  kn: '<circle cx="12" cy="10" r="6"/><path d="M9.5 21h5M10 17.5h4M12 7v3.5M12 13h0"/>',
  tcvn: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
};
const TABS = [['hoc', 'Học'], ['kn', 'Khái niệm'], ['tinh', 'Tính toán'], ['tu', 'Thuật ngữ'], ['quiz', 'Trắc nghiệm'], ['tcvn', 'TCVN']];

function renderNav() {
  nav.innerHTML = TABS.map(([id, lb]) =>
    `<button data-tab="${id}" class="${store.tab === id ? 'on' : ''}" aria-current="${store.tab === id}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[id]}</svg><span>${lb}</span></button>`
  ).join('');
}

function schematic() {
  const W = 360, Hh = 262, surf = 52;
  const cols = [
    { n: 'Monopile', r: '0–40 m', sb: 100, t: 'mono' },
    { n: 'Jacket', r: '30–60 m', sb: 156, t: 'jac' },
    { n: 'Trọng lực', r: '0–30 m', sb: 92, t: 'gbs' },
    { n: 'Nổi', r: '> 50 m', sb: 214, t: 'flo' },
  ];
  let wave = `M0 ${surf}`;
  for (let i = 0; i < 16; i++) wave += ` q 11.25 -5 22.5 0`;
  let s = `<svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Bốn loại móng điện gió biển theo độ sâu nước">`;
  s += `<rect class="sw" x="0" y="${surf}" width="${W}" height="${Hh - surf - 36}"/>`;
  cols.forEach((c, i) => {
    const cx = 45 + 90 * i, sb = c.sb;
    s += `<rect class="sd" x="${cx - 45}" y="${sb}" width="90" height="${Hh - 36 - sb}"/>`;
    s += `<line class="tw1" x1="${cx}" y1="16" x2="${cx}" y2="${surf}"/><circle class="tw1f" cx="${cx}" cy="14" r="2.4"/>`;
    s += `<line class="tw1" x1="${cx}" y1="14" x2="${cx - 11}" y2="3"/><line class="tw1" x1="${cx}" y1="14" x2="${cx + 11}" y2="3"/><line class="tw1" x1="${cx}" y1="14" x2="${cx}" y2="1"/>`;
    if (c.t === 'mono') {
      s += `<rect class="fd" x="${cx - 4.5}" y="${surf}" width="9" height="${sb - surf + 30}"/>`;
    } else if (c.t === 'jac') {
      const L = cx - 7, Rr = cx + 7, Lb = cx - 18, Rb = cx + 18;
      s += `<path class="fl" d="M${L} ${surf} L${Lb} ${sb} M${Rr} ${surf} L${Rb} ${sb} M${Lb} ${sb} L${Lb} ${sb + 20} M${Rb} ${sb} L${Rb} ${sb + 20}"/>`;
      const levels = 4;
      for (let k = 0; k < levels; k++) {
        const y1 = surf + ((sb - surf) * k) / levels, y2 = surf + ((sb - surf) * (k + 1)) / levels;
        const x1 = (a) => cx - (7 + (11 * (a - surf)) / (sb - surf));
        const x2 = (a) => cx + (7 + (11 * (a - surf)) / (sb - surf));
        s += `<path class="fl" d="M${x1(y1)} ${y1} L${x2(y2)} ${y2} M${x2(y1)} ${y1} L${x1(y2)} ${y2}"/>`;
      }
    } else if (c.t === 'gbs') {
      s += `<path class="fd" d="M${cx - 4.5} ${surf} H${cx + 4.5} V${sb - 22} L${cx + 24} ${sb - 8} V${sb} H${cx - 24} V${sb - 8} L${cx - 4.5} ${sb - 22} Z"/>`;
    } else {
      s += `<rect class="fd" x="${cx - 7}" y="${surf}" width="14" height="104"/>`;
      s += `<path class="fl" d="M${cx - 7} 140 L${cx - 40} ${sb} M${cx + 7} 140 L${cx + 40} ${sb}"/><circle class="tw1f" cx="${cx - 40}" cy="${sb}" r="2.6"/><circle class="tw1f" cx="${cx + 40}" cy="${sb}" r="2.6"/>`;
    }
    s += `<text class="lb1" x="${cx}" y="${Hh - 20}" text-anchor="middle">${c.n}</text><text class="lb2" x="${cx}" y="${Hh - 6}" text-anchor="middle">${c.r}</text>`;
  });
  s += `<path class="wv" d="${wave}"/></svg>`;
  return s;
}

function accList(arr, pre) {
  return arr.map((t) =>
    `<details class="acc" id="${pre}-${t.id}"><summary><em>${t.tag}</em><span>${t.title}</span></summary><div class="accb">${t.body}</div></details>`
  ).join('');
}

function renderHoc() {
  const intro = `<section class="hero">
<h1>Thiết kế móng điện gió biển</h1>
<p>Học theo IEC 61400-3-1:2019 và đối chiếu với tiêu chuẩn Việt Nam. Đọc lý thuyết, tính toán thiết kế cơ sở, ôn thuật ngữ tiếng Anh và làm trắc nghiệm.</p>
<figure class="fig">${schematic()}<figcaption>Độ sâu nước tham khảo cho từng loại móng. Chiều sâu đáy biển vẽ minh họa, không theo tỷ lệ.</figcaption></figure>
</section>`;
  main.innerHTML = intro +
    `<h2 class="sec">Nền tảng</h2>` + accList(THEORY, 'th') +
    `<h2 class="sec">Chuyên đề: công thức và ví dụ</h2>` + accList(TOPICS, 'tp') +
    `<p class="foot">Ứng dụng phục vụ học tập. Số liệu và công thức cơ sở không thay thế phân tích tích hợp, tiêu chuẩn gốc và thẩm tra độc lập.</p>`;
}

function fieldHtml(id) {
  const f = FIELD[id];
  const hint = f.hint ? `<small>${f.hint}</small>` : '';
  if (f.sel) {
    const cur = V(id);
    return `<label class="fld"><span class="lb">${f.lb}${hint}</span><span class="in"><select data-f="${id}">${f.sel.map(([v, l]) => `<option value="${v}"${v === cur ? ' selected' : ''}>${l}</option>`).join('')}</select></span></label>`;
  }
  const raw = store.vals[id] !== undefined ? store.vals[id] : String(f.d).replace('.', ',');
  return `<label class="fld"><span class="lb">${f.lb}${hint}</span><span class="in"><input data-f="${id}" inputmode="decimal" autocomplete="off" autocorrect="off" value="${esc(raw)}"><i>${f.u}</i></span></label>`;
}

function renderTinh() {
  const chips = MODS.map((m) => `<button data-calc="${m.id}" class="${store.calc === m.id ? 'on' : ''}">${m.nm}</button>`).join('');
  const m = MODS.find((x) => x.id === store.calc) || MODS[0];
  const groups = m.groups.map((g) => `<fieldset class="grp"><legend>${g.h}</legend>${g.f.map(fieldHtml).join('')}</fieldset>`).join('');
  main.innerHTML = `<div class="chips" role="tablist">${chips}</div>
<p class="intro">${m.intro}</p>
<div class="sum" id="sum" aria-live="polite"></div>
${groups}
<button class="ghost" data-reset="${m.id}">Đặt lại giá trị mặc định</button>
<h2 class="sec">Kết quả chi tiết</h2>
<div id="det"></div>
${m.formulas ? `<details class="acc"><summary><em>Tham khảo</em><span>Công thức dùng trong mô-đun</span></summary><div class="accb">${m.formulas}</div></details>` : ''}
<p class="foot">Kết quả là ước lượng ở mức thiết kế cơ sở, dùng sóng Airy với kéo dãn Wheeler và các công thức giản lược. Không dùng thay cho thiết kế chính thức.</p>`;
  updateCalc();
  const act = $('.chips button.on');
  if (act && act.scrollIntoView) { try { act.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) { /* bỏ qua */ } }
}

function updateCalc() {
  const sumEl = $('#sum'), detEl = $('#det');
  if (!sumEl) return;
  let res;
  try { res = COMPUTE[store.calc](); } catch (e) { res = { err: 'Không tính được với số liệu hiện tại. Hãy kiểm tra lại các ô nhập.' }; }
  if (res.err) {
    sumEl.innerHTML = `<div class="err">${res.err}</div>`;
    detEl.innerHTML = '';
    return;
  }
  sumEl.innerHTML = res.sum.map((r) => `<div class="kpi"><span>${r.l}</span><b>${r.v}${r.u ? '<u>' + r.u + '</u>' : ''}</b>${r.s ? chip(r.s) : ''}</div>`).join('');
  let h = res.det.map((d) => `<div class="card"><h3>${d.h}</h3>${d.rows ? rowsHtml(d.rows) : ''}${d.tbl ? tableHtml(d.tbl.head, d.tbl.rows) : ''}</div>`).join('');
  if (res.chart) h += `<div class="card"><h3>${res.chart.h}</h3><div class="chart">${res.chart.svg}</div></div>`;
  if (res.chart2) h += `<div class="card"><h3>${res.chart2.h}</h3><div class="chart">${res.chart2.svg}</div></div>`;
  if (res.notes && res.notes.length) h += `<div class="card notes"><h3>Lưu ý</h3><ul>${res.notes.map((n) => `<li>${n}</li>`).join('')}</ul></div>`;
  detEl.innerHTML = h;
}

/* ----- Thuật ngữ ----- */
const GROUPS = [['all', 'Tất cả'], ['tai', 'Tải và môi trường'], ['kc', 'Kết cấu'], ['dkt', 'Địa kỹ thuật'], ['noi', 'Móng nổi'], ['tc', 'Thi công, vận hành'], ['ts', 'Tiêu chuẩn']];
const fc = { filter: 'all', order: [], i: 0, flip: false };
function fcBuild() {
  let idx = TERMS.map((_, i) => i);
  if (store.fcg !== 'all') idx = idx.filter((i) => TERMS[i][3] === store.fcg);
  if (fc.filter === 'todo') idx = idx.filter((i) => !store.known[TERMS[i][0]]);
  fc.order = idx;
  if (fc.i >= idx.length) fc.i = 0;
  fc.flip = false;
}
function fcShuffle() {
  for (let i = fc.order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fc.order[i], fc.order[j]] = [fc.order[j], fc.order[i]];
  }
  fc.i = 0; fc.flip = false;
}
function renderTu() {
  fcBuild0();
  const total = TERMS.length;
  const knownN = TERMS.filter((t) => store.known[t[0]]).length;
  const grp = `<div class="chips">${GROUPS.map(([id, l]) => `<button data-fcg="${id}" class="${store.fcg === id ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  const head = `${grp}<div class="chips"><button data-fcf="all" class="${fc.filter === 'all' ? 'on' : ''}">Mọi thẻ</button><button data-fcf="todo" class="${fc.filter === 'todo' ? 'on' : ''}">Chưa nhớ (${total - knownN})</button><button data-fcd="1" class="${store.dir === 'vi' ? 'on' : ''}">${store.dir === 'vi' ? 'Việt → Anh' : 'Anh → Việt'}</button><button data-fcs="1">Xáo trộn</button></div>`;
  if (!fc.order.length) {
    main.innerHTML = head + `<div class="card empty"><h3>Không có thẻ nào</h3><p>Bạn đã nhớ hết các thẻ trong nhóm này. Chọn "Mọi thẻ" để ôn lại.</p></div>`;
    return;
  }
  const t = TERMS[fc.order[fc.i]];
  const front = store.dir === 'vi' ? t[1] : t[0];
  const back = store.dir === 'vi' ? t[0] : t[1];
  main.innerHTML = head + `<div class="prog"><span>Thẻ ${fc.i + 1} / ${fc.order.length}</span><span>Đã nhớ ${knownN} / ${total}</span></div>
<button class="flash ${fc.flip ? 'back' : ''}" data-flip="1" aria-label="Lật thẻ">
<small>${fc.flip ? (store.dir === 'vi' ? 'Tiếng Anh' : 'Tiếng Việt') : (store.dir === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh')}</small>
<strong>${esc(fc.flip ? back : front)}</strong>
${fc.flip && t[2] ? `<p>${esc(t[2])}</p>` : ''}
${fc.flip ? '' : '<em>Chạm để lật</em>'}
</button>
<div class="two"><button class="btn no" data-know="0">Chưa nhớ</button><button class="btn yes" data-know="1">Đã nhớ</button></div>
<div class="two"><button class="ghost" data-fcn="-1">‹ Thẻ trước</button><button class="ghost" data-fcn="1">Thẻ sau ›</button></div>`;
}
let fcInit = false;
function fcBuild0() { if (!fcInit) { fcBuild(); fcInit = true; } }

/* ----- Trắc nghiệm ----- */
const qz = { mode: 'start', order: [], i: 0, score: 0, picked: null, wrong: [] };
function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
function qzPool() {
  return QUIZ.map((q, i) => i).filter((i) => (store.qch === 'all' || QUIZ[i].c === store.qch) && (!store.qlv || QUIZ[i].l === store.qlv));
}
function qzStart(n) {
  const pool = qzPool();
  const picked = shuffle(pool).slice(0, n);
  qz.order = picked.map((qi) => {
    const q = QUIZ[qi];
    const opts = shuffle(q.o.map((t, i) => ({ t, ok: i === q.a })));
    return { q: q.q, opts, w: q.w };
  });
  qz.mode = 'run'; qz.i = 0; qz.score = 0; qz.picked = null; qz.wrong = [];
}
const QCH = [['all', 'Mọi chương'], ['iec', 'IEC và DLC'], ['tai', 'Sóng và gió'], ['mono', 'Monopile'], ['jac', 'Jacket'], ['gbs', 'Trọng lực'], ['noi', 'Móng nổi'], ['moi', 'Mỏi, ăn mòn'], ['vn', 'Tiêu chuẩn VN']];
function renderQuiz() {
  if (qz.mode === 'start') {
    const pool = qzPool().length;
    const ch = `<div class="chips">${QCH.map(([id, l]) => `<button data-qch="${id}" class="${store.qch === id ? 'on' : ''}">${l}</button>`).join('')}</div>`;
    const lv = `<div class="chips">${[[0, 'Mọi mức'], [1, 'Cơ bản'], [2, 'Nâng cao']].map(([id, l]) => `<button data-qlv="${id}" class="${store.qlv === id ? 'on' : ''}">${l}</button>`).join('')}</div>`;
    const counts = [10, 20, pool].filter((x, i, a) => x > 0 && x <= pool && a.indexOf(x) === i);
    main.innerHTML = `<section class="hero"><h1>Trắc nghiệm ôn tập</h1><p>${QUIZ.length} câu về IEC 61400-3-1, tải trọng, nền móng và tiêu chuẩn Việt Nam. Chọn chương và mức độ rồi bắt đầu. Đáp án được đảo thứ tự mỗi lần.</p>
${store.best ? `<p class="best">Điểm cao nhất của bạn: <b>${store.best}%</b></p>` : ''}</section>
${ch}${lv}
<p class="prog"><span>${pool} câu phù hợp</span></p>
${pool ? `<div class="two">${counts.map((c) => `<button class="btn yes ${c === pool && counts.length > 1 ? 'alt' : ''}" data-qs="${c}">${c === pool ? 'Tất cả ' + c : c} câu</button>`).join('')}</div>` : '<div class="card empty"><h3>Chưa có câu hỏi</h3><p>Hãy chọn chương hoặc mức độ khác.</p></div>'}`;
    return;
  }
  if (qz.mode === 'end') {
    const n = qz.order.length;
    const pct = Math.round((qz.score / n) * 100);
    const rv = qz.wrong.map((w) => `<div class="card"><h3>${esc(w.q)}</h3><p class="bad">Bạn chọn: ${esc(w.pick)}</p><p class="good">Đáp án đúng: ${esc(w.right)}</p><p>${esc(w.w)}</p></div>`).join('');
    main.innerHTML = `<section class="hero"><h1>${qz.score} / ${n} câu đúng</h1><p class="big">${pct}%</p><p>${pct >= 80 ? 'Rất tốt. Bạn nắm khá chắc phần này.' : pct >= 50 ? 'Khá. Xem lại các câu sai bên dưới rồi làm lại.' : 'Cần ôn thêm. Đọc lại tab Học rồi thử lần nữa.'}</p></section>
${rv ? '<h2 class="sec">Câu cần xem lại</h2>' + rv : ''}
<div class="two"><button class="btn yes" data-qs="${n}">Làm lại</button><button class="ghost" data-qhome="1">Về đầu</button></div>`;
    return;
  }
  const q = qz.order[qz.i];
  const ans = qz.picked !== null;
  const opts = q.opts.map((o, i) => {
    let cls = 'opt';
    if (ans) cls += o.ok ? ' ok' : i === qz.picked ? ' bad' : '';
    return `<button class="${cls}" data-pick="${i}" ${ans ? 'disabled' : ''}><b>${'ABCD'[i]}</b><span>${esc(o.t)}</span></button>`;
  }).join('');
  main.innerHTML = `<div class="prog"><span>Câu ${qz.i + 1} / ${qz.order.length}</span><span>Đúng ${qz.score}</span></div>
<div class="bar"><i style="width:${(qz.i / qz.order.length) * 100}%"></i></div>
<h2 class="qq">${esc(q.q)}</h2>${opts}
${ans ? `<div class="card why"><h3>${q.opts[qz.picked].ok ? 'Chính xác' : 'Chưa đúng'}</h3><p>${esc(q.w)}</p></div><button class="btn yes" data-next="1">${qz.i + 1 === qz.order.length ? 'Xem kết quả' : 'Câu tiếp'}</button>` : ''}`;
}

/* ----- TCVN ----- */
function renderTcvn() {
  const secs = [['topic', 'Theo chủ đề'], ['check', 'Từng kiểm tra'], ['tips', 'Lưu ý áp dụng']];
  const chips = `<div class="chips">${secs.map(([id, l]) => `<button data-tcs="${id}" class="${store.tcsec === id ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  let body = '';
  if (store.tcsec === 'topic') {
    body = TCVN.map((r) => `<div class="card cmp"><h3>${r.topic}</h3>
<dl><dt>Quốc tế</dt><dd>${r.intl}</dd><dt>Việt Nam</dt><dd>${r.vn}</dd></dl><p class="note">${r.note}</p></div>`).join('');
  } else if (store.tcsec === 'check') {
    body = CHECKS.map((r) => `<div class="card cmp"><h3>${r.h}</h3>
<dl><dt>Quốc tế</dt><dd>${r.intl}</dd><dt>TCVN</dt><dd>${r.vn}</dd><dt>Kết hợp</dt><dd>${r.mix}</dd></dl></div>`).join('');
  } else {
    body = TIPS.map((t) => `<details class="acc"><summary><span>${t[0]}</span></summary><div class="accb">${t[1]}</div></details>`).join('') +
      `<button class="ghost" data-goto="gio">Mở máy quy đổi gió</button>`;
  }
  main.innerHTML = `<section class="hero"><h1>Đối chiếu tiêu chuẩn Việt Nam</h1><p>IEC 61400-3-1 là tiêu chuẩn khung cho tua bin gió biển. Tiêu chuẩn Việt Nam bổ sung ở phần tải trọng tự nhiên, kết cấu và nền móng.</p></section>
${chips}${body}
<p class="foot">Số hiệu và năm ban hành ghi theo hiểu biết đến giữa năm 2026. Hãy kiểm tra bản đang có hiệu lực trên cổng thông tin tiêu chuẩn quốc gia trước khi trích dẫn trong hồ sơ.</p>`;
}

/* ---------- Điều phối ---------- */

/* ----- Khái niệm tiếng Việt ----- */
let knQ = '';
function knNorm(x) { return String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
function renderKn() {
  const grp = `<div class="chips">${KN_GROUPS.map(([id, l]) => `<button data-kng="${id}" class="${store.kng === id ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  const gl = Object.fromEntries(KN_GROUPS);
  const list = CONCEPTS.filter((c) => store.kng === 'all' || c.g === store.kng);
  const items = list.map((c, i) => {
    const body = `<p>${c.d}</p>` + (c.e ? `<div class="ex"><b>Ví dụ đời thường.</b> ${c.e}</div>` : '') + (c.a ? `<p class="note"><b>Trong app:</b> ${c.a}</p>` : '');
    const key = knNorm(c.t.replace(/<[^>]+>/g, '') + ' ' + c.d.replace(/<[^>]+>/g, ''));
    return `<details class="acc kn" data-k="${esc(key)}"><summary><em>${gl[c.g]}</em><span>${c.t}</span></summary><div class="accb">${body}</div></details>`;
  }).join('');
  main.innerHTML = `<section class="hero"><h1>Giải thích khái niệm</h1><p>Các khái niệm khó, giải thích bằng tiếng Việt dễ hiểu kèm ví dụ đời thường và số trong ví dụ của app. Chạm vào từng mục để mở.</p></section>` +
    `<input type="search" class="kq" data-kq="1" placeholder="Tìm khái niệm (ví dụ: rối, mỏi, ngàm)" value="${esc(knQ)}" aria-label="Tìm khái niệm">` + grp +
    `<p class="muted" id="knc">${list.length} khái niệm</p>` + items + `<p class="foot">Giải thích mang tính trực quan. Công thức và điều kiện chi tiết xem ở tab Học và tiêu chuẩn gốc.</p>`;
  knFilter();
}
function knFilter() {
  const q = knNorm(knQ.trim());
  let n = 0;
  document.querySelectorAll('.acc.kn').forEach((el) => {
    const ok = !q || el.dataset.k.includes(q);
    el.hidden = !ok; if (ok) n++;
  });
  const c = document.querySelector('#knc'); if (c) c.textContent = n + ' khái niệm' + (q ? ' phù hợp' : '');
}

function render() {
  renderNav();
  ({ hoc: renderHoc, kn: renderKn, tinh: renderTinh, tu: renderTu, quiz: renderQuiz, tcvn: renderTcvn })[store.tab]();
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const d = b.dataset;
  if (d.tab) {
    store.tab = d.tab; save(); render(); window.scrollTo(0, 0);
  } else if (d.calc) {
    store.calc = d.calc; save(); renderTinh(); window.scrollTo(0, 0);
  } else if (d.goto) {
    store.tab = 'tinh'; store.calc = d.goto; save(); render(); window.scrollTo(0, 0);
  } else if (d.reset) {
    const m = MODS.find((x) => x.id === d.reset);
    m.groups.forEach((g) => g.f.forEach((id) => { delete store.vals[id]; }));
    save(); renderTinh();
  } else if (d.fcg) {
    store.fcg = d.fcg; save(); fc.i = 0; fcBuild(); renderTu();
  } else if (d.fcf) {
    fc.filter = d.fcf; fc.i = 0; fcBuild(); renderTu();
  } else if (d.fcd) {
    store.dir = store.dir === 'vi' ? 'en' : 'vi'; save(); fc.flip = false; renderTu();
  } else if (d.fcs) {
    fcShuffle(); renderTu();
  } else if (d.flip) {
    fc.flip = !fc.flip; renderTu();
  } else if (d.know !== undefined) {
    const t = TERMS[fc.order[fc.i]];
    if (d.know === '1') store.known[t[0]] = 1; else delete store.known[t[0]];
    save();
    if (fc.filter === 'todo' && d.know === '1') { fcBuild(); } else { fc.i = (fc.i + 1) % fc.order.length; fc.flip = false; }
    renderTu();
  } else if (d.fcn) {
    fc.i = (fc.i + parseInt(d.fcn, 10) + fc.order.length) % fc.order.length; fc.flip = false; renderTu();
  } else if (d.qch) {
    store.qch = d.qch; save(); renderQuiz();
  } else if (d.qlv !== undefined) {
    store.qlv = parseInt(d.qlv, 10); save(); renderQuiz();
  } else if (d.qs) {
    qzStart(parseInt(d.qs, 10)); renderQuiz(); window.scrollTo(0, 0);
  } else if (d.qhome) {
    qz.mode = 'start'; renderQuiz();
  } else if (d.pick !== undefined) {
    const q = qz.order[qz.i];
    qz.picked = parseInt(d.pick, 10);
    if (q.opts[qz.picked].ok) qz.score++;
    else qz.wrong.push({ q: q.q, pick: q.opts[qz.picked].t, right: q.opts.find((o) => o.ok).t, w: q.w });
    renderQuiz();
  } else if (d.next) {
    qz.i++; qz.picked = null;
    if (qz.i >= qz.order.length) {
      qz.mode = 'end';
      const pct = Math.round((qz.score / qz.order.length) * 100);
      if (qz.order.length >= 10 && pct > store.best) { store.best = pct; save(); }
    }
    renderQuiz(); window.scrollTo(0, 0);
  } else if (d.kng) {
    store.kng = d.kng; save(); renderKn(); window.scrollTo(0, 0);
  } else if (d.tcs) {
    store.tcsec = d.tcs; save(); renderTcvn(); window.scrollTo(0, 0);
  }
});

document.addEventListener('input', (e) => {
  if (e.target && e.target.dataset && e.target.dataset.kq) { knQ = e.target.value; knFilter(); return; }
  const id = e.target && e.target.dataset && e.target.dataset.f;
  if (!id) return;
  store.vals[id] = e.target.value;
  save();
  if (id === 'dl_use' || id === 'dl_type') renderTinhKeep(); else updateCalc();
});
function renderTinhKeep() { updateCalc(); }

load();
if (!TABS.some((t) => t[0] === store.tab)) store.tab = 'hoc';
if (!MODS.some((m) => m.id === store.calc)) store.calc = 'chung';
if (!GROUPS.some((g) => g[0] === store.fcg)) store.fcg = 'all';
if (!KN_GROUPS.some((g) => g[0] === store.kng)) store.kng = 'all';
render();

/* Nội dung học: nền tảng, chuyên đề, đối chiếu TCVN */
const THEORY = [
  {
    id: 'tong-quan',
    tag: 'Tổng quan',
    title: 'IEC 61400-3-1:2019 là gì?',
    body: `
<p>Tên đầy đủ: <b>Wind energy generation systems – Part 3-1: Design requirements for fixed offshore wind turbines</b> (Hệ thống phát điện gió – Phần 3-1: Yêu cầu thiết kế cho tua bin gió biển cố định). Ấn bản 1 ra đời tháng 4/2019, thay cho IEC 61400-3:2009.</p>
<ul>
<li><b>Phạm vi:</b> tua bin gió đặt trên kết cấu đỡ cố định đáy biển (monopile, jacket, trọng lực...). Móng nổi thuộc <b>IEC TS 61400-3-2:2019</b>.</li>
<li><b>Nền tảng:</b> dựa trên IEC 61400-1 (tua bin trên bờ), bổ sung điều kiện sóng, mực nước, dòng chảy, băng, sinh vật bám, xói lở.</li>
<li><b>Phối hợp với:</b> ISO 19900 / 19901 / 19902 / 19903 (công trình biển), DNV-ST-0126 (kết cấu đỡ), DNV-ST-0437 (tải trọng và điều kiện địa điểm), API RP 2GEO (địa kỹ thuật).</li>
<li><b>Điểm cốt lõi:</b> bắt buộc phân tích tải <b>tích hợp</b> (khí động – thủy động – điều khiển – đàn hồi) cho các trường hợp tải thiết kế (DLC), kiểm tra trạng thái giới hạn cực hạn (ULS), mỏi (FLS), sử dụng (SLS) và sự cố (ALS).</li>
</ul>
<h4>Phân chia trách nhiệm</h4>
<ul>
<li><b>Nhà chế tạo tua bin:</b> cung cấp mô hình tua bin, điều khiển, giới hạn tải giao diện tại chân tháp.</li>
<li><b>Nhà thiết kế kết cấu đỡ:</b> thiết kế móng và tháp dưới giao diện, phân tích tích hợp với mô hình tua bin.</li>
<li><b>Chủ đầu tư và tổ chức chứng nhận:</b> xác nhận điều kiện địa điểm, thẩm tra thiết kế độc lập.</li>
</ul>
<h4>Cấu trúc các điều khoản chính</h4>
<div class="tw"><table>
<tr><th>Điều</th><th>Nội dung</th></tr>
<tr><td>5</td><td>Các yếu tố chính, phương pháp thiết kế, đánh giá an toàn</td></tr>
<tr><td>6</td><td>Điều kiện ngoài (gió, sóng, mực nước, dòng chảy, băng, địa chấn...)</td></tr>
<tr><td>7</td><td>Thiết kế kết cấu: DLC, hệ số an toàn, xói, ăn mòn, mỏi</td></tr>
<tr><td>8–10</td><td>Hệ điều khiển - bảo vệ, cơ khí, điện</td></tr>
<tr><td>11</td><td>Đánh giá điều kiện ngoài tại địa điểm</td></tr>
<tr><td>12–13</td><td>Lắp đặt, nghiệm thu, vận hành, bảo trì</td></tr>
</table></div>
<p class="note">Số điều khoản ghi theo trí nhớ về cấu trúc chung của bộ tiêu chuẩn. Khi làm hồ sơ thật, hãy đối chiếu với bản gốc đang có hiệu lực.</p>`
  },
  {
    id: 'dieu-kien-ngoai',
    tag: 'Điều kiện ngoài',
    title: 'Gió, sóng, mực nước và các tác động khác',
    body: `
<h4>Mô hình gió (nối từ IEC 61400-1)</h4>
<div class="tw"><table>
<tr><th>Ký hiệu</th><th>Tên</th><th>Dùng cho</th></tr>
<tr><td>NWP</td><td>Normal wind profile</td><td>Profile gió chuẩn, lũy thừa với α = 0,14 ngoài khơi</td></tr>
<tr><td>NTM</td><td>Normal turbulence model</td><td>Mỏi, vận hành thường</td></tr>
<tr><td>ETM</td><td>Extreme turbulence model</td><td>Cực hạn khi vận hành</td></tr>
<tr><td>EWM</td><td>Extreme wind speed model</td><td>Gió cực hạn 50 năm và 1 năm (bão)</td></tr>
<tr><td>EOG / EDC / ECD / EWS</td><td>Gió giật, đổi hướng, giật có đổi hướng, cắt gió</td><td>Các sự kiện cực hạn khi vận hành</td></tr>
</table></div>
<p>Thời gian lấy trung bình của gió là <b>10 phút</b> tại trục rotor. Sóng được mô tả trong cơn biển <b>3 giờ</b> dừng. Hai thời gian này khác nhau nên phải nhớ khi ghép gió và sóng.</p>
<h4>Mô hình sóng</h4>
<ul>
<li><b>NSS</b> (normal sea state): trạng thái biển thường, dùng cho mỏi và vận hành.</li>
<li><b>SSS</b> (severe sea state): biển động mạnh, kết hợp gió vận hành (DLC 1.6).</li>
<li><b>ESS</b> (extreme sea state): biển cực hạn chu kỳ lặp 50 năm hoặc 1 năm.</li>
<li><b>NWH / SWH / EWH / RWH:</b> chiều cao sóng thường, mạnh, cực hạn và sóng giảm.</li>
<li>Sóng đơn cực hạn lấy xấp xỉ <b>H<sub>max</sub> ≈ 1,86 · H<sub>s</sub></b> (trong cơn biển 3 giờ).</li>
<li>Độ sâu hạn chế chiều cao sóng: <b>H<sub>b</sub> ≈ 0,78 d</b>. Sóng vỡ tác động xung kích (slamming) lên trụ cần phân tích riêng.</li>
<li>Trụ nhỏ (D/L &lt; 0,2) dùng <b>phương trình Morison</b>; trụ lớn dùng nhiễu xạ (MacCamy–Fuchs hoặc phần mềm 3D).</li>
<li>Phổ sóng thường dùng: <b>JONSWAP</b> (biển đang phát triển) hoặc Pierson–Moskowitz (biển phát triển đầy đủ).</li>
</ul>
<h4>Phân bố đồng thời gió và sóng</h4>
<ul>
<li>Gió và sóng có tương quan, nhưng không hoàn toàn. Phân tích dùng phân bố chung của V<sub>hub</sub>, H<sub>s</sub>, T<sub>p</sub>, hướng.</li>
<li>Lệch hướng gió–sóng và tính đa hướng của sóng làm giảm tải so với giả thiết cùng hướng.</li>
<li>Với tải cực hạn, cần ngoại suy dài hạn hoặc dùng giá trị 50 năm của từng yếu tố có kết hợp xác suất theo tiêu chuẩn.</li>
</ul>
<h4>Mực nước và dòng chảy</h4>
<ul>
<li>Mực nước thiết kế = thủy triều thiên văn (LAT đến HAT) + nước dâng do bão và áp suất.</li>
<li>Đo độ sâu từ <b>LAT</b> hoặc <b>MSL</b>: phải thống nhất cao độ chuẩn trong toàn hồ sơ.</li>
<li>Dòng chảy gồm thủy triều, gió, dòng gần bờ; cộng vector với vận tốc hạt nước do sóng.</li>
</ul>
<h4>Tác động khác</h4>
<ul>
<li><b>Sinh vật bám (marine growth):</b> làm tăng đường kính, độ nhám (tăng C<sub>D</sub>) và khối lượng.</li>
<li><b>Băng:</b> chỉ xét ở vùng lạnh, ít liên quan Việt Nam.</li>
<li><b>Động đất:</b> kiểm tra theo ISO 19901-2; ở Việt Nam đối chiếu TCVN 9386:2012.</li>
<li><b>Xói lở đáy biển</b> quanh móng và ảnh hưởng đến tần số riêng.</li>
</ul>`
  },
  {
    id: 'dlc',
    tag: 'Tổ hợp tải',
    title: 'Trường hợp tải thiết kế (DLC) và hệ số an toàn',
    body: `
<p>Mỗi <b>DLC</b> là tổ hợp của một tình huống thiết kế của tua bin với một điều kiện ngoài. Tiêu chuẩn chia 8 nhóm tình huống:</p>
<div class="tw"><table>
<tr><th>Nhóm</th><th>Tình huống</th><th>Ví dụ điển hình</th></tr>
<tr><td>1</td><td>Phát điện</td><td>1.2 (mỏi, NTM + NSS), 1.6 (NTM + SSS, cực hạn)</td></tr>
<tr><td>2</td><td>Phát điện + sự cố</td><td>Lỗi hệ điều khiển, lỗi lưới</td></tr>
<tr><td>3</td><td>Khởi động</td><td>Đóng máy dưới gió và sóng thường</td></tr>
<tr><td>4</td><td>Dừng bình thường</td><td>Tải tăng tạm thời khi hãm</td></tr>
<tr><td>5</td><td>Dừng khẩn cấp</td><td>Hãm tức thời</td></tr>
<tr><td>6</td><td>Đỗ (parked)</td><td>6.1 (EWM 50 năm + ESS 50 năm), 6.4 (mỏi khi đỗ)</td></tr>
<tr><td>7</td><td>Đỗ + sự cố</td><td>7.1 (mất lưới, lỗi hệ thống kèm EWM 1 năm)</td></tr>
<tr><td>8</td><td>Vận chuyển, lắp dựng, sửa chữa</td><td>Điều kiện thi công do chủ đầu tư quy định</td></tr>
</table></div>
<h4>Hệ số an toàn riêng cho tải (γ<sub>f</sub>)</h4>
<div class="tw"><table>
<tr><th>Loại tải</th><th>Hệ số</th></tr>
<tr><td>Tải thông thường, bất lợi</td><td>1,35</td></tr>
<tr><td>Tải bất thường (sự cố)</td><td>1,10</td></tr>
<tr><td>Vận chuyển, lắp dựng</td><td>1,50</td></tr>
<tr><td>Tải có lợi</td><td>0,90</td></tr>
<tr><td>Mỏi (FLS)</td><td>1,00 (đã gồm trong hệ số hư hỏng DFF)</td></tr>
</table></div>
<p>Hệ số vật liệu γ<sub>m</sub> lấy theo tiêu chuẩn vật liệu và kết cấu (ISO 19902, DNV-ST-0126...) hoặc TCVN tương ứng khi hồ sơ yêu cầu.</p>
<h4>Bốn trạng thái giới hạn</h4>
<ul>
<li><b>ULS</b> (cực hạn): chảy dẻo, mất ổn định, phá hoại nền.</li>
<li><b>FLS</b> (mỏi): cộng dồn hư hỏng Miner, đường cong S–N, DFF theo khả năng kiểm tra.</li>
<li><b>SLS</b> (sử dụng): độ nghiêng cuối cùng sau lắp đặt và vận hành (thường vài phần mười độ), chuyển vị, tần số.</li>
<li><b>ALS</b> (sự cố): va tàu, mất một neo, ngập khoang.</li>
</ul>`
  },
  {
    id: 'loai-mong',
    tag: 'Loại móng',
    title: 'Bốn loại móng và phạm vi dùng',
    body: `
<div class="tw"><table>
<tr><th></th><th>Monopile</th><th>Jacket</th><th>Trọng lực</th><th>Nổi</th></tr>
<tr><td>Độ sâu thường dùng</td><td>0–40 m (đến ~60 m)</td><td>30–60 m (hơn nữa)</td><td>0–30 m</td><td>&gt; 50–60 m</td></tr>
<tr><td>Cấu tạo</td><td>1 ống thép D 5–11 m ngàm vào đất</td><td>Giàn thép 3–4 chân + cọc</td><td>Đế bê tông nặng đặt lên đáy</td><td>Spar, bán chìm, TLP + neo</td></tr>
<tr><td>Ưu điểm</td><td>Chế tạo đơn giản, nhiều kinh nghiệm</td><td>Cứng, nước sâu, ít thép mỗi MW cho nước sâu</td><td>Không đóng cọc, không ồn</td><td>Dùng được nơi nước sâu</td></tr>
<tr><td>Điểm yếu</td><td>Nhạy xói, tần số thấp khi nước sâu</td><td>Nhiều mối hàn, mỏi ở nút</td><td>Cần nền tốt, nạo vét, tải trọng thi công lớn</td><td>Phức tạp, neo, chi phí cao</td></tr>
<tr><td>Kiểm tra chủ đạo</td><td>Tần số, mỏi mối hàn, p-y, xói</td><td>Mỏi nút, kéo nhổ cọc, tần số</td><td>Trượt, lật, sức chịu tải, lún</td><td>GM, chu kỳ riêng, tải neo</td></tr>
</table></div>
<h4>Cách chọn loại móng</h4>
<ul>
<li><b>Độ sâu</b> quyết định đầu tiên. Nông và vừa: monopile. Vừa đến sâu: jacket. Rất sâu: nổi.</li>
<li><b>Đất nền:</b> lớp đá cứng gần mặt đáy làm khó đóng cọc, có thể chọn trọng lực hoặc cọc khoan. Đất yếu dày chọn cọc dài.</li>
<li><b>Năng lực thi công:</b> tàu cẩu, búa đóng, bến chế tạo và vận chuyển. Đường kính monopile phụ thuộc cầu cảng và tàu.</li>
<li><b>Tần số:</b> nước sâu hơn và tua bin lớn hơn thường làm monopile phải rất dày để giữ f₁ trên 1P.</li>
<li><b>Chi phí vòng đời:</b> gồm chế tạo, lắp đặt, bảo trì và tháo dỡ.</li>
</ul>
<p class="note">Khoảng độ sâu chỉ mang tính tham khảo. Giới hạn thực tế phụ thuộc đất nền, tải sóng, kích cỡ tua bin và năng lực thi công.</p>`
  },
  {
    id: 'quy-trinh',
    tag: 'Quy trình',
    title: 'Quy trình thiết kế sơ bộ',
    body: `
<ol class="steps">
<li><b>Thu thập số liệu địa điểm:</b> độ sâu, thủy triều, H<sub>s</sub> và T<sub>p</sub> theo chu kỳ lặp, gió cực hạn, dòng chảy, địa chất (khoan, CPT).</li>
<li><b>Chọn loại móng</b> theo độ sâu, đất nền, năng lực chế tạo và thi công.</li>
<li><b>Ước tính tải sơ bộ:</b> lực đẩy gió, tải sóng (Morison), mô men tại đáy cho các DLC chính.</li>
<li><b>Chọn kích thước ban đầu:</b> đường kính, chiều dày, chiều sâu ngàm.</li>
<li><b>Kiểm tra tần số riêng</b> so với dải 1P và 3P. Đây thường là điều kiện quyết định kích thước.</li>
<li><b>Phân tích tải tích hợp</b> các DLC bằng phần mềm chuyên dụng (OpenFAST, Bladed, SIMA...).</li>
<li><b>Kiểm tra ULS, FLS, SLS, ALS</b> cho kết cấu thép hoặc bê tông và nền móng.</li>
<li><b>Chống ăn mòn, xói và thi công:</b> lớp phủ, anốt, bảo vệ chống xói, quy trình lắp đặt.</li>
</ol>
<h4>Dữ liệu đầu vào tối thiểu</h4>
<ul>
<li>Mô hình tua bin: khối lượng RNA, đường cong lực đẩy C<sub>t</sub>(V), tốc độ quay, giới hạn tải giao diện.</li>
<li>Khí tượng hải văn: chuỗi gió, sóng, dòng chảy nhiều năm; mực nước cực hạn; hướng bão.</li>
<li>Địa chất: mặt cắt đất, CPT, tham số cường độ và biến dạng theo lớp, tải chu kỳ.</li>
<li>Hạn chế thi công: tàu, bến cảng, cửa sổ thời tiết.</li>
</ul>
<h4>Sản phẩm thiết kế cơ sở</h4>
<p>Báo cáo cơ sở thiết kế (design basis), bảng DLC, kích thước sơ bộ, tần số riêng, khối lượng thép, và danh mục rủi ro. Mô-đun DLC và các mô-đun móng trong ứng dụng này mô phỏng đúng thứ tự công việc đó ở mức đơn giản.</p>
<p class="note">Các máy tính trong ứng dụng này chỉ phục vụ bước 3 đến 5, và một phần bước 7, để hiểu bậc độ lớn. Chúng không thay thế phân tích tích hợp.</p>`
  },
  {
    id: 'dia-ky-thuat',
    tag: 'Nền móng',
    title: 'Địa kỹ thuật, xói lở và ăn mòn',
    body: `
<h4>Cọc chịu tải ngang</h4>
<ul>
<li>Cọc nhỏ và vừa: đường cong <b>p-y</b> theo API (cát, sét mềm, sét cứng).</li>
<li>Monopile đường kính lớn, L/D thấp: ứng xử cứng, dùng phương pháp <b>PISA</b> hoặc phần tử hữu hạn 3D.</li>
<li>Tải chu kỳ làm giảm độ cứng và tích lũy biến dạng, phải xét trong SLS.</li>
</ul>
<h4>Cọc chịu kéo nhổ (jacket)</h4>
<ul>
<li>Sức kháng nhổ gồm ma sát bên (cát: β·σ'<sub>v</sub>; sét: α·s<sub>u</sub>) cộng trọng lượng cọc. Mũi cọc không tham gia.</li>
<li>Thử tải tĩnh và động hiện trường để hiệu chỉnh.</li>
</ul>
<h4>Xói lở</h4>
<ul>
<li>Với dòng chảy ổn định quanh trụ, độ sâu xói cân bằng thường ước tính cỡ <b>S ≈ 1,3 D</b> (mức cực đại thực nghiệm).</li>
<li>Biện pháp: đá hộc bảo vệ nhiều lớp, thảm bê tông, hoặc tính xói vào thiết kế (cọc dài hơn).</li>
<li>Xói làm giảm độ cứng ngàm và hạ tần số riêng.</li>
</ul>
<h4>Ăn mòn</h4>
<div class="tw"><table>
<tr><th>Vùng</th><th>Biện pháp thường dùng</th></tr>
<tr><td>Khí quyển</td><td>Hệ sơn phủ nhiều lớp</td></tr>
<tr><td>Văng bắn (splash)</td><td>Sơn dày hoặc bọc, tăng chiều dày dự phòng. Đây là vùng ăn mòn nhanh nhất</td></tr>
<tr><td>Ngập nước</td><td>Bảo vệ catốt bằng anốt hy sinh hoặc dòng áp đặt, kết hợp sơn</td></tr>
<tr><td>Chôn trong đất</td><td>Chiều dày dự phòng ăn mòn</td></tr>
</table></div>
<h4>Điều kiện hay gặp ở Việt Nam</h4>
<ul>
<li>Bão và áp thấp nhiệt đới: gió và sóng cực hạn ngắn hạn, nước dâng bão.</li>
<li>Thủy triều khác nhau nhiều giữa các vùng ven biển.</li>
<li>Đất yếu (bùn, sét, cát chảy) ở đồng bằng sông Cửu Long, cần khảo sát địa chất kỹ cho cọc và nền.</li>
</ul>`
  },
  {
    id: 'moi',
    tag: 'Mỏi và tần số',
    title: 'Tần số riêng, 1P/3P và mỏi',
    body: `
<ul>
<li><b>1P</b> là tần số quay của rotor, <b>3P</b> là tần số cánh quạt đi qua tháp (3 cánh). Ví dụ rotor quay 5–9 vòng/phút: 1P = 0,083–0,15 Hz, 3P = 0,25–0,45 Hz.</li>
<li>Tần số riêng thứ nhất f<sub>1</sub> của cả hệ (tháp + kết cấu đỡ + đất nền) phải tránh các dải này, thường chừa biên khoảng ±10%.</li>
<li><b>Soft-soft:</b> f<sub>1</sub> dưới 1P. <b>Soft-stiff:</b> giữa 1P và 3P (phổ biến nhất). <b>Stiff-stiff:</b> trên 3P.</li>
<li>Các yếu tố làm đổi f<sub>1</sub>: độ cứng ngàm của đất, xói, sinh vật bám (khối lượng), nước nâng thêm khối lượng.</li>
<li><b>Mỏi:</b> phổ gió và sóng dài hạn, đếm chu kỳ (rainflow), đường cong S–N cho mối hàn (DNV-RP-C203), cộng hư hỏng Miner ≤ 1/DFF.</li>
<li>Sóng gây mỏi nhiều hơn ở nước nông cho monopile. Gió dọc trục và lệch hướng sóng cũng phải xét.</li>
</ul>
<p>Biểu đồ Campbell thể hiện f<sub>1</sub>, 1P và 3P theo tốc độ quay. Dùng tab Tính toán để vẽ cửa sổ tần số cho thiết kế của bạn.</p>`
  }
];

/* ===== Chuyên đề: công thức và ví dụ đã kiểm chứng bằng ứng dụng ===== */
const TOPICS = [
  {
    id: 'song',
    tag: 'Chuyên đề 1',
    title: 'Sóng và phương trình Morison',
    body: `
<h4>Sóng tuyến tính (Airy)</h4>
<p>Quan hệ tán sắc giữa tần số góc ω = 2π/T và số sóng k:</p>
<p><span class="eq">ω² = g·k·tanh(k·d)</span></p>
<p>Giải lặp để tìm k, rồi <span class="eq">L = 2π/k</span>, <span class="eq">c = L/T</span>. Nước sâu có <span class="eq">L ≈ 1,56·T²</span>.</p>
<p>Vận tốc và gia tốc hạt nước ngang ở độ cao z (z = 0 tại mực nước tĩnh), θ = k·x − ω·t:</p>
<p><span class="eq">u = (H/2)·ω·cosh k(z+d)/sinh kd · cos θ</span></p>
<p><span class="eq">∂u/∂t = (H/2)·ω²·cosh k(z+d)/sinh kd · sin θ</span></p>
<p>Lý thuyết Airy chỉ xác định đến z = 0. Để lấy giá trị tới đỉnh sóng người ta kéo dãn <b>Wheeler</b>: thay z bằng z' = d·(z − η)/(d + η), với η là cao độ mặt sóng.</p>
<h4>Morison cho trụ đứng</h4>
<p><span class="eq">dF = ½·ρ·C<sub>D</sub>·D·u|u|·dz + ρ·C<sub>M</sub>·(π·D²/4)·∂u/∂t·dz</span></p>
<p>Lực tổng và mô men đáy lấy bằng tích phân từ đáy đến mặt sóng, rồi quét pha θ để lấy cực đại. Thành phần cản đạt đỉnh khi θ = 0 (đỉnh sóng), thành phần quán tính khi θ = ±90°.</p>
<div class="ex"><b>Ví dụ.</b> d = 25 m, T = 12 s, H = 1,86·6 = 11,16 m, trụ D = 8,1 m (8 m + 50 mm sinh vật bám mỗi phía), C<sub>D</sub> = 1,05, C<sub>M</sub> = 1,8.
<ul>
<li>Bước sóng L = 166,0 m, c = 13,83 m/s, k·d = 0,95: vùng nước trung gian.</li>
<li>Số Ursell U<sub>r</sub> = H·L²/d³ = 19,7, H/d = 0,45: lý thuyết Airy kém chính xác, nên dùng hàm dòng bậc cao.</li>
<li>Lực sóng cực đại F ≈ 4 020 kN, mô men đáy M ≈ 59 758 kN·m. Cánh tay tương đương M/F ≈ 14,9 m, tức khoảng 0,6 d.</li>
</ul></div>
<h4>Khi nào Morison không đủ</h4>
<ul>
<li>D/L &gt; 0,2: nhiễu xạ quan trọng, dùng MacCamy–Fuchs.</li>
<li>Sóng vỡ: thêm tải xung kích, tùy mô hình (ví dụ Wienke–Oumeraci).</li>
<li>Sóng rất phi tuyến (U<sub>r</sub> lớn): dùng Stokes bậc 5 hoặc hàm dòng.</li>
</ul>`
  },
  {
    id: 'gio',
    tag: 'Chuyên đề 2',
    title: 'Tải gió lên rotor và tháp, quy đổi gió',
    body: `
<h4>Lực đẩy rotor</h4>
<p><span class="eq">T = ½·ρ<sub>a</sub>·A·C<sub>t</sub>·V²</span>, A = π·D<sub>r</sub>²/4, ρ<sub>a</sub> = 1,225 kg/m³.</p>
<h4>Gió lên tháp</h4>
<p>Lấy tích phân dọc tháp với profile lũy thừa:</p>
<p><span class="eq">V(z) = V<sub>hub</sub>·(z/z<sub>hub</sub>)<sup>α</sup></span>, <span class="eq">dF = ½·ρ<sub>a</sub>·C<sub>d</sub>·D(z)·V(z)²·dz</span></p>
<div class="ex"><b>Ví dụ.</b> Rotor D<sub>r</sub> = 200 m, C<sub>t</sub> = 0,8, V = 11 m/s, trục rotor cao 110 m, d = 25 m, tháp D từ 6,5 m xuống 4,2 m, từ cao độ +20 m.
<ul>
<li>T = ½·1,225·31 416·0,8·11² = 1 863 kN.</li>
<li>Mô men đáy do rotor = 1 863 × (110 + 25) = 251 458 kN·m; cộng tháp, tổng M ≈ 253 334 kN·m.</li>
<li>Gió lên tháp: F ≈ 21 kN, M ≈ 1 876 kN·m. Tháp đóng góp rất nhỏ khi vận hành.</li>
</ul>
Trong bão (V = 50 m/s, rotor đỗ, C<sub>t</sub> = 0,04): T ≈ 1 924 kN, nhưng tháp tăng lên 431 kN và 38 755 kN·m do tải tỷ lệ V². Mô men gió tổng khoảng 298 526 kN·m.</div>
<h4>Quy đổi thời gian lấy trung bình và độ cao</h4>
<p>Số liệu bão ở Việt Nam hay là gió giật 3 giây ở độ cao 10 m. IEC dùng trung bình 10 phút tại trục rotor. Dùng quan hệ ISO 19901-1:</p>
<p><span class="eq">U(z) = U₀·[1 + C·ln(z/10)]</span>, <span class="eq">C = 0,0573·√(1 + 0,15·U₀)</span></p>
<p><span class="eq">I<sub>u</sub>(z) = 0,06·(1 + 0,043·U₀)·(z/10)<sup>−0,22</sup></span></p>
<p><span class="eq">u(z,t) = U(z)·[1 − 0,41·I<sub>u</sub>·ln(t/3600)]</span></p>
<div class="ex"><b>Ví dụ.</b> Giật 3 giây 45 m/s tại 10 m cho U₀ = 31,8 m/s (trung bình 1 giờ tại 10 m).
<ul>
<li>Trung bình 10 phút tại 10 m ≈ 35,1 m/s (khoảng 0,78 lần giá trị giật).</li>
<li>Trung bình 10 phút tại 110 m ≈ 45,0 m/s.</li>
<li>Giật 3 giây tại 110 m ≈ 52,7 m/s.</li>
</ul>
Vì vậy dùng nhầm gió giật 3 giây làm gió 10 phút làm tải tăng khoảng 1,37 lần theo V².</div>
<p class="note">Mô-đun "Quy đổi gió" trong tab Tính toán thực hiện chính xác các phép này.</p>`
  },
  {
    id: 'dlc-ct',
    tag: 'Chuyên đề 3',
    title: 'Bảng DLC chi tiết và tổ hợp tải',
    body: `
<p>Bảng tóm lược các DLC thường gặp (tham khảo Bảng 2 của IEC 61400-3-1, hãy đối chiếu bản gốc khi làm hồ sơ):</p>
<div class="tw"><table>
<tr><th>DLC</th><th>Gió</th><th>Sóng</th><th>Loại</th></tr>
<tr><td>1.1</td><td>NTM</td><td>NSS</td><td>U, ngoại suy tải</td></tr>
<tr><td>1.2</td><td>NTM</td><td>NSS</td><td>F</td></tr>
<tr><td>1.3</td><td>ETM</td><td>NSS</td><td>U</td></tr>
<tr><td>1.4</td><td>ECD</td><td>NSS</td><td>U</td></tr>
<tr><td>1.5</td><td>EWS</td><td>NSS</td><td>U</td></tr>
<tr><td>1.6</td><td>NTM</td><td>SSS</td><td>U</td></tr>
<tr><td>2.1–2.4</td><td>NTM hoặc EOG</td><td>NSS</td><td>U hoặc F, có sự cố</td></tr>
<tr><td>3.x</td><td>NWP, EOG, EDC</td><td>NSS</td><td>U hoặc F, khởi động</td></tr>
<tr><td>4.x, 5.1</td><td>NWP, EOG, NTM</td><td>NSS</td><td>U hoặc F, dừng</td></tr>
<tr><td>6.1</td><td>EWM 50 năm</td><td>ESS 50 năm</td><td>U</td></tr>
<tr><td>6.2</td><td>EWM 50 năm, mất lưới</td><td>ESS 50 năm</td><td>U, bất thường</td></tr>
<tr><td>6.3</td><td>EWM 1 năm</td><td>ESS 1 năm</td><td>U</td></tr>
<tr><td>6.4</td><td>NTM</td><td>NSS</td><td>F, đỗ</td></tr>
<tr><td>7.1</td><td>EWM 1 năm</td><td>ESS 1 năm</td><td>U, sự cố</td></tr>
<tr><td>7.2</td><td>NTM</td><td>NSS</td><td>F, đỗ + sự cố</td></tr>
<tr><td>8.x</td><td>Theo hợp đồng</td><td>Theo hợp đồng</td><td>U, thi công</td></tr>
</table></div>
<h4>Cách tổ hợp trong ứng dụng</h4>
<p>Mô-đun DLC lấy bốn trường hợp cực hạn thường chi phối mô men đáy và quét tải sóng ở mỗi trường hợp:</p>
<p><span class="eq">H = F<sub>sóng</sub> + F<sub>rotor</sub> + F<sub>tháp</sub></span>, <span class="eq">M = M<sub>sóng</sub> + M<sub>gió</sub></span>, <span class="eq">M<sub>d</sub> = γ<sub>f</sub>·M</span></p>
<div class="ex"><b>Ví dụ</b> với giá trị mặc định (monopile D = 8 m, d = 25 m), mô men tính toán γ<sub>f</sub>·M:
<ul>
<li>DLC 1.3: 485,1 MN·m (lực đẩy rotor tăng do ETM).</li>
<li>DLC 1.6: 450,0 MN·m (biển động mạnh hơn).</li>
<li>DLC 6.1: 483,7 MN·m (gió bão, rotor đỗ, sóng 50 năm).</li>
<li>DLC 7.1: 263,4 MN·m (γ<sub>f</sub> = 1,10, tải bất thường).</li>
</ul>
Trường hợp chi phối là 1.3, gần như bằng 6.1. Điều này cho thấy với tua bin lớn, DLC vận hành cũng chi phối. Phải xét đủ các DLC, không chỉ bão.</div>
<p class="note">Các hệ số khuếch đại lực đẩy và C<sub>t</sub> khi đỗ là giả định. Trong dự án thật các số này đến từ mô phỏng khí động đàn hồi của nhà chế tạo.</p>`
  },
  {
    id: 'monopile',
    tag: 'Chuyên đề 4',
    title: 'Monopile: ứng suất, ổn định vỏ và p-y',
    body: `
<h4>Ứng suất tại đáy biển</h4>
<p><span class="eq">σ = γ<sub>f</sub>·M/W + γ<sub>f</sub>·N/A</span>, so với <span class="eq">f<sub>y</sub>/γ<sub>M</sub></span>. Thành mỏng: <span class="eq">W = I/(D/2)</span>. Dùng chiều dày đã trừ chiều dày dự phòng ăn mòn.</p>
<h4>Ổn định vỏ tròn</h4>
<p>Ống D/t lớn có nguy cơ mất ổn định vỏ cục bộ. Dạng giản lược:</p>
<p><span class="eq">σ<sub>E</sub> = 0,605·E·t/R</span>, <span class="eq">λ̄² = f<sub>y</sub>/σ<sub>E</sub></span>, <span class="eq">f<sub>ks</sub> = f<sub>y</sub>/√(1 + λ̄⁴)</span></p>
<h4>Đường cong p-y cho cát (API)</h4>
<p><span class="eq">p = A·p<sub>u</sub>·tanh(k·z·y/(A·p<sub>u</sub>))</span>, A = 0,9 cho tải chu kỳ.</p>
<p>Sức kháng cực hạn <span class="eq">p<sub>u</sub> = min(p<sub>us</sub> ; p<sub>ud</sub>)</span>, nông: <span class="eq">p<sub>us</sub> = (C₁·z + C₂·D)·γ'·z</span>, sâu: <span class="eq">p<sub>ud</sub> = C₃·D·γ'·z</span>.</p>
<p>Hệ số C₁, C₂, C₃ chỉ phụ thuộc góc ma sát trong φ. Với φ = 35°: C₁ ≈ 2,97, C₂ ≈ 3,42, C₃ ≈ 53,8.</p>
<h4>Dầm trên nền Winkler</h4>
<p>Cọc coi là dầm EI chịu tải ngang H và mô men M tại đầu cọc, nền là các lò xo phi tuyến:</p>
<p><span class="eq">EI·d⁴y/dz⁴ + p(y) = 0</span></p>
<p>Ứng dụng giải bằng sai phân hữu hạn, lặp độ cứng cát tuyến cho đến hội tụ. Kết quả gồm độ võng, xoay đầu cọc, mô men lớn nhất và độ sâu của nó.</p>
<div class="ex"><b>Ví dụ</b> với mặc định: D = 8 m, t = 80 mm, ngàm L = 30 m, φ = 35°, γ' = 9 kN/m³, k = 22 000 kN/m³.
<ul>
<li>Tại độ sâu 5 m, D = 8,1 m: p<sub>us</sub> = (2,97·5 + 3,42·8,1)·9·5 ≈ 1 915 kN/m, nhỏ hơn p<sub>ud</sub> ≈ 19 610 kN/m nên chọn p<sub>u</sub> = 1 915 kN/m.</li>
<li>Tải tiêu chuẩn tại đáy biển: H ≈ 5 904 kN, M ≈ 313 091 kN·m.</li>
<li>Độ võng đáy biển ≈ 33 mm, xoay ≈ 0,15°, thỏa giới hạn 0,25°.</li>
<li>Mô men tính toán lớn nhất trong cọc ≈ 461 MN·m, xuất hiện ở độ sâu khoảng 7 m dưới đáy biển.</li>
<li>Broms cho chiều sâu ngàm tối thiểu ≈ 18,5 m, nhỏ hơn 30 m.</li>
</ul></div>
<p class="note">API p-y hiệu chỉnh cho cọc nhỏ. Với monopile đường kính lớn, nó có thể sai đáng kể so với PISA hoặc 3D. Chỉ dùng cho kiểm tra sơ bộ.</p>`
  },
  {
    id: 'tan',
    tag: 'Chuyên đề 5',
    title: 'Tần số riêng và cửa sổ 1P/3P',
    body: `
<h4>Phương pháp Rayleigh</h4>
<p>Cho dầm công-xon có độ cứng EI(z) và khối lượng m(z) với RNA ở đỉnh. Chọn dạng dao động là độ võng tĩnh u(z) khi tải ngang tỷ lệ với khối lượng. Khi đó:</p>
<p><span class="eq">ω² = Σ m<sub>j</sub>·u<sub>j</sub> / Σ m<sub>j</sub>·u<sub>j</sub>²</span>, <span class="eq">f₁ = ω/2π</span></p>
<p>Rayleigh luôn cho tần số lớn hơn hoặc bằng tần số thật. Đoạn ngập có thêm khối lượng nước nâng ρ<sub>w</sub>·π·(D + 2·t<sub>mg</sub>)²/4 mỗi mét dài.</p>
<h4>Đất nền và xói</h4>
<ul>
<li>Cọc ngàm trong đất được thay bằng ngàm tương đương ở độ sâu L<sub>d</sub>, thường bằng 4 đến 6 lần D.</li>
<li>Đất mềm hơn hoặc xói sâu hơn làm L<sub>d</sub> tăng, f₁ giảm.</li>
<li>Đối với thiết kế chính thức dùng lò xo p-y/t-z hoặc phần tử đất đa chiều trong mô hình tích hợp.</li>
</ul>
<div class="ex"><b>Ví dụ</b> với mặc định: móng D = 8 m, t = 80 mm, ngàm tương đương 30 m, tháp 6,5 m xuống 4,2 m dày 35 mm, RNA 600 t, thép phụ 15%.
<ul>
<li>f₁ ≈ 0,209 Hz. Khối lượng kết cấu ≈ 3 133 t.</li>
<li>Rotor 5 đến 9 vòng/phút: 1P = 0,083 đến 0,150 Hz, 3P = 0,250 đến 0,450 Hz. Với biên 10%, dải tránh là 0,075–0,165 Hz và 0,225–0,495 Hz.</li>
<li>f₁ nằm giữa hai dải: soft-stiff.</li>
<li>Độ nhạy: ngàm +30% cho f₁ ≈ 0,198 Hz, ngàm −30% cho f₁ ≈ 0,220 Hz. Giá trị này tiến sát biên dưới của dải 3P (0,225 Hz).</li>
</ul></div>
<p class="note">Khi f₁ cách biên dải 3P chưa tới vài phần trăm, kết cấu rất nhạy với xói và độ cứng đất. Nên tăng độ cứng hoặc giảm khối lượng.</p>`
  },
  {
    id: 'jacket',
    tag: 'Chuyên đề 6',
    title: 'Jacket: lực chân, giằng và cọc nhổ',
    body: `
<h4>Phân phối lực lên 4 chân</h4>
<p>Với 4 chân tại (±B/2, ±B/2), mô men lật M phân phối theo toạ độ chân so với trục mô men:</p>
<p><span class="eq">ΔN = M·x<sub>max</sub> / Σx²</span></p>
<ul>
<li>Tải vuông góc cạnh: <span class="eq">ΔN = M/(2B)</span>.</li>
<li>Tải theo đường chéo: <span class="eq">ΔN = M/(√2·B) ≈ 0,707·M/B</span>, lớn hơn nên thường chi phối.</li>
<li>Chân nén lớn nhất <span class="eq">N/4 + ΔN</span>, chân nhổ <span class="eq">N/4 − ΔN</span>.</li>
</ul>
<h4>Giằng chữ X</h4>
<p>Lực cắt ngang V truyền qua các thanh giằng của hai mặt phẳng, mỗi mặt phẳng có hai thanh chéo. Gần đúng:</p>
<p><span class="eq">N<sub>b</sub> = V/(4·cos α)</span>, <span class="eq">α = atan(h<sub>b</sub>/B)</span></p>
<h4>Cột và giằng chịu nén (API RP 2A)</h4>
<p><span class="eq">λ<sub>c</sub> = (K·L/r)/π·√(f<sub>y</sub>/E)</span></p>
<p>Nếu λ<sub>c</sub> ≤ 1,34: <span class="eq">F<sub>xc</sub> = f<sub>y</sub>·(1 − 0,25·λ<sub>c</sub>²)</span>. Nếu lớn hơn: <span class="eq">F<sub>xc</sub> = 0,88·f<sub>y</sub>/λ<sub>c</sub>²</span>. Sức kháng nén <span class="eq">R<sub>c</sub> = F<sub>xc</sub>·A/γ<sub>M</sub></span>.</p>
<h4>Cọc chịu nhổ</h4>
<p>Cát: <span class="eq">Q = π·D·β·γ'·L²/2</span>. Sét: <span class="eq">Q = π·D·α·s<sub>u</sub>·L</span>. Yêu cầu <span class="eq">Q ≥ FS·T</span>.</p>
<div class="ex"><b>Ví dụ</b> với mặc định: B = 25 m, N = 20 000 kN, tải theo đường chéo. M = 283 747 kN·m.
<ul>
<li>N/4 = 5 000 kN, ΔN = 0,707·283 747/25 = 8 026 kN.</li>
<li>Chân nén: 13 026 kN. Chân nhổ: −3 026 kN, tức có lực nhổ.</li>
<li>Chân D = 2 m, t = 50 mm, L = 15 m: λ<sub>c</sub> = 0,23, F<sub>xc</sub> = 350 MPa, R<sub>c</sub>/γ<sub>M</sub> ≈ 93 329 kN. Sử dụng 19%.</li>
<li>Cọc D = 2,4 m, β = 0,4, γ' = 9 kN/m³, FS = 2: L ≈ 21,1 m để chịu nhổ.</li>
</ul></div>
<p class="note">Mỏi tại nút ống (hot-spot) và cường độ mối nối thường chi phối thiết kế giàn thực tế. Cần mô hình giàn đầy đủ.</p>`
  },
  {
    id: 'gbs',
    tag: 'Chuyên đề 7',
    title: 'Móng trọng lực: ổn định và biến dạng',
    body: `
<h4>Độ lệch tâm và diện tích hữu hiệu</h4>
<p><span class="eq">e = M/V</span>. Đế tròn bán kính R: lực nằm trong lõi nếu <span class="eq">e ≤ D/8</span>. Diện tích hữu hiệu:</p>
<p><span class="eq">A' = 2·[R²·acos(e/R) − e·√(R² − e²)]</span></p>
<h4>Sức chịu tải</h4>
<p>Cát (thoát nước):</p>
<p><span class="eq">q<sub>u</sub> = q·N<sub>q</sub>·s<sub>q</sub>·i<sub>q</sub> + ½·γ'·D'·N<sub>γ</sub>·s<sub>γ</sub>·i<sub>γ</sub></span></p>
<p><span class="eq">N<sub>q</sub> = e^(π·tanφ)·tan²(45° + φ/2)</span>, <span class="eq">N<sub>γ</sub> = 2·(N<sub>q</sub> + 1)·tanφ</span></p>
<p>Sét (không thoát nước): <span class="eq">q<sub>u</sub> = 5,14·s<sub>u</sub>·1,2·i<sub>c</sub> + q</span>.</p>
<h4>Trượt và lật</h4>
<ul>
<li>Trượt: cát <span class="eq">R<sub>h</sub> = V·tan(⅔φ)</span>; sét <span class="eq">R<sub>h</sub> = s<sub>u</sub>·A'</span>. <span class="eq">FS = R<sub>h</sub>/H</span>.</li>
<li>Lật quanh mép: <span class="eq">FS = V·R/M</span>.</li>
</ul>
<h4>Lún và xoay đàn hồi</h4>
<p>Đế cứng tròn trên bán không gian đàn hồi, bán kính a:</p>
<p><span class="eq">s = V·(1 − ν²)/(2·a·E)</span>, <span class="eq">θ = 3·(1 − ν²)·M/(4·E·a³)</span></p>
<div class="ex"><b>Ví dụ</b> với mặc định: đáy D = 36 m, V = 90 000 kN, H = 5 904 kN, M = 313 091 kN·m, φ = 35°, E = 50 MPa, ν = 0,3.
<ul>
<li>N<sub>q</sub> = 33,3, N<sub>γ</sub> = 48,0. e = 3,48 m, nhỏ hơn D/8 = 4,5 m.</li>
<li>A' = 769 m², D' = 31,3 m.</li>
<li>FS sức chịu tải ≈ 27, trượt ≈ 7,1, lật ≈ 5,2.</li>
<li>Lún đàn hồi ≈ 45 mm, xoay ≈ 0,04°.</li>
</ul></div>
<p class="note">Móng thật còn cần kiểm tra tải chu kỳ gây tăng áp lực nước lỗ rỗng, lún lệch và xói dưới mép đế. Ở vùng đất yếu của đồng bằng sông Cửu Long, lún dài hạn có thể chi phối.</p>`
  },
  {
    id: 'noi',
    tag: 'Chuyên đề 8',
    title: 'Móng nổi: ổn định và chu kỳ riêng',
    body: `
<h4>Ổn định tĩnh của spar</h4>
<p><span class="eq">KB = T/2</span>, <span class="eq">BM = I/∇ = D²/(16·T)</span>, <span class="eq">GM = KB + BM − KG</span></p>
<p>Độ cứng hồi phục lắc dọc: <span class="eq">C₅₅ = ρ·g·∇·GM</span>. Góc nghiêng tĩnh do lực đẩy gió T và cánh tay (h<sub>hub</sub> + T − KG):</p>
<p><span class="eq">θ = T·(h<sub>hub</sub> + T − KG)/C₅₅</span></p>
<h4>Chu kỳ riêng</h4>
<ul>
<li>Nhún: <span class="eq">T<sub>h</sub> = 2π·√((m + A₃₃)/(ρ·g·A<sub>wp</sub>))</span>, <span class="eq">A₃₃ ≈ ρ·D³/3</span>. Với trụ tròn <span class="eq">T<sub>h</sub> ≈ 2π·√(T/g)</span>.</li>
<li>Lắc dọc: <span class="eq">T<sub>p</sub> = 2π·√((I₅₅ + A₅₅)/C₅₅)</span>.</li>
<li>Trôi dạt: <span class="eq">T<sub>s</sub> = 2π·√((m + A₁₁)/K<sub>neo</sub>)</span>.</li>
</ul>
<p>Các chu kỳ này phải xa dải năng lượng sóng (khoảng 5 đến 20 s) để tránh cộng hưởng.</p>
<div class="ex"><b>Ví dụ</b> với mặc định: D = 18 m, chiều chìm 80 m, KG = 28 m, lực đẩy 1 863 kN, K<sub>neo</sub> = 300 kN/m.
<ul>
<li>Lượng giãn nước ≈ 20 866 t. KB = 40 m, BM = 0,25 m, GM = 12,25 m.</li>
<li>C₅₅ ≈ 2 508 MN·m/rad. Nghiêng tĩnh ≈ 6,9°, nhỏ hơn 10°.</li>
<li>Nhún 18,8 s, lắc dọc 21,3 s, trôi dạt 74 s.</li>
</ul>
Nhún 18,8 s còn khá gần dải sóng dài. Cách xử lý là thêm tấm giảm chấn hoặc đáy thon để tăng chu kỳ.</div>
<h4>Các loại móng nổi</h4>
<ul>
<li><b>Spar:</b> trụ chìm sâu, trọng tâm thấp, ổn định bằng dằn.</li>
<li><b>Bán chìm (semi-sub):</b> nhiều cột nổi có đế, ổn định bằng diện tích mặt nước.</li>
<li><b>TLP:</b> dây căng thẳng đứng, ổn định bằng lực căng.</li>
</ul>
<p class="note">Móng nổi thuộc IEC TS 61400-3-2 và DNV-ST-0119. Mô-đun trong ứng dụng chỉ minh họa cho spar trụ tròn.</p>`
  },
  {
    id: 'moi',
    tag: 'Chuyên đề 9',
    title: 'Mỏi: đường cong S–N và cộng dồn Miner',
    body: `
<h4>Đường cong S–N loại D (DNV-RP-C203)</h4>
<p><span class="eq">log N = log ā − m·log(Δσ·(t/t<sub>ref</sub>)<sup>k</sup>)</span>, t<sub>ref</sub> = 25 mm, k = 0,20 cho loại D khi t &gt; 25 mm.</p>
<div class="tw"><table>
<tr><th>Môi trường</th><th>m</th><th>log ā</th><th>Điểm gãy</th></tr>
<tr><td>Không khí</td><td>3 rồi 5</td><td>12,164 rồi 15,606</td><td>N = 10⁷</td></tr>
<tr><td>Nước biển, có catốt</td><td>3 rồi 5</td><td>11,764 rồi 15,606</td><td>N = 10⁶</td></tr>
<tr><td>Nước biển, ăn mòn tự do</td><td>3</td><td>11,687</td><td>Không có</td></tr>
</table></div>
<h4>Cộng dồn Miner</h4>
<p><span class="eq">D = Σ n<sub>i</sub>/N<sub>i</sub></span>. Yêu cầu <span class="eq">D ≤ 1/DFF</span>. DFF thường từ 1 đến 3 theo khả năng kiểm tra và hậu quả hư hỏng.</p>
<h4>Điểm nóng và SCF</h4>
<p>Biên độ ứng suất tại điểm nóng bằng ứng suất danh nghĩa nhân với hệ số tập trung SCF. Mối hàn chu vi phẳng có SCF gần 1, mối hàn có lệch tim hoặc thay đổi chiều dày có SCF lớn hơn.</p>
<div class="ex"><b>Ví dụ</b> mối hàn t = 80 mm, nước biển có catốt, SCF = 1,5, DFF = 3, tuổi thọ 25 năm. Phổ danh nghĩa 5, 10, 15, 20, 30, 40 MPa với 10⁸, 3·10⁷, 8·10⁶, 2·10⁶, 3·10⁵, 4·10⁴ chu kỳ.
<ul>
<li>Hệ số chiều dày (80/25)^0,2 = 1,262.</li>
<li>Tổng hư hỏng D ≈ 0,164. Hư hỏng tập trung ở dải 22,5 đến 45 MPa điểm nóng.</li>
<li>D·DFF = 0,49 &lt; 1, tuổi thọ mỏi tính được ≈ 51 năm.</li>
</ul></div>
<h4>Ăn mòn và mỏi</h4>
<ul>
<li>Bảo vệ catốt đủ làm giảm ảnh hưởng của nước biển lên đường cong S–N.</li>
<li>Vùng văng bắn không được bảo vệ catốt liên tục, nên thường dùng đường cong ăn mòn tự do hoặc kèm lớp sơn đủ độ bền.</li>
</ul>`
  }
];

const TCVN = [
  {
    topic: 'Tải trọng gió, sóng, tác động chung',
    intl: 'IEC 61400-3-1 điều 6; ISO 19901-1; DNV-ST-0437',
    vn: 'TCVN 2737:2023 (Tải trọng và tác động); TCVN 8421:2010 (tải trọng sóng và tàu lên công trình thủy); QCVN 02:2022/BXD (số liệu điều kiện tự nhiên)',
    note: 'Tiêu chuẩn Việt Nam không có hệ DLC cho tua bin. Dùng IEC cho tải tua bin, TCVN cho số liệu tự nhiên và kiểm tra cục bộ.'
  },
  {
    topic: 'Kết cấu thép (tháp, ống, giàn)',
    intl: 'ISO 19902; DNV-ST-0126; EN 1993-1-6',
    vn: 'TCVN 5575 (Kết cấu thép – Thiết kế), kiểm tra bản đang hiệu lực; TCVN 6170 (Công trình biển cố định)',
    note: 'TCVN 6170 gần với API RP 2A. Phù hợp cho jacket và kết cấu giàn thép.'
  },
  {
    topic: 'Kết cấu bê tông (móng trọng lực, đế)',
    intl: 'ISO 19903; DNV-ST-C502; EN 1992',
    vn: 'TCVN 5574:2018 (Kết cấu bê tông và bê tông cốt thép)',
    note: 'Bê tông trong môi trường biển phải kiểm tra chống ăn mòn và nứt theo mục dưới.'
  },
  {
    topic: 'Ăn mòn và độ bền lâu',
    intl: 'ISO 12944; DNV-RP-B401; NORSOK M-501',
    vn: 'TCVN 9346:2012 (bê tông cốt thép trong môi trường biển); TCVN 12251:2020 (bảo vệ chống ăn mòn kết cấu xây dựng)',
    note: 'Phân vùng khí quyển, văng bắn, ngập nước, chôn. Vùng văng bắn là bất lợi nhất.'
  },
  {
    topic: 'Móng cọc',
    intl: 'API RP 2GEO; ISO 19901-4; DNV-ST-0126',
    vn: 'TCVN 10304:2014 (Móng cọc – Thiết kế); TCVN 9393:2012 (thử tải tĩnh cọc)',
    note: 'TCVN 10304 không có p-y cho monopile lớn. Dùng API hoặc PISA cho tải ngang chu kỳ.'
  },
  {
    topic: 'Nền móng nông, móng trọng lực',
    intl: 'ISO 19901-4; DNV-ST-0126',
    vn: 'TCVN 9362:2012 (Thiết kế nền nhà và công trình); TCVN 4253:2012 (nền công trình thủy công)',
    note: 'Kiểm tra trượt, lật, sức chịu tải, độ lún, lệch tâm. Thêm kiểm tra tải chu kỳ.'
  },
  {
    topic: 'Động đất',
    intl: 'ISO 19901-2; IEC 61400-3-1 điều 6',
    vn: 'TCVN 9386:2012 (Thiết kế công trình chịu động đất)',
    note: 'Tuỳ vùng. Nhiều vùng ven biển phía nam có gia tốc nền thấp nhưng vẫn phải xác nhận.'
  },
  {
    topic: 'Tua bin và thiết bị điện gió',
    intl: 'IEC 61400-1, 61400-3-1, 61400-3-2 (nổi), 61400-22 (chứng nhận)',
    vn: 'Các tiêu chuẩn TCVN IEC tương đương (nếu đã ban hành). Kiểm tra danh mục hiện hành.',
    note: 'Hồ sơ dự án thực tế thường yêu cầu chứng nhận độc lập (DNV, TÜV, Bureau Veritas...).'
  }
];

/* Đối chiếu từng kiểm tra */
const CHECKS = [
  {
    h: 'Tải gió lên tháp và rotor',
    intl: 'IEC 61400-1/-3-1: profile NWP α = 0,14, gió trung bình 10 phút tại trục rotor, lực rotor từ mô phỏng khí động đàn hồi. Gió tháp: ½·ρ·C<sub>d</sub>·D·V².',
    vn: 'TCVN 2737:2023: tải gió tính từ áp lực gió cơ sở nhân hệ số độ cao và hệ số khí động, kiểm tra bản hiện hành về thời gian lấy trung bình.',
    mix: 'Dùng IEC cho rotor. Với tháp, dùng IEC để đồng bộ với mô phỏng, dùng TCVN để kiểm tra độc lập. Phải quy đổi gió giật sang trung bình 10 phút.'
  },
  {
    h: 'Tải sóng lên trụ',
    intl: 'ISO 19901-1, DNV-RP-C205: Morison cho D/L &lt; 0,2, nhiễu xạ cho trụ lớn, Stokes 5 hoặc hàm dòng cho sóng phi tuyến.',
    vn: 'TCVN 8421:2010: tải trọng sóng lên công trình thủy lợi và thủy, chủ yếu cho tường đứng, mái nghiêng, cọc.',
    mix: 'Dùng ISO/DNV cho trụ tròn đứng. TCVN 8421 hữu ích cho mái chắn sóng, đê, kè kèm theo.'
  },
  {
    h: 'Mực nước và số liệu tự nhiên',
    intl: 'IEC 61400-3-1: mực nước chuẩn LAT hoặc MSL, nước dâng bão, giá trị cực hạn 50 năm.',
    vn: 'QCVN 02:2022/BXD: số liệu điều kiện tự nhiên dùng trong xây dựng; số liệu trạm khí tượng thủy văn quốc gia.',
    mix: 'Thống nhất mốc cao độ và chu kỳ lặp. Với ngoài khơi, ưu tiên khảo sát hải văn riêng của dự án.'
  },
  {
    h: 'Tổ hợp tải và hệ số',
    intl: 'IEC 61400-3-1: γ<sub>f</sub> = 1,35 / 1,1 / 1,5 / 0,9, DLC 1 đến 8, phương pháp trạng thái giới hạn.',
    vn: 'TCVN 2737: hệ số vượt tải và hệ số tổ hợp, phương pháp trạng thái giới hạn.',
    mix: 'Chọn một hệ trạng thái giới hạn và áp dụng nhất quán. Không nhân hai lần hệ số vượt tải của hai tiêu chuẩn.'
  },
  {
    h: 'Bền ống thép và khung',
    intl: 'ISO 19902, DNV-ST-0126: σ ≤ f<sub>y</sub>/γ<sub>M</sub>, γ<sub>M</sub> từ 1,05 đến 1,15.',
    vn: 'TCVN 5575: kiểm tra σ ≤ f·γ<sub>c</sub>, f = f<sub>y</sub>/γ<sub>m</sub> với γ<sub>m</sub> khoảng 1,05 (bản 2012).',
    mix: 'Hệ số vật liệu trong hai hệ khác nhau nhẹ. Chọn theo hợp đồng và ghi rõ trong cơ sở thiết kế.'
  },
  {
    h: 'Ổn định vỏ và cột',
    intl: 'DNV-RP-C202, EN 1993-1-6 cho vỏ tròn; API RP 2A, ISO 19902 cho cột và giằng.',
    vn: 'TCVN 5575 có kiểm tra ổn định cấu kiện, nhưng ít điều khoản cho vỏ mỏng tròn đường kính lớn.',
    mix: 'Dùng DNV hoặc EN cho vỏ ống lớn. TCVN dùng để đối chiếu cho cột và giằng thông thường.'
  },
  {
    h: 'Cọc chịu nén',
    intl: 'API, ISO 19901-4: ma sát bên cộng sức chịu mũi, đặt giới hạn mũi cho đất cát.',
    vn: 'TCVN 10304:2014: R<sub>c,u</sub> = γ<sub>c</sub>·(γ<sub>cq</sub>·q<sub>b</sub>·A<sub>b</sub> + u·Σγ<sub>cf</sub>·f<sub>i</sub>·h<sub>i</sub>), R<sub>c,d</sub> = R<sub>c,u</sub>/γ<sub>k</sub>, γ<sub>k</sub> khoảng 1,2 đến 1,75 tùy cách xác định.',
    mix: 'Dùng thử tải tĩnh theo TCVN 9393:2012 để hiệu chỉnh. Cọc ống thép hở cần xét nút đất.'
  },
  {
    h: 'Cọc chịu tải ngang',
    intl: 'API p-y, PISA cho đường kính lớn. Xét tải chu kỳ.',
    vn: 'TCVN 10304:2014: phương pháp hệ số nền tăng theo độ sâu, kiểm tra chuyển vị đầu cọc.',
    mix: 'Dùng p-y hoặc PISA làm chính cho monopile. Hệ số nền TCVN dùng để đối chiếu cho cọc nhỏ.'
  },
  {
    h: 'Nền móng nông và móng trọng lực',
    intl: 'ISO 19901-4, DNV-ST-0126: kiểm tra sức chịu tải với diện tích hữu hiệu, trượt, lật, lún.',
    vn: 'TCVN 9362:2012: áp lực tiêu chuẩn R = (m<sub>1</sub>·m<sub>2</sub>/k<sub>tc</sub>)·(A·b·γ + B·h·γ\' + D·c), hai nhóm trạng thái giới hạn về cường độ và biến dạng.',
    mix: 'Dùng ISO cho tải lệch tâm lớn và tải chu kỳ. TCVN 9362 cho kiểm tra biến dạng và áp lực đáy.'
  },
  {
    h: 'Bê tông và ăn mòn',
    intl: 'ISO 19903, EN 1992 với lớp bê tông bảo vệ, độ rộng vết nứt giới hạn trong môi trường biển.',
    vn: 'TCVN 5574:2018 cho thiết kế bê tông cốt thép. TCVN 9346:2012 cho yêu cầu chống ăn mòn trong môi trường biển.',
    mix: 'Thiết kế kết cấu theo TCVN 5574, nâng yêu cầu lớp bảo vệ và vết nứt theo TCVN 9346 và tài liệu quốc tế.'
  },
  {
    h: 'Mỏi',
    intl: 'DNV-RP-C203: đường cong S–N, SCF, DFF. IEC 61400-3-1 yêu cầu kiểm tra FLS.',
    vn: 'TCVN chưa có đường cong S–N đầy đủ cho kết cấu thép ngoài khơi.',
    mix: 'Dùng DNV-RP-C203 cho mỏi. Ghi rõ trong cơ sở thiết kế.'
  },
  {
    h: 'Động đất',
    intl: 'ISO 19901-2: thiết kế theo mức cường độ và mức dẻo, phổ phản ứng theo địa điểm.',
    vn: 'TCVN 9386:2012: gia tốc nền tham chiếu theo vùng, phổ phản ứng, cấp tầm quan trọng.',
    mix: 'Dùng nghiên cứu động đất riêng cho địa điểm và đối chiếu gia tốc nền với TCVN 9386.'
  }
];

const TIPS = [
  ['Thời gian lấy trung bình của gió', '<p>IEC dùng trung bình 10 phút tại cao độ trục rotor. Số liệu trạm Việt Nam có thể là trung bình 2 phút hoặc giật 3 giây. Phải quy đổi về cùng cơ sở trước khi dùng.</p><p>Ví dụ: giật 3 giây 45 m/s tại 10 m tương đương khoảng 45,0 m/s trung bình 10 phút tại 110 m. Nếu nhầm giật 3 giây tại 110 m (52,7 m/s) với trung bình 10 phút (45,0 m/s) thì tải gió lệch khoảng 37% theo V².</p>'],
  ['Chu kỳ lặp', '<p>IEC dùng 50 năm cho tải cực hạn và 1 năm cho một số DLC. TCVN gắn chu kỳ lặp với cấp công trình. Chọn chu kỳ lặp theo yêu cầu hợp đồng và hồ sơ.</p>'],
  ['Hệ số an toàn', '<p>Không trộn hệ số riêng phần của IEC với hệ số an toàn tổng thể của TCVN trong cùng một kiểm tra. Chọn một hệ và áp dụng nhất quán.</p>'],
  ['Cao độ chuẩn', '<p>Thống nhất LAT, MSL hay cao độ quốc gia cho độ sâu, mực nước và cao độ trục rotor.</p>'],
  ['Bão', '<p>Dùng số liệu bão nhiều thập kỷ, xét hướng đi và nước dâng bão. Số liệu khí tượng hải văn ngoài khơi thường khác trạm ven bờ.</p>'],
  ['Phiên bản tiêu chuẩn', '<p>Ghi rõ số hiệu, năm ban hành và bản sửa đổi trong cơ sở thiết kế. Tiêu chuẩn TCVN và QCVN được cập nhật theo chu kỳ, bản mới có thể thay đổi hệ số.</p>'],
  ['Thẩm tra', '<p>Dự án thực tế thường cần chứng nhận hoặc thẩm tra độc lập của tổ chức được công nhận.</p>']
];
const TERMS = [
 [
  "Offshore wind turbine",
  "Tua bin gió ngoài khơi",
  "Cụm tua bin đặt trên biển.",
  "kc"
 ],
 [
  "Fixed-bottom foundation",
  "Móng cố định đáy",
  "Monopile, jacket, trọng lực...",
  "kc"
 ],
 [
  "Monopile",
  "Móng cọc đơn",
  "Một ống thép lớn đóng hoặc khoan vào đất.",
  "kc"
 ],
 [
  "Jacket",
  "Móng giàn thép",
  "Giàn 3-4 chân có thanh giằng.",
  "kc"
 ],
 [
  "Gravity-based structure (GBS)",
  "Móng trọng lực",
  "Móng bê tông nặng đặt lên đáy.",
  "kc"
 ],
 [
  "Floating foundation",
  "Móng nổi",
  "Spar, bán chìm, TLP với neo.",
  "kc"
 ],
 [
  "Transition piece (TP)",
  "Cấu kiện chuyển tiếp",
  "Nối monopile với tháp, có sàn, thang và cẩu.",
  "kc"
 ],
 [
  "Mudline",
  "Cao độ đáy biển",
  "Mặt đất đáy biển.",
  "dkt"
 ],
 [
  "Seabed",
  "Đáy biển",
  "",
  "dkt"
 ],
 [
  "Water depth",
  "Độ sâu nước",
  "Tính từ SWL hoặc LAT, cần ghi rõ.",
  "tai"
 ],
 [
  "Still water level (SWL)",
  "Mực nước tĩnh",
  "Mực nước khi không có sóng.",
  "tai"
 ],
 [
  "Mean sea level (MSL)",
  "Mực nước biển trung bình",
  "",
  "tai"
 ],
 [
  "Lowest astronomical tide (LAT)",
  "Triều thấp nhất thiên văn",
  "Mốc đo độ sâu trên hải đồ.",
  "tai"
 ],
 [
  "Highest astronomical tide (HAT)",
  "Triều cao nhất thiên văn",
  "",
  "tai"
 ],
 [
  "Storm surge",
  "Nước dâng do bão",
  "",
  "tai"
 ],
 [
  "Significant wave height (Hs)",
  "Chiều cao sóng có nghĩa",
  "Trung bình 1/3 số sóng cao nhất.",
  "tai"
 ],
 [
  "Peak period (Tp)",
  "Chu kỳ đỉnh phổ",
  "Chu kỳ tại năng lượng sóng lớn nhất.",
  "tai"
 ],
 [
  "Wavelength",
  "Bước sóng",
  "Ký hiệu L.",
  "tai"
 ],
 [
  "Wave celerity",
  "Vận tốc truyền sóng",
  "c = L/T.",
  "tai"
 ],
 [
  "Breaking wave",
  "Sóng vỡ",
  "Xung kích lớn lên trụ.",
  "tai"
 ],
 [
  "Normal sea state (NSS)",
  "Trạng thái biển thường",
  "Dùng cho mỏi.",
  "tai"
 ],
 [
  "Severe sea state (SSS)",
  "Trạng thái biển mạnh",
  "DLC 1.6.",
  "tai"
 ],
 [
  "Extreme sea state (ESS)",
  "Trạng thái biển cực hạn",
  "Chu kỳ lặp 50 năm hoặc 1 năm.",
  "tai"
 ],
 [
  "Extreme wind speed model (EWM)",
  "Mô hình gió cực hạn",
  "Gió bão.",
  "tai"
 ],
 [
  "Normal turbulence model (NTM)",
  "Mô hình rối thường",
  "",
  "tai"
 ],
 [
  "Wind shear",
  "Cắt gió, gradient gió theo độ cao",
  "Lũy thừa α.",
  "tai"
 ],
 [
  "Hub height",
  "Cao độ trục rotor",
  "",
  "tai"
 ],
 [
  "Rotor thrust",
  "Lực đẩy rotor",
  "Lực gió dọc trục rotor.",
  "tai"
 ],
 [
  "Thrust coefficient (Ct)",
  "Hệ số lực đẩy",
  "",
  "tai"
 ],
 [
  "Rated wind speed",
  "Tốc độ gió định mức",
  "Tại đó đạt công suất định mức, lực đẩy lớn nhất.",
  "tai"
 ],
 [
  "Cut-out wind speed",
  "Tốc độ gió ngắt",
  "Máy dừng khi vượt qua.",
  "tai"
 ],
 [
  "Morison equation",
  "Phương trình Morison",
  "Tải sóng lên trụ nhỏ = kéo + quán tính.",
  "tai"
 ],
 [
  "Drag coefficient (CD)",
  "Hệ số cản",
  "Trụ nhám khoảng 1,05.",
  "tai"
 ],
 [
  "Inertia coefficient (CM)",
  "Hệ số quán tính",
  "Thường 1,8–2,0.",
  "tai"
 ],
 [
  "Diffraction",
  "Nhiễu xạ",
  "Quan trọng khi D/L > 0,2.",
  "tai"
 ],
 [
  "Marine growth",
  "Sinh vật bám",
  "Hà, rong, san hô.",
  "tai"
 ],
 [
  "Scour",
  "Xói lở",
  "Đáy biển bị khoét quanh móng.",
  "dkt"
 ],
 [
  "Scour protection",
  "Bảo vệ chống xói",
  "Lớp đá hộc phủ quanh chân.",
  "dkt"
 ],
 [
  "Design load case (DLC)",
  "Trường hợp tải thiết kế",
  "Tổ hợp tình huống máy và điều kiện ngoài.",
  "ts"
 ],
 [
  "Ultimate limit state (ULS)",
  "Trạng thái giới hạn cực hạn",
  "",
  "ts"
 ],
 [
  "Fatigue limit state (FLS)",
  "Trạng thái giới hạn mỏi",
  "",
  "ts"
 ],
 [
  "Serviceability limit state (SLS)",
  "Trạng thái giới hạn sử dụng",
  "",
  "ts"
 ],
 [
  "Accidental limit state (ALS)",
  "Trạng thái giới hạn sự cố",
  "",
  "ts"
 ],
 [
  "Partial safety factor",
  "Hệ số an toàn riêng phần",
  "γf cho tải, γm cho vật liệu.",
  "ts"
 ],
 [
  "Characteristic load",
  "Tải trọng tiêu chuẩn",
  "Chưa nhân hệ số.",
  "ts"
 ],
 [
  "Design load",
  "Tải trọng tính toán",
  "Đã nhân hệ số.",
  "ts"
 ],
 [
  "Overturning moment",
  "Mô men lật",
  "",
  "tai"
 ],
 [
  "Natural frequency",
  "Tần số riêng",
  "Ký hiệu f1 cho dạng thứ nhất.",
  "kc"
 ],
 [
  "1P / 3P frequency",
  "Tần số 1P / 3P",
  "1 lần và 3 lần tốc độ rotor.",
  "kc"
 ],
 [
  "Soft-stiff design",
  "Thiết kế mềm-cứng",
  "f1 nằm giữa 1P và 3P.",
  "kc"
 ],
 [
  "Campbell diagram",
  "Biểu đồ Campbell",
  "Tần số riêng theo tốc độ quay.",
  "kc"
 ],
 [
  "Resonance",
  "Cộng hưởng",
  "",
  "kc"
 ],
 [
  "p-y curve",
  "Đường cong p-y",
  "Quan hệ phản lực đất và chuyển vị ngang.",
  "dkt"
 ],
 [
  "Lateral pile capacity",
  "Sức chịu tải ngang của cọc",
  "",
  "dkt"
 ],
 [
  "Skin friction",
  "Ma sát bên",
  "",
  "dkt"
 ],
 [
  "End bearing",
  "Sức chịu mũi",
  "",
  "dkt"
 ],
 [
  "Uplift capacity",
  "Sức kháng nhổ",
  "Quan trọng cho chân jacket.",
  "dkt"
 ],
 [
  "Bearing capacity",
  "Sức chịu tải của nền",
  "",
  "dkt"
 ],
 [
  "Sliding",
  "Trượt",
  "",
  "dkt"
 ],
 [
  "Effective area",
  "Diện tích hữu hiệu",
  "Dùng khi tải lệch tâm.",
  "dkt"
 ],
 [
  "Eccentricity",
  "Độ lệch tâm",
  "e = M/V.",
  "dkt"
 ],
 [
  "Cathodic protection",
  "Bảo vệ catốt",
  "Anốt hy sinh hoặc dòng áp đặt.",
  "kc"
 ],
 [
  "Sacrificial anode",
  "Anốt hy sinh",
  "",
  "kc"
 ],
 [
  "Splash zone",
  "Vùng văng bắn",
  "Ăn mòn nặng nhất.",
  "kc"
 ],
 [
  "Corrosion allowance",
  "Chiều dày dự phòng ăn mòn",
  "",
  "kc"
 ],
 [
  "Grouted connection",
  "Mối nối vữa",
  "Nối TP với monopile bằng vữa cường độ cao.",
  "kc"
 ],
 [
  "J-tube",
  "Ống chữ J",
  "Dẫn cáp ngầm vào móng.",
  "kc"
 ],
 [
  "Boat landing",
  "Bến cập tàu",
  "Chỗ nhân viên lên xuống.",
  "kc"
 ],
 [
  "Metacentric height (GM)",
  "Chiều cao tâm nghiêng",
  "Tiêu chí ổn định cho móng nổi.",
  "noi"
 ],
 [
  "Heave natural period",
  "Chu kỳ riêng chuyển động đứng",
  "Phải xa chu kỳ sóng.",
  "noi"
 ],
 [
  "Mooring line",
  "Dây neo",
  "",
  "noi"
 ],
 [
  "Pile driving",
  "Đóng cọc",
  "",
  "tc"
 ],
 [
  "Installation vessel",
  "Tàu lắp đặt",
  "",
  "tc"
 ],
 [
  "Wave spectrum",
  "Phổ sóng",
  "Phân bố năng lượng sóng theo tần số.",
  "tai"
 ],
 [
  "JONSWAP spectrum",
  "Phổ JONSWAP",
  "Phổ cho biển đang phát triển.",
  "tai"
 ],
 [
  "Pierson–Moskowitz spectrum",
  "Phổ Pierson–Moskowitz",
  "Biển phát triển đầy đủ.",
  "tai"
 ],
 [
  "Wave steepness",
  "Độ dốc sóng",
  "H/L, giới hạn gây vỡ.",
  "tai"
 ],
 [
  "Ursell number",
  "Số Ursell",
  "Chỉ dẫn chọn lý thuyết sóng.",
  "tai"
 ],
 [
  "Stokes wave theory",
  "Lý thuyết sóng Stokes",
  "Sóng phi tuyến bậc cao.",
  "tai"
 ],
 [
  "Wheeler stretching",
  "Kéo dãn Wheeler",
  "Mở rộng động học sóng lên đỉnh sóng.",
  "tai"
 ],
 [
  "Added mass",
  "Khối lượng nước kèm",
  "Quán tính thêm do nước bị kéo theo.",
  "tai"
 ],
 [
  "Kinematic viscosity",
  "Độ nhớt động học",
  "Dùng tính số Reynolds.",
  "tai"
 ],
 [
  "Current",
  "Dòng chảy",
  "Cộng vector với vận tốc hạt sóng.",
  "tai"
 ],
 [
  "Turbulence intensity",
  "Cường độ rối",
  "Độ lệch chuẩn chia gió trung bình.",
  "tai"
 ],
 [
  "Gust factor",
  "Hệ số giật",
  "Tỷ số gió giật và trung bình.",
  "tai"
 ],
 [
  "Averaging time",
  "Thời gian lấy trung bình",
  "IEC dùng 10 phút.",
  "tai"
 ],
 [
  "Return period",
  "Chu kỳ lặp",
  "Ví dụ 50 năm, 1 năm.",
  "tai"
 ],
 [
  "Roughness length",
  "Độ dài nhám",
  "Tham số profile gió loga.",
  "tai"
 ],
 [
  "Air density",
  "Khối lượng riêng không khí",
  "1,225 kg/m³ ở điều kiện chuẩn.",
  "tai"
 ],
 [
  "Wake effect",
  "Hiệu ứng bóng khuất",
  "Giảm tốc gió sau tua bin.",
  "tai"
 ],
 [
  "Typhoon",
  "Bão nhiệt đới",
  "Gây tải cực hạn ở Việt Nam.",
  "tai"
 ],
 [
  "Tower",
  "Tháp",
  "Ống thép côn đỡ nacelle.",
  "kc"
 ],
 [
  "Nacelle",
  "Vỏ máy",
  "Chứa máy phát và hộp số.",
  "kc"
 ],
 [
  "Rotor-nacelle assembly (RNA)",
  "Cụm rotor và vỏ máy",
  "Khối lượng đặt ở đỉnh tháp.",
  "kc"
 ],
 [
  "Interface loads",
  "Tải giao diện",
  "Tải tại chân tháp từ nhà chế tạo tua bin.",
  "kc"
 ],
 [
  "Von Mises stress",
  "Ứng suất Von Mises",
  "Ứng suất tương đương dẻo.",
  "kc"
 ],
 [
  "Yield strength",
  "Giới hạn chảy",
  "Ký hiệu fy.",
  "kc"
 ],
 [
  "Shell buckling",
  "Mất ổn định vỏ",
  "Với ống D/t lớn.",
  "kc"
 ],
 [
  "Section modulus",
  "Mô men chống uốn",
  "W = I/(D/2).",
  "kc"
 ],
 [
  "Second moment of area",
  "Mô men quán tính",
  "Ký hiệu I.",
  "kc"
 ],
 [
  "Slenderness ratio",
  "Độ mảnh",
  "KL/r.",
  "kc"
 ],
 [
  "Effective length factor",
  "Hệ số chiều dài tính toán",
  "Ký hiệu K.",
  "kc"
 ],
 [
  "Brace",
  "Thanh giằng",
  "Truyền lực cắt trong jacket.",
  "kc"
 ],
 [
  "Chord",
  "Ống chính",
  "Ống nút nối trong jacket.",
  "kc"
 ],
 [
  "Tubular joint",
  "Nút ống",
  "Chỗ nối thanh giằng vào ống chính.",
  "kc"
 ],
 [
  "Hot-spot stress",
  "Ứng suất điểm nóng",
  "Dùng để tính mỏi.",
  "kc"
 ],
 [
  "Stress concentration factor (SCF)",
  "Hệ số tập trung ứng suất",
  "",
  "kc"
 ],
 [
  "S–N curve",
  "Đường cong S–N",
  "Quan hệ biên độ ứng suất và số chu kỳ.",
  "kc"
 ],
 [
  "Miner rule",
  "Quy tắc Miner",
  "D = Σ n/N.",
  "kc"
 ],
 [
  "Rainflow counting",
  "Đếm chu kỳ rainflow",
  "",
  "kc"
 ],
 [
  "Damage",
  "Hư hỏng mỏi",
  "Tỷ lệ tích lũy theo Miner.",
  "kc"
 ],
 [
  "Design fatigue factor (DFF)",
  "Hệ số mỏi thiết kế",
  "Nhân hư hỏng để dự phòng.",
  "kc"
 ],
 [
  "Weld",
  "Mối hàn",
  "Vị trí dễ mỏi.",
  "kc"
 ],
 [
  "Flange",
  "Mặt bích",
  "Nối đoạn tháp bằng bu lông.",
  "kc"
 ],
 [
  "Bolted connection",
  "Mối nối bu lông",
  "",
  "kc"
 ],
 [
  "Secondary steel",
  "Thép phụ",
  "Sàn, thang, cẩu, bến cập tàu.",
  "kc"
 ],
 [
  "Fixity",
  "Ngàm",
  "Điều kiện biên cứng.",
  "kc"
 ],
 [
  "Added mass of water",
  "Khối lượng nước nâng",
  "Tăng khối lượng đoạn ngập.",
  "kc"
 ],
 [
  "Cone penetration test (CPT)",
  "Thí nghiệm xuyên côn",
  "Cho p-y và sức chịu tải.",
  "dkt"
 ],
 [
  "Undrained shear strength",
  "Cường độ cắt không thoát nước",
  "Ký hiệu su của sét.",
  "dkt"
 ],
 [
  "Friction angle",
  "Góc ma sát trong",
  "Ký hiệu φ.",
  "dkt"
 ],
 [
  "Effective unit weight",
  "Trọng lượng riêng đẩy nổi",
  "γ' của đất ngập nước.",
  "dkt"
 ],
 [
  "Subgrade reaction modulus",
  "Hệ số nền",
  "Ký hiệu k trong p-y cát.",
  "dkt"
 ],
 [
  "Winkler foundation",
  "Nền Winkler",
  "Mô hình lò xo độc lập.",
  "dkt"
 ],
 [
  "PISA method",
  "Phương pháp PISA",
  "Cho monopile đường kính lớn.",
  "dkt"
 ],
 [
  "Cyclic loading",
  "Tải chu kỳ",
  "Làm giảm độ cứng đất.",
  "dkt"
 ],
 [
  "Pore pressure",
  "Áp lực nước lỗ rỗng",
  "",
  "dkt"
 ],
 [
  "Liquefaction",
  "Hóa lỏng",
  "Đất cát rời mất sức chịu khi động đất.",
  "dkt"
 ],
 [
  "Settlement",
  "Độ lún",
  "",
  "dkt"
 ],
 [
  "Tilt",
  "Độ nghiêng",
  "Giới hạn SLS cỡ vài phần mười độ.",
  "dkt"
 ],
 [
  "Overconsolidation ratio (OCR)",
  "Tỷ số quá cố kết",
  "",
  "dkt"
 ],
 [
  "Drained / undrained",
  "Thoát nước / không thoát nước",
  "",
  "dkt"
 ],
 [
  "Pile plugging",
  "Nút đất trong cọc",
  "Cọc ống hở.",
  "dkt"
 ],
 [
  "Soil-structure interaction",
  "Tương tác đất và kết cấu",
  "",
  "dkt"
 ],
 [
  "Rock socket",
  "Ngàm vào đá",
  "Cọc khoan vào nền đá.",
  "dkt"
 ],
 [
  "Geotechnical investigation",
  "Khảo sát địa kỹ thuật",
  "Khoan, CPT, lấy mẫu.",
  "dkt"
 ],
 [
  "Shear strength",
  "Cường độ chống cắt",
  "",
  "dkt"
 ],
 [
  "Bearing pressure",
  "Áp lực đáy móng",
  "Phân bố dưới đế.",
  "dkt"
 ],
 [
  "Spar",
  "Phao trụ",
  "Trụ tròn chìm sâu.",
  "noi"
 ],
 [
  "Semi-submersible",
  "Bán chìm",
  "Nhiều cột nổi có đế.",
  "noi"
 ],
 [
  "Tension leg platform (TLP)",
  "Bệ chân căng",
  "Dây neo căng thẳng đứng.",
  "noi"
 ],
 [
  "Center of buoyancy",
  "Tâm nổi",
  "KB.",
  "noi"
 ],
 [
  "Center of gravity",
  "Trọng tâm",
  "KG.",
  "noi"
 ],
 [
  "Restoring stiffness",
  "Độ cứng hồi phục",
  "C55 cho lắc dọc.",
  "noi"
 ],
 [
  "Pitch",
  "Lắc dọc",
  "Quay quanh trục ngang.",
  "noi"
 ],
 [
  "Surge",
  "Trôi dạt",
  "Chuyển động ngang.",
  "noi"
 ],
 [
  "Heave",
  "Nhún",
  "Chuyển động thẳng đứng.",
  "noi"
 ],
 [
  "Catenary mooring",
  "Neo dây xích võng",
  "Độ cứng do trọng lượng dây.",
  "noi"
 ],
 [
  "Anchor",
  "Neo",
  "Neo hút, neo trọng lực...",
  "noi"
 ],
 [
  "Dynamic cable",
  "Cáp động",
  "Cáp điện đi theo chuyển động nổi.",
  "noi"
 ],
 [
  "Radiation damping",
  "Cản bức xạ",
  "",
  "noi"
 ],
 [
  "Ballast",
  "Dằn",
  "Tăng ổn định nổi.",
  "noi"
 ],
 [
  "Jack-up vessel",
  "Tàu chân chống",
  "Lắp đặt ở nước nông.",
  "tc"
 ],
 [
  "Heavy-lift vessel",
  "Tàu cẩu nặng",
  "",
  "tc"
 ],
 [
  "Float-over",
  "Lắp nổi",
  "Đặt module bằng cách dằn nước.",
  "tc"
 ],
 [
  "Weather window",
  "Cửa sổ thời tiết",
  "Thời gian đủ điều kiện thi công.",
  "tc"
 ],
 [
  "Hammer",
  "Búa đóng cọc",
  "",
  "tc"
 ],
 [
  "Drilling",
  "Khoan",
  "Khoan khi đóng cọc không khả thi.",
  "tc"
 ],
 [
  "Commissioning",
  "Chạy thử nghiệm thu",
  "",
  "tc"
 ],
 [
  "Operation and maintenance (O&M)",
  "Vận hành và bảo trì",
  "",
  "tc"
 ],
 [
  "Decommissioning",
  "Tháo dỡ",
  "",
  "tc"
 ],
 [
  "Cable laying",
  "Rải cáp",
  "",
  "tc"
 ],
 [
  "Grout",
  "Vữa nối",
  "",
  "tc"
 ],
 [
  "Seafastening",
  "Chằng buộc vận chuyển",
  "",
  "tc"
 ],
 [
  "Pile run",
  "Cọc tự sụt",
  "Cọc sụt do nền yếu khi đóng.",
  "tc"
 ],
 [
  "Inspection",
  "Kiểm tra",
  "Bằng ROV hoặc thợ lặn.",
  "tc"
 ],
 [
  "IEC 61400-3-1",
  "IEC 61400-3-1",
  "Tua bin gió biển cố định.",
  "ts"
 ],
 [
  "IEC TS 61400-3-2",
  "IEC TS 61400-3-2",
  "Tua bin gió biển nổi.",
  "ts"
 ],
 [
  "IEC 61400-1",
  "IEC 61400-1",
  "Yêu cầu thiết kế tua bin trên bờ.",
  "ts"
 ],
 [
  "ISO 19902",
  "ISO 19902",
  "Kết cấu thép biển cố định.",
  "ts"
 ],
 [
  "DNV-RP-C203",
  "DNV-RP-C203",
  "Mỏi kết cấu thép biển.",
  "ts"
 ],
 [
  "DNV-RP-C205",
  "DNV-RP-C205",
  "Tải môi trường (gió, sóng).",
  "ts"
 ],
 [
  "API RP 2GEO",
  "API RP 2GEO",
  "Địa kỹ thuật cho công trình biển.",
  "ts"
 ],
 [
  "TCVN 2737:2023",
  "TCVN 2737:2023",
  "Tải trọng và tác động.",
  "ts"
 ],
 [
  "TCVN 10304:2014",
  "TCVN 10304:2014",
  "Móng cọc.",
  "ts"
 ],
 [
  "TCVN 9362:2012",
  "TCVN 9362:2012",
  "Nền nhà và công trình.",
  "ts"
 ],
 [
  "TCVN 5574:2018",
  "TCVN 5574:2018",
  "Kết cấu bê tông cốt thép.",
  "ts"
 ],
 [
  "TCVN 9386:2012",
  "TCVN 9386:2012",
  "Công trình chịu động đất.",
  "ts"
 ],
 [
  "Certification body",
  "Tổ chức chứng nhận",
  "DNV, BV, TÜV...",
  "ts"
 ],
 [
  "Design basis",
  "Cơ sở thiết kế",
  "Tài liệu gốc về dữ liệu và tiêu chí.",
  "ts"
 ],
 [
  "Independent verification",
  "Thẩm tra độc lập",
  "",
  "ts"
 ]
];
const QUIZ = [
 {
  "q": "IEC 61400-3-1:2019 áp dụng cho loại tua bin gió biển nào?",
  "o": [
   "Tua bin đặt trên kết cấu đỡ cố định đáy biển",
   "Tua bin nổi",
   "Tua bin trên bờ",
   "Tua bin cỡ nhỏ dưới 100 kW"
  ],
  "a": 0,
  "w": "Phần 3-1 dành cho tua bin cố định. Móng nổi thuộc IEC TS 61400-3-2.",
  "c": "iec",
  "l": 1
 },
 {
  "q": "Chiều cao sóng đơn cực hạn H_max thường lấy xấp xỉ bao nhiêu lần H_s?",
  "o": [
   "1,0",
   "1,86",
   "1,4",
   "3,0"
  ],
  "a": 1,
  "w": "H_max ≈ 1,86 H_s cho cơn biển 3 giờ theo IEC 61400-3-1.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Hệ số an toàn riêng cho tải thông thường bất lợi là bao nhiêu?",
  "o": [
   "1,00",
   "1,10",
   "1,35",
   "1,50"
  ],
  "a": 2,
  "w": "γf = 1,35 cho tải thông thường. Tải bất thường 1,10, vận chuyển/lắp dựng 1,50, tải có lợi 0,90.",
  "c": "iec",
  "l": 1
 },
 {
  "q": "DLC 6.1 mô tả tình huống nào?",
  "o": [
   "Phát điện với gió thường",
   "Khởi động tua bin",
   "Vận chuyển cấu kiện",
   "Tua bin đỗ khi gió và sóng cực hạn 50 năm"
  ],
  "a": 3,
  "w": "DLC 6.1: tua bin đỗ, EWM 50 năm kết hợp ESS 50 năm, kiểm tra cực hạn.",
  "c": "iec",
  "l": 1
 },
 {
  "q": "Hệ số mũ của profile gió chuẩn (NWP) ngoài khơi theo IEC 61400-3-1 là bao nhiêu?",
  "o": [
   "0,14",
   "0,05",
   "0,20",
   "0,40"
  ],
  "a": 0,
  "w": "Ngoài khơi α = 0,14 (trên bờ 0,2 theo IEC 61400-1).",
  "c": "tai",
  "l": 1
 },
 {
  "q": "3P là gì?",
  "o": [
   "Tần số quay của rotor",
   "Tần số cánh quạt đi qua tháp (3 lần tốc độ quay)",
   "Tần số sóng cực đại",
   "Tần số riêng thứ ba của tháp"
  ],
  "a": 1,
  "w": "Với 3 cánh, mỗi vòng quay có 3 lần cánh quạt đi qua tháp, tần số là 3 lần 1P.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "Thiết kế \"soft-stiff\" nghĩa là gì?",
  "o": [
   "Tần số riêng nằm dưới 1P",
   "Tần số riêng nằm trên 3P",
   "Tần số riêng nằm giữa 1P và 3P",
   "Kết cấu mềm ở đáy, cứng ở đỉnh"
  ],
  "a": 2,
  "w": "Soft-stiff nằm giữa 1P và 3P, là lựa chọn phổ biến nhất cho monopile.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "Phương trình Morison thích hợp khi nào?",
  "o": [
   "Trụ lớn, D/L > 0,2",
   "Sóng thần",
   "Sóng vỡ hoàn toàn",
   "Trụ nhỏ, D/L < 0,2"
  ],
  "a": 3,
  "w": "Khi trụ nhỏ so với bước sóng (D/L < khoảng 0,2) ảnh hưởng nhiễu xạ nhỏ. Trụ lớn cần nhiễu xạ.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Giới hạn chiều cao sóng do độ sâu d thường ước tính bằng?",
  "o": [
   "0,78 d",
   "0,2 d",
   "0,5 d",
   "1,5 d"
  ],
  "a": 0,
  "w": "Tiêu chí sóng vỡ H_b ≈ 0,78 d cho sóng đơn.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Vùng nào của kết cấu thép biển thường ăn mòn nhanh nhất?",
  "o": [
   "Khí quyển",
   "Vùng văng bắn",
   "Vùng ngập hoàn toàn",
   "Chôn trong đất"
  ],
  "a": 1,
  "w": "Vùng văng bắn (splash) ẩm ướt xen kẽ khô, oxy dồi dào nên ăn mòn nhanh nhất.",
  "c": "moi",
  "l": 1
 },
 {
  "q": "Mục đích chính của lớp bảo vệ chống xói (scour protection) là gì?",
  "o": [
   "Giảm tải sóng",
   "Chống sinh vật bám",
   "Ngăn đáy biển bị khoét quanh móng",
   "Tăng cường điện cực"
  ],
  "a": 2,
  "w": "Xói làm giảm độ ngàm và hạ tần số riêng, nên cần bảo vệ hoặc kể đến trong thiết kế.",
  "c": "mono",
  "l": 1
 },
 {
  "q": "LAT là viết tắt của?",
  "o": [
   "Largest annual tide",
   "Latest average tide",
   "Local average tide",
   "Lowest astronomical tide"
  ],
  "a": 3,
  "w": "LAT = triều thấp nhất thiên văn, mốc đo độ sâu trên hải đồ.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Trạng thái giới hạn nào kiểm tra cộng dồn hư hỏng do tải lặp?",
  "o": [
   "FLS",
   "ULS",
   "SLS",
   "ALS"
  ],
  "a": 0,
  "w": "FLS (fatigue limit state) dùng đường cong S–N và quy tắc Miner.",
  "c": "moi",
  "l": 1
 },
 {
  "q": "Tiêu chuẩn Việt Nam nào đề cập tải trọng và lực tác dụng lên công trình thủy do sóng?",
  "o": [
   "TCVN 10304:2014",
   "TCVN 8421:2010",
   "TCVN 9362:2012",
   "TCVN 5574:2018"
  ],
  "a": 1,
  "w": "TCVN 8421:2010 là tiêu chuẩn tải trọng sóng và tàu lên công trình thủy lợi, thủy.",
  "c": "vn",
  "l": 1
 },
 {
  "q": "TCVN 10304:2014 là tiêu chuẩn về?",
  "o": [
   "Kết cấu thép",
   "Động đất",
   "Móng cọc",
   "Tải trọng gió"
  ],
  "a": 2,
  "w": "TCVN 10304:2014: Móng cọc – Tiêu chuẩn thiết kế.",
  "c": "vn",
  "l": 1
 },
 {
  "q": "Trường hợp nào móng trọng lực thường được xem xét?",
  "o": [
   "Nước rất sâu hơn 100 m",
   "Nền bùn rất yếu",
   "Chỉ dùng cho tua bin trên bờ",
   "Nước nông, nền đất tốt, tránh đóng cọc"
  ],
  "a": 3,
  "w": "GBS cần nền tốt và nước nông đến vừa, ưu điểm là không đóng cọc.",
  "c": "gbs",
  "l": 1
 },
 {
  "q": "Với móng nổi dạng spar, chỉ số nào phản ánh ổn định ban đầu?",
  "o": [
   "Chiều cao tâm nghiêng GM",
   "Đường kính cọc",
   "Hệ số p-y",
   "Hệ số Morison"
  ],
  "a": 0,
  "w": "GM > 0 là điều kiện ổn định, GM càng lớn thì độ cứng hồi phục C55 càng lớn.",
  "c": "noi",
  "l": 2
 },
 {
  "q": "Khi tính lực lên 4 chân jacket, tải trọng nào gây nhổ chân?",
  "o": [
   "Chỉ trọng lượng bản thân",
   "Mô men lật do gió và sóng",
   "Chỉ lực cắt đáy",
   "Tải thủy triều"
  ],
  "a": 1,
  "w": "Mô men lật làm chân phía đón gió bị giảm nén, thậm chí nhổ khi mô men lớn hơn trọng lượng.",
  "c": "jac",
  "l": 2
 },
 {
  "q": "Hệ số hư hỏng mỏi DFF dùng để làm gì?",
  "o": [
   "Tăng tải trọng cực hạn",
   "Giảm chiều dày ăn mòn",
   "Nhân thêm độ an toàn cho tuổi thọ mỏi",
   "Đổi đơn vị"
  ],
  "a": 2,
  "w": "Hư hỏng Miner phải ≤ 1/DFF. DFF lớn hơn cho chi tiết khó kiểm tra.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "Phần nào của bộ IEC 61400 áp dụng cho tua bin gió biển nổi?",
  "o": [
   "IEC 61400-3-1",
   "IEC 61400-1",
   "IEC 61400-12",
   "IEC TS 61400-3-2"
  ],
  "a": 3,
  "w": "Móng nổi thuộc IEC TS 61400-3-2.",
  "c": "iec",
  "l": 1
 },
 {
  "q": "ULS kiểm tra điều gì?",
  "o": [
   "Phá hoại cực hạn (chảy, mất ổn định)",
   "Mỏi",
   "Độ nghiêng sử dụng",
   "Chỉ ăn mòn"
  ],
  "a": 0,
  "w": "ULS là trạng thái giới hạn cực hạn.",
  "c": "iec",
  "l": 1
 },
 {
  "q": "Hệ số an toàn tải có lợi theo IEC 61400-3-1 là?",
  "o": [
   "1,00",
   "0,90",
   "1,10",
   "1,35"
  ],
  "a": 1,
  "w": "Tải có lợi dùng γf = 0,90.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "DLC 1.6 kết hợp điều kiện nào?",
  "o": [
   "EWM với ESS",
   "Đỗ với sự cố",
   "NTM với SSS",
   "Khởi động với EOG"
  ],
  "a": 2,
  "w": "DLC 1.6: phát điện, NTM kết hợp biển mạnh (SSS).",
  "c": "iec",
  "l": 2
 },
 {
  "q": "Hệ số DFF cho mỏi thường phụ thuộc vào?",
  "o": [
   "Màu sơn",
   "Số cánh quạt",
   "Chiều dài cáp",
   "Khả năng kiểm tra và hậu quả hư hỏng"
  ],
  "a": 3,
  "w": "DFF cao hơn khi khó kiểm tra hoặc hậu quả nặng.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "Gió trong IEC được lấy trung bình trong bao lâu?",
  "o": [
   "10 phút",
   "3 giây",
   "1 phút",
   "24 giờ"
  ],
  "a": 0,
  "w": "Gió trung bình 10 phút tại cao độ trục rotor.",
  "c": "iec",
  "l": 1
 },
 {
  "q": "Số Ursell dùng để làm gì?",
  "o": [
   "Tính ăn mòn",
   "Chọn lý thuyết sóng",
   "Tính mỏi",
   "Tính cáp"
  ],
  "a": 1,
  "w": "Ur = HL²/d³ gợi ý Airy, Stokes hay hàm dòng.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Trong Morison, thành phần cản tỷ lệ với?",
  "o": [
   "du/dt",
   "u⁻¹",
   "u|u|",
   "hằng số"
  ],
  "a": 2,
  "w": "Lực cản tỷ lệ với u|u|, lực quán tính với gia tốc.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Wheeler stretching dùng để?",
  "o": [
   "Giảm khối lượng",
   "Tính mỏi",
   "Tính xói",
   "Kéo dãn động học sóng lên đỉnh sóng"
  ],
  "a": 3,
  "w": "Mở rộng động học Airy tới mặt sóng.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Sinh vật bám làm gì với tải sóng?",
  "o": [
   "Tăng đường kính và độ nhám, tăng tải",
   "Giảm tải",
   "Không ảnh hưởng",
   "Chỉ giảm tần số"
  ],
  "a": 0,
  "w": "Tăng D thủy động, CD và khối lượng.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Gió giật 3 giây khi dùng nhầm làm gió 10 phút gây?",
  "o": [
   "Tải thiên thấp",
   "Tải thiên cao",
   "Không lệch",
   "Chỉ lệch hướng"
  ],
  "a": 1,
  "w": "Giật lớn hơn trung bình nên tải theo V² quá cao.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Lực đẩy rotor tỷ lệ với?",
  "o": [
   "V",
   "V³",
   "V²",
   "V⁰"
  ],
  "a": 2,
  "w": "T = ½ρACtV².",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Monopile có đặc điểm?",
  "o": [
   "Bốn chân",
   "Đế bê tông",
   "Dây neo",
   "Một ống thép lớn"
  ],
  "a": 3,
  "w": "Monopile là một ống thép đóng vào đất.",
  "c": "mono",
  "l": 1
 },
 {
  "q": "API p-y cho cát có hệ số A bằng bao nhiêu cho tải chu kỳ?",
  "o": [
   "0,9",
   "1,5",
   "3,0",
   "0,1"
  ],
  "a": 0,
  "w": "A = 0,9 cho tải chu kỳ.",
  "c": "mono",
  "l": 2
 },
 {
  "q": "Giới hạn xoay đầu cọc ở SLS thường khoảng?",
  "o": [
   "5°",
   "0,25°",
   "10°",
   "1,5°"
  ],
  "a": 1,
  "w": "Thường cỡ vài phần mười độ.",
  "c": "mono",
  "l": 2
 },
 {
  "q": "Xói sâu hơn làm tần số riêng?",
  "o": [
   "Tăng",
   "Không đổi",
   "Giảm",
   "Chỉ giảm 1P"
  ],
  "a": 2,
  "w": "Chiều dài tự do tăng nên độ cứng giảm.",
  "c": "mono",
  "l": 2
 },
 {
  "q": "Với monopile đường kính rất lớn, p-y theo API?",
  "o": [
   "Luôn chính xác",
   "Là bắt buộc",
   "Chỉ dùng cho đá",
   "Có thể kém chính xác"
  ],
  "a": 3,
  "w": "Nên dùng PISA hoặc FEM 3D.",
  "c": "mono",
  "l": 2
 },
 {
  "q": "Mô hình đất trong p-y là?",
  "o": [
   "Các lò xo phi tuyến",
   "Khối cứng",
   "Khí",
   "Không có đất"
  ],
  "a": 0,
  "w": "Nền Winkler phi tuyến.",
  "c": "mono",
  "l": 1
 },
 {
  "q": "Jacket thường có mấy chân?",
  "o": [
   "1",
   "3 hoặc 4",
   "8",
   "12"
  ],
  "a": 1,
  "w": "Phổ biến 3 hoặc 4 chân.",
  "c": "jac",
  "l": 1
 },
 {
  "q": "Tải theo đường chéo trên 4 chân cho ΔN bằng?",
  "o": [
   "M/(2B)",
   "M/B²",
   "M/(√2·B)",
   "M·B"
  ],
  "a": 2,
  "w": "Cánh tay mô men xa hơn nên ΔN lớn hơn.",
  "c": "jac",
  "l": 2
 },
 {
  "q": "Sức kháng nhổ cọc cát phụ thuộc chủ yếu?",
  "o": [
   "Sức chịu mũi",
   "Dòng chảy",
   "Màu sơn",
   "Ma sát bên"
  ],
  "a": 3,
  "w": "Ma sát bên cộng trọng lượng cọc.",
  "c": "jac",
  "l": 2
 },
 {
  "q": "API RP 2A tính sức kháng nén cột theo?",
  "o": [
   "λc và fy",
   "Chỉ chiều dài",
   "Chỉ khối lượng",
   "Hệ số tải"
  ],
  "a": 0,
  "w": "Dùng độ mảnh quy đổi λc và fy.",
  "c": "jac",
  "l": 2
 },
 {
  "q": "Điểm yếu mỏi điển hình của jacket?",
  "o": [
   "Dây cáp",
   "Nút ống",
   "Sơn",
   "Bu lông tháp"
  ],
  "a": 1,
  "w": "Nút ống có SCF lớn.",
  "c": "jac",
  "l": 1
 },
 {
  "q": "Móng trọng lực chủ yếu giữ ổn định bằng?",
  "o": [
   "Dây neo",
   "Cọc dài",
   "Trọng lượng bản thân",
   "Phao"
  ],
  "a": 2,
  "w": "Bằng khối lượng bản thân.",
  "c": "gbs",
  "l": 1
 },
 {
  "q": "Điều kiện lõi cho đế tròn là?",
  "o": [
   "e ≤ D/2",
   "e ≥ D",
   "e = 0 bắt buộc",
   "e ≤ D/8"
  ],
  "a": 3,
  "w": "Lực nằm trong lõi khi e ≤ D/8.",
  "c": "gbs",
  "l": 2
 },
 {
  "q": "Diện tích hữu hiệu A' dùng khi?",
  "o": [
   "Có độ lệch tâm",
   "Chỉ tải thẳng",
   "Chỉ sét",
   "Không bao giờ"
  ],
  "a": 0,
  "w": "Bỏ phần đế không tham gia chịu tải do lệch tâm.",
  "c": "gbs",
  "l": 2
 },
 {
  "q": "Cát: sức kháng trượt thường tính bằng?",
  "o": [
   "V·cosφ",
   "V·tan(2φ/3)",
   "H/V",
   "γ·z"
  ],
  "a": 1,
  "w": "Dùng ma sát đáy giảm.",
  "c": "gbs",
  "l": 2
 },
 {
  "q": "Rủi ro riêng của GBS ở nền yếu?",
  "o": [
   "Cáp",
   "Ăn mòn catốt",
   "Lún dài hạn",
   "Chỉ sóng"
  ],
  "a": 2,
  "w": "Lún và lún lệch.",
  "c": "gbs",
  "l": 1
 },
 {
  "q": "GM âm nghĩa là?",
  "o": [
   "Rất ổn định",
   "Có neo",
   "Không đổi",
   "Mất ổn định ban đầu"
  ],
  "a": 3,
  "w": "GM<0 làm vật nổi bị lật.",
  "c": "noi",
  "l": 1
 },
 {
  "q": "Chu kỳ nhún của trụ tròn xấp xỉ?",
  "o": [
   "2π√(T/g)",
   "2π√(g/T)",
   "π√T",
   "T/g"
  ],
  "a": 0,
  "w": "T là chiều chìm.",
  "c": "noi",
  "l": 2
 },
 {
  "q": "Chu kỳ riêng của móng nổi nên?",
  "o": [
   "Gần dải sóng",
   "Xa dải năng lượng sóng",
   "Bằng 1P",
   "Bằng 0"
  ],
  "a": 1,
  "w": "Tránh cộng hưởng.",
  "c": "noi",
  "l": 2
 },
 {
  "q": "TLP ổn định bằng?",
  "o": [
   "Dằn",
   "Diện tích mặt nước",
   "Lực căng dây",
   "Trọng lực đáy"
  ],
  "a": 2,
  "w": "Dây căng thẳng đứng.",
  "c": "noi",
  "l": 1
 },
 {
  "q": "Độ cứng hồi phục lắc C55 bằng?",
  "o": [
   "ρg·T",
   "GM/g",
   "Chỉ KB",
   "ρg∇·GM"
  ],
  "a": 3,
  "w": "C55 = ρ·g·∇·GM.",
  "c": "noi",
  "l": 2
 },
 {
  "q": "Mỏi dùng đường cong?",
  "o": [
   "S–N",
   "p–y",
   "Q–z",
   "H–T"
  ],
  "a": 0,
  "w": "Biên độ ứng suất và số chu kỳ.",
  "c": "moi",
  "l": 1
 },
 {
  "q": "Miner viết?",
  "o": [
   "D = Σ N/n",
   "D = Σ n/N",
   "D = Σ n·N",
   "D = n"
  ],
  "a": 1,
  "w": "Cộng dồn hư hỏng.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "Bảo vệ catốt dùng cho?",
  "o": [
   "Vùng khí quyển",
   "Trong ống",
   "Vùng ngập",
   "Không ở đâu"
  ],
  "a": 2,
  "w": "Cho vùng ngập nước.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "Chiều dày dự phòng ăn mòn để?",
  "o": [
   "Giảm sóng",
   "Tăng hợp tần",
   "Hạ tần số",
   "Bù thép bị mất"
  ],
  "a": 3,
  "w": "Trừ vào chiều dày khi kiểm tra.",
  "c": "moi",
  "l": 1
 },
 {
  "q": "Tăng chiều dày làm đường cong S–N?",
  "o": [
   "Giảm độ bền do hiệu ứng chiều dày",
   "Tăng độ bền",
   "Không đổi",
   "Chỉ đổi m"
  ],
  "a": 0,
  "w": "Hệ số (t/tref)^k làm tăng ứng suất hiệu dụng.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "TCVN 5574:2018 là tiêu chuẩn về?",
  "o": [
   "Gió",
   "Bê tông cốt thép",
   "Hàn",
   "Đất"
  ],
  "a": 1,
  "w": "Kết cấu bê tông và bê tông cốt thép.",
  "c": "vn",
  "l": 1
 },
 {
  "q": "TCVN 9386:2012 về?",
  "o": [
   "Hàn",
   "Sóng",
   "Động đất",
   "Cáp"
  ],
  "a": 2,
  "w": "Thiết kế công trình chịu động đất.",
  "c": "vn",
  "l": 1
 },
 {
  "q": "TCVN 9362:2012 dùng cho?",
  "o": [
   "Cọc thép",
   "Cáp",
   "Đường ray",
   "Nền nhà và công trình"
  ],
  "a": 3,
  "w": "Thiết kế nền nhà và công trình.",
  "c": "vn",
  "l": 2
 },
 {
  "q": "Tiêu chuẩn tải trọng và tác động hiện hành là?",
  "o": [
   "TCVN 2737:2023",
   "TCVN 6170",
   "TCVN 9393",
   "TCVN 4253"
  ],
  "a": 0,
  "w": "Bản 2023 thay các bản trước.",
  "c": "vn",
  "l": 2
 },
 {
  "q": "Khi ghép IEC và TCVN, nên?",
  "o": [
   "Nhân cả hai hệ số",
   "Dùng một hệ hệ số nhất quán",
   "Bỏ qua IEC",
   "Bỏ qua TCVN"
  ],
  "a": 1,
  "w": "Không nhân hai lần hệ số.",
  "c": "vn",
  "l": 2
 },
 {
  "q": "QCVN 02:2022/BXD là?",
  "o": [
   "Quy chuẩn cáp",
   "Quy chuẩn thép",
   "Số liệu điều kiện tự nhiên",
   "Sơn"
  ],
  "a": 2,
  "w": "Điều kiện tự nhiên dùng trong xây dựng.",
  "c": "vn",
  "l": 1
 }
];

/* Nội dung học: nền tảng, chuyên đề, đối chiếu TCVN */
const THEORY = [
  {
    id: 'tong-quan',
    tag: 'Tổng quan',
    title: 'Hệ thống tiêu chuẩn IEC 61400 và IEC 61400-3-1:2019',
    body: `
<p><b>IEC 61400</b> là hệ thống tiêu chuẩn của Ủy ban Kỹ thuật điện Quốc tế (IEC) cho tua bin gió và hệ thống phát điện gió, cả trên bờ lẫn ngoài khơi, với mọi kích cỡ. Theo bài giảng, hệ thống này được áp dụng thành bộ <b>TCVN 10687</b> (ban hành 2019–2025). Nội dung bao gồm thiết kế kết cấu và quản lý vòng đời, thiết kế các bộ phận của tua bin, giám sát và điều khiển nhà máy, đánh giá rủi ro và an toàn, đo lường và đánh giá hiệu suất điện năng, và đo gió.</p>
<h4>Các tiêu chuẩn liên quan đến kết cấu đỡ</h4>
<ul>
<li><b>IEC 61400-1:</b> yêu cầu thiết kế chung, xác định điều kiện môi trường và tính toàn vẹn kết cấu.</li>
<li><b>IEC 61400-2:</b> tua bin gió nhỏ.</li>
<li><b>IEC 61400-3:</b> tua bin gió ngoài khơi. Phần 3-1 (2019) cho kết cấu cố định, phần 3-2 (TS) cho móng nổi.</li>
<li><b>IEC 61400-6:2020:</b> thiết kế tháp và móng.</li>
<li><b>IEC 61400-8:2024:</b> thiết kế các cấu kiện kết cấu của tua bin.</li>
<li><b>IEC 61400-9:2025:</b> thiết kế tua bin theo phương pháp xác suất.</li>
<li><b>IEC TS 61400-28:2025:</b> quản lý vòng đời và kéo dài tuổi thọ công trình điện gió.</li>
</ul>
<h4>IEC 61400-3-1:2019</h4>
<p>Tên đầy đủ: <b>Wind energy generation systems – Part 3-1: Design requirements for fixed offshore wind turbines</b> (Hệ thống phát điện gió – Phần 3-1: Yêu cầu thiết kế cho tua bin gió biển cố định). Ấn bản 1 ra đời tháng 4/2019, thay cho IEC 61400-3:2009.</p>
<ul>
<li><b>Phạm vi:</b> tua bin đặt trên nền đáy biển (monopile, jacket, trọng lực...). Tập trung vào kết cấu công trình, đề cập thêm cơ chế điều khiển, hệ thống điện nội bộ và cơ khí. Dùng cùng các tiêu chuẩn IEC, ISO khác.</li>
<li><b>Trọng tâm:</b> chủ yếu các kết cấu chân đế cố định bằng thép.</li>
<li><b>Tiêu chuẩn viện dẫn:</b> ISO 19900, 19901-4, 19902, 19903 và các hệ tiêu chuẩn DNV, API.</li>
</ul>
<h4>Cấu trúc nội dung (theo bài giảng)</h4>
<ol class="steps">
<li>Nguyên lý thiết kế.</li>
<li>Định nghĩa và đánh giá các điều kiện môi trường.</li>
<li>Thiết kế kết cấu.</li>
<li>Hệ thống điều khiển.</li>
<li>Cơ điện.</li>
<li>Thiết kế móng và khối đế.</li>
<li>Thi công chế tạo, lắp đặt.</li>
<li>Vận hành và bảo dưỡng.</li>
</ol>
<h4>Phân chia trách nhiệm</h4>
<ul>
<li><b>Nhà chế tạo tua bin:</b> cung cấp mô hình tua bin, điều khiển, giới hạn tải giao diện tại chân tháp.</li>
<li><b>Nhà thiết kế kết cấu đỡ:</b> thiết kế móng và tháp dưới giao diện, phân tích tích hợp với mô hình tua bin.</li>
<li><b>Chủ đầu tư và tổ chức chứng nhận:</b> xác nhận điều kiện địa điểm, thẩm tra thiết kế độc lập.</li>
</ul>
<p class="note">Số hiệu và năm ban hành các phần IEC lấy theo bài giảng. Hãy đối chiếu với bản đang có hiệu lực trước khi trích dẫn.</p>`
  },
  {
    id: 'dieu-kien-ngoai',
    tag: 'Điều kiện ngoài',
    title: 'Gió, sóng, dòng chảy và các tác động khác',
    body: `
<h4>Chu kỳ lặp</h4>
<p><span class="eq">T = 1/P<sub>e</sub></span>, với P<sub>e</sub> là xác suất vượt trong một năm. Chu kỳ lặp 10, 20, 50, 100 năm ứng với xác suất 10%, 5%, 2%, 1% mỗi năm.</p>
<h4>Gió</h4>
<ul>
<li>Phân bố tốc độ gió trung bình 10 phút theo <b>Rayleigh</b>: P(V) = 1 − exp[−π·(V/2V<sub>ave</sub>)²]. Dữ liệu thực thường dùng Weibull.</li>
<li>Profile trung bình: V(z) = V<sub>hub</sub>·(z/z<sub>hub</sub>)<sup>α</sup>. NWP ngoài khơi α = 0,14.</li>
<li>Thành phần mạch động: σ<sub>1</sub> = I<sub>ref</sub>·(0,75·V<sub>hub</sub> + b), b = 5,6 m/s. Phổ Kaimal.</li>
<li>Gió cực hạn: V<sub>e50</sub>(z) = 1,4·V<sub>ref</sub>·(z/z<sub>hub</sub>)<sup>0,11</sup>, V<sub>e1</sub> = 0,8·V<sub>e50</sub>. Có kể mạch động (10 phút): V<sub>50</sub> = V<sub>ref</sub>·(z/z<sub>hub</sub>)<sup>0,11</sup>, V<sub>1</sub> = 0,8·V<sub>50</sub>.</li>
<li>Thời gian đo gió quyết định ý nghĩa của số liệu: gió giật 3 giây khác xa trung bình 10 phút hoặc 1 giờ.</li>
</ul>
<div class="tw"><table>
<tr><th>Hạng</th><th>I</th><th>II</th><th>III</th><th>S</th></tr>
<tr><td>V<sub>ave</sub> (m/s)</td><td>10</td><td>8,5</td><td>7,5</td><td rowspan="3">Nhà thiết kế quy định</td></tr>
<tr><td>V<sub>ref</sub> (m/s)</td><td>50</td><td>42,5</td><td>37,5</td></tr>
<tr><td>V<sub>ref,T</sub> vùng bão (m/s)</td><td>57</td><td>57</td><td>57</td></tr>
</table></div>
<p>Cường độ rối I<sub>ref</sub>: A+ 0,18; A 0,16; B 0,14; C 0,12. Các giá trị áp dụng tại độ cao trục rotor. V<sub>ref</sub> là vận tốc gió tham chiếu trung bình 10 phút, V<sub>50</sub> là vận tốc chu kỳ lặp 50 năm.</p>
<h4>Sóng</h4>
<ul>
<li>Trạng thái biển (sea-state) đặc trưng bởi phổ sóng với H<sub>s</sub>, T<sub>p</sub> và hướng, ghi trong 3 giờ hoặc 6 giờ. Có hai dạng: ngắn hạn và dài hạn.</li>
<li><b>NSS</b> (thường), <b>SSS</b> (mạnh), <b>ESS</b> (cực hạn) và các sóng đơn NWH, SWH, EWH, RWH.</li>
<li>Sóng lý thuyết: Airy, Stokes (kể ảnh hưởng đáy), cnoidal (nước nông), hàm dòng. Dùng đồ thị API tra theo H/(g·T²) và d/(g·T²).</li>
<li>Giới hạn vỡ: H<sub>b</sub> ≈ 0,78·d trong nước nông, độ dốc H/L ≤ 0,14 ở nước sâu.</li>
<li>Thống kê: H<sub>s</sub> = 4σ<sub>η</sub>, H<sub>max</sub> = H<sub>s</sub>·√(0,5·ln N), N = τ/T<sub>m</sub>. Với cơn biển 3 giờ, H<sub>max</sub> ≈ 1,86·H<sub>s</sub> là xấp xỉ thường dùng.</li>
<li>Trụ nhỏ (D/L &lt; 0,2) dùng <b>Morison</b>, trụ lớn dùng nhiễu xạ (MacCamy–Fuchs).</li>
<li>Phổ sóng: <b>JONSWAP</b> (biển đang phát triển) hoặc Pierson–Moskowitz.</li>
</ul>
<h4>Dòng chảy</h4>
<ul>
<li>Do thủy triều và do gió. DnV: v<sub>c</sub>(z) = v<sub>T</sub>·((h − z)/h)<sup>1/7</sup> + v<sub>W</sub>·((h<sub>0</sub> − z)/h<sub>0</sub>), z là độ sâu dưới mặt nước.</li>
<li>Cộng vector với vận tốc hạt nước do sóng trong Morison.</li>
</ul>
<h4>Mực nước</h4>
<p>Mực nước thiết kế = thủy triều thiên văn (LAT đến HAT) + nước dâng do bão và áp suất. Bảng DLC của IEC dùng MSL, NWLR (dải mực nước thường) và EWLR (dải mực nước cực hạn). Cần thống nhất cao độ chuẩn trong toàn hồ sơ.</p>
<h4>Sinh vật bám và ăn mòn</h4>
<ul>
<li>Sinh vật bám làm tăng đường kính, độ nhám (tăng C<sub>D</sub>) và khối lượng. Hà bám dày nhất gần mặt nước.</li>
<li>Ăn mòn: chiều dày thép còn lại thay đổi theo cao độ và hướng.</li>
</ul>
<h4>Địa hình, địa chất và động đất</h4>
<ul>
<li>Khảo sát địa hình đáy biển: ghi nhận các phiến đá lớn, sóng cát, chướng ngại vật.</li>
<li>Địa chất theo ISO 19901-4: phân loại đất, cường độ cắt (kể suy giảm), biến dạng và cố kết, hệ số thấm, độ cứng và cản để dự đoán đặc tính động.</li>
<li>Động đất: dùng phổ gia tốc nền (miền tần số) hoặc biểu đồ gia tốc nền (miền thời gian), xem chuyên đề Động đất.</li>
</ul>
<p>Số liệu minh họa cho một dự án và các công thức chi tiết nằm trong chuyên đề "Thống kê gió, sóng và số liệu môi trường".</p>`
  },
  {
    id: 'dlc',
    tag: 'Tổ hợp tải',
    title: 'Trường hợp tải thiết kế (DLC), hệ số an toàn và trạng thái giới hạn',
    body: `
<p>Mỗi <b>DLC</b> là tổ hợp của một tình huống thiết kế của tua bin với một điều kiện ngoài. Tiêu chuẩn chia 8 nhóm tình huống:</p>
<div class="tw"><table>
<tr><th>Nhóm</th><th>Tình huống</th><th>Ví dụ điển hình</th></tr>
<tr><td>1</td><td>Phát điện</td><td>1.2 (mỏi, NTM + NSS), 1.3 (ETM), 1.6 (NTM + SSS)</td></tr>
<tr><td>2</td><td>Phát điện + sự cố</td><td>Lỗi hệ điều khiển, lỗi lưới</td></tr>
<tr><td>3</td><td>Khởi động</td><td>NWP, EOG, EDC</td></tr>
<tr><td>4</td><td>Dừng bình thường</td><td>Tải tăng tạm thời khi hãm</td></tr>
<tr><td>5</td><td>Dừng khẩn cấp</td><td>Hãm tức thời</td></tr>
<tr><td>6</td><td>Đỗ (parked)</td><td>6.1 (EWM 50 năm + ESS 50 năm), 6.4 (mỏi khi đỗ)</td></tr>
<tr><td>7</td><td>Đỗ + sự cố</td><td>7.1 (EWM 1 năm + ESS 1 năm)</td></tr>
<tr><td>8</td><td>Vận chuyển, lắp dựng, sửa chữa</td><td>Điều kiện thi công do chủ đầu tư quy định</td></tr>
</table></div>
<h4>Hệ số an toàn riêng cho tải (γ<sub>f</sub>)</h4>
<div class="tw"><table>
<tr><th>Loại tải</th><th>Hệ số</th></tr>
<tr><td>Tải thông thường (N), bất lợi</td><td>1,35 (DLC 1.1 để ngoại suy tải: 1,25)</td></tr>
<tr><td>Tải bất thường (A)</td><td>1,10</td></tr>
<tr><td>Vận chuyển, lắp dựng</td><td>1,50</td></tr>
<tr><td>Tải có lợi</td><td>0,90</td></tr>
<tr><td>Mỏi (F)</td><td>1,00, kèm hệ số hư hỏng DFF</td></tr>
</table></div>
<h4>Nguyên lý tính toán</h4>
<ul>
<li>Phương pháp hệ số cường độ tải trọng (<b>LRFD</b>): <span class="eq">S(Σγ<sub>i</sub>·F<sub>i</sub>) ≤ m·R<sub>k</sub>/γ<sub>m</sub></span>. Tải tính toán <span class="eq">F<sub>d</sub> = γ<sub>f</sub>·F<sub>k</sub></span>, tổ hợp <span class="eq">S<sub>d</sub> = q(F<sub>d1</sub>, ..., F<sub>dn</sub>)</span>.</li>
<li><b>WSD</b> dùng ứng suất cho phép cơ bản 0,6·F<sub>y</sub>. Quan hệ gần đúng với LRFD: hệ số tải 1,45 và hệ số vật liệu 1,15 (1/(1,45·1,15) ≈ 0,6).</li>
<li>Hai cách phân tích: <b>Cách 1</b> phân tích động lực học với tải tiêu chuẩn rồi nhân hệ số; <b>Cách 2</b> nhân hệ số lên tải trước rồi phân tích. Cách 2 hợp với phân tích phi tuyến.</li>
<li>Phân tích tựa tĩnh với tải trọng tương đương quy về chân tháp, dùng ma trận tải (F<sub>x</sub>, F<sub>y</sub>, F<sub>z</sub>, M<sub>x</sub>, M<sub>y</sub>, M<sub>z</sub>...) với giá trị lớn nhất và nhỏ nhất.</li>
</ul>
<h4>Các trạng thái giới hạn</h4>
<ul>
<li><b>ULS</b> (cực hạn): chảy dẻo và mất ổn định, phá hoại giòn, mất cân bằng tĩnh (lật, lật úp), phá hoại thành phần, biến thành cơ cấu.</li>
<li><b>FLS</b> (mỏi): hư hỏng cộng dồn do tải lặp.</li>
<li><b>SLS</b> (sử dụng): độ võng, rung động quá mức, biến dạng vượt giới hạn thiết bị, độ bền lâu, lún lệch gây nghiêng tua bin, biến dạng nhiệt.</li>
<li><b>ALS</b> (sự cố): hư hỏng do tải sự cố, sức kháng cực hạn của kết cấu đã hư hỏng, mất toàn vẹn sau hư hỏng cục bộ.</li>
<li><b>PLS</b> (phá hủy lũy tiến): sụp đổ dây chuyền, xét khi hư hỏng cục bộ lan rộng.</li>
</ul>
<p class="note">Bảng DLC chi tiết nằm ở chuyên đề "Bảng DLC chi tiết và tổ hợp tải".</p>`
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
    title: 'Quy trình thiết kế',
    body: `
<h4>Sơ đồ thiết kế theo IEC 61400-3-1</h4>
<ol class="steps">
<li><b>Khởi tạo thiết kế.</b></li>
<li><b>Điều kiện ngoài đặc thù địa điểm</b> (điều 6) và <b>thiết kế RNA</b> (theo IEC 61400-1, hạng tua bin tiêu chuẩn).</li>
<li><b>Cơ sở thiết kế</b> cho tua bin gió biển.</li>
<li>Hai nhánh song song: <b>thiết kế kết cấu đỡ</b> và <b>thiết kế RNA</b>.</li>
<li><b>Tình huống thiết kế và các trường hợp tải</b> (điều 7.4).</li>
<li><b>Tính tải và hiệu ứng tải</b> (điều 7.5).</li>
<li><b>Phân tích trạng thái giới hạn</b> (điều 7.6).</li>
<li><b>Kiểm tra toàn vẹn kết cấu.</b> Nếu không đạt, quay lại điều chỉnh thiết kế. Nếu đạt, hoàn thành thiết kế.</li>
</ol>
<p>Các điều khoản trong dấu ngoặc ghi theo sơ đồ ở bài giảng.</p>
<h4>Thiết kế sơ bộ</h4>
<ol class="steps">
<li><b>Thu thập số liệu địa điểm:</b> độ sâu, thủy triều, H<sub>s</sub> và T<sub>p</sub> theo chu kỳ lặp, gió cực hạn, dòng chảy, địa chất (khoan, CPT).</li>
<li><b>Chọn loại móng</b> theo độ sâu, đất nền, năng lực chế tạo và thi công.</li>
<li><b>Ước tính tải sơ bộ:</b> lực đẩy gió, tải sóng (Morison), mô men tại đáy cho các DLC chính.</li>
<li><b>Chọn kích thước ban đầu:</b> đường kính, chiều dày, chiều sâu ngàm.</li>
<li><b>Kiểm tra tần số riêng</b> thứ nhất và thứ hai so với dải 1P và 3P. Đây thường là điều kiện quyết định kích thước.</li>
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
<p>Báo cáo cơ sở thiết kế (design basis), bảng DLC, kích thước sơ bộ, tần số riêng, khối lượng thép và danh mục rủi ro. Các mô-đun trong ứng dụng mô phỏng đúng thứ tự công việc đó ở mức đơn giản.</p>
<p class="note">Các máy tính trong ứng dụng chỉ phục vụ bậc độ lớn và kiểm tra nhanh. Chúng không thay thế phân tích tải tích hợp.</p>`
  },
  {
    id: 'dia-ky-thuat',
    tag: 'Nền móng',
    title: 'Địa kỹ thuật, tương tác đất–kết cấu, xói lở và ăn mòn',
    body: `
<h4>Ba mức mô hình hóa nền</h4>
<ul>
<li><b>Mô hình ngàm giả định:</b> cọc ngàm cứng ở độ sâu Δ dưới đáy biển. Δ = 3,5–4,5 D (sét), 7,0–8,5 D (đất mềm, cát rời), 6,0 D khi không có số liệu, D là đường kính ngoài của ống cọc.</li>
<li><b>Mô hình lò xo tuyến tính tại đầu cọc:</b> dùng trong phân tích động lực học.</li>
<li><b>Tương tác cọc–nền (PSI):</b> các lớp đất biểu diễn bằng đường cong lực–chuyển vị theo các phương: <b>p-y</b> (ngang), <b>t-z</b> (ma sát dọc), <b>Q-z</b> (sức chịu mũi).</li>
</ul>
<h4>Cọc chịu tải ngang</h4>
<ul>
<li>Cọc nhỏ và vừa: đường cong <b>p-y</b> theo API (cát, sét mềm, sét cứng).</li>
<li>Monopile đường kính lớn, L/D thấp: ứng xử cứng, dùng phương pháp <b>PISA</b> hoặc phần tử hữu hạn 3D.</li>
<li>Tải chu kỳ làm giảm độ cứng và tích lũy biến dạng, phải xét trong SLS.</li>
</ul>
<h4>Cọc chịu tải dọc trục và kéo nhổ</h4>
<ul>
<li>Sức kháng nhổ gồm ma sát bên (cát: β·σ'<sub>v</sub>; sét: α·s<sub>u</sub>) cộng trọng lượng cọc. Mũi cọc không tham gia.</li>
<li>Đường cong Q-z (API): Q/Q<sub>p</sub> = 0,25; 0,50; 0,75; 0,90; 1,00 ứng với z/D = 0,002; 0,013; 0,042; 0,073; 0,100.</li>
<li>Thử tải tĩnh và động hiện trường để hiệu chỉnh.</li>
</ul>
<h4>Xói lở</h4>
<ul>
<li>Với dòng chảy ổn định quanh trụ, độ sâu xói cân bằng thường ước tính cỡ <b>S ≈ 1,3 D</b>.</li>
<li>Biện pháp: đá hộc bảo vệ nhiều lớp, thảm bê tông, hoặc tính xói vào thiết kế (cọc dài hơn).</li>
<li>Xói làm giảm độ cứng ngàm và hạ tần số riêng.</li>
</ul>
<h4>Ăn mòn và chống ăn mòn</h4>
<div class="tw"><table>
<tr><th>Vùng</th><th>Biện pháp thường dùng</th></tr>
<tr><td>Khí quyển</td><td>Hệ sơn phủ nhiều lớp</td></tr>
<tr><td>Văng bắn (splash)</td><td>Sơn dày hoặc bọc, tăng chiều dày dự phòng. Đây là vùng ăn mòn nhanh nhất</td></tr>
<tr><td>Ngập nước</td><td>Bảo vệ catốt kết hợp sơn</td></tr>
<tr><td>Chôn trong đất</td><td>Chiều dày dự phòng ăn mòn</td></tr>
</table></div>
<ul>
<li><b>Chống ăn mòn bị động:</b> cách ly kim loại với môi trường bằng lớp phủ. Yêu cầu bám dính tốt, chịu được tác động hóa học và vật lý, chống lão hóa. Vật liệu thường gặp: glass flake epoxy, fusion bonded epoxy, asphalt enamel, cao su polychloroprene, composite FRP.</li>
<li><b>Chống ăn mòn chủ động:</b> bảo vệ catốt bằng <b>anốt hy sinh</b> (nhôm, kẽm, có tính chất mạnh hơn thép) hoặc bằng <b>dòng điện cưỡng bức</b> (nguồn một chiều hoặc ắc quy tạo dòng ngược chiều).</li>
</ul>
<h4>Điều kiện hay gặp ở Việt Nam</h4>
<ul>
<li>Bão và áp thấp nhiệt đới: gió và sóng cực hạn ngắn hạn, nước dâng bão. Vùng bão nhiệt đới nên xem xét V<sub>ref,T</sub> = 57 m/s.</li>
<li>Thủy triều khác nhau nhiều giữa các vùng ven biển.</li>
<li>Đất yếu (bùn, sét, cát chảy) ở đồng bằng sông Cửu Long, cần khảo sát địa chất kỹ cho cọc và nền.</li>
</ul>`
  },
  {
    id: 'thi-cong',
    tag: 'Thi công',
    title: 'Chế tạo, vận chuyển và lắp đặt',
    body: `
<h4>Chế tạo</h4>
<ul>
<li><b>Tháp:</b> thép tấm thô, cắt CNC và vát mép, cuốn tấm thành đoạn ống, hàn tự động (SAW) lắp ghép, lắp ráp nội thất, làm sạch bề mặt và sơn.</li>
<li><b>Jacket và monopile:</b> chế tạo tại bãi, các nút ống và chân cọc, ống lớn cuốn và hàn dọc, chu vi.</li>
</ul>
<h4>Hạ thủy và vận chuyển trên biển</h4>
<ul>
<li>Kết cấu được đưa xuống tàu hoặc sà lan tại bến chế tạo (load-out) và chằng buộc.</li>
<li>Vận chuyển bằng sà lan, tàu chuyên chở cánh quạt và tháp, hoặc kéo nổi đối với móng nổi.</li>
</ul>
<h4>Lắp đặt trên biển (monopile)</h4>
<ol class="steps">
<li>Khảo sát đáy biển bằng tàu khảo sát.</li>
<li>Tàu lắp đặt dạng chân chống (jack-up) vào vị trí.</li>
<li>Búa thủy lực đóng monopile xuống đáy biển. Bảo vệ chống xói bằng đá hộc.</li>
<li>Lắp cấu kiện chuyển tiếp (TP) và điều chỉnh cao độ.</li>
<li>Cẩu các đoạn tháp.</li>
<li>Cẩu nacelle (vỏ máy).</li>
<li>Lắp ba cánh quạt.</li>
<li>Rải cáp ngầm nội mạng nối các tua bin với trạm biến áp ngoài khơi rồi cáp xuất ra bờ.</li>
</ol>
<p class="note">Với jacket thì lắp giàn rồi đóng hoặc khoan cọc qua chân. Cửa sổ thời tiết và năng lực tàu cẩu thường quyết định cách thi công.</p>`
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
<div class="ex"><b>Ví dụ (dữ liệu dự án của bài giảng).</b> d = 25 m, H<sub>s</sub> = 6,26 m, H<sub>max</sub> = 1,647·H<sub>s</sub> = 10,31 m, T = 9,44 s, trụ D = 8,1 m (8 m + 50 mm sinh vật bám mỗi phía), C<sub>D</sub> = 1,05, C<sub>M</sub> = 1,2.
<ul>
<li>Bước sóng L = 120,2 m, c = 12,73 m/s, k·d = 1,31: vùng nước trung gian.</li>
<li>Số Ursell U<sub>r</sub> = H·L²/d³ = 9,5, H/d = 0,41: Airy đã kém chính xác, nên dùng hàm dòng bậc cao.</li>
<li>Không có dòng chảy: F ≈ 2 884 kN, M ≈ 44 788 kN·m, cánh tay M/F ≈ 15,5 m.</li>
<li>Có dòng chảy (xem dưới): F ≈ 3 232 kN, M ≈ 52 544 kN·m, tăng khoảng 12%.</li>
</ul></div>
<p class="note">C<sub>M</sub> = 1,2 hợp với trụ nhám (C<sub>D</sub> = 1,05) theo API và bài giảng. Dùng C<sub>M</sub> = 1,8 cùng C<sub>D</sub> = 1,05 sẽ cho lực quán tính quá lớn. Ví dụ nhỏ của bài giảng ở chuyên đề "Ví dụ bài giảng Chương 4" dùng C<sub>M</sub> = 2,0 cho trụ trơn D = 8 m, nên C<sub>M</sub> phụ thuộc độ nhám, Re và KC. Phải ghi rõ giá trị chọn.</p>
<h4>Thống kê sóng ngắn hạn</h4>
<ul>
<li>Biên độ sóng trong một cơn biển theo phân bố Rayleigh. H<sub>s</sub> = 4σ<sub>η</sub>, T<sub>z</sub> ≈ T<sub>p</sub>/1,28, số sóng N = (thời gian cơn biển)/T<sub>z</sub>.</li>
<li><span class="eq">H<sub>max</sub> = H<sub>s</sub>·√(0,5·ln N)</span>. Với H<sub>s</sub> = 6,26 m, T<sub>p</sub> = 11,03 s, cơn biển 3 giờ: N ≈ 1 253, H<sub>max</sub> ≈ 11,8 m (1,89·H<sub>s</sub>). Giá trị dùng trong ví dụ là 10,31 m từ hệ số 1,647 của bài giảng.</li>
<li>Chiều cao trung bình ≈ 0,627·H<sub>s</sub>.</li>
</ul>
<h4>Dòng chảy cộng với sóng</h4>
<p>Dòng chảy theo DnV gồm thủy triều và gió, cộng vector với vận tốc hạt nước trong thành phần cản:</p>
<p><span class="eq">v<sub>c</sub>(z) = v<sub>T</sub>·((d − h)/d)<sup>1/7</sup> + v<sub>W</sub>·max(0, (h<sub>0</sub> − h)/h<sub>0</sub>)</span>, h là độ sâu dưới mặt nước</p>
<p>Ví dụ giả định v<sub>T</sub> = 0,6 m/s, v<sub>W</sub> = 0,4 m/s, h<sub>0</sub> = 50 m: dòng ở mặt 1,00 m/s, ở nửa độ sâu 0,84 m/s, gần đáy 0,65 m/s. Số liệu dòng chảy thật phải lấy từ khảo sát hải văn.</p>
<h4>Giới hạn sóng vỡ và tải xung kích</h4>
<ul>
<li>Giới hạn đơn giản H<sub>b</sub> ≈ 0,78·d = 19,5 m. Công thức Goda xét độ dốc đáy và chu kỳ cho kết quả thấp hơn: 13,8 m với độ dốc đáy 1%. H = 10,31 m bằng 0,75 giới hạn, sóng chưa vỡ. Hệ số trong Goda lấy theo tài liệu, bài giảng ghi 11, cần đối chiếu bản gốc.</li>
<li>Nếu sóng vỡ, thêm lực xung kích: <span class="eq">F<sub>s</sub> = ½·C<sub>s</sub>·ρ·D·c²·λ·η<sub>b</sub></span> với C<sub>s</sub> = 5, λ ≈ 0,46 và η<sub>b</sub> = 0,7·H<sub>b</sub> là các giá trị giả định của ứng dụng. Ở giới hạn vỡ, lực này có thể gấp nhiều lần Morison (ví dụ khoảng 6,5 lần), nên cần chú ý.</li>
</ul>
<h4>Khi nào Morison không đủ</h4>
<ul>
<li>D/L &gt; 0,2: nhiễu xạ quan trọng, dùng MacCamy–Fuchs.</li>
<li>Sóng vỡ: thêm tải xung kích (xem trên) hoặc dùng mô hình chuyên biệt như Wienke–Oumeraci.</li>
<li>Rung do xoáy (VIV): với dòng chảy mạnh và trụ mảnh, xem chuyên đề Tần số riêng.</li>
<li>Sóng rất phi tuyến (U<sub>r</sub> lớn): dùng Stokes bậc 5 hoặc hàm dòng.</li>
</ul>`
  },
  {
    id: 'song-nc',
    tag: 'Chuyên đề 2',
    title: 'Sóng: chọn lý thuyết, sóng ngẫu nhiên, thanh xiên và dòng chảy',
    body: `
<h4>Phân loại theo độ sâu tương đối</h4>
<div class="tw"><table>
<tr><th>Vùng</th><th>h/L</th></tr>
<tr><td>Nước sâu</td><td>&gt; 0,5</td></tr>
<tr><td>Nước trung gian</td><td>0,05 đến 0,5</td></tr>
<tr><td>Nước nông</td><td>&lt; 0,05</td></tr>
</table></div>
<p>Sóng vào bờ: độ sâu lớn hơn nửa bước sóng thì sóng không cảm nhận đáy. Khi vào nước nông, vận tốc truyền giảm, chiều cao tăng, rồi sóng vỡ.</p>
<h4>Các lý thuyết sóng</h4>
<ul>
<li><b>Airy (tuyến tính):</b> η = (H/2)·cos(kx − ωt), vận tốc ngang <span class="eq">u = (H/2)·ω·cosh k(z+d)/sinh kd·cos θ</span>, tán sắc <span class="eq">ω² = g·k·tanh kd</span>.</li>
<li><b>Stokes bậc 2</b> thêm thành phần bậc hai: <span class="eq">u = aω·cosh k(z+d)/sinh kd·cos θ + ¾·a²ωk·cosh 2k(z+d)/sinh⁴kd·cos 2θ</span>. Đỉnh sóng nhọn hơn, bụng sóng phẳng hơn Airy. <b>Stokes bậc 5</b> dùng chuỗi năm thành phần với hệ số A<sub>n</sub>, B<sub>n</sub> xác định theo H, T, d.</li>
<li><b>Cnoidal</b> cho nước nông, <b>sóng đơn (solitary)</b> cho sóng đơn rất nông, <b>hàm dòng (stream function)</b> cho phi tuyến cao.</li>
</ul>
<p>Cách chọn theo quy phạm API: vẽ điểm (d/gT², H/gT²) lên biểu đồ. Có các đường giới hạn vỡ: nước sâu H/L ≈ 0,14, nước nông H/d ≈ 0,78. Vùng nước sâu dùng Airy hoặc hàm dòng, vùng trung gian dùng Stokes bậc 5 hoặc hàm dòng, vùng nước nông dùng hàm dòng.</p>
<h4>Sóng ngẫu nhiên (sóng thực)</h4>
<ul>
<li>Mặt biển là tổ hợp nhiều sóng điều hòa: <span class="eq">η(t) = Σ a<sub>i</sub>·cos(ω<sub>i</sub>t + φ<sub>i</sub>)</span>, pha φ<sub>i</sub> ngẫu nhiên phân bố đều trong [0, 2π].</li>
<li>Thông số thống kê từ phổ: mô men phổ <span class="eq">m<sub>n</sub> = ∫ f<sup>n</sup>·S(f)·df</span>, <span class="eq">H<sub>m0</sub> = 4·√m₀</span>, <span class="eq">T<sub>z</sub> = √(m₀/m₂)</span>, <span class="eq">T<sub>p</sub> = 1/f<sub>p</sub></span>.</li>
<li>Phân bố chiều cao sóng Rayleigh: <span class="eq">P(H &gt; H<sub>i</sub>) = exp[−2·(H<sub>i</sub>/H<sub>s</sub>)²]</span>.</li>
<li>Phổ <b>Pierson–Moskowitz</b> cho biển phát triển đầy đủ. Phổ <b>JONSWAP</b> cho biển còn phát triển theo đà gió, thêm hệ số tăng đỉnh γ (thường 3,3).</li>
</ul>
<h4>Kích thước vật cản D/L</h4>
<ul>
<li>D/L &gt; 1: vật cản rất lớn, sóng bị dội lại gần hết (công trình chắn sóng).</li>
<li>0,2 ≤ D/L ≤ 1: sóng nhiễu xạ, dùng lý thuyết nhiễu xạ (MacCamy–Fuchs).</li>
<li>D/L &lt; 0,2: dùng Morison.</li>
</ul>
<h4>Morison và các hệ số</h4>
<p><span class="eq">q(t) = q<sub>d</sub> + q<sub>I</sub></span>, <span class="eq">q<sub>d</sub> = ½·ρ·C<sub>d</sub>·D·|v|·v</span>, <span class="eq">q<sub>I</sub> = ρ·A·a + C<sub>m</sub>·ρ·A·a = C<sub>I</sub>·ρ·A·a</span>. Thành phần quán tính gồm hai phần: khối lượng nước bị chiếm chỗ (ρ·A·a) và khối lượng nước kèm (C<sub>m</sub>·ρ·A·a). Hệ số quán tính <span class="eq">C<sub>I</sub> = 1 + C<sub>m</sub></span>. Trong các ví dụ khác, ký hiệu C<sub>M</sub> thường chỉ chính C<sub>I</sub> này.</p>
<p>C<sub>D</sub>, C<sub>m</sub>, C<sub>I</sub> phụ thuộc hình dạng, độ nhám bề mặt, số Reynolds Re và số Keulegan–Carpenter KC.</p>
<h4>Cách tính thực hành</h4>
<ul>
<li>Lực trên đoạn a<sub>i</sub> đến b<sub>i</sub>: <span class="eq">F<sub>i</sub>(t) = ∫ q(z, t)·dz</span>, mô men <span class="eq">M<sub>i</sub>(t) = ∫ z·q(z, t)·dz</span>, vị trí hợp lực <span class="eq">d<sub>i</sub> = M<sub>i</sub>/F<sub>i</sub></span>.</li>
<li>Thời điểm F lớn nhất và M lớn nhất thường khác nhau (dF/dt = 0 và dM/dt = 0). Thực tế rời rạc hóa chu kỳ sóng thành khoảng 20 thời điểm rồi lấy cực đại.</li>
<li>Công thức đóng với Airy có F<sub>D</sub> ∝ cos θ|cos θ| và F<sub>I</sub> ∝ sin θ, nên cản cực đại ở đỉnh sóng, quán tính cực đại ở θ = ±90°.</li>
</ul>
<h4>Trụ chuyển vị và thanh xiên</h4>
<ul>
<li><b>Morison mở rộng</b> cho trụ dao động: dùng vận tốc tương đối (v − U̇) trong lực cản. Khối lượng nước kèm tác dụng lên gia tốc của chính kết cấu.</li>
<li><b>Thanh xiên:</b> phân tích vận tốc và gia tốc của nước theo các cosin chỉ phương c<sub>x</sub>, c<sub>y</sub>, c<sub>z</sub> của trục thanh, chỉ thành phần vuông góc trục (pháp tuyến) tạo tải: <span class="eq">v<sub>n</sub> = v − c·(c·v)</span>, <span class="eq">q = ½ρC<sub>d</sub>D|v<sub>n</sub>|v<sub>n</sub> + ρC<sub>I</sub>A·a<sub>n</sub></span>. Dùng cho giằng của jacket.</li>
</ul>
<h4>Dòng chảy</h4>
<ul>
<li>Dòng chảy tổng: <span class="eq">V<sub>dc</sub>(z) = V<sub>triều</sub>(z) + V<sub>gió</sub>(z)</span>. Dòng triều theo lũy thừa 1/7 theo độ sâu, dòng do gió giảm tuyến tính trong độ sâu d₀ (xem chuyên đề Sóng).</li>
<li>Cộng vận tốc nước: <span class="eq">v(z, t) = v<sub>sóng</sub> + v<sub>dc</sub></span>, rồi đưa vào thành phần cản (thành phần quán tính chỉ do sóng).</li>
<li><b>Ảnh hưởng của dòng chảy lên sóng:</b> dòng cùng chiều làm bước sóng dãn ra, dòng ngược chiều nén sóng lại. Dùng chu kỳ biểu kiến T<sub>app</sub> khi tính sóng trong dòng chảy.</li>
</ul>
<h4>Phương pháp phổ (quan điểm ngẫu nhiên)</h4>
<p>Tuyến tính hóa số hạng cản theo độ lệch chuẩn vận tốc: <span class="eq">|v|·v ≈ √(8/π)·σ<sub>v</sub>·v</span>. Khi đó lực là hàm tuyến tính của vận tốc và gia tốc, phổ lực: <span class="eq">S<sub>qq</sub>(ω) = C′<sub>D</sub>²·S<sub>vv</sub>(ω) + (C<sub>I</sub>·ρ·A)²·ω²·S<sub>vv</sub>(ω)</span>, với S<sub>vv</sub> suy từ phổ sóng qua hàm truyền cosh k(z+d)/sinh kd. Dùng cho phân tích mỏi và đáp ứng ngẫu nhiên.</p>
<p class="note">Ví dụ số có tính tay và so sánh slide ở chuyên đề "Ví dụ bài giảng Chương 4".</p>`
  },
  {
    id: 'gio',
    tag: 'Chuyên đề 3',
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
<li>Mô men đáy do rotor = 1 863 × (110 + 25) = 251 458 kN·m; cộng tháp, tổng M ≈ 253 313 kN·m.</li>
<li>Gió lên tháp: F ≈ 21 kN, M ≈ 1 856 kN·m. Tháp đóng góp rất nhỏ khi vận hành.</li>
</ul>
Trong bão (V<sub>ref</sub> = 53,62 m/s, rotor đỗ, C<sub>t</sub> = 0,04, α = 0,11): T ≈ 2 213 kN, tháp tăng lên 514 kN và 45 920 kN·m do tải tỷ lệ V². Mô men gió tổng khoảng 344 667 kN·m.</div>
<h4>Gió cực hạn theo IEC 61400-1</h4>
<p>IEC xác định hai trạng thái gió bão đỗ (EWM):</p>
<ul>
<li><b>Mô hình ổn định:</b> <span class="eq">V<sub>e50</sub>(z) = 1,4·V<sub>ref</sub>·(z/z<sub>hub</sub>)<sup>0,11</sup></span>, <span class="eq">V<sub>e1</sub> = 0,8·V<sub>e50</sub></span>. Giá trị này là giật 3 giây.</li>
<li><b>Mô hình có mạch động:</b> V<sub>50</sub>(z) = V<sub>ref</sub>·(z/z<sub>hub</sub>)<sup>0,11</sup>, V<sub>1</sub> = 0,8·V<sub>50</sub> (trung bình 10 phút), cộng cường độ rối.</li>
</ul>
<p>Như vậy IEC lấy <b>hệ số giật 3 giây / 10 phút = 1,4</b> tại độ cao trục rotor.</p>
<h4>Quy đổi số liệu giật 3 giây của trạm</h4>
<p>Số liệu bão ở Việt Nam hay là giật 3 giây. Đưa về trung bình 10 phút theo IEC:</p>
<p><span class="eq">V<sub>10 phút</sub>(z₂) = [V<sub>3 s</sub>(z₁)/1,4]·(z₂/z₁)<sup>α</sup></span>, α = 0,11 (EWM)</p>
<p>ISO 19901-1 cho hệ số giật khác (phụ thuộc độ cao và cường độ rối):</p>
<p><span class="eq">U(z) = U₀·[1 + C·ln(z/10)]</span>, <span class="eq">C = 0,0573·√(1 + 0,15·U₀)</span>, <span class="eq">I<sub>u</sub>(z) = 0,06·(1 + 0,043·U₀)·(z/10)<sup>−0,22</sup></span>, <span class="eq">u(z,t) = U(z)·[1 − 0,41·I<sub>u</sub>·ln(t/3600)]</span></p>
<div class="ex"><b>Ví dụ (dự án của bài giảng).</b> Giật 3 giây 75,05 m/s tại 110 m.
<ul>
<li>Theo IEC (÷ 1,4): trung bình 10 phút tại 110 m = <b>53,6 m/s</b>. Đây là V<sub>ref</sub> dùng làm mặc định.</li>
<li>Theo ISO 19901-1: 62,4 m/s.</li>
<li>Chênh lệch 16%, nên tải gió theo V² chênh khoảng 35%.</li>
</ul>
IEC dùng cho tải tua bin (nhất quán với mô phỏng khí động đàn hồi), ISO dùng làm đối chiếu. Phải ghi rõ quy ước trong cơ sở thiết kế.</div>
<h4>Hạng tua bin và cường độ rối</h4>
<p>V<sub>ref</sub> = 53,6 m/s vượt hạng I (50 m/s), nên không nằm trong ba hạng tiêu chuẩn mà gần hạng T (vùng bão nhiệt đới, V<sub>ref,T</sub> = 57 m/s) hoặc hạng S do nhà thiết kế quy định. Cường độ rối I<sub>ref</sub> = 0,14 (hạng B). Mô-đun "Gió IEC" trong ứng dụng tính V<sub>e50</sub>, V<sub>e1</sub> theo độ cao, σ₁, phổ Kaimal và xác suất Weibull, Rayleigh.</p>
<p class="note">Mô-đun "Quy đổi gió" trong tab Tính toán thực hiện chính xác các phép này.</p>`
  },
  {
    id: 'tuabin',
    tag: 'Chuyên đề 4',
    title: 'Lý thuyết tải gió lên tuabin: động lượng, Betz, BEM, tải 1P và 3P',
    body: `
<h4>Chế độ hoạt động</h4>
<ul>
<li><b>V<sub>cut-in</sub></b>: tốc độ bắt đầu phát điện. <b>V<sub>rat</sub></b>: tốc độ định mức, sau đó cơ cấu xoay cánh (pitch) và phanh giữ công suất ổn định. <b>V<sub>cut-out</sub></b>: tốc độ ngừng máy. <b>V<sub>ref</sub></b>: tốc độ gió bão cực hạn 50 năm khi công trình chịu bão.</li>
<li>Cơ cấu điều khiển: <b>tilting</b> (nghiêng trục), <b>yawing</b> (xoay nacelle theo hướng gió), <b>pitching</b> (xoay góc cánh).</li>
<li>Bảy chế độ làm việc để đưa vào DLC: vận hành, vận hành + sự cố, khởi động, dừng thông thường, dừng đột ngột, đỗ khi bão, đỗ khi bão + sự cố.</li>
</ul>
<h4>Vận tốc gió</h4>
<p>Vận tốc gió thay đổi theo độ cao và theo thời gian: <span class="eq">V(M, t) = V̄(M) + v(M, t)</span>, gồm thành phần trung bình và thành phần mạch động. Giá trị trung bình lấy theo nhiều thời gian (3 giây, 1 phút, 10 phút, 1 giờ), tuabin gió dùng <b>10 phút</b>. Số liệu khảo sát thường cho gió trung bình 1 giờ tại 10 m, cần quy đổi như chuyên đề Gió. Phân bố xác suất của gió trung bình 10 phút theo Rayleigh, phổ nhiễu loạn theo Kaimal, có hai mô hình nhiễu loạn NTM và ETM.</p>
<h4>Lý thuyết động lượng (actuator disk)</h4>
<p>Coi rotor là một đĩa hút năng lượng. Hệ số cảm ứng dọc trục <span class="eq">a = (V₀ − V<sub>d</sub>)/V₀</span>. Vận tốc qua đĩa <span class="eq">V<sub>d</sub> = V₀·(1 − a)</span>, vận tốc xa phía sau (wake) <span class="eq">V<sub>w</sub> = V₀·(1 − 2a)</span>.</p>
<ul>
<li>Lực đẩy bằng độ biến thiên động lượng: <span class="eq">T = ṁ·(V₀ − V<sub>w</sub>) = 2·ρ·A·V₀²·a·(1 − a)</span>, hệ số lực đẩy <span class="eq">C<sub>T</sub> = T/(½·ρ·A·V₀²) = 4a(1 − a)</span>.</li>
<li>Công suất: <span class="eq">P = T·V<sub>d</sub> = 2ρAV₀³·a(1 − a)²</span>, <span class="eq">C<sub>P</sub> = 4a(1 − a)²</span>.</li>
<li><b>Giới hạn Betz:</b> cực đại C<sub>P</sub> tại a = 1/3, bằng 16/27 ≈ 0,593. Khi đó V<sub>d</sub> = 2/3 V₀, V<sub>w</sub> = 1/3 V₀, và C<sub>T</sub> = 8/9 ≈ 0,89. Không thể lấy 100% năng lượng vì dòng khí vẫn phải đi qua rotor.</li>
<li>Ví dụ: a = 0,20 cho V<sub>d</sub> = 0,80 V₀ và V<sub>w</sub> = 0,60 V₀. a quá lớn thì wake phức tạp, lý thuyết động lượng cơ bản không còn phù hợp.</li>
</ul>
<h4>Tính sơ bộ tải gió</h4>
<p>Với tuabin trong dải vận hành, dùng <span class="eq">T = ½·ρ<sub>a</sub>·A<sub>R</sub>·C<sub>T</sub>·V<sub>hub</sub>²</span>, C<sub>T</sub> ≈ 0,7 đến 0,9 (xem chuyên đề Gió). Lực lên nacelle và tháp tính theo cản khí động.</p>
<h4>Lý thuyết phần tử cánh (Blade Element Theory)</h4>
<p>Chia cánh thành các phần tử dài dr, mỗi phần tử coi như một mặt cắt cánh 2D độc lập có chord c(r), góc xoắn θ(r) và đường cong khí động C<sub>L</sub>(α), C<sub>D</sub>(α). Lực nâng và lực cản: <span class="eq">dL = ½ρV<sub>rel</sub>²·c·C<sub>L</sub>·dr</span>, <span class="eq">dD = ½ρV<sub>rel</sub>²·c·C<sub>D</sub>·dr</span>.</p>
<ul>
<li>Chuyển sang lực pháp tuyến và tiếp tuyến: <span class="eq">C<sub>n</sub> = C<sub>L</sub>cosφ + C<sub>D</sub>sinφ</span>, <span class="eq">C<sub>t</sub> = C<sub>L</sub>sinφ − C<sub>D</sub>cosφ</span>. Lực pháp tuyến tạo lực đẩy, lực tiếp tuyến tạo mô men xoắn.</li>
<li>Cho B cánh: <span class="eq">dT = ½ρV<sub>rel</sub>²·B·c·C<sub>n</sub>·dr</span>, <span class="eq">dQ = ½ρV<sub>rel</sub>²·B·c·C<sub>t</sub>·r·dr</span>, <span class="eq">dP = Ω·dQ</span>. Tích phân theo bán kính cho tải toàn rotor.</li>
</ul>
<h4>Ghép hai lý thuyết: BEM</h4>
<p>Cho mỗi phần tử cánh trao đổi động lượng với một ống dòng hình vành khăn (dA = 2πr·dr): <span class="eq">dT<sub>động lượng</sub> = dT<sub>cánh</sub></span>, <span class="eq">dQ<sub>động lượng</sub> = dQ<sub>cánh</sub></span>. Đặt độ đặc σ = B·c/(2πr), hệ số tổn thất đầu cánh F (Prandtl):</p>
<p><span class="eq">a = 1/[1 + 4F·sin²φ/(σ·C<sub>n</sub>)]</span>, <span class="eq">a′ = 1/[4F·sinφ·cosφ/(σ·C<sub>t</sub>) − 1]</span></p>
<p>BEM phải giải <b>lặp</b> vì a, a′ → φ → α → C<sub>L</sub>, C<sub>D</sub> → C<sub>n</sub>, C<sub>t</sub> → a, a′ mới. Quy trình: khởi tạo a, a′; tính V<sub>a</sub>, V<sub>t</sub>, W, φ; tính α = φ − (θ + θ<sub>p</sub>); tra polar; tính C<sub>n</sub>, C<sub>t</sub>, F; cập nhật a, a′; kiểm tra hội tụ |a<sub>mới</sub> − a| &lt; ε; rồi tính dT, dQ, dP.</p>
<h4>Vì sao cần mô phỏng tích hợp</h4>
<ul>
<li>Gió thay đổi theo không gian và thời gian (trung bình và nhiễu loạn).</li>
<li>Cánh biến dạng lớn (chuyển vị, xoắn) làm hệ số cảm ứng, lực cản, lực nâng thay đổi.</li>
<li>Thân tháp biến dạng; cơ chế điều khiển tilt, yaw, pitch; thành phần 1P và 3P.</li>
</ul>
<h4>Tải 1P và 3P khi vận hành</h4>
<ul>
<li><b>Tải 1P</b> (một lần mỗi vòng): do lực quán tính, do mất cân bằng khối lượng khi quay và mất cân bằng lực khí động.</li>
<li><b>Tải 3P</b> (ba lần mỗi vòng): do hiệu ứng che chắn khi một cánh trùng vị trí thân trụ, làm giảm đột ngột tải gió lên trụ.</li>
</ul>
<p class="note">Ứng dụng dùng công thức động lượng với C<sub>T</sub> cho trước, không chạy BEM. Giá trị C<sub>T</sub>(V) thật đến từ nhà chế tạo hoặc mô phỏng khí động đàn hồi.</p>`
  },
  {
    id: 'moi-truong',
    tag: 'Chuyên đề 5',
    title: 'Thống kê gió, sóng và số liệu môi trường',
    body: `
<h4>Chu kỳ lặp và xác suất trong tuổi thọ</h4>
<p><span class="eq">P<sub>e</sub> = 1/T</span> là xác suất vượt trong một năm. Trong tuổi thọ n năm: <span class="eq">P = 1 − (1 − 1/T)<sup>n</sup></span>.</p>
<div class="ex"><b>Ví dụ.</b> Sự kiện 50 năm, tuổi thọ 25 năm: P = 1 − (0,98)<sup>25</sup> ≈ 40%. Vì vậy một sự kiện "50 năm" có khả năng cao xuất hiện trong đời công trình.</div>
<h4>Phân bố gió trung bình 10 phút</h4>
<p><b>Weibull:</b> <span class="eq">F(V) = 1 − exp[−(V/A)<sup>k</sup>]</span>. <b>Rayleigh</b> là trường hợp k = 2: <span class="eq">F(V) = 1 − exp[−π·(V/2V<sub>ave</sub>)²]</span>.</p>
<div class="ex"><b>Ví dụ.</b> A = 5,87 m/s, k = 1,709, V<sub>ave</sub> = 5,8 m/s:
<ul>
<li>P(V ≤ 3 m/s): Weibull 27,2%, Rayleigh 19,0%.</li>
<li>P(V ≤ 11 m/s): Weibull 94,6%, Rayleigh 94,1%.</li>
</ul>
Rayleigh khá gần Weibull ở tốc độ cao nhưng lệch ở tốc độ thấp.</div>
<h4>Rối và phổ Kaimal</h4>
<ul>
<li>Độ lệch chuẩn dọc: <span class="eq">σ₁ = I<sub>ref</sub>·(0,75·V<sub>hub</sub> + 5,6)</span>. Ví dụ I<sub>ref</sub> = 0,14, V<sub>hub</sub> = 11 m/s: σ₁ = 1,94 m/s, cường độ rối 0,176.</li>
<li>Phổ Kaimal một phía: <span class="eq">S₁(f) = 4σ₁²·(L₁/V<sub>hub</sub>)/(1 + 6f·L₁/V<sub>hub</sub>)<sup>5/3</sup></span>, tỷ lệ độ dài Λ₁ = 42 m tại trục rotor cao hơn 60 m, L₁ = 8,1·Λ₁.</li>
</ul>
<h4>Sóng</h4>
<ul>
<li>Sea-state mô tả bằng H<sub>s</sub>, T<sub>p</sub>, hướng. Biểu đồ phân tán (scatter diagram) cho tần suất xuất hiện của từng cặp H<sub>s</sub>–T<sub>p</sub>, dùng để tính mỏi dài hạn.</li>
<li>Hoa sóng và hoa gió cho tần suất theo hướng.</li>
<li>Phổ <b>JONSWAP</b> cho biển đang phát triển, Pierson–Moskowitz cho biển phát triển đầy đủ.</li>
<li>Cực hạn: H<sub>s</sub> có chu kỳ lặp 50 năm, H<sub>max</sub> = k·H<sub>s</sub> (bài giảng dùng 1,647 cho H<sub>max</sub> theo H<sub>s</sub> = 6,26 m).</li>
</ul>
<h4>Thời gian lấy trung bình</h4>
<p>Gió cực hạn 3 giây, 10 phút, 1 giờ khác nhau nhiều. Luôn ghi rõ quy ước. Xem chuyên đề Gió để quy đổi.</p>
<h4>Số liệu thực tế cần thu thập</h4>
<ul>
<li>Gió: chuỗi nhiều năm tại nhiều độ cao, hướng gió, giật cực hạn trong bão.</li>
<li>Sóng, dòng chảy, mực nước: đo trực tiếp bằng phao hoặc ADCP, mô hình hóa ngược dòng (hindcast).</li>
<li>Sinh vật bám, ăn mòn, đáy biển và địa chất.</li>
</ul>
<p class="note">Các thông số Weibull và rối ở đây là ví dụ trong mô-đun "Gió IEC" của ứng dụng, không phải số liệu của một địa điểm cụ thể.</p>`
  },
  {
    id: 'dlc-ct',
    tag: 'Chuyên đề 6',
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
<div class="ex"><b>Ví dụ</b> với dữ liệu dự án của bài giảng (monopile D = 8 m, d = 25 m), mô men tính toán γ<sub>f</sub>·M:
<ul>
<li>DLC 1.3: 472,8 MN·m (ETM, lực đẩy rotor tăng, sóng thường).</li>
<li>DLC 1.6: 431,5 MN·m (biển động mạnh hơn).</li>
<li>DLC 6.1: <b>536,2 MN·m</b> (gió bão 53,6 m/s, rotor đỗ, sóng 50 năm có dòng chảy).</li>
<li>DLC 7.1: 289,9 MN·m (γ<sub>f</sub> = 1,10, tải bất thường).</li>
</ul>
Trường hợp chi phối là 6.1. Khi nhập dòng chảy 0,6 và 0,4 m/s, 6.1 dùng dòng đầy đủ, 7.1 nhân hệ số thấp hơn (0,8), còn 1.3 và 1.6 chỉ tính thủy triều.</div>
<h4>Những điểm cần lưu ý</h4>
<ul>
<li><b>Mực nước:</b> tải sóng thay đổi theo mực nước (NWLR, EWLR). Phải quét nhiều mực nước, không chỉ MSL.</li>
<li><b>Hướng:</b> gió, sóng và dòng chảy không đồng hướng. Phân tích riêng từng tổ hợp hướng, xem xét lệch hướng.</li>
<li><b>DLC 1.1:</b> ngoại suy tải cực hạn, dùng hệ số 1,25 cho tải bình thường khi ngoại suy thống kê.</li>
<li><b>Ma trận tải tương đương:</b> kết quả phân tích tích hợp quy về chân tháp dưới dạng bảng lực và mô men lớn nhất, nhỏ nhất, dùng cho tính cấu kiện.</li>
</ul>
<h4>Các DLC dùng cho từng trạng thái (theo bài giảng)</h4>
<ul>
<li><b>ULS:</b> 1.1 (NTM + NSS, ngoại suy tải cực hạn), 1.3 (ETM), 1.4 (ECD), 1.5 (EWS), 1.6 (NTM + SSS); 2.x (vận hành + sự cố); 3.x (khởi động: NWP, EOG, EDC); 4.2 (dừng thông thường); 5.1 (dừng khẩn cấp); 6.1 đến 6.3 (đỗ); 7.1 (đỗ + sự cố); 8.x (vận chuyển, lắp dựng, sửa chữa). Phải dùng bộ tải đồng thời tại một thời điểm.</li>
<li><b>FLS:</b> 1.2, 4.1, 6.4, 7.2, 8.3 và 8.4. Là chuỗi thời gian dài kèm tần suất theo hướng gió, đếm rainflow, S–N, Miner. DLC 1.2 và 6.4 thường chi phối.</li>
<li><b>SLS:</b> không có họ DLC riêng. Dùng γ<sub>f</sub> = 1,0 và đánh giá theo ba mức tải dịch vụ: <b>S1</b> (đặc trưng, suy từ DLC vận hành nhóm N của ULS), <b>S2</b> (thường xuyên, mức vượt rất thấp cỡ 10⁻⁴ tuổi thọ, từ mô phỏng kiểu FLS) và <b>S3</b> (thường xuyên tương đương, mức vượt cỡ 10⁻², kiểm tra yêu cầu làm việc lâu dài). Mức vượt ghi theo slide, cần đối chiếu bản gốc.</li>
</ul>
<p>Các đại lượng kiểm tra SLS: chuyển vị đỉnh tháp δ ≤ δ<sub>allow</sub> (độ lệch ngang), độ nghiêng móng hoặc tháp θ ≤ θ<sub>allow</sub>, gia tốc rung a<sub>rms</sub> ≤ a<sub>allow</sub>, khoảng hở đầu cánh so với tháp, và khả năng vận hành của rotor và nacelle.</p>
<h4>LRFD và WSD</h4>
<p>Trạng thái ULS theo LRFD: <span class="eq">S(Σγ<sub>i</sub>·F<sub>i</sub>) ≤ m·R<sub>k</sub>/γ<sub>m</sub></span>, hay <span class="eq">UR = S<sub>d</sub>/R<sub>d</sub> ≤ 1</span> (ISO, DnV, API). Theo WSD: <span class="eq">f ≤ F<sub>allowable</sub> = F<sub>y</sub> hoặc F<sub>crit</sub> chia SF</span>.</p>
<p class="note">Các hệ số khuếch đại lực đẩy, C<sub>t</sub> khi đỗ, sóng và chu kỳ 1 năm (H<sub>s</sub> 4,8 m, T<sub>p</sub> 9 s), và hệ số dòng chảy 0,8 là giả định của ứng dụng. Trong dự án thật các số này đến từ mô phỏng khí động đàn hồi của nhà chế tạo.</p>`
  },
  {
    id: 'vd-ch4',
    tag: 'Chuyên đề 7',
    title: 'Ví dụ bài giảng Chương 4: sóng với dòng chảy, gió 8 MW và tổ hợp ULS',
    body: `
<p>Ba ví dụ lấy từ bài giảng, đã được dựng lại trong mô-đun "Ví dụ Ch.4" ở tab Tính toán. Kết quả của ứng dụng khớp số của slide.</p>
<h4>Ví dụ 1: sóng và dòng chảy lên monopile (Morison, sóng Airy)</h4>
<p>H = 2,5 m, T = 8 s, h = 30 m, D = 8 m, C<sub>D</sub> = 1,0, C<sub>M</sub> = 2,0, U<sub>c0</sub> = 0,5 m/s (phân bố ((z + h)/h)<sup>1/7</sup>). Sóng có ω = 0,7854 rad/s, k = 0,06541 1/m, L = 96,05 m (nước trung gian, h/L = 0,31).</p>
<div class="ex"><b>Pha đỉnh sóng trùng tim cọc</b> (kx − ωt = 0): gia tốc sóng bằng 0, chỉ còn cản của vận tốc tổ hợp u<sub>r</sub> = u<sub>w</sub> + U<sub>c</sub>.
<ul>
<li>Tại z = 0: u<sub>w</sub> = 1,021 m/s, U<sub>c</sub> = 0,500 m/s, u<sub>r</sub> = 1,521 m/s, f<sub>D</sub> = 9,49 kN/m. Tại đáy: u<sub>r</sub> = 0,281 m/s, f<sub>D</sub> = 0,32 kN/m.</li>
<li>Tổng lực F ≈ 115,4 kN, mô men tại mudline M ≈ 2,34 MN·m (slide: 115,38 kN và 2,34 MN·m).</li>
</ul></div>
<div class="ex"><b>Pha mặt nước tại tim cọc bằng MSL</b> (kx − ωt = π/2): vận tốc sóng bằng 0, gia tốc sóng cực đại, quán tính chi phối.
<ul>
<li>Cản chỉ do dòng chảy: F<sub>D</sub> ≈ 23,0 kN. Quán tính F<sub>I</sub> ≈ 1 225 kN.</li>
<li>Tổng lực F ≈ 1 248,5 kN, M ≈ 23,30 MN·m (slide: 1 248,46 kN, 23,30 MN·m).</li>
</ul></div>
<p>Bài học: với trụ lớn (D = 8 m), tải quán tính lớn gấp hơn 10 lần tải cản. Pha quyết định tải cực đại khác nhau cho từng thành phần, nên phải quét pha. Tích phân hình thang theo bảng 5 m cho sai lệch khoảng 0,8% so với tích phân chi tiết, đây là sai số cầu phương.</p>
<h4>Ví dụ 2: tải gió lên tuabin 8 MW</h4>
<p>D<sub>R</sub> = 170 m, hub +110 m, tháp cao 105 m (D từ 6,5 m xuống 4,0 m), h = 30 m, V<sub>hub</sub> = 12 m/s, α = 0,10, C<sub>T</sub> = 0,8, ρ<sub>a</sub> = 1,225 kg/m³.</p>
<div class="ex">
<ul>
<li>Lực đẩy rotor T = ½·1,225·22 698·0,8·12² = 1,60 MN tại 110 m.</li>
<li>Nacelle F<sub>N</sub> ≈ 6,9 kN, tháp F<sub>T</sub> ≈ 46 kN tại độ cao khoảng 55 m.</li>
<li>Tổng lực ngang ≈ 1,65 MN. Mô men tại mudline M<sub>wind</sub> = T·(110 + 30) + F<sub>N</sub>·(110 + 30) + ∫p<sub>T</sub>·(z + 30)·dz ≈ 229 MN·m.</li>
</ul>
Rotor chiếm khoảng 97% tổng tải. Gió chỉ tác dụng lên phần tháp phía trên MSL, mô men tại mudline lấy với cánh tay cộng thêm độ sâu nước.</div>
<h4>Ví dụ 3: tổ hợp ULS tại mudline, DLC 6.1</h4>
<p>Tuabin đỗ (rotor parked, cánh feather) trong bão cực trị: V<sub>hub</sub> = 50 m/s, H<sub>s</sub> = 8,5 m, T<sub>p</sub> = 12,5 s, dòng chảy U<sub>c</sub> = 0,9 m/s, mực nước +3,0 m so với MSL, gió và sóng lệch 30°.</p>
<div class="tw"><table>
<tr><th>Tải</th><th>Đặc trưng</th><th>Thiết kế (γ<sub>f</sub> = 1,35)</th></tr>
<tr><td>N</td><td>−60 MN</td><td>−81 MN</td></tr>
<tr><td>V<sub>x</sub></td><td>8,0 MN</td><td>10,8 MN</td></tr>
<tr><td>V<sub>y</sub></td><td>3,0 MN</td><td>4,05 MN</td></tr>
<tr><td>M<sub>x</sub></td><td>260 MN·m</td><td>351 MN·m</td></tr>
<tr><td>M<sub>y</sub></td><td>760 MN·m</td><td>1 026 MN·m</td></tr>
<tr><td>T</td><td>15 MN·m</td><td>20,25 MN·m</td></tr>
</table></div>
<p>Lực cắt tổng hợp <span class="eq">V<sub>d</sub> = √(10,8² + 4,05²) ≈ 11,53 MN</span>. Mô men uốn tổng hợp <span class="eq">M<sub>b,d</sub> = √(351² + 1026²) ≈ 1 084 MN·m</span>. Kiểm tra ULS: UR = S<sub>d</sub>/R<sub>d</sub> = 0,84 &lt; 1, đạt.</p>
<p class="note">Phải dùng bộ tải đồng thời [N, V<sub>x</sub>, V<sub>y</sub>, M<sub>x</sub>, M<sub>y</sub>, T] tại cùng một thời điểm, không ghép các cực trị riêng lẻ. Số liệu DLC 6.1 của slide là số giả định phục vụ giảng dạy.</p>`
  },
  {
    id: 'monopile',
    tag: 'Chuyên đề 8',
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
<div class="ex"><b>Ví dụ</b> với mặc định: D = 8 m, t = 80 mm, ngàm L = 30 m (3,75 D), φ = 35°, γ' = 9 kN/m³, k = 22 000 kN/m³.
<ul>
<li>Tại độ sâu 5 m, D = 8,1 m: p<sub>us</sub> = (2,97·5 + 3,42·8,1)·9·5 ≈ 1 915 kN/m, nhỏ hơn p<sub>ud</sub> ≈ 19 610 kN/m nên chọn p<sub>u</sub> = 1 915 kN/m.</li>
<li>Tải tiêu chuẩn tại đáy biển (có dòng chảy): H ≈ 5 115 kN, M ≈ 305 859 kN·m. Mô men tính toán γ<sub>f</sub>·M ≈ 412 909 kN·m.</li>
<li>Độ võng đáy biển ≈ 31 mm, xoay ≈ 0,143°, thỏa giới hạn 0,25°.</li>
<li>Mô men tính toán lớn nhất trong cọc ≈ 444 MN·m, xuất hiện ở độ sâu khoảng 6,4 m dưới đáy biển.</li>
<li>Hệ số sử dụng thép khoảng 39%.</li>
<li>Broms cho chiều sâu ngàm tối thiểu ≈ 18,2 m, nhỏ hơn 30 m.</li>
</ul></div>
<p class="note">API p-y hiệu chỉnh cho cọc nhỏ. Với monopile đường kính lớn, nó có thể sai đáng kể so với PISA hoặc 3D. Chỉ dùng cho kiểm tra sơ bộ.</p>`
  },
  {
    id: 'tan',
    tag: 'Chuyên đề 9',
    title: 'Tần số riêng và cửa sổ 1P/3P',
    body: `
<h4>Phương pháp Rayleigh</h4>
<p>Cho dầm công-xon có độ cứng EI(z) và khối lượng m(z) với RNA ở đỉnh. Chọn dạng dao động là độ võng tĩnh u(z) khi tải ngang tỷ lệ với khối lượng. Khi đó:</p>
<p><span class="eq">ω² = Σ m<sub>j</sub>·u<sub>j</sub> / Σ m<sub>j</sub>·u<sub>j</sub>²</span>, <span class="eq">f₁ = ω/2π</span></p>
<p>Rayleigh luôn cho tần số lớn hơn hoặc bằng tần số thật. Đoạn ngập có thêm khối lượng nước nâng ρ<sub>w</sub>·π·(D + 2·t<sub>mg</sub>)²/4 mỗi mét dài.</p>
<h4>Tần số thứ hai</h4>
<p>Ứng dụng giải bài toán trị riêng bằng phần tử dầm Euler–Bernoulli (khối lượng nhất quán) để lấy f₁, f₂, f₃. Kết quả được kiểm chứng với nghiệm giải tích dầm công-xon (f₁ = 0,608 Hz, f₂ = 3,809 Hz). f₂ thường nằm trên dải 3P, nhưng với tua bin lớn có thể rơi vào vùng nhạy cảm. Cần kiểm tra cả hai.</p>
<h4>Đất nền, độ sâu ngàm giả định và xói</h4>
<ul>
<li>Cọc ngàm trong đất được thay bằng ngàm tương đương ở độ sâu L<sub>d</sub> dưới đáy biển. Theo bài giảng: 3,5–4,5 D (sét), 7,0–8,5 D (đất mềm, cát rời), 6,0 D khi không có số liệu.</li>
<li>Đất mềm hơn hoặc xói sâu hơn làm L<sub>d</sub> tăng, f₁ giảm.</li>
<li>Thiết kế chính thức dùng lò xo p-y, t-z hoặc phần tử đất đa chiều trong mô hình tích hợp.</li>
</ul>
<h4>Rung do xoáy (VIV)</h4>
<p>Dòng chảy lên trụ mảnh tạo xoáy luân phiên. Kiểm tra vận tốc rút gọn <span class="eq">U<sub>r</sub> = U/(f₁·D)</span>. Vùng nguy cơ ứng dụng dùng là 4 đến 10, và thông số ổn định <span class="eq">k<sub>s</sub> = 2·m<sub>e</sub>·δ/(ρ·D²)</span>. Ví dụ mặc định: U = 1,0 m/s, D = 8,1 m, U<sub>r</sub> = 0,61, k<sub>s</sub> = 0,11 (với δ = 0,05 giả định). Chưa có nguy cơ. Với tua bin chưa dựng tháp, f₁ của cọc đơn khác nhiều, VIV có thể thành vấn đề khi lắp đặt.</p>
<div class="ex"><b>Ví dụ</b> với mặc định: móng D = 8 m, t = 80 mm, ngàm tương đương 30 m, tháp 6,5 m xuống 4,2 m dày 35 mm, RNA 600 t, thép phụ 15%.
<ul>
<li>f₁ phần tử dầm ≈ 0,203 Hz (Rayleigh 0,209 Hz, cận trên). f₂ ≈ 1,007 Hz, f₃ ≈ 2,688 Hz. Khối lượng kết cấu ≈ 3 133 t.</li>
<li>Rotor 5 đến 9 vòng/phút: 1P = 0,083 đến 0,150 Hz, 3P = 0,250 đến 0,450 Hz. Với biên 10%, dải tránh là 0,075–0,165 Hz và 0,225–0,495 Hz.</li>
<li>f₁ nằm giữa hai dải: soft-stiff. f₂ nằm trên dải 3P. Đỉnh phổ sóng 1/T<sub>p</sub> = 0,091 Hz cũng xa f₁.</li>
<li>Độ nhạy: ngàm −30% cho f₁ ≈ 0,215 Hz, ngàm +30% cho f₁ ≈ 0,192 Hz. Biên dưới của dải 3P là 0,225 Hz, vẫn còn cách khoảng 5%.</li>
</ul></div>
<p class="note">Khi f₁ cách biên dải 3P chưa tới vài phần trăm, kết cấu rất nhạy với xói và độ cứng đất. Nên tăng độ cứng hoặc giảm khối lượng.</p>`
  },
  {
    id: 'dong-dat',
    tag: 'Chuyên đề 10',
    title: 'Động đất: phổ phản ứng và lực theo dạng dao động thứ nhất',
    body: `
<h4>Phổ phản ứng (API RP 2A, cản 5%)</h4>
<p>Gia tốc phổ chuẩn hóa theo gia tốc nền a<sub>g</sub>, đất loại B:</p>
<ul>
<li>T ≤ 0,05 s: S<sub>A</sub>/a<sub>g</sub> = 1.</li>
<li>0,05 &lt; T ≤ 0,125 s: S<sub>A</sub>/a<sub>g</sub> = 20·T.</li>
<li>Đoạn bằng: S<sub>A</sub>/a<sub>g</sub> = 2,5, khoảng 0,125 đến 0,48 s.</li>
<li>T lớn: S<sub>A</sub>/a<sub>g</sub> = 1,2/T (đất B).</li>
</ul>
<h4>Lực theo dạng dao động thứ nhất</h4>
<p>Hệ số tham gia <span class="eq">Γ = Σ m<sub>i</sub>·φ<sub>i</sub> / Σ m<sub>i</sub>·φ<sub>i</sub>²</span>, lực tại điểm i: <span class="eq">F<sub>i</sub> = Γ·m<sub>i</sub>·φ<sub>i</sub>·S<sub>A</sub></span>. Cộng lực để có lực cắt và mô men đáy biển.</p>
<div class="ex"><b>Ví dụ</b> (giả định a<sub>g</sub> = 0,10 g, đất B, f₁ = 0,203 Hz):
<ul>
<li>T₁ = 4,92 s, S<sub>A</sub>/a<sub>g</sub> = 0,24, S<sub>A</sub> = 0,024 g.</li>
<li>Lực cắt đáy biển V ≈ 333 kN, mô men đáy M ≈ 35,1 MN·m.</li>
<li>So với mô men gió, sóng (DLC 6.1) khoảng 397 MN·m: chỉ 8,8%. Động đất không chi phối.</li>
</ul></div>
<p>Kết cấu mềm có chu kỳ dài nên ít chịu động đất. Kết cấu cứng (móng trọng lực, jacket cứng) chịu gia tốc phổ lớn hơn. Cần xét thêm dạng dao động bậc cao, hóa lỏng của đất, ổn định cọc và khả năng tăng áp lực nước lỗ rỗng.</p>
<h4>Phương pháp</h4>
<ul>
<li><b>Miền tần số:</b> dùng phổ phản ứng tại địa điểm.</li>
<li><b>Miền thời gian:</b> dùng biểu đồ gia tốc nền, phù hợp phân tích phi tuyến.</li>
<li>Kiểm tra theo mức cường độ và mức dẻo (ISO 19901-2). TCVN 9386:2012 để đối chiếu gia tốc nền theo vùng.</li>
</ul>
<p class="note">Gia tốc nền a<sub>g</sub> = 0,10 g là giả định. Dự án thật dùng nghiên cứu nguy cơ động đất riêng cho địa điểm.</p>`
  },
  {
    id: 'jacket',
    tag: 'Chuyên đề 11',
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
<div class="ex"><b>Ví dụ</b> với mặc định: B = 25 m, N = 20 000 kN, tải theo đường chéo. M = 286 466 kN·m.
<ul>
<li>N/4 = 5 000 kN, ΔN = 0,707·286 466/25 = 8 102 kN.</li>
<li>Chân nén: 13 102 kN. Chân nhổ: −3 102 kN, tức có lực nhổ.</li>
<li>Chân D = 2 m, t = 50 mm, L = 15 m: λ<sub>c</sub> = 0,23, F<sub>xc</sub> = 350 MPa, R<sub>c</sub>/γ<sub>M</sub> ≈ 93 329 kN. Sử dụng 19%.</li>
<li>Cọc D = 2,4 m, β = 0,4, γ' = 9 kN/m³, FS = 2: L ≈ 21,4 m để chịu nhổ.</li>
</ul></div>
<p class="note">Mỏi tại nút ống (hot-spot) và cường độ mối nối thường chi phối thiết kế giàn thực tế. Cần mô hình giàn đầy đủ.</p>`
  },
  {
    id: 'gbs',
    tag: 'Chuyên đề 12',
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
<div class="ex"><b>Ví dụ</b> với mặc định: đáy D = 36 m, V = 90 000 kN, H = 5 115 kN, M = 305 859 kN·m, φ = 35°, E = 50 MPa, ν = 0,3.
<ul>
<li>N<sub>q</sub> = 33,3, N<sub>γ</sub> = 48,0. e = 3,40 m, nhỏ hơn D/8 = 4,5 m.</li>
<li>A' = 775 m², D' = 31,4 m.</li>
<li>FS sức chịu tải ≈ 28,6, trượt ≈ 8,2, lật ≈ 5,3.</li>
<li>Lún đàn hồi ≈ 45,5 mm, xoay ≈ 0,041°.</li>
</ul></div>
<p class="note">Móng thật còn cần kiểm tra tải chu kỳ gây tăng áp lực nước lỗ rỗng, lún lệch và xói dưới mép đế. Ở vùng đất yếu của đồng bằng sông Cửu Long, lún dài hạn có thể chi phối.</p>`
  },
  {
    id: 'noi',
    tag: 'Chuyên đề 13',
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
    tag: 'Chuyên đề 14',
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
    vn: 'TCVN 10687 (bộ tiêu chuẩn tua bin gió, ban hành 2019–2025, tương ứng IEC 61400). Kiểm tra số hiệu từng phần và năm ban hành.',
    note: 'Hồ sơ dự án thực tế thường yêu cầu chứng nhận độc lập (DNV, TÜV, Bureau Veritas...).'
  }
];

/* Đối chiếu từng kiểm tra */
const CHECKS = [
  {
    h: 'Tải gió lên tháp và rotor',
    intl: 'IEC 61400-1/-3-1: profile NWP α = 0,14, gió trung bình 10 phút tại trục rotor, lực rotor từ mô phỏng khí động đàn hồi. Gió tháp: ½·ρ·C<sub>d</sub>·D·V².',
    vn: 'TCVN 2737:2023: tải gió tính từ áp lực gió cơ sở nhân hệ số độ cao và hệ số khí động, kiểm tra bản hiện hành về thời gian lấy trung bình.',
    mix: 'Dùng IEC cho rotor. Với tháp, dùng IEC để đồng bộ với mô phỏng, dùng TCVN để kiểm tra độc lập. Phải quy đổi gió giật 3 giây sang trung bình 10 phút. IEC dùng hệ số 1,4, ISO 19901-1 cho hệ số khác (ví dụ 75,05 m/s → 53,6 m/s theo IEC, 62,4 m/s theo ISO).'
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
    mix: 'Dùng nghiên cứu động đất riêng cho địa điểm và đối chiếu gia tốc nền với TCVN 9386. Phổ API trong ứng dụng chỉ để đánh giá nhanh.'
  }
];

const TIPS = [
  ['Thời gian lấy trung bình của gió', '<p>IEC dùng trung bình 10 phút tại cao độ trục rotor. Số liệu trạm Việt Nam có thể là trung bình 2 phút hoặc giật 3 giây. Phải quy đổi về cùng cơ sở trước khi dùng.</p><p>Ví dụ: giật 3 giây 75,05 m/s tại 110 m. Theo IEC (hệ số 1,4) ra 53,6 m/s trung bình 10 phút. Theo ISO 19901-1 ra 62,4 m/s. Chênh khoảng 16% về gió, khoảng 35% về tải theo V². Phải ghi rõ chọn quy ước nào.</p>'],
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
  "Neo xích dạng dây xích",
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
 ],
 [
  "Kaimal spectrum",
  "Phổ Kaimal",
  "Phổ rối gió theo tần số, dùng trong IEC 61400-1.",
  "tai"
 ],
 [
  "Weibull distribution",
  "Phân bố Weibull",
  "Mô tả tốc độ gió trung bình 10 phút.",
  "tai"
 ],
 [
  "Rayleigh distribution",
  "Phân bố Rayleigh",
  "Weibull với k = 2, cũng dùng cho biên độ sóng.",
  "tai"
 ],
 [
  "Reference wind speed (Vref)",
  "Tốc độ gió tham chiếu",
  "Trung bình 10 phút chu kỳ lặp 50 năm tại trục rotor.",
  "tai"
 ],
 [
  "Average wind speed (Vave)",
  "Tốc độ gió trung bình năm",
  "Dùng định nghĩa hạng tua bin.",
  "tai"
 ],
 [
  "Turbine class",
  "Hạng tua bin",
  "I, II, III, S theo Vref và Iref; T cho vùng bão nhiệt đới.",
  "tai"
 ],
 [
  "Reference turbulence intensity (Iref)",
  "Cường độ rối tham chiếu",
  "A+ 0,18; A 0,16; B 0,14; C 0,12.",
  "tai"
 ],
 [
  "Extreme wind speed (Ve50)",
  "Tốc độ gió cực hạn 50 năm",
  "1,4·Vref·(z/zhub)^0,11, giật 3 giây.",
  "tai"
 ],
 [
  "Normal wind profile (NWP)",
  "Profile gió thường",
  "Lũy thừa, α = 0,14 ngoài khơi.",
  "tai"
 ],
 [
  "Scatter diagram",
  "Biểu đồ phân tán",
  "Tần suất xuất hiện của cặp Hs và Tp.",
  "tai"
 ],
 [
  "Wave rose",
  "Hoa sóng",
  "Tần suất sóng theo hướng.",
  "tai"
 ],
 [
  "Wind rose",
  "Hoa gió",
  "Tần suất gió theo hướng.",
  "tai"
 ],
 [
  "Cnoidal wave",
  "Sóng cnoidal",
  "Lý thuyết sóng cho nước nông.",
  "tai"
 ],
 [
  "Spilling breaker",
  "Sóng vỡ tràn",
  "Vỡ từ từ, bọt lan từ đỉnh.",
  "tai"
 ],
 [
  "Plunging breaker",
  "Sóng vỡ cuộn",
  "Đỉnh cuộn xuống, tải xung kích lớn.",
  "tai"
 ],
 [
  "Surging breaker",
  "Sóng vỡ dâng",
  "Sóng dâng lên mái dốc mà không vỡ rõ.",
  "tai"
 ],
 [
  "Iribarren number",
  "Số Iribarren",
  "Phân loại dạng sóng vỡ theo độ dốc đáy.",
  "tai"
 ],
 [
  "Wave slamming",
  "Xung kích sóng vỡ",
  "Tải ngắn hạn, rất lớn khi sóng vỡ đập vào trụ.",
  "tai"
 ],
 [
  "Hindcast",
  "Mô hình hóa ngược dòng",
  "Tái tạo sóng, gió quá khứ bằng mô hình.",
  "tai"
 ],
 [
  "Tidal current",
  "Dòng chảy thủy triều",
  "Thành phần dòng theo chu kỳ triều.",
  "tai"
 ],
 [
  "Wind-driven current",
  "Dòng chảy do gió",
  "Giảm tuyến tính theo độ sâu trong DnV.",
  "tai"
 ],
 [
  "Marine growth",
  "Sinh vật bám",
  "Làm tăng đường kính, khối lượng và C_D.",
  "tai"
 ],
 [
  "Progressive limit state (PLS)",
  "Trạng thái giới hạn phá hủy lũy tiến",
  "Sụp đổ dây chuyền sau hư hỏng cục bộ.",
  "dkt"
 ],
 [
  "Working stress design (WSD)",
  "Thiết kế theo ứng suất cho phép",
  "Ứng suất cho phép khoảng 0,6·Fy.",
  "dkt"
 ],
 [
  "Load and resistance factor design (LRFD)",
  "Thiết kế hệ số tải và sức kháng",
  "Hệ số riêng cho tải và vật liệu.",
  "dkt"
 ],
 [
  "Quasi-static analysis",
  "Phân tích tựa tĩnh",
  "Tải tương đương, bỏ qua hiệu ứng động.",
  "dkt"
 ],
 [
  "Equivalent load",
  "Tải tương đương",
  "Tải quy về chân tháp từ mô phỏng tích hợp.",
  "dkt"
 ],
 [
  "Response spectrum",
  "Phổ phản ứng",
  "Gia tốc cực đại theo chu kỳ của hệ một bậc tự do.",
  "dkt"
 ],
 [
  "Peak ground acceleration (PGA)",
  "Gia tốc nền cực đại",
  "Ký hiệu ag.",
  "dkt"
 ],
 [
  "Modal participation factor",
  "Hệ số tham gia dạng dao động",
  "Γ = Σmφ/Σmφ².",
  "dkt"
 ],
 [
  "Bathymetric survey",
  "Khảo sát địa hình đáy biển",
  "Đo độ sâu và hình dạng đáy.",
  "dkt"
 ],
 [
  "Vortex-induced vibration (VIV)",
  "Rung do xoáy",
  "Dòng chảy làm trụ dao động ngang.",
  "dkt"
 ],
 [
  "Reduced velocity",
  "Vận tốc rút gọn",
  "Ur = U/(f·D).",
  "dkt"
 ],
 [
  "Second natural frequency",
  "Tần số riêng thứ hai",
  "Kiểm tra so với dải 3P.",
  "dkt"
 ],
 [
  "t-z curve",
  "Đường cong t-z",
  "Ma sát bên và chuyển vị dọc cọc.",
  "tc"
 ],
 [
  "Q-z curve",
  "Đường cong Q-z",
  "Sức chịu mũi và chuyển vị mũi cọc.",
  "tc"
 ],
 [
  "Apparent fixity",
  "Ngàm giả định",
  "Độ sâu ngàm tương đương thay cho nền đất.",
  "tc"
 ],
 [
  "Impressed current cathodic protection (ICCP)",
  "Bảo vệ catốt dòng cưỡng bức",
  "Nguồn một chiều cấp dòng bảo vệ.",
  "tc"
 ],
 [
  "Glass flake epoxy",
  "Epoxy cốt mảnh thủy tinh",
  "Lớp phủ chống ăn mòn bền.",
  "tc"
 ],
 [
  "Fusion bonded epoxy (FBE)",
  "Epoxy nung chảy",
  "Lớp phủ chống ăn mòn.",
  "tc"
 ],
 [
  "Splash zone",
  "Vùng văng bắn",
  "Vùng ăn mòn nhanh nhất.",
  "tc"
 ],
 [
  "Load-out",
  "Xuất xưởng lên tàu",
  "Chuyển kết cấu lên sà lan hoặc tàu.",
  "tc"
 ],
 [
  "Jack-up vessel",
  "Tàu chân chống",
  "Tàu lắp đặt có chân hạ xuống đáy biển.",
  "tc"
 ],
 [
  "Hydraulic hammer",
  "Búa thủy lực",
  "Đóng monopile.",
  "tc"
 ],
 [
  "Actuator disk",
  "Đĩa lấy năng lượng (lý thuyết động lượng)",
  "Coi rotor như đĩa mỏng làm chậm dòng gió.",
  "tai"
 ],
 [
  "Axial induction factor",
  "Hệ số cảm ứng dọc trục a",
  "a = (V₀ − V_d)/V₀.",
  "tai"
 ],
 [
  "Betz limit",
  "Giới hạn Betz",
  "C_P tối đa 16/27 = 0,593 tại a = 1/3.",
  "tai"
 ],
 [
  "Thrust coefficient",
  "Hệ số lực đẩy C_T",
  "C_T = 4a(1 − a).",
  "tai"
 ],
 [
  "Power coefficient",
  "Hệ số công suất C_P",
  "C_P = 4a(1 − a)².",
  "tai"
 ],
 [
  "Blade element momentum (BEM)",
  "Lý thuyết phần tử cánh – động lượng",
  "Giải lặp ghép lực cánh với bảo toàn động lượng.",
  "tai"
 ],
 [
  "Prandtl tip loss factor",
  "Hệ số tổn thất đầu cánh Prandtl",
  "Hiệu chỉnh F cho dòng quanh đầu cánh.",
  "tai"
 ],
 [
  "Cut-in wind speed",
  "Tốc độ gió bắt đầu phát điện",
  "Dưới mức này tuabin không phát.",
  "tai"
 ],
 [
  "Rated wind speed",
  "Tốc độ gió định mức",
  "Đạt công suất tối đa.",
  "tai"
 ],
 [
  "Cut-out wind speed",
  "Tốc độ gió ngừng máy",
  "Trên mức này tuabin dừng.",
  "tai"
 ],
 [
  "Tilt",
  "Độ nghiêng trục",
  "Góc ngửa trục rotor.",
  "tai"
 ],
 [
  "Yaw",
  "Xoay hướng nacelle",
  "Xoay nacelle đón gió.",
  "tai"
 ],
 [
  "Pitch",
  "Xoay cánh",
  "Xoay cánh quanh trục dọc để điều chỉnh tải.",
  "tai"
 ],
 [
  "1P load",
  "Tải 1P",
  "Một lần mỗi vòng quay, do mất cân bằng.",
  "tai"
 ],
 [
  "3P load",
  "Tải 3P",
  "Ba lần mỗi vòng, do hiệu ứng che chắn của tháp.",
  "tai"
 ],
 [
  "Tower shadow",
  "Hiệu ứng che chắn của tháp",
  "Cánh đi qua thân tháp làm tải gió đổi nhịp.",
  "tai"
 ],
 [
  "Keulegan–Carpenter number",
  "Số Keulegan–Carpenter",
  "Tỷ lệ quãng đường hạt nước với cỡ trụ.",
  "tai"
 ],
 [
  "Reynolds number",
  "Số Reynolds",
  "Tỷ lệ lực quán tính với lực nhớt.",
  "tai"
 ],
 [
  "Wave–current interaction",
  "Tương tác sóng và dòng chảy",
  "Dòng chảy làm đổi bước sóng và chu kỳ biểu kiến.",
  "tai"
 ],
 [
  "Stokes wave",
  "Sóng Stokes",
  "Lý thuyết sóng phi tuyến theo chuỗi.",
  "tai"
 ],
 [
  "Cnoidal wave",
  "Sóng cnoidal",
  "Sóng dài ở nước nông.",
  "tai"
 ],
 [
  "Solitary wave",
  "Sóng đơn",
  "Một ngọn sóng đơn độc ở nước rất nông.",
  "tai"
 ],
 [
  "Stream function wave",
  "Sóng hàm dòng",
  "Lý thuyết số cho sóng phi tuyến cao.",
  "tai"
 ],
 [
  "Simultaneous load set",
  "Bộ tải đồng thời",
  "Các thành phần lực tại cùng một thời điểm.",
  "tai"
 ],
 [
  "Mudline moment arm",
  "Cánh tay mô men tại đáy biển",
  "Khoảng cách từ điểm đặt lực đến mudline.",
  "tai"
 ],
 [
  "Working stress design (WSD)",
  "Thiết kế theo ứng suất cho phép",
  "f ≤ F_allowable.",
  "tai"
 ],
 [
  "Serviceability levels S1–S3",
  "Mức tải dịch vụ S1 đến S3",
  "Đặc trưng, thường xuyên, thường trực.",
  "tai"
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
 },
 {
  "q": "C_M thường dùng cho trụ nhám (C_D = 1,05) là?",
  "o": [
   "0,2",
   "3,5",
   "5",
   "1,2"
  ],
  "a": 3,
  "w": "API và bài giảng dùng C_M = 1,2 với trụ nhám.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Công thức Hmax theo Rayleigh là?",
  "o": [
   "Hs·√(0,5·ln N)",
   "Hs/N",
   "2·Hs·N",
   "Hs²"
  ],
  "a": 0,
  "w": "N là số sóng trong cơn biển.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Xác suất vượt trong một năm của sự kiện T năm là?",
  "o": [
   "T",
   "1/T",
   "T²",
   "1−T"
  ],
  "a": 1,
  "w": "Pe = 1/T.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Vref của hạng tua bin T là?",
  "o": [
   "50 m/s",
   "42,5 m/s",
   "57 m/s",
   "37,5 m/s"
  ],
  "a": 2,
  "w": "Hạng T dành cho vùng bão nhiệt đới.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "IEC quy đổi giật 3 giây sang trung bình 10 phút bằng cách?",
  "o": [
   "Nhân 1,4",
   "Chia 2",
   "Giữ nguyên",
   "Chia 1,4"
  ],
  "a": 3,
  "w": "Ve50 = 1,4·Vref.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Tần số riêng thứ hai nên so với?",
  "o": [
   "Dải 3P",
   "Chỉ 1P",
   "Dải sóng chỉ 0 Hz",
   "Tần số lưới"
  ],
  "a": 0,
  "w": "f2 thường nằm trên dải 3P.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "VIV được kiểm tra qua đại lượng?",
  "o": [
   "H/L",
   "U/(f·D)",
   "Cd",
   "E·I"
  ],
  "a": 1,
  "w": "Vận tốc rút gọn Ur.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "PLS là trạng thái giới hạn về?",
  "o": [
   "Mỏi",
   "Võng",
   "Phá hủy lũy tiến",
   "Rung"
  ],
  "a": 2,
  "w": "Sụp đổ dây chuyền.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "WSD dùng ứng suất cho phép khoảng?",
  "o": [
   "2·Fy",
   "0,1·Fy",
   "Fy²",
   "0,6·Fy"
  ],
  "a": 3,
  "w": "Tương đương LRFD với hệ số 1,45 và 1,15.",
  "c": "iec",
  "l": 2
 },
 {
  "q": "Ngàm giả định cho đất mềm, cát rời là?",
  "o": [
   "7,0 đến 8,5 D",
   "1 D",
   "20 D",
   "0 D"
  ],
  "a": 0,
  "w": "Theo bài giảng; sét là 3,5 đến 4,5 D.",
  "c": "mono",
  "l": 2
 },
 {
  "q": "Khi không có số liệu đất, ngàm giả định lấy?",
  "o": [
   "0,5 D",
   "6,0 D",
   "12 D",
   "Bằng độ sâu nước"
  ],
  "a": 1,
  "w": "Giá trị mặc định trong bài giảng.",
  "c": "mono",
  "l": 2
 },
 {
  "q": "Phổ API RP 2A có đoạn bằng S_A/a_g bằng?",
  "o": [
   "1",
   "0,5",
   "2,5",
   "10"
  ],
  "a": 2,
  "w": "Đoạn bằng khoảng 0,125 đến 0,48 s.",
  "c": "jac",
  "l": 2
 },
 {
  "q": "TCVN 10687 là bộ tiêu chuẩn về?",
  "o": [
   "Cọc",
   "Bê tông",
   "Cáp biển",
   "Tua bin gió"
  ],
  "a": 3,
  "w": "Tương ứng IEC 61400, ban hành 2019–2025.",
  "c": "vn",
  "l": 1
 },
 {
  "q": "Q-z mô tả quan hệ giữa?",
  "o": [
   "Sức chịu mũi và chuyển vị",
   "Mỏi và chu kỳ",
   "Gió và sóng",
   "Lún và thời gian"
  ],
  "a": 0,
  "w": "Đường cong sức chịu mũi cọc.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "Dòng chảy DnV gồm?",
  "o": [
   "Chỉ sóng",
   "Thủy triều và gió",
   "Chỉ thủy triều",
   "Chỉ bão"
  ],
  "a": 1,
  "w": "Thủy triều theo lũy thừa 1/7, gió giảm tuyến tính.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "Vùng ăn mòn nhanh nhất là?",
  "o": [
   "Chôn trong đất",
   "Trong ống",
   "Vùng văng bắn",
   "Trên cao 100 m"
  ],
  "a": 2,
  "w": "Splash zone.",
  "c": "moi",
  "l": 1
 },
 {
  "q": "Thứ tự lắp đặt monopile đúng là?",
  "o": [
   "Cánh, tháp, cọc",
   "Nacelle, cọc",
   "Cáp trước, cọc sau",
   "Đóng cọc, TP, tháp, nacelle, cánh"
  ],
  "a": 3,
  "w": "Cọc, TP, tháp, nacelle, cánh, rồi cáp.",
  "c": "moi",
  "l": 2
 },
 {
  "q": "Giới hạn Betz cho biết điều gì?",
  "o": [
   "Rotor lấy tối đa 59,3% năng lượng gió",
   "Rotor lấy được 100%",
   "Tốc độ gió tối đa",
   "Số cánh tối ưu"
  ],
  "a": 0,
  "w": "C_P,max = 16/27 tại a = 1/3.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Với a = 0,2 thì gió phía sau rotor còn bao nhiêu so với V₀?",
  "o": [
   "0,80",
   "0,60",
   "0,20",
   "0,40"
  ],
  "a": 1,
  "w": "V_w = V₀(1 − 2a) = 0,6 V₀.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Tại giới hạn Betz, C_T bằng?",
  "o": [
   "4/9",
   "16/27",
   "8/9",
   "1,0"
  ],
  "a": 2,
  "w": "C_T = 4a(1 − a) = 8/9 khi a = 1/3.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Vì sao BEM phải giải lặp?",
  "o": [
   "Vì gió không ổn định",
   "Vì cánh quay quá nhanh",
   "Do số cánh",
   "a và a′ phụ thuộc góc tới, ngược lại"
  ],
  "a": 3,
  "w": "a, a′ → φ → C_n, C_t → a, a′ mới.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Tải 3P do nguyên nhân nào?",
  "o": [
   "Hiệu ứng che chắn của tháp",
   "Mất cân bằng khối lượng",
   "Sóng",
   "Dòng chảy"
  ],
  "a": 0,
  "w": "Cánh đi qua trước tháp, ba lần mỗi vòng.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Tải 1P do nguyên nhân nào?",
  "o": [
   "Hiệu ứng che tháp",
   "Mất cân bằng khối lượng hoặc khí động",
   "Dòng chảy",
   "Động đất"
  ],
  "a": 1,
  "w": "Một lần mỗi vòng quay.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Sóng nước sâu khi h/L lớn hơn?",
  "o": [
   "0,05",
   "0,14",
   "0,5",
   "1,0"
  ],
  "a": 2,
  "w": "Nước sâu h/L > 0,5; nông < 0,05.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "Khi 0,2 ≤ D/L ≤ 1 nên dùng?",
  "o": [
   "Morison",
   "Bỏ qua",
   "Sóng đơn",
   "Lý thuyết nhiễu xạ"
  ],
  "a": 3,
  "w": "D/L < 0,2 mới dùng Morison.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Hệ số quán tính C_I liên hệ với C_m như thế nào?",
  "o": [
   "C_I = 1 + C_m",
   "C_I = C_m",
   "C_I = 2C_m",
   "C_I = C_m − 1"
  ],
  "a": 0,
  "w": "Thêm khối lượng nước bị chiếm chỗ.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Dòng chảy cùng chiều sóng làm bước sóng?",
  "o": [
   "Ngắn đi",
   "Dài ra",
   "Không đổi",
   "Bằng 0"
  ],
  "a": 1,
  "w": "Dòng ngược chiều thì nén sóng lại.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Trong ví dụ trụ D = 8 m, pha η = 0 có lực lớn vì sao?",
  "o": [
   "Cản chi phối",
   "Dòng chảy lớn",
   "Quán tính chi phối",
   "Gió lớn"
  ],
  "a": 2,
  "w": "F ≈ 1248 kN so với 115 kN ở đỉnh sóng.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Vì sao phải dùng bộ tải đồng thời?",
  "o": [
   "Cho dễ tính",
   "Giảm hệ số",
   "Tiết kiệm thời gian",
   "Các cực trị riêng không xảy ra cùng lúc"
  ],
  "a": 3,
  "w": "Ghép các cực trị riêng là quá an toàn và sai thực tế.",
  "c": "tai",
  "l": 1
 },
 {
  "q": "SLS dùng hệ số tải γ_f bằng?",
  "o": [
   "1,0",
   "1,35",
   "1,1",
   "1,5"
  ],
  "a": 0,
  "w": "SLS không nhân hệ số tải.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "DLC nào dùng cho FLS?",
  "o": [
   "1.3 và 6.1",
   "1.2 và 6.4",
   "1.5",
   "3.1"
  ],
  "a": 1,
  "w": "FLS gồm 1.2, 4.1, 6.4, 7.2, 8.3, 8.4.",
  "c": "tai",
  "l": 2
 },
 {
  "q": "Phương pháp phổ tuyến tính hóa số hạng cản bằng?",
  "o": [
   "v²",
   "2v",
   "√(8/π)·σ_v·v",
   "0"
  ],
  "a": 2,
  "w": "|v|v ≈ √(8/π) σ_v v.",
  "c": "tai",
  "l": 2
 }
];

/* ===== Giải thích khái niệm tiếng Việt: g nhóm, t tên, d giải thích, e ví dụ đời thường, a số trong app ===== */
const KN_GROUPS = [['all', 'Tất cả'], ['tai', 'Tải và tổ hợp'], ['gs', 'Gió và sóng'], ['dd', 'Dao động, mỏi'], ['nm', 'Nền móng']];
const CONCEPTS = [
  /* ---- Tải và tổ hợp tải ---- */
  { g: 'tai', t: 'Tải đặc trưng và tải tính toán',
    d: 'Tải đặc trưng là giá trị tải dự kiến sẽ xảy ra. Tải tính toán là tải đặc trưng đã nhân hệ số an toàn γ<sub>f</sub> để có dự phòng. Ta thiết kế theo tải tính toán.',
    e: 'Cây cầu thật sự chịu được 10 tấn nhưng biển chỉ ghi 7 tấn. Con số 7 tấn là "tính toán", để chừa dư phòng.',
    a: 'Mô men đáy biển đặc trưng 305,9 MN·m, nhân 1,35 thành 412,9 MN·m.' },
  { g: 'tai', t: 'Trường hợp tải thiết kế (DLC)',
    d: 'Mỗi DLC là một "kịch bản" ghép hai thứ: tình trạng của tua bin (đang phát điện, đang dừng, đang đỗ, có sự cố...) và điều kiện môi trường (gió, sóng, dòng chảy). Ta tính tải cho nhiều kịch bản rồi lấy kịch bản gây tải lớn nhất cho từng kiểm tra.',
    e: 'Thử nghiệm một chiếc xe: chạy bình thường, phanh gấp, đỗ ngoài trời lúc bão. Mỗi kiểu thử là một kịch bản.',
    a: 'Bốn kịch bản trong app là 1.3, 1.6, 6.1 và 7.1. Kịch bản 6.1 (bão, rotor đỗ) chi phối: γ<sub>f</sub>·M = 536,2 MN·m.' },
  { g: 'tai', t: 'Tua bin vận hành và tua bin đỗ',
    d: 'Khi vận hành, cánh quay và hứng nhiều gió nên lực đẩy rotor lớn so với tốc độ gió, nhưng gió chỉ ở mức vừa phải (khoảng 11 m/s trong ví dụ). Khi đỗ trong bão, cánh chỉnh nghiêng nên lực đẩy rotor nhỏ, nhưng gió mạnh gấp nhiều lần và tải tỷ lệ với bình phương tốc độ gió nên tháp chịu nhiều hơn.',
    e: 'Giương ô đón gió nhẹ thì tay mỏi. Gấp ô lại trong bão thì ô nhỏ nhưng thân người vẫn chịu gió lớn.',
    a: 'Vận hành 11 m/s: lực rotor 1 863 kN. Bão 53,6 m/s, rotor đỗ: lực rotor 2 213 kN và gió lên tháp 514 kN.' },
  { g: 'tai', t: 'Gió thường, gió rối cực hạn, gió bão (NTM, ETM, EWM)',
    d: 'NTM là gió rối bình thường hằng ngày. ETM là gió rối mạnh bất thường khi tua bin đang vận hành. EWM là gió bão cực hạn khi tua bin đỗ.',
    e: 'Ngày thường (NTM), ngày gió giật mạnh (ETM), ngày có bão (EWM).' },
  { g: 'tai', t: 'Bốn trạng thái giới hạn: ULS, FLS, SLS, ALS',
    d: '<b>ULS (cực hạn):</b> một lần tải lớn nhất có làm hỏng không. <b>FLS (mỏi):</b> tải lặp đi lặp lại nhiều năm có làm nứt không. <b>SLS (sử dụng):</b> tua bin có nghiêng hay rung quá mức làm không dùng được không. <b>ALS (sự cố):</b> khi có sự cố bất thường thì kết cấu còn đứng được không.',
    e: 'Bẻ một cây thước nhựa cho gãy ngay (cực hạn). Bẻ qua lại nhẹ nhiều lần đến lúc nứt (mỏi). Thước bị cong không dùng được (sử dụng).' },
  { g: 'tai', t: 'Phá hủy lũy tiến (PLS)',
    d: 'Một bộ phận hỏng làm tải dồn sang bộ phận kế bên, rồi bộ phận kế bên hỏng tiếp, dẫn đến sập cả hệ. Thiết kế phải bảo đảm hỏng cục bộ không lan ra.',
    e: 'Quân domino đổ một quân kéo theo cả hàng.' },
  { g: 'tai', t: 'Hệ số an toàn riêng phần',
    d: 'Thay vì một hệ số chung, tiêu chuẩn tách riêng: hệ số cho tải (γ<sub>f</sub> = 1,35 tải thường, 1,1 tải bất thường, 1,5 khi thi công, 0,9 cho tải có lợi) và hệ số cho vật liệu (γ<sub>M</sub>). Mỗi nguồn bất định có hệ số phù hợp.',
    e: 'Lập ngân sách: dự phòng 35% cho khoản chi dễ vượt, 10% cho khoản ít biến động, thay vì cộng chung 25% cho mọi khoản.' },
  { g: 'tai', t: 'LRFD và WSD',
    d: '<b>WSD</b> (ứng suất cho phép) chia cường độ cho một hệ số chung, thường ứng suất cho phép khoảng 0,6·f<sub>y</sub>. <b>LRFD</b> (hệ số tải và sức kháng) nhân tải với hệ số và chia sức kháng cho hệ số riêng. IEC 61400-3-1 theo kiểu LRFD.',
    e: 'WSD giống "chỉ tải 60% sức chịu". LRFD giống "tăng tải lên một chút và giảm sức chịu đi một chút rồi so sánh".' },
  { g: 'tai', t: 'Tải tương đương và phân tích tựa tĩnh',
    d: 'Phần mềm mô phỏng tích hợp cho ra rất nhiều dữ liệu theo thời gian. Ta rút gọn thành vài giá trị lực và mô men lớn nhất, nhỏ nhất tại chân tháp (ma trận tải), rồi tính cấu kiện như bài toán tĩnh.',
    e: 'Phim quay cả trận đấu được tóm tắt thành bảng thống kê vài con số quan trọng.' },
  { g: 'tai', t: 'Chu kỳ lặp 50 năm',
    d: '"Chu kỳ lặp 50 năm" không có nghĩa 50 năm mới xảy ra một lần. Nó có nghĩa mỗi năm có xác suất 1/50 = 2% bị vượt. Trong 25 năm tuổi thọ, xác suất xảy ra ít nhất một lần là khoảng 40%.',
    e: 'Tung xúc xắc: ra mặt 6 mỗi lần xác suất 1/6, nhưng tung nhiều lần thì rất dễ gặp ít nhất một lần.' },

  /* ---- Gió và sóng ---- */
  { g: 'gs', t: 'Gió giật 3 giây và gió trung bình 10 phút',
    d: 'Tốc độ gió phụ thuộc vào ta lấy trung bình trong bao lâu. Trung bình 10 phút là mức IEC dùng. Gió giật 3 giây mạnh hơn nhiều vì chỉ là cú giật ngắn nhất. Số liệu bão ở Việt Nam hay ghi giật 3 giây nên phải quy đổi trước khi dùng.',
    e: 'Tốc độ xe: lúc đạp ga vọt lên 120 km/h trong vài giây khác với tốc độ trung bình cả chặng 80 km/h.',
    a: 'IEC chia cho hệ số giật 1,4: 75,05 m/s (3 giây) thành 53,6 m/s (10 phút). ISO 19901-1 cho 62,4 m/s.' },
  { g: 'gs', t: 'Hệ số giật',
    d: 'Là tỷ số giữa tốc độ gió giật 3 giây và tốc độ trung bình 10 phút tại cùng độ cao. IEC lấy 1,4. ISO 19901-1 tính từ cường độ rối và độ cao nên cho kết quả khác (nhỏ hơn 1,4 ở số liệu trong app, nên gió 10 phút tính ra lớn hơn).' },
  { g: 'gs', t: 'Tốc độ gió tham chiếu V<sub>ref</sub> và gió cực hạn V<sub>e50</sub>',
    d: 'V<sub>ref</sub> là tốc độ gió trung bình 10 phút có chu kỳ lặp 50 năm tại trục rotor. V<sub>e50</sub> = 1,4·V<sub>ref</sub> là giật 3 giây tương ứng, dùng cho phương pháp gió ổn định.',
    a: 'V<sub>ref</sub> = 53,6 m/s, V<sub>e50</sub> = 75,1 m/s tại 110 m.' },
  { g: 'gs', t: 'Hạng tua bin (I, II, III, S, T)',
    d: 'Hạng cho biết tua bin được thiết kế cho mức gió nào. Hạng I: V<sub>ref</sub> 50 m/s, II: 42,5, III: 37,5. Hạng S do nhà thiết kế tự quy định. Hạng T dành cho vùng bão nhiệt đới, V<sub>ref</sub> 57 m/s.',
    e: 'Giống áo mưa loại nhẹ, vừa, nặng, rồi loại đặt may riêng.',
    a: 'V<sub>ref</sub> 53,6 m/s vượt hạng I nên app báo gần hạng T hoặc S.' },
  { g: 'gs', t: 'Cường độ rối và phổ Kaimal',
    d: 'Gió không đều mà giật lên giật xuống. Cường độ rối đo mức giật cục này bằng độ lệch chuẩn chia tốc độ trung bình. Phổ Kaimal cho biết năng lượng của gió giật chủ yếu nằm ở tần số nào (chậm nhiều năng lượng, nhanh ít hơn).',
    e: 'Mặt đường êm thì xe ít xóc, đường ổ gà thì xóc liên tục. Cường độ rối giống "độ ổ gà" của gió.',
    a: 'I<sub>ref</sub> = 0,14, σ₁ = 1,94 m/s tại V = 11 m/s.' },
  { g: 'gs', t: 'Phân bố Weibull và Rayleigh',
    d: 'Là đường cong cho biết phần trăm thời gian gió nhỏ hơn hoặc bằng một tốc độ nào đó. Rayleigh là trường hợp đơn giản (k = 2), Weibull linh hoạt hơn nên khớp số liệu thực tốt hơn.',
    e: 'Thống kê điểm thi: bao nhiêu phần trăm học sinh được từ 5 điểm trở xuống.',
    a: 'Weibull A = 5,87, k = 1,709: xác suất gió ≤ 3 m/s là 27,2%.' },
  { g: 'gs', t: 'Profile gió (lũy thừa)',
    d: 'Gió càng lên cao càng mạnh vì ít bị mặt biển cản. Ta ước lượng bằng V(z) = V<sub>hub</sub>·(z/z<sub>hub</sub>)<sup>α</sup>. α ngoài khơi thường 0,14 khi bình thường và 0,11 khi bão.',
    e: 'Đứng dưới đất thấy gió nhẹ, lên tầng thượng thấy gió mạnh hơn.' },
  { g: 'gs', t: 'Chiều cao sóng H<sub>s</sub> và H<sub>max</sub>',
    d: '<b>H<sub>s</sub> (sóng có nghĩa)</b> là trung bình của một phần ba số sóng cao nhất, gần với chiều cao mà mắt người thường cảm nhận. <b>H<sub>max</sub></b> là con sóng cao nhất trong một cơn biển, thường bằng khoảng 1,6 đến 1,9 lần H<sub>s</sub>. Ta dùng H<sub>max</sub> để tính tải cực hạn.',
    e: 'Trong lớp, H<sub>s</sub> như chiều cao trung bình của nhóm học sinh cao nhất, còn H<sub>max</sub> là bạn cao nhất lớp.',
    a: 'H<sub>s</sub> = 6,26 m, hệ số 1,647, H<sub>max</sub> = 10,31 m.' },
  { g: 'gs', t: 'Chu kỳ sóng T<sub>p</sub> và T<sub>z</sub>',
    d: 'T<sub>p</sub> là chu kỳ ứng với đỉnh phổ (sóng chiếm nhiều năng lượng nhất). T<sub>z</sub> là chu kỳ trung bình khi cắt qua mực nước, xấp xỉ T<sub>p</sub>/1,28. Chu kỳ quyết định bước sóng và vận tốc hạt nước.' },
  { g: 'gs', t: 'Phổ sóng và biểu đồ phân tán',
    d: 'Phổ sóng (JONSWAP, Pierson–Moskowitz) cho biết năng lượng sóng phân bố theo tần số. Biểu đồ phân tán là bảng đếm tần suất xuất hiện của từng cặp H<sub>s</sub>–T<sub>p</sub> trong nhiều năm, dùng để tính mỏi.',
    e: 'Phổ giống bảng cân bằng âm thanh của loa (bass, treble). Biểu đồ phân tán giống bảng thống kê "tháng nào mưa bao nhiêu".' },
  { g: 'gs', t: 'Phương trình Morison',
    d: 'Dùng cho trụ nhỏ so với bước sóng (D/L &lt; 0,2). Lực sóng gồm hai phần: lực cản (nước chảy qua đẩy vào trụ, tỷ lệ bình phương vận tốc) và lực quán tính (nước tăng tốc mà phải đẩy khối nước quanh trụ, tỷ lệ gia tốc).',
    e: 'Thò tay ra cửa xe đang chạy: gió đẩy mạnh tỷ lệ với tốc độ xe (cản). Đạp ga tăng tốc thì bạn bị ghế đẩy tới (quán tính).' },
  { g: 'gs', t: 'Hệ số C<sub>D</sub> và C<sub>M</sub>',
    d: 'C<sub>D</sub> (hệ số cản) và C<sub>M</sub> (hệ số quán tính) điều chỉnh công thức Morison cho đúng với thực tế. Trụ nhám do sinh vật bám có C<sub>D</sub> lớn hơn trụ nhẵn. API và bài giảng dùng C<sub>D</sub> = 1,05, C<sub>M</sub> = 1,2 cho trụ nhám.' },
  { g: 'gs', t: 'Dòng chảy và tác động lên lực sóng',
    d: 'Dòng chảy (thủy triều và do gió) cộng vận tốc vào vận tốc hạt nước của sóng. Vì lực cản tỷ lệ bình phương vận tốc nên cộng thêm dòng chảy làm lực tăng đáng kể, dù dòng chảy chỉ khoảng 1 m/s.',
    a: 'Lực sóng tăng từ 2 884 kN lên 3 232 kN (khoảng 12%) với dòng chảy giả định 0,6 và 0,4 m/s.' },
  { g: 'gs', t: 'Sóng vỡ và tải xung kích',
    d: 'Ở nước nông, sóng quá cao sẽ vỡ (khoảng 0,78 lần độ sâu, hoặc thấp hơn theo Goda). Khi sóng vỡ đập vào trụ, tải rất lớn nhưng chỉ trong thời gian ngắn như một cú đập (xung kích), cộng thêm vào tải Morison.',
    e: 'Chầm chậm đưa tay vào nước thì nhẹ, còn tát nước mạnh thì thấy một cú đập mạnh tức thì.',
    a: 'H = 10,31 m bằng 0,75 giới hạn Goda (13,8 m) nên chưa vỡ.' },
  { g: 'gs', t: 'Số Ursell và lý thuyết sóng',
    d: 'Số Ursell U<sub>r</sub> = H·L²/d³ cho biết sóng có "méo" (phi tuyến) nhiều không. U<sub>r</sub> nhỏ thì sóng gần hình sin (lý thuyết Airy đủ dùng). U<sub>r</sub> lớn thì đỉnh sóng nhọn, đáy phẳng, cần lý thuyết cao hơn như Stokes bậc cao hay hàm dòng.',
    a: 'U<sub>r</sub> = 9,5, H/d = 0,41: nên dùng hàm dòng bậc cao.' },
  { g: 'gs', t: 'Sinh vật bám',
    d: 'Hà, rong và các sinh vật khác bám vào chân móng làm đường kính hiệu dụng lớn hơn, bề mặt nhám hơn và nặng thêm. Ba hệ quả: lực sóng lớn hơn, C<sub>D</sub> lớn hơn và tần số riêng giảm nhẹ.',
    a: 'Mỗi phía 50 mm, đường kính thủy động 8,1 m thay vì 8 m.' },

  /* ---- Dao động và mỏi ---- */
  { g: 'dd', t: 'Tần số riêng',
    d: 'Là tần số mà kết cấu tự dao động khi bị đẩy một cái rồi thả ra. Tần số riêng phụ thuộc độ cứng (cứng thì dao động nhanh) và khối lượng (nặng thì dao động chậm). Tua bin gió là một cột dài mang khối lượng lớn trên đỉnh nên tần số riêng thấp, khoảng 0,2 Hz (một vòng mỗi 5 giây).',
    e: 'Búng cây thước nhựa kẹp ở mép bàn: thước ngắn dao động nhanh, thước dài đung đưa chậm.',
    a: 'f₁ = 0,203 Hz (chu kỳ 4,92 s), f₂ = 1,007 Hz.' },
  { g: 'dd', t: '1P và 3P',
    d: '<b>1P</b> là tần số quay của rotor (số vòng mỗi giây). <b>3P</b> là tần số mỗi cánh đi ngang qua tháp, gấp ba lần 1P vì có ba cánh. Cả hai tạo ra lực kích thích có chu kỳ lên kết cấu, nên tần số riêng không được trùng với chúng.',
    e: 'Ba cánh quạt trần quay: mỗi lần một cánh quét qua một điểm, ta thấy bóng nhấp nháy ba lần mỗi vòng.',
    a: 'Rotor 5 đến 9 vòng/phút: 1P = 0,083–0,150 Hz, 3P = 0,250–0,450 Hz.' },
  { g: 'dd', t: 'Cộng hưởng',
    d: 'Khi lực kích thích có tần số trùng tần số riêng, mỗi lần đẩy cộng thêm vào lần trước làm biên độ dao động tăng rất nhanh, rất nguy hiểm cho kết cấu.',
    e: 'Đẩy xích đu đúng nhịp thì xích đu lên rất cao dù đẩy nhẹ.' },
  { g: 'dd', t: 'Soft-soft, soft-stiff, stiff-stiff',
    d: 'Gọi tên vị trí của tần số riêng so với dải 1P và 3P. <b>Soft-soft:</b> thấp hơn 1P (rất mềm). <b>Soft-stiff:</b> nằm giữa 1P và 3P (phổ biến nhất). <b>Stiff-stiff:</b> cao hơn 3P (rất cứng, tốn thép). Nhà thiết kế tránh để tần số riêng rơi trong dải 1P và 3P, chừa biên khoảng ±10%.',
    a: 'f₁ = 0,203 Hz nằm giữa dải 1P (đến 0,165) và 3P (từ 0,225): soft-stiff.' },
  { g: 'dd', t: 'Biểu đồ Campbell',
    d: 'Biểu đồ vẽ tần số riêng (đường nằm ngang) cùng các đường 1P, 3P (đường chéo, tăng theo tốc độ quay). Nơi đường cắt nhau là chỗ có nguy cơ cộng hưởng. Dùng để chọn dải tốc độ quay cần tránh.' },
  { g: 'dd', t: 'Tần số riêng thứ hai và dạng dao động',
    d: 'Ngoài dao động cơ bản (cả cột lắc qua lại một dạng), cột còn dao động ở các dạng cao hơn (có điểm uốn giữa cột) với tần số cao hơn. Tua bin lớn cần kiểm tra cả tần số thứ hai, không chỉ f₁.',
    e: 'Sợi dây đàn: dạng cơ bản là một bụng sóng, dạng thứ hai có hai bụng và cao tiếng hơn.' },
  { g: 'dd', t: 'Rung do xoáy (VIV)',
    d: 'Khi dòng chảy đi qua trụ, phía sau trụ sinh ra các xoáy luân phiên hai bên, đẩy trụ lắc ngang. Nếu tần số tách xoáy gần tần số riêng của trụ thì sinh cộng hưởng. Đại lượng kiểm tra là vận tốc rút gọn U<sub>r</sub> = U/(f·D).',
    e: 'Cờ bay phần phật trong gió, hay dây điện ngân vang lúc có gió.',
    a: 'U<sub>r</sub> = 0,61, dưới vùng nguy cơ (4 đến 10).' },
  { g: 'dd', t: 'Mỏi, đường cong S–N và quy tắc Miner',
    d: 'Thép chịu tải lặp nhiều lần sẽ nứt dù mỗi lần tải nhỏ hơn nhiều so với giới hạn chảy. Đường cong S–N cho biết ứng với biên độ ứng suất S thì chịu được bao nhiêu chu kỳ N. Quy tắc Miner cộng hư hỏng của mọi mức biên độ: D = Σ n<sub>i</sub>/N<sub>i</sub>. D đạt 1 là coi như hỏng.',
    e: 'Bẻ qua bẻ lại một sợi dây thép: vài lần chưa sao, hàng chục lần thì gãy.',
    a: 'D = 0,164, tuổi thọ mỏi tính được khoảng 51 năm.' },
  { g: 'dd', t: 'Hệ số hư hỏng DFF',
    d: 'Là hệ số an toàn riêng cho mỏi: ta yêu cầu D ≤ 1/DFF. DFF lớn hơn (2 đến 3) cho chi tiết khó kiểm tra hoặc hỏng thì hậu quả nặng.',
    a: 'D·DFF = 0,164 × 3 = 0,49, nhỏ hơn 1 nên đạt.' },
  { g: 'dd', t: 'Điểm nóng và hệ số tập trung ứng suất (SCF)',
    d: 'Tại mối hàn, chỗ đổi tiết diện hay nút ống, ứng suất cục bộ cao hơn ứng suất trung bình. SCF là số lần cao hơn. Vết nứt mỏi thường bắt đầu ở các điểm nóng này.',
    e: 'Tờ giấy rách từ chỗ có vết cắt nhỏ. Vết cắt làm lực dồn tập trung ở đầu vết.',
    a: 'SCF = 1,5.' },
  { g: 'dd', t: 'Đếm chu kỳ rainflow',
    d: 'Phương pháp đếm các chu kỳ ứng suất từ một chuỗi dao động bất kỳ, tách thành các vòng chịu tải riêng (biên độ và số lần), để dùng với đường cong S–N và Miner.' },
  { g: 'dd', t: 'Phổ phản ứng động đất',
    d: 'Đồ thị cho biết gia tốc cực đại mà một kết cấu dao động có chu kỳ T sẽ chịu khi động đất, tính theo gia tốc nền. Kết cấu chu kỳ dài (mềm) chịu gia tốc nhỏ hơn.',
    a: 'T₁ = 4,92 s nên S<sub>A</sub>/a<sub>g</sub> chỉ 0,24. Động đất bằng khoảng 9% tải gió và sóng.' },

  /* ---- Nền móng ---- */
  { g: 'nm', t: 'Ngàm giả định (độ sâu ngàm tương đương)',
    d: 'Thực tế cọc nằm trong đất đàn hồi, rất khó tính. Để tính tần số, ta thay nền đất bằng một "chỗ kẹp cứng" ở độ sâu L<sub>d</sub> dưới đáy biển: 3,5 đến 4,5 D với sét, 7,0 đến 8,5 D với đất mềm, 6 D nếu không có số liệu.',
    e: 'Cắm cây cọc vào cát: phần dưới sâu coi như đứng yên, phần phía trên mới lắc. Ta coi điểm đứng yên là cố định ở chỗ cách mặt một đoạn.',
    a: 'Mặc định 30 m, tức 3,75 D.' },
  { g: 'nm', t: 'Đường cong p–y, t–z và Q–z',
    d: '<b>p–y:</b> quan hệ giữa phản lực đất ngang p và chuyển vị ngang y của cọc. <b>t–z:</b> ma sát dọc cọc theo chuyển vị dọc. <b>Q–z:</b> sức chịu mũi theo chuyển vị mũi. Đất không phải lò xo thẳng: đẩy càng nhiều thì phản lực tăng chậm dần rồi đạt giới hạn.',
    e: 'Ấn ngón tay vào đất sét: ban đầu cứng, ấn sâu thì lún mà phản lực không tăng thêm.' },
  { g: 'nm', t: 'Cọc trên nền Winkler',
    d: 'Mô hình xem cọc là một dầm đàn hồi đặt trên rất nhiều lò xo độc lập (đại diện cho đất, theo đường cong p–y). Giải ra được độ võng, góc xoay đầu cọc và mô men uốn dọc cọc.' },
  { g: 'nm', t: 'Phương pháp Broms (kiểm tra nhanh chiều sâu chôn)',
    d: 'Cách tính tay, giả thiết áp lực đất bị động đạt giới hạn, để ước lượng chiều dài chôn cọc tối thiểu chịu tải ngang. Dùng để kiểm tra nhanh kết quả của p–y.',
    a: 'Chiều sâu cần ≈ 18,2 m, nhỏ hơn 30 m chôn thực tế.' },
  { g: 'nm', t: 'Xói chân móng',
    d: 'Dòng nước và sóng bào đất quanh chân móng làm lõm hố xói. Hố xói làm đất bớt giữ cọc nên cọc mềm hơn, tần số giảm. Biện pháp: rải đá hộc bảo vệ hoặc tính sẵn độ xói vào thiết kế.',
    e: 'Nước chảy quanh trụ cầu làm lòng sông sâu xuống quanh chân trụ.',
    a: 'Xói cân bằng ước tính 1,3 D ≈ 10,4 m.' },
  { g: 'nm', t: 'Độ lệch tâm và điều kiện lõi D/8',
    d: 'Móng trọng lực chịu tải đứng V và mô men M. Hợp lực lệch khỏi tâm một đoạn e = M/V. Nếu e ≤ D/8 (với đế tròn) thì hợp lực nằm trong "lõi", toàn bộ đáy còn ép lên nền. Ra ngoài lõi thì một phần đáy bị hở.',
    e: 'Đứng trên đôi giày: dồn trọng lượng ra mép trước thì gót hở lên.',
    a: 'e = 3,40 m, nhỏ hơn D/8 = 4,5 m.' },
  { g: 'nm', t: 'Diện tích hữu hiệu',
    d: 'Khi tải lệch tâm, phần đáy móng thực sự chịu lực nhỏ hơn diện tích đáy. Phần còn "hữu hiệu" này dùng để tính sức chịu tải của nền.',
    a: 'Đế 36 m có diện tích hữu hiệu 775 m².' },
  { g: 'nm', t: 'Hệ số an toàn sức chịu tải, trượt, lật',
    d: 'Tỷ số sức kháng chia tải. <b>Sức chịu tải:</b> nền có bị phá hoại không. <b>Trượt:</b> móng có bị đẩy ngang không. <b>Lật:</b> móng có bị lật quanh mép không. Mỗi loại có yêu cầu tối thiểu (ví dụ ≥ 2,5 và ≥ 1,5).',
    a: 'Sức chịu tải 28,6, trượt 8,2, lật 5,3.' },
  { g: 'nm', t: 'Sức kháng nhổ của cọc jacket',
    d: 'Chân jacket chịu lực nhổ khi mô men lật lớn. Cọc chống nhổ nhờ ma sát bên thành cọc (cát: tỷ lệ với áp lực đất; sét: tỷ lệ với cường độ cắt không thoát nước) cộng trọng lượng cọc. Mũi cọc không giúp chống nhổ.',
    e: 'Nhổ cọc tre cắm sâu: càng cắm sâu càng khó nhổ vì ma sát hai bên.',
    a: 'Chân nhổ 3 102 kN, cần cọc dài ≈ 21,4 m.' },
  { g: 'nm', t: 'Ổn định vỏ ống và tỷ số D/t',
    d: 'Ống thép đường kính lớn mà thành mỏng (D/t lớn) có thể bị móp, nhăn cục bộ (mất ổn định vỏ) trước khi thép chảy. Cần kiểm tra thêm điều này ngoài ứng suất.',
    e: 'Lon nước ngọt rỗng chịu nén dọc rất khỏe nếu giữ thẳng, nhưng chỉ cần bóp một chỗ là móp cả lon.',
    a: 'D/t = 104, hệ số sử dụng ổn định 0,49 ở DLC 6.1.' },
  { g: 'nm', t: 'Hệ số sử dụng',
    d: 'Là tỷ số tải (hoặc ứng suất) chia cho khả năng chịu. Nhỏ hơn 1 là đạt. Gần 1 là sát giới hạn, nhỏ như 0,2 là thừa nhiều, có thể giảm kích thước.',
    e: 'Thang máy chở 8 người, hôm nay có 4 người: hệ số sử dụng 50%.',
    a: 'Monopile 39%, jacket 19%.' },
  { g: 'nm', t: 'Lún, xoay và giới hạn sử dụng',
    d: 'Dù không hỏng, móng không được lún hay nghiêng quá mức vì tua bin cần đứng thẳng. Giới hạn thường dùng là góc xoay 0,25° (khoảng 4 mm mỗi mét chiều cao).',
    a: 'Xoay monopile 0,143°, móng trọng lực 0,041°.' },
  { g: 'nm', t: 'Vùng văng bắn và chống ăn mòn',
    d: 'Vùng văng bắn là vùng sóng đập vào, lúc ướt lúc khô, nên ăn mòn nhanh nhất. Chống ăn mòn bị động là sơn phủ cách ly. Chống chủ động là bảo vệ catốt: dùng anốt hy sinh (nhôm, kẽm bị ăn thay thép) hoặc dòng điện cưỡng bức.',
    e: 'Chiếc xe đạp để ngoài mưa nắng và bị bắn nước mặn ở biển sẽ gỉ nhanh hơn xe cất trong nhà.' }
  ,{ g: 'gs', t: 'Lý thuyết động lượng và hệ số cảm ứng a',
    d: 'Coi rotor như một cái đĩa lấy bớt tốc độ của gió. Gió đi qua đĩa chậm lại một phần a so với tốc độ ban đầu, phía sau còn chậm hơn nữa (1 − 2a). Từ đó tính được lực đẩy lên rotor và công suất.',
    e: 'Đưa bàn tay ra cửa sổ xe đang chạy: gió bị tay cản lại và tay bị đẩy ra sau. Tay càng cản nhiều thì gió phía sau càng yếu.',
    a: 'a = 0,20 thì gió qua rotor còn 0,80 V₀ và phía sau còn 0,60 V₀.' },
  { g: 'gs', t: 'Giới hạn Betz',
    d: 'Rotor không thể lấy hết năng lượng gió vì gió sau rotor vẫn phải thoát đi. Tối đa chỉ lấy được 16/27 khoảng 59,3% năng lượng, ứng với a = 1/3.',
    e: 'Như đập chắn dòng sông: chắn kín hoàn toàn thì nước không chảy qua nữa, đập chẳng tạo được dòng nào để lấy năng lượng.',
    a: 'Tại Betz, hệ số lực đẩy C<sub>T</sub> = 8/9 khoảng 0,89.' },
  { g: 'gs', t: 'Lý thuyết BEM',
    d: 'Chia cánh thành nhiều đoạn nhỏ. Mỗi đoạn vừa phải khớp với lực nâng và lực cản của mặt cắt cánh, vừa phải khớp với bảo toàn động lượng. Hai bên phụ thuộc lẫn nhau nên phải tính lặp cho đến khi kết quả ổn định.',
    e: 'Như cân bằng sổ chi tiêu: sửa một khoản làm khoản khác đổi, phải chỉnh qua chỉnh lại đến khi hai bên khớp.',
    a: 'Ứng dụng dùng C<sub>T</sub> cho trước, không chạy BEM.' },
  { g: 'gs', t: 'Cut-in, định mức và cut-out',
    d: 'Cut-in là tốc độ gió tuabin bắt đầu phát điện. Định mức là tốc độ gió đạt công suất tối đa, trên mức này tuabin xoay cánh để giữ công suất. Cut-out là tốc độ gió quá lớn, tuabin dừng và đỗ.',
    e: 'Như quạt máy có ba nấc: gió nhẹ chưa quay, gió vừa quay hết cỡ, gió bão thì tắt để khỏi hỏng.',
    a: 'Lực đẩy lớn nhất thường xảy ra gần tốc độ định mức.' },
  { g: 'gs', t: 'Nghiêng trục, xoay hướng và xoay cánh',
    d: 'Nghiêng trục (tilt) là độ ngửa của trục rotor để cánh không chạm tháp. Xoay hướng (yaw) là xoay cả nacelle đón gió. Xoay cánh (pitch) là xoay từng cánh quanh trục dọc cánh để tăng giảm lực gió.',
    e: 'Như cánh quạt thuyền buồm: xoay buồm để đón hay né gió.',
    a: 'Khi đỗ bão, cánh xoay về vị trí feather để giảm tải.' },
  { g: 'dd', t: 'Tải 1P và 3P',
    d: 'Tải 1P lặp lại mỗi vòng quay của rotor do mất cân bằng khối lượng hoặc khí động. Tải 3P lặp lại ba lần mỗi vòng do mỗi cánh đi qua trước tháp thì gió lên tháp giảm một nhịp. Cần tránh tần số riêng của tháp trùng 1P hoặc 3P.',
    e: 'Đẩy xích đu đúng nhịp thì xích đu lắc rất mạnh. Tải lặp theo nhịp trùng tần số riêng cũng làm cấu kiện rung mạnh.',
    a: 'Rotor 11 rpm có 1P = 0,183 Hz và 3P = 0,55 Hz.' },
  { g: 'gs', t: 'Số Keulegan–Carpenter (KC)',
    d: 'KC cho biết nước chuyển động bao xa so với cỡ của trụ trong một nhịp sóng. KC nhỏ thì nước gần như chỉ lắc quanh trụ, lực quán tính chi phối. KC lớn thì nước tạo xoáy sau trụ, lực cản chi phối. Hệ số C<sub>D</sub> và C<sub>m</sub> thay đổi theo KC.',
    e: 'Đứng giữa dòng người: nếu người chỉ đẩy nhẹ qua lại thì bạn chủ yếu bị xô, nếu dòng người lao hẳn qua thì bạn bị cuốn đi.',
    a: 'Trụ D = 8 m, sóng 2,5 m nên KC nhỏ, quán tính lớn gấp hơn 10 lần cản.' },
  { g: 'gs', t: 'Sóng tương tác với dòng chảy',
    d: 'Dòng chảy cùng chiều làm sóng dài ra, dòng ngược chiều làm sóng ngắn lại và dốc hơn. Vận tốc nước tổng là vận tốc sóng cộng vận tốc dòng, rồi mới đưa vào số hạng cản.',
    e: 'Chèo thuyền xuôi dòng thì mỗi nhịp chèo đi được xa hơn, ngược dòng thì ngắn lại.',
    a: 'Dòng 0,5 m/s cộng với vận tốc sóng 1,02 m/s thành 1,52 m/s tại mặt nước.' },
  { g: 'tai', t: 'Bộ tải đồng thời',
    d: 'Kiểm tra móng phải dùng đủ các thành phần lực (N, V<sub>x</sub>, V<sub>y</sub>, M<sub>x</sub>, M<sub>y</sub>, T) xảy ra tại cùng một thời điểm trong mô phỏng. Không được lấy giá trị lớn nhất của từng thành phần từ các thời điểm khác nhau rồi ghép lại.',
    e: 'Chụp ảnh nhóm phải chụp một lần cho cả nhóm, không ghép mặt đẹp nhất của từng người vào một tấm.',
    a: 'Tổ hợp V<sub>d</sub> = √(V<sub>x</sub>² + V<sub>y</sub>²), M<sub>b,d</sub> = √(M<sub>x</sub>² + M<sub>y</sub>²), UR = 0,84.' },
  { g: 'tai', t: 'Mức tải dịch vụ S1, S2, S3',
    d: 'Với trạng thái sử dụng SLS, hệ số tải γ<sub>f</sub> = 1,0 và đánh giá theo ba mức: S1 là tải đặc trưng thấy ở vận hành, S2 là tải thường xuyên rất hiếm vượt, S3 là tải gần như thường trực. Mỗi mức đi với giới hạn chuyển vị, độ nghiêng, gia tốc tương ứng.',
    e: 'Như sàn nhà: người đi bình thường, bữa tiệc đông người, và đồ nội thất đặt cố định là ba mức tải khác nhau để kiểm tra độ võng.',
    a: 'Độ nghiêng móng θ ≤ θ<sub>allow</sub>, gia tốc a<sub>rms</sub> ≤ a<sub>allow</sub>.' },
  { g: 'tai', t: 'Cánh tay mô men tại đáy biển',
    d: 'Mô men tại mudline bằng lực nhân khoảng cách từ điểm đặt lực đến mudline. Lực gió đặt trên cao nên phải cộng thêm độ sâu nước vào cánh tay đòn.',
    e: 'Tay cầm cờ lê càng dài thì mở bu lông càng dễ. Cùng một lực nhưng đặt càng cao thì mô men tại gốc càng lớn.',
    a: 'Lực đẩy 1,60 MN tại 110 + 30 = 140 m cho khoảng 224 MN·m.' }
];

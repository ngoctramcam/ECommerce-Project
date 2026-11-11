## AI-01 – <tên việc ngắn gọn>

- **Ngày / Người dùng AI:** 10/11/2026 – TV3
- **Công cụ AI:** Gemini, Figma AI
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] Wireframe – docs

### 1. Mục đích

Nhờ AI gợi ý bố cục trang danh sách sách có tìm kiếm, lọc, phân trang, hiển
thị tốt trên điện thoại.

### 2. Prompt đã dùng

> Gợi ý bố cục trang danh sách sách có tìm kiếm, lọc, phân trang, hiển thị tốt trên điện thoại. cách Prompt Frame cho 6 trang bắt buộc: Trang chủDanh sách sách & Tìm kiếmChi tiết sáchGiỏ hàng Đặt hàng / Thanh toánTrang Quản trị (Admin) tao framework cho destop và mobile trên ai figma

### 3. Kết quả AI trả về (tóm tắt)

AI gợi ý bố cục giao diện và cấu trúc prompt cho từng màn hình

### 4. Phần giữ lại

- Giữ lại toàn bộ cấu trúc bố cục 6 cặp màn hình (Desktop & Mobile) do AI gợi ý: Trang chủ, Tìm kiếm & Lọc, Chi tiết sách, Giỏ hàng, Đặt hàng/Thanh toán, Trang Quản trị.
- ...

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Bỏ: Loại bỏ lựa chọn "danh sách các phương thức thanh toán" trên màn hình Thanh toán.
- Chỉnh sửa: Chỉ giữ lại duy nhất phương thức **Thanh toán khi nhận hàng (COD)**.
- Lý do: Theo tài liệu Đặc tả yêu cầu đề tài Thương mại điện tử (mã TM-06), ứng dụng ở mức Bắt buộc chỉ áp dụng hình thức COD.

### 6. AI sai hoặc chưa chắc chắn ở đâu

AI gợi ý thêm thanh toán bằng ngân hàng, nhưng đề chỉ có COD

### 7. Cách kiểm chứng

Đối chiếu trực tiếp với tài liệu "Đặc tả yêu cầu 6 đề tài mẫu" tại mục A1 & A2 (mã chức năng TM-06).

### 8. Sản phẩm cuối cùng

## Link commit/PR: d1fa26b5cdb9a3b26ccc8591a3b4d2a99ab7ee59

---

## AI-02 – <Hoàn thiện wireframe 6 màn hình có chú thích các thành phần.>

- **Ngày / Người dùng AI:** 10/11/2026 – TV3
- **Công cụ AI:** Gemini,Figma AI
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] Wireframe

### 1. Mục đích

Nhờ AI gợi ý prompt xóa banner chỉnh lại Trang chủ ở figma và gợi ý chú thích cho các thành phần ở wireframe.

### 2. Prompt đã dùng

> prom lam sao cho figma k có banner nx va goi y chu thich cac thanh phan cho 6 trang wireframe (kèm tệp hình ảnh 6 màn hình)

### 3. Kết quả AI trả về (tóm tắt)

AI gợi ý cấu trúc prompt để xóa banner và chú thíchd chi tiết cho các khối thành phần trên từng màn hình

1. Câu lệnh (Prompt) để xóa Banner trên Figma
   Để xóa khối Banner ("Tháng đọc sách..."), bạn nhấp chọn cả 2 Frame Trang chủ - Máy tính và Trang chủ - Di động, sau đó dán một trong các câu lệnh sau vào khung Ask for changes ở góc dưới bên trái màn hình

### 4. Phần giữ lại

- Giữ lại toàn bộ
- ...

### 5. Phần loại bỏ / chỉnh sửa và lý do

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: https://www.figma.com/design/9y5SezznOTU3EHgy4bsjCg%C4%90%E1%BB%93-%C3%A1n-WEB?node-id=0-1&p=f&t=yGS0fonpJ8x85MAD-0

---

## AI-03 – <Dựng layout chung:>

- **Ngày / Người dùng AI:** 10/11/2026 – TV3
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** TM-01: Trang chủ – feature

### 1. Mục đích

Nhờ AI giải thích ý nghĩa yêu cầu 2 và hướng dẫn cách thực hiện

### 2. Prompt đã dùng

> Dựng layout chung: header (logo, ô tìm kiếm, giỏ hàng, đăng nhập), menu danh mục,footer; responsive cơ bản. y nghia cua yeu cau nay la sao hay huong dan tui lam boc nay

### 3. Kết quả AI trả về (tóm tắt)

AI gợi giải thích ý nghĩa của yêu cầu và hướng dẫn cách thực hiện.

BƯỚC 2: Phân tích các phần của Layout (Theo Wireframe Mộc Sách)Layout mẫu của chúng ta gồm 4 khối chính: Top Bar (Desktop): Thông báo miễn phí giao hàng + Hotline 1900 6868. Header chính: Logo Mộc Sách, ô tìm kiếm "Tìm sách, tác giả...", nút Tài khoản và Giỏ hàng (3). Navigation Menu (Desktop): Danh mục sách, Trang chủ, Sách bán chạy, Sách mới, Khuyến mãi, Góc tác giả. Footer: Thông tin thương hiệu, hỗ trợ khách hàng, địa chỉ, bản quyền 2026. Bottom Navigation (Mobile): Thanh menu dính cố định dưới đáy màn hình điện thoại (Trang chủ, Danh mục, Giỏ hàng, Tài khoản)  
BƯỚC 3: Dựng mã mẫu Layout (ReactJS + Tailwind CSS)
Tạo tệp layout chung tại đường dẫn src/layouts/MainLayout.jsx (hoặc src/components/MainLayout.jsx)......

### 4. Phần giữ lại

Giữ lại phần phân tích cấu trúc 4 khối chính của Layout Mộc Sách (TopBar, Header chính, Navigation Menu, Footer và BottomNav cố định trên Mobile).

### 5. Phần loại bỏ / chỉnh sửa và lý do

Loại bỏ: Loại bỏ cách dồn tất cả code Header, Menu, Footer vào chung 1 file duy nhất như gợi ý ban đầu của AI.

Chỉnh sửa: Tổ chức mã nguồn thành các cây thư mục riêng biệt (components/, layouts/, pages/) trong resources/js/.

Lý do: Để dễ quản lý và dễ làm việc nhóm.

### 6. AI sai hoặc chưa chắc chắn ở đâu

-AI ban đầu gợi ý viết gộp tất cả thành phần TopBar, Header, Navigation Menu và Footer trong 1 file layout duy nhất.

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

## Link commit/PR:https://github.com/ngoctramcam/ECommerce-Project/tree/feature/resources

---

## AI-04 – <Tạo trang mẫu dùng layout để cả nhóm tái sử dụng.>

- **Ngày / Người dùng AI:** 10/11/2026 – TV3
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** TM-01: Trang chủ – feature

### 1. Mục đích

Nhờ AI giải thích ý nghĩa yêu cầu 3 và hướng dẫn cách thực hiện

### 2. Prompt đã dùng

> Cho biet y nghia va huong dan lai cach lam yeu cau Tạo trang mẫu dùng layout để cả nhóm tái sử dụng.

### 3. Kết quả AI trả về (tóm tắt)

AI gợi giải thích ý nghĩa của yêu cầu và hướng dẫn cách thực hiện.

- ý nghĩa
  "Tạo trang mẫu dùng layout để cả nhóm tái sử dụng" nghĩa là: Bạn tạo sẵn 1 file trang khung chuẩn đã căn sẵn lề, khoảng cách và tự động có sẵn Header/Footer. Các thành viên trong nhóm chỉ cần copy file đó ra để làm trang của mình (như Trang Giỏ hàng, Trang Chi tiết sản phẩm, Trang Danh mục) mà không phải làm lại từ đầu.

- hướng dẫn cách thực hiện
  Bước 1: Tạo trang mẫu PageTemplate.jsx
  Trong thư mục resources/js/pages/, tạo file mới tên là PageTemplate.jsx

### 4. Phần giữ lại

- Giữ lại toàn bộ

### 5. Phần loại bỏ / chỉnh sửa và lý do

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR:https://github.com/ngoctramcam/ECommerce-Project/tree/feature/resources

## AI-01 – <tên việc ngắn gọn>

- **Ngày / Người dùng AI:** 10/11/2026 – TV3
- **Công cụ AI:** Gemini (ghi rõ tên và phiên bản nếu biết)
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] Wireframe – docs/wireframe

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

Link commit/PR: d1fa26b5cdb9a3b26ccc8591a3b4d2a99ab7ee59

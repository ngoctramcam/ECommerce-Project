## AI-01 – <Khung markdown decuong>

- **Ngày / Người dùng AI:** 9/11/2026 – TV1
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] Đề cương - docs/de-cuong

### 1. Mục đích

Nhờ AI hướng dẫn khung markdown decuong.md

### 2. Prompt đã dùng

> Hãy thiết kế khung markdown phần decuong.md theo đúng tài liệu đặc tả (Nhóm 4 thành viên)

### 3. Kết quả AI trả về (tóm tắt)

# ĐỀ CƯƠNG ĐỒ ÁN LẬP TRÌNH WEB

## 1. Thông tin chung

- **Tên đề tài:** Website Thương mại điện tử bán sách
- **Nhóm:** Nhóm XX
- **Số thành viên:** 4
- **Môn học:** Đồ án Lập trình Web
- **Giảng viên:** Lữ Cao Tiến
- **Thời gian thực hiện:** 3 tuần (6 buổi học)

---

## 2. Mô tả đề tài

Xây dựng website bán sách trực tuyến cho phép khách hàng tìm kiếm, xem chi tiết sách, thêm vào giỏ hàng và đặt hàng. Hệ thống hỗ trợ quản trị sản phẩm, danh mục và theo dõi đơn hàng.

---

## 3. Công nghệ sử dụng

### Backend

- Laravel 10+

### Frontend

- Blade + Bootstrap 5

### Cơ sở dữ liệu

- MySQL

### Công cụ quản lý dự án

- Trello

### Quản lý mã nguồn

- Git & GitHub

---

## 4. Thành viên và phân công

| Thành viên | Vai trò                       | Chức năng phụ trách                                          |
| ---------- | ----------------------------- | ------------------------------------------------------------ |
| TV1        | Trưởng nhóm (PM/Scrum Master) | Quản lý dự án, tài liệu, TM-14, TM-08                        |
| TV2        | Backend Lead                  | TM-04, TM-06, API, nghiệp vụ đặt hàng                        |
| TV3        | Frontend Lead                 | TM-01, TM-02, TM-03, giao diện người dùng                    |
| TV4        | Database & QA                 | TM-05, TM-07, TM-11, TM-12, TM-13, thiết kế CSDL và kiểm thử |

---

## 5. Chức năng bắt buộc

### Nhóm chức năng người dùng

- TM-01: Xem danh sách sách
- TM-02: Tìm kiếm sách
- TM-03: Xem chi tiết sách
- TM-04: Đăng ký / Đăng nhập
- TM-05: Quản lý hồ sơ cá nhân
- TM-06: Đặt hàng
- TM-07: Xem lịch sử đơn hàng
- TM-08: Quản lý giỏ hàng

### Nhóm chức năng quản trị

- TM-11: Quản lý danh mục sách
- TM-12: Quản lý sản phẩm (sách)
- TM-13: Quản lý đơn hàng
- TM-14: Thống kê cơ bản

---

## 6. Phạm vi hệ thống

### Người dùng

### Quản trị viên

## 7. Thiết kế cơ sở dữ liệu dự kiến

### Bảng chính

## 8. Kiến trúc hệ thống

### 4. Phần giữ lại

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Sửa: sửa tên TM-05, TM-08, TM-14 cho đúng đặc tả; bỏ phân công 5 chức năng cho TV4 (chia lại mỗi người 3 chức năng); đổi Blade sang ReactJS theo công nghệ nhóm chọn; điền các mục AI để trống (phạm vi, CSDL, kiến trúc).
- Giữ lại: bố cục các mục, thông tin chung, cách chia chức năng theo nhóm người dùng/quản trị.

### 6. AI sai hoặc chưa chắc chắn ở đâu

AI chưa chắc chắn nhiệm vụ từng thành viên

### 7. Cách kiểm chứng

Đối chiếu từng mã TM với tài liệu Đặc tả yêu cầu 6 đề tài mẫu (đề tài A) và Hướng dẫn Ngày 1.

### 8. Sản phẩm cuối cùng

Link commit/PR: https://github.com/ngoctramcam/ECommerce-Project/commit/b8ff1dcff3870286773012575244e7ede6a3527e

```

```

## AI-02 – <Đặc tả usecase>

- Ngày / Người dùng: [2026-11-10] / Trần Quang Vinh
- Công cụ: [Copilot]
- Giai đoạn: Lập kế hoạch
- Task / Commit / PR: [DOC] Đề cương / [17e7cfa] / [PR1]
- Mục đích: [Hướng dẫn form viết đặc tả]
- Prompt chính (nguyên văn hoặc link chia sẻ hội thoại): [Bây giờ hãy hướng dẫn tôi viết đặc tả cho tôi Đặc tả 3 use case chính: Đặt hàng, Quản lý sản phẩm, Đăng nhập (tác nhân, tiền điềukiện, luồng chính, luồng phụ)]
- Kết quả AI trả về (tóm tắt): [Use case Tác nhân Tiền điều kiện Luồng chính Luồng phụ
  UC-01 Đăng nhập (TM-04) Khách vãng lai (đã có tài khoản), Quản trị Có tài khoản, không bị khóa, chưa đăng nhập 7 bước: nhập email/mật khẩu, kiểm tra dữ liệu ở server, so khớp bcrypt, kiểm tra tài khoản, tạo phiên, điều hướng theo vai trò A1 chưa có tài khoản, A2 quay lại trang đang xem, A3 đăng xuất, E1 → E5 (sai dữ liệu, sai mật khẩu, bị khóa, nhập sai nhiều lần, lỗi hệ thống)
  UC-02 Quản lý sản phẩm (TM-12) Quản trị Đã đăng nhập với vai trò admin, có ít nhất 1 danh mục 6 bước thêm sản phẩm (form, ảnh jpg/png ≤ 2 MB, kiểm tra ở server, lưu) A1 → A5 (tìm kiếm, sửa, ẩn/hiện, xóa, xóa mềm), E1 → E5 (dữ liệu sai, ảnh sai, không phải admin, phiên hết hạn, lỗi lưu)
  UC-03 Đặt hàng COD (TM-06) Khách hàng Đã đăng nhập, giỏ hàng có sản phẩm 8 bước, trong một transaction: tạo đơn “Chờ xác nhận”, lưu giá lúc mua, trừ tồn kho, xóa giỏ A1 → A2 và 12 ngoại lệ E1 → E12 (chưa đăng nhập, giỏ trống, hết hàng, không đủ số lượng, hai người mua cuốn cuối, sản phẩm bị ẩn, giá đổi, thông tin sai, phiên hết hạn, bấm 2 lần, lỗi CSDL, đổi ID trên URL)]
- Đánh giá: [Đúng 1 phần vì AI không hiểu rõ nghiệp vụ thực sự của đặc tả nên có vài chỗ vẫn tự bịa ra]
- Đã chỉnh sửa gì: [Lấy form viết đặc tả và lọc những ý về luồng phụ]
- Cách kiểm chứng: [Giữ lại những chức khớp với đặc tả]
- Tỷ lệ nội dung AI còn giữ lại (ước lượng): [45%]
- Điều học được: [Prompt cần truyền đầy đủ đặc tả , dữ liệu cần thiết thì AI nó mới hiểu và cho kết quả chuẩn]

# Phản tư về việc dùng AI – TV4 (Cam Thị Ngọc Trâm)

## 1. Thống kê của tôi

Trong cả đồ án tôi ghi 9 mục AI log, từ `AI-01` đến `AI-09`, lưu trong `ai-logs/TV4_CamThiNgocTram.md`. Công cụ tôi dùng là GitHub Copilot và Gemini.

| Giai đoạn         |                   Số mục                   |
| ----------------- | :----------------------------------------: |
| Phân tích yêu cầu |                     —                      |
| Thiết kế          |               [AI-01, AI-02]               |
| Lập trình         | [AI-03, AI-04, AI-05, AI-06, AI-08, AI-09] |
| Kiểm thử          |                  [AI-07]                   |

Tôi dùng AI nhiều nhất ở giai đoạn Lập trình, vì tôi phụ trách phần Backend (thiết kế CSDL, tạo dữ liệu mẫu và xây dựng các chức năng quản lý Danh mục, Sản phẩm, Giỏ hàng, Mã giảm giá).

## 2. Hai trường hợp AI giúp tốt

**Trường hợp 1: xây dựng trang quản lý sản phẩm và bộ lọc phía server [AI-06].**
Tôi đưa cho AI yêu cầu lọc sản phẩm theo tên, danh mục kết hợp phân trang phía server và kiểm tra dữ liệu đầu vào (`price > 0`, `stock >= 0`). AI gợi ý cách dùng câu truy vấn điều kiện linh hoạt (`when()`) kèm `paginate()` trên Eloquent và bộ luật validation chuẩn. Cách này giúp tôi có khung API chạy được rất nhanh. Để chắc chắn, tôi đối chiếu lại tên cột trong Model `Product` và chạy thử trên trình duyệt với các trường hợp nhập giá âm, tồn kho âm.

**Trường hợp 2: viết Unit Test kiểm tra ràng buộc xóa danh mục [AI-07].**
AI gợi ý cách dùng trait `RefreshDatabase` kết hợp SQLite `:memory:` để kiểm thử 2 nhánh trong `CategoryService::delete()`: chặn xóa danh mục đang có sản phẩm và xóa mềm danh mục trống. Nhờ đó tôi nắm được cách viết test tự động trong Laravel nhanh hơn thay vì tự mò cấu hình từ đầu. Tôi kiểm chứng bằng cách sửa lại các cột bắt buộc trong dữ liệu test và chạy `php artisan test --filter=CategoryServiceTest` đến khi báo `PASS` cả 2 test case.

## 3. Hai trường hợp AI sai hoặc thiếu

**Trường hợp 1 [AI-05, AI-08]:** AI tự đoán tên cột và giá trị `ENUM` không khớp với thiết kế CSDL của nhóm. Tôi phát hiện ra khi chạy thử gặp lỗi `SQLSTATE` và `Data truncated` (ví dụ AI dùng `id` thay vì `cart_id`, dùng trạng thái `'CONFIRMED'` thay vì `'PROCESSING'` trong bảng `orders`). Tôi đã mở file migration đối chiếu lại từng cột và sửa cho khớp 100% trước khi chạy lại.

**Trường hợp 2 [AI-09]:** Khi nhờ AI viết chức năng xóa mã giảm giá phía Admin, AI sinh ra lệnh xóa cứng `$voucher->delete()`. Nếu dùng luôn sẽ làm mất khóa ngoại `voucher_id` của các đơn hàng cũ đã áp dụng mã này. Tôi đã nhận ra vấn đề và sửa lại thành xóa mềm bằng cách cập nhật cột `is_delete = 1`, đồng thời lọc `where('is_delete', 0)` khi hiển thị danh sách.

Từ hai trường hợp này tôi nhận ra AI chỉ viết theo thói quen mặc định của framework chứ không tự hiểu các ràng buộc toàn vẹn dữ liệu riêng của dự án. Không thể chép mã về dùng ngay mà phải đối chiếu schema và đọc kỹ từng dòng.

## 4. So sánh một chức năng tự viết và một chức năng có AI hỗ trợ

Tôi so sánh **Tự viết chức năng quản lý Danh mục (`TM-11`)** với **Có AI hỗ trợ viết chức năng quản lý Mã giảm giá (`TM-16`)**.

|               | Tự viết    | Có AI hỗ trợ |
| ------------- | ---------- | ------------ |
| Thời gian     | ~4 giờ     | ~1 giờ       |
| Chất lượng mã | Trung bình | Khá tốt      |
| Số lỗi gặp    | Khá nhiều  | Ít           |

Nhìn chung chức năng có AI hỗ trợ giúp hoàn thành nhanh hơn hẳn và cấu trúc code gọn gàng hơn, nhưng nếu không đọc kỹ mà chỉ copy nguyên văn thì rất dễ dính lỗi lệch tên cột hoặc bỏ sót các điều kiện xóa mềm đặc thù của đồ án.

## 5. Kỹ thuật viết prompt tôi rút ra

- **Đính kèm rõ cấu trúc bảng, khóa chính và các cột đặc biệt** (`cart_id`, `is_delete`, `ENUM`) vào trong prompt để AI không tự đoán sai tên cột.
- **Nêu rõ công nghệ và quy ước của dự án** (Laravel 12, React, dùng route web hay API, dùng xóa mềm thay vì xóa cứng) ngay từ đầu.
- **Chia nhỏ yêu cầu theo từng phần** (validation, truy vấn lọc, seeder, unit test) để dễ kiểm soát logic và phát hiện lỗi sớm.

## 6. Quy tắc dùng AI tôi đề xuất

1. Luôn đối chiếu tên bảng, tên cột và kiểu dữ liệu với file migration thực tế trước khi chạy code AI sinh ra.
2. Kiểm tra kỹ các thao tác xóa hoặc cập nhật dữ liệu xem có đảm bảo ràng buộc khóa ngoại và cơ chế xóa mềm (`is_delete` / `SoftDeletes`) của nhóm hay không.
3. Chạy kiểm thử thực tế trên trình duyệt, kiểm tra dữ liệu trong phpMyAdmin và chạy `php artisan test` đạt trạng thái `PASS` trước khi commit lên Git.

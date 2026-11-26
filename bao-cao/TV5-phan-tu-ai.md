# Phản tư về việc dùng AI – TV5 Cam Thị Ngọc Trâm

## 1. Thống kê của tôi

Trong cả đồ án tôi ghi 11 mục AI log, từ `AI-01` đến `AI-11`, lưu trong `ai-logs/TV5_CamThiNgocTram.md`. Công cụ tôi dùng là Copilot và Gemini.

| Giai đoạn         |                   Số mục                   |
| ----------------- | :----------------------------------------: |
| Phân tích yêu cầu |                     —                      |
| Thiết kế          |        [AI-01, AI-02, AI-03, AI-09]        |
| Lập trình         | [AI-04, AI-05, AI-06, AI-07, AI-10, AI-11] |
| Kiểm thử          |                  [AI-08]                   |

Tôi dùng AI nhiều nhất ở giai đoạn Lập trình và Kiểm thử, vì tôi đảm nhận vai trò Git/Tester (quản lý nhánh Git, biên soạn 24 kịch bản kiểm thử cho 12 chức năng, viết Unit Test tự động và trực tiếp kiểm thử, sửa lỗi luồng Giỏ hàng, Đơn hàng của tôi, Quản lý Đơn hàng Admin).

## 2. Hai trường hợp AI giúp tốt

**Trường hợp 1: biên soạn bộ 24 kịch bản kiểm thử (Test Cases) cho 12 chức năng hệ thống.**
Tôi đưa cho AI danh sách 12 chức năng cốt lõi từ `TM-01` đến `TM-08`, `TM-11` đến `TM-14` và cùng các yêu cầu ràng buộc bảo mật và nghiệp vụ. AI gợi ý đầy đủ bảng test case chia rõ từng cột (_Mã TC, Tên Test Case, Điều kiện tiên quyết, Các bước thực hiện, Kết quả mong đợi, Trạng thái_) bao phủ cả luồng thành công lẫn các trường hợp biên như vượt tồn kho, chống SQL Injection/XSS, hoàn kho khi hủy đơn. Cách này giúp tôi hệ thống hóa tài liệu `docs/test-cases.md` rất nhanh và khoa học. Để chắc chắn, tôi đối chiếu lại từng mã chức năng với đặc tả của nhóm và thực thi kiểm thử thủ công lẫn Unit Test trên từng kịch bản.

**Trường hợp 2: xây dựng giao diện Responsive và Popup Chi tiết cho trang Đơn hàng của tôi & Quản lý đơn hàng Admin [AI-06, AI-07, AI-10, AI-11].**
AI gợi ý bố cục responsive tách biệt cho cả 2 màn hình Desktop và Mobile bằng Tailwind CSS, tích hợp Modal Popup xem chi tiết đơn hàng, bộ đếm trạng thái động và luồng chuyển trạng thái đơn hàng một chiều (`pending → processing → shipping → completed` hoặc `→ cancelled`) kèm transaction hoàn lại số lượng tồn kho (`increment('stock')`). Nhờ đó giao diện đồng bộ và xử lý nghiệp vụ chặt chẽ hơn. Tôi kiểm chứng bằng cách bật DevTools kiểm tra giao diện ở cả kích thước `1366px` và `360px`, đồng thời thử chuyển đổi từng trạng thái đơn và kiểm tra biến động cột `stock` trong phpMyAdmin.

## 3. Hai trường hợp AI sai hoặc thiếu

**Trường hợp 1 [AI-04, AI-05, AI-08]:** AI tự đoán tên cột, khóa chính và dùng Factory mặc định không khớp với CSDL thực tế của nhóm. Tôi phát hiện ra khi chạy thử gặp lỗi `SQLSTATE` và `Undefined method` (ví dụ AI dùng `id`, `qty`, `name` thay vì `cart_id`, `quantity`, `full_name`, hoặc bỏ qua bản ghi đã xóa mềm `SoftDeletes` trong `cart_items` gây lỗi trùng khóa `unique(user_id, product_id)`). Tôi đã đối chiếu lại Model `CartItem`, `Product`, `User` và bổ sung `withTrashed()` + `restore()` để xử lý triệt để.

**Trường hợp 2 [AI-10, AI-11]:** Khi viết hàm gọi API cập nhật trạng thái đơn hàng từ React, AI tự đặt endpoint giả định (`/api/orders`, `/api/orders/{id}/cancel`) gây lỗi `404` và chuyển chuỗi trạng thái gửi lên sang chữ in hoa (`CANCELLED`) làm lệch với quy tắc kiểm tra chữ thường (`cancelled`) của Backend Laravel, dẫn đến lỗi validation `The selected status is invalid.`. Tôi đã kiểm tra lại `routes/web.php` và `OrderController.php`, sửa lại đúng route gốc và đổi sang `.toLowerCase()` trước khi gửi request.

Từ hai trường hợp này tôi nhận ra AI thường viết theo quy ước mặc định hoặc tự đặt tên API nếu không được cung cấp sẵn mã nguồn gốc. Không thể sao chép về chạy ngay mà phải kiểm tra chéo route, tên cột và test thực tế từng nút bấm.

## 4. So sánh một chức năng tự viết và một chức năng có AI hỗ trợ

Tôi so sánh **Tự kiểm thử thủ công và viết kịch bản kiểm thử ban đầu** với **Có AI hỗ trợ viết Unit Test tự động (`CartServiceTest`) và tổng hợp Test Cases (`AI-08`, `AI-09`)**.

|               | Tự viết    | Có AI hỗ trợ |
| ------------- | ---------- | ------------ |
| Thời gian     | ~5 giờ     | ~1.5 giờ     |
| Chất lượng mã | Trung bình | Khá tốt      |
| Số lỗi gặp    | Khá nhiều  | Ít           |

Nhìn chung có AI hỗ trợ giúp rút ngắn đáng kể thời gian tổng hợp kịch bản kiểm thử và nhanh chóng thiết lập được bộ Unit Test tự động bằng PHPUnit. Tuy nhiên, người kiểm thử vẫn phải tự rà soát lại dữ liệu đầu vào và đối chiếu schema CSDL để đảm bảo test phản ánh đúng thực tế dự án.

## 5. Kỹ thuật viết prompt tôi rút ra

- **Cung cấp nguyên văn thông báo lỗi và đường dẫn API/Model hiện có** (như lỗi `The selected status is invalid.` hay danh sách route thực tế) để AI sửa đúng trọng tâm thay vì tự tạo endpoint mới.
- **Liệt kê rõ các trường hợp biên (Edge Cases) cần kiểm tra** (vượt tồn kho, khôi phục bản ghi đã xóa mềm, chặn chuyển ngược trạng thái đơn) ngay trong câu lệnh yêu cầu.
- **Đính kèm danh sách mã chức năng (`TM-01` – `TM-14`) và cấu trúc bảng** để AI sinh tài liệu test case và code kiểm thử bám sát 100% phạm vi đồ án.

## 6. Quy tắc dùng AI tôi đề xuất

1. Luôn kiểm tra chéo tên route, phương thức HTTP và định dạng dữ liệu (chữ hoa/thường, tên cột) giữa Frontend React và Backend Laravel trước khi tích hợp.
2. Mọi tài liệu test case hoặc Unit Test do AI sinh ra đều phải được thực thi kiểm chứng thực tế trên trình duyệt, phpMyAdmin và lệnh `php artisan test` đạt trạng thái `PASS`.
3. Đẩy code theo đúng nhánh tính năng (`feat/...`, `fix/...`, `test/...`), kiểm tra không còn lỗi cú pháp hay xung đột merge trước khi tạo Pull Request vào `develop`.

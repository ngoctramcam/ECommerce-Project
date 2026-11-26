# Phản tư về việc dùng AI – TV1 - Thạch Minh Trí
## 1. Thống kê của tôi
- **Tổng số mục AI log:** 9 mục (từ `AI-01` đến `AI-08`).
- **Công cụ đã dùng:** Copilot, Gemini, Claude.

| Giai đoạn | Số mục |
| --- | ---- |
| Lập trình | [AI-01], [AI-02], [AI-03], [AI-04], [AI-04],[AI-05], [AI-06], [AI-07], [AI-08] |

## 2. Hai trường hợp AI giúp tốt
**Trường hợp 1: [AI-01]**
Tôi đính kèm ảnh lược đồ ERD và bảo AI hãy sinh mã cho các model tương ứng.

**Trường hợp 2: [AI-08]**
Tôi đính kèm AuthController.php, AuthService.php, web.php và nhờ AI xem và chỉ ra nguyên nhân và cách khắc phục

## 3. Hai trường hợp AI sai hoặc thiếu

**Trường hợp 1 [AI-05]:** AI viết OrderService bị sai khi tạo order, khiên cho tất cả những sản phẩm có trong giỏ hàng đều được lưu vào db mặc dù khách không chọn những sản phẩm đó

**Trường hợp 2 [AI-01]:** Khi AI viết model dựa theo ảnh ERD tôi gửi, AI vẫn bị sai chính tả một vài thuộc tính nên phải chỉnh sửa tên thuộc tính thủ công.

## 5. Kỹ thuật viết prompt tôi rút ra

- Đưa ra rõ ngữ cảnh (Đang làm cái gì với vai trò gì,...) thay vì chỉ prompt chung chung như "này, giúp tôi chỉnh cái này đi nó bị gì rồi". Nhờ vậy câu trả lời sẽ bám sát dự án đang làm hơn.
- Nhờ AI phân tích những chỗ chưa đúng và đưa các giải pháp phù hợp.

## 6. Quy tắc dùng AI tôi đề xuất

1. không đưa các dữ liệu nhạy cảm như tài khoản, mật khẩu, file .env, thông tin cá nhân cho AI.
2. Phải hiểu đoạn code do AI sinh ra nó sẽ làm gì và thực thi điều gì trước khi sử dụng nó trong dự án.
3. Thực hiện một chức năng nào đó phải luôn đối chiếu với đặc tả của dự án.

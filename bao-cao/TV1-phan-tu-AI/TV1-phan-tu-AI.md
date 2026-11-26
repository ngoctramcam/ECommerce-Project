# Phản tư về việc dùng AI – TV1 (Trần Quang Vinh)

## 1. Thống kê của tôi

Trong cả đồ án tôi ghi [14] mục AI log, từ AI-01 đến AI-14, lưu trong `ai-logs/TV1_TranQuangVinh.md`. Công cụ tôi dùng là [Copilot].

| Giai đoạn         |                      Số mục                       |
| ----------------- | :-----------------------------------------------: |
| Phân tích yêu cầu |                      [AI-01]                      |
| Thiết kế          |          [AI-02,AI-03,AI-05,AI-06,AI-10]          |
| Lập trình         | [AI-07,AI-08,AI-09,AI-11,AI-12,AI-13,AI-14,AT-15] |
| Kiểm thử          |                      [AI-16]                      |
| Tài liệu          |                [AI-01,AI-02,AI-04]                |

Tôi dùng AI nhiều nhất ở giai đoạn [Lập trình], vì tôi vừa làm trưởng nhóm (viết tài liệu, use case, sequence) vừa làm chức năng TM-14 và TM-08.

## 2. Hai trường hợp AI giúp tốt

**Trường hợp 1: rà luồng đặt hàng và viết lại đặc tả use case [AI-02].**
Tôi đưa cho AI mã của CheckoutPage, OrderRequest, OrderService và CartController, rồi nhờ so với đặc tả UC-03 xem còn thiếu gì. AI chỉ ra được Chỗ đặc tả chưa nói rõ trạng thái đơn, hay trường hợp hết hàng giữa chừng. Cách này nhanh hơn nhiều so với việc tôi tự đọc từng tệp. Để chắc chắn, tôi đọc lại mã thật và [ĐIỀN: chạy thử đặt hàng / đối chiếu với đặc tả] rồi mới sửa đặc tả.

**Trường hợp 2: làm trang danh sách người dùng cho TM-14 [AI-08].**
AI gợi ý cách phân trang ở server và khung giao diện UserList. Nhờ đó tôi có bản chạy được sớm, rồi mới ngồi chỉnh theo ý nhóm. Tôi kiểm chứng bằng cách chạy thử: tìm theo email, chuyển trang, khóa và mở khóa tài khoản. Tôi cũng kiểm tra câu truy vấn tìm kiếm có dùng tham số, không nối chuỗi.

## 3. Hai trường hợp AI sai hoặc thiếu

**Trường hợp 1 [AI-02]:** AI chưa rõ được các đặc tả chính của đồ án. Tôi phát hiện ra khi đọc lại đặc tả AI đưa ra và đặc tả của đồ án không khớp nhau. Tôi đã sửa bằng cách thay đổi những phần AI đưa ra không khớp với đặc tả đồ án.

**Trường hợp 2 [AI-03]:** Đó là khi tôi nhờ AI vẽ sequence diagram, lúc đó tôi đã đưa cho AI sơ đồ Usecase, đặc tả usecase, và nội dung prompt gợi ý của đồ án để AI làm nhưng kết quả đưa ra là sequencse diagram chưa khớp với công cụ và môi trường phát triển của nhóm tôi. Vì khi đó tôi nhận ra AI vẽ sequence cho 1 ngôn ngữ khác, 1 mô hình kiến trúc khác hoàn toàn khác với nhóm tôi. Nên tôi đã rút kinh nghiệm và prompt lại đầy đủ thông tin để AI hiểu được ngữ cảnh rõ ràng hơn.

Từ hai trường hợp này tôi nhận ra AI trả lời rất tự tin, kể cả khi sai. Không thể chép mã về chạy luôn mà phải thử và đọc lại.

## 4. So sánh một chức năng tự viết và một chức năng có AI hỗ trợ

Tôi so sánh Viết tay đặc tả usecase với AI hỗ trợ viết đặc tả usecase.

|               | Tự viết      | Có AI hỗ trợ |
| ------------- | ------------ | ------------ |
| Thời gian     | [5h]         | [30p]        |
| Chất lượng mã | [Trung bình] | [Khá tốt]    |
| Số lỗi gặp    | [Rất nhiều]  | [Rất ít]     |

Nhìn chung chức năng có AI hỗ trợ sẽ giúp hoàn thành công việc nhanh hơn nhưng có thể đến khi gặp lỗi thì mình cũng không thể suy nghĩ mà có thể sửa được vì đó là nội dung AI, nó làm mình không hiểu được gì mà cứ lệ thuộc.

## 5. Kỹ thuật viết prompt tôi rút ra

- **Đưa mã thật và nói rõ mình cần gì**, thay vì hỏi chung chung. Nhờ vậy câu trả lời bám sát dự án.
- **Nói rõ công nghệ đang dùng** (Laravel, React, MySQL) để AI không gợi ý sang công nghệ khác.
- **Nhờ AI chỉ ra chỗ thiếu hoặc chỗ sai** trước, rồi mới nhờ sửa. Cách này giúp tôi hiểu vấn đề trước khi nhận mã.

## 6. Quy tắc dùng AI tôi đề xuất

1. Đọc hiểu và chạy thử mọi đoạn mã AI viết trước khi commit. Không hiểu thì chưa dùng.
2. Ghi AI log ngay lúc dùng, không để cuối tuần mới bù. Làm vậy log mới đúng với thực tế.
3. Không dán mật khẩu, khóa API hay dữ liệu thật vào prompt.

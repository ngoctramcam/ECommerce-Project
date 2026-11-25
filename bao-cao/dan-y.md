# DÀN Ý BÁO CÁO ĐỒ ÁN LẬP TRÌNH WEB

**Đề tài:** Website thương mại điện tử bán sách (thanh toán khi nhận hàng – COD)
**Công nghệ:** React + Laravel + MySQL (REST API / JSON)
**GV hướng dẫn:** Lữ Cao Tiến
**Trưởng nhóm:** TV1

---

## 1. Phân công viết chương

| Chương | Nội dung                                                | Phụ trách                               | Tệp                      | Số trang |
| ------ | ------------------------------------------------------- | --------------------------------------- | ------------------------ | -------- |
| 1      | Giới thiệu đề tài, mục tiêu, phạm vi                    | TV1                                     | `chuong-01-02.md`        | 1        |
| 2      | Tổ chức nhóm và quy trình quản lý                       | TV1                                     | `chuong-01-02.md`        | 2–3      |
| 3      | Công nghệ sử dụng và lý do lựa chọn                     | TV4                                     | `chuong-03.md`           | 1        |
| 4      | Phân tích yêu cầu: user story, use case                 | TV1 (đề xuất, vì TV1 vẽ use case)       | `chuong-04.md`           | 2–3      |
| 5.1    | Thiết kế kiến trúc                                      | TV2                                     | `chuong-05-kien-truc.md` | 1–2      |
| 5.2    | Thiết kế CSDL                                           | TV4                                     | `chuong-05-csdl.md`      | 1–2      |
| 5.3    | Sequence diagram                                        | TV1 (đề xuất, vì TV1 vẽ sơ đồ này)      | `chuong-05-sequence.md`  | 0,5      |
| 5.4    | Thiết kế giao diện                                      | TV3                                     | `chuong-05-giao-dien.md` | 1–2      |
| 6      | Cài đặt                                                 | TV2                                     | `chuong-06.md`           | 3–4      |
| 7      | Kiểm thử                                                | TV5                                     | `chuong-07-08.md`        | 2–3      |
| 8      | Quản lý mã nguồn                                        | TV5                                     | `chuong-07-08.md`        | 1        |
| 9      | Báo cáo phản tư về sử dụng AI                           | TV1 (tổng hợp từ 5 phần của từng người) | `chuong-09.md`           | 2–3      |
| 10     | Kết luận, hạn chế, hướng phát triển, tài liệu tham khảo | TV1                                     | `chuong-10.md`           | 1        |

---

## 2. Dàn ý chi tiết từng chương

### Chương 1. Giới thiệu đề tài, mục tiêu, phạm vi _(TV1)_

- 1.1 Bối cảnh và lý do chọn đề tài (bán sách trực tuyến, COD)
- 1.2 Mục tiêu của dự án
- 1.3 Phạm vi: 3 phân hệ (khách vãng lai, khách hàng, quản trị); 12 chức năng bắt buộc TM-01 → TM-08, TM-11 → TM-14; chức năng cộng điểm đã làm (nếu có)
- 1.4 Ngoài phạm vi: nhiều người bán, biến thể sản phẩm, đơn vị vận chuyển, hoàn tiền, chat, gợi ý sản phẩm, thanh toán online
- 1.5 Bố cục báo cáo

### Chương 2. Tổ chức nhóm và quy trình quản lý _(TV1)_

- 2.1 Thành viên và vai trò (PM/Scrum Master, Backend, Frontend, Database, Git/QA)
- 2.2 Quy trình Scrum rút gọn: kế hoạch sprint S1 → S5 (mục tiêu, thẻ chính, kết quả từng sprint)
- 2.3 Công cụ: Trello (7 cột, nhãn, WIP limit 2 thẻ/người), GitHub, Figma, nhóm chat; kèm **ảnh chụp board cuối cùng**
- 2.4 Họp nhóm: tóm tắt biên bản 01 → 05 (ngày, người tham dự, quyết định chính)
- 2.5 Ma trận phân công (chức năng × thành viên; R = thực hiện, A = chịu trách nhiệm, C = tham vấn, I = được thông báo) và bảng % đóng góp (không ai dưới 15%); **có chữ ký xác nhận của cả nhóm**
- 2.6 Tổng hợp retrospective (Làm tốt / Chưa tốt / Cải tiến) từ Retrospective S3 và các sprint sau

### Chương 3. Công nghệ sử dụng và lý do lựa chọn _(TV4)_

- 3.1 Bảng công nghệ: React (frontend), Laravel (backend), MySQL, REST API/JSON, Git/GitHub, Trello, Figma
- 3.2 Lý do chọn từng công nghệ (năng lực nhóm, thời gian 3 tuần, hệ sinh thái, bảo mật có sẵn như Eloquent, middleware, bcrypt)
- 3.3 Thư viện hỗ trợ (UI, routing, xác thực API, kiểm thử)
- 3.4 So sánh ngắn với phương án đã cân nhắc nhưng không chọn

### Chương 4. Phân tích yêu cầu _(TV1)_

- 4.1 Danh sách user story theo phân hệ (kèm mức Must/Could)
- 4.2 Use case diagram (3 tác nhân: Khách vãng lai, Khách hàng, Quản trị)
- 4.3 Đặc tả 3 use case chính: UC-01 Đăng nhập, UC-02 Quản lý sản phẩm, UC-03 Đặt hàng COD (tác nhân, tiền điều kiện, luồng chính, luồng phụ/ngoại lệ)
- 4.4 Yêu cầu phi chức năng (NFR-01 → NFR-06, TM-NFR1 → TM-NFR4)

### Chương 5. Thiết kế

**5.1 Kiến trúc** _(TV2)_

- Sơ đồ kiến trúc tổng thể (trình duyệt – React – REST API – Laravel – MySQL)
- Kiến trúc backend 3 lớp: Controller – Service – Repository/Model
- Luồng một request đi qua các lớp (lấy ví dụ đăng nhập hoặc đặt hàng)
- Cấu trúc thư mục có chú thích vai trò từng thư mục

**5.2 Cơ sở dữ liệu** _(TV4)_

- ERD (bản final), mô tả 6 bảng: users, categories, products, cart_items, orders, order_items
- Khóa chính, khóa ngoại, ràng buộc (email duy nhất, tồn kho ≥ 0)
- Chuẩn hóa 3NF; vì sao tách `order_items`; vì sao lưu giá tại thời điểm mua
- Chỉ mục: `products(name)`, `products(category_id)`, `orders(user_id, status)`

**5.3 Sequence diagram** _(TV1)_

- Luồng Đặt hàng: Khách hàng → Giao diện → Controller → OrderService → CSDL (có transaction)

**5.4 Giao diện** _(TV3)_

- Nguyên tắc thiết kế, bố cục chung (header, menu danh mục, footer), responsive 360 px / 1366 px
- Ảnh các màn hình chính kèm mô tả: Trang chủ, Danh sách/tìm kiếm, Chi tiết sách, Giỏ hàng, Đặt hàng, Trang quản trị

### Chương 6. Cài đặt _(TV2)_

- 6.1 Cấu trúc mã backend và frontend
- 6.2 Hai mẫu thiết kế/nguyên lý áp dụng trở lên (Repository, Dependency Injection, Middleware…), chỉ rõ vị trí trong mã (tên tệp/lớp)
- 6.3 Nghiệp vụ tiêu biểu: **Đặt hàng trong transaction** – ý tưởng, mã giả, độ phức tạp, cách chống bán vượt tồn kho (TM-NFR1)
- 6.4 Bảo mật: băm mật khẩu, chống SQL Injection, XSS, CSRF, phân quyền phía server, chặn xem đơn của người khác (TM-NFR4), kiểm tra tệp tải lên theo nội dung, không đưa `.env` vào repo

### Chương 7. Kiểm thử _(TV5)_

- 7.1 Kế hoạch kiểm thử (phạm vi, loại kiểm thử, công cụ)
- 7.2 Bảng test case và kết quả (rút gọn từ `docs/test-cases.md`, mỗi chức năng ≥ 2 test case)
- 7.3 Unit test tầng Service (≥ 5 test; lệnh chạy `php artisan test`; kết quả)
- 7.4 Kiểm thử chéo với nhóm bạn: số lỗi ghi cho nhóm bạn, số lỗi nhận, số lỗi đã sửa, ví dụ 2–3 lỗi tiêu biểu
- 7.5 Kiểm thử đặt hàng đồng thời (TM-NFR1) và kết quả

### Chương 8. Quản lý mã nguồn _(TV5)_

- 8.1 Mô hình nhánh (main – nhánh tích hợp – feature/fix/docs), quy ước commit (Conventional Commits, mã task, trailer `AI-assisted`)
- 8.2 Quy trình Pull Request và code review
- 8.3 Thống kê đóng góp theo thành viên: `git shortlog -sn`, số PR, số review
- 8.4 Các tag: v0.1, v0.5, v1.0

### Chương 9. Báo cáo phản tư về sử dụng AI _(TV1 tổng hợp)_

- 9.1 Thống kê AI log theo giai đoạn và theo thành viên (số mục, công cụ)
- 9.2 Hai trường hợp AI giúp hiệu quả nhất
- 9.3 Hai trường hợp AI trả lời sai, lỗi thời hoặc gây lỗi bảo mật, kèm cách nhóm phát hiện
- 9.4 So sánh một chức năng tự viết và một chức năng có AI hỗ trợ (thời gian, chất lượng, số lỗi)
- 9.5 Kỹ thuật viết prompt nhóm rút ra
- 9.6 Quy tắc dùng AI nhóm tự đặt ra và đề xuất cho khóa sau

### Chương 10. Kết luận, hạn chế, hướng phát triển _(TV1)_

- 10.1 Kết quả đạt được (đối chiếu 12 chức năng bắt buộc)
- 10.2 Hạn chế
- 10.3 Hướng phát triển
- 10.4 Tài liệu tham khảo (tài liệu Laravel, React, MySQL… và mọi nguồn mã/ý tưởng bên ngoài đã dùng)

---

## 3. Tiến độ viết

- [ ] Chương 1, 2 (TV1)
- [ ] Chương 3 (TV4)
- [ ] Chương 4 (TV1)
- [ ] Chương 5.1 kiến trúc (TV2)
- [ ] Chương 5.2 CSDL (TV4)
- [ ] Chương 5.3 sequence (TV1)
- [ ] Chương 5.4 giao diện (TV3)
- [ ] Chương 6 (TV2)
- [ ] Chương 7, 8 (TV5)
- [ ] Chương 9 – nhận đủ phần phản tư của từng người (TV1 tổng hợp)
- [ ] Chương 10 (TV1)
- [ ] Ghép báo cáo, mục lục, đánh số trang; đọc chéo
- [ ] Xuất PDF 15–25 trang

---

## 4. Phụ lục: mẫu phần phản tư AI (mỗi thành viên nộp cho TV1)

Mỗi người nộp trước **21:00 Ngày 13**, tệp `docs/bao-cao/phan-tu-ai-<TVx>.md`:

1. **Thống kê của tôi:** số mục AI log; công cụ đã dùng; số mục theo giai đoạn (Phân tích / Thiết kế / Lập trình / Kiểm thử / Tài liệu).
2. **2 trường hợp AI giúp tốt:** mã AI-xx; việc gì; vì sao hiệu quả; cách tôi kiểm chứng.
3. **2 trường hợp AI sai/thiếu/lỗi thời/gây lỗi bảo mật:** mã AI-xx; AI sai ở đâu; tôi phát hiện bằng cách nào; đã sửa gì.
4. **So sánh:** một chức năng tôi tự viết và một chức năng có AI hỗ trợ (thời gian, chất lượng, số lỗi).
5. **Kỹ thuật prompt tôi rút ra:** 2–3 ý, kèm ví dụ prompt tốt và prompt chưa tốt.
6. **Quy tắc dùng AI tôi đề xuất:** 2–3 quy tắc.

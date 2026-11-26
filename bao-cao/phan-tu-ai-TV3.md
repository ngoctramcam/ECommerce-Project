## 4. Phụ lục: mẫu phần phản tư AI (mỗi thành viên nộp cho TV1)

1. **Thống kê của tôi:** số mục AI log: 14; công cụ đã dùng:Github, Copilot,FigmaAI, Stitch ;

- số mục theo giai đoạn (Phân tích / Thiết kế / Lập trình / Kiểm thử / Tài liệu).
  Phân tích & Thiết kế: 2 mục (`AI-01`, `AI-02`, `AI-09` – thiết kế và chú thích wireframe 6 cặp màn hình Desktop/Mobile trên Figma).

2. **2 trường hợp AI giúp tốt:** mã AI-xx; việc gì; vì sao hiệu quả; cách tôi kiểm chứng.
3. **2 trường hợp AI sai/thiếu/lỗi thời/gây lỗi bảo mật:** mã AI-xx; AI sai ở đâu; tôi phát hiện bằng cách nào; đã sửa gì.
4. **So sánh:** một chức năng tôi tự viết và một chức năng có AI hỗ trợ (thời gian, chất lượng, số lỗi).
5. **Kỹ thuật prompt tôi rút ra:** 2–3 ý, kèm ví dụ prompt tốt và prompt chưa tốt.
6. **Quy tắc dùng AI tôi đề xuất:** 2–3 quy tắc.

# Phản tư quá trình sử dụng AI – TV3 (Đoàn Kim Cương)

- **Tệp nộp:** `docs/bao-cao/phan-tu-ai-TV3.md`
- **Họ tên – MSSV:** Đoàn Kim Cương – 0306241264
- **Nhóm – Đề tài:** Nhóm 03 – Website bán sách Mộc Sách

---

## 1. Thống kê của tôi

- **Tổng số mục AI log:** 14 mục (từ `AI-01` đến `AI-14`).
- **Công cụ đã dùng:** GitHub Copilot, Figma AI.
- **Phân bổ theo giai đoạn:**
  - **Phân tích:** 0 mục.
  - **Thiết kế (UI/UX, Wireframe):** 3 mục (`AI-01`, `AI-02`, `AI-09`).
  - **Lập trình (Frontend & Backend):** 10 mục (`AI-03`, `AI-04`, `AI-05`, `AI-06`, `AI-07`, `AI-08`, `AI-10`, `AI-11`, `AI-12`, `AI-13`).
  - **Kiểm thử:** 0 mục _(phần này mình tự kiểm thử thủ công trên trình duyệt và giả lập màn hình điện thoại 360px)_.
  - **Tài liệu (Báo cáo & Kịch bản demo):** 1 mục (`AI-14`).

---

## 2. Hai trường hợp AI giúp tốt

### Trường hợp 1: Xây dựng API tìm kiếm, lọc, sắp xếp và phân trang phía server (`AI-12`)

- **Việc gì:** Viết hàm `ProductService.search(keyword, categoryId, minPrice, maxPrice, sort, page)` để tìm sách theo tên/tác giả, lọc theo danh mục, khoảng giá, sắp xếp và phân trang 12 cuốn/trang.
- **Vì sao hiệu quả:** Thay vì viết câu lệnh `if/else` dài dòng dễ rối, AI gợi ý dùng phương thức `when()` của Eloquent để ghép điều kiện lọc động rất gọn. Đặc biệt, AI còn gợi ý dùng **danh sách trắng (Whitelist)** cho tham số `sort` kết hợp truy vấn tham số hóa mặc định của Eloquent, giúp mình vừa làm nhanh vừa tránh được rủi ro SQL Injection khi người dùng truyền tham số lạ lên URL.
- **Cách tôi kiểm chứng:** Sau khi chỉnh lại tên cột cho khớp CSDL (`product_name`, `author`, `category_id`, `price`, `status`) và gắn route `GET /api/books/search`, mình gọi trực tiếp API trên trình duyệt với nhiều tổ hợp tham số (`keyword`, `minPrice`, `maxPrice`, `sort`, `page`) để kiểm tra JSON trả về đúng điều kiện lọc và đủ 12 cuốn/trang.

### Trường hợp 2: Tạo component thẻ sản phẩm dùng chung `BookCard.jsx` (`AI-06`)

- **Việc gì:** Thiết kế và đóng gói component thẻ sách (ảnh bìa, tên sách, tác giả, giá bán, nút thao tác) để dùng chung cho Trang chủ (TM-01), Danh sách sách (TM-02) và Chi tiết sách (TM-03).
- **Vì sao hiệu quả:** Trước khi code, mình nhờ AI giải thích ý nghĩa và cách chuẩn hóa tên `props` theo đúng sơ đồ ERD của nhóm. Nhờ tách gọn và thống nhất tên biến ngay từ đầu, khi qua làm trang Danh sách sách (`AI-08`) và mục 4 cuốn sách cùng danh mục ở trang Chi tiết (`AI-11`), mình chỉ việc gọi lại `<BookCard/>` rất nhanh, giao diện đồng bộ mà sau này cần sửa màu giá tiền hay định dạng VNĐ cũng chỉ phải sửa đúng 1 file.
- **Cách tôi kiểm chứng:** Nhúng thử `BookCard.jsx` vào cả Trang chủ lẫn trang Danh sách sách, kiểm tra hiển thị với dữ liệu giả và sau đó là dữ liệu thật từ API xem ảnh, tên sách dài, giá tiền VNĐ có bị vỡ khung trên máy tính và điện thoại không.

---

## 3. Hai trường hợp AI sai / thiếu / lệch yêu cầu

### Trường hợp 1: AI tự thêm chức năng ngoài đặc tả và lệch CSDL (`AI-01`, `AI-05`, `AI-07`, `AI-09`)

- **AI sai ở đâu:** AI rất hay tự "vẽ" thêm các thành phần phổ biến trên web thương mại điện tử nhưng không có trong đề bài và CSDL của nhóm. Cụ thể: tự thêm thanh toán qua ngân hàng trong wireframe (trong khi đề TM-06 chỉ yêu cầu COD), tự thêm nút "Đăng nhập bằng Google" và "Quên mật khẩu" ở form TM-04, tự chèn Banner trang chủ, giá giảm giả định và trường `slug` ở trang quản lý danh mục dù CSDL không có các bảng/cột này.
- **Tôi phát hiện bằng cách nào:** Mình đối chiếu trực tiếp từng màn hình AI gợi ý với tài liệu _Đặc tả yêu cầu_ của môn học và sơ đồ ERD của nhóm trước khi chốt giao diện.
- **Đã sửa gì:** Cắt bỏ toàn bộ phương thức thanh toán ngoài COD, xóa nút Google/Quên mật khẩu, bỏ hẳn khối Banner, bỏ giá gạch ngang và trường `slug` để giao diện khớp 100% với CSDL thực tế.

### Trường hợp 2: Giao diện mobile bị kém trải nghiệm và lệch tên tham số API (`AI-08`, `AI-13`)

- **AI sai ở đâu:** Khi dựng khung trang Danh sách sách (`AI-08`), AI chia layout kiểu mặc định khiến lúc mở trên điện thoại (360px), cả cột bộ lọc dài nằm chình ình ở trên đẩy danh sách sách tuốt xuống dưới. Sau đó, lúc hướng dẫn nối API thật (`AI-13`), AI lại đặt tên tham số theo kiểu `snake_case` (`min_price`, `max_price`, `category_id`) không khớp với backend nhóm đã viết (`minPrice`, `maxPrice`, `categoryId`).
- **Tôi phát hiện bằng cách nào:** Mình bật DevTools thu nhỏ màn hình về kích thước 360px để bấm thử như người dùng thật, và kiểm tra tab Network khi lọc sách thì thấy API không nhận tham số.
- **Đã sửa gì:** Gom toàn bộ cột bộ lọc trên mobile vào một nút bấm **"Bộ lọc"** để người dùng cần thì mới bấm xổ xuống; đồng thời đổi lại toàn bộ tên tham số gọi API thành `camelCase` cho khớp với backend và gộp phần sắp xếp vào chung bộ lọc cho gọn.

---

## 4. So sánh: Chức năng tự viết vs. Chức năng có AI hỗ trợ

- **Chức năng tự viết:** Xử lý logic kết nối API thật ở trang Chi tiết sách (`TM-03`) gồm: lấy dữ liệu sách theo `id`, chặn tăng số lượng vượt quá tồn kho, lọc bỏ cuốn sách đang xem để lấy đúng 4 cuốn sách cùng danh mục và gọi API thêm vào giỏ hàng (`user_id`, `product_id`, `qty`).
- **Chức năng có AI hỗ trợ:** Dựng giao diện và nối bộ lọc/phân trang với `useSearchParams` ở trang Danh sách sách (`BookListPage` – `AI-08`, `AI-13`).

| Tiêu chí             | Tự viết (Logic trang Chi tiết sách)                                                                        | Có AI hỗ trợ (Trang Danh sách sách & Bộ lọc)                                                                               |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Thời gian**        | Lâu hơn (khoảng 2 – 3 tiếng) vì phải tự suy nghĩ luồng xử lý các trường hợp biên như hết hàng, trùng sách. | Nhanh hơn rõ rệt (khoảng 1 tiếng cho khung giao diện và nối luồng lọc/phân trang).                                         |
| **Chất lượng**       | Khớp 100% với CSDL và API của nhóm ngay từ đầu, hiểu rõ từng dòng code nên rất tự tin khi sửa.             | Bố cục đẹp, học thêm được cách dùng `useSearchParams` giữ trạng thái lọc trên URL, nhưng phải chỉnh lại responsive mobile. |
| **Số lỗi phát sinh** | Ít lỗi vặt (chủ yếu là 1–2 lỗi nhỏ khi xử lý trạng thái `loading` và số lượng bằng 0).                     | Phát sinh khoảng 3–4 lỗi nhỏ do lệch tên biến (`min_price` vs `minPrice`) và vỡ bố cục bộ lọc trên màn hình 360px.         |

---

## 5. Kỹ thuật prompt tôi rút ra

1. **Hỏi ý nghĩa trước, xin code sau:** Khi gặp yêu cầu mới, đừng vội bảo AI viết code ngay mà hãy hỏi nó giải thích mục đích của yêu cầu đó là gì. Hiểu rồi thì lúc đọc code AI sinh ra mình mới biết chỗ nào cần giữ, chỗ nào nên bỏ.
2. **Luôn khóa chặt phạm vi đề bài và CSDL:** Phải nói rõ dự án dùng công nghệ gì, bảng CSDL có những cột nào, và _không_ làm những tính năng nào để AI khỏi tự thêm bậy.
3. **Tách nhỏ từng bước:** Chia việc thành từng phần nhỏ (dựng layout -> tạo component -> đổ dữ liệu thật) thay vì quăng cả một trang phức tạp vào 1 prompt duy nhất.

- **Ví dụ prompt chưa tốt:**
  > _"Hướng dẫn làm trang chi tiết sách cho Mộc Sách dùng React + Tailwind."_
  > _(Quá chung chung nên AI chỉ cho khung mẫu, dùng tên biến giả và không khớp API của nhóm)._
- **Ví dụ prompt tốt:**
  > _"Dựa vào CSDL gồm các cột `product_id`, `product_name`, `author`, `price`, `stock`, `category_id` (chỉ thanh toán COD, không có giảm giá, không có banner), hãy viết hàm `ProductService.search(keyword, categoryId, minPrice, maxPrice, sort, page)` trong Laravel Eloquent có whitelist cho `sort` và phân trang 12 sách/trang."_

---

## 6. Quy tắc dùng AI tôi đề xuất

1. **Không copy-paste mù quáng khi chưa hiểu:** Mọi đoạn code AI gợi ý đều phải đọc hiểu luồng chạy; nếu có kỹ thuật mới (như `useSearchParams` hay `when()` của Eloquent) thì phải nắm rõ cách hoạt động để tự sửa được khi có lỗi.
2. **Luôn đối chiếu với đặc tả & ERD trước khi dùng:** Bất kỳ giao diện hay đoạn code nào AI tạo ra cũng phải rà lại xem có dư tính năng ngoài đề bài hoặc sai tên cột CSDL hay không.
3. **Bắt buộc tự kiểm chứng thực tế trên cả Desktop và Mobile (360px):** AI thường chỉ viết code trông ổn trên màn hình lớn, nên sau khi áp dụng phải tự chạy thử, bấm qua các trường hợp biên và kiểm tra tab Network trước khi `git commit`.

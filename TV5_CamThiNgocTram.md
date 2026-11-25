# AI log – TV5 – Cam Thị Ngọc Trâm

| Mục             | Thông tin                                             |
| --------------- | ----------------------------------------------------- |
| Họ tên, MSSV    | Cam Thị Ngọc Trâm - 0306241330                        |
| Nhóm, đề tài    | Nhóm 3 – Xây dựng website thương mại điện tử bán sách |
| Vai trò         | TV5 – Git/Tester                                      |
| Công cụ AI dùng | GitHub Copilot                                        |

## Bảng tổng hợp

| Mã    | Ngày       | Giai đoạn | Nội dung                                                                     | Commit / PR                                                                            |
| ----- | ---------- | --------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| AI-01 | 10/11/2026 | Thiết kế  | Hỏi về các lệnh Git                                                          | [commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feature)                |
| AI-02 | 11/11/2026 | Thiết kế  | Tạo test case TM-05 chức năng giỏ hàng                                       | [Commit](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)      |
| AI-03 | 12/11/2026 | Thiết kế  | Tạo test case TM-04 chức năng đăng ký/đăng nhập                              | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database)          |
| AI-04 | 19/11/2026 | Lập trình | Nhờ AI viết chức năng giỏ hàng                                               | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang)    |
| AI-05 | 20/11/2026 | Lập trình | Rà soát và hoàn thiện logic Trang giỏ hàng (Cart Page)                       | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang)    |
| AI-06 | 22/11/2026 | Lập trình | Xây dựng và hoàn thiện trang Đơn hàng của tôi (My Orders Page)               | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-07-don-cua-toi) |
| AI-07 | 23/11/2026 | Lập trình | Xây dựng và hoàn thiện trang Quản lý Đơn hàng Admin (Admin Order Management) | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-07-don-cua-toi) |
| AI-08 | 24/11/2026 | Lập trình | Viết Unit Test kiểm tra ràng buộc thêm vượt tồn kho trong CartService        | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/test/TM-05)             |
| AI-09 | 25/11/2026 | Thiết kế | Tổng hợp bộ kịch bản kiểm thử (Test Cases) cho 12 chức năng hệ thống (`docs/test-cases.md`)       | [Commit](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)             |
| AI-10 | 25/11/2026 | Lập trình | Nâng cấp giao diện Responsive trang Đơn hàng của tôi (`MyOrdersPage.jsx`), bổ sung Popup Chi tiết đơn hàng và sửa lỗi cập nhật trạng thái       | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/fix/TM-07-don-cua-toi)             |


## AI-01 – <tạo repository>

- **Ngày / Người dùng AI:** 10/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:**

### 1. Mục đích

Hỏi AI về lệnh git

### 2. Prompt đã dùng

đẩy branch feature lên githhub va branch nằm trong branch develop

### 3. Kết quả AI trả về (tóm tắt)

AI đưa ra hướng dẫn từng bước thực hiện

### 4. Phần giữ lại

- Lệnh git Ai hướng dẫn

### 5. Phần loại bỏ / chỉnh sửa và lý do

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: https://github.com/ngoctramcam/ECommerce-Project/tree/feature

## AI-02 – <Tạo test case TM-05 Giỏ hàng>

- **Ngày / Người dùng AI:** 11/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] docs/test-case.md

### 1. Mục đích

Nhờ AI viế 5 test case cho chức năng giỏ hàng

### 2. Prompt đã dùng

Hãy tạo cho tôi 5 test casecho chức năng giỏ hàng cho trang web thương mại điện tử tui đang làm theo đặc tả từ tệp đính kèm

### 3. Kết quả AI trả về (tóm tắt)

AI đưa ra tổng cộng 5 test case cho chức năng giỏ hàng

### 4. Phần giữ lại

- 5 test case gồm có: thêm khi giỏ hàng đa tồn tại, thêm sản phẩm khi giỏ hàng chưa có sản phẩm, thêm sản phẩm vượt quá số lượng tồn, xóa sản phẩm khỏi giỏ, kiểm tra tính tổng tiền

### 5. Phần loại bỏ / chỉnh sửa và lý do

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)

## AI-03 – <Tạo test case TM-04 chức năng đăng ký/đăng nhập >

- **Ngày / Người dùng AI:** 11/11/2026 – TV5
- **Công cụ AI:** copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] docs/test-case.md

### 1. Mục đích

Nhờ AI Liệt kê lỗi bảo mật hay gặp và gợi ý những test case cần có.

### 2. Prompt đã dùng

Liệt kê lỗi bảo mật và gợi ý những test case cần có cho TM-04 chức năng đăng ký đăng nhập.

### 3. Kết quả AI trả về (tóm tắt)

Đưa ra những lỗi hay gặp như:

- Mật khẩu lưu dạng thuần
- Không kiểm tra độ dài mật khẩu
- Dùng MD5 hoặc SHA1
- Không validate email unique
- SQL Injection
- XSS
- CSRF
- Log mật khẩu
- Mass Assignment
- User Enumeration
- Không giới hạn request
- Tài khoản admin seed sẵn bằng mật khẩu yếu
  Đưa ra những test case cần kiểm tra như:
- Đăng ký thành công
- Email trùng
- Password ngắn
- Thiếu email
- Email sai định dạng
- Kiểm tra hash password
- Chống SQL Injection
- Chống XSS

### 4. Phần giữ lại

- Giữ lại các test case
- ...

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Thêm vào những cái như ID, Bước thực hiện, dữ liệu test, kết quả mong đợi, kết quả thực tế

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)

## AI-04 – Viết chức năng thêm sản phẩm vào giỏ hàng

- **Ngày / Người dùng AI:** 16/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [TM-05] Giỏ hàng

### 1. Mục đích

Nhờ AI hỗ trợ xây dựng đầy đủ chức năng giỏ hàng cho người dùng (thêm sản phẩm vào giỏ, xem danh sách sản phẩm trong giỏ, cập nhật số lượng, xóa sản phẩm khỏi giỏ) trên hệ thống Laravel + React.

### 2. Prompt đã dùng

Tôi đang làm chức năng giỏ hàng bằng Laravel và React. Cần xử lý đầy đủ các trường hợp: kiểm tra người dùng đã đăng nhập chưa, sản phẩm có tồn tại và còn kinh doanh không, số lượng tồn kho có đủ không; đồng thời xử lý khi thêm lại sản phẩm đã từng xóa mềm (SoftDeletes) khỏi giỏ hàng để không bị lỗi trùng khóa unique(user_id, product_id).

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp mã nguồn CartService (gồm các hàm thêm, lấy danh sách, cập nhật số lượng, xóa sản phẩm), CartController kiểm tra dữ liệu đầu vào và trạng thái đăng nhập, các route xử lý tương ứng cùng logic gọi API từ giao diện React.

### 4. Phần giữ lại

- Giữ lại luồng kiểm tra điều kiện trước khi thêm vào giỏ (đăng nhập, tồn tại sản phẩm, trạng thái status = 1, đối chiếu số lượng với stock).

- Giữ lại cách dùng withTrashed() và restore() trong CartService để khôi phục bản ghi cũ khi thêm lại sản phẩm đã xóa mềm, tránh lỗi Duplicate entry trên cặp (user_id, product_id).

### 5. Phần loại bỏ chỉnh sửa và lý do

- Chỉnh sửa lại tên cột khóa chính thành cart_id, product_id và các thuộc tính cho khớp chính xác với Model CartItem và Product trong dự án.

- Điều chỉnh lại cấu trúc route và cách gửi CSRF Token cho đồng bộ với file routes/web.php của hệ thống.

### 6. AI sai hoặc chưa chắc chắn ở đâu

Ban đầu AI mặc định khóa chính của bảng là id thay vì cart_id / product_id, và chưa lường trước lỗi trùng khóa duy nhất (user_id, product_id) nếu chỉ truy vấn bằng where() thông thường mà bỏ qua các dòng đã xóa mềm (SoftDeletes).

### 7. Cách kiểm chứng

- Đối chiếu trực tiếp tên cột, khóa chính và quan hệ với file app/Models/CartItem.php, app/Models/Product.php và cấu trúc bảng trong phpMyAdmin.

- Chạy test thực tế trên trình duyệt: thêm sản phẩm khi chưa đăng nhập, thêm vượt quá stock, thêm sản phẩm ngừng kinh doanh (status = 0), xóa sản phẩm khỏi giỏ rồi thêm lại để xác nhận dữ liệu cập nhật chính xác và không phát sinh lỗi SQL.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...] (https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang)

## AI-05 – Rà soát và hoàn thiện logic Trang giỏ hàng (Cart Page)

- **Ngày / Người dùng AI:** 20/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [TM-05] Giỏ hàng

### 1. Mục đích

Nhờ AI viết chức năng Trang giỏ hàng cho người dùng (hiển thị danh sách sản phẩm trong giỏ, sửa số lượng không vượt quá tồn kho, xóa sản phẩm khỏi giỏ và tính tổng tiền) sử dụng Laravel và React.

### 2. Prompt đã dùng

Tôi đang làm Trang giỏ hàng cho website bán sách bằng Laravel và React. Hãy giúp tôi viết đầy đủ các chức năng: hiển thị danh sách sản phẩm trong giỏ hàng, cập nhật số lượng (kiểm tra không được vượt quá số lượng tồn kho stock), xóa sản phẩm khỏi giỏ và tự động tính tổng tiền thanh toán.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp trọn bộ mã nguồn xử lý phía backend (CartService và CartController gồm các hàm lấy danh sách giỏ hàng, cập nhật số lượng có kiểm tra stock, xóa sản phẩm) cùng component giao diện React hiển thị bảng giỏ hàng và tính tổng tiền tự động.

### 4. Phần giữ lại

- Giữ lại logic kiểm tra số lượng cập nhật so với cột stock trong bảng products và trả về thông báo lỗi rõ ràng khi vượt tồn kho.

- Giữ lại luồng cập nhật số lượng, xóa sản phẩm và công thức tính lại thành tiền từng món cũng như tổng thanh toán trên giao diện React.

### 5. Phần loại bỏ chỉnh sửa và lý do

- Sửa lại tên khóa chính và tên cột (cart_id, product_id, user_id, quantity, price) cho khớp chính xác với Model CartItem và Product trong dự án.

- Điều chỉnh lại cách gọi route và cấu trúc dữ liệu JSON trả về để đồng bộ với hệ thống đăng nhập hiện tại.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ban đầu AI đặt tên cột khóa chính là id và tên cột số lượng là qty chưa đúng với cấu trúc bảng cart_items thực tế trong CSDL.

### 7. Cách kiểm chứng

- Đối chiếu tên cột và quan hệ trong file app/Models/CartItem.php, app/Models/Product.php và bảng cart_items trên phpMyAdmin.
- Chạy kiểm thử thực tế trên trình duyệt (http://127.0.0.1:8000):
  Tăng/nhập số lượng lớn hơn số lượng tồn kho (stock = 20) $\rightarrow$ hệ thống chặn lại và hiện thông báo "Số lượng vượt tồn kho (còn lại 20 sản phẩm)".  
  Tăng/giảm số lượng hợp lệ $\rightarrow$ số lượng trong CSDL cập nhật theo và tổng tiền tự động tính lại đúng.Bấm xóa sản phẩm $\rightarrow$ sản phẩm biến mất khỏi giỏ hàng và tổng thanh toán cập nhật lại.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...] (https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang)

## AI-06 – Xây dựng và hoàn thiện trang Đơn hàng của tôi (My Orders Page)

- **Ngày / Người dùng AI:** 22/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [TM-07] Đơn hàng của tôi

### 1. Mục đích

Nhờ AI hỗ trợ xây dựng chức năng Đơn hàng của tôi (My Orders) cho người dùng từ trang cá nhân (Profile), bao gồm: lấy danh sách lịch sử đơn hàng và chi tiết sách từ CSDL, hiển thị giao diện responsive, cập nhật trạng thái đơn hàng (Hủy đơn hàng, Xác nhận đã nhận / Không nhận) và tự động hoàn lại số lượng tồn kho khi hủy đơn sử dụng Laravel và React.

### 2. Prompt đã dùng

Tôi đang làm trang Đơn hàng của tôi cho website bán sách bằng Laravel và React (Tailwind CSS). Dựa trên cấu trúc bảng `orders`, `order_items`, `products`, `vouchers`, hãy giúp tôi viết `OrderController` để lấy danh sách đơn hàng của người dùng đang đăng nhập, cập nhật trạng thái đơn hàng (hủy đơn, xác nhận đã nhận/không nhận, hoàn lại số lượng tồn kho `stock` khi hủy đơn) và hoàn thiện giao diện `MyOrdersPage.jsx` responsive theo thiết kế.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp mã nguồn xử lý phía backend (`OrderController.php` gồm hàm `index` truy vấn đơn hàng qua Eloquent eager loading và hàm `updateStatus` dùng transaction cập nhật trạng thái kèm hoàn tồn kho) cùng component giao diện React (`MyOrdersPage.jsx`) hiển thị danh sách thẻ đơn hàng, chuẩn hóa trạng thái và xử lý các nút thao tác theo từng trạng thái đơn.

### 4. Phần giữ lại

- Giữ lại cấu trúc truy vấn Eloquent `Order::with(['orderItems.product', 'voucher'])` để lấy đầy đủ thông tin đơn hàng, danh sách sách và mã giảm giá áp dụng.

- Giữ lại logic dùng `DB::transaction` và `lockForUpdate()` trong hàm `updateStatus` để đảm bảo cộng hoàn lại số lượng (`increment('stock', $item->quantity)`) chính xác và tránh hoàn kho trùng lặp khi khách hủy đơn.

- Giữ lại bố cục giao diện thẻ đơn hàng responsive (Desktop & Mobile) cùng hàm `normalizeStatus()` chuẩn hóa trạng thái tiếng Việt/tiếng Anh từ CSDL để hiển thị đúng nút thao tác (_Hủy đơn hàng_, _Không nhận/Đã nhận_, _Đánh giá_).

### 5. Phần loại bỏ chỉnh sửa và lý do

- Sửa lại tên các cột thông tin người nhận (`recipient_name`, `recipient_phone`), giá đơn hàng (`unit_price`) và khóa chính (`order_id`, `order_item_id`) cho khớp chính xác với Model `Order` và `OrderItem` trong dự án.

- Bổ sung hàm `normalizeStatus()` ở frontend để khớp cả giá trị trạng thái lưu bằng tiếng Việt (`Chờ xác nhận`, `Đang giao`, `Hoàn thành`, `Đã hủy`) lẫn tiếng Anh trong CSDL.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ban đầu AI đặt tên cột là `receiver_name`, `receiver_phone` và `price` chưa khớp với tên cột thực tế (`recipient_name`, `recipient_phone`, `unit_price`) trong Model `Order` và `OrderItem`.

- Ban đầu AI chỉ kiểm tra trạng thái chuỗi tiếng Anh (`pending`, `shipping`, `completed`) nên chưa nhận diện được dữ liệu trạng thái tiếng Việt từ Seeder, và chưa tự động cộng hoàn số lượng tồn kho `stock` khi khách bấm hủy đơn hàng.

### 7. Cách kiểm chứng

- Đối chiếu tên cột, khóa ngoại và quan hệ trong file `app/Models/Order.php`, `app/Models/OrderItem.php`, các file migration và dữ liệu thực tế trên phpMyAdmin (`bookstore_db`).
- Chạy kiểm thử thực tế trên trình duyệt (`http://127.0.0.1:8000`):
  - Truy cập từ trang Tài khoản (`/profile`) $\rightarrow$ bấm vào trang Đơn hàng của tôi (`/orders`) $\rightarrow$ hiển thị đúng danh sách đơn hàng của tài khoản đang đăng nhập kèm thông tin người nhận, sách, mã giảm giá và tổng tiền.
  - Bấm **Hủy đơn hàng** ở đơn _Chờ xác nhận_ $\rightarrow$ trạng thái đơn chuyển sang _Đã hủy_, nút hủy ẩn đi và số lượng tồn kho (`stock`) của các sách trong đơn được cộng hoàn lại chính xác trong bảng `products`.
  - Bấm **Đã nhận** / **Không nhận** ở đơn _Đang giao_ $\rightarrow$ trạng thái cập nhật xuống CSDL và giao diện đổi sang nút _Đánh giá_ (khi hoàn thành) hoặc _Đã hủy_ (khi không nhận).

### 8. Sản phẩm cuối cùng

Link commit/PR: https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang

## AI-07 – Xây dựng và hoàn thiện trang Quản lý Đơn hàng Admin (Admin Order Management)

- **Ngày / Người dùng AI:** 23/11/2026 – TV5
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** [TM-13] Quản lý đơn hàng (Admin)

### 1. Mục đích

Nhờ AI hỗ trợ xây dựng chức năng Quản lý Đơn hàng dành cho Quản trị viên (Admin) sử dụng Laravel và React (Tailwind CSS), bao gồm: hiển thị danh sách đơn hàng từ CSDL theo giao diện responsive (bảng 7 cột trên Desktop và danh sách thẻ dọc trên Mobile), tìm kiếm theo mã đơn / tên người nhận / số điện thoại, lọc theo trạng thái đơn hàng, phân trang và kiểm soát luồng chuyển trạng thái một chiều (**Chờ xác nhận → Đang giao → Hoàn thành**, hoặc rẽ sang **Đã hủy**, cấm đi ngược và tự động hoàn lại số lượng tồn kho khi hủy đơn).

### 2. Prompt đã dùng

Tôi đang làm trang Quản lý Đơn hàng cho Admin (`AdminOrdersPage.jsx`) trên website bán sách bằng Laravel và React (Tailwind CSS). Dựa trên bản thiết kế Desktop & Mobile và cấu trúc bảng `orders`, `order_items`, `products`, `users`, `vouchers`, hãy giúp tôi viết API (`adminIndex`, `adminUpdateStatus`) trong `OrderController.php` và giao diện React để lọc đơn hàng theo trạng thái, tìm kiếm, phân trang và ép luồng chuyển trạng thái một chiều (_Chờ xác nhận → Đang giao → Hoàn thành_ hoặc _→ Đã hủy_), không cho đi ngược.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp 2 phương thức xử lý phía backend (`adminIndex` truy vấn danh sách đơn hàng có lọc theo trạng thái từ CSDL và `adminUpdateStatus` sử dụng transaction cùng mảng quy tắc chuyển trạng thái một chiều `$allowedTransitions`) kết hợp component giao diện React `AdminOrdersPage.jsx` hỗ trợ hiển thị dạng bảng trên Desktop, dạng thẻ dọc trên Mobile, tìm kiếm, lọc trạng thái, lọc phương thức thanh toán và phân trang.

### 4. Phần giữ lại

- Giữ lại mảng quy tắc chuyển trạng thái một chiều `$allowedTransitions` và biểu thức `match()` chuẩn hóa trạng thái ở backend để chặn tuyệt đối thao tác chuyển ngược trạng thái hoặc sửa đổi đơn hàng đã _Hoàn thành_ / _Đã hủy_.

- Giữ lại logic dùng `DB::transaction` và `lockForUpdate()` tự động cộng hoàn lại số lượng tồn kho (`increment('stock', $item->quantity)`) vào bảng `products` khi Admin hủy đơn.

- Giữ lại bố cục giao diện responsive hai phiên bản (bảng 7 cột trên Desktop và danh sách thẻ lưới 2x2 trên Mobile) kèm bộ lọc trạng thái, thanh tìm kiếm và phân trang 6 đơn/trang.

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Gộp sạch các hàm `adminIndex` và `adminUpdateStatus` vào chung một class `OrderController` với hàm `store` đặt hàng hiện có của nhóm, loại bỏ phần khai báo trùng lặp.

- Bổ sung định dạng mã đơn hàng (`ĐHxxx`), mã người dùng (`NDxxx`), giờ đặt hàng (`H:i`), mã giảm giá (`voucher_code`) và tên phương thức thanh toán hiển thị tiếng Việt (_Thanh toán khi nhận hàng_, _Chuyển khoản_) cho khớp với dữ liệu CSDL và giao diện thiết kế.

- Đặt khai báo route `/api/admin/orders` và `/api/admin/orders/{id}/status` lên phía trên route catch-all `/{any}` trong `routes/web.php` để tránh bị React Router chặn gây lỗi `404`.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Khi ghép code mới vào file `OrderController.php` đã có sẵn code của nhóm, việc dán nối trực tiếp gây trùng khai báo `class OrderController` và hàm `adminIndex()` dẫn đến lỗi `FatalError` trước khi được rà soát và gộp gọn lại thành một class duy nhất.

- Ban đầu API `adminIndex` chưa trả về đầy đủ 3 trường phụ trợ (`user_code`, `order_time`, `voucher_code`) khiến một số cột trên giao diện phải dùng giá trị mặc định cho đến khi được bổ sung trích xuất từ CSDL.

### 7. Cách kiểm chứng

- Kiểm tra cú pháp `app/Http/Controllers/OrderController.php`, thứ tự khai báo route trong `routes/web.php`, chạy `php artisan route:clear` và đối chiếu dữ liệu bảng `orders` trên phpMyAdmin.
- Chạy kiểm thử thực tế trên trình duyệt (`http://127.0.0.1:8000/admin/orders`):
  - Chọn từng mục trong dropdown lọc trạng thái (_Chờ xác nhận_, _Đang giao_, _Hoàn thành_, _Đã hủy_) và nhập từ khóa tìm kiếm $\rightarrow$ danh sách lọc đúng các đơn hàng tương ứng và phân trang hoạt động chính xác trên cả màn hình Desktop lẫn Mobile.
  - Bấm **Xác nhận** ở đơn _Chờ xác nhận_ $\rightarrow$ đơn chuyển sang _Đang giao_ (không có nút quay lại _Chờ xác nhận_).
  - Bấm **Hoàn thành** ở đơn _Đang giao_ $\rightarrow$ đơn chuyển sang _Hoàn thành_ và khóa toàn bộ nút chuyển trạng thái.
  - Bấm **Hủy** ở đơn chưa hoàn thành $\rightarrow$ đơn chuyển sang _Đã hủy_, khóa thao tác và số lượng tồn kho (`stock`) của các sản phẩm trong đơn được cộng hoàn lại trong CSDL.

### 8. Sản phẩm cuối cùng

Link commit/PR: https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-13-quan-ly-don

## AI-08 – Viết Unit Test kiểm tra ràng buộc thêm vượt tồn kho trong CartService

- **Ngày / Người dùng AI:** 25/11/2026 – TV5
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** test/TM-05

### 1. Mục đích

Nhờ AI hỗ trợ xây dựng bộ kiểm thử tự động (Unit Test) bằng PHPUnit trong Laravel (`tests/Unit/CartServiceTest.php`) để xác minh rằng hệ thống từ chối thao tác thêm sản phẩm vào giỏ hàng khi số lượng yêu cầu vượt quá số lượng tồn kho (`stock`) hiện có, đồng thời đảm bảo vẫn thêm thành công khi số lượng nằm trong giới hạn tồn kho.

### 2. Prompt đã dùng

Tôi cần viết Unit Test cho `CartService` (`tests/Unit/CartServiceTest.php`) sử dụng `RefreshDatabase` trên SQLite `:memory:` để kiểm tra 2 trường hợp: (1) thêm sản phẩm vào giỏ hàng với số lượng vượt quá `stock` thì bị từ chối và không lưu vào bảng `cart_items`, và (2) thêm sản phẩm với số lượng hợp lệ trong giới hạn tồn kho thì lưu thành công vào CSDL.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp lớp kiểm thử `CartServiceTest` gồm 2 phương thức test (`test_them_vao_gio_vuot_ton_kho_bi_tu_choi` và `test_them_vao_gio_hop_le_trong_gioi_han_ton_kho`) kèm hàm khởi tạo dữ liệu mẫu `seedUserAndProduct()` tạo bản ghi người dùng, danh mục và sản phẩm có tồn kho xác định (`stock = 5`) trên database ảo `:memory:`.

### 4. Phần giữ lại

- Giữ lại 2 kịch bản kiểm thử chính trong `tests/Unit/CartServiceTest.php`: kiểm tra từ chối khi `quantity > stock` (`6 > 5`) kết hợp `assertDatabaseMissing('cart_items', ...)` và kiểm tra thành công khi `quantity <= stock` (`3 <= 5`) kết hợp `assertDatabaseHas('cart_items', ...)`.

- Giữ lại cơ chế hỗ trợ bắt cả hai kiểu phản hồi nghiệp vụ (ném `Exception` hoặc trả về mảng `['success' => false]`) để đảm bảo tính tương thích với logic xử lý của `CartService`.

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Thay thế `User::factory()->create()` bằng `DB::table('users')->insertGetId([...])` sử dụng đúng tên cột `full_name` theo schema migration thực tế của dự án, khắc phục lỗi `SQLSTATE[HY000]: General error: 1 table users has no column named name`.

- Bổ sung đầy đủ các trường `NOT NULL` khi khởi tạo dữ liệu test (`slug` cho bảng `categories`; `slug`, `author`, `image` cho bảng `products`) và đối chiếu chính xác chữ ký phương thức thêm giỏ hàng trong `app/Services/CartService.php`.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ở lần tạo code đầu tiên, AI sử dụng `User::factory()->create()` mặc định của Laravel vốn chèn cột `name`, không khớp với cấu trúc bảng `users` dùng cột `full_name` của nhóm.

- Do chưa có trước tên hàm chính xác trong `CartService.php`, AI ban đầu gọi tên mặc định `addToCart()` gây cảnh báo `Undefined method` trước khi được rà soát và chỉnh lại đúng tên hàm và tham số thực tế của `CartService`.

### 7. Cách kiểm chứng

- Chạy lệnh kiểm thử tự động trong terminal:
  `php artisan test --filter=CartServiceTest`
- Kết quả terminal hiển thị **`PASS  Tests\Unit\CartServiceTest`** với cả 2 test case đều đạt (`2 passed`):
  - `test_them_vao_gio_vuot_ton_kho_bi_tu_choi`: hệ thống từ chối yêu cầu thêm số lượng `6` khi `stock = 5` và bảng `cart_items` không phát sinh bản ghi vượt tồn kho.
  - `test_them_vao_gio_hop_le_trong_gioi_han_ton_kho`: hệ thống thêm thành công số lượng `3` vào bảng `cart_items`.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...] (https://github.com/ngoctramcam/ECommerce-Project/tree/test/TM-05)

## AI-09 – Tổng hợp bộ kịch bản kiểm thử (Test Cases) cho 12 chức năng hệ thống (`docs/test-cases.md`)

- **Ngày / Người dùng AI:** 25/11/2026 – TV5
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** docs/test-cases.md

### 1. Mục đích

Nhờ AI hỗ trợ hệ thống hóa và biên soạn bộ tài liệu kịch bản kiểm thử chi tiết (`docs/test-cases.md`) bao phủ đầy đủ 12 chức năng cốt lõi của hệ thống từ `TM-01` đến `TM-14`, đảm bảo mỗi chức năng có ít nhất 2 test case (cả luồng thành công và luồng ngoại lệ/validation) bám sát cấu trúc CSDL và nghiệp vụ thực tế của dự án.

### 2. Prompt đã dùng

Tôi cần tổng hợp tài liệu `docs/test-cases.md` cho 12 chức năng bắt buộc theo danh sách mã chức năng của dự án (`TM-01` Trang chủ, `TM-02` Tìm kiếm & lọc sản phẩm, `TM-03` Xem chi tiết sản phẩm, `TM-04` Đăng ký & đăng nhập, `TM-05` Giỏ hàng, `TM-06` Đặt hàng COD, `TM-07` Đơn hàng của tôi, `TM-08` Hồ sơ cá nhân, `TM-11` Quản lý danh mục, `TM-12` Quản lý sản phẩm, `TM-13` Quản lý đơn hàng, `TM-14` Quản lý người dùng), mỗi chức năng tối thiểu 2 test case đầy đủ các cột: Mã TC, Tên Test Case, Điều kiện tiên quyết, Các bước thực hiện, Kết quả mong đợi và Trạng thái.

### 3. Kết quả AI trả về (tóm tắt)

AI tạo ra bộ tài liệu Markdown hoàn chỉnh gồm 24 test cases (`TC-01` đến `TC-24`) chia đều cho 12 nhóm chức năng theo đúng thứ tự mã `TM-01` – `TM-14`, trình bày dưới dạng bảng chuẩn kèm kịch bản kiểm thử giao diện lẫn kiểm thử mức dịch vụ (Unit Test cho `CartService` và `CategoryService`).

### 4. Phần giữ lại

- Giữ lại cấu trúc bảng 6 cột rõ ràng và toàn bộ 24 test cases trải đều cho 12 chức năng từ `TM-01` đến `TM-14`.
- Giữ lại các kịch bản kiểm tra ràng buộc nghiệp vụ quan trọng như: từ chối thêm vào giỏ khi vượt tồn kho (`TC-10`), chặn đặt hàng COD khi thiếu thông tin nhận hàng (`TC-12`), tự động hoàn kho khi khách hủy đơn (`TC-14`), chặn xóa danh mục đang có sản phẩm (`TC-18`), và luồng chuyển trạng thái đơn hàng một chiều (`TC-22`).

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Lược bỏ các chức năng không nằm trong danh sách 12 chức năng bắt buộc của nhóm (như quản lý mã giảm giá riêng lẻ) và thay thế bằng đúng 2 chức năng có trong bảng đặc tả của nhóm là **Hồ sơ cá nhân (`TM-08`)** và **Quản lý người dùng (`TM-14`)**.
- Điều chỉnh tên bảng, tên cột (`full_name`, `product_id`, `cart_items`, `orders`, `is_delete`) và mã trạng thái đơn hàng (`PENDING`, `PROCESSING`, `SHIPPING`, `COMPLETED`, `CANCELLED`) trong phần *Điều kiện tiên quyết* và *Kết quả mong đợi* để khớp 100% với migration và code thực tế của nhóm.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ở bản nháp đầu tiên khi chưa có bảng danh sách mã `TM-01` – `TM-14`, AI tự liệt kê 12 chức năng theo mẫu chung (có mục Voucher và Thống kê tách riêng) thay vì `TM-08` (Hồ sơ cá nhân) và `TM-14` (Quản lý người dùng); sau khi cung cấp ảnh danh sách mã chức năng của nhóm, AI đã cập nhật lại chính xác.

### 7. Cách kiểm chứng

- Đối chiếu chéo từng mã chức năng `TM-01` đến `TM-14` trong file `docs/test-cases.md` với bảng danh sách chức năng của nhóm (đảm bảo đủ 12 chức năng và 24 test cases).
- Thực thi kiểm thử thủ công trên trình duyệt và chạy các bài Unit Test tự động (`CartServiceTest`, `CategoryServiceTest`) để xác nhận toàn bộ 24 test case đều cho kết quả thực tế khớp với *Kết quả mong đợi*.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...] (https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)

## AI-10 – Nâng cấp giao diện Responsive trang Đơn hàng của tôi (`MyOrdersPage.jsx`), bổ sung Popup Chi tiết đơn hàng và sửa lỗi cập nhật trạng thái

- **Ngày / Người dùng AI:** 25/11/2026 – TV5
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** fix/TM-07-don-cua-toi

### 1. Mục đích

Nhờ AI hỗ trợ thiết kế lại trang **Đơn hàng của tôi** (`MyOrdersPage.jsx`) bằng React và Tailwind CSS để hiển thị chuẩn responsive trên cả máy tính (Desktop) và điện thoại (Mobile), bổ sung **Popup Chi tiết đơn hàng** kèm lịch sử trạng thái, hỗ trợ đầy đủ 5 trạng thái đơn hàng của hệ thống và khắc phục lỗi không hủy được đơn hàng (`The selected status is invalid.`).

### 2. Prompt đã dùng

Tôi đang làm giao diện trang Đơn hàng của tôi bằng Laravel kết hợp React (`MyOrdersPage.jsx`). Nhờ AI viết lại giao diện responsive cho cả 2 màn hình máy tính và điện thoại theo mẫu thiết kế, bổ sung đầy đủ 5 trạng thái đơn hàng (`pending`, `processing`, `shipping`, `completed`, `cancelled`), thêm Popup xem chi tiết đơn hàng trên cả 2 giao diện và sửa lỗi báo `The selected status is invalid.` khi nhấn nút Hủy đơn hàng.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp trọn bộ mã nguồn component `MyOrdersPage.jsx` tích hợp Tailwind CSS chia bố cục 3 cột trên Desktop và thẻ dọc trên Mobile, bổ sung trạng thái `processing` (*Đang xử lý*), xây dựng Modal Popup Chi tiết đơn hàng (tự co giãn thành bottom-sheet trên Mobile, hiển thị thông tin người nhận, danh sách sách, tạm tính/giảm giá/tổng tiền, timeline trạng thái và các nút thao tác) đồng thời chẩn đoán và sửa lỗi gửi sai định dạng chữ hoa/thường trong hàm `handleUpdateStatus`.

### 4. Phần giữ lại

- Giữ lại bố cục responsive 2 màn hình: Desktop hiển thị 3 cột (*Sản phẩm – Đơn giá – Thành tiền*), Mobile xếp dọc giá dưới tên sách và chia đôi/giãn rộng các nút hành động (`Không nhận`, `Đã nhận`, `Đánh giá`) để dễ thao tác.
- Giữ lại Modal Popup Chi tiết đơn hàng kèm timeline lịch sử trạng thái (`Chờ xác nhận` → `Đang xử lý` → `Đang giao` → `Hoàn thành` / `Đã hủy`) và cơ chế khóa cuộn trang nền, đóng nhanh bằng phím `ESC` hoặc nhấn ra ngoài vùng modal.
- Giữ lại các endpoint API gốc của dự án (`GET /api/orders` với tham số `user_id` và `PATCH /api/orders/{id}/status`).

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Loại bỏ đoạn code gọi endpoint giả định `GET /api/orders` và `PATCH /api/orders/{id}/cancel` từ bản nháp đầu tiên (gây lỗi `404 Not Found`), giữ nguyên đúng route `GET /api/orders` và `PATCH /api/orders/{id}/status` đang hoạt động của nhóm.
- Sửa lại hàm `handleUpdateStatus` trong `MyOrdersPage.jsx`: đổi từ `newStatus.toUpperCase()` sang **`newStatus.toLowerCase()`** (`'cancelled'`, `'completed'`) để khớp với quy tắc Validation (`Rule::in`) của Backend Laravel, khắc phục triệt để thông báo lỗi `The selected status is invalid.` khi khách hàng bấm **Hủy đơn hàng**.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ban đầu khi chưa có file `MyOrdersPage.jsx` gốc, AI viết code theo hướng Blade template và tự đặt tên endpoint `/api/my-orders` gây lỗi `404` khi ghép vào React SPA của nhóm.
- Ở lần cập nhật đầu tiên cho React, AI chuyển chuỗi `status` gửi lên API sang chữ in hoa (`CANCELLED`) làm không khớp với rule kiểm tra chữ thường (`cancelled`) của Backend, dẫn đến lỗi validation `422` (`The selected status is invalid.`) trước khi được đối chiếu và sửa lại thành `.toLowerCase()`.

### 7. Cách kiểm chứng

- Kiểm tra giao diện trên trình duyệt (DevTools chuyển đổi qua lại giữa kích thước Desktop `1280px` và Mobile `375px`): danh sách đơn hàng hiển thị đủ 5 trạng thái, bấm vào thẻ đơn hoặc nút **Xem chi tiết** mở Popup mượt mà, không bị tràn khung hình.
- Thử thao tác nhấn **Hủy đơn hàng** trên đơn ở trạng thái *Chờ xác nhận*: xác nhận **OK** không còn thông báo `The selected status is invalid.`, trạng thái đơn chuyển ngay sang badge đỏ **Đã hủy** và cập nhật đúng trong cơ sở dữ liệu.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...] (https://github.com/ngoctramcam/ECommerce-Project/tree/fix/TM-07-don-cua-toi)

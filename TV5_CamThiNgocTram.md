# AI log – TV5 – Cam Thị Ngọc Trâm

| Mục             | Thông tin                                             |
| --------------- | ----------------------------------------------------- |
| Họ tên, MSSV    | Cam Thị Ngọc Trâm - 0306241330                        |
| Nhóm, đề tài    | Nhóm 3 – Xây dựng website thương mại điện tử bán sách |
| Vai trò         | TV5 – Git/Tester                                      |
| Công cụ AI dùng | GitHub Copilot                                        |

## Bảng tổng hợp

| Mã    | Ngày       | Giai đoạn | Nội dung                                        | Commit / PR                                                                         |
| ----- | ---------- | --------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| AI-01 | 10/11/2026 | Thiết kế  | Hỏi về các lệnh Git                             | [commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feature)             |
| AI-02 | 11/11/2026 | Thiết kế  | Tạo test case TM-05 chức năng giỏ hàng          | [Commit](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)   |
| AI-03 | 12/11/2026 | Thiết kế  | Tạo test case TM-04 chức năng đăng ký/đăng nhập | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database)       |
| AI-04 | 19/11/2026 | Lập trình | Nhờ AI viết chức năng giỏ hàng                  | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang) |

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

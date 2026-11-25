# TM-05 - Test Cases Giỏ Hàng

## Thông tin chung

| Thuộc tính    | Giá trị                                                        |
| ------------- | -------------------------------------------------------------- |
| Mã chức năng  | TM-05                                                          |
| Tên chức năng | Giỏ hàng                                                       |
| Mô tả         | Quản lý sản phẩm trong giỏ hàng và kiểm tra điều kiện mua hàng |

---

## Danh sách Test Case

| ID     | Mã chức năng | Bước thực hiện                                                                                    | Dữ liệu                         | Kết quả mong đợi                                                                                                                        | Kết quả thực tế |
| ------ | ------------ | ------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | TM-05        | 1. Đăng nhập tài khoản.<br>2. Truy cập trang chi tiết sản phẩm.<br>3. Nhấn **Thêm vào giỏ hàng**. | Sản phẩm A, tồn kho = 10        | Sản phẩm được thêm vào giỏ hàng với số lượng = 1. Biểu tượng giỏ hàng được cập nhật.                                                    |                 |
| TC-002 | TM-05        | 1. Thêm sản phẩm A vào giỏ hàng.<br>2. Tiếp tục nhấn **Thêm vào giỏ hàng** đối với cùng sản phẩm. | Sản phẩm A                      | Không tạo thêm dòng sản phẩm mới. Số lượng sản phẩm trong giỏ tăng từ 1 lên 2.                                                          |                 |
| TC-003 | TM-05        | 1. Mở trang giỏ hàng.<br>2. Thay đổi số lượng sản phẩm từ 1 thành 3.<br>3. Nhấn cập nhật.         | Sản phẩm A, đơn giá 100.000 VNĐ | Hệ thống cập nhật số lượng thành 3. Thành tiền sản phẩm là 300.000 VNĐ. Tổng tiền giỏ hàng được tính lại chính xác.                     |                 |
| TC-004 | TM-05        | 1. Mở giỏ hàng.<br>2. Chọn nút **Xóa** tại sản phẩm cần xóa.                                      | Sản phẩm A                      | Sản phẩm bị xóa khỏi giỏ hàng. Tổng tiền được cập nhật lại tương ứng. Nếu không còn sản phẩm nào thì hiển thị thông báo giỏ hàng trống. |                 |
| TC-005 | TM-05        | 1. Mở giỏ hàng.<br>2. Cập nhật số lượng sản phẩm vượt quá tồn kho.<br>3. Lưu thay đổi.            | Tồn kho = 5, nhập số lượng = 10 | Hệ thống từ chối cập nhật. Hiển thị thông báo **"Số lượng vượt quá tồn kho"**. Dữ liệu trong giỏ hàng không thay đổi.                   |                 |

---

## Kết quả kiểm thử

| Trạng thái | Ý nghĩa                                               |
| ---------- | ----------------------------------------------------- |
| Pass       | Chức năng hoạt động đúng theo yêu cầu                 |
| Fail       | Chức năng không đáp ứng kết quả mong đợi              |
| Blocked    | Không thể tiếp tục kiểm thử do lỗi hoặc thiếu dữ liệu |

# TM-04 - Test Cases Đăng Ký / Đăng Nhập

## Thông tin chung

| Thuộc tính    | Giá trị                                                 |
| ------------- | ------------------------------------------------------- |
| Mã chức năng  | TM-04                                                   |
| Tên chức năng | Đăng ký / Đăng nhập                                     |
| Mô tả         | Cho phép người dùng tạo tài khoản và đăng nhập hệ thống |

---

## Danh sách Test Case

| ID     | Mã chức năng | Bước thực hiện                                                               | Dữ liệu                     | Kết quả mong đợi                                            | Kết quả thực tế |
| ------ | ------------ | ---------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------- | --------------- |
| TC-001 | TM-04        | 1. Mở trang đăng ký.<br>2. Nhập đầy đủ thông tin.<br>3. Nhấn Đăng ký.        | user01@gmail.com / 12345678 | Tạo tài khoản thành công và lưu vào CSDL.                   |                 |
| TC-002 | TM-04        | 1. Mở trang đăng ký.<br>2. Nhập email đã tồn tại.<br>3. Nhấn Đăng ký.        | admin@gmail.com             | Hiển thị lỗi "Email đã tồn tại".                            |                 |
| TC-003 | TM-04        | 1. Nhập mật khẩu dưới 8 ký tự.<br>2. Nhấn Đăng ký.                           | 123456                      | Hiển thị lỗi mật khẩu tối thiểu 8 ký tự.                    |                 |
| TC-004 | TM-04        | 1. Để trống email.<br>2. Nhấn Đăng ký.                                       | Email rỗng                  | Hiển thị lỗi bắt buộc nhập email.                           |                 |
| TC-005 | TM-04        | 1. Nhập email sai định dạng.<br>2. Nhấn Đăng ký.                             | abcxyz                      | Hiển thị lỗi định dạng email không hợp lệ.                  |                 |
| TC-006 | TM-04        | 1. Đăng ký tài khoản thành công.<br>2. Kiểm tra dữ liệu trong DB.            | Password = 12345678         | Password được mã hóa (hash), không lưu dạng văn bản thường. |                 |
| TC-007 | TM-04        | 1. Mở trang đăng nhập.<br>2. Nhập thông tin chính xác.<br>3. Nhấn Đăng nhập. | user01@gmail.com / 12345678 | Đăng nhập thành công, chuyển đến trang phù hợp với vai trò. |                 |
| TC-008 | TM-04        | 1. Nhập sai mật khẩu.<br>2. Nhấn Đăng nhập.                                  | user01@gmail.com / abc12345 | Hiển thị lỗi đăng nhập.                                     |                 |
| TC-009 | TM-04        | 1. Nhập email không tồn tại.<br>2. Nhấn Đăng nhập.                           | notfound@gmail.com          | Hiển thị lỗi đăng nhập.                                     |                 |
| TC-010 | TM-04        | 1. Thử đăng ký với chuỗi SQL Injection.                                      | ' OR 1=1 --                 | Hệ thống không bị lỗi, không tạo tài khoản.                 |                 |
| TC-011 | TM-04        | 1. Nhập thẻ script vào họ tên.<br>2. Đăng ký.                                | <script>alert(1)</script>   | Script không được thực thi.                                 |                 |
| TC-012 | TM-04        | 1. Đăng nhập bằng tài khoản admin.                                           | admin@gmail.com             | Chuyển đến trang quản trị.                                  |                 |
| TC-013 | TM-04        | 1. Đăng nhập bằng tài khoản user.                                            | user01@gmail.com            | Chuyển đến trang người dùng.                                |                 |

---

## Kết quả kiểm thử

| Trạng thái | Ý nghĩa                                               |
| ---------- | ----------------------------------------------------- |
| Pass       | Chức năng hoạt động đúng theo yêu cầu                 |
| Fail       | Chức năng không đáp ứng kết quả mong đợi              |
| Blocked    | Không thể tiếp tục kiểm thử do lỗi hoặc thiếu dữ liệu |

# Tài Liệu Tổng Hợp Test Cases Hệ Thống Website Bán Sách

Tổng hợp kịch bản kiểm thử cho **12 chức năng bắt buộc** (`TM-01` – `TM-14`), mỗi chức năng gồm **2 test cases** (tổng cộng 24 test cases)

---

## 1. TM-01 – Trang chủ

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Hiển thị danh sách sản phẩm nổi bật / mới nhất trên Trang chủ | CSDL có dữ liệu sách trong bảng `products` và danh mục trong `categories`. | 1. Truy cập trang chủ `/`.<br>2. Quan sát mục và danh sách sách hiển thị. | Trang chủ tải thành công (HTTP 200), hiển thị đầy đủ ảnh bìa, tên sách, tác giả, giá bán và nút thao tác cho từng sản phẩm. | Pass |
| **TC-02** | Điều hướng từ Trang chủ sang trang Chi tiết sản phẩm và Giỏ hàng | Đang ở trang chủ `/`; CSDL có sản phẩm hợp lệ. | 1. Nhấn vào một thẻ sách bất kỳ trên trang chủ.<br>2. Quay lại trang chủ và nhấn vào biểu tượng **Giỏ hàng** trên Header. | Nhấn vào sách chuyển đúng sang `/products/{id}`; nhấn vào Giỏ hàng chuyển đúng sang `/cart`. | Pass |

---

## 2. TM-02 – Tìm kiếm, lọc sản phẩm

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-03** | Tìm kiếm sản phẩm theo từ khóa tên sách hoặc tác giả | CSDL có sách *"Nhà Giả Kim"* của tác giả *"Paulo Coelho"*. | 1. Nhập từ khóa `"Nhà Giả Kim"` vào ô tìm kiếm.<br>2. Nhấn Enter hoặc nút tìm kiếm. | Hệ thống trả về danh sách các cuốn sách có tên hoặc tác giả chứa từ khóa `"Nhà Giả Kim"`. | Pass |
| **TC-04** | Lọc sản phẩm theo danh mục | CSDL có danh mục *Văn học* và các sách thuộc danh mục này. | 1. Chọn danh mục **Văn học** trên bộ lọc/menu danh mục.<br>2. Quan sát danh sách kết quả. | Chỉ hiển thị các cuốn sách có `category_id` thuộc danh mục **Văn học**; các sách thuộc danh mục khác không xuất hiện. | Pass |

---

## 3. TM-03 – Xem chi tiết sản phẩm

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-05** | Xem chi tiết sản phẩm tồn tại trong hệ thống | Sách có `product_id = 1` và `stock > 0` tồn tại trong CSDL. | 1. Truy cập đường dẫn `/products/1`.<br>2. Kiểm tra các thông tin hiển thị trên trang. | Hiển thị đầy đủ ảnh bìa, tên sách, tác giả, danh mục, mô tả, giá bán, số lượng tồn kho và nút **Thêm vào giỏ hàng**. | Pass |
| **TC-06** | Xử lý khi truy cập sản phẩm không tồn tại hoặc đã hết hàng | `product_id = 9999` không tồn tại trong CSDL (hoặc sách có `stock = 0`). | 1. Truy cập `/products/9999` hoặc mở trang chi tiết sách có `stock = 0`. | Với ID không tồn tại: hiển thị thông báo không tìm thấy sản phẩm (404). Với sách `stock = 0`: hiển thị trạng thái **Hết hàng** và khóa nút thêm vào giỏ. | Pass |

---

## 4. TM-04 – Đăng ký, đăng nhập

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-07** | Đăng ký tài khoản mới thành công với dữ liệu hợp lệ | Chưa đăng nhập; email `newuser@gmail.com` chưa tồn tại trong bảng `users`. | 1. Mở trang `/register`.<br>2. Nhập `full_name`, email `newuser@gmail.com`, mật khẩu ≥ 8 ký tự và xác nhận mật khẩu khớp.<br>3. Nhấn **Đăng ký**. | Tạo bản ghi mới trong bảng `users` (mật khẩu được hash), thông báo đăng ký thành công và chuyển sang trang đăng nhập. | Pass |
| **TC-08** | Đăng nhập thất bại khi nhập sai mật khẩu | Tài khoản `newuser@gmail.com` đã tồn tại trong CSDL. | 1. Mở trang `/login`.<br>2. Nhập đúng email `newuser@gmail.com` nhưng nhập sai mật khẩu.<br>3. Nhấn **Đăng nhập**. | Hệ thống từ chối đăng nhập (HTTP 401/422), hiển thị thông báo *"Email hoặc mật khẩu không chính xác"* và không cấp phiên đăng nhập. | Pass |

---

## 5. TM-05 – Giỏ hàng

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-09** | Thêm sản phẩm vào giỏ hàng trong giới hạn tồn kho (Unit & UI Test) | Đã đăng nhập; sách có `stock = 5`. | 1. Mở trang chi tiết sách (hoặc gọi `CartService`).<br>2. Chọn số lượng `3` (`<= stock`) và nhấn **Thêm vào giỏ hàng**. | Bản ghi được lưu vào `cart_items` với `quantity = 3`, tổng tiền và số lượng trên icon giỏ hàng cập nhật chính xác. | Pass |
| **TC-10** | Từ chối thêm vào giỏ hàng khi vượt quá số lượng tồn kho (Unit Test `CartService`) | Đã đăng nhập; sách có `stock = 5`. | 1. Gọi `CartService` thêm số lượng `6` (`> stock`) hoặc tăng số lượng trong giỏ vượt `stock`. | Hệ thống từ chối thao tác, trả về thông báo vượt quá tồn kho và không lưu bản ghi vượt tồn kho vào `cart_items`. | Pass |

---

## 6. TM-06 – Đặt hàng COD

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-11** | Đặt hàng COD thành công từ giỏ hàng | Đã đăng nhập; giỏ hàng có sản phẩm đủ tồn kho (`stock >= quantity`). | 1. Mở trang thanh toán `/checkout`.<br>2. Nhập họ tên người nhận, SĐT hợp lệ, địa chỉ giao hàng, chọn thanh toán **COD**.<br>3. Nhấn **Đặt hàng**. | Tạo mới đơn hàng trong `orders` (trạng thái `PENDING`) và `order_items`; trừ `stock` trong `products`; xóa các mục đã đặt khỏi `cart_items`. | Pass |
| **TC-12** | Đặt hàng COD thất bại khi thiếu thông tin nhận hàng bắt buộc | Đã đăng nhập; giỏ hàng đang có sản phẩm. | 1. Mở trang `/checkout`.<br>2. Để trống **Số điện thoại** hoặc **Địa chỉ giao hàng**.<br>3. Nhấn **Đặt hàng**. | `OrderRequest` chặn lại (HTTP 422), hiển thị thông báo lỗi validation và không tạo đơn hàng hay trừ tồn kho. | Pass |

---

## 7. TM-07 – Đơn hàng của tôi

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-13** | Khách hàng xem danh sách lịch sử đơn hàng của chính mình | Đã đăng nhập với tài khoản `user_id = 2` có sẵn đơn hàng trong CSDL. | 1. Truy cập trang `/orders`.<br>2. Kiểm tra danh sách đơn hàng hiển thị. | Chỉ hiển thị các đơn hàng của `user_id = 2` kèm mã đơn (`DHxxx`), ngày đặt, chi tiết sản phẩm, tổng tiền và trạng thái. | Pass |
| **TC-14** | Khách hàng hủy đơn hàng đang chờ xác nhận và tự động hoàn kho | Đơn hàng của khách đang ở trạng thái `pending`, gồm 2 cuốn sách (`stock` hiện tại = 8). | 1. Mở trang `/orders`.<br>2. Nhấn **Hủy đơn hàng** (hoặc **Không nhận**) và xác nhận. | Trạng thái đơn chuyển thành `cancelled`; số lượng tồn kho của sách trong bảng `products` được cộng hoàn lại thành `10`. | Pass |

---

## 8. TM-08 – Hồ sơ cá nhân

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-15** | Cập nhật thông tin hồ sơ cá nhân thành công | Đã đăng nhập tài khoản khách hàng. | 1. Truy cập trang `/profile`.<br>2. Chỉnh sửa `full_name`, số điện thoại, địa chỉ mặc định.<br>3. Nhấn **Lưu thay đổi**. | Dữ liệu mới được cập nhật vào bảng `users` trong CSDL và hiển thị thông báo cập nhật thành công. | Pass |
| **TC-16** | Đổi mật khẩu thất bại khi nhập sai mật khẩu hiện tại | Đã đăng nhập tài khoản khách hàng. | 1. Mở mục Đổi mật khẩu tại `/profile`.<br>2. Nhập sai mật khẩu cũ, nhập mật khẩu mới hợp lệ và nhấn **Cập nhật**. | Hệ thống từ chối đổi mật khẩu, thông báo *"Mật khẩu hiện tại không chính xác"* và giữ nguyên mật khẩu cũ. | Pass |

---

## 9. TM-11 – Quản lý danh mục

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-17** | Thêm mới danh mục thành công | Đã đăng nhập quyền Admin. | 1. Mở trang Quản lý danh mục.<br>2. Nhập tên danh mục mới chưa tồn tại và nhấn **Thêm / Lưu**. | Tạo bản ghi mới trong bảng `categories` (tự sinh `slug`) và hiển thị ngay trong danh sách danh mục. | Pass |
| **TC-18** | Không cho phép xóa danh mục đang có sản phẩm (Unit Test `CategoryService`) | Danh mục *Văn học* đang chứa ít nhất 1 sản phẩm thuộc danh mục này. | 1. Gọi `CategoryService::delete()` hoặc nhấn **Xóa** danh mục *Văn học* trên trang Admin. | Hệ thống chặn thao tác xóa, trả về thông báo *"Không thể xóa danh mục đang có sản phẩm"* và giữ nguyên `deleted_at = null` trong CSDL. | Pass |

---

## 10. TM-12 – Quản lý sản phẩm

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-19** | Thêm sách mới thành công với dữ liệu hợp lệ | Đã đăng nhập quyền Admin; CSDL đã có danh mục. | 1. Mở trang Quản lý sản phẩm.<br>2. Nhập tên sách, tác giả, chọn danh mục, nhập `price = 95000`, `stock = 20`, ảnh bìa.<br>3. Nhấn **Lưu**. | Bản ghi sách mới được lưu vào bảng `products` và hiển thị đầy đủ trên giao diện Admin lẫn Trang chủ. | Pass |
| **TC-20** | Từ chối lưu sản phẩm khi giá bán ≤ 0 hoặc tồn kho < 0 | Đã đăng nhập quyền Admin. | 1. Mở form thêm/sửa sản phẩm.<br>2. Nhập `price = 0` (hoặc `stock = -5`) và nhấn **Lưu**. | Validation báo lỗi (`price > 0`, `stock >= 0`) và không lưu dữ liệu không hợp lệ vào CSDL. | Pass |

---

## 11. TM-13 – Quản lý đơn hàng

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-21** | Lọc danh sách đơn hàng Admin theo trạng thái và tìm kiếm | Đã đăng nhập quyền Admin; CSDL có nhiều đơn ở các trạng thái khác nhau. | 1. Truy cập `/admin/orders`.<br>2. Chọn trạng thái **Chờ xác nhận** ở bộ lọc dropdown và nhập mã đơn / SĐT vào ô tìm kiếm. | Danh sách hiển thị đúng các đơn hàng khớp trạng thái và từ khóa trên cả giao diện Desktop và Mobile. | Pass |
| **TC-22** | Chuyển trạng thái đơn hàng một chiều và chặn đi ngược | Đơn hàng `ĐH001` đang ở trạng thái *Chờ xác nhận*. | 1. Nhấn **Xác nhận** chuyển sang *Đang giao*, tiếp tục nhấn **Hoàn thành**.<br>2. Gửi request API chuyển ngược từ *Hoàn thành* về *Chờ xác nhận*. | Chuyển xuôi chiều thành công; khi đơn đã *Hoàn thành*, giao diện khóa nút thao tác và API trả về HTTP 422 chặn chuyển ngược. | Pass |

---

## 12. TM-14 – Quản lý người dùng

| Mã TC | Tên Test Case | Điều kiện tiên quyết | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-23** | Hiển thị danh sách và tìm kiếm người dùng trong trang Admin | Đã đăng nhập quyền Admin; bảng `users` có nhiều tài khoản. | 1. Truy cập trang Quản lý người dùng.<br>2. Nhập tên hoặc email khách hàng vào ô tìm kiếm. | Hiển thị đúng danh sách người dùng khớp từ khóa cùng các thông tin `user_id`, `full_name`, `email`, vai trò (`role`) và trạng thái. | Pass |
| **TC-24** | Cập nhật vai trò / khóa tài khoản người dùng và ngăn tự khóa chính mình | Đã đăng nhập bằng tài khoản Admin đang hoạt động. | 1. Thay đổi vai trò hoặc trạng thái hoạt động của một tài khoản khách hàng.<br>2. Thử khóa chính tài khoản Admin đang đăng nhập. | Cập nhật thành công cho tài khoản khách hàng; hệ thống chặn thao tác tự khóa hoặc hạ quyền chính tài khoản Admin hiện tại. | Pass |

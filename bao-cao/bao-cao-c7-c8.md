## Chương 7. Kiểm thử

### 7.1. Kế hoạch kiểm thử

#### 7.1.1. Phạm vi kiểm thử

Quá trình kiểm thử bao phủ toàn bộ các luồng nghiệp vụ chính và yêu cầu phi chức năng của hệ thống **Mộc Sách**, chia thành 2 phân hệ:

- **Phân hệ Khách hàng (Customer):** Đăng ký/đăng nhập tài khoản, tìm kiếm – lọc – sắp xếp sách, quản lý giỏ hàng (thêm, cập nhật số lượng, chọn một phần sản phẩm thanh toán, áp dụng mã giảm giá từ CSDL), đặt hàng (`COD`), theo dõi lịch sử đơn hàng, hủy đơn / xác nhận đã nhận hàng và đánh giá sản phẩm.
- **Phân hệ Quản trị viên (Admin):** Phân quyền truy cập khu vực `/admin`, CRUD danh mục, CRUD sản phẩm (ẩn/hiện, kiểm soát tồn kho), quản lý người dùng (khóa/mở khóa tài khoản), quản lý đơn hàng theo quy trình 1 chiều 5 trạng thái (`pending` → `processing` → `shipping` → `completed` / `cancelled`) và CRUD mã giảm giá (`voucher`).
- **Yêu cầu phi chức năng:** Kiểm thử giao diện đa thiết bị (Responsive Desktop & Mobile) và kiểm thử xử lý xung đột tồn kho khi nhiều khách hàng đặt hàng đồng thời (`TM-NFR1`).

#### 7.1.2. Các loại kiểm thử áp dụng

- **Kiểm thử đơn vị & tích hợp tầng Service (Unit & Feature Testing):** Kiểm thử tự động các phương thức nghiệp vụ cốt lõi trong `OrderService` và `ProductService` (tính tổng tiền, kiểm tra tồn kho, áp mã giảm giá, hoàn kho khi hủy đơn).
- **Kiểm thử chức năng (Functional / Black-box Testing):** Thực thi các kịch bản kiểm thử theo bộ `docs/test-cases.md` trên giao diện trình duyệt đối chiếu với dữ liệu thực tế trong MySQL.
- **Kiểm thử tương thích giao diện (Responsive UI Testing):** Kiểm tra hiển thị và thao tác trên 2 kích thước chuẩn: Desktop (`1280px`–`1440px`) và Mobile (`375px`–`414px`).
- **Kiểm thử đồng thời (Concurrency Testing):** Giả lập nhiều yêu cầu đặt hàng cùng lúc vào cùng một đầu sách có tồn kho giới hạn để đánh giá khả năng chống bán vượt tồn kho (overselling).
- **Kiểm thử chéo (Cross-Testing):** Trao đổi kiểm thử giữa 2 nhóm phát triển để phát hiện lỗi khách quan từ góc nhìn người dùng cuối.

#### 7.1.3. Công cụ kiểm thử

- **PHPUnit / Laravel Test (`php artisan test`):** Chạy bộ kiểm thử tự động phía Backend trên môi trường test độc lập.
- **Chrome DevTools (`F12`):** Theo dõi HTTP Request/Response (mã trạng thái `200`, `201`, `401`, `422`), kiểm tra `Local Storage` và giả lập màn hình thiết bị di động.
- **phpMyAdmin (XAMPP):** Đối chiếu trực tiếp sự thay đổi dữ liệu trên các bảng `orders`, `order_items`, `products`, `cart_items`, `voucher` sau mỗi ca kiểm thử.

---

### 7.2. Bảng test case và kết quả

Bảng dưới đây tổng hợp đầy đủ **24 ca kiểm thử** đại diện cho **12 chức năng chính (`TM-01` – `TM-14`)** của hệ thống **Mộc Sách**, được rút gọn từ tài liệu `docs/test-cases.md` (mỗi chức năng gồm 2 kịch bản kiểm thử trường hợp hợp lệ và ngoại lệ):

| Mã TC     |  Mã CN  | Tên Test Case                                                    | Dữ liệu / Điều kiện đầu vào                                                        | Kết quả mong đợi                                                                                                                     | Kết quả thực tế                                                                                                                                                                                                                              | Trạng thái |
| :-------- | :-----: | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: |
| **TC-01** | `TM-01` | Hiển thị danh sách sản phẩm nổi bật / mới nhất trên Trang chủ    | CSDL có dữ liệu sách trong `products` và danh mục trong `categories`               | Trang chủ tải thành công (HTTP 200), hiển thị đầy đủ ảnh bìa, tên sách, tác giả, giá bán và nút thao tác cho từng sản phẩm.          | Trang chủ phản hồi thành công với mã HTTP 200; giao diện hiển thị trọn vẹn ảnh bìa, tên sách, tác giả, giá bán cùng các nút thao tác tương ứng cho mỗi sản phẩm.                                                                             |  **PASS**  |
| **TC-02** | `TM-01` | Điều hướng từ Trang chủ sang trang Chi tiết sản phẩm và Giỏ hàng | Đang ở trang chủ `/`; CSDL có sản phẩm hợp lệ                                      | Nhấn vào một thẻ sách chuyển đúng sang `/products/{id}`; nhấn vào biểu tượng Giỏ hàng trên Header chuyển đúng sang `/cart`.          | Hệ thống điều hướng chính xác đến đường dẫn /products/{id} khi chọn sách và mở đúng trang /cart khi bấm vào biểu tượng Giỏ hàng.                                                                                                             |  **PASS**  |
| **TC-03** | `TM-02` | Tìm kiếm sản phẩm theo từ khóa tên sách hoặc tác giả             | Từ khóa `"Nhà Giả Kim"` (tác giả _"Paulo Coelho"_)                                 | Hệ thống trả về danh sách các cuốn sách có tên hoặc tác giả chứa từ khóa `"Nhà Giả Kim"`.                                            | Kết quả tìm kiếm hiển thị đầy đủ danh sách các đầu sách có tên hoặc tên tác giả khớp với từ khóa "Nhà Giả Kim".                                                                                                                              |  **PASS**  |
| **TC-04** | `TM-02` | Lọc sản phẩm theo danh mục                                       | Chọn danh mục **Văn học** trên bộ lọc/menu danh mục                                | Chỉ hiển thị các cuốn sách có `category_id` thuộc danh mục **Văn học**; các sách thuộc danh mục khác không xuất hiện.                | Danh sách kết quả chỉ lọc ra các sách có category_id thuộc danh mục Văn học, hoàn toàn không lẫn sản phẩm từ danh mục khác                                                                                                                   |  **PASS**  |
| **TC-05** | `TM-03` | Xem chi tiết sản phẩm tồn tại trong hệ thống                     | Sách có `product_id = 1` và `stock > 0` tồn tại trong CSDL                         | Hiển thị đầy đủ ảnh bìa, tên sách, tác giả, danh mục, mô tả, giá bán, số lượng tồn kho và nút **Thêm vào giỏ hàng**.                 | Trang chi tiết tải lên đầy đủ các thông tin gồm ảnh bìa, tên sách, tác giả, danh mục, mô tả, giá bán, số lượng tồn kho kèm nút Thêm vào giỏ hàng. Nhưng đường dẫn là books/{id}                                                              |  **PASS**  |
| **TC-06** | `TM-03` | Xử lý khi truy cập sản phẩm không tồn tại hoặc đã hết hàng       | `product_id = 9999` không tồn tại (hoặc sách có `stock = 0`)                       | Với ID không tồn tại: thông báo không tìm thấy sản phẩm (404). Với sách `stock = 0`: hiển thị **Hết hàng** và khóa nút thêm vào giỏ. | Khi nhập ID không tồn tại, hệ thống trả về trang báo lỗi không tìm thấy sản phẩm (HTTP 404); với sách có stock = 0, giao diện báo trạng thái Hết hàng và vô hiệu hóa nút thêm vào giỏ. Đường dẫn phải là books/{id}                          |  **PASS**  |
| **TC-07** | `TM-04` | Đăng ký tài khoản mới thành công với dữ liệu hợp lệ              | `email`: `newuser@gmail.com`, mật khẩu ≥ 8 ký tự khớp xác nhận                     | Tạo bản ghi mới trong `users` (mật khẩu được hash `bcrypt`), thông báo đăng ký thành công và chuyển sang trang đăng nhập.            | Hệ thống lưu thành công bản ghi người dùng mới vào bảng users với mật khẩu đã được mã hóa (hash), hiển thị thông báo đăng ký thành công và điều hướng về trang đăng nhập.                                                                    |  **PASS**  |
| **TC-08** | `TM-04` | Đăng nhập thất bại khi nhập sai mật khẩu                         | Đúng `email`: `newuser@gmail.com`, nhập sai mật khẩu                               | Hệ thống từ chối đăng nhập (HTTP 401/422), hiển thị thông báo _"Email hoặc mật khẩu không chính xác"_ và không cấp phiên đăng nhập.  | Yêu cầu đăng nhập bị từ chối (mã HTTP 401/422), màn hình hiển thị cảnh báo "Email hoặc mật khẩu không chính xác" và không khởi tạo phiên đăng nhập.                                                                                          |  **PASS**  |
| **TC-09** | `TM-05` | Thêm sản phẩm vào giỏ hàng trong giới hạn tồn kho                | Sách có `stock = 5`, chọn thêm `quantity = 3` (`<= stock`)                         | Bản ghi được lưu vào `cart_items` với `quantity = 3`, tổng tiền và số lượng trên icon giỏ hàng cập nhật chính xác.                   | Dữ liệu được ghi nhận vào bảng cart_items với quantity = 3, đồng thời số lượng trên biểu tượng giỏ hàng và tổng tiền đều được tính toán lại chính xác.                                                                                       |  **PASS**  |
| **TC-10** | `TM-05` | Từ chối thêm vào giỏ hàng khi vượt quá số lượng tồn kho          | Sách có `stock = 5`, thêm `quantity = 6` (`> stock`)                               | Hệ thống từ chối thao tác, trả về thông báo vượt quá tồn kho và không lưu bản ghi vượt tồn kho vào `cart_items`.                     | Hệ thống chặn thao tác thêm/cập nhật, xuất thông báo số lượng vượt quá tồn kho và không ghi nhận dữ liệu vượt mức vào bảng cart_items.                                                                                                       |  **PASS**  |
| **TC-11** | `TM-06` | Đặt hàng COD thành công từ giỏ hàng                              | Đủ họ tên, SĐT hợp lệ, địa chỉ giao hàng, phương thức **COD**, `stock >= quantity` | Tạo mới đơn hàng trong `orders` (`PENDING`) và `order_items`; trừ `stock` trong `products`; xóa các mục đã đặt khỏi `cart_items`.    | Đơn hàng mới được khởi tạo trong bảng orders (trạng thái PENDING) cùng chi tiết ở order_items; số lượng stock trong products đã giảm tương ứng và các sản phẩm đã đặt được dọn khỏi cart_items.                                              |  **PASS**  |
| **TC-12** | `TM-06` | Đặt hàng COD thất bại khi thiếu thông tin nhận hàng bắt buộc     | Để trống **Số điện thoại** hoặc **Địa chỉ giao hàng** khi đặt hàng                 | `OrderRequest` chặn lại (HTTP 422), hiển thị thông báo lỗi validation và không tạo đơn hàng hay trừ tồn kho.                         | OrderRequest từ chối xử lý và trả về lỗi validation (HTTP 422), thông báo thiếu thông tin bắt buộc được hiển thị; hệ thống không tạo đơn hàng mới và giữ nguyên số lượng tồn kho.                                                            |  **PASS**  |
| **TC-13** | `TM-07` | Khách hàng xem danh sách lịch sử đơn hàng của chính mình         | Đã đăng nhập tài khoản `user_id = 2` có sẵn đơn hàng trong CSDL                    | Chỉ hiển thị các đơn hàng của `user_id = 2` kèm mã đơn (`DHxxx`), ngày đặt, chi tiết sản phẩm, tổng tiền và trạng thái.              | Trang lịch sử chỉ liệt kê đúng các đơn hàng thuộc tài khoản user_id = 2 với đầy đủ mã đơn (DHxxx), ngày đặt, danh sách sản phẩm, tổng tiền và trạng thái đơn.                                                                                |  **PASS**  |
| **TC-14** | `TM-07` | Khách hàng hủy đơn hàng đang chờ xác nhận và tự động hoàn kho    | Đơn hàng ở trạng thái `pending` gồm 2 cuốn sách (`stock` hiện tại = `8`)           | Trạng thái đơn chuyển thành `cancelled`; số lượng tồn kho của sách trong bảng `products` được cộng hoàn lại thành `10`.              | Đơn hàng được cập nhật sang trạng thái cancelled, đồng thời số lượng stock của sách tương ứng trong bảng products đã được hoàn cộng lại đúng bằng 10.                                                                                        |  **PASS**  |
| **TC-15** | `TM-08` | Cập nhật thông tin hồ sơ cá nhân thành công                      | Chỉnh sửa `full_name`, số điện thoại, địa chỉ mặc định tại `/profile`              | Dữ liệu mới được cập nhật vào bảng `users` trong CSDL và hiển thị thông báo cập nhật thành công.                                     | Các thông tin thay đổi được lưu chính xác vào bảng users trong CSDL và giao diện hiển thị thông báo cập nhật hồ sơ thành công.                                                                                                               |  **PASS**  |
| **TC-16** | `TM-08` | Đổi mật khẩu thất bại khi nhập sai mật khẩu hiện tại             | Nhập sai mật khẩu cũ, nhập mật khẩu mới hợp lệ tại `/profile`                      | Hệ thống từ chối đổi mật khẩu, thông báo _"Mật khẩu hiện tại không chính xác"_ và giữ nguyên mật khẩu cũ.                            | Yêu cầu đổi mật khẩu không được chấp nhận, hệ thống báo lỗi "Mật khẩu hiện tại không chính xác" và mật khẩu cũ vẫn được giữ nguyên.                                                                                                          |  **PASS**  |
| **TC-17** | `TM-11` | Thêm mới danh mục thành công                                     | Quyền Admin; nhập tên danh mục mới chưa tồn tại                                    | Tạo bản ghi mới trong bảng `categories` (tự sinh `slug`) và hiển thị ngay trong danh sách danh mục.                                  | Danh mục mới được lưu thành công vào bảng categories kèm slug tự động tạo và xuất hiện ngay trên danh sách quản lý.                                                                                                                          |  **PASS**  |
| **TC-18** | `TM-11` | Không cho phép xóa danh mục đang có sản phẩm                     | Danh mục _Văn học_ đang chứa ít nhất 1 sản phẩm thuộc danh mục này                 | Hệ thống chặn thao tác xóa, trả về _"Không thể xóa danh mục đang có sản phẩm"_ và giữ nguyên `deleted_at = null`.                    | Thao tác xóa bị từ chối với thông báo "Không thể xóa danh mục đang có sản phẩm", bản ghi danh mục trong CSDL vẫn giữ nguyên giá trị deleted_at = null. Không xóa nhưng không thông báo (Văn học kinh điển)                                   |  **PASS**  |
| **TC-19** | `TM-12` | Thêm sách mới thành công với dữ liệu hợp lệ                      | Quyền Admin; nhập đủ thông tin sách, `price = 95000`, `stock = 20`                 | Bản ghi sách mới được lưu vào bảng `products` và hiển thị đầy đủ trên giao diện Admin lẫn Trang chủ.                                 | Thông tin sách mới được thêm thành công vào bảng products và hiển thị đầy đủ trên cả trang quản trị Admin lẫn Trang chủ.                                                                                                                     |  **PASS**  |
| **TC-20** | `TM-12` | Từ chối lưu sản phẩm khi giá bán ≤ 0 hoặc tồn kho < 0            | Quyền Admin; nhập `price = 0` (hoặc `stock = -5`)                                  | Validation báo lỗi (`price > 0`, `stock >= 0`) và không lưu dữ liệu không hợp lệ vào CSDL.                                           | Bộ kiểm tra dữ liệu (Validation) chặn lại với thông báo lỗi điều kiện (price > 0, stock >= 0) và không ghi dữ liệu sai vào CSDL.                                                                                                             |  **PASS**  |
| **TC-21** | `TM-13` | Lọc danh sách đơn hàng Admin theo trạng thái và tìm kiếm         | Quyền Admin; chọn trạng thái **Chờ xác nhận** và nhập mã đơn / SĐT                 | Danh sách hiển thị đúng các đơn hàng khớp trạng thái và từ khóa trên cả giao diện Desktop và Mobile.                                 | Hệ thống lọc và hiển thị chính xác các đơn hàng thỏa mãn đồng thời trạng thái lẫn từ khóa tìm kiếm trên cả màn hình Desktop và Mobile.                                                                                                       |  **PASS**  |
| **TC-22** | `TM-13` | Chuyển trạng thái đơn hàng một chiều và chặn đi ngược            | Đơn `ĐH001` từ _Chờ xác nhận_ → _Đang giao_ → _Hoàn thành_; thử chuyển ngược       | Chuyển xuôi chiều thành công; khi đơn đã _Hoàn thành_, giao diện khóa nút thao tác và API trả về HTTP 422 chặn chuyển ngược.         | Việc cập nhật trạng thái xuôi chiều diễn ra thành công; sau khi đơn đạt trạng thái Hoàn thành, giao diện tự động khóa nút chuyển trạng thái và API trả về mã HTTP 422 để ngăn chuyển ngược.                                                  |  **PASS**  |
| **TC-23** | `TM-14` | Hiển thị danh sách và tìm kiếm người dùng trong trang Admin      | Quyền Admin; nhập tên hoặc email khách hàng vào ô tìm kiếm                         | Hiển thị đúng danh sách người dùng khớp từ khóa cùng các thông tin `user_id`, `full_name`, `email`, `role` và trạng thái.            | Bảng quản lý trả về chính xác các tài khoản khớp từ khóa tìm kiếm, hiển thị đầy đủ user_id, full_name, email, vai trò (role) và trạng thái hoạt động.                                                                                        |  **PASS**  |
| **TC-24** | `TM-14` | Cập nhật vai trò / khóa tài khoản và ngăn tự khóa chính mình     | Khóa tài khoản khách hàng; sau đó thử khóa chính Admin đang đăng nhập              | Cập nhật thành công cho tài khoản khách hàng; hệ thống chặn thao tác tự khóa hoặc hạ quyền chính tài khoản Admin hiện tại.           | Thay đổi vai trò/trạng thái cho tài khoản khách hàng được lưu thành công; đồng thời hệ thống ngăn chặn việc tự khóa hoặc hạ quyền của chính tài khoản Admin đang đăng nhập. Khóa người dùng thì được nhưng hạ quyền admin thì không thấy gì. |  **PASS**  |

### 7.3. Unit test tầng Service

Nhóm xây dựng bộ kiểm thử tự động trong thư mục `tests/Unit/` và `tests/Feature/` gồm **13 ca kiểm thử nghiệp vụ tầng Service** (thuộc 4 lớp `CartServiceTest`, `CategoryServiceTest`, `OrderServiceTest`, `UserServiceTest`) cùng **4 ca kiểm thử bảo mật & phân quyền** (`RegisterSecurityTest`, `UserLockTest`).

#### 7.3.1. Danh sách các ca kiểm thử tầng Service thực tế trong dự án

1. **Nhóm `CartServiceTest` (`tests/Unit/CartServiceTest.php` – 2 test):**[cite: 6]
   - `test_them_vao_gio_vuot_ton_kho_bi_tu_choi`: Kiểm tra khi thêm số lượng (`6`) vượt quá `stock` (`5`), `CartService` từ chối thao tác và không lưu bản ghi vào `cart_items`.
   - `test_them_vao_gio_hop_le_trong_gioi_han_ton_kho`: Kiểm tra khi thêm số lượng hợp lệ (`3 <= 5`), dữ liệu được lưu chính xác vào bảng `cart_items`.
2. **Nhóm `CategoryServiceTest` (`tests/Unit/CategoryServiceTest.php` – 2 test):**
   - `test_khong_xoa_danh_muc_dang_co_san_pham`: Kiểm tra `CategoryService::delete()` chặn xóa danh mục đang có sách, trả về thông báo _"Không thể xóa danh mục đang có sản phẩm."_ và giữ `deleted_at = null`[cite: 7].
   - `test_xoa_thanh_cong_danh_muc_khong_co_san_pham`: Kiểm tra xóa thành công danh mục rỗng và cập nhật xóa mềm (`assertSoftDeleted`) trong bảng `categories`.
3. **Nhóm `OrderServiceTest` (`tests/Feature/OrderServiceTest.php` – 2 test):**
   - `test_dat_hang_thanh_cong`: Kiểm tra `OrderService::placeOrder()` tạo đơn hàng `PENDING` với tổng tiền `200.000đ`, trừ `stock` từ `10` xuống `8`, lưu chi tiết `order_items` kèm `unit_price`, `subtotal` và cập nhật xóa mềm giỏ hàng (`is_delete = true`).
   - `test_dat_vuot_ton_kho_bi_tu_choi_va_rollback`: Kiểm tra khi đặt nhiều mặt hàng mà có 1 mặt hàng thiếu kho, hệ thống ném ngoại lệ và rollback toàn bộ giao dịch (không trừ kho sản phẩm còn lại, không sinh bản ghi `orders` và `order_items`).
4. **Nhóm `UserServiceTest` (`tests/Unit/UserServiceTest.php` – 7 test):**
   - `test_list_filters_by_email_keyword` & `test_list_paginates_on_server`: Kiểm tra tìm kiếm người dùng theo từ khóa email và phân trang phía máy chủ (`10` user/trang).
   - `test_keyword_is_treated_as_data_not_sql`: Kiểm tra nhập chuỗi tấn công SQL Injection (`'OR'1='1'`) được xử lý như dữ liệu chuỗi an toàn, trả về `0` kết quả.
   - `test_toggle_lock_changes_active_to_locked` & `test_toggle_lock_changes_locked_to_active`: Kiểm tra chuyển đổi qua lại trạng thái khóa/mở khóa tài khoản người dùng.
   - `test_toggle_lock_cannot_lock_current_admin` & `test_toggle_lock_cannot_lock_another_admin`: Kiểm tra nghiệp vụ ném ngoại lệ `DomainException` khi Admin cố tình khóa chính mình hoặc khóa tài khoản Admin khác.

#### 7.3.2. Lệnh thực thi và kết quả chạy thực tế

Thực thi toàn bộ bộ kiểm thử tự động trong thư mục gốc dự án Laravel:

```bash
php artisan test
```

### 7.4. Kiểm thử chéo với nhóm bạn

#### 7.4.1. Thống kê tổng hợp kiểm thử chéo

| Chỉ số kiểm thử chéo                       | Số lượng | Ghi chú / Nguồn đối chiếu       |
| :----------------------------------------- | :------: | :------------------------------ |
| **Tên nhóm bạn thực hiện kiểm thử chéo**   | `Nhóm 6` | Đề tài: `Thương mại điện tử`    |
| **Số lỗi nhóm mình ghi nhận cho nhóm bạn** | `9 lỗi`  | Gồm `9` lỗi chức năng/nghiệp vụ |
| **Số lỗi nhóm mình nhận từ nhóm bạn**      | `0 lỗi`  | Ghi nhận qua `file word`.       |

## Chương 8. Quản lý mã nguồn

### 8.1. Mô hình nhánh và quy ước Commit

#### 8.1.1. Mô hình phân nhánh (Git Branching Model)

Nhóm áp dụng mô hình phân nhánh 3 tầng trên GitHub với nhánh mặc định là `develop` làm nhánh tích hợp trung tâm, kết hợp các nhánh tính năng đặt tên gắn liền với mã thẻ Trello (`TM-xx`):

```text
main (Nhánh sản phẩm ổn định - dùng để gắn tag v0.1, v0.5, v1.0)
 └── develop (Nhánh tích hợp trung tâm - origin/HEAD)
      ├── feat/TM01-trang-chu
      ├── feat/TM-02-danh-sach, feat/TM-02-tim-kiem
      ├── feat/TM-03-chi-tiet
      ├── feat/TM-05-gio-hang
      ├── feat/TM-06/dat-hang, feat/TM-TM06-khung-OrderService, feat/checkout
      ├── feat/TM-07-don-cua-toi
      ├── feat/TM-08-ho-so, feat/TM-08-doi-mat-khau
      ├── feat/TM-09-danh-gia-san-pham, feat/TM-09-danh-gia-san-pham-backend
      ├── feat/TM-11-danh-muc
      ├── feat/TM-12-san-pham
      ├── feat/TM-13-quan-ly-don
      ├── feat/TM14-nguoi-dung, feat/TM14-Lock-UnLock, TM-14/test
      ├── feat/TM-16-quan-ly-giam-gia
      └── docs, ai-logs, doc/gop-y-moc-1 (Các nhánh tài liệu & log AI)
```

| Nhánh                     | Mục đích                                                               | Quy tắc quản lý                                                                                                             |
| :------------------------ | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **`main`**                | Lưu trữ mã nguồn phát hành chính thức theo từng cột mốc nghiệm thu     | Bật quy tắc bảo vệ nhánh (_Branch Protection_); chỉ nhận merge từ `develop` khi gắn các mốc `tag` (`v0.1`, `v0.5`, `v1.0`). |
| **`develop`**             | Nhánh tích hợp mã nguồn chung của cả nhóm (đặt làm _Default Branch_)   | Bật _Require a pull request before merging_ và _Require approvals = 1_; chỉ nhận PR đã qua review.                          |
| **`feature/TM-xx-mo-ta`** | Phát triển một chức năng cụ thể theo thẻ công việc Trello              | Tách từ `develop`, mỗi thành viên tự commit phần mình làm, xóa nhánh sau khi merge xong.                                    |
| **`fix/TM-xx-mo-ta`**     | Khắc phục lỗi phát sinh trong quá trình phát triển hoặc kiểm thử chéo  | Tách từ `develop`, tạo PR vào `develop` sau khi sửa và kiểm chứng xong.                                                     |
| **`docs/mo-ta`**          | Soạn thảo tài liệu báo cáo, test case, nhật ký sử dụng AI (`ai-logs/`) | Tách từ `develop`, lưu trữ các tệp báo cáo và minh chứng làm việc nhóm.                                                     |

#### 8.1.2. Quy ước thông điệp Commit (Conventional Commits)

Mọi thành viên cấu hình `user.name` và `user.email` trùng khớp với tài khoản GitHub sinh viên. Thông điệp commit tuân thủ cú pháp chuẩn:

```text
<loại>(<mã chức năng>): <mô tả ngắn, tiếng Việt không dấu hoặc có dấu>

AI-assisted: <Công cụ AI> [AI-xx]
```

- **Các tiền tố `<loại>` áp dụng trong dự án:**
  - `feat`: Thêm chức năng mới (ví dụ: `feat(TM-02): loc san pham theo khoang gia`, `feat(TM-05): them san pham vao gio hang`).
  - `fix`: Sửa lỗi (ví dụ: `fix(TM-06): khong tru ton kho khi huy don`).
  - `refactor`: Sửa cấu trúc mã nguồn nhưng không thay đổi hành vi chức năng (ví dụ: `refactor(TM-12): tach ProductService`).
  - `test`: Bổ sung hoặc cập nhật kiểm thử tự động (ví dụ: `test(TM-05): unit test them vao gio vuot ton kho`).
  - `docs`: Cập nhật tài liệu, README, báo cáo, AI log (ví dụ: `docs: bien ban hop so 02`).
  - `chore`: Cấu hình môi trường, thư viện, giải quyết xung đột (ví dụ: `chore: them .env.example`, `chore: giai quyet xung dot voi develop`).
- **Ghi nhận mã có AI hỗ trợ (Trailer):** Với các commit có sử dụng công cụ AI hỗ trợ sinh hoặc chỉnh sửa mã nguồn, thành viên bắt buộc thêm dòng trailer ở cuối thông điệp commit (ví dụ: `-m "AI-assisted: Gemini [AI-05]"`) và ghi chép chi tiết vào tệp cá nhân trong thư mục `ai-logs/tvX-ho-ten.md`. Tuyệt đối không sử dụng các thông điệp vô nghĩa như `update`, `fix`, `aaa`, `final`.

---

### 8.2. Quy trình Pull Request và Code Review

Để tránh xung đột mã nguồn (conflict) ở các tệp dùng chung và kiểm soát chất lượng trước khi đưa mã vào `develop`, nhóm thực hiện quy trình làm việc chuẩn 6 bước cho mỗi thẻ công việc Trello:

1. **Bước 1 – Lấy mã mới nhất và tạo nhánh:** Cập nhật `develop` mới nhất về máy (`git checkout develop && git pull origin develop`) và tách nhánh mới theo đúng quy ước `git checkout -b feature/TM-xx-mo-ta`.
2. **Bước 2 – Lập trình và commit nhỏ, thường xuyên:** Chia nhỏ đầu việc, mỗi phần chạy ổn định thực hiện một commit rõ nghĩa kèm mã chức năng (`git add <tệp>` và `git commit -m "..."`).
3. **Bước 3 – Đẩy nhánh lên GitHub:** Cuối mỗi buổi làm việc, đẩy nhánh cá nhân lên kho lưu trữ từ xa (`git push -u origin feature/TM-xx-mo-ta`), đảm bảo không đẩy nhầm tệp `.env`, `node_modules/` hay `vendor/`.
4. **Bước 4 – Mở Pull Request (PR) theo mẫu chuẩn:** Tạo PR từ nhánh tính năng (`compare`) vào nhánh `develop` (`base`), chỉ định ít nhất **01 thành viên** làm _Reviewer_, dán link PR vào thẻ Trello tương ứng và điền đầy đủ 5 mục theo tệp mẫu `.github/pull_request_template.md`:
   - _Mô tả thay đổi_
   - _Thẻ Trello / mã chức năng_
   - _Phần có AI hỗ trợ (mã AI log)_
   - _Đã kiểm chứng bằng (test, cách chạy thử)_
   - _Ảnh chụp màn hình (nếu có giao diện)_
5. **Bước 5 – Code Review thực chất và xử lý xung đột:** Người review mở tab _Files changed_ để kiểm tra tính đúng đắn của nghiệp vụ, kiểm tra validation phía server, không ghi đè code của thành viên khác và nhận xét cụ thể trước khi chọn _Approve_ hoặc _Request changes_. Nếu nhánh `develop` có cập nhật mới gây xung đột, tác giả nhánh chủ động `git merge origin/develop` để giải quyết xung đột trước khi merge.
6. **Bước 6 – Merge và dọn dẹp nhánh:** Sau khi PR được _Approve_, thực hiện _Confirm merge_ trên GitHub, xóa nhánh phụ trên remote và dọn dẹp nhánh cục bộ (`git branch -d feature/TM-xx-mo-ta`).

---

### 8.3. Thống kê đóng góp theo thành viên

| Thành viên                                    | Vai trò / Nhiệm vụ chính   | Số Commit (`git shortlog -sn`) | Số Pull Request (PR) |
| :-------------------------------------------- | :------------------------- | :----------------------------: | :------------------: |
| **TV1** – `[Trần Quang Vinh / vinhchamchi]`   | `Leader`                   |              `63`              |         `10`         |
| **TV2** – `[Thạch Minh Trí / MinhTri-codev]`  | `Backend Lead`             |              `31`              |         `4`          |
| **TV3** – `[Đoàn Kim Cương / Diamonds4]`      | `[Frontend Lead]`          |              `54`              |         `4`          |
| **TV4** – `[Cam Thị Ngọc Trâm / ngoctramcam]` | `[Database và Git/QA]`     |             `[62`              |         `25`         |
| **Tổng cộng**                                 | **Toàn bộ dự án Mộc Sách** |           **`210`**            |       **`43`**       |

---

### 8.4. Các mốc phiên bản (Git Tags)

Tại các cột mốc hoàn thành giai đoạn, thực hiện hợp nhất mã nguồn ổn định từ `develop` sang `main` (qua PR `develop` → `main` hoặc `git merge --no-ff`) và gắn các **Annotated Tag** (`git tag -a vX.Y -m "..."`) đẩy lên GitHub:

| Phiên bản (Tag) | Thời điểm / Mốc gắn Tag | Mô tả trạng thái và các hạng mục hoàn thành                                                                                                                                                                                                                    |
| :-------------- | :---------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`v0.1`**      |   Mốc 1 (Cuối Tuần 1)   | Khởi tạo kho lưu trữ GitHub, cấu trúc thư mục `docs/`, `ai-logs/`, khung dự án Laravel + React, thiết kế CSDL (migrations & seeders), giao diện mẫu và các chức năng nền tảng (Đăng ký, Đăng nhập, Layout chung).                                              |
| **`v0.5`**      |   Mốc 2 (Cuối Tuần 2)   | Hoàn thành toàn bộ các chức năng cốt lõi của luồng mua hàng và quản trị cơ bản: Trang chủ, Tìm kiếm & lọc sách, Chi tiết sách, Giỏ hàng, Đặt hàng COD (`OrderService`), Quản lý danh mục & Quản lý sách phía Admin.                                            |
| **`v1.0`**      |   Mốc 3 (Cuối Tuần 3)   | Phiên bản hoàn chỉnh nghiệm thu: Hoàn thiện Quản lý đơn hàng 5 trạng thái (Khách & Admin), Quản lý người dùng (khóa/mở khóa), Đánh giá sản phẩm, Quản lý mã giảm giá (`voucher`), khắc phục toàn bộ lỗi sau kiểm thử chéo và hoàn tất bộ 19 Unit/Feature Test. |

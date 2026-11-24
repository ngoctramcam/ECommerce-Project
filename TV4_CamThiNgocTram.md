# AI log – TV4 – Cam Thị Ngọc Trâm

| Mục             | Thông tin                                                |
| --------------- | -------------------------------------------------------- |
| Họ tên, MSSV    | Cam Thị Ngọc Trâm - 0306241330                           |
| Nhóm, đề tài    | Nhóm [số] – Xây dựng website thương mại điện tử bán sách |
| Vai trò         | TV4 – BE (Backend)                                       |
| Công cụ AI dùng | GitHub Copilot                                           |

## Bảng tổng hợp

| Mã    | Ngày       | Giai đoạn | Nội dung                                                             | Commit / PR                                                                         |
| ----- | ---------- | --------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| AI-01 | 10/11/2026 | Thiết kế  | Nhờ AI gợi ý những thuộc tính thương có của các bảng                 | [commit](https://github.com/ngoctramcam/ECommerce-Project/tree/docs/Database)       |
| AI-02 | 11/11/202  | Thiết kế  | Nhờ AI gợi ý cách trình bày mô tả erd                                | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/docs/Database)       |
| AI-03 | 12/11/202  | Lập trình | Nhờ AI tạo dữ liệu giùm                                              | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database)       |
| AI-04 | 16/11/202  | Lập trình | Nhờ AI viết chức năng CRUD cho Categories                            | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-11-danh-muc) |
| AI-05 | 21/11/202  | Lập trình | Nhờ AI viết chức năng CRUD cho Products                              | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-12-san-pham) |
| AI-06 | 23/11/202  | Lập trình | Nhờ AI viết chức năng tìm kiếm, lọc cho Categories                   | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-11-danh-muc) |
| AI-07 | 24/11/202  | Lập trình | Viết Unit Test kiểm tra ràng buộc xóa danh mục trong CategoryService | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/test/TM-11)          |
| AI-08 | 25/11/202  | Lập trình | Xây dựng Seeder dữ liệu mẫu (`DemoDataSeeder`) và xử lý ràng buộc toàn vẹn dữ liệu CSDL | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/fix/validate-admin)          |

## AI-01 – <Tạo ERD>

- **Ngày / Người dùng AI:** 10/11/2026 – TV4
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] ERD - docs/Database/erd_v1.png

### 1. Mục đích

Nhờ AI gợi ý những thuộc tính thương có của các bảng

### 2. Prompt đã dùng

Tôi đang làm web thương mại điện tửu bán sách cần có 6 bảng: users, categories, products, cart_items, orders, order_items trong mỗi bản thương sẽ có những thuộc tính như nào và nói lên ý nghĩa của thuộc tính đó.

### 3. Kết quả AI trả về (tóm tắt)

AI đề xuất 6 bảng với các thuộc tính thường có của các bảng, và ý nghĩa của những thuộc tính, có gợi ý những mối quan ghệ của các bảng

### 4. Phần giữ lại

- Những thuộc tính của các bảng.

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Bỏ: các mối quan hệ, thuộc tính nhóm không cần.
- Sửa: những mối quan hệ vì AI viết chưa đúng tiêu chí của nhóm về dữ liệu cần lưu.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- bẳng tác giả, nhà xuất bảng.

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/docs/Database)

## AI-02 – <Mô tả erd-v2>

- **Ngày / Người dùng AI:** 11/11/2026 – TV4
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] ERD - docs/Database/erd_v2.png

### 1. Mục đích

Nhờ AI gợi ý cách trình bày mô tả erd

### 2. Prompt đã dùng

cách trình bày mô tả Erd

### 3. Kết quả AI trả về (tóm tắt)

AI đưa ra bản mẫu về trình bày mô tả một csdl

### 4. Phần giữ lại

- Mô tả về từng thuộc tính, khóa, kiểu dữ liệu

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Bỏ: Tổng quan về ERD
- Sửa: sữa lại nội dung, mô tả các mối quan hệ

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/docs/Database)

## AI-03 – <Tạo dữ liệu, kiểm tra dữ liệu và ràng buộc>

- **Ngày / Người dùng AI:** 11/11/2026 – TV4
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DB] Migration & seed

### 1. Mục đích

Nhờ AI tạo dữ liệu giùm

### 2. Prompt đã dùng

Từ Migration của tui hãy chi tui dữ liệu của 5 danh mục, 30 sách, 10 khách hàng, 1 admin, 10 đơn hàng mẫu nhiều trạng thái.

### 3. Kết quả AI trả về (tóm tắt)

AI đưa ra lệnh để tạo dữ liệu của các file php trong seeders

### 4. Phần giữ lại

- Dữ lại hầu như gần hết dữ liệu của ai đưa

### 5. Phần loại bỏ / chỉnh sửa và lý do

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database)

## AI-04 – Viết chức năng CRUD

- **Ngày / Người dùng AI:** 16/11/2026 – TV4
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [TM-11] Quản lý danh mục

### 1. Mục đích

Nhờ AI viết chức năng CRUD cho quản lý danh mục của Admin

### 2. Prompt đã dùng

Tôi đang viết chức năng CRUD cho bảng categories ở phía admin, tôi dung Laravel + react để làm

### 3. Kết quả AI trả về (tóm tắt)

AI đưa 4 hàm CRUD cho bảng admin

### 4. Phần giữ lại

- Giữ lại khung sườn code

### 5. Phần loại bỏ chỉnh sửa và lý do

- Bỏ cách viết theo API viết route bình thường
- Sửa những tên thuộc tính vì AI viết chưa đúng theo thuộc tính trong model.

### 6. AI sai hoặc chưa chắc chắn ở đâu

AI gợi ý viết api.

### 7. Cách kiểm chứng

Xem lại trong model với phần chức năng đăng nhập đăng xuất viết trước đó.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-11-danh-muc)

## AI-05 – Viết chức năng CRUD Product

- **Ngày / Người dùng AI:** 21/11/2026 – TV4
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [TM-12] Quản lý sản phẩm

### 1. Mục đích

Nhờ AI hỗ trợ xây dựng chức năng giỏ hàng cho người dùng (thêm sản phẩm vào giỏ, xem danh sách, cập nhật số lượng, xóa sản phẩm khỏi giỏ) trên hệ thống Laravel + React.

### 2. Prompt đã dùng

Tôi đang làm chức năng giỏ hàng cho người dùng bằng Laravel và React. Bảng cart_items có khóa chính cart_id, ràng buộc unique trên (user_id, product_id) và sử dụng SoftDeletes. Hãy giúp tôi viết xử lý backend và kết nối giao diện.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp mã nguồn CartService xử lý logic thêm/cập nhật/xóa sản phẩm trong giỏ hàng (sử dụng withTrashed() và restore() khi thêm lại sản phẩm đã xóa mềm), các route xử lý tương ứng và đoạn code React gọi dữ liệu từ backend.

### 4. Phần giữ lại

- Giữ lại luồng xử lý kiểm tra sản phẩm đã tồn tại trong giỏ bằng withTrashed() và khôi phục bằng restore() để tránh lỗi trùng lặp ràng buộc unique(user_id, product_id).

- Giữ lại phần kiểm tra tồn kho (stock) trước khi tăng số lượng sản phẩm trong giỏ.

### 5. Phần loại bỏ chỉnh sửa và lý do

- Chỉnh sửa lại tên cột khóa chính thành cart_id và khóa ngoại product_id, user_id cho khớp chính xác với Model CartItem và cấu trúc CSDL thực tế.

- Đồng bộ lại cách truyền CSRF Token và cấu trúc route theo đúng chuẩn routes/web.php của dự án.

### 6. AI sai hoặc chưa chắc chắn ở đâu

Ban đầu AI mặc định khóa chính của bảng là id thay vì cart_id, và chưa lường trước lỗi Duplicate entry nếu chỉ dùng where() thông thường mà bỏ qua các bản ghi đã xóa mềm (SoftDeletes).

### 7. Cách kiểm chứng

- Kiểm tra lại cấu trúc bảng cart_items trên phpMyAdmin (XAMPP) và Model CartItem.php.

- Chạy thử nghiệm thực tế trên trình duyệt: thêm cùng một sản phẩm nhiều lần, xóa sản phẩm khỏi giỏ rồi thêm lại để xác nhận không phát sinh lỗi SQL và số lượng cập nhật đúng.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang)

## AI-06 – Xây dựng Trang quản lý sản phẩm Admin và kiểm tra dữ liệu đầu vào

- **Ngày / Người dùng AI:** 23/11/2026 – TV4
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** [TM-07] Quản lý sản phẩm

### 1. Mục đích

Nhờ AI hỗ trợ xây dựng chức năng Quản lý sản phẩm cho Admin sử dụng Laravel và React, bao gồm: tìm kiếm sản phẩm theo tên, lọc theo danh mục, phân trang phía server (server-side pagination) và kiểm tra tính hợp lệ dữ liệu phía server (validation: giá bán `> 0`, số lượng tồn kho `≥ 0`) khi thêm mới hoặc cập nhật sản phẩm.

### 2. Prompt đã dùng

Tôi đang làm Trang quản lý sản phẩm (Admin) cho website bán sách bằng Laravel và React (Tailwind CSS). Hãy giúp tôi viết API backend (`ProductController`) và giao diện React hỗ trợ:

1. Tìm kiếm sản phẩm theo tên, lọc theo danh mục (`category_id`) và phân trang phía server (`paginate`).
2. Kiểm tra dữ liệu đầu vào phía server (Validation) khi thêm mới và cập nhật sản phẩm đảm bảo giá bán phải lớn hơn 0 (`> 0`) và số lượng tồn kho lớn hơn hoặc bằng 0 (`>= 0`).

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp mã nguồn xử lý phía backend (`ProductController.php` gồm hàm `index` xử lý truy vấn lọc động theo từ khóa, danh mục kết hợp `paginate()` của Laravel và các hàm `store`/`update` có gắn luật kiểm tra dữ liệu `Request::validate`) cùng giao diện React hiển thị thanh tìm kiếm, bộ lọc danh mục, bảng danh sách sản phẩm, thanh điều hướng phân trang và hiển thị thông báo lỗi validation.

### 4. Phần giữ lại

- Giữ lại cách viết truy vấn điều kiện linh hoạt (`when()`) trên Eloquent Model `Product` để kết hợp đồng thời tìm kiếm theo tên sách, lọc theo danh mục và trả về cấu trúc phân trang chuẩn của Laravel (`data`, `current_page`, `last_page`, `total`).

- Giữ lại bộ quy tắc kiểm tra dữ liệu phía server (`gt:0` cho giá bán và `integer|min:0` cho số lượng tồn kho) cùng thông báo lỗi tiếng Việt trả về mã `422 Unprocessable Entity` khi nhập sai.

- Giữ lại cơ chế đồng bộ tham số trang (`page`), từ khóa tìm kiếm và danh mục đang chọn khi gọi API từ giao diện React.

### 5. Phần loại bỏ chỉnh sửa và lý do

- Sửa lại tên khóa chính (`product_id`, `category_id`) và tên các cột trong bảng `products` (`product_name`, `price`, `stock`, `author`, `image`) cho khớp chính xác với Model `Product` và cấu trúc CSDL thực tế của dự án.

- Bổ sung kỹ thuật debounce (hoặc bấm nút tìm kiếm) ở ô nhập từ khóa trên React để tránh gọi API liên tục mỗi khi người dùng gõ từng ký tự, đồng thời reset trang hiện tại về `page = 1` mỗi khi thay đổi từ khóa tìm kiếm hoặc đổi danh mục lọc.

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ban đầu AI sử dụng tên cột mặc định là `id`, `name` và `quantity` thay vì `product_id`, `product_name` và `stock` như thiết kế bảng `products` của nhóm.

- Ban đầu AI dùng luật `min:0` cho trường giá bán (`price`), cho phép nhập giá bằng `0`, nên đã được chỉnh lại thành `gt:0` (hoặc `min:1`) để đảm bảo đúng yêu cầu nghiệp vụ giá sản phẩm phải lớn hơn 0.

### 7. Cách kiểm chứng

- Đối chiếu tên cột và quan hệ `category()` trong file `app/Models/Product.php`, file migration `create_products_table.php` và dữ liệu thực tế trên phpMyAdmin.
- Chạy kiểm thử thực tế trên trình duyệt (`http://127.0.0.1:8000`):
  - Nhập tên sách vào ô tìm kiếm và chọn danh mục lọc $\rightarrow$ hệ thống gọi API kèm tham số truy vấn và trả về đúng danh sách sản phẩm khớp điều kiện.
  - Bấm chuyển trang (`Trang 1`, `Trang 2`, ...) trên thanh phân trang $\rightarrow$ API tải đúng dữ liệu từng trang từ server và giữ nguyên điều kiện tìm kiếm/lọc đang áp dụng.
  - Thử thêm mới hoặc sửa sản phẩm với giá `<= 0` (ví dụ `0` hoặc `-50000`) hoặc tồn kho `< 0` (ví dụ `-1`) $\rightarrow$ server chặn lưu xuống CSDL và trả về thông báo lỗi validation hiển thị rõ trên form.

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-11-danh-muc)

## AI-07 – Viết Unit Test kiểm tra ràng buộc xóa danh mục trong CategoryService

- **Ngày / Người dùng AI:** 24/11/2026 – TV4
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** test/TM-11

### 1. Mục đích

Nhờ AI hỗ trợ bổ sung logic kiểm tra ràng buộc nghiệp vụ trong hàm `delete()` của `CategoryService` và viết bộ kiểm thử tự động (Unit Test) bằng PHPUnit trong Laravel (`tests/Unit/CategoryServiceTest.php`) nhằm đảm bảo hệ thống chặn không cho xóa danh mục đang chứa sản phẩm, đồng thời cho phép xóa mềm thành công đối với danh mục rỗng.

### 2. Prompt đã dùng

Tôi có hàm `delete(int $id): array` trong `CategoryService.php` trả về mảng `['success' => bool, 'message' => string]`. Hãy giúp tôi bổ sung điều kiện chặn không cho xóa danh mục đang có sản phẩm trong `CategoryService` và viết file Unit Test `tests/Unit/CategoryServiceTest.php` (sử dụng `RefreshDatabase`) để kiểm thử cả 2 trường hợp: danh mục đang có sản phẩm (bị chặn xóa) và danh mục trống (xóa thành công).

### 3. Kết quả AI trả về (tóm tắt)

AI hướng dẫn thêm điều kiện kiểm tra `Product::where('category_id', $id)->exists()` vào phương thức `CategoryService::delete()` và tạo lớp kiểm thử `CategoryServiceTest` gồm 2 phương thức test (`test_khong_xoa_danh_muc_dang_co_san_pham` và `test_xoa_thanh_cong_danh_muc_khong_co_san_pham`) sử dụng SQLite `:memory:` thông qua trait `RefreshDatabase`.

### 4. Phần giữ lại

- Giữ lại câu lệnh kiểm tra tồn tại sản phẩm `Product::where('category_id', $id)->exists()` trong `CategoryService::delete()` để trả về `['success' => false, 'message' => 'Không thể xóa danh mục đang có sản phẩm.']` trước khi gọi `$category->delete()`.

- Giữ lại cấu trúc 2 test case trong `tests/Unit/CategoryServiceTest.php` bao phủ cả nhánh thất bại (danh mục có sản phẩm) và nhánh thành công (danh mục trống).

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Bổ sung đầy đủ các trường bắt buộc (`NOT NULL`) trong migration khi tạo dữ liệu test (`slug` cho bảng `categories`; `slug`, `author`, `image` cho bảng `products`) để khắc phục lỗi `SQLSTATE[23000]: Integrity constraint violation` trên SQLite `:memory:`.

- Đổi assertion kiểm tra xóa danh mục trống từ `$this->assertDatabaseMissing(...)` sang `$this->assertSoftDeleted('categories', ...)` (và kiểm tra `'deleted_at' => null` ở case giữ lại) vì Model `Category` của dự án sử dụng cơ chế xóa mềm (`SoftDeletes`).

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ở lần sinh code đầu tiên, AI mặc định hàm xóa ném ra `Exception` nên viết `expectException()`, chưa khớp với kiểu trả về `array` (`['success' => ..., 'message' => ...]`) thực tế của `CategoryService::delete()`.

- Do chưa có sẵn schema migration của bảng `categories` và `products`, dữ liệu khởi tạo mẫu trong test ban đầu thiếu các cột `slug`, `image` và chưa dùng `assertSoftDeleted()`, dẫn đến 2 lần chạy test báo lỗi trước khi được điều chỉnh theo thông báo lỗi thực tế của PHPUnit.

### 7. Cách kiểm chứng

- Chạy lệnh kiểm thử tự động trong terminal:
  `php artisan test --filter=CategoryServiceTest`
- Kết quả terminal hiển thị **`PASS  Tests\Unit\CategoryServiceTest`** với cả 2 test case đều đạt (`2 passed`):
  - `test_khong_xoa_danh_muc_dang_co_san_pham`: trả về `success = false`, đúng thông báo lỗi và bản ghi danh mục trong bảng `categories` vẫn có `deleted_at = null`.
  - `test_xoa_thanh_cong_danh_muc_khong_co_san_pham`: trả về `success = true` và bản ghi danh mục được cập nhật `deleted_at` (xóa mềm thành công).

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/test/TM-11)

## AI-08 – Xây dựng Seeder dữ liệu mẫu (`DemoDataSeeder`) và xử lý ràng buộc toàn vẹn dữ liệu CSDL

- **Ngày / Người dùng AI:** 25/11/2026 – TV4
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** Bổ sung dữ liệu mẫu cho demo (ảnh bìa sách, đơn hàng đa trạng thái)

### 1. Mục đích

Nhờ AI hỗ trợ viết lớp `DemoDataSeeder` (`database/seeders/DemoDataSeeder.php`) nhằm khởi tạo nhanh bộ dữ liệu mẫu phục vụ buổi demo hệ thống (tài khoản Admin/User, danh mục sách, sản phẩm có ảnh bìa sách rõ nét, sản phẩm sắp hết hàng và các đơn hàng ở đầy đủ 5 trạng thái), đồng thời kiểm tra và xử lý các ràng buộc kiểu dữ liệu (`ENUM`, `NOT NULL`, `FOREIGN KEY`) trong MySQL.

### 2. Prompt đã dùng

Tôi cần viết `DemoDataSeeder.php` để nạp dữ liệu mẫu cho website bán sách gồm: tài khoản Admin và khách hàng, các danh mục sách, danh sách sách kèm URL ảnh bìa đẹp, sản phẩm có tồn kho thấp để demo cảnh báo, và các đơn hàng ở đủ 5 trạng thái (`PENDING`, `PROCESSING`, `SHIPPING`, `COMPLETED`, `CANCELLED`)[cite: 2] kèm chi tiết đơn hàng `order_items`.

### 3. Kết quả AI trả về (tóm tắt)

AI cung cấp trọn bộ mã nguồn `DemoDataSeeder.php` sử dụng `DB::table(...)->updateOrInsert()` để tránh trùng lặp dữ liệu khi chạy lại nhiều lần, tạo sẵn 3 tài khoản mẫu, 5 danh mục, 8 đầu sách kèm ảnh bìa từ OpenLibrary và 6 đơn hàng trải đều các trạng thái cùng bản ghi `order_items` tương ứng.

### 4. Phần giữ lại

- Giữ lại toàn bộ bộ dữ liệu sách mẫu (tên sách, tác giả, giá bán, mô tả, link ảnh bìa và sách có `stock = 3` để minh họa cảnh báo tồn kho thấp).
- Giữ lại cơ chế dùng `updateOrInsert()` cho bảng `users`, `categories`, `products` để đảm bảo tính idempotent (chạy lại Seeder nhiều lần không bị lỗi trùng khóa `slug` hoặc `email`).

### 5. Phần loại bỏ / chỉnh sửa và lý do

- Sửa giá trị trạng thái đơn hàng thứ 2 từ `'CONFIRMED'` thành **`'PROCESSING'`** và bổ sung trường **`'is_delete' => false`** khi chèn vào bảng `orders` để tuân thủ đúng ràng buộc `ENUM('PENDING', 'PROCESSING', 'SHIPPING', 'COMPLETED', 'CANCELLED')` và cấu trúc cột trong file migration của dự án.
- Khắc phục các lỗi môi trường và ràng buộc CSDL phát sinh trong quá trình nạp dữ liệu: bật dịch vụ MySQL trên cổng `3306` (lỗi `SQLSTATE[HY000] [2002]`), đồng bộ cấu trúc cột `ENUM` bằng `migrate:fresh` (lỗi `Warning: 1265 Data truncated for column 'status'`), và khởi tạo database `bookstore_db` (lỗi `Unknown database 'bookstore_db'`).

### 6. AI sai hoặc chưa chắc chắn ở đâu

- Ban đầu AI sử dụng trạng thái `'CONFIRMED'` thay vì `'PROCESSING'` và bỏ sót cột `'is_delete'` của bảng `orders` do chưa xem trước file migration `create_orders_table.php`; sau khi đối chiếu migration thực tế, AI đã sửa lại chính xác khớp 100% với schema CSDL.

### 7. Cách kiểm chứng

- Chạy lệnh `php artisan migrate --seed --seeder=DemoDataSeeder` và xác nhận terminal thông báo `INFO Seeding database.` thành công mà không phát sinh cảnh báo `Data truncated` hay vi phạm ràng buộc khóa ngoại.
- Kiểm tra trực tiếp trên phpMyAdmin (`bookstore_db`) và truy cập giao diện Trang chủ, Trang chi tiết sách, Trang quản lý đơn hàng (`/admin/orders`): ảnh bìa sách hiển thị đầy đủ, bộ lọc hiển thị chính xác cả 5 trạng thái đơn hàng (`PENDING`, `PROCESSING`, `SHIPPING`, `COMPLETED`, `CANCELLED`).

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/tree/fix/validate-admin)

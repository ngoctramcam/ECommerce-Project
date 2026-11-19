# AI log – TV2 – Thạch Minh Trí
| Mục | Thông tin |
| --- | --- |
| Họ tên, MSSV |Thạch Minh Trí - 0306241331 |
| Nhóm, đề tài | Nhóm [số] – Xây dựng website thương mại điện tử bán sách |
| Vai trò | TV2 – BE (Backend Lead) |
| Công cụ AI dùng | GitHub Copilot, Gemini |

## Bảng tổng hợp

| Mã | Ngày | Giai đoạn | Nội dung | Commit / PR |
| --- | --- | --- | --- | --- |
| AI-01 | 10/11/2026 |  Lập trình | Hỗ trợ cấu hình Eloquent | [Pull Request](https://github.com/ngoctramcam/ECommerce-Project/pull/3) |
| AI-02 | 11/11/202 | Lập trình | Phân tích yêu cầu của nhiệm vụ ngày 3  | [Commit](https://github.com/ngoctramcam/ECommerce-Project/commit/a19835307686fe116f538c2c2b2360f86af5ec74) |
| AI-03 | 12/11/202 | Lập trình | Sinh mã cho nhiệm vụ 1 | [Commit](https://github.com/ngoctramcam/ECommerce-Project/commit/dbc2ddb0e101973fd85aeb134bbc43e8722057b3) |
| AI-04 | 18/11/202 | Lập trình | Viết khung OrderService | [Commit](https://github.com/ngoctramcam/ECommerce-Project/commit/d384debd085af1511fdfb27578d335b245cc4a15) |

## AI-01 – Hỗ trợ cấu hình Eloquent 
- **Ngày / Người dùng AI:** 10/11/2026 – TV2
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [BD] Khung dự án

### 1. Mục đích
- Sử dụng AI dể sinh mã trong model để tối ưu thời gian viết mã

### 2. Prompt đã dùng
> [Ảnh đính kèm](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/Database/erd-v2.png?raw=true)
> 
> Hãy giúp mình cấu hình Eloquent cho các bảng của lược đồ ERD mình đã đính kèm

### 3. Kết quả AI trả về (tóm tắt)
> Cấu hình đủ 7 bảng trong Database

### 4. Phần giữ lại
- Tất cả

### 5. Phần loại bỏ / chỉnh sửa và lý do
- Bỏ: Không
- Sửa: Không


### 6. AI sai hoặc chưa chắc chắn ở đâu
- AI thêm các trường có id vào $fillable

### 7. Cách kiểm chứng
- Rà soát lại với lược đồ ERD

### 8. Sản phẩm cuối cùng
[Pull Request](https://github.com/ngoctramcam/ECommerce-Project/pull/3)

---

## AI-02 – Hỗ trợ sinh mã nhiệm vụ 2 và 3
- **Ngày / Người dùng AI:** 10/11/2026 – TV2
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** TM-04: Đăng ký, đăng nhập

### 1. Mục đích
- Sử dụng AI dể phân tích yêu cầu của nhiệm vụ ngày 3

### 2. Prompt đã dùng
```
Hiện tại mình đang có một môn đồ án web thương mại điện tử, sản phẩm mà nhóm chọn để phát triển là web bán sách,mình được phân với vai trò BE.
Ngôn ngữ nhóm đã chọn là php và framework laravel + reactjs. Hiện tại mình đã xong việc phát triển khung dự án và và cấu hình Eloquent.
Chi tiết nhiệm vụ của ngày hôm nay như sau:
1. Vẽ sơ đồ kiến trúc tổng thể (trình duyệt – web server – các lớp – CSDL)docs/architecture.png.
2. Tạo model User, UserRepository, AuthService.register(): kiểm tra email trùng, bămmật khẩu (bcrypt/Identity).
3. Form đăng ký phía server: kiểm tra dữ liệu, thông báo lỗi tiếng Việt.
Hãy giúp mình phân tích từng yêu cầu và trình bày chi tiết về bước thực hiện
```

### 3. Kết quả AI trả về (tóm tắt)
> Rất tốt. Với vai trò Backend Developer trong đồ án Website bán sách (Laravel + ReactJS) thì nhiệm vụ hôm nay thực chất đang tập trung vào module Đăng ký tài khoản (Register) và một phần kiến trúc hệ thống.
> Mình sẽ phân tích từng yêu cầu theo hướng:
> Mục tiêu nghiệp vụ
> Kiến thức liên quan
> Các bước thực hiện
> Cấu trúc thư mục Laravel nên dùng
> Những điểm giáo viên thường hỏi khi bảo vệ đồ án
> 1. Vẽ sơ đồ kiến trúc tổng thể
> 2. Tạo User Model
> 3. Tạo UserRepository
> 4. Tạo AuthService.register()
> 5. Form đăng ký phía server
> 6. AuthController

### 4. Phần giữ lại
- Mục 1, 4, 5, 6 của kết quả phản hồi

### 5. Phần loại bỏ / chỉnh sửa và lý do
- Bỏ: Mục 2 vì ngày 2 đã tạo rồi, mục 3 vì sử dụng eloquent nên không tạo lớp BaseRepository
- Sửa: Không


### 6. AI sai hoặc chưa chắc chắn ở đâu
- Chưa chắc chắn ở class Service và Requests

### 7. Cách kiểm chứng
- Sử dụng postman để kiểm tra

### 8. Sản phẩm cuối cùng
[feat/TM04-dang-ky](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-04-dang-ky)

---

## AI-03 – Sinh mã Middleware
- **Ngày / Người dùng AI:** 10/11/2026 – TV2
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** TM-04: Đăng ký, đăng nhập

### 1. Mục đích
- Sinh code cho nhiệm vụ 1

### 2. Prompt đã dùng
```
Hôm nay là ngày 4 và đây là chi tiết nhiệm vụ của mình:
AuthService.login(): kiểm tra email/mật khẩu, chặn tài khoản bị khóa; tạo session/JWT.
Hãy phân tích và sinh mã giúp mình
```

### 3. Kết quả AI trả về (tóm tắt)
> 1. Phân tích yêu cầu
> 2. Cấu trúc bảng User nên có
> 3. Viết LoginRequest
> 4. AuthService.login()
> 5. AuthController
> 6. Nếu đề tài yêu cầu JWT
> 7. Các trường hợp test

### 4. Phần giữ lại
- Mục 4, 5

### 5. Phần loại bỏ / chỉnh sửa và lý do
- Bỏ: Mục 3 vì kiểm tra tồn tại có 2 trường email và password nên viết trong Service luôn, 6 vì dùng session thay vì JWT
- Sửa: Không


### 6. AI sai hoặc chưa chắc chắn ở đâu
- Chưa chắc chắn ở controller và web.php

### 7. Cách kiểm chứng
- gõ trực tiếp đường dẫn trên url

### 8. Sản phẩm cuối cùng
[feat/TM04-dang-ky](https://github.com/ngoctramcam/ECommerce-Project/commit/dbc2ddb0e101973fd85aeb134bbc43e8722057b3)

---

## AI-03 – Sinh mã Middleware
- **Ngày / Người dùng AI:** 10/11/2026 – TV2
- **Công cụ AI:** Gemini
- **Thẻ Trello / Nhánh Git liên quan:** TM-06: Đặt hàng (COD)

### 1. Mục đích
- Sinh code cho nhiệm vụ 1

### 2. Prompt đã dùng
```
Mình là BE lead của một đồ án web thương mại điện tử sử dụng laravel + reactjs. Đây là nhiệm vụ của mình
Thiết kế OrderService.placeOrder(): đọc giỏ, kiểm tra tồn kho, tạo order + order_items, trừ kho, xóa giỏ – trong 1 transaction.
Viết mã giả và chia checklist cho TM-06.
```

### 3. Kết quả AI trả về (tóm tắt)
> 1. Mã giả
> 2. Khung OrderService

### 4. Phần giữ lại
- 1, 2

### 5. Phần loại bỏ / chỉnh sửa và lý do
- Bỏ: Không
- Sửa: Sửa lại tên thuộc tính cho khớp với db


### 6. AI sai hoặc chưa chắc chắn ở đâu
- không

### 7. Cách kiểm chứng
- Kiểm tra bằng tinker của laravel
- Các bước kiểm tra:
1.  Gõ ```bash php artisan tinker ``` vào terminal trong thư mục dự án
2.  Tạo dữ liệu giỏ hàng mẫu
// Lấy sản phẩm đầu tiên có số lượng > 0
```bash
$product = \App\Models\Product::where('stock', '>', 0)->first() ?? \App\Models\Product::create([
    'product_name' => 'Sách Test OrderService',
    'price'        => 120000,
    'stock'        => 10,
    'slug'         => 'sach-test-orderservice-' . time(),
]);
```
// Thêm vào giỏ hàng của user_id = 2
```bash
\App\Models\CartItem::create([
    'user_id'    => 2,
    'product_id' => $product->product_id,
    'quantity'   => 1,
]);
```
3. Gọi hàm placeOrder để test
```bash
$order = (new \App\Services\OrderService())->placeOrder(2, [
    'recipient_name'   => 'Khách Hàng 2',
    'recipient_phone'  => '0901234567',
    'shipping_address' => 'TP. Hồ Chí Minh',
    'payment_method'   => 'COD',
]);

$order;
```
4. Kiểm tra
// Kiểm tra số lượng tồn của sản phẩm
```bash
$product->fresh()->stock;
```
Nếu stock giảm thì thành công
// 2. Giỏ hàng của user_id = 2
```bash
\App\Models\CartItem::where('user_id', 2)->get();
```
Trả về mảng rỗng là thành công
// 3. Chi tiết order_items vừa tạo
```bash
\App\Models\OrderItem::where('order_id', $order->order_id)->get();
```
Hàm sẽ hiển thị chi tiết hóa đơn của khách hàng
### 8. Sản phẩm cuối cùng
[Commit](https://github.com/ngoctramcam/ECommerce-Project/commit/d384debd085af1511fdfb27578d335b245cc4a15)

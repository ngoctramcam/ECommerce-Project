# Mộc Sách — Hệ thống Thương mại Điện tử Bán sách Trực tuyến

**Mộc Sách** là nền tảng thương mại điện tử chuyên cung cấp các đầu sách chọn lọc (Văn học, Kỹ năng sống, Kinh tế - Tài chính, Tâm lý học, Thiếu nhi) với giao diện hiện đại, trải nghiệm mua sắm mượt mà và hệ thống quản trị tập trung.

---

## Tính năng chính

- **Phân hệ Khách hàng (User):**
  - Đăng ký, đăng nhập, quản lý thông tin cá nhân và sổ địa chỉ.
  - Tìm kiếm, lọc sách theo danh mục, xem chi tiết sản phẩm và đánh giá sao.
  - Quản lý giỏ hàng, áp dụng mã giảm giá (`vouchers`), đặt hàng trực tuyến.
  - Theo dõi trạng thái đơn hàng theo thời gian thực (`pending`, `processing`, `shipping`, `completed`, `cancelled`) và gửi đánh giá sau khi nhận sách.
- **Phân hệ Quản trị viên (Admin):**
  - Quản lý danh mục (`categories`), quản lý sách (`products`) và cập nhật tồn kho tự động khi phát sinh đơn hàng.
  - Duyệt và cập nhật trạng thái đơn hàng (`orders`), quản lý mã khuyến mãi (`vouchers`).
  - Quản lý tài khoản người dùng (`users`), hỗ trợ khóa/mở khóa tài khoản vi phạm.

---

## Công nghệ sử dụng

| Thành phần           | Công nghệ / Phiên bản                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Backend**          | PHP 8.1+, Laravel 11+                                                                                           |
| **Frontend**         | React, Vite, Tailwind CSS                                                                                       |
| **Cơ sở dữ liệu**    | MySQL (8 bảng: `users`, `categories`, `products`, `cart_items`, `orders`, `order_items`, `vouchers`, `ratings`) |
| **Kiểm thử tự động** | PHPUnit (`Unit` & `Feature` Tests)                                                                              |
| **Quản lý mã nguồn** | Git & GitHub (Mô hình 3 nhánh: `main` / `develop` / `feature/*`)                                                |

---

## Hướng dẫn cài đặt (Local Environment)

### 1. Yêu cầu môi trường

- **PHP** >= 8.1 (khuyên dùng XAMPP với PHP 8.2.12+)
- **Composer** >= 2.x
- **MySQL** / MariaDB

### 2. Các bước cài đặt

```bash
# Bước 1: Clone repository về máy
git clone https://github.com/ngoctramcam/ECommerce-Project.git
cd ECommerce-Project

# Bước 2: Cài đặt các gói thư viện Backend & Frontend
composer install
npm install

# Bước 3: Khởi tạo tệp cấu hình môi trường
cp .env.example .env
php artisan key:generate
```

### Cấu hình Database & Session trong tệp .env

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bookstore_db
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
CACHE_STORE=file
```

### Xóa toàn bộ bảng cũ, chạy lại migration và nạp dữ liệu mẫu từ đầu

```bash
php artisan migrate:fresh --seed --seeder=DemoDataSeeder
```

### Terminal 1: Chạy Backend Server ([http://127.0.0.1:8000])

```bash
php artisan serve
```

### Terminal 2: Biên dịch giao diện Frontend (Vite)

```bash
npm run dev
```

### Chạy toàn bộ bộ kiểm thử

```bash
php artisan test
```

### Hoặc chạy chi tiết từng nhóm kiểm thử

```bash
php artisan test --testsuite=Unit
php artisan test --testsuite=Feature
```

# Danh sách Tài khoản Demo & Dữ liệu Kiểm thử — Mộc Sách

> `php artisan migrate:fresh --seed --seeder=DemoDataSeeder`

## 1. Tài khoản Đăng nhập Hệ thống

| Vai trò    | Họ tên                 | Email                  | Mật khẩu   | Trạng thái | Mục đích kiểm thử                                                              |
| :--------- | :--------------------- | :--------------------- | :--------- | :--------- | :----------------------------------------------------------------------------- |
| **Admin**  | Quản Trị Viên Mộc Sách | `admin@mocsach.vn`     | `12345678` | `active`   | Quản lý sản phẩm, danh mục, voucher, người dùng và duyệt 5 trạng thái đơn hàng |
| **User 1** | Nguyễn Minh Anh        | `minhanh@gmail.com`    | `12345678` | `active`   | Giỏ hàng có sẵn 2 sách; có đơn `completed` để test chức năng đánh giá sao      |
| **User 2** | Trần Hoàng Nam         | `hoangnam@gmail.com`   | `12345678` | `active`   | Theo dõi đơn đang giao (`shipping`) và lịch sử đơn đã hủy (`cancelled`)        |
| **User 3** | Lê Văn Vi Phạm         | `lockeduser@gmail.com` | `12345678` | `locked`   | Kiểm thử ràng buộc chặn đăng nhập đối với tài khoản bị khóa                    |

## 2. Mã Giảm Giá Mẫu (`vouchers`)

| Mã Voucher   | Mức giảm  | Trạng thái        | Mục đích kiểm thử                               |
| :----------- | :-------- | :---------------- | :---------------------------------------------- |
| `MOCSACH20`  | `20.000đ` | Còn hạn (3 tháng) | Áp dụng giảm giá thành công khi thanh toán      |
| `CHAOBANMOI` | `15.000đ` | Còn hạn (2 tháng) | Áp dụng giảm giá cho đơn hàng mới               |
| `MUAHE2025`  | `30.000đ` | Đã hết hạn        | Kiểm thử thông báo lỗi khi nhập voucher hết hạn |

## 3. Dữ liệu Tồn kho Đặc biệt (`products`)

- **Hiểu Về Trái Tim** (`stock = 1`): Dùng để kiểm thử cảnh báo sắp hết hàng và chặn đặt vượt số lượng tồn kho.
- **Hoàng Tử Bé** (`stock = 0`): Dùng để kiểm thử trạng thái **Hết hàng** và vô hiệu hóa nút thêm vào giỏ.

## Link trello

```bash
https://trello.com/b/S0YFbnrL/d%E1%BB%93-an-lt-web-website-ban-sach
```

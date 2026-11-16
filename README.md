## Các bước Cài đặt & Khởi chạy dự án sau khi tải

**Bước 1: Clone dự án về máy**

```bash
git clone <URL_REPOSITORY_CUA_NHOM>
cd <TEN_THU_MUC_DU_AN>
```

**Bước 2: Cài đặt các thư viện phụ thuộc**

```bash
composer install
npm install
```

**Bước 3: Cấu hình môi trường**

- Trên Windows

```bash
copy .env.example .env
```

- Trên Linux/MacOS

```bash
cp .env.example .env
```

- Mở file .env và cập nhật lại thông số kết nối theo CSDL cá nhân

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bookstore_db
DB_USERNAME=root
DB_PASSWORD=
```

**Bước 4: Tạo key**

```bash
php artisan key:generate
```

**Bước 5: Chạy dự án**

```bash
php artisan serve
```

## Database

Chạy migration và seeder

mở xampp star apache, MySQL

```bash
php artisan migrate:fresh --seed
```

## Tài khoản demo

admin@gmail.com - admin123

user1@gmail.com - 12345678

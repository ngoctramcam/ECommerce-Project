# Cấu trúc thư mục dự án

## app/Models

Chứa các Eloquent Model đại diện cho các bảng trong cơ sở dữ liệu như:

- User
- Category
- Product
- Order
- OrderItem
- CartItem

## app/Http/Controllers

Tiếp nhận request từ người dùng và gọi Service xử lý nghiệp vụ.

## app/Providers

Đăng ký các Service, Repository, cấu hình Dependency Injection và các thiết lập khởi động của ứng dụng.

## database/factories

Chứa các Factory dùng để tạo dữ liệu giả phục vụ Seeder, kiểm thử và phát triển hệ thống.

## database/migrations

Chứa các migration tạo và cập nhật cấu trúc cơ sở dữ liệu.

## database/seeders

Chứa dữ liệu mẫu phục vụ phát triển và kiểm thử.

## resources/views

Chứa giao diện Blade của hệ thống.

## resources/css

Chứa các file CSS tùy chỉnh.

## resources/js

Chứa mã JavaScript phía giao diện.

## routes

Định nghĩa các tuyến đường của hệ thống.

### routes/web.php

Định nghĩa route giao diện Web.

# public

Chứa tài nguyên công khai:

- CSS
- JavaScript
- Hình ảnh
- File upload

## storage

Lưu log hệ thống, cache và dữ liệu tạm thời.

## bootstrap

Khởi tạo ứng dụng Laravel và nạp các cấu hình cần thiết.

## tests

Chứa mã nguồn kiểm thử tự động.

### tests/Unit

Kiểm thử các lớp nghiệp vụ riêng lẻ.

### tests/Feature

Kiểm thử các chức năng hoàn chỉnh của hệ thống.

## docs

Lưu trữ tài liệu đồ án:

- Đề cương
- ERD
- Use Case
- Sequence Diagram
- Kiến trúc hệ thống
- Cấu trúc thư mục

## ai-logs

Lưu nhật ký sử dụng AI của các thành viên.

## README.md

Hướng dẫn cài đặt và chạy dự án.

## .env.example

Tệp cấu hình môi trường mẫu cho thành viên mới.

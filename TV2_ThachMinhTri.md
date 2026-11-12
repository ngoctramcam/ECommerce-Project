# AI log – TV2 – Thạch Minh Trí
| Mục | Thông tin |
| --- | --- |
| Họ tên, MSSV |Thạch Minh Trí - 0306241331 |
| Nhóm, đề tài | Nhóm [số] – Xây dựng website thương mại điện tử bán sách |
| Vai trò | TV2 – BE (Backend Lead) |
| Công cụ AI dùng | GitHub Copilot |

## Bảng tổng hợp

| Mã | Ngày | Giai đoạn | Nội dung | Commit / PR |
| --- | --- | --- | --- | --- |
| AI-01 | 10/11/2026 |  Lập trình | Hỗ trợ cấu hình Eloquent | [Pull Request](https://github.com/ngoctramcam/ECommerce-Project/pull/3) |
| AI-01 | 11/11/202 | Lập trìn | Phân tích yêu cầu của nhiệm vụ ngày 3  | [Commit](https://github.com/ngoctramcam/ECommerce-Project/commit/a19835307686fe116f538c2c2b2360f86af5ec74) |

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

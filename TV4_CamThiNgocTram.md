# AI log – TV4 – Cam Thị Ngọc Trâm

| Mục             | Thông tin                                                |
| --------------- | -------------------------------------------------------- |
| Họ tên, MSSV    | Cam Thị Ngọc Trâm - 0306241330                           |
| Nhóm, đề tài    | Nhóm [số] – Xây dựng website thương mại điện tử bán sách |
| Vai trò         | TV3 – BE (Backend)                                       |
| Công cụ AI dùng | GitHub Copilot                                           |

## Bảng tổng hợp

| Mã    | Ngày       | Giai đoạn | Nội dung                                             | Commit / PR                                                                   |
| ----- | ---------- | --------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| AI-01 | 10/11/2026 | Thiết kế  | Nhờ AI gợi ý những thuộc tính thương có của các bảng | [commit](https://github.com/ngoctramcam/ECommerce-Project/tree/docs/Database) |
| AI-02 | 11/11/202  | Thiết kế  | Nhờ AI gợi ý cách trình bày mô tả erd                | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/docs/Database) |
| AI-03 | 12/11/202  | Lập trình | Nhờ AI tạo dữ liệu giùm                              | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database) |
| AI-04 | 16/11/202  | Lập trình | Nhờ AI viết chức năng CRUD cho Categories            | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database) |

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

## AI-02 – <Mô tả erd-v2>>

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

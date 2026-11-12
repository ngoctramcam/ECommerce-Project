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

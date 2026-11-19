# AI log – TV5 – Cam Thị Ngọc Trâm

| Mục             | Thông tin                                             |
| --------------- | ----------------------------------------------------- |
| Họ tên, MSSV    | Cam Thị Ngọc Trâm - 0306241330                        |
| Nhóm, đề tài    | Nhóm 3 – Xây dựng website thương mại điện tử bán sách |
| Vai trò         | TV5 – Git/Tester                                      |
| Công cụ AI dùng | GitHub Copilot                                        |

## Bảng tổng hợp

| Mã    | Ngày       | Giai đoạn | Nội dung                                        | Commit / PR                                                                         |
| ----- | ---------- | --------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| AI-01 | 10/11/2026 | Thiết kế  | Hỏi về các lệnh Git                             | [commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feature)             |
| AI-02 | 11/11/2026 | Thiết kế  | Tạo test case TM-05 chức năng giỏ hàng          | [Commit](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)   |
| AI-03 | 12/11/2026 | Thiết kế  | Tạo test case TM-04 chức năng đăng ký/đăng nhập | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/database)       |
| AI-04 | 19/11/2026 | Lập trình | Nhờ AI viết chức năng giỏ hàng                  | [Commit](https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang) |

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

## AI-02 – <Tạo test case TM-05 Giỏ hàng>

- **Ngày / Người dùng AI:** 11/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [DOC] docs/test-case.md

### 1. Mục đích

Nhờ AI viế 5 test case cho chức năng giỏ hàng

### 2. Prompt đã dùng

Hãy tạo cho tôi 5 test casecho chức năng giỏ hàng cho trang web thương mại điện tử tui đang làm theo đặc tả từ tệp đính kèm

### 3. Kết quả AI trả về (tóm tắt)

AI đưa ra tổng cộng 5 test case cho chức năng giỏ hàng

### 4. Phần giữ lại

- 5 test case gồm có: thêm khi giỏ hàng đa tồn tại, thêm sản phẩm khi giỏ hàng chưa có sản phẩm, thêm sản phẩm vượt quá số lượng tồn, xóa sản phẩm khỏi giỏ, kiểm tra tính tổng tiền

### 5. Phần loại bỏ / chỉnh sửa và lý do

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/test-case.md)

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

## AI-04 – Viết chức năng thêm sản phẩm vào giỏ hàng

- **Ngày / Người dùng AI:** 16/11/2026 – TV5
- **Công cụ AI:** Copilot
- **Thẻ Trello / Nhánh Git liên quan:** [TM-05] Giỏ hàng

### 1. Mục đích

Nhờ AI viết chức năng thêm giỏ sản phẩm vào giỏ hàng

### 2. Prompt đã dùng

Tui cần hàm thêm sản phẩm vào giỏ hàng, cần phải kiểm tra người dùng có đăng nhập chưa, sản phẩm có tồn tại hay không, sản phẩm tồn kho còn đủ hay khôn, sản phẩm còn kinh doanh không.

### 3. Kết quả AI trả về (tóm tắt)

AI đưa hàm add add($userId, $productId, $qty = 1) với đầy đủ các yêu cầu cần kiểm tra

### 4. Phần giữ lại

- Giữ lại khung sườn code

### 5. Phần loại bỏ chỉnh sửa và lý do

- Sửa những tên thuộc tính vì AI viết chưa đúng theo thuộc tính trong model.

### 6. AI sai hoặc chưa chắc chắn ở đâu

### 7. Cách kiểm chứng

### 8. Sản phẩm cuối cùng

Link commit/PR: [...] (https://github.com/ngoctramcam/ECommerce-Project/tree/feat/TM-05-gio-hang)

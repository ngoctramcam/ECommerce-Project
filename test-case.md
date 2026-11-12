# TM-05 - Test Cases Giỏ Hàng

## Thông tin chung

| Thuộc tính    | Giá trị                                                        |
| ------------- | -------------------------------------------------------------- |
| Mã chức năng  | TM-05                                                          |
| Tên chức năng | Giỏ hàng                                                       |
| Mô tả         | Quản lý sản phẩm trong giỏ hàng và kiểm tra điều kiện mua hàng |

---

## Danh sách Test Case

| ID     | Mã chức năng | Bước thực hiện                                                                                    | Dữ liệu                         | Kết quả mong đợi                                                                                                                        | Kết quả thực tế |
| ------ | ------------ | ------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | TM-05        | 1. Đăng nhập tài khoản.<br>2. Truy cập trang chi tiết sản phẩm.<br>3. Nhấn **Thêm vào giỏ hàng**. | Sản phẩm A, tồn kho = 10        | Sản phẩm được thêm vào giỏ hàng với số lượng = 1. Biểu tượng giỏ hàng được cập nhật.                                                    |                 |
| TC-002 | TM-05        | 1. Thêm sản phẩm A vào giỏ hàng.<br>2. Tiếp tục nhấn **Thêm vào giỏ hàng** đối với cùng sản phẩm. | Sản phẩm A                      | Không tạo thêm dòng sản phẩm mới. Số lượng sản phẩm trong giỏ tăng từ 1 lên 2.                                                          |                 |
| TC-003 | TM-05        | 1. Mở trang giỏ hàng.<br>2. Thay đổi số lượng sản phẩm từ 1 thành 3.<br>3. Nhấn cập nhật.         | Sản phẩm A, đơn giá 100.000 VNĐ | Hệ thống cập nhật số lượng thành 3. Thành tiền sản phẩm là 300.000 VNĐ. Tổng tiền giỏ hàng được tính lại chính xác.                     |                 |
| TC-004 | TM-05        | 1. Mở giỏ hàng.<br>2. Chọn nút **Xóa** tại sản phẩm cần xóa.                                      | Sản phẩm A                      | Sản phẩm bị xóa khỏi giỏ hàng. Tổng tiền được cập nhật lại tương ứng. Nếu không còn sản phẩm nào thì hiển thị thông báo giỏ hàng trống. |                 |
| TC-005 | TM-05        | 1. Mở giỏ hàng.<br>2. Cập nhật số lượng sản phẩm vượt quá tồn kho.<br>3. Lưu thay đổi.            | Tồn kho = 5, nhập số lượng = 10 | Hệ thống từ chối cập nhật. Hiển thị thông báo **"Số lượng vượt quá tồn kho"**. Dữ liệu trong giỏ hàng không thay đổi.                   |                 |

---

## Kết quả kiểm thử

| Trạng thái | Ý nghĩa                                               |
| ---------- | ----------------------------------------------------- |
| Pass       | Chức năng hoạt động đúng theo yêu cầu                 |
| Fail       | Chức năng không đáp ứng kết quả mong đợi              |
| Blocked    | Không thể tiếp tục kiểm thử do lỗi hoặc thiếu dữ liệu |

# TM-04 - Test Cases Đăng Ký / Đăng Nhập

## Thông tin chung

| Thuộc tính    | Giá trị                                                 |
| ------------- | ------------------------------------------------------- |
| Mã chức năng  | TM-04                                                   |
| Tên chức năng | Đăng ký / Đăng nhập                                     |
| Mô tả         | Cho phép người dùng tạo tài khoản và đăng nhập hệ thống |

---

## Danh sách Test Case

| ID     | Mã chức năng | Bước thực hiện                                                               | Dữ liệu                     | Kết quả mong đợi                                            | Kết quả thực tế |
| ------ | ------------ | ---------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------- | --------------- |
| TC-001 | TM-04        | 1. Mở trang đăng ký.<br>2. Nhập đầy đủ thông tin.<br>3. Nhấn Đăng ký.        | user01@gmail.com / 12345678 | Tạo tài khoản thành công và lưu vào CSDL.                   |                 |
| TC-002 | TM-04        | 1. Mở trang đăng ký.<br>2. Nhập email đã tồn tại.<br>3. Nhấn Đăng ký.        | admin@gmail.com             | Hiển thị lỗi "Email đã tồn tại".                            |                 |
| TC-003 | TM-04        | 1. Nhập mật khẩu dưới 8 ký tự.<br>2. Nhấn Đăng ký.                           | 123456                      | Hiển thị lỗi mật khẩu tối thiểu 8 ký tự.                    |                 |
| TC-004 | TM-04        | 1. Để trống email.<br>2. Nhấn Đăng ký.                                       | Email rỗng                  | Hiển thị lỗi bắt buộc nhập email.                           |                 |
| TC-005 | TM-04        | 1. Nhập email sai định dạng.<br>2. Nhấn Đăng ký.                             | abcxyz                      | Hiển thị lỗi định dạng email không hợp lệ.                  |                 |
| TC-006 | TM-04        | 1. Đăng ký tài khoản thành công.<br>2. Kiểm tra dữ liệu trong DB.            | Password = 12345678         | Password được mã hóa (hash), không lưu dạng văn bản thường. |                 |
| TC-007 | TM-04        | 1. Mở trang đăng nhập.<br>2. Nhập thông tin chính xác.<br>3. Nhấn Đăng nhập. | user01@gmail.com / 12345678 | Đăng nhập thành công, chuyển đến trang phù hợp với vai trò. |                 |
| TC-008 | TM-04        | 1. Nhập sai mật khẩu.<br>2. Nhấn Đăng nhập.                                  | user01@gmail.com / abc12345 | Hiển thị lỗi đăng nhập.                                     |                 |
| TC-009 | TM-04        | 1. Nhập email không tồn tại.<br>2. Nhấn Đăng nhập.                           | notfound@gmail.com          | Hiển thị lỗi đăng nhập.                                     |                 |
| TC-010 | TM-04        | 1. Thử đăng ký với chuỗi SQL Injection.                                      | ' OR 1=1 --                 | Hệ thống không bị lỗi, không tạo tài khoản.                 |                 |
| TC-011 | TM-04        | 1. Nhập thẻ script vào họ tên.<br>2. Đăng ký.                                | <script>alert(1)</script>   | Script không được thực thi.                                 |                 |
| TC-012 | TM-04        | 1. Đăng nhập bằng tài khoản admin.                                           | admin@gmail.com             | Chuyển đến trang quản trị.                                  |                 |
| TC-013 | TM-04        | 1. Đăng nhập bằng tài khoản user.                                            | user01@gmail.com            | Chuyển đến trang người dùng.                                |                 |

---

## Kết quả kiểm thử

| Trạng thái | Ý nghĩa                                               |
| ---------- | ----------------------------------------------------- |
| Pass       | Chức năng hoạt động đúng theo yêu cầu                 |
| Fail       | Chức năng không đáp ứng kết quả mong đợi              |
| Blocked    | Không thể tiếp tục kiểm thử do lỗi hoặc thiếu dữ liệu |

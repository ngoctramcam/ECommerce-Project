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

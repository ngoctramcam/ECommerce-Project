#Đặc tả use case
UC-01:Đăng nhập(TM-04)
Tác nhân:Khách vãng lai(đã có tài khoản),Quản trị
Mô tả:xác thực bằng email và mật khẩu để truy cập vào hệ thống

Tiền điều kiện:
-Đã có tài khoản
-Tài khoản không bị khóa
-Chưa đăng nhập

Hậu điều kiện:
-Thành công:tạo phiên/token,điều hướng theo vai trò(khách hàng->trang chủ),(quản trị viên->trang quản trị).
-Thất bại:không tạo phiên,báo lỗi.

Luồng chính:
1.Người dùng mở trang Đăng nhập
2.Hệ thống hiển thị form đăng nhập(email,password)
3.Người dùng nhập thông tin và bấm "Đăng nhập"
4.Hệ thống kiểm tra email và mật khẩu được nhập, đảm bảo dữ liệu hợp lệ trước khi xác thực.
5.Hệ thống tìm tài khoản theo email và so khớp mật khẩu với bản băm(bcrypt)
6.Hệ thống kiểm tra tài khoản không bị khóa
7.Hệ thống điều hướng theo vai trò và tạo phiên token

Luồng phụ:
A1:Chưa có tài khoản chọn "Đăng ký"(email duy nhất, password >= 8 ký tự)
A2:Bị chuyển đến trang đăng nhập khi bấm "Thêm giỏ hàng";sau khi đăng nhập,quay lại đúng trang sách đang xem
A3:Đăng xuất:hủy phiên/token ở server, xóa token ở trình duyệt, chuyển về trang chủ với vai trò Khách vãng lai

Luồng ngoại lệ:
E1:Bỏ trống hoặc sai định dạng(Bước 4):báo lỗi tại trường sai
E2:Email không tồn tại hoặc sai password(Bước 5):báo chung"Email hoặc mật khẩu không đúng" quay lại (Bước 2)
E3:Tài khoản bị khóa(Bước 6) báo "Tài khoản đã bị khóa" không tạo phiên
E4:Nhập sai nhiều lần liên tiếp:tạm chặn đăng nhập 1 thời gian
E5:Lỗi kết nối server/CSDL báo:"Hệ thống đang gặp sự cố vui lòng thử lại sau"

---

UC-02:Quản lý sản phẩm(TM-12)
Tác nhân:Quản trị
Mô tả:Thêm,xem,sửa,xóa,ẩn/hiển sách;tìm kiếm,phân trang

Tiền điều kiện:
-Đã đăng nhập với vai trò admin
-Có ít nhất 1 danh mục(TM-11)

Hậu điều kiện:
-Dữ liệu sản phẩm được cập nhật trong CSDL
-Thay đổi hiển thị ngay ở trang khách hàng

Luồng chính(Thêm sản phẩm)
1.Quản trị mở trang "Quản lý sản phẩm"
2.Hệ thống hiển thị danh sách phân trang phía server(10-20 sách/trang)
3.Quản trị bấm "Thêm sản phẩm"
4.Hệ thống hiển thị form:tên,danh mục,giá,tồn kho,mô tả,ảnh đại diện,ẩn/hiện.
5.Quản trị nhập thông tin, chọn 1 ảnh(jpg/png <=2MB) và bấm nút "Lưu"
6.Hệ thống kiểm tra ở phía server (tên không rỗng,giá >0,tồn kho >=0,danh mục tồn tại,ảnh đúng định dạng và dung lượng)
7.Hệ thống lưu ảnh đại diện vào thư mục lưu trữ và lưu thông tin sản phẩm vào CSDL
8.Hệ thống thông báo thêm sản phẩm thành công và cập nhật lại danh sách sản phẩm

Luồng phụ
A1:Tìm kiếm:nhập từ khóa,danh sách lọc theo tên,vẫn phân trang
A2:Sửa sản phẩm:chọn "Sửa",chỉnh sửa nội dung rồi "Lưu";giá mới không ảnh hưởng order_items cũ
A3:Ẩn/hiện:Bật/tắt trạng thái;sản phẩm ẩn không hiển thị ở trang khách nhưng vẫn còn trong CSDL
A4:Xóa sản phẩm chưa có đơn:xác nhận rồi xóa
A5:Xóa sản phẩm đã có trong đơn: xóa mềm(is_deleted=1),không xóa cứng

Luồng ngoại lệ:
E1:Dữ liệu không hợp lệ (bước 6):Báo lỗi ngay trường sai,giữ dữ liệu đã nhập
E2:Ảnh sai định dạng hoặc > 2MB:Báo lỗi,không lưu sản phẩm
E3:Người không phải admin gọi URL/API quản trị:từ chối 403(kiểm tra quyển ở server)

---

UC-03:Đặt hàng COD(TM-06)
Tác nhân:Khách hàng
Mô tả:Đặt các sách trong giỏ hàng,nhập thông tin nhận hàng,thanh toán khi nhận hàng

Tiền điều kiện:
-Đã đăng nhập,tài khoản không bị khóa
-Giỏ hàng có ít nhất 1 sản phẩm

Hậu điều kiện:
-Thành công:tạo đơn"Chờ xác nhận";order_items lưu giá lúc mua;trừ tồn kho;xóa giỏ.
-Thất bại:không tạo đơn;tồn kho giữ nguyên;giỏ hàng giữ nguyên

Luồng chính:
1.Khách hàng mở giỏ hàng và bấm "Đặt hàng"
2.Hệ thống kiểm tra đã đăng nhập,hiển thị trang đặt hàng với tóm tắt giỏ hàng và tổng tiền
3.Khách hàng nhập họ tên, số điện thoại, địa chỉ nhận hàng
4.Khách hàng chọn phương thức thanh toán COD
5.Khách bấm"Xác nhận đặt hàng"(Thanh toán khi nhận hàng)
6.Hệ thống kiểm tra dữ liệu phía server
7.Hệ thống mở giao dịch,khóa các dòng sản phẩm, kiểm tra lại tồn kho và trạng thái từng sản phẩm
8.Hệ thống tạo đơn hàng và chi tiết đơn hàng, lưu giá tại thời điểm mua, trừ tồn kho và xóa các sản phẩm trong giỏ hàng.Nếu tất cả thao tác thành công, hệ thống commit transaction.
9.Hệ thống hiển thị "Đặt hàng thành công" kèm mã đơn hàng

Luồng phụ:
A1:Đổi số lượng hoặc xóa sách ở trang đặt hàng:quay về giỏ hàng (TM-05),cập nhật lại tổng tiền

Luồng ngoại lệ:
E1:Chưa đăng nhập:Chuyển sang đăng nhập,sau đó quay lại giỏ hàng
E2:Giỏ hàng trống:Chặn báo "Giỏ hàng trống"
E3:Hết hàng(tồn kho =0):Quay lại,báo tên sách hết hàng
E4:Tồn kho nhỏ hơn số lượng đặt:Quay lại,báo "chỉ còn X cuốn sách",cho chỉnh số lượng
E5:Hai khách cùng mua 1 cuốn sách:Chỉ 1 đơn thành công, người còn lại nhận E3
E6:Sản phẩm bị ẩn hoặc bị xóa mềm sau khi vào giỏ hàng:Loại khỏi đơn,báo khách
E7:Hệ thống phát hiện giá sản phẩm thay đổi:Hiển thị tổng tiền mới cho khách hàng,Khách hàng xác nhận lại,Sau khi xác nhận mới thực hiện tạo đơn hàng.
E8:Thông tin nhận hàng không hợp lệ:Báo lỗi "Yêu cầu nhập lại"
E9:Phiên đăng nhập hết hạn: Chuyển về trang đăng nhập.
E10:Tài khoản bị khóa: Thông báo tài khoản bị khóa và từ chối đặt hàng.
E11:Bấm "Xác nhận" 2 lần:Vô hiệu hóa nút sau,server chặn đơn trùng
E12:Lỗi CSDL/mất kết nối:Hệ thống rollback transaction, không tạo đơn hàng, không thay đổi tồn kho và giữ nguyên giỏ hàng. Hiển thị thông báo lỗi để khách thử lại.
E13:Đổi Id giỏ/đơn trên URL hoặc API: Chặn 403/404

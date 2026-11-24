# Đặc tả 3 use case chính – Website bán sách

Đồ án Lập trình Web · Đề tài A: Thương mại điện tử (COD)

## Quy ước chung

- Mọi kiểm tra dữ liệu và kiểm tra quyền đều thực hiện ở phía server .
- Thông báo lỗi bằng tiếng Việt, nêu rõ trường sai. Lỗi hệ thống không lộ chi tiết kỹ thuật.

### UC-01: Đăng nhập

#### Tác nhân: Khách vãng lai (đã có tài khoản), khách hàng, quản trị

Mô tả: Xác thực bằng email và mật khẩu để truy cập vào hệ thống. Hệ thống dùng session và cookie của Laravel. Điều hướng theo vai trò:admin về trang quản trị, vai trò còn lại về trang chủ.

#### Tiền điều kiện:

- Người dùng đã có tài khoản
- Chưa đăng nhập (chưa có phiên )

#### Hậu điều kiện:

- Thành công: hệ thống tạo phiên (cookie session, HttpOnly) và trả về thông tin người dùng; giao diện lưu thông tin hiển thị và điều hướng theo vai trò.
- Thất bại: không tạo phiên, giao diện hiển thị thông báo lỗi.

#### Luồng chính:

1. Người dùng mở trang Đăng nhập.
2. Hệ thống trả khung trang, cấp XSRF-TOKEN để chống csrf.
3. Người dùng nhập email,mật khẩu, bấm "Đăng nhập";giao diện gửi yêu cầu JSON kèm mã CSRF TOKEN trong header X-XSRF-TOKEN.
4. Hệ thống kiểm tra mã CSRF.
5. Hệ thống kiểm tra dữ liệu:email,mật khẩu.(đúng định dạng,không rỗng).
6. Hệ thống tìm tài khoản theo email và so khớp mật khẩu với mã băm.
7. Hệ thống kiểm tra tài khoản không bị khóa,chỉ kiểm tra sau khi mật khẩu đúng.
8. Hệ thống đăng nhập tài khoản,tạo phiên,tạo mã phiên.
9. Hệ thống trả về thông tin người dùng(id,name,email,role);điều hướng theo vai trò.('/admin' vai trò admin, ngược lại '/')
10. Giao diện lưu thông tin người dùng (chỉ để hiển thị)

#### Luồng phụ:

- A1. Chưa có tài khoản: người dùng chọn "Đăng ký" chuyển sang trang Đăng ký.
- A2. Đã đăng nhập mà mở lại trang Đăng nhập:giao diện chuyển đến theo vai trò.
- A3. Đăng xuất:Hủy phiên,tạo lại mã CSRF.

#### Luồng ngoại lệ:

- E1. Bỏ trống hoặc sai định dạng (bước 5),hệ thống trả về HTTP 422 kèm theo lỗi từng trường.
- E2. Email không tồn tại hoặc sai mật khẩu (bước 6):HTTP 401 ,thông báo chung"Email hoặc mật khẩu không tồn tại".
- E3. Tài khoản bị khóa (bước 7), hệ thống trả về HTTP 401,thông báo"Tài khoản đã bị khóa vui lòng liên hệ quản trị viên".
- E4. Mã CSRF thiếu hoặc hết hạn(bước 4):HTTP 419;người dùng tải lại trang và thử lại.
- E5. Lỗi máy chủ or CSDL:HTTP 500,Laravel tự động ghi log, không tạo phiên.

### UC-02: Quản lý sản phẩm

#### Tác nhân: Quản trị

#### Mô tả: Thêm, xem, sửa, xóa, ẩn/hiện sách; tìm kiếm và phân trang phía server.

#### Tiền điều kiện:

- Đã đăng nhập với vai trò admin
- Có ít nhất 1 danh mục

#### Hậu điều kiện

- Thành công: dữ liệu sản phẩm được cập nhật trong CSDL, thay đổi hiển thị ngay ở trang khách hàng.
- Thất bại: không có thay đổi nào trong CSDL.

#### Luồng chính (Thêm sản phẩm)

1. Quản trị mở trang "Quản lý sản phẩm".
2. Hệ thống kiểm tra quyền admin và hiển thị danh sách phân trang phía server (10 đến 20 sách mỗi trang, không hiển thị sách đã xóa mềm)
3. Quản trị bấm "Thêm sản phẩm"
4. Hệ thống hiển thị form: tên, danh mục (chọn từ danh sách hiện có), giá, tồn kho, mô tả, ảnh đại diện, ẩn/hiện, kèm CSRF Token
5. Quản trị nhập thông tin, chọn 1 ảnh (jpg/png tối đa 2MB) và bấm "Lưu"
6. Hệ thống kiểm tra phía server: CSRF token; tên không rỗng; giá lớn hơn 0; tồn kho là số nguyên không âm; danh mục tồn tại; ảnh đúng định dạng và dung lượng, kiểm tra theo nội dung tệp chứ không chỉ theo đuôi tên tệp.
7. Hệ thống lưu ảnh vào thư mục lưu trữ với tên ngẫu nhiên (không dùng tên gốc của tệp), rồi lưu thông tin sản phẩm vào CSDL.
8. Hệ thống thông báo thêm thành công và cập nhật lại danh sách.

#### Luồng phụ:

- A1. Tìm kiếm: nhập từ khóa, danh sách lọc theo tên, vẫn phân trang phía server. Từ khóa đi qua tham số của truy vấn (chống SQL Injection).
- A2. Sửa sản phẩm: chọn “Sửa”, form điền sẵn dữ liệu, chỉnh sửa rồi “Lưu”, kiểm tra như bước 6. Không chọn ảnh mới thì giữ ảnh cũ; có ảnh mới thì thay và xóa ảnh cũ sau khi lưu thành công. Giá mới không ảnh hưởng order_items cũ.
- A3. Ẩn/hiện: bật hoặc tắt trạng thái. Sản phẩm ẩn không hiển thị ở trang khách và không đặt hàng được, nhưng vẫn còn trong CSDL.
- A4. Xóa sản phẩm chưa có đơn: hiển thị hộp xác nhận, đồng ý thì xóa sản phẩm, gỡ khỏi các giỏ hàng đang chứa nó và xóa tệp ảnh trong cùng một thao tác.
- A5. Xóa sản phẩm đã có trong đơn: xóa mềm (is_deleted = 1), không xóa cứng. Các đơn cũ vẫn xem được sản phẩm đã mua.
- A6. Xem chi tiết một sản phẩm từ danh sách.

#### Luồng ngoại lệ:

- E1. Dữ liệu không hợp lệ (bước 6): báo lỗi ngay tại trường sai, giữ lại dữ liệu đã nhập (riêng tệp ảnh phải chọn lại).
- E2. Ảnh sai định dạng, lớn hơn 2 MB hoặc nội dung không phải ảnh thật: báo lỗi, không lưu sản phẩm.
- E3. Người không phải admin gọi URL hoặc API quản trị: từ chối 403 (kiểm tra quyền ở server). Chưa đăng nhập: 401 và chuyển đến trang đăng nhập.
- E4. Phiên hết hạn khi đang nhập form: chuyển đến đăng nhập, báo dữ liệu chưa được lưu.
- E5. Danh mục bị xóa hoặc ẩn trong lúc đang nhập: báo “Danh mục không tồn tại”, giữ dữ liệu, cho chọn lại danh mục.
- E6. Hai quản trị cùng sửa một sản phẩm: dùng phiên bản (version hoặc updated_at) để phát hiện. Người lưu sau nhận thông báo “Sản phẩm đã được cập nhật bởi người khác, vui lòng tải lại”, tránh ghi đè mất dữ liệu.
- E7. Sửa hoặc xóa sản phẩm không còn tồn tại (đã bị admin khác xóa): báo “Sản phẩm không tồn tại”, làm mới danh sách.
- E8. Lỗi lưu ảnh (đầy ổ đĩa, không có quyền ghi): báo lỗi, không tạo sản phẩm.
- E9. Lỗi CSDL sau khi đã lưu ảnh: hoàn tác, xóa ảnh vừa lưu, báo lỗi, ghi log.
- E10. CSRF token sai hoặc hết hạn: từ chối, tải lại form, giữ dữ liệu nhập.

### UC-03: Đặt hàng COD

#### Tác nhân: Khách hàng

#### Mô tả: Đặt các sách trong giỏ hàng, nhập thông tin nhận hàng, thanh toán khi nhận hàng(COD)

#### Tiền điều kiện:

- Đã đăng nhập, tài khoản không bị khóa.
- Giỏ hàng có ít nhất 1 sản phẩm và khách đã chọn ít nhất 1 sản phẩm để đặt.

#### Hậu điều kiện:

- Thành công: trong 1 transaction duy nhất:
  - Tạo đơn trạng thái "pending",lưu họ tên người nhận,số điện thoại,địa chỉ giao hàng,ghi chú,phương thức thanh toán COD,mã giảm giá,tổng tiền tính ở server,mã chống gửi trùng.
  - order_items lưu số lượng, đơn giá lúc mua,thành tiền.
  - Tồn kho các sách đã đặt bị trừ.
  - Các dòng trong giỏ hàng đã đặt bị xóa, các dòng không được chọn giữ nguyên.
- Thất bại: không tạo đơn, tồn kho và giỏ hàng giữ nguyên (hệ thống không được giỏ hàng khi phát hiện sách ẩn,hết hàng hoặc giá đổi).
- Công thức: Tổng = tạm tính - giảm giá + phí vận chuyển(giảm giá không vượt quá tạm tính).

#### Luồng chính:

1. Khách hàng mở giỏ hàng, chọn sản phẩm, ấn "Tiến hành đặt hàng".
2. Chuyển giao diện đến trang giỏ hàng, tạo ra 1 mã chống gửi trùng.
3. Giao diện tải các sản phẩm đã chọn từ server (giá và tồn kho hiện tại) để hiển thị tóm tắt: tạm tính, giảm giá, phí vận chuyển, tổng. Server lấy giỏ hàng theo người đăng nhập.
4. Khách hàng nhập họ tên,số điện thoại,địa chỉ,ghi chú(tùy chọn);thông tin có sẵn trong hồ sơ khách hàng có thể sửa.
5. Phương thức thanh toán COD (mặc định,duy nhất).
6. Khách bấm "Xác nhận đặt hàng". Giao diện vô hiệu hóa nút và gửi: thông tin nhận hàng, ghi chú, mã chống gửi trùng, danh sách id các dòng giỏ được chọn, mã giảm giá(nếu có). không gửi giá từng sản phẩm, không gửi định danh người dùng.
7. Server kiểm tra transaction:CSRF, đã đăng nhập, tài khoản không bị khóa, họ tên không rỗng (max=255), số điện thoại bắt đầu từ 0 đủ 10 chữ số, địa chỉ không được rỗng(max=255), ghi chú(max=255),danh sách id sản phẩm trong giỏ không được rỗng.
8. Server mở transaction khóa các dòng trong giỏ hàng được chọn, rồi khóa các dòng theo sản phẩm.
9. Server kiểm tra lại và gom tất cả lỗi báo 1 lần, sản phẩm chưa xóa mềm và đang được hiển thị, số lượng hợp lệ, tồn kho đủ, mã có hiệu lực, tổng tiền server tính khớp với tổng tiền hiển thị.
10. Server tạo đơn , order_items (đơn giá lấy từ CSDL), trừ tồn kho bằng câu lệnh có điều kiện(chỉ trừ khi còn đủ hàng), xóa các dòng giỏ hàng đã đặt.
11. Giao diện hiển thị "Đặt hàng thành công" kèm mã đơn và liên kết với Đơn hàng của tôi, cập nhật lại số lượng trong giỏ hàng.

#### Luồng phụ:

A1. Đổi số lượng hoặc xóa sách: quay về giỏ hàng, sau đó đặt lại từ bước 1.
A2. Mã giảm giá: khách nhập mã giảm giá(bước 6);giao diện gọi server kiểm tra mã(tồn tại, còn hạn), hiển thị số tiền giảm do server trả về; mã và số tiền được giảm lưu vào đơn. Giao diện không tự tính giảm giá.
A3. Xác nhận lại giá: khi server báo tổng tiền hoặc mã giảm giá đã thay đổi,giao diện hiển thị tổng mới, khách hàng bấm "Xác nhận đơn hàng", giữ nguyên mã chống trùng vì chưa có đơn nào được tạo.

#### Luồng ngoại lệ:

##### Xác thực và phiên:

E1. Tài khoản bị khóa: từ chối, báo tài khoản bị khóa, hủy phiên, không tạo đơn.
E2. CSRF sai hoặc hết hạn(HTTP 419): báo phiên làm việc đã hết hạn, vui lòng thử lại, giữ dữ liệu nhập.
E3. Đổi id dòng sản phẩm giỏ hàng, đơn, sản phẩm từ URL hoặc API, hoặc gửi định danh người dùng giả: bỏ qua định dạng từ client, người đặt luôn lấy từ phiên; id không thuộc phiên thì từ chối 404, không tạo đơn.

##### Giỏ hàng:

E4. Chưa chọn sản phẩm hoặc giỏ trống: chặn và báo lỗi. Nếu ở (bước 9 giỏ đã đổi ở tab khác hoặc đã được đặt), hoàn tác, báo "Giỏ hàng đã trống hoặc đã thay đổi",tải lại.
E5. Số lượng không hợp lệ(<=0,không phải số nguyên), từ chối 422, không tạo đơn.

##### Hàng hóa:

E6. Sách bị ẩn hoặc đã xóa mềm: báo từng sách; khách quay về giỏ để xóa.
E7. Hết hàng hoặc không đủ:báo tên từng sách ("hết hàng" hoặc "chỉ còn X cuốn").
E8. Hai khách cùng mua 1 cuốn: khách giữ khóa trước thành công,khách sau rơi vào E7. Tồn kho không bao giờ âm(câu lệnh trừ có điều kiện).
E9. Giá hoặc tổng tiền thay đổi so với tổng đã hiển thị:hoàn tác, trả về tổng mới (HTTP 409),khách xác nhận lại.

##### Dữ liệu nhập và mã giảm giá:

E10. Thông tin nhận hàng không hợp lệ: HTTP 422, báo lỗi từng trường, giữ dữ liệu đã nhập, không mở transaction, nội dung nhập luôn hiển thị dưới dạng văn bản(không chèn HTML).
E11. Mã giảm giá không hợp lệ: báo rõ lý do; giữ nguyên tổng tiền, khách bỏ mã hoặc nhập mã khác. Nếu mã mất hiệu lực(bước 9):hoàn tác, hiển thị tổng mới.

#### Ghi chú:

- Vòng đời trạng thái đơn:
  - PENDING (Chờ xác nhận) chuyển được sang PROCESSING hoặc CANCELLED.
  - PROCESSING (Đang xử lý: đã xác nhận, chuẩn bị hàng) chuyển được sang
    SHIPPING hoặc CANCELLED.
  - SHIPPING (Đang giao) chuyển được sang COMPLETED hoặc CANCELLED (giao không
    thành công).
  - COMPLETED và CANCELLED là trạng thái kết thúc.
  - Quản trị thực hiện các chuyển trạng thái. Mỗi lần chuyển sang CANCELLED, tồn kho được cộng lại đúng một lần.

### UC-04: Xử lý trạng thái đơn hàng ( trang "Đơn hàng của tôi")

#### Tác nhân: Quản trị, Khách hàng

Mô tả: Đơn hàng đi qua các trạng thái PENDING (Chờ xác nhận), PROCESSING
(Đang xử lý), SHIPPING (Đang giao), COMPLETED (Hoàn thành), CANCELLED (Đã hủy).
Quản trị xác nhận và giao đơn. Khách được hủy đơn khi hàng chưa giao đi; khi hàng được giao đến, khách xác nhận đã nhận hàng hoặc không nhận hàng.

#### Tiền điều kiện:

- Đã đăng nhập; đơn hàng tồn tại và chưa ở trạng thái kết thúc.
- Khách chỉ thao tác trên đơn của chính mình; quản trị thao tác trên mọi đơn.

#### Hậu điều kiện:

- Thành công: trạng thái đơn đổi theo bảng chuyển trạng thái; lịch sử đổi trạng thái được ghi (người đổi, thời gian, ghi chú); nếu chuyển sang Cancelled thì tồn kho được cộng lại. Tất cả nằm trong 1 transaction.
- Thất bại: trạng thái đơn và tồn kho giữ nguyên.

#### Luồng chính (đơn đi hết vòng đời):

1. Khách đặt hàng, đơn hàng ở trạng thái Pending.
2. Quản trị mở danh sách đơn (lọc theo trạng thái) và xem chi tiết đơn Pending.
3. Quản trị bấm "Xác nhận đơn". Hệ thống khóa dòng đơn, kiểm tra đơn còn Pending, chuyển sang Processing.
4. Quản trị kiểm tra hàng và đóng gói.
5. Quản trị bấm "Giao cho vận chuyển" có hộp xác nhận. Hệ thống chuyển đơn sang Shipping.
6. Khi hàng được giao đến, khách thanh toán tiền mặt và bấm "Đã nhận hàng" (có hộp xác nhận). Hệ thống chuyển sang Completed.

#### Luồng phụ:

- A1. Khách hủy đơn (đơn Pending hoặc Processing): khách bấm "Hủy đơn" và xác nhận trong hộp thoại. Đơn chuyển sang Cancelled, tồn kho cộng lại. Khi đơn đã sang Shipping, khách không còn chức năng "Hủy đơn".
- A2. Khách không nhận hàng (đơn Shipping): khi hàng được giao đến mà khách không nhận hàng, khách bấm "Không nhận hàng", chọn 1 lý do(Không còn nhu cầu, Hàng không đúng đơn đặt,Khác) và xác nhận. Đơn chuyển sang Cancelled, tồn kho cộng lại.
- A3. Quản trị từ chối hoặc hủy đơn (PENDING hoặc PROCESSING): bắt buộc nhập lý do (hết hàng, không liên lạc được...). Đơn chuyển sang CANCELLED, tồn kho cộng lại;khách xem được lý do.
- A4. Quản trị chốt hoàn thành thay khách (đơn SHIPPING, khách chưa bấm): đơn chuyển sang COMPLETED.

#### Luồng ngoại lệ:

- E1. Chưa đăng nhập: 401. Người không phải quản trị gọi API quản trị: 403.
- E2. Khách thao tác đơn không phải của mình (đổi mã đơn): 404, không tiết lộ đơn có tồn tại hay không.
- E3. Khách thao tác cùng lúc quản trị chuyển trạng thái: bên giữ khóa trước thành công, bên sau nhận E3 với thông báo "Đơn hàng đã được cập nhật, vui lòng tải lại"; giao diện tải lại đơn.
- E4. Khách gọi "Hủy đơn" cho đơn đang SHIPPING (qua API): từ chối 422, thông báo"Đơn đang được giao, không thể hủy. Khi nhận hàng, bạn có thể chọn Không nhận hàng."
- E5. Sách trong đơn đã bị xóa mềm khi cộng lại tồn kho: vẫn cộng lại bình thường.
- E6. Lỗi CSDL: hoàn tác, không đổi trạng thái và tồn kho, báo lỗi chung, ghi log.

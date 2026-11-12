# Đặc tả 3 use case chính – Website bán sách

Đồ án Lập trình Web · Đề tài A: Thương mại điện tử (COD) · Khớp use case diagram bản mới nhất (TM-04a, TM-05a, TM-06, TM-07a, TM-12, TM-16a)

## Quy ước chung

-Mọi kiểm tra dữ liệu và kiểm tra quyền đều thực hiện ở phía server (NFR-01, NFR-05).
-Thông báo lỗi bằng tiếng Việt, nêu rõ trường sai. Lỗi hệ thống không lộ chi tiết kỹ thuật và được ghi log phía server.
-Số lần nhập sai tối đa 7 lần,thời gian chặn 3 phút,số lần thử lại sau khi deadlock 2 lần.

### UC-01:Đăng nhập(TM-04a)

#### Tác nhân:Khách vãng lai(đã có tài khoản),khách hàng,quản trị

Mô tả:Xác thực bằng email và mật khẩu để truy cập vào hệ thống,điều hướng theo vai trò(customer,admin)

#### Tiền điều kiện:

-Người dùng đã có tài khoản
-Chưa đăng nhập(chưa có phiên hoặc token hợp lệ)

#### Hậu điều kiện:

-Thành công:tạo phiên/token, đặt lại bộ đếm nhập sai, điều hướng theo vai trò (customer về trang chủ hoặc trang đang xem dở,admin về trang quản trị).
-Thất bại: không tạo phiên, báo lỗi, tăng bộ đếm nhập sai nếu sai thông tin.

#### Luồng chính:

1. Người dùng mở trang Đăng nhập.
2. Hệ thống hiển thị form (email, mật khẩu) kèm CSRF token.
3. Người dùng nhập thông tin và bấm “Đăng nhập”.
4. Hệ thống kiểm tra CSRF token và dữ liệu: email đúng định dạng, mật khẩu không rỗng.
5. Hệ thống tìm tài khoản theo email và kiểm tra tài khoản có đang bị tạm chặn do nhập sai nhiều lần không.
6. Hệ thống so khớp mật khẩu với bản băm (bcrypt).
7. Hệ thống kiểm tra tài khoản không bị khóa (chỉ kiểm tra sau khi mật khẩu đúng, để không lộ thông tin về tài khoản).
8. Hệ thống tạo phiên/token và đặt lại bộ đếm nhập sai.
9. Hệ thống điều hướng theo vai trò: customer về trang chủ, admin về trang quản trị.

#### Luồng phụ:

A1. Chưa có tài khoản: người dùng chọn “Đăng ký” và chuyển sang TM-04b (email duy nhất, mật khẩu từ 8 ký tự).
A2. Bị chuyển đến đăng nhập từ chức năng cần đăng nhập (bấm “Thêm vào giỏ” ở TM-05a, vào giỏ hàng, đặt hàng): sau khi đăng nhập thành công, quay lại đúng trang đang xem. Địa chỉ quay lại chỉ được thuộc cùng website (chống chuyển hướng độc hại).
A3. Đã đăng nhập mà mở lại trang Đăng nhập: chuyển thẳng đến trang theo vai trò.
A4. Đăng xuất (TM-04c): hủy phiên/token ở server, xóa token ở trình duyệt, chuyển về trang chủ với vai trò Khách vãng lai.

#### Luồng ngoại lệ:

E1. Bỏ trống hoặc sai định dạng (bước 4): báo lỗi tại trường sai, giữ lại email đã nhập, không giữ mật khẩu.
E2. Email không tồn tại hoặc sai mật khẩu (bước 5, 6): báo chung “Email hoặc mật khẩu không đúng”, tăng bộ đếm nhập sai, quay lại bước 2. Không cho biết email có tồn tại hay không.
E3. Tài khoản bị khóa (bước 7): báo “Tài khoản đã bị khóa”, không tạo phiên.
E4. Nhập sai nhiều lần liên tiếp (bước 5): tạm chặn đăng nhập một thời gian theo email và địa chỉ IP, báo “Vui lòng thử lại sau X phút”.
E5. CSRF token sai hoặc hết hạn (bước 4): tải lại form, báo “Phiên làm việc đã hết hạn, vui lòng thử lại”.
E6. Lỗi kết nối server hoặc CSDL: báo “Hệ thống đang gặp sự cố, vui lòng thử lại sau”, không tạo phiên, ghi log.
E7. Tài khoản bị quản trị khóa khi đang có phiên (TM-14): ở yêu cầu kế tiếp hệ thống hủy phiên, chuyển về trang đăng nhập và báo tài khoản đã bị khóa.

### UC-02:Quản lý sản phẩm(TM-12)

#### Tác nhân:Quản trị

#### Mô tả: Thêm, xem, sửa, xóa, ẩn/hiện sách; tìm kiếm và phân trang phía server.

#### Tiền điều kiện:

-Đã đăng nhập với vai trò admin
-Có ít nhất 1 danh mục

#### Hậu điều kiện

-Thành công: dữ liệu sản phẩm được cập nhật trong CSDL, thay đổi hiển thị ngay ở trang khách hàng.
-Thất bại: không có thay đổi nào trong CSDL.

#### Luồng chính (Thêm sản phẩm)

1.Quản trị mở trang "Quản lý sản phẩm"
2.Hệ thống kiểm tra quyền admin và hiển thị danh sách phân trang phía server(10 đến 20 sách mỗi trang,không hiển thị sách đã xóa mềm)
3.Quản trị bấm "Thêm sản phẩm"
4.Hệ thống hiển thị form:tên,danh mục (chọn từ danh sách hiện có),giá,tồn kho,mô tả,ảnh đại diện,ẩn/hiện,kèm CSRF Token
5.Quản trị nhập thông tin,chọn 1 ảnh(jpg/png tối đa 2MB) và bấm "Lưu"
6.Hệ thống kiểm tra phía server: CSRF token; tên không rỗng; giá lớn hơn 0; tồn kho là số nguyên không âm; danh mục tồn tại; ảnh đúng định dạng và dung lượng, kiểm tra theo nội dung tệp chứ không chỉ theo đuôi tên tệp.
7.Hệ thống lưu ảnh vào thư mục lưu trữ với tên ngẫu nhiên (không dùng tên gốc của tệp), rồi lưu thông tin sản phẩm vào CSDL.
8.Hệ thống thông báo thêm thành công và cập nhật lại danh sách.

#### Luồng phụ:

A1.Tìm kiếm:Nhập từ khóa,danh sách lọc theo tên,vẫn phân trang phía server. Từ khóa đi qua tham số của truy vấn(chống SQL Injection).
A2. Sửa sản phẩm: chọn “Sửa”, form điền sẵn dữ liệu, chỉnh sửa rồi “Lưu”, kiểm tra như bước 6. Không chọn ảnh mới thì giữ ảnh cũ; có ảnh mới thì thay và xóa ảnh cũ sau khi lưu thành công. Giá mới không ảnh hưởng order_items cũ.
A3. Ẩn/hiện: bật hoặc tắt trạng thái. Sản phẩm ẩn không hiển thị ở trang khách và không đặt hàng được, nhưng vẫn còn trong CSDL.
A4. Xóa sản phẩm chưa có đơn: hiển thị hộp xác nhận, đồng ý thì xóa sản phẩm, gỡ khỏi các giỏ hàng đang chứa nó và xóa tệp ảnh trong cùng một thao tác.
A5. Xóa sản phẩm đã có trong đơn: xóa mềm (is_deleted = 1), không xóa cứng. Các đơn cũ vẫn xem được sản phẩm đã mua.
A6. Xem chi tiết một sản phẩm từ danh sách.

#### Luồng ngoại lệ:

E1. Dữ liệu không hợp lệ (bước 6): báo lỗi ngay tại trường sai, giữ lại dữ liệu đã nhập (riêng tệp ảnh phải chọn lại).
E2. Ảnh sai định dạng, lớn hơn 2 MB hoặc nội dung không phải ảnh thật: báo lỗi, không lưu sản phẩm.
E3. Người không phải admin gọi URL hoặc API quản trị: từ chối 403 (kiểm tra quyền ở server). Chưa đăng nhập: 401 và chuyển đến trang đăng nhập.
E4. Phiên hết hạn khi đang nhập form: chuyển đến đăng nhập, báo dữ liệu chưa được lưu.
E5. Danh mục bị xóa hoặc ẩn trong lúc đang nhập: báo “Danh mục không tồn tại”, giữ dữ liệu, cho chọn lại danh mục.
E6. Hai quản trị cùng sửa một sản phẩm: dùng phiên bản (version hoặc updated_at) để phát hiện. Người lưu sau nhận thông báo “Sản phẩm đã được cập nhật bởi người khác, vui lòng tải lại”, tránh ghi đè mất dữ liệu.
E7. Sửa hoặc xóa sản phẩm không còn tồn tại (đã bị admin khác xóa): báo “Sản phẩm không tồn tại”, làm mới danh sách.
E8. Lỗi lưu ảnh (đầy ổ đĩa, không có quyền ghi): báo lỗi, không tạo sản phẩm.
E9. Lỗi CSDL sau khi đã lưu ảnh: hoàn tác, xóa ảnh vừa lưu, báo lỗi, ghi log.
E10. CSRF token sai hoặc hết hạn: từ chối, tải lại form, giữ dữ liệu nhập.

### UC-03:Đặt hàng COD(TM-06)

#### Tác nhân:Khách hàng

#### Mô tả:Đặt các sách trong giỏ hàng,nhập thông tin nhận hàng,thanh toán khi nhận hàng

#### Tiền điều kiện:

-Đã đăng nhập, tài khoản không bị khóa
-Giỏ hàng có ít nhất 1 sản phẩm

#### Hậu điều kiện:

-Thành công:tạo đơn trạng thái "Chờ xác nhận" (lưu họ tên người nhận,số điện thoại,địa chỉ giao hàng,phương thức thanh toán COD,tổng tiền tính ở server);order_items lưu số lượng,đơn giá lúc mua và thành tiền;tồn kho các sách được trừ;giỏ hàng được xóa;tất cả nằm trong một transaction.
-Thất bại:không tạo đơn,tồn kho và giỏ hàng giữ nguyên.

#### Luồng chính:

1.Khách hàng mở giỏ hàng và bấm "Đặt hàng"
2.Hệ thống kiểm tra phiên đăng nhập và tài khoản không bị khóa
3.Hệ thống đọc giỏ hàng từ CSDL (đọc thường,không khóa),kiểm tra sơ bộ từng sản phẩm(còn hiển thị,còn hàng) chỉ để báo sớm,tính tổng tiền tạm theo giá hiện tại,tạo mã chống gửi trùng và mã nhận diện giỏ (cartHash),rồi hiển thị trang đặt hàng kèm form
4.Khách hàng nhập họ tên,số điện thoại,địa chỉ nhận hàng
5.Khách hàng chọn phương thức thanh toán COD
6.Khách hàng bấm "Xác nhận đặt hàng"(Thanh toán khi nhận hàng). Giao diện vô hiệu hóa nút sau khi bấm và gửi kèm CSRF token,mã chống gửi trùng,cartHash (không gửi giá hay tổng tiền)
7.Hệ thống kiểm tra phía server (trước khi mở transaction):CSRF token,đăng nhập và tài khoản không bị khóa,họ tên,số điện thoại,địa chỉ,phương thức thanh toán hợp lệ;rồi kiểm tra mã chống gửi trùng lần 1 (đã có đơn với mã này thì trả về đơn đó)
8.Hệ thống mở transaction,khóa các dòng giỏ hàng của chính khách,kiểm tra lại mã chống gửi trùng lần 2 (sau khi giữ khóa giỏ),rồi khóa các dòng sản phẩm theo thứ tự id tăng dần
9.Hệ thống kiểm tra lại trong transaction và gom tất cả lỗi để báo một lần:giỏ không trống;giỏ và giá khớp với tóm tắt khách đã xem (so bằng cartHash);từng sản phẩm còn hiển thị,chưa xóa mềm,tồn kho đủ số lượng
10.Hệ thống tạo đơn (trạng thái"Chờ xác nhận",thông tin nhận hàng,tổng tiền tính ở server,mã chống gửi trùng) và order_items (lưu giá lúc mua),trừ tồn kho (chỉ khi còn đủ hàng,đồng thời tăng version của sản phẩm),xóa các sản phẩm trong giỏ. Nếu mọi thao tác thành công thì commit transaction
11.Hệ thống hiển thị "Đặt hàng thành công" kèm mã đơn hàng và liên kết đến "Đơn hàng của tôi"

#### Luồng phụ:

A1. Đổi số lượng hoặc xóa sách ở trang đặt hàng: quay về giỏ hàng , cập nhật lại tổng tiền.
A2. Áp dụng mã giảm giá: trước bước 6 khách nhập mã. Hệ thống kiểm tra mã (tồn tại, còn hạn), tính số tiền giảm và hiển thị tổng mới. Mã được kiểm tra lại trong transaction ở bước 9, mã và số tiền giảm được lưu vào đơn.
A3. Khách xác nhận lại giá hoặc giỏ mới : hệ thống hiển thị lại trang đặt hàng với tổng tiền mới, khi khách xác nhận thì quay lại bước 6.
A4. Quay lại sau khi đăng nhập lại: giỏ hàng vẫn còn, khách quay lại trang đặt hàng và nhập lại thông tin nhận hàng nếu chưa được giữ.

#### Luồng ngoại lệ:

##### Xác thực và phiên:

E1. Chưa đăng nhập (bước 1, 2: vào thẳng đường dẫn đặt hàng, dùng bookmark hoặc không có token): từ chối 401, chuyển đến đăng nhập (UC-01, A2), sau đó quay lại giỏ hàng. Không tạo đơn.
E2. Phiên đăng nhập hết hạn khi đang nhập hoặc khi bấm xác nhận (bước 7): từ chối, không tạo đơn, chuyển đến đăng nhập, sau đó quay lại trang đặt hàng; giỏ hàng giữ nguyên.
E3. Tài khoản bị khóa (bước 2, hoặc bị quản trị khóa giữa chừng và phát hiện ở bước 7): thông báo tài khoản bị khóa, hủy phiên, từ chối đặt hàng.
E4. CSRF token sai hoặc hết hạn: từ chối, tải lại trang đặt hàng, giỏ hàng giữ nguyên.

##### Giỏ hàng:

E5. Giỏ hàng trống: chặn và báo “Giỏ hàng trống” ở bước 2, 3. Nếu giỏ trống được phát hiện ở bước 9 (giỏ đã bị làm trống hoặc đã được đặt thành đơn khác từ tab hay thiết bị khác): hoàn tác transaction, báo “Giỏ hàng trống hoặc đã thay đổi”.
E6. Giỏ hàng thay đổi giữa lúc hiển thị và lúc xác nhận (thêm, sửa, xóa ở nơi khác): không đặt theo giỏ cũ, hoàn tác, tải lại trang đặt hàng với giỏ mới để khách xem lại và xác nhận (A3).
E7. Số lượng không hợp lệ (nhỏ hơn hoặc bằng 0, không phải số nguyên, quá lớn) hoặc đổi id giỏ, đơn, sản phẩm trên URL hoặc API: từ chối 400, 403 hoặc 404, không tạo đơn.

##### Hàng hóa:

E8. Hết hàng (tồn kho bằng 0, bước 9): hoàn tác, báo tất cả sách hết hàng trong một lần, quay lại giỏ hàng để khách xóa các sách đó. Không tự động đặt một phần đơn.
E9. Tồn kho nhỏ hơn số lượng đặt (bước 9): hoàn tác, báo từng sách “chỉ còn X cuốn”, quay lại giỏ hàng cho chỉnh số lượng.
E10. Hai khách cùng mua cuốn cuối cùng: khách giành được khóa dòng trước thì thành công; khách sau đọc tồn kho mới và rơi vào E8 hoặc E9. Tồn kho không bao giờ âm (có thêm ràng buộc ở CSDL).
E11. Sản phẩm bị ẩn hoặc xóa mềm sau khi vào giỏ: hoàn tác, báo tên sách, gỡ sách khỏi giỏ, hiển thị lại trang đặt hàng với tổng tiền mới để khách xác nhận (A3). Không tự tiếp tục tạo đơn với các sách còn lại.
E12. Giá sản phẩm thay đổi: hoàn tác, hiển thị tổng tiền mới, khách xác nhận lại (A3). Chỉ sau khi xác nhận mới tạo đơn.

##### Dữ liệu nhập và mã giảm giá:

E13. Thông tin nhận hàng không hợp lệ (bước 7): báo lỗi từng trường bằng tiếng Việt (họ tên và địa chỉ không rỗng, số điện thoại đúng định dạng 10 chữ số bắt đầu bằng 0), giữ dữ liệu đã nhập, không mở transaction. Nội dung nhập được làm sạch khi hiển thị (chống XSS).
E14. Mã giảm giá không hợp lệ (A2, mức C): báo rõ lý do (không tồn tại, hết hạn), giữ nguyên tổng tiền, khách bỏ mã hoặc nhập mã khác. Nếu mã mất hiệu lực lúc xác nhận (bước 9): hoàn tác và hiển thị tổng mới để khách xác nhận. Số tiền giảm không vượt quá tổng tiền.

##### Gửi trùng và lỗi hệ thống:

E15. Bấm “Xác nhận” hai lần, gửi lại do mạng chậm hoặc tải lại trang sau khi thành công: giao diện vô hiệu hóa nút; server chặn bằng mã chống gửi trùng duy nhất, yêu cầu thứ hai không tạo đơn mới mà trả về đơn đã tạo.
E16. Mất kết nối trước khi nhận phản hồi (đơn có thể đã được tạo): khi khách tải lại, hệ thống hướng dẫn kiểm tra “Đơn hàng của tôi” trước khi đặt lại; mã chống gửi trùng ngăn việc tạo đơn thứ hai.
E17. Lỗi CSDL hoặc mất kết nối trong transaction: hoàn tác, không tạo đơn, không đổi tồn kho, giữ nguyên giỏ hàng, hiển thị thông báo để khách thử lại, ghi log.
E18. Lock timeout hoặc deadlock khi khóa dòng (bước 8): hoàn tác và tự thử lại tối đa 2 lần; nếu vẫn lỗi thì báo “Hệ thống đang bận, vui lòng thử lại”. Khóa theo thứ tự id tăng dần để giảm nguy cơ deadlock.
E19. Khách xem hoặc đặt theo đơn, giỏ của người khác bằng cách đổi ID: chặn 403 hoặc 404 (TM-NFR4).

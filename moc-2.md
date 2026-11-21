# Chuẩn bị Mốc 2 - Website bán sách (Thương mại điện tử)

- Người lập:TV1(Trưởng nhóm)
- Ngày 20/11/2026 (Ngày 9 - Thứ 6, tuần 2)
- Nhánh tích hợp của nhóm:feature
- Mốc giờ 21:00 hạn merge Mốc 2 21:00-21:30 demo thử nội bộ 22:00 TV1 kiểm tra cuối ngày

---

## 1. Bảng % hoàn thành 12 chức năng bắt buộc

| Mã    | Chức năng                          | Phụ trách | Trạng thái    | Trên Trello                         | Việc còn lại                                                             |
| ----- | ---------------------------------- | --------- | ------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| TM-01 | Trang chủ                          | TV3       | Đang làm      | Doing, checklist 4/10               | Hoàn tất 6 mục còn lại, mở PR                                            |
| TM-02 | Tìm kiếm, lọc, sắp xếp, phân trang | TV3       | Chưa làm      | Sprint to do, 0/4                   | Làm bản tối thiểu (từ khóa + danh mục + phân trang 12 sách/trang), mở PR |
| TM-03 | Chi tiết sản phẩm                  | TV3       | Chưa làm      | Product Backlog, 0/4, quá hạn 13/11 | Làm ngay: ảnh, giá `120.000 ₫`, mô tả, tồn kho, nút thêm giỏ             |
| TM-04 | Đăng ký, đăng nhập                 | TV2       | Đã merge (\*) | Code/Doc Review, 5/5                | Kéo thẻ sang Done sau khi xác nhận PR                                    |
| TM-05 | Giỏ hàng                           | TV5       | Đã merge (\*) | Code/Doc Review, 0/1                | Tick checklist, kéo sang Done                                            |
| TM-06 | Đặt hàng (COD)                     | TV2       | Đang làm      | Doing, 0/1, quá hạn 20/11           | Form đặt hàng, trang "Đặt hàng thành công", test đồng thời               |
| TM-07 | Đơn hàng của tôi                   | TV5       | Chưa làm      | Sprint to do, 0/1, quá hạn 20/11    | Danh sách, chi tiết, hủy đơn, chặn xem đơn người khác                    |
| TM-08 | Hồ sơ cá nhân + đổi mật khẩu       | TV1       | Đã merge      | Code/Doc Review, 1/1                | Kéo thẻ sang Done, dán link PR #18                                       |
| TM-11 | Quản lý danh mục                   | TV4       | Đã merge (\*) | Code/Doc Review, 1/1                | Kéo thẻ sang Done                                                        |
| TM-12 | Quản lý sản phẩm                   | TV4       | Đang làm      | Doing, 0/1, quá hạn 20/11           | Tìm kiếm + phân trang admin, validate giá > 0 và tồn kho ≥ 0, merge      |
| TM-13 | Quản lý đơn hàng (admin)           | TV5       | Chưa làm      | Product Backlog, 0/1                | Lọc theo trạng thái, chuyển trạng thái một chiều                         |
| TM-14 | Quản lý người dùng (khóa/mở khóa)  | TV1       | Đã merge (\*) | Code/Doc Review, 5/5                | Kiểm tra PR đã **merged** (thẻ đang ghi "1 closed"), rồi kéo sang Done   |

### Tổng hợp

| Trạng thái             | Số chức năng | Mã                                |
| ---------------------- | ------------ | --------------------------------- |
| Đã merge               | 5            | TM-04, TM-05, TM-08, TM-11, TM-14 |
| Đang làm / đang review | 3            | TM-01, TM-06, TM-12               |
| Chưa làm               | 4            | TM-02, TM-03, TM-07, TM-13        |
| **Tổng**               | **12**       |                                   |

- Tỷ lệ đã merge hiện tại: **5/12 ≈ 42%**. Công thức: `đã merge / 12`.
- Mục tiêu hôm nay: **≥ 9/12 = 75%** trước 21:00 (cần thêm tối thiểu **4** chức năng merge).
- Nếu các dòng (\*) chưa merge thật thì con số thật là thấp hơn, tối thiểu 1/12 (chỉ TM-08). Cập nhật lại bảng trước khi báo cáo.

### Đường găng để đạt 9/12 (ưu tiên merge theo thứ tự)

1. **TM-06** Đặt hàng, đang làm, là chức năng cốt lõi của luồng mua.
2. **TM-03** Chi tiết sách, vì luồng _tìm sách → chi tiết → giỏ → đặt hàng_ cần nó.
3. **TM-02** Tìm kiếm, cùng lý do trên.
4. **TM-12** Quản lý sản phẩm, đã có CRUD, còn tìm kiếm + phân trang admin.
   Làm xong 4 mục trên là đạt 9/12. Nếu còn thời gian thì làm tiếp TM-01, TM-07, TM-13.

---

## 2. Thẻ có nguy cơ trễ (gắn nhãn đỏ trên Trello) và phương án

| Thẻ   | Rủi ro                                    | Phương án                                                                                                                           |
| ----- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| TM-03 | Quá hạn từ 13/11, chưa làm mục nào        | TV3 làm trước tiên, bản tối thiểu. Bỏ mục "Sách cùng danh mục (4 cuốn)" nếu thiếu giờ, làm sau Mốc 2                                |
| TM-02 | 0/4, TV3 đang gánh TM-01, 02, 03 cùng lúc | Chốt phạm vi tối thiểu: từ khóa + lọc danh mục + phân trang phía server. Khoảng giá và sắp xếp làm sau                              |
| TM-07 | 0/1, TV5 đang gánh TM-05, 07, 13          | TM-08 của TV1 đã xong, TV1 hỗ trợ cặp đôi (pair) phần giao diện danh sách đơn nếu TV5 cần. Thống nhất ở buổi họp                    |
| TM-13 | Chưa bắt đầu, phụ thuộc TM-06 và TM-07    | Làm bản tối thiểu: danh sách đơn + lọc trạng thái + chuyển trạng thái một chiều. Nếu không kịp: ghi lý do vào thẻ, demo phần có sẵn |
| TM-06 | Quá hạn 20/11                             | TV2 ưu tiên số 1. Test đồng thời bằng 2 trình duyệt/2 phiên, sửa bằng điều kiện `stock >= qty`                                      |
| TM-12 | Quá hạn 20/11                             | TV4 làm tìm kiếm + phân trang admin trước, rà validate toàn bộ form admin sau                                                       |

---

## 3. Kịch bản demo thử (21:00–21:30)

Mỗi người thao tác chức năng của mình. TV1 bấm giờ, ghi lỗi gặp vào thẻ Trello tương ứng.

| #   | Bước                      | Người thao tác | Mã TM        | Thao tác chính                                                                                              | Thời gian |
| --- | ------------------------- | -------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | --------- |
| 1   | Mở đầu                    | TV1            | –            | Giới thiệu kịch bản, tài khoản demo, bắt đầu bấm giờ                                                        | 1'        |
| 2   | Đăng ký, đăng nhập        | TV2            | TM-04        | Đăng ký tài khoản mới, đăng nhập, thử sai mật khẩu                                                          | 2'        |
| 3   | Trang chủ, tìm kiếm       | TV3            | TM-01, TM-02 | Mở trang chủ, tìm theo từ khóa, lọc danh mục, chuyển trang                                                  | 3'        |
| 4   | Chi tiết sách             | TV3            | TM-03        | Xem giá, tồn kho, mô tả, bấm thêm vào giỏ                                                                   | 2'        |
| 5   | Giỏ hàng                  | TV5            | TM-05        | Sửa số lượng (không vượt tồn), xóa dòng, kiểm tra tổng tiền                                                 | 2'        |
| 6   | Đặt hàng COD              | TV2            | TM-06        | Điền tên, SĐT, địa chỉ, đặt hàng, trang thành công; thử đặt vượt tồn kho                                    | 3'        |
| 7   | Đơn hàng của tôi          | TV5            | TM-07        | Xem danh sách, chi tiết, hủy đơn "Chờ xác nhận"; đổi ID trên URL sang đơn người khác (phải báo 403/404)     | 2'        |
| 8   | Hồ sơ + đổi mật khẩu      | TV1            | TM-08        | Sửa họ tên, SĐT, địa chỉ; đổi mật khẩu sai mật khẩu cũ rồi đúng; đăng nhập lại bằng mật khẩu mới            | 2'        |
| 9   | Admin: danh mục, sản phẩm | TV4            | TM-11, TM-12 | Thêm/sửa/xóa, tải ảnh JPG/PNG ≤ 2 MB, ẩn/hiện, tìm kiếm + phân trang, nhập dữ liệu sai để xem thông báo lỗi | 3'        |
| 10  | Admin: quản lý đơn        | TV5            | TM-13        | Lọc theo trạng thái, chuyển Chờ xác nhận → Đang giao → Hoàn thành, thử đi ngược (phải bị chặn)              | 2'        |
| 11  | Admin: khóa tài khoản     | TV1            | TM-14        | Khóa một người dùng, người đó đăng nhập thử (phải bị chặn), mở khóa                                         | 2'        |
| 12  | Tổng kết                  | TV1            | –            | Đọc danh sách lỗi, giao việc sửa, dừng bấm giờ                                                              | 1'        |

Tổng dự kiến: **25 phút**, còn 5 phút dự phòng. Chức năng chưa merge thì bỏ qua bước đó và ghi "chưa có" vào biên bản.

Điều kiện chuẩn bị: người thao tác bước sau cần dữ liệu từ bước trước (đơn ở bước 6 phục vụ bước 7 và 10). Thứ tự phải giữ đúng.

---

## 4. Chuẩn bị môi trường và dữ liệu demo (làm trước 20:45)

- [ ] Mọi người `git pull` nhánh tích hợp, chạy `composer install`, `npm install`.
- [ ] Chạy `php artisan migrate`. **Lưu ý:** cột `status` của bảng `products` và hai cột `phone`, `address` của bảng `users` phải có trên máy mọi người. Ai thêm cột bằng tay thì cần có migration tương ứng (dùng điều kiện `Schema::hasColumn`), nếu không máy khác sẽ lỗi 500.
- [ ] Chạy `php artisan storage:link` hoặc kiểm tra thư mục ảnh sản phẩm.
- [ ] Có tối thiểu 3 tài khoản: 1 admin, 1 khách hàng thường, 1 khách hàng dùng để thử khóa/mở khóa.
- [ ] Có dữ liệu mẫu: sách có ảnh đẹp, nhiều danh mục, một cuốn còn tồn kho 1 (để thử chống bán vượt), đơn ở nhiều trạng thái (TV4 chuẩn bị).
- [ ] Mở trang bằng 360 px (DevTools) để chắc chắn giao diện điện thoại ổn.
- [ ] Không merge thêm sau 21:00, trừ sửa lỗi demo.

---

## 5. Backlog Sprint 4 (thẻ cần có sẵn trong cột Product Backlog)

| Thẻ                     | Nội dung                                                                           | Nhãn         |
| ----------------------- | ---------------------------------------------------------------------------------- | ------------ |
| [TEST] Unit test        | Unit test cho service quan trọng (đặt hàng, hủy đơn, đổi mật khẩu, khóa tài khoản) | S4, Test     |
| [TEST] Test case S4     | Bổ sung test case theo chức năng đã làm ở S3, ghi kết quả chạy                     | S4, Test     |
| TM-15 Thống kê          | Thống kê cho admin (doanh thu, số đơn theo trạng thái)                             | S4           |
| TM-09 Đánh giá sản phẩm | Đã có sẵn thẻ, gắn nhãn S4                                                         | S4, Database |

Thẻ TM-16 (mã giảm giá) đang ở Backlog, giữ nguyên, chỉ làm nếu dư thời gian.

---

## 6. Kiểm tra cuối ngày (TV1, trước 22:00)

- [ ] ≥ 9/12 chức năng bắt buộc đã merge (số liệu chốt ở mục 1)
- [ ] Demo thử chạy hết kịch bản không lỗi (nếu lỗi: ghi lỗi vào thẻ tương ứng, giao người sửa)
- [ ] AI log mỗi người ≥ 4 mục
- [ ] Không có PR treo quá 24 giờ
- [ ] Mọi thẻ S3 đúng cột Trello trước 21:00 (TM-03 và TM-13 đang mang nhãn S3 nhưng nằm ở Product Backlog, cần kéo sang Sprint to do)
- [ ] Mục nào chưa xong: ghi lý do vào thẻ Trello tương ứng
- [ ] Tag `v0.5` gắn sau Mốc 2 (thứ 6), không gắn hôm nay

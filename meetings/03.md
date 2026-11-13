# Biên bản họp số 03 – Mốc 1 (Bảo vệ thiết kế) và kế hoạch Sprint S2

> Đặt tại `docs/meetings/03.md`; dán link vào thẻ "Biên bản họp số 03" ở cột **Tài liệu & Biên bản** trên Trello. Các chỗ trong `[...]` là thông tin phải điền hoặc xác nhận lại trước khi commit.

| Mục          | Nội dung                                                  |
| ------------ | --------------------------------------------------------- |
| Nhóm         | [03] – Đề tài: Thương mại điện tử (Website bán sách, COD) |
| Thời gian    | Thứ 6, 13/11/2026, 8:00 – 11:30 (buổi học 2 – Mốc 1)      |
| Địa điểm     | [Phòng học:F7.2]                                          |
| Chủ trì      | TV1 – Trần Quang Vinh (LE)                                |
| Thư ký       | [Thạch Minh Trí]                                          |
| Giảng viên   | Lữ Cao Tiến                                               |
| Có mặt       | TV1 ☐ TV2 ☐ TV3 ☐ TV4 ☐ TV5 ☐                             |
| Vắng (lý do) | [...]                                                     |

## 1. Nội dung trình bày Mốc 1

Nhóm trình bày khoảng 10 phút theo phân công:

| Phần trình bày                              | Người trình bày | Tài liệu / minh chứng                         |
| ------------------------------------------- | --------------- | --------------------------------------------- |
| Tổng quan đề tài, công nghệ, board Trello   | TV1             | `docs/de-cuong.md`, `docs/moc-1.md`, Trello   |
| Kiến trúc Controller – Service – Repository | TV2             | `docs/architecture.png`, mã nguồn             |
| Wireframe và layout chung                   | TV3             | `docs/wireframes/`, `[FE] Layout chung`       |
| ERD, migration, dữ liệu mẫu                 | TV4             | `docs/database/erdfinal.png`, `mo-ta-bang.md` |
| Quy trình Git (nhánh, PR, review) và AI log | TV5             | GitHub, `ai-logs/`                            |

Nội dung chính đã trình bày:

1. **Đề tài và công nghệ:** website bán sách, thanh toán khi nhận hàng (COD). Frontend React, backend Laravel, cơ sở dữ liệu MySQL, giao tiếp qua RESTful API (JSON).
2. **Xác thực:** Laravel Sanctum chế độ SPA (cookie + session + CSRF), phân quyền admin/khách hàng ở middleware.
3. **Thiết kế:** use case diagram và đặc tả 3 use case (UC-01 Đăng nhập, UC-02 Quản lý sản phẩm, UC-03 Đặt hàng COD); sequence diagram luồng Đặt hàng có transaction; ERD và migration/seed.
4. **Quy ước làm việc:** mỗi chức năng một nhánh `feature/TM-xx-...`, không commit thẳng `develop`/`main`, PR cần ít nhất 1 người review, mỗi lần dùng AI phải ghi `ai-logs/`.

## 2. Kết quả S1 (tính đến cuối buổi, đối chiếu board Trello)

| Việc                                   | Thẻ Trello                                      | Trạng thái                                          |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| Đề cương, biên bản 01, 02, quy tắc Git | Cột Tài liệu & Biên bản                         | Xong                                                |
| Use case diagram + đặc tả              | [DOC] Use case                                  | Xong                                                |
| Khung dự án 3 lớp                      | [DB] Khung dự án                                | Xong                                                |
| Layout chung                           | [FE] Layout chung                               | Xong                                                |
| ERD                                    | [DB] ERD                                        | Xong                                                |
| Migration + seed                       | [DB] Migration & seed                           | Xong                                                |
| Test case, kiểm tra môi trường         | [TEST] Test case, Kiểm tra môi trường           | Xong                                                |
| Wireframe                              | [DOC] Wireframe                                 | Đang ở Code / Doc Review                            |
| Chuẩn bị Mốc 1, kiểm tra repo Mốc 1    | [DOC] Chuẩn bị Mốc 1, [DOC] Kiểm tra repo Mốc 1 | Đang ở Code / Doc Review                            |
| Đăng ký, đăng nhập, phân quyền         | TM-04                                           | Đang ở Code / Doc Review (checklist 5/5), chờ merge |
| Trang chủ                              | TM-01                                           | Đang ở Code / Doc Review (checklist 4/4), chờ merge |
| Tag `v0.1` trên `main`                 | [DOC] Tag v0.1                                  | [☐ đã tạo / ☐ chưa]                                 |

Retrospective Sprint 1 (thẻ trên Trello, checklist 14/17). Hai điểm nhóm tự nhận là chưa tốt:

- Chưa sử dụng cột Review thường xuyên.
- Chưa thống nhất cách ghi comment tiến độ trên thẻ.

## 3. Ý kiến của giảng viên khi duyệt Mốc 1

Mỗi góp ý tạo 1 thẻ Trello, nhãn S2, có người phụ trách.

| STT | Góp ý của giảng viên                  | Thẻ Trello                        | Người phụ trách | Hạn          |
| --- | ------------------------------------- | --------------------------------- | --------------- | ------------ |
| 1   | [Thêm mô hình kiến trúc vào markdown] | [[FIX]:Bổ sung mô hình kiến trúc] | [TV1]           | Thứ 2, 16/11 |
| 2   | [...]                                 | [tên thẻ]                         | [TVx]           | Thứ 2, 16/11 |
| 3   | [...]                                 | [tên thẻ]                         | [TVx]           | Thứ 2, 16/11 |

Kết quả chấm Mốc 1 (thang 10): [10] / 10.

## 4. Kế hoạch Sprint S2 (đến Thứ 2, 16/11/2026 – buổi 3)

Mục tiêu S2: hoàn tất TM-04 và TM-01, bắt đầu và đẩy nhanh quản lý danh mục, quản lý người dùng, giỏ hàng, và xử lý toàn bộ góp ý Mốc 1.

Theo phân công chức năng bắt buộc: TV1 – TM-14, TM-08; TV2 – TM-04, TM-06; TV3 – TM-01, TM-02, TM-03; TV4 – TM-11, TM-12; TV5 – TM-05, TM-07, TM-13.

| Thẻ Trello                        | Người phụ trách | Việc cần làm trong S2                                    | Nhánh Git                  | Hạn          |
| --------------------------------- | --------------- | -------------------------------------------------------- | -------------------------- | ------------ |
| [TM-04] Đăng ký, đăng nhập        | TV2             | Hoàn thiện phân quyền, kiểm tra tài khoản bị khóa, merge | `fix/TM-04-phan-quyen`     | Thứ 2, 16/11 |
| [TM-01] Trang chủ                 | TV3             | Hoàn thiện theo góp ý, merge                             | `feature/TM-01-trang-chu`  | Thứ 2, 16/11 |
| [TM-14] Quản lý người dùng        | TV1             | Danh sách, khóa/mở khóa tài khoản                        | `feature/TM-14-nguoi-dung` | Thứ 2, 16/11 |
| [TM-11] Quản lý danh mục          | TV4             | CRUD danh mục ở backend và giao diện admin               | `feature/TM-11-danh-muc`   | Thứ 2, 16/11 |
| [TM-05] Giỏ hàng                  | TV5             | Model, repository, service giỏ hàng                      | `feature/TM-05-gio-hang`   | Thứ 2, 16/11 |
| [TM-02] Tìm kiếm, lọc, phân trang | TV3             | Khung trang danh sách dùng component thẻ sản phẩm        | `feature/TM-02-danh-sach`  | [dự kiến S3] |
| [DB] Sửa theo góp ý               | TV4             | Sửa migration/seed, cập nhật ERD final                   | `fix/db-gop-y`             | Thứ 2, 16/11 |
| [FIX] Bổ sung mô hình kiến trúc   | TV2             | Bổ sung và cập nhật sơ đồ kiến trúc theo góp ý           | `docs/architecture`        | Thứ 2, 16/11 |
| Thẻ góp ý của giảng viên (mục 3)  | Theo mục 3      | Xử lý từng góp ý                                         | `fix/...`, `docs/...`      | Thứ 2, 16/11 |

Ghi chú: các thẻ TM-03, TM-06, TM-08 đang nằm trong cột Sprint to do của board. Nhóm [chốt: giữ trong S2 / chuyển sang S3]. Theo kế hoạch của môn học, S3 gồm TM-12, TM-02, TM-06, TM-08, TM-07.

Quy tắc áp dụng trong S2 (rút từ retrospective S1):

1. Kéo thẻ sang **Doing** khi bắt đầu, sang **Code / Doc Review** khi mở PR, sang **Done** khi merge.
2. Mỗi ngày ghi 1 dòng tiến độ vào thẻ theo mẫu thống nhất: `[ngày] – đã làm – đang vướng – dự kiến`, trước 21:30.
3. PR không để chờ review quá 24 giờ; reviewer ghi nhận xét thực chất, không chỉ "OK".
4. Commit có mã do AI sinh phải có trailer `AI-assisted` và khớp mục trong `ai-logs/`.

## 5. Vướng mắc và hướng xử lý

| Vướng mắc                                                  | Hướng xử lý                                                 | Người theo dõi         |
| ---------------------------------------------------------- | ----------------------------------------------------------- | ---------------------- |
| Thẻ TM-04 và TM-01 còn nằm ở Code / Doc Review, chưa merge | Reviewer duyệt trong ngày; sửa theo nhận xét rồi merge      | TV5 (review), TV2, TV3 |
| Thẻ TM-03 đã quá hạn 13/11                                 | Xác định lại phạm vi và ghi lý do trễ trên thẻ, gán hạn mới | TV3                    |
| Cột Review ít được dùng, comment tiến độ chưa thống nhất   | Áp dụng quy tắc mục 4, TV1 kiểm tra board mỗi ngày          | TV1                    |
| Sơ đồ kiến trúc cần bổ sung                                | Hoàn thiện `docs/architecture.png`, đối chiếu với mã thật   | TV2                    |
| [...]                                                      | [...]                                                       | [...]                  |

## 6. Lịch họp tiếp theo

[Thứ 7/Chủ nhật hoặc Thứ 2, dd/mm, giờ] – kiểm tra tiến độ S2 và chuẩn bị stand-up đầu buổi 3 (Thứ 2, 16/11/2026).

Thư ký: [Họ tên] Xác nhận: TV1 ☐ TV2 ☐ TV3 ☐ TV4 ☐ TV5 ☐

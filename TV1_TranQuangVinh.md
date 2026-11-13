# AI log – TV1 – Nguyễn Văn A

> Mỗi thành viên một tệp trong `ai-logs/`. Ghi một mục ngay sau mỗi lần dùng AI có ảnh hưởng đến sản phẩm, commit cùng thay đổi liên quan. Cả đồ án tối thiểu 6 mục có nội dung thực chất. Mã mục tăng dần: AI-01, AI-02, ...

| Mục             | Thông tin                      |
| --------------- | ------------------------------ |
| Họ tên, MSSV    | Trần Quang Vinh – [0306241421] |
| Nhóm, đề tài    | Nhóm [03] – [Website bán sách] |
| Vai trò         | TV1 – LE (Leader)              |
| Công cụ AI dùng | [Copilot]                      |

## Bảng tổng hợp

| Mã    | Ngày    | Giai đoạn         | Nội dung                              | Commit / PR   |
| ----- | ------- | ----------------- | ------------------------------------- | ------------- |
| AI-01 | [09/11] | Phân tích yêu cầu | Hướng dẫn xây dựng khung đề cương     | [PR 5]        |
| AI-02 | [10/11] | Lập kế hoạch      | Hướng dẫn form viết đặc tả            | [PR 1]        |
| AI-03 | [11/11] | Lập kế hoạch      | Hướng dẫn vẽ sequence diagram         | [PR 1]        |
| AI-04 | [11/11] | Lập kế hoạch      | Thiết kế lập kế hoạch vấn đáp 10 phút | [Không có PR] |
| AI-05 | [12/11] | Lập kế hoạch      | Nhờ AI nhận xét board Trello          | [Không có PR] |

## AI-01 – <Markdown-decuong>

- Ngày / Người dùng: [2026-11-9] / Trần Quang Vinh
- Công cụ: [Copilot]
- Giai đoạn: Lập kế hoạch
- Task / Commit / PR: [DOC] Đề cương / [749245b] / [PR5]
- Mục đích: [Hướng dẫn xây dựng khung đề cương đặc tả]
- Prompt chính (nguyên văn hoặc link chia sẻ hội thoại): [Nhờ AI hướng dẫn khung markdown decuong.md]
- Kết quả AI trả về (tóm tắt): [1. Thông tin chung

2. Mô tả đề tài
3. Công nghệ sử dụng
4. Thành viên và phân công
5. Chức năng bắt buộc
6. Phạm vi hệ thống
7. Thiết kế cơ sở dữ liệu dự kiến
8. Kiến trúc hệ thống]

- Đánh giá: [Nội dung AI đưa ra rất đầy đủ nhưng vẫn còn xót 1 vài ý]
- Đã chỉnh sửa gì: [Thêm những phần AI đưa ra chưa đủ]
- Cách kiểm chứng: [Xem theo tài liệu đặc tả]
- Tỷ lệ nội dung AI còn giữ lại (ước lượng): [45%]
- Điều học được: [Cách viết form đặc tả]

```

```

## AI-02 – <Đặc tả usecase>

- Ngày / Người dùng: [2026-11-10] / Trần Quang Vinh
- Công cụ: [Copilot]
- Giai đoạn: Lập kế hoạch
- Task / Commit / PR: [DOC] Đề cương / [17e7cfa] / [PR1]
- Mục đích: [Hướng dẫn form viết đặc tả]
- Prompt chính (nguyên văn hoặc link chia sẻ hội thoại): [Bây giờ hãy hướng dẫn tôi viết đặc tả cho tôi Đặc tả 3 use case chính: Đặt hàng, Quản lý sản phẩm, Đăng nhập (tác nhân, tiền điềukiện, luồng chính, luồng phụ)]
- Kết quả AI trả về (tóm tắt): [Use case Tác nhân Tiền điều kiện Luồng chính Luồng phụ
  UC-01 Đăng nhập (TM-04) Khách vãng lai (đã có tài khoản), Quản trị Có tài khoản, không bị khóa, chưa đăng nhập 7 bước: nhập email/mật khẩu, kiểm tra dữ liệu ở server, so khớp bcrypt, kiểm tra tài khoản, tạo phiên, điều hướng theo vai trò A1 chưa có tài khoản, A2 quay lại trang đang xem, A3 đăng xuất, E1 → E5 (sai dữ liệu, sai mật khẩu, bị khóa, nhập sai nhiều lần, lỗi hệ thống)
  UC-02 Quản lý sản phẩm (TM-12) Quản trị Đã đăng nhập với vai trò admin, có ít nhất 1 danh mục 6 bước thêm sản phẩm (form, ảnh jpg/png ≤ 2 MB, kiểm tra ở server, lưu) A1 → A5 (tìm kiếm, sửa, ẩn/hiện, xóa, xóa mềm), E1 → E5 (dữ liệu sai, ảnh sai, không phải admin, phiên hết hạn, lỗi lưu)
  UC-03 Đặt hàng COD (TM-06) Khách hàng Đã đăng nhập, giỏ hàng có sản phẩm 8 bước, trong một transaction: tạo đơn “Chờ xác nhận”, lưu giá lúc mua, trừ tồn kho, xóa giỏ A1 → A2 và 12 ngoại lệ E1 → E12 (chưa đăng nhập, giỏ trống, hết hàng, không đủ số lượng, hai người mua cuốn cuối, sản phẩm bị ẩn, giá đổi, thông tin sai, phiên hết hạn, bấm 2 lần, lỗi CSDL, đổi ID trên URL)]
- Đánh giá: [Đúng 1 phần vì AI không hiểu rõ nghiệp vụ thực sự của đặc tả nên có vài chỗ vẫn tự bịa ra]
- Đã chỉnh sửa gì: [Lấy form viết đặc tả và lọc những ý về luồng phụ]
- Cách kiểm chứng: [Đối chiếu từng luồng chính, luồng phụ và ngoại lệ với tài liệu đặc tả use case của nhóm.]
- Tỷ lệ nội dung AI còn giữ lại (ước lượng): [45%]
- Điều học được: [Prompt cần truyền đầy đủ đặc tả , dữ liệu cần thiết thì AI nó mới hiểu và cho kết quả chuẩn]

```

```

## AI-03 – <Vẽ Sequence Diagram>

- Ngày / Người dùng: [2026-11-11] / Trần Quang Vinh
- Công cụ: [Copilot]
- Giai đoạn: Lập kế hoạch
- Task / Commit / PR: [DOC] Đề cương / [fe7021d] / [PR1]
- Mục đích: [Hướng dẫn vẽ sequence diagram]
- Prompt chính (nguyên văn hoặc link chia sẻ hội thoại): [Nhờ AI vẽ sequence bằng PlantUML/Mermaid từ những dữ liệu của file tôi vừa gửi và file đặc tả và hình erd.]
- Kết quả AI trả về (tóm tắt): [Trả về 3 bản sequence diagram với đầy đủ 3 luồng ]
- Đánh giá: [Sơ đồ mà AI đưa ra đã bám sát được đặc tả nhưng vẫn còn vài chỗ AI làm thiếu ý và chưa đủ luồng]
- Đã chỉnh sửa gì: [Vẽ theo sơ đồ sequence diagram của AI và thêm 1 vài chỗ]
- Cách kiểm chứng: [Đối chiếu sequence diagram với đặc tả use case, ERD và luồng nghiệp vụ thực tế của hệ thống; kiểm tra lại actor, request, response và thứ tự xử lý]
- Tỷ lệ nội dung AI còn giữ lại (ước lượng): [75%]
- Điều học được: [Prompt cần truyền đầy đủ đặc tả , dữ liệu cần thiết thì AI nó mới hiểu và cho kết quả chuẩn]

```

```

## AI-04 – <Thiết kế kịch bản 10 phút vấn đáp>

- Ngày / Người dùng: [2026-11-12] / Trần Quang Vinh
- Công cụ: [Copilot]
- Giai đoạn: Lập kế hoạch
- Task / Commit / PR: [DOC] Đề cương / [Không có commit] / [Không có PR]
- Mục đích: [Nhờ AI thiết kế kịch bản 10 phút vấn đáp]
- Prompt chính (nguyên văn hoặc link chia sẻ hội thoại): [Nhờ AI góp ý cấu trúc phần trình bày 10 phút;nhóm tôi gồm 4 người, TV4 và TV5 là 1.Dựa vào dữ liệu của file markdown decuong và file pdf Ngay04_Thu5 và có thêm hình ảnh của Trello nhóm tôi.]
- Kết quả AI trả về (tóm tắt): [1.Giới thiệu đề tài,2.Trello&Quản lý dự án,3.Chức năng hệ thống,4.Kiến trúc hệ thống,5.ERD,6.Wireframe+Giao diện,7.Kết quả hiện tại,8.Kế hoạch Sprint 2 ]
- Đánh giá: [Nội dung kịch bản AI đưa ra rất đầy đủ và chi tiết , nhưng mình cần chỉnh sửa thêm ý để kịch bản phù hợp hơn]
- Đã chỉnh sửa gì: [Lấy 1 phần nội dung của AI đưa ra và thêm ý của mình]
- Cách kiểm chứng: [Đối chiếu kịch bản AI đề xuất với thời lượng 10 phút, số lượng thành viên và nội dung thực tế của đề cương; sau đó điều chỉnh lại các phần chưa phù hợp.]
- Tỷ lệ nội dung AI còn giữ lại (ước lượng): [85%]
- Điều học được: [Cách thiết kế kịch bản của AI, giành cho buổi vấn đáp]

```

```

## AI-05 – <Nhận xét dự án Trello>

- Ngày / Người dùng: [2026-11-12] / Trần Quang Vinh
- Công cụ: [Copilot]
- Giai đoạn: Lập kế hoạch
- Task / Commit / PR: [DOC] Đề cương / [Thao tác trên trllo] / [Thao tác trên trllo]
- Mục đích: [Nhờ AI nhận xét board Trello]
- Prompt chính (nguyên văn hoặc link chia sẻ hội thoại): [Hãy kiểm tra dự án Trello của nhóm tôi có đạt chuẩn theo yêu cầu hay không.]
- Kết quả AI trả về (tóm tắt): [Nhìn tổng thể, nhóm bạn đã đạt khoảng 80-85% yêu cầuThêm cột Bugs đúng yêu cầu.Gắn đầy đủ Labels cho mọi thẻ.Đưa các task sắp làm vào Sprint hiện tại thay vì để trống.Có ít nhất vài thẻ đi qua Review trước khi vào Done.Thêm thẻ Retrospective Sprint 1.Bảo đảm mỗi card có:]
- Đánh giá: [Nhận xét AI đưa ra rất đúng theo yêu cầu]
- Đã chỉnh sửa gì: [Chỉnh sửa lại những gì AI đưa ra vào Trello]
- Cách kiểm chứng: [Đối chiếu các đề xuất của AI với yêu cầu quản lý dự án của nhóm và kiểm tra trực tiếp trên board Trello sau khi chỉnh sửa.]
- Tỷ lệ nội dung AI còn giữ lại (ước lượng): [85%]
- Điều học được: [Cách thiết kế board Trello]

```

```

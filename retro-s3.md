# Retrospective Sprint 3

## 1. Tổng quan Sprint

**Sprint:** Sprint 3  
**Thời gian:** 17/11/2026 – 24/11/2026  
**Nhóm:** Đồ án Web Thương mại điện tử

Sprint 3 tập trung vào việc tiếp tục phát triển các chức năng của hệ thống, hoàn thiện các phần Backend/Frontend, kiểm thử và tích hợp code giữa các thành viên.

---

## 2. Những việc đã thực hiện

Trong Sprint 3, nhóm đã thực hiện các công việc chính:

- Phát triển và hoàn thiện các chức năng được phân công trên Trello.
- Xây dựng và hoàn thiện các chức năng Backend bằng Laravel.
- Xây dựng và kết nối các chức năng Frontend bằng React.
- Làm việc với Database và kiểm tra dữ liệu.
- Viết Unit Test cho các Service quan trọng.
- Kiểm tra và sửa lỗi trong quá trình phát triển.
- Sử dụng Git để quản lý source code và làm việc theo branch.
- Tích hợp code từ các branch chức năng vào `develop`.
- Cập nhật tài liệu và tiến độ công việc của nhóm.

---

## 3. Những việc làm tốt

### 3.1. Phân chia công việc

Các thành viên được phân chia công việc thông qua Trello. Mỗi thành viên phụ trách các Task/Mã công việc cụ thể.

Việc phân chia giúp các thành viên biết rõ:

- Công việc cần thực hiện.
- Người chịu trách nhiệm.
- Tiến độ thực hiện.
- Kết quả cần đạt được.

### 3.2. Sử dụng Git

Nhóm đã sử dụng Git và branch để hạn chế việc làm việc trực tiếp trên `develop`.

Quy trình cơ bản:

```text
develop
   │
   ├── feature/...
   ├── test/...
   └── docs/retro-s3
```

Các thành viên phát triển trên branch riêng, sau đó thực hiện commit và push lên remote để tích hợp vào branch chung.

### 3.3. Kiểm thử

Nhóm bắt đầu chú trọng hơn đến việc kiểm thử chức năng thay vì chỉ kiểm tra thủ công.

Đối với `UserService`, nhóm đã xây dựng Unit Test cho các trường hợp như:

- Tìm kiếm User theo email.
- Phân trang danh sách User.
- Kiểm tra keyword không làm thay đổi câu SQL ngoài ý muốn.
- Khóa tài khoản User.
- Mở khóa tài khoản User.
- Không cho phép Admin tự khóa tài khoản của mình.
- Không cho phép khóa tài khoản Admin.

### 3.4. Tài liệu hóa

Nhóm tiếp tục cập nhật các tài liệu liên quan đến quá trình phát triển, bao gồm:

- Mô tả chức năng.
- Task trên Trello.
- Tài liệu Sprint.
- Tài liệu Retrospective.
- Các thay đổi liên quan đến Git và quá trình phát triển.

---

## 4. Những vấn đề gặp phải

Trong Sprint 3, nhóm gặp một số vấn đề:

### 4.1. Xung đột khi tích hợp code

Khi nhiều thành viên cùng chỉnh sửa các file hoặc khu vực code liên quan, có thể xảy ra conflict khi merge.

Điều này làm mất thêm thời gian để kiểm tra và xử lý code.

### 4.2. Chưa thống nhất hoàn toàn cách đặt tên

Một số tên branch, commit, function hoặc test có thể chưa thống nhất giữa các thành viên.

Ví dụ cần thống nhất cách đặt tên:

```text
feature/TM-14-user
test/TM-14-user
docs/retro-s3
```

và commit message theo một format thống nhất.

### 4.3. Một số lỗi phát hiện khá muộn

Một số lỗi chỉ được phát hiện sau khi tích hợp code hoặc khi chạy test.

Nguyên nhân chủ yếu là việc kiểm tra code và test chưa được thực hiện đồng đều sau mỗi Task.

### 4.4. Phụ thuộc giữa các thành viên

Một số Task phụ thuộc vào Database, API hoặc code của thành viên khác.

Khi Task trước chưa hoàn thành, Task phía sau có thể bị chậm theo.

---

## 5. Nguyên nhân

Các vấn đề trên chủ yếu đến từ:

- Chưa thống nhất quy trình Git ngay từ đầu.
- Chưa thống nhất convention về branch và commit.
- Một số Task có sự phụ thuộc lẫn nhau.
- Việc test chưa được thực hiện ngay sau khi hoàn thành từng chức năng.
- Trao đổi giữa các thành viên đôi lúc chưa kịp thời.
- Một số thành viên còn chưa quen với quy trình làm việc theo branch và merge.

---

## 6. Những điều cần cải thiện

Trong Sprint tiếp theo, nhóm cần:

### Git

- Thống nhất quy tắc đặt tên branch.
- Viết commit message rõ ràng.
- Pull `feature` trước khi bắt đầu Task mới.
- Thường xuyên cập nhật branch để giảm conflict.
- Không tự ý sửa code của thành viên khác nếu chưa trao đổi.

### Testing

- Viết test ngay sau khi hoàn thành chức năng.
- Kiểm tra cả trường hợp thành công và thất bại.
- Kiểm tra các trường hợp biên.
- Chạy test trước khi tạo Pull Request.

### Communication

- Cập nhật tiến độ thường xuyên trên Trello.
- Báo sớm khi gặp blocker.
- Trao đổi trước khi thay đổi các phần code dùng chung.
- Thống nhất API và Database trước khi Frontend tích hợp.

## 7. Kết luận

Sprint 3 giúp nhóm tiếp tục hoàn thiện hệ thống thương mại điện tử và cải thiện quy trình làm việc.

Nhóm đã thực hiện được việc phát triển chức năng, kiểm thử, quản lý source code bằng Git và cập nhật tài liệu. Tuy nhiên, nhóm vẫn cần cải thiện việc phối hợp giữa các thành viên, quy trình Git, kiểm thử và cập nhật tiến độ.

Các vấn đề được ghi nhận trong Sprint 3 sẽ được sử dụng làm cơ sở để nhóm cải thiện quy trình làm việc trong Sprint tiếp theo.

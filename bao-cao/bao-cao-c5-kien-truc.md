### Chương 5. Thiết kế

**5.1 Kiến trúc**
- Sơ đồ kiến trúc tổng thể
![architecture.png](https://github.com/ngoctramcam/ECommerce-Project/blob/docs/architecture.png)

- Thành phần của hệ thống:
  - Browser: Nơi người dùng thao tác trên giao diện React, gửi request và nhận dữ liệu phản hồi để cập nhật giao diện.
  - Routing: Tiếp nhận request, chuyển tiếp request vào chuỗi xử lý của Laravel.
  - Middleware: Kiểm soát các điều kiện trước/sau khi vào controller như xác thực, phân quyền vai trò.
  - Requests: Lớp Request chuyên trách kiểm tra và chuẩn hóa dữ liệu đầu vào trước khi đến Controller.
  - Controller: Điều phối request, nhận dữ liệu đã qua kiểm duyệt, gọi Services và trả về kết quả phản hồi.
  - Services: Chứa logic nghiệp vụ chính của ứng dụng.
  - Models: Lớp Eloquent ORM đại diện cho các bảng dữ liệu, khai báo quan hệ của các bảng dữ liệu.
  - Database: Cơ sở dữ liệu lưu trữ toàn bộ dữ liệu của hệ thống.

- Kiến trúc backend 3 lớp: Controller – Service – Repository/Model
  1. Controller:
      - Đóng vai trò cầu nối giữa Request và tầng nghiệp vụ.
      - Không chứa logic nghiệp vụ phức tạp, chỉ trích xuất dữ liệu đầu vào hợp lệ, gọi phương thức ở Service và định dạng phản hồi trả về.
  3.  Service:
      - Nơi tập trung toàn bộ quy tắc nghiệp vụ.
      - Giúp logic nghiệp vụ độc lập với Controller, dễ tái sử dụng và tránh viễck Controller bị phình to.
  4. Model:
      - Ánh xạ thực thể với bảng trong Database thông qua ORM, định nghĩa các thuộc tính có thể gán, kiểu dữ liệu và mối quan hệ giữa các bảng.
 
- Luồng một request đi qua các lớp
  - Khi người dùng thực hiện đặt hàng, một request đi qua các khối trong sơ đồ theo thứ tự sau:
    1. Trình duyệt: Người dùng nhấn đặt hàng trên giao diện React; trình duyệt gửi request đặt hàng (kèm thông tin sản phẩm/giỏ hàng, địa chỉ giao nhận, phương thức thanh toán và thông tin xác thực) tới server.
    2. Routing: Bộ định tuyến nhận request, khớp với route đặt hàng và chuyển tiếp tới Middleware.
    3. Middleware: Kiểm tra trạng thái đăng nhập, quyền hạn của người dùng.
    4. Requests: Form Request kiểm tra tính hợp lệ của các trường dữ liệu gửi lên, nếu không đạt sẽ trả về lỗi xác thực ngay.
    5. Controller: Nhận dữ liệu đã được Requests xác thực và gọi phương thức xử lý tạo đơn hàng bên Services.
    6. Services: Thực hiện nghiệp vụ đặt hàng thông qua Models.
    7. Models và Database: Models thực thi các câu lệnh xuống Database, sau đó trả kết quả ngược lên Services → Controller → Browser để React hiển thị trạng thái đặt hàng thành công hoặc thông báo lỗi tương ứng.
- Cấu trúc thư mục có chú thích vai trò từng thư mục:
```bash
└── ngoctramcam-ecommerce-project/
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/            # Lớp tiếp nhận request, gọi Service, trả phản hồi
    │   │   ├── Middleware/             # Lớp Xác thực, phân quyền
    │   │   └── Requests/               # Lớp Kiểm tra và chuẩn hóa dữ liệu đầu vào
    │   ├── Models/                     # Lớp ánh xạ bảng CSDL, khai báo quan hệ
    │   └── Services/                   # Lớp Xử lý nghiệp vụ chính và điều phối thao tác dữ liệu
    ├── bootstrap/                      # Khởi tạo các file cache khởi động
    ├── config/                         # Chứa các file cấu hình hệ thống (CSDL, xác thực, dịch vụ...)
    ├── database/               
    │   ├── factories/                  # Tạo dữ liệu mẫu phục vụ kiểm thử và seeding
    │   ├── migrations/                 # Lưu các file migration quản lý cấu trúc bảng trong Database
    │   └── seeders/                    # Chứa các seeder nạp dữ liệu mẫu cho môi trường phát triển/kiểm thử
    ├── public/                         # Thư mục duy nhất được public ra ngoài, chứa các dữ liệu tĩnh
    ├── resources/
    │   ├── css/                        # Chứa file stylesheet / cấu hình giao diện CSS
    │   └── js/                         # Mã nguồn giao diện của Frontend
    │       ├── layouts/                # Các khung bố cục trang dùng chung
    │       └── pages/                  # Các trang chức năng của ứng dụng
    │           └── admin/              # Các trang thuộc khu vực admin
    │               └── components/     # Các component giao diện riêng cho khu vực admin                   
    ├── routes/                         # Khai báo các route cho API và web
    ├── tests/                          # Chứa các bộ kiểm thử
```
**5.2 Cơ sở dữ liệu** _(TV4)_

- ERD (bản final), mô tả 6 bảng: users, categories, products, cart_items, orders, order_items
- Khóa chính, khóa ngoại, ràng buộc (email duy nhất, tồn kho ≥ 0)
- Chuẩn hóa 3NF; vì sao tách `order_items`; vì sao lưu giá tại thời điểm mua
- Chỉ mục: `products(name)`, `products(category_id)`, `orders(user_id, status)`

**5.3 Sequence diagram** _(TV1)_

- Luồng Đặt hàng: Khách hàng → Giao diện → Controller → OrderService → CSDL (có transaction)

**5.4 Giao diện** _(TV3)_

- Nguyên tắc thiết kế, bố cục chung (header, menu danh mục, footer), responsive 360 px / 1366 px
- Ảnh các màn hình chính kèm mô tả: Trang chủ, Danh sách/tìm kiếm, Chi tiết sách, Giỏ hàng, Đặt hàng, Trang quản trị

### Chương 6. Cài đặt

- 6.1 Cấu trúc mã backend và frontend
  **Backend**
  - routes/: Khai báo các endpoint nhận request từ client và gắn Middleware bảo vệ route.
  - Middleware/: Lọc request trước khi vào controller như xác thực, kiểm tra vai trò người dùng.
  - Requests/: Chuyên trách kiểm tra tính hợp lệ và chuẩn hóa dữ liệu đầu vào trước khi đến controller.
  - Controllers/: Tiếp nhận request đã qua kiểm duyệt, trích xuất dữ liệu hợp lệ, gọi phương thức của Service và trả về phản hồi.
  - Services/: Tập trung logic nghiệp vụ cốt lõi như đặt hàng, xác thực, quản lý trạng thái, tính toán, giúp controller nhẹ hơn.
  - Models/: Các lớp Eloquent Model đại diện cho bảng dữ liệu, khai báo quan hệ và các truy vấn ORM.
  - database/ (migrations/, seeders/, factories/): Quản lý các bảng dữ liệu, dữ liệu mẫu và dữ liệu giả phục vụ phát triển/kiểm thử.
  **Frontend**
  - layouts/: Các khung bố cục trang dùng chung như layout chính cho người dùng và layout riêng cho admin.
  - pages/: Các trang chức năng tương ứng từng luồng nghiệp vụ của ứng dụng như trang chủ, danh sách/chi tiết sản phẩm, giỏ hàng, thanh toán/đặt hàng, đăng nhập,...
  - components/: Các component giao diện phục vụ cho các vai trò, giúp chia nhỏ UI và tái sử dụng.
  - css/: Chứa stylesheet và cấu hình giao diện trực quan của ứng dụng.
- 6.2 Hai mẫu thiết kế/nguyên lý áp dụng trở lên (Repository, Dependency Injection, Middleware…), chỉ rõ vị trí trong mã (tên tệp/lớp)
  1. Nguyên tắc đơn trách nhiệm:
     - Tách logic nghiệp vụ khỏi Controller và Model để mỗi lớp chỉ làm một nhiệm vụ duy nhất. Controller lo điều phối, Services lo quy tắc nghiệp vụ, Models lo ánh xạ và truy vấn thực thể.
     - Vị trí: Trong các lớp Controller, Model và Services
  2. Dependency Injection
     - Thay vì tự khởi tạo phụ thuộc bên trong lớp, các phụ thuộcược inject qua constructor giúp giảm sự phụ thuộc từng lớp.
     - Vị trí: Trong các file thuộc lớp Controller.
- 6.3 Nghiệp vụ tiêu biểu: **Đặt hàng trong transaction**
- Ý tưởng: Khi người dùng đặt hàng, hệ thống phải thực hiện đồng thời nhiều thao tác liên quan chặt chẽ: kiểm tra tính hợp lệ của giỏ hàng/sản phẩm, kiểm tra và trừ số lượng tồn kho, tạo bản ghi đơn hàng, tạo các dòng chi tiết đơn hàng và xóa/cập nhật giỏ hàng. Nếu các bước này chạy rời rạc mà không dùng transaction, sự cố giữa chừng có thể gây lệch tồn kho.
- Mã giả:
```bash
HÀM ĐặtHàng(MãNgườiDùng, ThôngTinGiaoHàng):
BẮT ĐẦU GIAO DỊCH CƠ SỞ DỮ LIỆU (Database Transaction)
    TRY:
        // 1. Lấy dữ liệu giỏ hàng
        DanhSáchGiỏHàng = Lấy tất cả sản phẩm trong giỏ hàng của MãNgườiDùng
        NẾU DanhSáchGiỏHàng rỗng THÌ
            NÉM LỖI "Giỏ hàng trống."
        KẾT THÚC NẾU
        TổngTiềnĐơnHàng = 0
        DanhSáchChiTiếtĐơnHàng = Rỗng
        // 2. Kiểm tra tồn kho và tính tiền
        VÒNG LẶP qua từng Mục trong DanhSáchGiỏHàng:
            // Lấy thông tin sản phẩm và khóa dòng dữ liệu để tránh xung đột (Lock for update)
            SảnPhẩm = Lấy thông tin sản phẩm theo MãSảnPhẩm
            NẾU SảnPhẩm không tồn tại HOẶC TồnKho(SảnPhẩm) < SốLượngMua(Mục) THÌ
                NÉM LỖI "Sản phẩm không đủ hàng trong kho."
            KẾT THÚC NẾU
            ThànhTiền = Giá(SảnPhẩm) * SốLượngMua(Mục)
            TổngTiềnĐơnHàng = TổngTiềnĐơnHàng + ThànhTiền
            // Chuẩn bị dữ liệu chi tiết
            Thêm vào DanhSáchChiTiếtĐơnHàng thông tin (MãSảnPhẩm, SốLượng, ĐơnGiá, ThànhTiền)
            // Cập nhật lại số lượng tồn kho
            TồnKho(SảnPhẩm) = TồnKho(SảnPhẩm) - SốLượngMua(Mục)
            Lưu(SảnPhẩm)
        KẾT THÚC VÒNG LẶP
        // 3. Tạo Đơn hàng chính
        ĐơnHàng = TẠO MỚI ĐơnHàng VỚI:
MãNgườiDùng
TổngTiền = TổngTiềnĐơnHàng
Trạng thái = 'Chờ xử lý' (pending)
Ngày đặt = Thời gian hiện tại
Tên, SĐT, Địa chỉ, Mã giảm giá (lấy từ ThôngTinGiaoHàng)
        // 4. Lưu chi tiết đơn hàng
        VÒNG LẶP qua từng ChiTiết trong DanhSáchChiTiếtĐơnHàng:
            TẠO MỚI ChiTiếtĐơnHàng VỚI:
MãNgườiDùng
MãĐơnHàng (từ ĐơnHàng vừa tạo)
Thông tin chi tiết (MãSảnPhẩm, SốLượng, ĐơnGiá, ThànhTiền)
      KẾT THÚC VÒNG LẶP
      // 5. Làm sạch giỏ hàng
      CácMụcCầnXóa = Lấy danh sách giỏ hàng chưa bị xóa của MãNgườiDùng
      VÒNG LẶP qua từng Mục trong CácMụcCầnXóa:
          Đánh dấu Mục là "đã xóa" (is_delete = true)
          Xóa(Mục)
      KẾT THÚC VÒNG LẶP
      TRẢ VỀ ĐơnHàng
  CATCH LỖI:
      HOÀN TÁC GIAO DỊCH (Rollback) VÀ Báo Lỗi
  XÁC NHẬN GIAO DỊCH (Commit)
```
- Cách chống vượt tồn kho:
  - Khóa bản ghi sản phẩm bằng lockForUpdate() trong DB::transaction Khi duyệt qua từng CartItem `Product::where('product_id', $item->product_id)->lockForUpdate()->first()`: Buộc các request đặt hàng đồng thời khác muốn đọc/sửa cùng sản phẩm phải chờ cho đến khi transaction hiện tại commit hoặc rollback—tránh tình trạng nhiều người cùng đọc một mức stock cũ rồi cùng trừ.
  - Kiểm tra lại tồn kho trên bản ghi đã khóa trước khi trừ `if (!$product || $product->stock < $item->quantity)`. Nhờ vậy giá trị stock được đối chiếu luôn là số lượng thực tế mới nhất, không phụ thuộc vào dữ liệu hiển thị cũ trên giao diện phía client.
  - Trừ kho và lưu ngay trong cùng transaction
  - Hoàn tác toàn bộ nếu bất kỳ sản phẩm nào thiếu hàng: Nếu một sản phẩm không đủ tồn kho và ném Exception, toàn bộ transaction bị hủy—các sản phẩm trước đó trong cùng đơn hàng được trừ kho tạm thời sẽ không bị ghi nhận sai lệch ra CSDL.
  - 
- 6.4 Bảo mật
  - Băm mật khẩu: Mật khẩu người dùng không lưu dạng văn bản thuần mà được băm một chiều bằng thuật toán an toàn trước khi lưu xuống cơ sở dữ liệu và đối chiếu khi đăng nhập.
  - Chống SQL Injection: Sử dụng Eloquent ORM  thay vì nối chuỗi SQL trực tiếp từ dữ liệu người dùng.
  - Chống CSRF (Cross-Site Request Forgery): Áp dụng cơ chế bảo vệ CSRF chuẩn của Laravel cho các luồng cho các request từ trình duyệt.
  - Phân quyền phía server: Không chỉ ẩn nút/menu trên giao diện React, mọi route và hành động nhạy cảm như thao tác quản trị, chỉnh sửa/xóa tài nguyên đều được kiểm tra xác thực và vai trò/quyền hạn ở tầng Middleware và Service phía server.
  - Chặn xem đơn của người khác (TM-NFR4): Khi truy vấn hoặc thao tác trên một đơn hàng cụ thể, phía server luôn kiểm tra quyền sở hữu hợp lệ.
  - Kiểm tra tệp tải: Khi người dùng tải tệp lên, không chỉ tin tưởng phần mở rộng tên file (.jpg, .png) do client gửi lên, mà còn giới hạn dung lượng, lưu tệp ra ngoài thư mục thực thi mã và đặt tên file ngẫu nhiên.
  - Không đưa .env vào repo: File .env chứa thông tin nhạy cảm (DB_PASSWORD, APP_KEY, khóa API...) được đưa vào .gitignore để không commit lên GitHub, trên repository chỉ duy trì .env.example với giá trị mẫu/rỗng.

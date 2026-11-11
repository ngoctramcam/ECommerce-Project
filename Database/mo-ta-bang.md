products

- product_id - int - PrimaryKey, not null
- product_name - nvarchar(255) - not null
- description - text -
- price - decimal(10,2) - not null
- stock - double - not null, >=0
- author - nvarchar(255) - not null
- publisher - nvarchar -
- image - nvarchar(255) - not null
- slug - nvarchar(255) - not null, unique
- category_id - int - not null, ForeignKey -> categories.category_id
- created_at - timestamp, default CURRENT_TIMESTAMP, not null
- updated_at - timestamp, default CURRENT_TIMESTAMP, not null
- deleted_at - timestamp, default null

categories

- category_id - int - PrimaryKey, not null
- category_name - nvarchar(255) - not null
- description - text -
- slug - nvarchar(255) - not null, unique
- created_at - timestamp, default CURRENT_TIMESTAMP, not null
- updated_at - timestamp, default CURRENT_TIMESTAMP, not null
- deleted_at - timestamp, default null

order_items

- order_item_id - int - PrimaryKey, not null
- quantity - double - not null, >=1
- unit_price - decimal(10,2), not null
- subtotal - decimal(10,2) - not null
- user_id - int - not null, ForeignKey -> users.user_id
- product_id - int - not null, ForeignKey -> products.product_id
- created_at - timestamp, default CURRENT_TIMESTAMP, not null
- updated_at - timestamp, default CURRENT_TIMESTAMP, not null
- deleted_at - timestamp, default null

orders

- order_id - int - PrimaryKey, not null
- user_id - int - not null, ForeignKey -> users.user_id
- voucher_id - int - ForeignKey -> vouchers.voucher_id
- recipient_name - nvarchar(255) - not null
- recipient_phone - varchar(20) - not null
- shipping_address - nvarchar(255) - not null
- order_date - datetime - not null
- total_amount - decimal(10,2) - not null
- payment_method - enum('COD', 'VNPAY', 'MOMO') - not null
- status - enum('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED') - default 'PENDING'
- created_at - timestamp - default CURRENT_TIMESTAMP, not null
- updated_at - timestamp - default CURRENT_TIMESTAMP, not null
- deleted_at - timestamp - default null

users

- user_id - int - PrimaryKey, not null
- full_name - nvarchar(255) - not null
- email - nvarchar(255) - not null, unique
- password - nvarchar(255) - not null, length >= 8
- phone - varchar(20) -
- address - nvarchar(255) -
- role - enum('admin', 'user') - default 'user'
- created_at - timestamp - default CURRENT_TIMESTAMP, not null
- updated_at - timestamp - default CURRENT_TIMESTAMP, not null
- deleted_at - timestamp - default null

vouchers

- voucher_id - int - PrimaryKey, not null
- code - varchar(50) - not null, unique
- discount_amount - decimal(10,2) - not null
- expired_date - datetime - not null
- created_at - timestamp - default CURRENT_TIMESTAMP, not null
- updated_at - timestamp - default CURRENT_TIMESTAMP, not null
- deleted_at - timestamp - default null

ratings
(Bảng này được suy ra từ quan hệ "rating" trong ERD)

- rating_id - int - PrimaryKey, not null
- user_id - int - not null, ForeignKey -> users.user_id
- product_id - int - not null, ForeignKey -> products.product_id
- star - tinyint - not null, between 1 and 5
- comment - text -
- created_at - timestamp - default CURRENT_TIMESTAMP, not null
- updated_at - timestamp - default CURRENT_TIMESTAMP, not null

Quan hệ chính

- categories (1) --- (N) products
  (Một sản phẩm thuộc về một danh mục duy nhất, Một danh mục có nhiều sản phẩm)
- users (1) --- (1) cart_items
  (Một người dùng có thể thêm nhiều sản phẩm vào giỏ hàng, mỗi mục trong giỏ hàng chỉ thuộc về một người dùng)
- products (1) --- (N) cart_items
  (Một sản phẩm có thể xuất hiện trong giỏ hàng của nhiều người dùng, mỗi mục trong giỏ hàng chỉ chứa một sản phẩm)
- users (1) --- (N) orders
  (Một người dùng có thể tạo nhiều đơn hàng, mỗi đơn hàng chỉ thuộc về một người dùng)
- vouchers (1) --- (N) orders
  (Một voucher có thể được áp dụng cho nhiều đơn hàng, mỗi đơn hàng chỉ sử dụng tối đa một voucher)
- orders (1) --- (N) order_items
  (Một đơn hàng có thể chứa nhiều sản phẩm, mỗi chi tiết đơn hàng chỉ thuộc về một đơn hàng)
- products (1) --- (N) order_items
  (Một sản phẩm có thể xuất hiện trong nhiều chi tiết đơn hàng, mỗi chi tiết đơn hàng chỉ tương ứng với một sản phẩm)
- users (1) --- (N) ratings
  (Một người dùng có thể đánh giá nhiều sản phẩm, mỗi đánh giá chỉ được tạo bởi một người dùng)
- products (1) --- (N) ratings
  (Một sản phẩm có thể nhận được nhiều đánh giá, mỗi đánh giá chỉ thuộc về một sản phẩm)

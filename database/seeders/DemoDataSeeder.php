<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tạo tài khoản Admin & Khách hàng demo (nếu chưa tồn tại)
        DB::table('users')->updateOrInsert(
            ['email' => 'admin@mocsach.vn'],
            [
                'full_name'  => 'Quản Trị Viên Mộc Sách',
                'password'   => Hash::make('123456'),
                'role'       => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'khachhang1@gmail.com'],
            [
                'full_name'  => 'Nguyễn Minh Anh',
                'password'   => Hash::make('123456'),
                'role'       => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'khachhang2@gmail.com'],
            [
                'full_name'  => 'Trần Hoàng Nam',
                'password'   => Hash::make('123456'),
                'role'       => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        $user1 = DB::table('users')->where('email', 'khachhang1@gmail.com')->first();
        $user2 = DB::table('users')->where('email', 'khachhang2@gmail.com')->first();

        // 2. Tạo Danh mục sách
        $categories = [
            ['category_name' => 'Văn học kinh điển', 'slug' => 'van-hoc-kinh-dien'],
            ['category_name' => 'Kỹ năng sống', 'slug' => 'ky-nang-song'],
            ['category_name' => 'Kinh tế - Quản trị', 'slug' => 'kinh-te-quan-tri'],
            ['category_name' => 'Tâm lý học', 'slug' => 'tam-ly-hoc'],
            ['category_name' => 'Sách thiếu nhi', 'slug' => 'sach-thieu-nhi'],
        ];

        $catIds = [];
        foreach ($categories as $cat) {
            DB::table('categories')->updateOrInsert(
                ['slug' => $cat['slug']],
                [
                    'category_name' => $cat['category_name'],
                    'created_at'    => now(),
                    'updated_at'    => now(),
                ]
            );
            $catIds[$cat['slug']] = DB::table('categories')->where('slug', $cat['slug'])->value('category_id');
        }

        // 3. Tạo danh sách Sách mẫu kèm ảnh bìa đẹp
        $books = [
            [
                'category_slug' => 'van-hoc-kinh-dien',
                'product_name'  => 'Nhà Giả Kim',
                'author'        => 'Paulo Coelho',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',
                'price'         => 79000,
                'stock'         => 25,
                'description'   => 'Hành trình theo đuổi vận mệnh và lắng nghe trái tim của chàng chăn cừu Santiago.',
            ],
            [
                'category_slug' => 'ky-nang-song',
                'product_name'  => 'Đắc Nhân Tâm',
                'author'        => 'Dale Carnegie',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg',
                'price'         => 86000,
                'stock'         => 40,
                'description'   => 'Nghệ thuật thu phục lòng người và giao tiếp ứng xử kinh điển mọi thời đại.',
            ],
            [
                'category_slug' => 'ky-nang-song',
                'product_name'  => 'Thói Quen Nguyên Tử (Atomic Habits)',
                'author'        => 'James Clear',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
                'price'         => 145000,
                'stock'         => 18,
                'description'   => 'Thay đổi nhỏ tạo nên kết quả phi thường thông qua hệ thống xây dựng thói quen bền vững.',
            ],
            [
                'category_slug' => 'tam-ly-hoc',
                'product_name'  => 'Tư Duy Nhanh Và Chậm',
                'author'        => 'Daniel Kahneman',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',
                'price'         => 199000,
                'stock'         => 12,
                'description'   => 'Khám phá hai hệ thống tư duy chi phối mọi quyết định của con người.',
            ],
            [
                'category_slug' => 'kinh-te-quan-tri',
                'product_name'  => 'Cha Giàu Cha Nghèo',
                'author'        => 'Robert T. Kiyosaki',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
                'price'         => 110000,
                'stock'         => 30,
                'description'   => 'Tư duy tài chính cá nhân và cách người giàu dạy con về tiền bạc.',
            ],
            [
                'category_slug' => 'van-hoc-kinh-dien',
                'product_name'  => 'Hoàng Tử Bé',
                'author'        => 'Antoine de Saint-Exupéry',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg',
                'price'         => 65000,
                'stock'         => 3, // Sắp hết hàng (demo cảnh báo tồn kho thấp)
                'description'   => 'Câu chuyện đầy chất thơ về tình bạn, tình yêu và ý nghĩa cuộc sống.',
            ],
            [
                'category_slug' => 'van-hoc-kinh-dien',
                'product_name'  => '1984',
                'author'        => 'George Orwell',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
                'price'         => 115000,
                'stock'         => 15,
                'description'   => 'Tiểu thuyết phản địa đàng kinh điển của văn học thế giới thế kỷ 20.',
            ],
            [
                'category_slug' => 'sach-thieu-nhi',
                'product_name'  => 'Harry Potter và Hòn Đá Phù Thủy',
                'author'        => 'J.K. Rowling',
                'image'         => 'https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg',
                'price'         => 160000,
                'stock'         => 22,
                'description'   => 'Khởi đầu hành trình kỳ diệu của cậu bé phù thủy Harry Potter tại trường Hogwarts.',
            ],
        ];

        $productIds = [];
        foreach ($books as $book) {
            $slug = Str::slug($book['product_name']);
            DB::table('products')->updateOrInsert(
                ['slug' => $slug],
                [
                    'category_id'  => $catIds[$book['category_slug']],
                    'product_name' => $book['product_name'],
                    'author'       => $book['author'],
                    'image'        => $book['image'],
                    'price'        => $book['price'],
                    'stock'        => $book['stock'],
                    'description'  => $book['description'],
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ]
            );
            $productIds[] = DB::table('products')->where('slug', $slug)->first();
        }

        // 4. Tạo các Đơn hàng mẫu ở ĐỦ 5 TRẠNG THÁI (PENDING, PROCESSING, SHIPPING, COMPLETED, CANCELLED)
        $demoOrders = [
            [
                'user_id'          => $user1->user_id,
                'status'           => 'PENDING',
                'recipient_name'   => 'Nguyễn Minh Anh',
                'recipient_phone'  => '0901234567',
                'shipping_address' => '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
                'days_ago'         => 0,
                'items'            => [
                    ['product' => $productIds[0], 'quantity' => 2],
                    ['product' => $productIds[2], 'quantity' => 1],
                ],
            ],
            [
                'user_id'          => $user2->user_id,
                'status'           => 'PROCESSING',
                'recipient_name'   => 'Trần Hoàng Nam',
                'recipient_phone'  => '0912345678',
                'shipping_address' => '45 Lê Lợi, Quận 1, TP.HCM',
                'days_ago'         => 1,
                'items'            => [
                    ['product' => $productIds[3], 'quantity' => 1],
                ],
            ],
            [
                'user_id'          => $user1->user_id,
                'status'           => 'SHIPPING',
                'recipient_name'   => 'Nguyễn Minh Anh',
                'recipient_phone'  => '0901234567',
                'shipping_address' => '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
                'days_ago'         => 2,
                'items'            => [
                    ['product' => $productIds[1], 'quantity' => 1],
                    ['product' => $productIds[5], 'quantity' => 2],
                ],
            ],
            [
                'user_id'          => $user2->user_id,
                'status'           => 'COMPLETED',
                'recipient_name'   => 'Trần Hoàng Nam',
                'recipient_phone'  => '0912345678',
                'shipping_address' => '45 Lê Lợi, Quận 1, TP.HCM',
                'days_ago'         => 5,
                'items'            => [
                    ['product' => $productIds[4], 'quantity' => 2],
                    ['product' => $productIds[7], 'quantity' => 1],
                ],
            ],
            [
                'user_id'          => $user1->user_id,
                'status'           => 'COMPLETED',
                'recipient_name'   => 'Nguyễn Minh Anh',
                'recipient_phone'  => '0901234567',
                'shipping_address' => '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
                'days_ago'         => 8,
                'items'            => [
                    ['product' => $productIds[6], 'quantity' => 1],
                ],
            ],
            [
                'user_id'          => $user2->user_id,
                'status'           => 'CANCELLED',
                'recipient_name'   => 'Trần Hoàng Nam',
                'recipient_phone'  => '0912345678',
                'shipping_address' => '45 Lê Lợi, Quận 1, TP.HCM',
                'days_ago'         => 3,
                'items'            => [
                    ['product' => $productIds[0], 'quantity' => 1],
                ],
            ],
        ];

        foreach ($demoOrders as $orderData) {
            $totalAmount = 0;
            foreach ($orderData['items'] as $item) {
                $totalAmount += $item['product']->price * $item['quantity'];
            }

            $orderDate = now()->subDays($orderData['days_ago']);

            $orderId = DB::table('orders')->insertGetId([
                'user_id'          => $orderData['user_id'],
                'total_amount'     => $totalAmount,
                'status'           => $orderData['status'],
                'order_date'       => $orderDate,
                'recipient_name'   => $orderData['recipient_name'],
                'recipient_phone'  => $orderData['recipient_phone'],
                'shipping_address' => $orderData['shipping_address'],
                'is_delete'        => false,
                'created_at'       => $orderDate,
                'updated_at'       => $orderDate,
            ]);

            foreach ($orderData['items'] as $item) {
                DB::table('order_items')->insert([
                    'user_id'    => $orderData['user_id'],
                    'order_id'   => $orderId,
                    'product_id' => $item['product']->product_id,
                    'quantity'   => $item['quantity'],
                    'unit_price' => $item['product']->price,
                    'subtotal'   => $item['product']->price * $item['quantity'],
                    'created_at' => $orderDate,
                    'updated_at' => $orderDate,
                ]);
            }
        }
    }
}

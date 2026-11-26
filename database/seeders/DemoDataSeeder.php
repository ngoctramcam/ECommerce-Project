<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DemoDataSeeder extends Seeder
{
    /**
     * Chỉ giữ lại các cột thực sự tồn tại trong bảng CSDL để tránh lỗi Unknown column
     */
    private function filterExistingColumns(string $table, array $data): array
    {
        $columns = Schema::getColumnListing($table);
        return array_intersect_key($data, array_flip($columns));
    }

    public function run(): void
    {
        // Tắt kiểm tra khóa ngoại tạm thời để xóa sạch dữ liệu cũ an toàn
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        foreach (['ratings', 'order_items', 'orders', 'cart_items', 'products', 'categories', 'vouchers', 'users'] as $table) {
            if (Schema::hasTable($table)) {
                DB::table($table)->truncate();
            }
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $now = Carbon::now();

        // 1. SEED USERS (1 Admin + 3 Khách hàng mẫu)
        $adminId = DB::table('users')->insertGetId($this->filterExistingColumns('users', [
            'full_name'  => 'Quản Trị Viên Mộc Sách',
            'email'      => 'admin@mocsach.vn',
            'password'   => Hash::make('12345678'),
            'phone'      => '0901000001',
            'address'    => 'Số 1 Võ Văn Ngân, Thủ Đức, TP.HCM',
            'role'       => 'admin',
            'status'     => 'active',
            'is_delete'  => 0,
            'created_at' => $now,
            'updated_at' => $now,
        ]));

        $user1Id = DB::table('users')->insertGetId($this->filterExistingColumns('users', [
            'full_name'  => 'Nguyễn Minh Anh',
            'email'      => 'minhanh@gmail.com',
            'password'   => Hash::make('12345678'),
            'phone'      => '0912345678',
            'address'    => '120 Nguyễn Trãi, Quận 1, TP.HCM',
            'role'       => 'user',
            'status'     => 'active',
            'is_delete'  => 0,
            'created_at' => $now,
            'updated_at' => $now,
        ]));

        $user2Id = DB::table('users')->insertGetId($this->filterExistingColumns('users', [
            'full_name'  => 'Trần Hoàng Nam',
            'email'      => 'hoangnam@gmail.com',
            'password'   => Hash::make('12345678'),
            'phone'      => '0987654321',
            'address'    => '45 Lê Lợi, Quận Ninh Kiều, Cần Thơ',
            'role'       => 'user',
            'status'     => 'active',
            'is_delete'  => 0,
            'created_at' => $now,
            'updated_at' => $now,
        ]));

        $userLockedId = DB::table('users')->insertGetId($this->filterExistingColumns('users', [
            'full_name'  => 'Lê Văn Vi Phạm',
            'email'      => 'lockeduser@gmail.com',
            'password'   => Hash::make('12345678'),
            'phone'      => '0909998887',
            'address'    => '78 Hai Bà Trưng, Quận 3, TP.HCM',
            'role'       => 'user',
            'status'     => 'locked',
            'is_delete'  => 0,
            'created_at' => $now,
            'updated_at' => $now,
        ]));

        // 2. SEED CATEGORIES (5 Danh mục chuẩn)
        $categories = [
            ['category_name' => 'Văn học', 'slug' => 'van-hoc', 'description' => 'Tiểu thuyết, truyện ngắn, văn học trong nước và nước ngoài'],
            ['category_name' => 'Kỹ năng sống', 'slug' => 'ky-nang-song', 'description' => 'Sách phát triển bản thân, tư duy tích cực và giao tiếp'],
            ['category_name' => 'Kinh tế - Tài chính', 'slug' => 'kinh-te-tai-chinh', 'description' => 'Quản trị kinh doanh, đầu tư và khởi nghiệp'],
            ['category_name' => 'Tâm lý học', 'slug' => 'tam-ly-hoc', 'description' => 'Khám phá tâm lý hành vi và chữa lành cảm xúc'],
            ['category_name' => 'Thiếu nhi', 'slug' => 'thieu-nhi', 'description' => 'Truyện tranh, truyện cổ tích và sách giáo dục cho bé'],
        ];

        $catIds = [];
        foreach ($categories as $cat) {
            $catIds[$cat['slug']] = DB::table('categories')->insertGetId($this->filterExistingColumns('categories', [
                'category_name' => $cat['category_name'],
                'slug'          => $cat['slug'],
                'description'   => $cat['description'],
                'is_delete'     => 0,
                'created_at'    => $now,
                'updated_at'    => $now,
            ]));
        }

        // 3. SEED PRODUCTS (10 đầu sách đẹp, dùng đúng cột publisher)
        $books = [
            [
                'cat' => 'van-hoc',
                'name' => 'Nhà Giả Kim',
                'author' => 'Paulo Coelho',
                'pub' => 'NXB Hội Nhà Văn',
                'price' => 79000,
                'stock' => 25,
                'img' => 'images/books/nha-gia-kim.jpg',
                'desc' => 'Hành trình phiêu lưu đi tìm kho báu và vận mệnh của chàng chăn cừu Santiago.'
            ],
            [
                'cat' => 'van-hoc',
                'name' => 'Cây Cam Ngọt Của Tôi',
                'author' => 'José Mauro de Vasconcelos',
                'pub' => 'NXB Hội Nhà Văn',
                'price' => 108000,
                'stock' => 18,
                'img' => 'images/books/cay-cam-ngot-cua-toi.jpg',
                'desc' => 'Câu chuyện cảm động về tuổi thơ nghèo khó nhưng giàu tình yêu thương của cậu bé Zezé.'
            ],
            [
                'cat' => 'ky-nang-song',
                'name' => 'Đắc Nhân Tâm',
                'author' => 'Dale Carnegie',
                'pub' => 'NXB Tổng Hợp TP.HCM',
                'price' => 86000,
                'stock' => 30,
                'img' => 'images/books/dac-nhan-tam.jpg',
                'desc' => 'Nghệ thuật thu phục lòng người và giao tiếp ứng xử kinh điển mọi thời đại.'
            ],
            [
                'cat' => 'ky-nang-song',
                'name' => 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
                'author' => 'Rosie Nguyễn',
                'pub' => 'NXB Hội Nhà Văn',
                'price' => 90000,
                'stock' => 15,
                'img' => 'images/books/tuoi-tre-dang-gia-bao-nhieu.jpg',
                'desc' => 'Cuốn sách truyền cảm hứng học tập, trải nghiệm và khám phá bản thân cho người trẻ Việt.'
            ],
            [
                'cat' => 'kinh-te-tai-chinh',
                'name' => 'Cha Giàu Cha Nghèo (Tập 1)',
                'author' => 'Robert T. Kiyosaki',
                'pub' => 'NXB Trẻ',
                'price' => 115000,
                'stock' => 20,
                'img' => 'images/books/cha-giau-cha-ngheo.jpg',
                'desc' => 'Thay đổi tư duy về tiền bạc, tài sản và tự do tài chính cá nhân.'
            ],
            [
                'cat' => 'kinh-te-tai-chinh',
                'name' => 'Tâm Lý Học Về Tiền',
                'author' => 'Morgan Housel',
                'pub' => 'NXB Dân Trí',
                'price' => 189000,
                'stock' => 12,
                'img' => 'images/books/tam-ly-hoc-ve-tien.jpg',
                'desc' => 'Những bài học vượt thời gian về sự giàu có, lòng tham và hạnh phúc.'
            ],
            [
                'cat' => 'tam-ly-hoc',
                'name' => 'Muôn Kiếp Nhân Sinh (Tập 1)',
                'author' => 'Nguyên Phong',
                'pub' => 'NXB Tổng Hợp TP.HCM',
                'price' => 168000,
                'stock' => 14,
                'img' => 'images/books/muon-kiep-nhan-sinh.jpg',
                'desc' => 'Bức tranh lớn về luật nhân quả và luân hồi qua nhiều kiếp sống.'
            ],
            [
                'cat' => 'tam-ly-hoc',
                'name' => 'Hiểu Về Trái Tim',
                'author' => 'Minh Niệm',
                'pub' => 'NXB Trẻ',
                'price' => 158000,
                'stock' => 1,
                'img' => 'images/books/hieu-ve-trai-tim.jpg',
                'desc' => 'Khám phá chiều sâu tâm hồn con người để tìm lại sự bình an nội tại.'
            ],
            [
                'cat' => 'thieu-nhi',
                'name' => 'Dế Mèn Phiêu Lưu Ký',
                'author' => 'Tô Hoài',
                'pub' => 'NXB Kim Đồng',
                'price' => 65000,
                'stock' => 40,
                'img' => 'images/books/de-men-phieu-luu-ky.jpg',
                'desc' => 'Tác phẩm văn học thiếu nhi kinh điển gắn liền với bao thế hệ độc giả Việt Nam.'
            ],
            [
                'cat' => 'thieu-nhi',
                'name' => 'Hoàng Tử Bé',
                'author' => 'Antoine de Saint-Exupéry',
                'pub' => 'NXB Kim Đồng',
                'price' => 75000,
                'stock' => 0,
                'img' => 'images/books/hoang-tu-be.jpg',
                'desc' => 'Câu chuyện triết lý nhẹ nhàng dành cho trẻ em và những người lớn từng là trẻ con.'
            ],
        ];

        $productIds = [];
        foreach ($books as $index => $b) {
            $productIds[$index + 1] = DB::table('products')->insertGetId($this->filterExistingColumns('products', [
                'category_id'  => $catIds[$b['cat']],
                'product_name' => $b['name'],
                'slug'         => Str::slug($b['name']),
                'author'       => $b['author'],
                'publisher'    => $b['pub'],
                'price'        => $b['price'],
                'stock'        => $b['stock'],
                'image'        => $b['img'],
                'description'  => $b['desc'],
                'status'       => 1,
                'is_delete'    => 0,
                'created_at'   => $now->copy()->subDays(10 - $index),
                'updated_at'   => $now,
            ]));
        }

        // 4. SEED VOUCHERS
        $voucherValidId = null;
        if (Schema::hasTable('vouchers')) {
            $voucherValidId = DB::table('vouchers')->insertGetId($this->filterExistingColumns('vouchers', [
                'code'            => 'MOCSACH20',
                'discount_amount' => 20000,
                'expired_date'    => $now->copy()->addMonths(3)->toDateString(),
                'description'     => 'Giảm ngay 20.000đ cho mọi đơn hàng sách',
                'is_delete'       => 0,
                'created_at'      => $now,
                'updated_at'      => $now,
            ]));

            DB::table('vouchers')->insert([
                $this->filterExistingColumns('vouchers', [
                    'code'            => 'CHAOBANMOI',
                    'discount_amount' => 15000,
                    'expired_date'    => $now->copy()->addMonths(2)->toDateString(),
                    'description'     => 'Ưu đãi 15.000đ cho khách hàng thành viên',
                    'is_delete'       => 0,
                    'created_at'      => $now,
                    'updated_at'      => $now,
                ]),
                $this->filterExistingColumns('vouchers', [
                    'code'            => 'MUAHE2025',
                    'discount_amount' => 30000,
                    'expired_date'    => $now->copy()->subDays(15)->toDateString(),
                    'description'     => 'Mã giảm giá đã hết hạn dùng để test validate',
                    'is_delete'       => 0,
                    'created_at'      => $now->copy()->subMonths(2),
                    'updated_at'      => $now,
                ]),
            ]);
        }

        // 5. SEED CART ITEMS
        DB::table('cart_items')->insert([
            $this->filterExistingColumns('cart_items', [
                'user_id'    => $user1Id,
                'product_id' => $productIds[1],
                'quantity'   => 2,
                'is_delete'  => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ]),
            $this->filterExistingColumns('cart_items', [
                'user_id'    => $user1Id,
                'product_id' => $productIds[3],
                'quantity'   => 1,
                'is_delete'  => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ]),
        ]);

        // 6. SEED ORDERS & ORDER_ITEMS Ở ĐỦ 5 TRẠNG THÁI
        $demoOrders = [
            [
                'user_id' => $user1Id,
                'voucher_id' => null,
                'status' => 'pending',
                'name' => 'Nguyễn Minh Anh',
                'phone' => '0912345678',
                'addr' => '120 Nguyễn Trãi, Quận 1, TP.HCM',
                'date' => $now->copy()->subHours(2),
                'items' => [
                    ['pid' => $productIds[2], 'qty' => 1, 'price' => 108000],
                ]
            ],
            [
                'user_id' => $user1Id,
                'voucher_id' => $voucherValidId,
                'status' => 'processing',
                'name' => 'Nguyễn Minh Anh',
                'phone' => '0912345678',
                'addr' => '120 Nguyễn Trãi, Quận 1, TP.HCM',
                'date' => $now->copy()->subDay(),
                'items' => [
                    ['pid' => $productIds[4], 'qty' => 1, 'price' => 90000],
                    ['pid' => $productIds[9], 'qty' => 1, 'price' => 65000],
                ]
            ],
            [
                'user_id' => $user2Id,
                'voucher_id' => null,
                'status' => 'shipping',
                'name' => 'Trần Hoàng Nam',
                'phone' => '0987654321',
                'addr' => '45 Lê Lợi, Quận Ninh Kiều, Cần Thơ',
                'date' => $now->copy()->subDays(2),
                'items' => [
                    ['pid' => $productIds[5], 'qty' => 2, 'price' => 115000],
                ]
            ],
            [
                'user_id' => $user1Id,
                'voucher_id' => $voucherValidId,
                'status' => 'completed',
                'name' => 'Nguyễn Minh Anh',
                'phone' => '0912345678',
                'addr' => '120 Nguyễn Trãi, Quận 1, TP.HCM',
                'date' => $now->copy()->subDays(5),
                'items' => [
                    ['pid' => $productIds[1], 'qty' => 1, 'price' => 79000],
                    ['pid' => $productIds[7], 'qty' => 1, 'price' => 168000],
                ]
            ],
            [
                'user_id' => $user2Id,
                'voucher_id' => null,
                'status' => 'cancelled',
                'name' => 'Trần Hoàng Nam',
                'phone' => '0987654321',
                'addr' => '45 Lê Lợi, Quận Ninh Kiều, Cần Thơ',
                'date' => $now->copy()->subDays(4),
                'items' => [
                    ['pid' => $productIds[6], 'qty' => 1, 'price' => 189000],
                ]
            ],
        ];

        foreach ($demoOrders as $ord) {
            $subtotalSum = collect($ord['items'])->sum(fn($i) => $i['qty'] * $i['price']);
            $discount = $ord['voucher_id'] ? 20000 : 0;
            $totalAmount = max(0, $subtotalSum - $discount);

            $orderId = DB::table('orders')->insertGetId($this->filterExistingColumns('orders', [
                'user_id'          => $ord['user_id'],
                'voucher_id'       => $ord['voucher_id'],
                'recipient_name'   => $ord['name'],
                'recipient_phone'  => $ord['phone'],
                'shipping_address' => $ord['addr'],
                'order_date'       => $ord['date'],
                'total_amount'     => $totalAmount,
                'status'           => $ord['status'],
                'is_delete'        => 0,
                'created_at'       => $ord['date'],
                'updated_at'       => $ord['date'],
            ]));

            foreach ($ord['items'] as $item) {
                DB::table('order_items')->insert($this->filterExistingColumns('order_items', [
                    'user_id'    => $ord['user_id'],
                    'order_id'   => $orderId,
                    'product_id' => $item['pid'],
                    'quantity'   => $item['qty'],
                    'unit_price' => $item['price'],
                    'subtotal'   => $item['qty'] * $item['price'],
                    'is_delete'  => 0,
                    'created_at' => $ord['date'],
                    'updated_at' => $ord['date'],
                ]));
            }
        }

        // 7. SEED RATINGS
        if (Schema::hasTable('ratings')) {
            DB::table('ratings')->insert([
                $this->filterExistingColumns('ratings', [
                    'user_id'    => $user1Id,
                    'product_id' => $productIds[1],
                    'star'       => 5,
                    'rating'     => 5,
                    'comment'    => 'Sách in đẹp, giấy thơm mùi gỗ nhẹ, giao hàng rất nhanh và đóng gói cẩn thận!',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]),
                $this->filterExistingColumns('ratings', [
                    'user_id'    => $user1Id,
                    'product_id' => $productIds[7],
                    'star'       => 5,
                    'rating'     => 5,
                    'comment'    => 'Nội dung sâu sắc, rất đáng đọc. Sẽ tiếp tục ủng hộ Mộc Sách.',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]),
            ]);
        }
    }
}

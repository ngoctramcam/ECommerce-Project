<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            'Đắc Nhân Tâm',
            'Nhà Giả Kim',
            'Tuổi Trẻ Đáng Giá Bao Nhiêu',
            'Dám Bị Ghét',
            'Tôi Tài Giỏi Bạn Cũng Thế',
            'Cha Giàu Cha Nghèo',
            'Nghĩ Giàu Làm Giàu',
            'Khởi Nghiệp Tinh Gọn',
            'Atomic Habits',
            '7 Thói Quen Hiệu Quả',
            'Clean Code',
            'Design Patterns',
            'Laravel Từ Cơ Bản Đến Nâng Cao',
            'Lập Trình PHP',
            'ASP.NET Core Thực Chiến',
            'Harry Potter',
            'Doraemon',
            'Conan',
            'Sherlock Holmes',
            'Tắt Đèn',
            'Lão Hạc',
            'Số Đỏ',
            'Mắt Biếc',
            'Cho Tôi Xin Một Vé Đi Tuổi Thơ',
            'Bí Mật Tư Duy Triệu Phú',
            'Think And Grow Rich',
            'Muôn Kiếp Nhân Sinh',
            'Tâm Lý Học Tội Phạm',
            'Hoàng Tử Bé',
            'Không Gia Đình'
        ];

        $categories = Category::pluck('category_id')->toArray();

        foreach ($books as $index => $book) {

            Product::create([
                'product_name' => $book,
                'description' => "Mô tả sách $book",
                'price' => rand(80000, 300000),
                'stock' => rand(20, 100),
                'author' => 'Tác giả ' . ($index + 1),
                'publisher' => 'NXB Trẻ',
                'image' => 'books/default.jpg',
                'slug' => Str::slug($book),
                'category_id' => $categories[$index % 5]
            ]);
        }
    }
}

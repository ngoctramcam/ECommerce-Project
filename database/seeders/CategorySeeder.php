<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'category_name' => 'Văn học',
                'slug' => 'van-hoc',
                'description' => 'Sách văn học'
            ],
            [
                'category_name' => 'Kinh tế',
                'slug' => 'kinh-te',
                'description' => 'Sách kinh tế'
            ],
            [
                'category_name' => 'Công nghệ thông tin',
                'slug' => 'cong-nghe-thong-tin',
                'description' => 'Sách CNTT'
            ],
            [
                'category_name' => 'Kỹ năng sống',
                'slug' => 'ky-nang-song',
                'description' => 'Sách phát triển bản thân'
            ],
            [
                'category_name' => 'Thiếu nhi',
                'slug' => 'thieu-nhi',
                'description' => 'Sách cho trẻ em'
            ],
        ];

        Category::insert($categories);
    }
}

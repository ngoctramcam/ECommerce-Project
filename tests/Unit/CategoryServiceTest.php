<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use App\Services\CategoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_khong_xoa_danh_muc_dang_co_san_pham(): void
    {
        // 1. Tạo danh mục và 1 sản phẩm thuộc danh mục đó (kèm đầy đủ các cột NOT NULL)
        $category = Category::create([
            'category_name' => 'Văn học',
            'slug'          => 'van-hoc',
        ]);

        Product::create([
            'category_id'  => $category->category_id,
            'product_name' => 'Định luật murphy',
            'slug'         => 'dinh-luat-murphy',
            'author'       => 'Dale Carnegie',
            'image'        => 'default.jpg',
            'price'        => 85000,
            'stock'        => 15,
        ]);

        // 2. Gọi hàm delete() của CategoryService
        $service = new CategoryService();
        $result = $service->delete($category->category_id);

        // 3. Kiểm tra trả về success = false và danh mục vẫn còn hoạt động (chưa bị xóa mềm)
        $this->assertFalse($result['success']);
        $this->assertEquals('Không thể xóa danh mục đang có sản phẩm.', $result['message']);
        $this->assertDatabaseHas('categories', [
            'category_id' => $category->category_id,
            'deleted_at'  => null,
        ]);
    }

    public function test_xoa_thanh_cong_danh_muc_khong_co_san_pham(): void
    {
        // 1. Tạo danh mục rỗng (không có sản phẩm)
        $category = Category::create([
            'category_name' => 'Sách thiếu nhi',
            'slug'          => 'sach-thieu-nhi',
        ]);

        // 2. Gọi hàm delete()
        $service = new CategoryService();
        $result = $service->delete($category->category_id);

        // 3. Kiểm tra trả về success = true và danh mục đã được đánh dấu xóa mềm (deleted_at != null)
        $this->assertTrue($result['success']);
        $this->assertEquals('Xóa thành công.', $result['message']);
        $this->assertSoftDeleted('categories', [
            'category_id' => $category->category_id,
        ]);
    }
}

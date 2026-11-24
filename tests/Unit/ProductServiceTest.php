<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Product;
use App\Models\Category;
use App\Services\ProductService;

class ProductServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_search_loc_theo_khoang_gia_tra_ve_dung_ket_qua(): void
    {
        $category = Category::create([
            'category_name' => 'Danh mục test',
            'slug'          => 'danh-muc-test-' . uniqid(),
        ]);

        $catId = $category->category_id ?? $category->id;

        Product::create([
            'product_name' => 'Sách giá rẻ test',
            'author'       => 'Tác giả A',
            'price'        => 40000,
            'stock'        => 10,
            'category_id'  => $catId,
            'status'       => 1,
            'image'        => '/uploads/products/test-1.jpg',
            'slug'         => 'sach-gia-re-test-' . uniqid(),
        ]);

        Product::create([
            'product_name' => 'Sách trong khoảng giá test',
            'author'       => 'Tác giả B',
            'price'        => 120000,
            'stock'        => 10,
            'category_id'  => $catId,
            'status'       => 1,
            'image'        => '/uploads/products/test-2.jpg',
            'slug'         => 'sach-trong-khoang-gia-test-' . uniqid(),
        ]);

        Product::create([
            'product_name' => 'Sách giá cao test',
            'author'       => 'Tác giả C',
            'price'        => 350000,
            'stock'        => 10,
            'category_id'  => $catId,
            'status'       => 1,
            'image'        => '/uploads/products/test-3.jpg',
            'slug'         => 'sach-gia-cao-test-' . uniqid(),
        ]);

        $service = new ProductService();
        $results = $service->search(
            keyword: 'test',
            minPrice: 80000,
            maxPrice: 200000
        );

        $this->assertEquals(1, $results->total());
        $this->assertEquals('Sách trong khoảng giá test', $results->items()[0]->product_name);
    }
}
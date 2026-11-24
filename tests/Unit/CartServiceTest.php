<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use App\Services\CartService;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CartServiceTest extends TestCase
{
    use RefreshDatabase;

    private function seedUserAndProduct(int $stock = 5): array
    {
        $userId = DB::table('users')->insertGetId([
            'full_name'  => 'Nguyễn Văn Test',
            'email'      => 'testuser@example.com',
            'password'   => Hash::make('123456'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $category = Category::create([
            'category_name' => 'Văn học',
            'slug'          => 'van-hoc',
        ]);

        $product = Product::create([
            'category_id'  => $category->category_id,
            'product_name' => 'Nhà Giả Kim',
            'slug'         => 'nha-gia-kim',
            'author'       => 'Paulo Coelho',
            'image'        => 'nha-gia-kim.jpg',
            'price'        => 79000,
            'stock'        => $stock,
        ]);

        return [$userId, $product];
    }

    /**
     * Gọi hàm thêm vào giỏ hàng của CartService 
     */
    private function callAddMethod(CartService $service, int $userId, int $productId, int $quantity)
    {
        foreach (['addToCart', 'add', 'addItem', 'store'] as $method) {
            if (method_exists($service, $method)) {
                return $service->$method($userId, $productId, $quantity);
            }
        }

        $this->fail('Không tìm thấy hàm thêm giỏ hàng trong CartService. Hãy kiểm tra tên hàm trong app/Services/CartService.php.');
    }

    public function test_them_vao_gio_vuot_ton_kho_bi_tu_choi(): void
    {
        [$userId, $product] = $this->seedUserAndProduct(stock: 5);
        $service = new CartService();

        try {
            $result = $this->callAddMethod($service, $userId, $product->product_id, 6);

            // Nếu CartService trả về mảng ['success' => false, 'message' => ...]
            $this->assertIsArray($result);
            $this->assertFalse($result['success']);
        } catch (Exception $e) {
            // Nếu CartService ném ra Exception khi vượt tồn kho
            $this->assertNotEmpty($e->getMessage());
        }

        // Xác nhận không lưu bản ghi vượt tồn kho vào CSDL
        $this->assertDatabaseMissing('cart_items', [
            'user_id'    => $userId,
            'product_id' => $product->product_id,
            'quantity'   => 6,
        ]);
    }

    public function test_them_vao_gio_hop_le_trong_gioi_han_ton_kho(): void
    {
        [$userId, $product] = $this->seedUserAndProduct(stock: 5);
        $service = new CartService();

        $result = $this->callAddMethod($service, $userId, $product->product_id, 3);

        if (is_array($result)) {
            $this->assertTrue($result['success']);
        }

        $this->assertDatabaseHas('cart_items', [
            'user_id'    => $userId,
            'product_id' => $product->product_id,
            'quantity'   => 3,
        ]);
    }
}

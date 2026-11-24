<?php
// AI-assisted [AI-05]
namespace Tests\Feature;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Category;

class OrderServiceTest extends TestCase
{
    use RefreshDatabase;

    private OrderService $orderService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->orderService = new OrderService();
    }

    public function test_dat_hang_thanh_cong(): void
    {
        $user = User::create([
            'full_name' => 'customer_test_1',
            'email'    => 'test1@example.com',
            'password' => bcrypt('password'),
        ]);
        $category = Category::create([
            'category_name' => 'Sách Test', 
            'slug'          => 'sach-test', 
        ]);
        $categoryId = $category->getKey(); 
        $product = Product::create([
            'product_name' => 'Sách Laravel Nâng Cao',
            'author'       => 'Tác giả Test',
            'image'        => 'test/test.jpg',
            'price'        => 100000,
            'stock'        => 10,
            'slug'         => 'sach-laravel-nang-cao',
            'category_id'  => $categoryId
        ]);

        $cartItem = CartItem::create([
            'user_id'    => $user->getKey(),
            'product_id' => $product->product_id,
            'quantity'   => 2,
            'is_delete'  => false,
        ]);

        $order = $this->orderService->placeOrder($user->getKey(), [
            'recipient_name'   => 'Nguyễn Văn Test',
            'recipient_phone'  => '0901234567',
            'shipping_address' => 'Sóc Trăng',
            'voucher_id'       => null,
        ]);

        $this->assertEquals($user->getKey(), $order->user_id);
        $this->assertEquals('PENDING', $order->status);
        $this->assertEquals(200000, (float) $order->total_amount);

        // Trừ tồn kho đúng
        $this->assertEquals(8, $product->fresh()->stock);

        // Tạo order_items đúng kèm user_id
        $this->assertDatabaseHas('order_items', [
            'user_id'    => $user->getKey(),
            'order_id'   => $order->order_id,
            'product_id' => $product->product_id,
            'quantity'   => 2,
            'unit_price' => 100000,
            'subtotal'   => 200000,
        ]);

        // Giỏ hàng đã cập nhật is_delete = true và soft-deleted
        $this->assertSoftDeleted('cart_items', [
            'cart_id'   => $cartItem->cart_id,
            'is_delete' => true,
        ]);
    }

    public function test_dat_vuot_ton_kho_bi_tu_choi_va_rollback(): void
    {
        $user = User::create([
            'full_name' => 'customer_test_1', 
            'email'    => 'test1@example.com',
            'password' => bcrypt('password'),
        ]);
        $category = Category::create([
            'category_name' => 'Sách Test',
            'slug'          => 'sach-test',
        ]);
        $categoryId = $category->getKey(); 
        $productOk = Product::create([
            'product_name' => 'Sách Đủ Hàng',
            'author'       => 'Tác giả Test',
            'image'        => 'test/test.jpg',
            'price'        => 50000,
            'stock'        => 5,
            'slug'         => 'sach-du-hang',
            'category_id'  => $categoryId
        ]);
        $productOut = Product::create([
            'product_name' => 'Sách Thiếu Hàng',
            'author'       => 'Tác giả Test',
            'image'        => 'test/test.jpg',
            'price'        => 70000,
            'stock'        => 1,
            'slug'         => 'sach-thieu-hang',
            'category_id'  => $categoryId
        ]);

        CartItem::create([
            'user_id'    => $user->getKey(),
            'product_id' => $productOk->product_id,
            'quantity'   => 2,
            'is_delete'  => false,
        ]);
        CartItem::create([
            'user_id'    => $user->getKey(),
            'product_id' => $productOut->product_id,
            'quantity'   => 3,
            'is_delete'  => false,
        ]);

        try {
            $this->orderService->placeOrder($user->getKey());
            $this->fail('Kỳ vọng phải ném Exception khi đặt vượt tồn kho.');
        } catch (Exception $e) {
            $this->assertEquals("Sản phẩm 'Sách Thiếu Hàng' không đủ hàng trong kho.", $e->getMessage());
        }

        // Rollback toàn bộ: tồn kho giữ nguyên, không tạo order/order_items, giỏ hàng chưa xóa
        $this->assertEquals(5, $productOk->fresh()->stock);
        $this->assertEquals(1, $productOut->fresh()->stock);
        $this->assertDatabaseCount('orders', 0);
        $this->assertDatabaseCount('order_items', 0);
        $this->assertDatabaseHas('cart_items', [
            'user_id'    => $user->getKey(),
            'product_id' => $productOk->product_id,
            'is_delete'  => false,
            'deleted_at' => null,
        ]);
    }
}

<?php
// AI-assisted [AI-05]
namespace Tests\Unit;

use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Voucher;
use App\Services\OrderService;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderServiceTest extends TestCase
{
    use RefreshDatabase;

    private OrderService $orderService;
    private Category $category;

    protected function setUp(): void
    {
        parent::setUp();

        $this->orderService = new OrderService();
        $this->category = Category::create([
            'category_name' => 'Sách Test',
            'slug'          => 'sach-test',
        ]);
    }

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    private function makeUser(string $email = 'test1@example.com'): User
    {
        return User::create([
            'full_name' => 'customer_test',
            'email'     => $email,
            'password'  => bcrypt('password'),
        ]);
    }

    private function makeProduct(string $name, float $price, int $stock): Product
    {
        return Product::create([
            'product_name' => $name,
            'author'       => 'Tác giả Test',
            'image'        => 'test/test.jpg',
            'price'        => $price,
            'stock'        => $stock,
            'slug'         => \Illuminate\Support\Str::slug($name) . '-' . uniqid(),
            'category_id'  => $this->category->getKey(),
        ]);
    }

    private function addToCart(User $user, Product $product, int $quantity): CartItem
    {
        return CartItem::create([
            'user_id'    => $user->getKey(),
            'product_id' => $product->product_id,
            'quantity'   => $quantity,
            'is_delete'  => false,
        ]);
    }

    /** Dữ liệu đặt hàng hợp lệ (bắt buộc có product_ids). */
    private function orderData(array $productIds, array $extra = []): array
    {
        return array_merge([
            'product_ids'      => $productIds,
            'recipient_name'   => 'Nguyễn Văn Test',
            'recipient_phone'  => '0901234567',
            'shipping_address' => 'Sóc Trăng',
            'voucher_id'       => null,
        ], $extra);
    }

    // ------------------------------------------------------------------
    // Đặt hàng thành công
    // ------------------------------------------------------------------

    public function test_dat_hang_thanh_cong(): void
    {
        $user    = $this->makeUser();
        $product = $this->makeProduct('Sách Laravel Nâng Cao', 100000, 10);
        $cart    = $this->addToCart($user, $product, 2);

        $order = $this->orderService->placeOrder(
            $user->getKey(),
            $this->orderData([$product->product_id])
        );

        $this->assertEquals($user->getKey(), $order->user_id);
        $this->assertEquals('PENDING', $order->status);
        $this->assertEquals(200000, (float) $order->total_amount);

        // Trừ tồn kho đúng
        $this->assertEquals(8, $product->fresh()->stock);

        // Tạo order_items đúng
        $this->assertDatabaseHas('order_items', [
            'user_id'    => $user->getKey(),
            'order_id'   => $order->order_id,
            'product_id' => $product->product_id,
            'quantity'   => 2,
            'unit_price' => 100000,
            'subtotal'   => 200000,
        ]);

        // Giỏ hàng bị đánh dấu is_delete và soft delete
        $this->assertSoftDeleted('cart_items', [
            'cart_id'   => $cart->cart_id,
            'is_delete' => true,
        ]);
    }

    public function test_luu_thong_tin_nguoi_nhan_va_voucher(): void
    {
        $user    = $this->makeUser();
        $product = $this->makeProduct('Sách A', 50000, 5);
        $this->addToCart($user, $product, 1);

        $voucher = Voucher::create([
            'code'            => 'GIAM10K',
            'discount_amount' => 10000,
            'expired_date'    => now()->addDays(7),
        ]);

        $order = $this->orderService->placeOrder(
            $user->getKey(),
            $this->orderData([$product->product_id], ['voucher_id' => $voucher->voucher_id])
        );

        $this->assertDatabaseHas('orders', [
            'order_id'         => $order->order_id,
            'recipient_name'   => 'Nguyễn Văn Test',
            'recipient_phone'  => '0901234567',
            'shipping_address' => 'Sóc Trăng',
            'voucher_id'       => $voucher->voucher_id,
        ]);
    }

    public function test_dat_nhieu_san_pham_tinh_tong_dung(): void
    {
        $user = $this->makeUser();
        $p1   = $this->makeProduct('Sách 1', 100000, 10);
        $p2   = $this->makeProduct('Sách 2', 45000, 10);
        $this->addToCart($user, $p1, 2); // 200.000
        $this->addToCart($user, $p2, 3); // 135.000

        $order = $this->orderService->placeOrder(
            $user->getKey(),
            $this->orderData([$p1->product_id, $p2->product_id])
        );

        $this->assertEquals(335000, (float) $order->total_amount);
        $this->assertEquals(8, $p1->fresh()->stock);
        $this->assertEquals(7, $p2->fresh()->stock);
        $this->assertDatabaseCount('order_items', 2);
        $this->assertDatabaseCount('orders', 1);
    }

    public function test_dat_dung_bang_ton_kho_thi_ton_kho_ve_0(): void
    {
        $user    = $this->makeUser();
        $product = $this->makeProduct('Sách Cuối Cùng', 80000, 3);
        $this->addToCart($user, $product, 3);

        $order = $this->orderService->placeOrder(
            $user->getKey(),
            $this->orderData([$product->product_id])
        );

        $this->assertEquals(240000, (float) $order->total_amount);
        $this->assertEquals(0, $product->fresh()->stock);
    }

    public function test_khong_anh_huong_gio_hang_cua_user_khac(): void
    {
        $user      = $this->makeUser('a@example.com');
        $otherUser = $this->makeUser('b@example.com');
        $product   = $this->makeProduct('Sách Chung', 100000, 10);
        $this->addToCart($user, $product, 1);
        $otherCart = $this->addToCart($otherUser, $product, 2);

        $this->orderService->placeOrder(
            $user->getKey(),
            $this->orderData([$product->product_id])
        );

        $this->assertEquals(9, $product->fresh()->stock);
        $this->assertDatabaseHas('cart_items', [
            'cart_id'    => $otherCart->cart_id,
            'user_id'    => $otherUser->getKey(),
            'is_delete'  => false,
            'deleted_at' => null,
        ]);
    }

    // ------------------------------------------------------------------
    // Dữ liệu không hợp lệ
    // ------------------------------------------------------------------

    public function test_gio_hang_trong_bi_tu_choi(): void
    {
        $user    = $this->makeUser();
        $product = $this->makeProduct('Sách Chưa Thêm Giỏ', 50000, 5);

        try {
            $this->orderService->placeOrder($user->getKey(), $this->orderData([$product->product_id]));
            $this->fail('Kỳ vọng phải ném Exception khi giỏ hàng trống.');
        } catch (Exception $e) {
            $this->assertEquals('Giỏ hàng trống.', $e->getMessage());
        }

        $this->assertDatabaseCount('orders', 0);
        $this->assertEquals(5, $product->fresh()->stock);
    }

    // ------------------------------------------------------------------
    // Tồn kho và rollback
    // ------------------------------------------------------------------

    public function test_dat_vuot_ton_kho_bi_tu_choi_va_rollback(): void
    {
        $user       = $this->makeUser();
        $productOk  = $this->makeProduct('Sách Đủ Hàng', 50000, 5);
        $productOut = $this->makeProduct('Sách Thiếu Hàng', 70000, 1);
        $this->addToCart($user, $productOk, 2);
        $this->addToCart($user, $productOut, 3);

        try {
            $this->orderService->placeOrder(
                $user->getKey(),
                $this->orderData([$productOk->product_id, $productOut->product_id])
            );
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
        $this->assertDatabaseHas('cart_items', [
            'user_id'    => $user->getKey(),
            'product_id' => $productOut->product_id,
            'is_delete'  => false,
            'deleted_at' => null,
        ]);
    }

    public function test_dat_het_hang_bi_tu_choi(): void
    {
        $user    = $this->makeUser();
        $product = $this->makeProduct('Sách Hết Hàng', 50000, 0);
        $this->addToCart($user, $product, 1);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Sản phẩm 'Sách Hết Hàng' không đủ hàng trong kho.");

        $this->orderService->placeOrder($user->getKey(), $this->orderData([$product->product_id]));
    }

    public function test_dat_hang_thanh_cong_chi_tao_mot_order(): void
    {
        $user    = $this->makeUser();
        $product = $this->makeProduct('Sách A', 50000, 5);
        $this->addToCart($user, $product, 1);

        $this->orderService->placeOrder($user->getKey(), $this->orderData([$product->product_id]));

        $this->assertEquals(1, Order::where('user_id', $user->getKey())->count());
    }

    // ------------------------------------------------------------------
    // Hai phiên cùng đặt cuốn sách cuối cùng
    // ------------------------------------------------------------------

    public function test_hai_phien_cung_dat_cuon_cuoi_cung_chi_mot_don_thanh_cong(): void
    {
        $product = $this->makeProduct('Sách Còn 1 Cuốn', 100000, 1);

        $userA = $this->makeUser('a@example.com');
        $userB = $this->makeUser('b@example.com');
        $this->addToCart($userA, $product, 1);
        $cartB = $this->addToCart($userB, $product, 1);

        $thanhCong = 0;
        $thatBai   = 0;
        $thongBao  = null;

        // Hai phiên (hai user) lần lượt đặt cùng một sản phẩm chỉ còn 1 cuốn
        foreach ([$userA, $userB] as $user) {
            try {
                $this->orderService->placeOrder(
                    $user->getKey(),
                    $this->orderData([$product->product_id])
                );
                $thanhCong++;
            } catch (Exception $e) {
                $thatBai++;
                $thongBao = $e->getMessage();
            }
        }

        $this->assertSame(1, $thanhCong, 'Chỉ đúng 1 đơn được phép thành công.');
        $this->assertSame(1, $thatBai, 'Phiên còn lại phải bị từ chối.');
        $this->assertEquals("Sản phẩm 'Sách Còn 1 Cuốn' không đủ hàng trong kho.", $thongBao);

        // Tồn kho về 0, không âm
        $this->assertEquals(0, $product->fresh()->stock);
        $this->assertGreaterThanOrEqual(0, $product->fresh()->stock);

        // Chỉ có 1 đơn và 1 order_item
        $this->assertDatabaseCount('orders', 1);
        $this->assertDatabaseCount('order_items', 1);
        $this->assertDatabaseHas('orders', ['user_id' => $userA->getKey()]);
        $this->assertDatabaseMissing('orders', ['user_id' => $userB->getKey()]);

        // Phiên thất bại: giỏ hàng vẫn còn nguyên
        $this->assertDatabaseHas('cart_items', [
            'cart_id'    => $cartB->cart_id,
            'is_delete'  => false,
            'deleted_at' => null,
        ]);
    }

    public function test_nhieu_phien_tranh_nhau_ton_kho_khong_bao_gio_am(): void
    {
        $tonKho  = 3;
        $soPhien = 6;
        $product = $this->makeProduct('Sách Khan Hiếm', 50000, $tonKho);

        $users = [];
        for ($i = 1; $i <= $soPhien; $i++) {
            $user = $this->makeUser("user{$i}@example.com");
            $this->addToCart($user, $product, 1);
            $users[] = $user;
        }

        $thanhCong = 0;
        $thatBai   = 0;

        foreach ($users as $user) {
            try {
                $this->orderService->placeOrder(
                    $user->getKey(),
                    $this->orderData([$product->product_id])
                );
                $thanhCong++;
            } catch (Exception $e) {
                $thatBai++;
            }
        }

        $this->assertSame($tonKho, $thanhCong);
        $this->assertSame($soPhien - $tonKho, $thatBai);
        $this->assertEquals(0, $product->fresh()->stock);
        $this->assertDatabaseCount('orders', $tonKho);
        $this->assertDatabaseCount('order_items', $tonKho);
    }
}

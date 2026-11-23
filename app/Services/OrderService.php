<?php
// AI-assisted [AI-04]
namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;

class OrderService
{
    /**
     * Xử lý luồng đặt hàng
     *
     * @param int $userId
     * @param array $orderData
     * @return Order
     * @throws Exception
     */
    public function placeOrder(int $userId, array $orderData = [])
    {
        return DB::transaction(function () use ($userId, $orderData) {
            // 1. Đọc giỏ hàng của user kèm theo thông tin sản phẩm
            $cartItems = CartItem::with('product')->where('user_id', $userId)->get();

            if ($cartItems->isEmpty()) {
                throw new Exception("Giỏ hàng trống.");
            }

            $totalAmount = 0;
            $orderItemsData = [];

            // Kiểm tra tồn kho
            foreach ($cartItems as $item) {
                $product = Product::where('product_id', $item->product_id)->lockForUpdate()->first();

                if (!$product || $product->stock < $item->quantity) {
                    $prodName = $product->product_name ?? 'Sản phẩm';
                    throw new Exception("Sản phẩm '{$prodName}' không đủ hàng trong kho.");
                }

                $subtotal = $product->price * $item->quantity;
                $totalAmount += $subtotal;

                // Chuẩn bị dữ liệu cho OrderItem
                $orderItemsData[] = [
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'unit_price' => $product->price,
                    'subtotal'   => $subtotal,
                ];

                // Trừ tồn kho
                $product->stock -= $item->quantity;
                $product->save();
            }

            // 3. Tạo Order 
            $order = Order::create([
                'user_id'          => $userId,
                'total_amount'     => $totalAmount,
                'status'           => 'PENDING',
                'order_date'       => now(),
                'recipient_name'   => $orderData['recipient_name'] ?? null,
                'recipient_phone'  => $orderData['recipient_phone'] ?? null,
                'shipping_address' => $orderData['shipping_address'] ?? null,
                'voucher_id'       => $orderData['voucher_id'] ?? null,
            ]);

            // Tạo các OrderItems liên kết với Order vừa tạo
            foreach ($orderItemsData as $itemData) {
                OrderItem::create([
                    'user_id'    => $userId,
                    'order_id'   => $order->order_id,
                    'product_id' => $itemData['product_id'],
                    'quantity'   => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                    'subtotal'   => $itemData['subtotal'],
                ]);
            }

            // 5. Xóa giỏ hàng của user sau khi đặt thành công
            $itemsToDelete = CartItem::where('user_id', $userId)
                ->where('is_delete', false)
                ->get();

            foreach ($itemsToDelete as $item) {
                $item->update(['is_delete' => true]);
                $item->delete();
            }

            return $order;
        });
    }
}

<?php
// AI-assisted [AI-04]
namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;

class CartService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function add($userId, $productId, $qty = 1)
    {
        $product = Product::find($productId);

        if (!$product) {
            return [
                'success' => false,
                'message' => 'Sản phẩm không tồn tại'
            ];
        }

        if (!$product->status) {
            return [
                'success' => false,
                'message' => 'Sản phẩm này hiện đã ngừng kinh doanh'
            ];
        }

        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {

            $newQty = $cartItem->quantity + $qty;

            if ($newQty > $product->stock) {
                return [
                    'success' => false,
                    'message' => 'Số lượng vượt tồn kho'
                ];
            }

            $cartItem->quantity = $newQty;
            $cartItem->save();
        } else {

            if ($qty > $product->stock) {
                return [
                    'success' => false,
                    'message' => 'Số lượng vượt tồn kho'
                ];
            }

            CartItem::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $qty,
            ]);
        }

        return [
            'success' => true,
            'message' => 'Thêm vào giỏ hàng thành công'
        ];
    }
}

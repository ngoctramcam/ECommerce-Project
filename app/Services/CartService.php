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

        // Tìm cả các bản ghi đã xóa mềm (SoftDeletes) để tránh lỗi trùng khóa unique (user_id, product_id)
        $cartItem = CartItem::withTrashed()
            ->where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            // Nếu sản phẩm này từng bị xóa khỏi giỏ trước đó -> khôi phục lại với số lượng mới
            if ($cartItem->trashed()) {
                if ($qty > $product->stock) {
                    return [
                        'success' => false,
                        'message' => 'Số lượng vượt tồn kho'
                    ];
                }

                $cartItem->restore();
                $cartItem->quantity = $qty;
                $cartItem->save();
            } else {
                // Đang nằm trong giỏ -> cộng dồn số lượng
                $newQty = $cartItem->quantity + $qty;

                if ($newQty > $product->stock) {
                    return [
                        'success' => false,
                        'message' => 'Số lượng vượt tồn kho'
                    ];
                }

                $cartItem->quantity = $newQty;
                $cartItem->save();
            }
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

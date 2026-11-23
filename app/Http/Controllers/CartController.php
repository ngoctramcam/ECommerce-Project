<?php
// AI-assisted [AI-04]
namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use App\Services\CartService;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    protected $cartService;

    // Tiêm CartService vào Controller thông qua Dependency Injection
    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }
    // Lấy danh sách giỏ hàng của user (dùng cho Header & trang Giỏ hàng)
    public function index(Request $request)
    {
        $userId = $request->query('user_id') ?? Auth::id();
        if (!$userId) {
            return response()->json(['message' => 'Chưa đăng nhập'], 401);
        }

        $items = CartItem::with('product')
            ->where('user_id', $userId)
            ->get();

        return response()->json($items);
    }
    // Thêm vào giỏ hàng
    public function add(Request $request)
    {
        $request->validate([
            'user_id'    => 'required|integer',
            'product_id' => 'required|integer',
            'qty'        => 'nullable|integer|min:1',
        ]);

        $result = $this->cartService->add(
            $request->user_id,
            $request->product_id,
            $request->qty ?? 1
        );

        if (!$result['success']) {
            return response()->json($result, 422);
        }

        return response()->json($result, 200);
    }
    // Cập nhật số lượng (+ / -) trong trang giỏ hàng (có kiểm tra tồn kho)
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::with('product')->findOrFail($id);

        if ($cartItem->product && $request->quantity > $cartItem->product->stock) {
            return response()->json([
                'success' => false,
                'message' => 'Số lượng vượt tồn kho (tối đa ' . $cartItem->product->stock . ')',
            ], 422);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json([
            'success' => true,
            'data'    => $cartItem,
        ]);
    }

    //  Xóa 1 sản phẩm khỏi giỏ hàng
    public function destroy($id)
    {
        CartItem::destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa sản phẩm khỏi giỏ hàng',
        ]);
    }
}

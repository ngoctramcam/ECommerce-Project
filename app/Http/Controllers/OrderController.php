<?php
//[AI-assisted: Gemini [AI-06]
namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Services\OrderService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct(private readonly OrderService $orderService) {}

    // =========================================================================
    // 1. ĐẶT HÀNG TỪ GIỎ HÀNG (Code của nhóm)
    // =========================================================================
    public function store(OrderRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $userId = (int) ($request->user()?->getKey() ?? $validated['user_id'] ?? 0);

        if ($userId <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Vui lòng đăng nhập để đặt hàng.',
            ], 401);
        }

        $orderData = [
            'recipient_name'   => trim($validated['receiver_name']),
            'recipient_phone'  => preg_replace('/\s+/', '', $validated['receiver_phone']),
            'shipping_address' => trim($validated['shipping_address']),
            'voucher_id'       => $validated['voucher_id'] ?? null,
        ];

        try {
            $order = $this->orderService->placeOrder($userId, $orderData);

            return response()->json([
                'success' => true,
                'message' => 'Đặt hàng thành công!',
                'data'    => $order,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    // =========================================================================
    // 2. KHÁCH HÀNG: XEM ĐƠN HÀNG & HỦY / XÁC NHẬN NHẬN HÀNG
    // =========================================================================
    public function index(Request $request): JsonResponse
    {
        $userId = Auth::id() ?? $request->query('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Vui lòng đăng nhập'], 401);
        }

        // Eager load sẵn sản phẩm trong đơn (orderItems.product) và mã giảm giá (voucher)
        $orders = Order::with(['orderItems.product', 'voucher'])
            ->where('user_id', $userId)
            ->orderByDesc('order_id')
            ->get();

        $result = $orders->map(function ($order) {
            $items = $order->orderItems->map(function ($item) {
                return [
                    'product_id'   => $item->product_id,
                    'product_name' => $item->product->product_name ?? 'Sản phẩm không còn tồn tại',
                    'author'       => $item->product->author ?? '',
                    'image'        => $item->product->image ?? '',
                    'quantity'     => $item->quantity,
                    'price'        => $item->unit_price,
                    'subtotal'     => $item->subtotal ?? ($item->unit_price * $item->quantity),
                ];
            });

            // Tính tiền giảm giá (nếu có áp dụng voucher)
            $rawSubtotal = $items->sum('subtotal');
            $discountAmount = $order->voucher_id && $rawSubtotal > $order->total_amount
                ? ($rawSubtotal - $order->total_amount)
                : ($order->voucher->discount_amount ?? 0);

            return [
                'id'               => $order->order_id,
                'order_code'       => 'DH' . str_pad($order->order_id, 3, '0', STR_PAD_LEFT),
                'order_date'       => $order->order_date
                    ? date('d/m/Y', strtotime($order->order_date))
                    : ($order->created_at ? $order->created_at->format('d/m/Y') : ''),
                'status'           => $order->status ?? 'pending',
                'receiver_name'    => $order->recipient_name ?? '',
                'receiver_phone'   => $order->recipient_phone ?? '',
                'shipping_address' => $order->shipping_address ?? '',
                'payment_method'   => $order->payment_method ?? 'COD',
                'voucher_code'     => $order->voucher->code ?? $order->voucher->voucher_code ?? null,
                'discount_amount'  => $discountAmount,
                'total_amount'     => $order->total_amount ?? 0,
                'items'            => $items,
            ];
        });

        return response()->json($result);
    }

    // Khách hàng xác nhận "Đã nhận" (completed) hoặc "Hủy đơn / Không nhận" (cancelled)
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:completed,cancelled',
        ]);

        return DB::transaction(function () use ($request, $id) {
            $order = Order::with('orderItems.product')
                ->where('order_id', $id)
                ->lockForUpdate()
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng'], 404);
            }

            // Kiểm tra trạng thái cũ để tránh hoàn kho 2 lần nếu đơn đã hủy trước đó
            $oldStatus = mb_strtolower(trim($order->status ?? ''), 'UTF-8');
            $isAlreadyCancelled = in_array($oldStatus, ['cancelled', 'đã hủy', 'không nhận']);

            // Nếu chuyển sang hủy đơn (cancelled) và trước đó chưa từng hủy -> Hoàn lại tồn kho
            if ($request->status === 'cancelled' && !$isAlreadyCancelled) {
                foreach ($order->orderItems as $item) {
                    if ($item->product) {
                        $item->product->increment('stock', $item->quantity);
                    }
                }
            }

            $order->status = $request->status;
            $order->save();

            return response()->json([
                'message' => 'Cập nhật trạng thái đơn hàng thành công',
                'order'   => $order,
            ]);
        });
    }

    // =========================================================================
    // 3. ADMIN (TM-13): DANH SÁCH LỌC TRẠNG THÁI & CHUYỂN TRẠNG THÁI 1 CHIỀU
    // =========================================================================
    public function adminIndex(Request $request): JsonResponse
    {
        $statusFilter = trim((string) $request->query('status', ''));

        $query = Order::with(['orderItems.product', 'voucher', 'user'])
            ->orderByDesc('order_id');

        if ($statusFilter !== '' && $statusFilter !== 'all') {
            $statusMap = [
                'pending'   => ['pending', 'Chờ xác nhận', 'Chưa xác nhận'],
                'shipping'  => ['shipping', 'Đang giao', 'Đang giao hàng'],
                'completed' => ['completed', 'Hoàn thành', 'Đã giao'],
                'cancelled' => ['cancelled', 'Đã hủy', 'Không nhận'],
            ];

            if (isset($statusMap[$statusFilter])) {
                $query->whereIn('status', $statusMap[$statusFilter]);
            } else {
                $query->where('status', $statusFilter);
            }
        }

        $orders = $query->get();

        $result = $orders->map(function ($order) {
            $items = $order->orderItems->map(function ($item) {
                return [
                    'product_id'   => $item->product_id,
                    'product_name' => $item->product->product_name ?? 'Sản phẩm không còn tồn tại',
                    'image'        => $item->product->image ?? '',
                    'quantity'     => $item->quantity,
                    'price'        => $item->unit_price,
                    'subtotal'     => $item->subtotal ?? ($item->unit_price * $item->quantity),
                ];
            });

            return [
                'id'               => $order->order_id,
                'order_code'       => 'DH' . str_pad($order->order_id, 3, '0', STR_PAD_LEFT),
                'order_date'       => $order->order_date
                    ? date('d/m/Y', strtotime($order->order_date))
                    : ($order->created_at ? $order->created_at->format('d/m/Y') : ''),
                'status'           => $order->status ?? 'pending',
                'receiver_name'    => $order->recipient_name ?? ($order->user->name ?? ''),
                'receiver_phone'   => $order->recipient_phone ?? '',
                'shipping_address' => $order->shipping_address ?? '',
                'payment_method'   => $order->payment_method ?? 'COD',
                'total_amount'     => $order->total_amount ?? 0,
                'items'            => $items,
            ];
        });

        return response()->json($result);
    }

    public function adminUpdateStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:pending,shipping,completed,cancelled',
        ]);

        return DB::transaction(function () use ($request, $id) {
            $order = Order::with('orderItems.product')
                ->where('order_id', $id)
                ->lockForUpdate()
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng'], 404);
            }

            $rawCurrent = mb_strtolower(trim($order->status ?? 'pending'), 'UTF-8');
            $currentStatus = match (true) {
                in_array($rawCurrent, ['pending', 'chờ xác nhận', 'chưa xác nhận']) => 'pending',
                in_array($rawCurrent, ['shipping', 'đang giao', 'đang giao hàng'])   => 'shipping',
                in_array($rawCurrent, ['completed', 'hoàn thành', 'đã giao'])       => 'completed',
                in_array($rawCurrent, ['cancelled', 'đã hủy', 'không nhận'])        => 'cancelled',
                default => 'pending',
            };

            $nextStatus = $request->status;

            // Luồng một chiều: Chờ xác nhận -> Đang giao -> Hoàn thành (hoặc -> Đã hủy)
            $allowedTransitions = [
                'pending'   => ['shipping', 'cancelled'],
                'shipping'  => ['completed', 'cancelled'],
                'completed' => [],
                'cancelled' => [],
            ];

            if (!in_array($nextStatus, $allowedTransitions[$currentStatus])) {
                return response()->json([
                    'message' => 'Không thể chuyển trạng thái ngược hoặc thay đổi đơn hàng đã kết thúc!',
                ], 422);
            }

            if ($nextStatus === 'cancelled') {
                foreach ($order->orderItems as $item) {
                    if ($item->product) {
                        $item->product->increment('stock', $item->quantity);
                    }
                }
            }

            $order->status = $nextStatus;
            $order->save();

            return response()->json([
                'message' => 'Cập nhật trạng thái đơn hàng thành công',
                'order'   => $order,
            ]);
        });
    }
}

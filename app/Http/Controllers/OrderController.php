<?php
//AI-assisted [AI-06]
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Exception;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(private readonly OrderService $orderService)
    {
    }

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
}
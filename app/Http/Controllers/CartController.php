<?php
// AI-assisted [AI-04]
namespace App\Http\Controllers;

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

    public function add(Request $request)
    {
        $result = $this->cartService->add(
            Auth::id(),
            $request->product_id,
            1
        );

        return redirect()->back()
            ->with(
                $result['success'] ? 'success' : 'error',
                $result['message']
            );
    }
}

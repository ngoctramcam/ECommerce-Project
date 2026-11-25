<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ProductService;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AdminAuthMiddleware;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RatingController;

use App\Http\Controllers\VoucherController;
use App\Http\Controllers\ProfileController;
// Route trang chủ
Route::get('/', function () {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return redirect('/admin');
    }
    return view('welcome');
})->name('home');

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        $dbName = DB::connection()->getDatabaseName();
        return 'Kết nối CSDL thành công: ' . $dbName;
    } catch (Exception $e) {
        return 'Kết nối thất bại: ' . $e->getMessage();
    }
});

// [(TV3)]: Bổ sung route POST /register vì TV2 đã viết sẵn hàm register() trong AuthController nhưng chưa khai báo đường dẫn ở đây
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/auth/me', [AuthController::class, 'me']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

//T5 Giỏ hàng
Route::get('/api/cart', [CartController::class, 'index']);
Route::post('/api/cart/add', [CartController::class, 'add']);
Route::put('/api/cart/{id}', [CartController::class, 'update']);
Route::delete('/api/cart/{id}', [CartController::class, 'destroy']);
//TV5: Quản lý đơn hàng
Route::get('/api/orders', [OrderController::class, 'index']);
Route::patch('/api/orders/{id}/status', [OrderController::class, 'updateStatus']);

// TV4: Công khai (Bên ngoài Admin - chỉ cho phép xem danh sách & chi tiết)
Route::apiResource('api/products', ProductController::class)->only(['index', 'show']);
Route::apiResource('api/categories', CategoryController::class)->only(['index', 'show']);
// [TV3 - TM-02]: Tìm kiếm, lọc, sắp xếp và phân trang 12 sách/trang
Route::get('/api/books/search', function (Request $request, ProductService $productService) {
    return response()->json(
        $productService->search(
            $request->query('keyword'),
            $request->query('categoryId'),
            $request->query('minPrice'),
            $request->query('maxPrice'),
            $request->query('sort', 'newest'),
            (int) $request->query('page', 1)
        )
    );
});
Route::get('/api/vouchers/check', [VoucherController::class, 'check']);
Route::post('api/orders', [OrderController::class, 'store']);
Route::get('/api/products/{productId}/ratings', [RatingController::class, 'index']);
Route::middleware([AdminAuthMiddleware::class])->group(function () {
    Route::get('/admin/{any?}', function () {
        return view('welcome');
    })->where('any', '.*')->name('admin.dashboard');
    //TV4: CURD Category (Chỉ thêm/sửa/xóa bên trong Admin)
    Route::apiResource('api/categories', CategoryController::class)->except(['index', 'show']);

    // TV4: CRUD sản phẩm (Bên trong Admin mới được thêm, sửa, ẩn/hiện, xóa)
    Route::apiResource('api/products', ProductController::class)->except(['index', 'show']);
    Route::patch('api/products/{id}/toggle-status', [ProductController::class, 'toggleStatus']);

    //TV5: Quan ly don hang
    Route::get('/api/admin/orders', [OrderController::class, 'adminIndex']);
    Route::patch('/api/admin/orders/{id}/status', [OrderController::class, 'adminUpdateStatus']);

    //Phần Vinh làm
    Route::get('users', [UserController::class, 'index']);
    Route::patch('/users/{id}/toggle-lock', [UserController::class, 'toggleLock']);


    //TV5: Quản lý mã giảm giá (Voucher)
    Route::get('/api/admin/vouchers', [VoucherController::class, 'index']);
    Route::post('/api/admin/vouchers', [VoucherController::class, 'store']);
    Route::put('/api/admin/vouchers/{id}', [VoucherController::class, 'update']);
    Route::delete('/api/admin/vouchers/{id}', [VoucherController::class, 'destroy']);
});
//Route cho ProfilePage
Route::middleware('auth')->group(function () {
    Route::get('/api/profile', [ProfileController::class, 'show']);
    Route::put('/api/profile', [ProfileController::class, 'update']);
    Route::put('/api/profile/password', [ProfileController::class, 'changePassword']);
    //Phần Vinh làm nha mấy bạn

    Route::post('/api/products/{productId}/ratings', [RatingController::class, 'store']);
});

////////////1
// [(TV3) ]: Route hứng toàn bộ đường dẫn phía React (/login, /register...) đặt ở cuối cùng để khi bấm F5 không bị lỗi 404
Route::get('/{any}', function () {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return redirect('/admin');
    }
    return view('welcome');
})->where('any', '^(?!api/).*$');

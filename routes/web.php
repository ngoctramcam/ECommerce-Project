<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AdminAuthMiddleware;
use App\Http\Controllers\CategoryController;

// Route trang chủ
Route::get('/', function () {
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
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


Route::middleware([AdminAuthMiddleware::class])->group(function () {
    Route::get('/admin', function () {
        return view('welcome');
    })->name('admin.dashboard');
    Route::resource('categories', CategoryController::class);
});

// [(TV3) ]: Route hứng toàn bộ đường dẫn phía React (/login, /register...) đặt ở cuối cùng để khi bấm F5 không bị lỗi 404
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

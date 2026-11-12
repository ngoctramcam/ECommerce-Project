<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AdminAuthMiddleware;

Route::get('/', function () {
    return view('welcome');
})->name('home');


//Test kết nối CSDL
Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo(); // Thực hiện gọi kết nối thử đến PDO
        $dbName = DB::connection()->getDatabaseName();
        return 'Kết nối CSDL thành công';
    } catch (Exception $e) {
        return 'Kết nối thất bại';
    }
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware([AdminAuthMiddleware::class])->group(function () {
    Route::get('/admin', function () {
        // Trả về giao diện quản trị hoặc dữ liệu admin của nhóm
        return view('welcome');
    })->name('admin.dashboard');
});

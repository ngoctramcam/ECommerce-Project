<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});


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
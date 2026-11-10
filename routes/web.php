<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-db', function () {
    $isConnected = DB::connection()->getDatabaseName()? true: false;
    if ($isConnected)
        return 'Đã kết nối CSDL thành công!';
    return 'Kết nối CSDL thất bại';
});
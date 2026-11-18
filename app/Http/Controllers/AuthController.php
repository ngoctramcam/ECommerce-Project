<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class AuthController extends Controller
{
    //  Khởi tạo AuthService xử lý nghiệp vụ
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Đăng ký tài khoản thành công.',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? null,
                ]
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không đúng định dạng.',
            'password.required' => 'Vui lòng nhập mật khẩu.',
        ]);

        $result = $this->authService->login($credentials);

        if (!$result['success']) {
            // [ (TV3) ]: Nếu gọi từ React (axios) thì trả về lỗi JSON 401 để hiện khung cảnh báo đỏ trên form
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message'],
                ], 401);
            }

            return back()->withErrors(['email' => $result['message']])->withInput();
        }

        $user = $result['user'];
        $redirectUrl = $user->role === 'admin' ? '/admin' : '/';

        // [(TV3) ]: Trả về JSON chứa thông tin user (name, email, role) để React lưu và hiển thị lên Header
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Đăng nhập thành công.',
                'user' => [
                    'id' => $user->user_id,
                    'name' => $user->full_name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'redirect' => $redirectUrl,
            ]);
        }

        return redirect($redirectUrl);
    }

    public function logout(Request $request)
    {
        $this->authService->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // [ (TV3) ]: Trả về JSON báo thành công cho nút Đăng xuất trên Header React
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Đăng xuất thành công.',
            ]);
        }

        // [ (TV3) ]: Đổi từ route('login') sang '/login' vì TV2 chưa đặt tên route('login') trong web.php
        return redirect('/login');
    }
}

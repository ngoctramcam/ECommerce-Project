<?php
// AI-assisted [AI-03]

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function register(array $data): User
    {
        return User::create([
            'full_name' => $data['full_name'],
            'email'     => $data['email'],
            'password'  => Hash::make($data['password']),
            'phone'     => $data['phone']
        ]);
    }

    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        // Kiểm tra tồn tại và khớp mật khẩu
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return [
                'success' => false,
                'message' => 'Email hoặc mật khẩu không chính xác.',
            ];
        }
        
        if (isset($user->status) && $user->status === 'locked') {
            return [
                'success' => false,
                'message' => 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.',
            ];
        }

        // Tạo Session đăng nhập
        Auth::login($user);
        request()->session()->regenerate();

        return [
            'success' => true,
            'user' => $user,
        ];
    }

    public function logout(): void
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}

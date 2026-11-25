<?php
// AI-assisted [AI-07]
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthMiddleware
{
public function handle(Request $request, Closure $next)
{
    $user = $request->user() ?? Auth::user();
    $wantsJson = $request->expectsJson() || $request->is('api/*');

    if (!$user) {
        return $wantsJson
            ? response()->json(['message' => 'Vui lòng đăng nhập.'], 401)
            : redirect('/');
    }

    if ($user->role !== 'admin') {
        return $wantsJson
            ? response()->json(['message' => 'Bạn không có quyền truy cập.'], 403)
            : redirect('/');
    }

    return $next($request);
}
}
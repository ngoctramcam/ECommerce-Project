<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
      
    public function handle(Request $request, Closure $next): Response
    {
         
        // if ($request->user() && $request->user()->role === 'admin') {
        //     return $next($request);
        // } else {
        //     return redirect()->route('home');
        // }

        
        
        //Phần Vinh sửa
        $user=$request->user();
        if(!$user){
            return $request->expectsJson()
                ? response()->json(['message'=>'Chưa đăng nhập'],401)
                : redirect()->route('home');
        }
        if($user->role !=='admin'){
            return $request->expectsJson()
                ?response()->json(['message'=>'Không có quyền truy cập'],403)
                :redirect()->route('home');
        }
        return $next($request);
    }
}
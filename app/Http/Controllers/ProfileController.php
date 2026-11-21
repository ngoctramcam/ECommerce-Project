<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


class ProfileController extends Controller{
    public function show(Request $request){
        $u=$request->user();
        return response()->json($u->only(['full_name','email','phone','address']));
    }
    public function update(Request $request){
        $data=$request->validate([
            'full_name'=>['required','string','max:100'],
            'phone'=>['required','regex:/^(0|\+84)\d{9}$/'],
            'address'=>['required','string','max:255'],
        ]);

        $request->user()->update($data);
        return response()->json($request->user()->only(['full_name','email','phone','address']));
    }
    public function changePassword (Request $request){
        $data = $request->validate([
            'current_password'=>['required','string'],
            'password'=>['required','string','min:8','confirmed','different:current_password'],
        ],[
            'current_password.required'=>'Vui lòng nhập mật khẩu hiện tại.',
            'password.required'=>'Vui lòng nhập mật khẩu hiện tại.',
            'password.min'=>'Vui lòng nhập mật khẩu đủ 8 kí tự.',
            'password.confirmed'=>'Mật khẩu xác nhận không khớp.',
            'password.different'=>'Mật khẩu mới phải khác mật khẩu hiện tại.',
        ]);
        $user=$request->user();
        //Kiểm tra mật khẩu cũ ở server
        if(!Hash::check($data['current_password'],$user->getAuthPassword())){
            return response()->json([
                'message'=>'Mật khẩu hiện tại không đúng.',
                'errors'=>['current_password'=>['Mật khẩu hiện tại không đúng.']],
            ],422);
        }
        $user->forceFill(['password'=>Hash::make($data['password'])])->save();
        return response()->json(['message'=>'Đổi mật khẩu thành công.']);
    }
}
?>
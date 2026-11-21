<?php
namespace App\Http\Controllers;
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
}
?>
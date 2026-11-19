<?php
// AI-assisted [AI-xx]
namespace App\Http\Controllers;

use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private UserService $users) {}

    public function index(Request $request)
    {
        $data = $request->validate([
            'keyword' => ['nullable', 'string', 'max:100'],
            'page'    => ['nullable', 'integer', 'min:1'],
        ]);

        return response()->json(
            $this->users->list($data['keyword'] ?? null, (int) ($data['page'] ?? 1))
        );
    }
    public function toggleLock(Request $request,int $id){
        try{
            $user=$this->users->toggleLock($id,$request->user());
            return response()->json([
                'message'=>$user->status==='locked'?'Đã khóa tài khoản':'Đã mở khóa tài khoản',
                'data'=>$user,
            ]);
        }catch(\DomainException $e ){
            return response()->json(['message'=>$e->getMessage()],422);
        }
    }
}
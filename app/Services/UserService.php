<?php
//AI-assisted [AI-xx]
namespace App\Services;
use App\Models\User;
use DomainException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
class UserService{
    public function list(?string $keyword=null,int $page=1,int $perPage=10):LengthAwarePaginator{
        return User::query()
            ->select(['user_id','full_name','email','phone','address','role','status','created_at'])
            ->when($keyword,function($query,$kw){
                //Eloquent tự binding tham số
                $query->where('email','like','%'.addcslashes($kw,'%_\\').'%');                                                                                          
            })
            ->orderByDesc('user_id')
            ->paginate($perPage,["*"],'page',$page);
    }
    public function toggleLock(int $id, User $currentAdmin):User{
        $user=User::findOrFail($id);
        if($user->user_id===$currentAdmin->user_id){
            throw new \DomainException('Không thể xóa tài khoản của chính mình .');
        }
        if($user->role==="Admin"){
            throw new \DomainException('Không thể xóa tài khoản quản trị viên .');
        }
        $user->status=$user->status==='active'?'locked':'active';
        $user->save();

        
        return $user;
    }
}
?>
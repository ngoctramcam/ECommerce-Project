<?php
//AI-assisted [AI-xx]
namespace App\Services;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
class UserService{
    public function list(?string $keyword=null,int $page=1,int $perPage=10):LengthAwarePaginator{
        return User::query()
            ->select(['user_id','full_name','email','phone','role','status','created_at'])
            ->when($keyword,function($query,$kw){
                //Eloquent tự binding tham số
                $query->where('email','like','%'.addcslashes($kw,'%_\\').'%');                                                                                          
            })
            ->orderByDesc('user_id')
            ->paginate($perPage,["*"],'page',$page);
    }
}
?>
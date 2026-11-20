<?php

namespace Tests\Feature;
use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

use Tests\TestCase;

class UserLockTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    private function makeUser(array $attrs=[]):User{
        return User::forceCreate(array_merge([
            "full_name"=>"Test User",
            "email"=>uniqid()."@test.com",
            'password'=>Hash::make('12345678'),
            'role'=>'user',
            'status'=>'active',
        ],$attrs));
    }
    public function test_admin_khoa_user_thi_status_locked():void{
        $admin=$this->makeUser(["role"=>"admin"]);
        $user=$this->makeUser();
        // $user->createToken("test");

        Sanctum::actingAs($admin);
        $res=$this->patchJson("/admin/users/{$user->user_id}/toggle-lock");
        $res->assertOk();
        $this->assertSame('locked',$user->fresh()->status);
       
    }
    public function test_admin_khong_the_tu_xoa_chinh_minh():void{
        $admin=$this->makeUser(['role'=>'admin']);
        Sanctum::actingAs($admin);
        $res=$this->patchJson("/admin/users/{$admin->user_id}/toggle-lock");
        $res->assertStatus(422);
        $this->assertSame('active',$admin->fresh()->status);
    }
    public function test_mo_khoa_user_dang_bi_khoa():void{
        $admin=$this->makeUser(['role'=>'admin']);
        $user=$this->makeUser(['status'=>'locked']);
        Sanctum::actingAs($admin);
        $this->patchJson("/admin/users/{$user->user_id}/toggle-lock")->assertOk();
        $this->assertSame('active',$user->fresh()->status);
    }
}
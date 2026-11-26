<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserLockTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(array $attrs = []): User
    {
        return User::forceCreate(array_merge([
            'full_name' => 'Test User',
            'email' => uniqid() . '@test.com',
            'password' => Hash::make('12345678'),
            'role' => 'user',
            'status' => 'active',
        ], $attrs));
    }

    public function test_admin_khoa_user_thi_status_locked(): void
    {
        $admin = $this->makeUser(['role' => 'admin']);
        $user = $this->makeUser();

        $res = $this->actingAs($admin)
            ->patchJson("/users/{$user->user_id}/toggle-lock");

        $res->assertOk();
        $this->assertSame('locked', $user->fresh()->status);
    }

    public function test_admin_khong_the_tu_khoa_chinh_minh(): void
    {
        $admin = $this->makeUser(['role' => 'admin']);

        $res = $this->actingAs($admin)
            ->patchJson("/users/{$admin->user_id}/toggle-lock");

        $res->assertStatus(422);
        $this->assertSame('active', $admin->fresh()->status);
    }

    public function test_mo_khoa_user_dang_bi_khoa(): void
    {
        $admin = $this->makeUser(['role' => 'admin']);
        $user = $this->makeUser(['status' => 'locked']);

        $this->actingAs($admin)
            ->patchJson("/users/{$user->user_id}/toggle-lock")
            ->assertOk();

        $this->assertSame('active', $user->fresh()->status);
    }
}

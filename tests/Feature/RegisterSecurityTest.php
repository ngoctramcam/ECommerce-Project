<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_dang_ky_khong_the_tu_gan_role_admin(): void
    {
        $res = $this->postJson('/register', [
            'full_name'             => 'Test Hack',
            'email'                 => 'hack@test.com',
            'password'              => '12345678',
            'password_confirmation' => '12345678',
            'role'                  => 'admin',
        ]);

        $res->assertSuccessful();
        $this->assertSame('user', User::where('email', 'hack@test.com')->value('role'));
    }
}
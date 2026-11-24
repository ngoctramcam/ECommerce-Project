<?php
//AI-assisted [AI-xx]

namespace Tests\Unit;

use App\Models\User;
use App\Services\UserService;
use DomainException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserServiceTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(string $email): User
    {
        return User::create([
            'full_name' => 'Test User',
            'email' => $email,
            'password' => '12345678',
            'phone' => '090000000',
            'address' => 'Q7 HCM',
            'role' => 'user',
            'status' => 'active'
        ]);
    }

    // =========================
    // LIST USER
    // =========================

    public function test_list_filters_by_email_keyword(): void
    {
        $this->makeUser('timkiem@example.com');
        $this->makeUser('vinh1@example.com');
        $this->makeUser('vinh2@example.com');

        $result = (new UserService)->list('timkiem');

        $this->assertCount(1, $result->items());
    }

    public function test_list_paginates_on_server(): void
    {
        for ($i = 1; $i <= 25; $i++) {
            $this->makeUser("u{$i}@example.com");
        }

        $result = (new UserService)->list(null, 2, 10);

        $this->assertCount(10, $result->items());
        $this->assertSame(2, $result->currentPage());
        $this->assertSame(25, $result->total());
    }

    public function test_keyword_is_treated_as_data_not_sql(): void
    {
        $this->makeUser('a@example.com');

        $result = (new UserService)
            ->list("'OR'1='1'");

        $this->assertCount(0, $result->items());
    }

    // =========================
    // TOGGLE LOCK
    // =========================

    public function test_toggle_lock_changes_active_to_locked(): void
    {
        $admin = User::create([
            'full_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '12345678',
            'role' => 'admin',
            'status' => 'active'
        ]);

        $user = $this->makeUser('user@example.com');

        $result = (new UserService)
            ->toggleLock($user->user_id, $admin);

        $this->assertSame('locked', $result->status);

        $this->assertDatabaseHas('users', [
            'user_id' => $user->user_id,
            'status' => 'locked'
        ]);
    }

    public function test_toggle_lock_changes_locked_to_active(): void
    {
        $admin = User::create([
            'full_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '12345678',
            'role' => 'admin',
            'status' => 'active'
        ]);

        $user = $this->makeUser('user@example.com');

        $user->update([
            'status' => 'locked'
        ]);

        $result = (new UserService)
            ->toggleLock($user->user_id, $admin);

        $this->assertSame('active', $result->status);

        $this->assertDatabaseHas('users', [
            'user_id' => $user->user_id,
            'status' => 'active'
        ]);
    }

    public function test_toggle_lock_cannot_lock_current_admin(): void
    {
        $admin = User::create([
            'full_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '12345678',
            'role' => 'admin',
            'status' => 'active'
        ]);

        $this->expectException(DomainException::class);

        (new UserService)
            ->toggleLock($admin->user_id, $admin);
    }

    public function test_toggle_lock_cannot_lock_another_admin(): void
    {
        $currentAdmin = User::create([
            'full_name' => 'Admin 1',
            'email' => 'admin1@example.com',
            'password' => '12345678',
            'role' => 'admin',
            'status' => 'active'
        ]);

        $targetAdmin = User::create([
            'full_name' => 'Admin 2',
            'email' => 'admin2@example.com',
            'password' => '12345678',
            'role' => 'admin',
            'status' => 'active'
        ]);

        $this->expectException(DomainException::class);

        (new UserService)
            ->toggleLock($targetAdmin->user_id, $currentAdmin);
    }
}
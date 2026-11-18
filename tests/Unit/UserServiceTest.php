<?php
//AI-assisted [AI-xx]
namespace Tests\Unit;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class UserServiceTest extends TestCase{
    use RefreshDatabase;
    private function makeUser(string $email):User{
        return User::create([
            'full_name'=>'Test User',
            'email'=>$email,
            'password'=>'12345678',
            'phone'=>'090000000',
            'address'=>'Q7 HCM',
            'role'=>'user',
            'status'=>'active'
        ]);
    }
    public function test_list_filters_by_email_keyword():void{
        $this->makeUser('timkiem@example.com');
        $this->makeUser('vinh1@example.com');
        $this->makeUser('vinh2@example.com');

        $this->assertCount(1,(new UserService)->list('timkiem')->items());
    }
    public function test_list_paganites_on_server():void{
        for($i = 1;$i <= 25;$i++){
            $this->makeUser("u{$i}@example.com");
        }
        $result=(new UserService)->list(null,2,10);
        $this->assertCount(10,$result->items());
        $this->assertSame(2,$result->currentPage());
    }
    public function test_keyword_is_treated_as_data_not_sql():void{
        $this->makeUser('a@example.com');
        $this->assertCount(0,(new UserService)->list("'OR'1='1'")->items());
    }
}

?>
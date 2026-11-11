<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'phone' => '0900000000',
            'address' => 'TP.HCM',
            'role' => 'admin'
        ]);

        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'full_name' => "Nguyễn Văn $i",
                'email' => "user$i@gmail.com",
                'password' => Hash::make('12345678'),
                'phone' => '09000000' . $i,
                'address' => 'Hồ Chí Minh',
                'role' => 'user'
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use App\Models\Voucher;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $vouchers = Voucher::pluck('voucher_id')->toArray();

        $statuses = [
            'PENDING',
            'SHIPPING',
            'COMPLETED',
            'CANCELLED'
        ];

        for ($i = 1; $i <= 10; $i++) {

            $user = $users->random();

            Order::create([
                'user_id' => $user->user_id,
                'voucher_id' => $vouchers[array_rand($vouchers)],
                'recipient_name' => $user->full_name,
                'recipient_phone' => $user->phone,
                'shipping_address' => $user->address,
                'order_date' => now()->subDays(rand(1, 30)),
                'total_amount' => rand(150000, 800000),
                'status' => $statuses[array_rand($statuses)]
            ]);
        }
    }
}

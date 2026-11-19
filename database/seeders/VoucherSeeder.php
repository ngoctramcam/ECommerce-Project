<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Voucher;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Voucher::insert([
            [
                'code' => 'SAVE10',
                'discount_amount' => 10000,
                'expired_date' => now()->addMonths(3)
            ],
            [
                'code' => 'SAVE20',
                'discount_amount' => 20000,
                'expired_date' => now()->addMonths(3)
            ],
            [
                'code' => 'SAVE50',
                'discount_amount' => 50000,
                'expired_date' => now()->addMonths(3)
            ]
        ]);
    }
}

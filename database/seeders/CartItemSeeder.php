<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Product;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $products = Product::all();

        foreach ($users as $user) {

            foreach ($products->random(2) as $product) {

                CartItem::create([
                    'user_id' => $user->user_id,
                    'product_id' => $product->product_id,
                    'quantity' => rand(1, 3),
                ]);
            }
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();

        foreach (Order::all() as $order) {

            $selectedProducts = $products->random(rand(1, 3));

            foreach ($selectedProducts as $product) {

                $qty = rand(1, 3);

                OrderItem::create([
                    'user_id' => $order->user_id,
                    'product_id' => $product->product_id,
                    'quantity' => $qty,
                    'unit_price' => $product->price,
                    'subtotal' => $qty * $product->price
                ]);
            }
        }
    }
}

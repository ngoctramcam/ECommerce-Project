<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id('order_item_id');

            $table->integer('quantity')->unsigned();

            $table->decimal('unit_price', 10, 2);

            $table->decimal('subtotal', 10, 2);

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');

            $table->timestamps(); // Tự động tạo created_at và updated_at dạng TIMESTAMP
            $table->boolean("is_delete")->default(true);
            $table->softDeletes(); // Tạo cột deleted_at (mặc định NULL)

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('product_id')
                ->references('product_id')
                ->on('products')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};

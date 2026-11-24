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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id('cart_id');

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');

            $table->integer('quantity')->unsigned();

            $table->timestamps(); // Tự động tạo created_at và updated_at dạng TIMESTAMP
            $table->boolean("is_delete")->default(false);
            $table->softDeletes(); // Tạo cột deleted_at (mặc định NULL)

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('product_id')
                ->references('product_id')
                ->on('products')
                ->onDelete('cascade');

            // 1 user chỉ có 1 dòng cho mỗi sản phẩm trong giỏ
            $table->unique(['user_id', 'product_id']);

            $table->index('user_id');
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};

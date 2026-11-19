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
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');

            $table->string('product_name', 255);
            $table->text('description')->nullable();

            $table->decimal('price', 10, 2)->unsigned(); // Giá không thể âm
            $table->integer('stock')->unsigned()->default(0); // Số lượng không thể âm
            $table->string('author', 255);

            $table->string('publisher')->nullable();

            $table->string('image', 255);
            $table->string('slug', 255)->unique();

            $table->unsignedBigInteger('category_id');

            // INDEX
            $table->index('product_name');
            $table->index('category_id');

            $table->timestamps(); // Tự động tạo created_at và updated_at dạng TIMESTAMP
            $table->boolean("is_delete")->default(false);
            $table->softDeletes(); // Tạo cột deleted_at (mặc định NULL)
            $table->foreign('category_id')
                ->references('category_id')
                ->on('categories')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

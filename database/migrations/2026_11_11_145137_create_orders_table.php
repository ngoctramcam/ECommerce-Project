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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('voucher_id')->nullable();

            $table->string('recipient_name', 255);
            $table->string('recipient_phone', 20);

            $table->string('shipping_address', 255);

            $table->dateTime('order_date');

            $table->decimal('total_amount', 10, 2);

            $table->enum('status', [
                'PENDING',
                'SHIPPING',
                'COMPLETED',
                'CANCELLED'
            ])->default('PENDING');

            $table->timestamps(); // Tự động tạo created_at và updated_at dạng TIMESTAMP
            $table->boolean("is_delete")->default(false);
            $table->softDeletes(); // Tạo cột deleted_at (mặc định NULL)

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('voucher_id')
                ->references('voucher_id')
                ->on('vouchers')
                ->nullOnDelete();

            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

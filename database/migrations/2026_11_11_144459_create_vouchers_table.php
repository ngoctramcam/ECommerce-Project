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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id('voucher_id');

            $table->string('code', 50)->unique();
            $table->decimal('discount_amount', 10, 2);
            $table->text("description")->nullable();
            $table->dateTime('expired_date');

            $table->timestamps(); // Tự động tạo created_at và updated_at dạng TIMESTAMP
            $table->boolean("is_delete")->default(false);
            $table->softDeletes(); // Tạo cột deleted_at (mặc định NULL)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};

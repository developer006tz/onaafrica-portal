<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('customer_id')->constrained('customers', 'id')->onDelete('RESTRICT');
            $table->date('sales_date');
            $table->enum('is_new_customer', ['YES', 'NO'])->default('NO');
            $table->foreignUuid('created_by')->constrained('users', 'id')->onDelete('RESTRICT');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};

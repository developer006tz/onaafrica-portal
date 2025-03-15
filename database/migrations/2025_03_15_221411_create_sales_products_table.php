<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
    public function up(): void
    {
        Schema::create('sales_products', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('sales_id')->constrained('sales','id')->onDelete('RESTRICT');
            $table->foreignUuid('product_id')->constrained('products','id')->onDelete('RESTRICT');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('sales_products');
    }
};

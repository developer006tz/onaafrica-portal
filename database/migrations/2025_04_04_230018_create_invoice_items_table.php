<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('invoice_id')->constrained('invoices')->cascadeOnDelete();
            $table->string('item_description');
            $table->float('unit_price');
            $table->integer('quantity');
            $table->float('amount');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};

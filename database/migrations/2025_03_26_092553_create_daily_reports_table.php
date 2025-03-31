<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('daily_reports', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('reference_number')->unique();
            $table->foreignUuid('staff_id')->constrained('users','id')->cascadeOnDelete();
            $table->foreignUuid('customer_id')->constrained('customers','id')->cascadeOnDelete();
            $table->foreignUuid('property_id')->constrained('properties','id')->cascadeOnDelete();
            $table->text('address')->nullable();
            $table->json('customer_phones')->nullable();
            $table->time('time_from')->nullable();
            $table->time('time_to')->nullable();
            $table->text('description')->nullable();
            $table->enum('status',['COMPLETE','PENDING','CANCELLED'])->default('PENDING');
            $table->date('date')->default(DB::raw('CURRENT_DATE'));
            $table->timestamps();
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('daily_reports');
    }
};

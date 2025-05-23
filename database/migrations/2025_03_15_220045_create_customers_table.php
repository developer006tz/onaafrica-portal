<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->foreignUuid('location_id')->nullable()->constrained('locations', 'id')->onDelete('RESTRICT');
            $table->foreignUuid('created_by')->nullable()->constrained('users', 'id')->onDelete('SET NULL');

            $table->string('address')->nullable();
            $table->string('contact_person_phone')->nullable();
            $table->string('tin')->nullable();
            $table->string('vrn')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};

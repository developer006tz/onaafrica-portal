<?php

use App\Models\Company;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('name');
            $table->string('tin')->nullable();
            $table->string('vrn')->nullable();
            $table->string('logo')->nullable();
            $table->string('country')->nullable();
            $table->timestamps();
        });

        Company::create([
            'name' => 'Ona Africa Investment',
            'tin' => '113-725-044',
            'vrn' => '40046632Y',
            'country' => 'Tanzania',
            'logo' => null,
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};

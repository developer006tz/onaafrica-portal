<?php

use App\Models\CompanyBranch;
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
        Schema::create('company_branches', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('name');
            $table->text('address');
            $table->text('address_two')->nullable();
            $table->json('phones')->nullable();
            $table->string('city');
            $table->string('email')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('stamp')->nullable();
            $table->foreignUuid('company_id')->constrained('companies','id')->cascadeOnDelete();
            $table->timestamps();
        });

        $companyBranches = [
            [
                'name' => 'Mwenge Office',
                'address' => 'Savei Plaza, 1st Floor Office No. 4, Sam Najoma Road, Lufungira Mwenge P. O. Box 55063',
                'address_two' => 'Ubungo Dar es salaam, Tanzania | Tel: +255 654 563 031 Email: packaging@onaafricainvestment.com',
                'city' => 'Dar-es-Salaam',
                'company_id' => getCompany()->id,
                'phones' => '["+255 757 333 555", "+255 711 400 200"]',
            ],
            [
                'name' => 'Arusha Office',
                'address' => 'Nane nane, Njiro, Arusha, Tanzania',
                'address_two' => 'Ubungo Dar es salaam, Tanzania | Tel: +255 654 563 031 Email: packaging@onaafricainvestment.com',
                'city' => 'Arusha',
                'company_id' => getCompany()->id,
                'phones' => '["+255 757 333 555", "+255 711 400 200"]',
            ],
        ];

        foreach ($companyBranches as $companyBranch) {
            CompanyBranch::create($companyBranch);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_branches');
    }
};

<?php

use App\Models\BankAccount;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('bank_name');
            $table->string('account_name');
            $table->string('account_number');
            $table->boolean('is_primary')->default(false);
            $table->foreignUuid('company_id')->constrained('companies')->cascadeOnDelete();
            $table->timestamps();
        });

        BankAccount::create([
            'company_id' => getCompany()->id,
            'bank_name' => 'CRDB BANK (T) LTD',
            'account_name' => 'ONA AFRICA INVESTMENT',
            'account_number' => '0150682600000',
            'is_primary' => true,
        ]);

        BankAccount::create([
            'company_id' => getCompany()->id,
            'bank_name' => 'NMB BANK (T) LTD',
            'account_name' => 'ONA AFRICA INVESTMENT',
            'account_number' => '40810130044',
            'is_primary' => false,
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};

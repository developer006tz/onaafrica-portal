<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('invoice_number');
            $table->enum('invoice_type', ['performa', 'invoice']);
            $table->date('issue_date');
            $table->float('sub_total');
            $table->float('vat_rate')->nullable();
            $table->enum('vat_type', ['inclusive', 'exclusive'])->nullable();
            $table->float('vat_amount')->nullable();
            $table->float('total_amount');
            $table->text('delivery_timeline')->nullable();
            $table->text('payment_terms')->nullable();
            $table->text('delivery_location')->nullable();
            $table->enum('status', ['draft', 'sent', 'paid', 'overdue', 'void'])->default('draft');
            $table->enum('achieved', ['yes', 'no'])->default('no');
            $table->foreignUuid('customer_id')->constrained('customers', 'id')->cascadeOnDelete();
            $table->foreignUuid('created_by')->constrained('users', 'id')->cascadeOnDelete();

            $table->foreignUuid('company_branch_id')->constrained('company_branches', 'id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

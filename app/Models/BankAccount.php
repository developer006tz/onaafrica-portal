<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BankAccount extends Model
{
    use HasUuids;

    protected $fillable = [
        'bank_name',
        'account_name',
        'account_number',
        'is_primary',
        'company_id',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    /**
     * Get the company that owns the bank account.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}

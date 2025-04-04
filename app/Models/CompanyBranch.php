<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyBranch extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'address',
        'address_two',
        'phones',
        'city',
        'email',
        'contact_person',
        'contact_number',
        'stamp',
        'company_id',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'phones' => 'array',
    ];

    /**
     * Get the company that owns the branch.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}

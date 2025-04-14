<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'tin',
        'vrn',
        'logo',
        'country',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    public function branches(): HasMany
    {
        return $this->hasMany(CompanyBranch::class);
    }

    public function bankAccounts(): HasMany
    {
        return $this->hasMany(BankAccount::class);
    }
}

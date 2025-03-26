<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyReport extends Model
{
    use HasUuids;

    protected $fillable = [
        'staff_id',
        'customer_id',
        'entity_id',
        'address',
        'customer_phones',
        'time_from',
        'time_to',
        'description',
        'status',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'customer_phones' => 'array',
        'time_from' => 'datetime',
        'time_to' => 'datetime',
    ];

    public function staff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function entity(): BelongsTo
    {
        return $this->belongsTo(Entity::class);
    }
}

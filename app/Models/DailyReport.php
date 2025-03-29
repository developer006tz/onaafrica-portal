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
        'property_id',
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

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function scopeFilter($query, array $filters = [])
    {
        $query->when($filters['date'] ?? null, function ($query, $date) {
            $query->whereDate('date', $date);
        });

        $query->when($filters['customer_id'] ?? null, function ($query, $customerId) {
            $query->where('customer_id', $customerId);
        });

        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('address', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        });

        return $query;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyReport extends Model
{
    use HasUuids;

    /**
     * The "booted" method of the model.
     * 
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($report) {
            if (!$report->reference_number) {
                $report->reference_number = static::generateReferenceNumber();
            }
        });
    }

    /**
     * Generate a unique reference number for the report.
     * 
     * @return string
     */
    protected static function generateReferenceNumber(): string
    {
        $latestReport = static::orderBy('created_at', 'desc')
            ->where('reference_number', 'like', 'REP-%')
            ->first();

        $nextNumber = 1;

        if ($latestReport) {
            $lastNumber = (int) substr($latestReport->reference_number, 4);
            $nextNumber = $lastNumber + 1;
        }

        return 'REP-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }

    protected $fillable = [
        'staff_id',
        'customer_id',
        'property_id',
        'address',
        'customer_phones',
        'reference_number',
        'time_from',
        'time_to',
        'description',
        'status',
        'date'
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasUuids;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($invoice) {
            if (! $invoice->invoice_number) {
                $invoice->invoice_number = static::generateInvoiceNumber();
            }
        });
    }

    protected static function generateInvoiceNumber(): string
    {
        $latestInvoice = static::orderBy('created_at', 'desc')
            ->where('invoice_number', 'like', 'ONA-%')
            ->first();

        $nextNumber = 1;

        if ($latestInvoice) {
            $lastNumber = (int) substr($latestInvoice->invoice_number, 4);
            $nextNumber = $lastNumber + 1;
        }

        return 'ONA-'.str_pad($nextNumber, 5, '0', STR_PAD_LEFT);
    }

    protected $fillable = [
        'invoice_number',
        'invoice_type',
        'issue_date',
        'sub_total',
        'vat_rate',
        'vat_type',
        'vat_amount',
        'total_amount',
        'delivery_timeline',
        'payment_terms',
        'delivery_location',
        'customer_id',
        'created_by',
        'company_branch_id',
        'status',
        'achieved',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'issue_date' => 'date',
        'sub_total' => 'float',
        'vat_rate' => 'float',
        'vat_amount' => 'float',
        'total_amount' => 'float',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function companyBranch(): BelongsTo
    {
        return $this->belongsTo(CompanyBranch::class);
    }

    public function invoiceItems(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function scopeFilter($query, array $filters = [])
    {
        $query->when($filters['invoice_number'] ?? null, function ($query, $invoiceNumber) {
            $query->where('invoice_number', 'like', '%'.$invoiceNumber.'%');
        });

        $query->when($filters['customer_id'] ?? null, function ($query, $customerId) {
            $query->where('customer_id', $customerId);
        });

        $query->when($filters['issue_date'] ?? null, function ($query, $issueDate) {
            $query->whereDate('issue_date', $issueDate);
        });

        $query->when($filters['company_branch_id'] ?? null, function ($query, $companyBranchId) {
            $query->where('company_branch_id', $companyBranchId);
        });

        $query->when($filters['status'] ?? null, function ($query, $status) {
            $query->where('status', $status);
        });

        $query->when($filters['achieved'] ?? null, function ($query, $achieved) {
            $query->where('achieved', $achieved);
        });

        return $query;
    }
}

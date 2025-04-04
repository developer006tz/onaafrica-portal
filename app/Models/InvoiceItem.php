<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceItem extends Model
{
    use HasUuids;

    protected $fillable = [
        'invoice_id',
        'item_description',
        'unit_price',
        'quantity',
        'amount',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'unit_price' => 'float',
        'quantity' => 'integer',
        'amount' => 'float',
    ];

    /**
     * Get the invoice that owns the invoice item.
     */
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}

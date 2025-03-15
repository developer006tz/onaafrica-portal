<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Sales;
use App\Models\Product;

class SalesProduct extends Model
{
    use HasUuids;
    
    protected $fillable = [
        'sales_id',
        'product_id',
        'quantity',
    ];
    
    protected $keyType = 'string';
    
    public $incrementing = false;
    
    public function sales()
    {
        return $this->belongsTo(Sales::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

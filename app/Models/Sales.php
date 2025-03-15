<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Customer;
use App\Models\User;

class Sales extends Model
{
    use HasUuids;
    
    protected $fillable = [
        'customer_id',
        'sales_date',
        'is_new_customer',
        'created_by',
    ];
    
    protected $keyType = 'string';
    
    public $incrementing = false;
    
    protected $casts = [
        'sales_date' => 'date',
    ];
    
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

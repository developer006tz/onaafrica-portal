<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Customer extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'contact_person',
        'email',
        'phone',
        'location_id',
    ];


    protected $keyType = 'string';

    public $incrementing = false;

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}

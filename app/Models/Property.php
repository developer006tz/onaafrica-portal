<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    public function scopeFilter($query, array $filters = [])
    {
        $query->when($filters['name'] ?? null, function ($query, $name) {
            $query->where('name', 'like', '%' . $name . '%');
        });

        return $query;
    }
}

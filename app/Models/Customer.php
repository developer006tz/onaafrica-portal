<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'contact_person',
        'email',
        'phone',
        'location_id',
        'created_by'
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function scopeFilter($query, array $filters = [])
    {
        $query->when($filters['name'] ?? null, function ($query, $name) {
            $query->where('name', 'like', '%'.$name.'%');
        });

        $query->when($filters['contact_person'] ?? null, function ($query, $contactPerson) {
            $query->where('contact_person', 'like', '%'.$contactPerson.'%');
        });

        $query->when($filters['email'] ?? null, function ($query, $email) {
            $query->where('email', 'like', '%'.$email.'%');
        });

        $query->when($filters['phone'] ?? null, function ($query, $phone) {
            $query->where('phone', 'like', '%'.$phone.'%');
        });

        $query->when($filters['location_id'] ?? null, function ($query, $locationId) {
            $query->where('location_id', $locationId);
        });

        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('contact_person', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                    ->orWhere('phone', 'like', '%'.$search.'%');
            });
        });

        $query->when($filters['date_from'] ?? null, function ($query, $dateFrom) {
            $query->whereDate('created_at', '>=', $dateFrom);
        });

        $query->when($filters['date_to'] ?? null, function ($query, $dateTo) {
            $query->whereDate('created_at', '<=', $dateTo);
        });

        $query->when($filters['sort_by'] ?? null, function ($query, $sortBy) {
            $direction = $filters['sort_dir'] ?? 'asc';

            $direction = in_array(strtolower($direction), ['asc', 'desc']) ? $direction : 'asc';

            $allowedSortColumns = ['name', 'email', 'phone', 'created_at'];
            if (in_array($sortBy, $allowedSortColumns)) {
                $query->orderBy($sortBy, $direction);
            }
        });

        return $query;
    }

    public function createdBy() {
        
     return $this->belongsTo(User::class,'created_by');
    }
}

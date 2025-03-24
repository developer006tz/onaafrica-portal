<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasUuids;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'photo',
        'role',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

   
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function scopeFilter($query, array $filters = [])
    {
        $query->when($filters['name'] ?? null, function ($query, $name) {
            $query->where('name', 'like', '%' . $name . '%');
        });

        $query->when($filters['email'] ?? null, function ($query, $email) {
            $query->where('email', 'like', '%' . $email . '%');
        });

        $query->when($filters['phone'] ?? null, function ($query, $phone) {
            $query->where('phone', 'like', '%' . $phone . '%');
        });

        $query->when($filters['role'] ?? null, function ($query, $role) {
            $query->where('role', $role);
        });

        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        });

        $query->when($filters['date_from'] ?? null, function ($query, $dateFrom) {
            $query->whereDate('created_at', '>=', $dateFrom);
        });

        $query->when($filters['date_to'] ?? null, function ($query, $dateTo) {
            $query->whereDate('created_at', '<=', $dateTo);
        });

        $query->when($filters['sort_by'] ?? null, function ($query, $sortBy) use ($filters) {
            $direction = $filters['sort_dir'] ?? 'asc';
            
            $direction = in_array(strtolower($direction), ['asc', 'desc']) ? $direction : 'asc';
            
            $allowedSortColumns = ['name', 'email', 'phone', 'role', 'created_at'];
            if (in_array($sortBy, $allowedSortColumns)) {
                $query->orderBy($sortBy, $direction);
            }
        });

        return $query;
    }
   
    public $incrementing = false;
    
 
    protected $keyType = 'string';
}

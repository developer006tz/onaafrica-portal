<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('users/index',[
            'users' => User::query()
                ->when($request->search, function($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('role', 'like', "%{$search}%");
                })
                ->when($request->role, function($query, $role) {
                    $query->where('role', $role);
                })
                ->paginate($request->per_page ?? 10)
                ->withQueryString(),
        ]);
    }
}

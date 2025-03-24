<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filterParams = [
            'search',
            'name',
            'email',
            'phone',
            'role',
            'date_from',
            'date_to',
            'sort_by',
            'sort_dir'
        ];
        
        return Inertia::render('users/index', [
            'filters' => $request->only($filterParams),
            'users' => User::filter($request->only($filterParams))
                ->paginate($request->per_page ?? 10)
                ->withQueryString(),
        ]);
    }
}

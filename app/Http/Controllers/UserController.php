<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteStaffRequest;
use App\Http\Requests\storeStaffRequest;
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
                ->withQueryString()
                ->through(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'photo' => $user->photo ? assetDomain().$user->photo : null,
                        'role' => $user->role->name,
                        'staff_number' => $user->staff_number,
                        'created_at' => $user->created_at,
                    ];
                })
        ]);
    }

    public function addStaff()
    {
       
        return Inertia::render('users/add',[
         'roles' => roles()
        ]);
    }

    public function storeStaff(storeStaffRequest $request)
    {
        $validated = $request->validated();
        
        $validated['photo'] = $request->hasFile('photo') 
            ? uploadFile($request->file('photo')) 
            : null;

        $validated['password'] = '123456';
        
        User::create($validated);

        return to_route('staffs.index')->with('success', 'Staff added successfully');
    }

    public function deleteStaff(DeleteStaffRequest $request)
    {
        
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePropertyRequest;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        return Property::all();
    }

    public function storeProperty(StorePropertyRequest $request)
    {
        $validated = $request->validated();

        Property::create($validated);

        return redirect()->back()->with('success', 'property created successfully');
    }
}

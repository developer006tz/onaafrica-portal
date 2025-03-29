<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API routes for customers and properties
Route::middleware('auth')->group(function () {
    Route::get('/customers', function () {
        return \App\Models\Customer::select('id', 'name')->get();
    });

    Route::get('/properties', function () {
        return \App\Models\Property::select('id', 'name')->get();
    });
});
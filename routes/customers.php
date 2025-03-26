<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('customers.index');
        Route::get('/add', [CustomerController::class, 'addCustomer'])->name('customers.add');
        Route::post('/store', [CustomerController::class, 'storeCustomer'])->name('customers.store');
    });

});

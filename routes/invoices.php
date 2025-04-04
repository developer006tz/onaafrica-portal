<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('invoices')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('invoices.index');
    });

    Route::prefix('quotes')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('quotes.index');
    });

});

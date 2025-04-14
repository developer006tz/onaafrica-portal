<?php

use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::prefix('properties')->group(function () {
        Route::get('/', [PropertyController::class, 'index'])->name('properties.index');
        Route::post('/store', [PropertyController::class, 'storeProperty'])->name('properties.store');
    });
});

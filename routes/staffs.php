<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('staffs')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('staffs.index');
        Route::get('/add', [UserController::class, 'addStaff'])->name('staffs.add');
        Route::post('/store', [UserController::class, 'storeStaff'])->name('staffs.store');
    });

});

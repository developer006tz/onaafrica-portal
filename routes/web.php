<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('home');
    }

    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/staffs.php';
require __DIR__.'/customers.php';
require __DIR__.'/properties.php';
require __DIR__.'/reports.php';
require __DIR__.'/invoices.php';
require __DIR__.'/auth.php';

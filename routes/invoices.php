<?php

use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('invoices')->group(function () {
        Route::get('/', [InvoiceController::class, 'index'])->name('invoices.index');
        Route::get('/create', [InvoiceController::class, 'createInvoice'])->name('invoices.create');
        Route::post('/store', [InvoiceController::class, 'storeInvoice'])->name('invoices.store');
        Route::get('/{id}/show', [InvoiceController::class, 'showInvoice'])->name('invoices.show');
    });

    Route::prefix('quotes')->group(function () {
        Route::get('/', [InvoiceController::class, 'listQuotes'])->name('quotes.index');
    });

});

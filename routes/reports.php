<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('reports')->group(function () {
        Route::get('/', [ReportController::class, 'index'])->name('reports.index');
        Route::get('/{staff_id}/all', [ReportController::class, 'allStaffReports'])->name('reports.all');
        Route::get('/add', [ReportController::class, 'addReport'])->name('reports.add');
        Route::post('/store', [ReportController::class, 'storeReport'])->name('reports.store');
        Route::get('/{id}', [ReportController::class, 'showReport'])->name('reports.show');
    });

});

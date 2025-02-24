<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;


Route::get('/', fn () => null);

// Login/Logout =======================================================
Route::post('/login', [Controllers\LoginController::class, 'store']);
Route::post('/logout', [Controllers\LoginController::class, 'destroy']);

// TODO: Email Verification =================================================


// TODO: Password Reset =====================================================
Route::post('/password/forgot', Controllers\Password\ForgotPasswordController::class);
Route::post('/password/reset', Controllers\Password\ResetPasswordController::class);


// Authenticated ============================================================
Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::get('/user', Controllers\LoggedInController::class);
    Route::put('/user', Controllers\UpdateAccountDetailsController::class);
    Route::put('/user/password', Controllers\UpdatePasswordController::class);

    
    // TODO: Lookups =====================================================
    Route::get('/invoices', [Controllers\InvoiceController::class, 'index']);
    Route::get('/invoices/{id}', [Controllers\InvoiceController::class, 'show']);
    Route::post('/invoices', [Controllers\InvoiceController::class, 'store']);
    Route::put('/invoices/{id}', [Controllers\InvoiceController::class, 'update']);
    Route::get('/invoice-list', Controllers\InvoiceListController::class);
    
    Route::get('/quotes', [Controllers\QuoteController::class, 'index']);
    Route::get('/quotes/{id}', [Controllers\QuoteController::class, 'show']);
    Route::get('/quote-list', Controllers\QuoteListController::class);
    
    Route::get('/companies', [Controllers\CompanyController::class, 'index']);
    Route::get('/companies/{id}', [Controllers\CompanyController::class, 'show']);
    Route::get('/company-list', Controllers\CompanyListController::class);
    
});
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
    
    // Invoices =====================================================
    Route::get('/invoices', [Controllers\InvoiceController::class, 'index']);
    Route::get('/invoices/{id}', [Controllers\InvoiceController::class, 'show']);
    Route::post('/invoices', [Controllers\InvoiceController::class, 'store']);
    Route::put('/invoices/{id}', [Controllers\InvoiceController::class, 'update']);
    
    // Quotes =====================================================
    Route::get('/quotes', [Controllers\QuoteController::class, 'index']);
    Route::get('/quotes/{id}', [Controllers\QuoteController::class, 'show']);
    Route::post('/quotes', [Controllers\QuoteController::class, 'store']);
    Route::put('/quotes/{id}', [Controllers\QuoteController::class, 'update']);
    
    // Companies =====================================================
    Route::get('/companies', [Controllers\CompanyController::class, 'index']);
    Route::get('/companies/{id}', [Controllers\CompanyController::class, 'show']);
    Route::post('/companies', [Controllers\CompanyController::class, 'store']);
    Route::put('/companies/{id}', [Controllers\CompanyController::class, 'update']);
    
    // Settings ====================================================
    Route::get('/settings', [Controllers\BusinessSettingController::class, 'index']);
    Route::post('/settings', [Controllers\BusinessSettingController::class, 'store']);
    Route::put('/settings/{id}', [Controllers\BusinessSettingController::class, 'update']);

    // Logo ========================================================
    Route::get('/logo', [Controllers\LogoController::class, 'show']);
    Route::post('/logo', [Controllers\LogoController::class, 'store'])->middleware('uploads');
    
    // Lists =======================================================
    Route::get('/invoice-list', Controllers\InvoiceListController::class);
    Route::get('/quote-list', Controllers\QuoteListController::class);
    Route::get('/company-list', Controllers\CompanyListController::class);
    
    // Reports =====================================================
    // Route::get('/');
});
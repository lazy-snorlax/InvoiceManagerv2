<?php

namespace App\Http\Controllers\Password;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /**
     * Request a password reset when user forgets their password.
     */
    public function __invoke(Request $request)
    {
        Password::sendResetLink($request->only('email'));

        return response()->noContent();
    }
}

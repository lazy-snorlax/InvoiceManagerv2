<?php

namespace App\Http\Controllers\Password;

use App\Models\User;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\Password\ResetPasswordRequest;
use App\Notifications\SuccessfulPasswordResetNotification;

class ResetPasswordController extends Controller
{
    /**
     * Attempt to reset a users password.
     */
    public function __invoke(ResetPasswordRequest $request): Response
    {
        $response = Password::reset(
            $request->only('email', 'token', 'password', 'password_confirmation'),
            function (User $user, string $password) {
                $user->password = $password;
                $user->save();

                $user->notify(new SuccessfulPasswordResetNotification);
            }
        );

        if ($response === Password::PASSWORD_RESET) {
            return response()->noContent();
        }

        throw ValidationException::withMessages(['generic' => [__($response)]]);
    }
}

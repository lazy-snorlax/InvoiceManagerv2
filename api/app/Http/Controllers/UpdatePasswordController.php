<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\LoggedInUser\UpdatePasswordRequest;

class UpdatePasswordController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        if (!Hash::check($request->validated('current_password'), $user->password)) {
            throw ValidationException::withMessages(['current_password' => ['Current password is incorrect']]);
        }

        $user->password = $request->validated('password');
        $user->save();

        return response()->noContent();
    }
}

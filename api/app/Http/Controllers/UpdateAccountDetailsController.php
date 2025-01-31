<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoggedInResource;
use Illuminate\Http\Request;

class UpdateAccountDetailsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $user->fill($request->only(['name', 'email']));

        if ($request->input('email') !== $user->email) {
            // TODO: Update email and send verification
            // $user->update([]);
            // $user->sendEmail;
        }

        $user->save();

        return new LoggedInResource($user);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Lang;
use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    
    protected $maxAttempts = 5;
    protected $decayMinutes = 15;

    public function store(Request $request, Auth $auth) 
    {
        // Check login attempts
            // fire lockout event & send response

        if ($auth->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            $user = $auth->user();

            // update last login?

            // check user enabled

            // send user verification email

            return new UserResource($user);
        }

        //Randomize request time
        usleep(mt_rand(5000, 300000));
        // $this->incrementLoginAttempts($request);
        throw ValidationException::withMessages(['email' => [Lang::get('auth.failed')]]);
    }

    public function destroy(Request $request, Auth $auth): Response 
    {
        $auth->guard('web')->logout();
        $request->session()->flush();
        return response()->noContent();
    }
}

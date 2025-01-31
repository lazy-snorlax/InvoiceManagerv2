<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\LoggedInResource;

class LoggedInController extends Controller
{
    // Get logged in user
    public function __invoke(Request $request): LoggedInResource
    {
        $user = $request->user();
        return new LoggedInResource($user);
    }
}

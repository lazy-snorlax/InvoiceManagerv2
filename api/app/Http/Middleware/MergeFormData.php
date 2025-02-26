<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MergeFormData
{
    public function handle(Request $request, Closure $next)
    {
        $form = $request['form'];
        unset($request['form']);

        if (!is_null($form)) {
            $request->merge(json_decode($form, true));
        }

        return $next($request);
    }
}
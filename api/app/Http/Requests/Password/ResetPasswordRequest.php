<?php

namespace App\Http\Requests\Password;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
{
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()->symbols()],
            'password_confirmation' => ['required'],
            'token' => ['required'],
        ];
    }
}
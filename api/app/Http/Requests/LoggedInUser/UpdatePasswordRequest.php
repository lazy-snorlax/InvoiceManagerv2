<?php

namespace App\Http\Requests\LoggedInUser;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'current_password' => ['required'],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()->symbols() ],
            'password_confirmation' => ['required']
        ];
    }
}
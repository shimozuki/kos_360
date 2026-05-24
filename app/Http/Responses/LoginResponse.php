<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Handle the response.
     */
    public function toResponse($request)
    {
        $user = auth()->user();

        if ($user->role === 'admin') {

            return redirect('/dashboard');
        }

        return redirect('/');
    }
}

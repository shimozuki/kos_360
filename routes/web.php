<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminBookingController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\KamarController;
use App\Http\Controllers\LandingController;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::get('/', [
    LandingController::class,
    'index'
]);

Route::get('/detail/{id}', [
    LandingController::class,
    'show'
]);

/*
|--------------------------------------------------------------------------
| PENYEWA
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::post(
        '/booking/{kamar}',
        [BookingController::class, 'store']
    );

    Route::get(
        '/my-booking',
        [BookingController::class, 'index']
    );
});

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->group(function () {

        Route::get(
            '/dashboard',
            function () {

                return Inertia::render(
                    'dashboard'
                );
            }
        );

        /*
        |--------------------------------------------------------------------------
        | USER
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/user',
            [UserController::class, 'index']
        );

        Route::delete(
            '/user/{id}',
            [UserController::class, 'destroy']
        );

        /*
        |--------------------------------------------------------------------------
        | KAMAR
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/kamar',
            [KamarController::class, 'index']
        );

        Route::get(
            '/kamar/create',
            [KamarController::class, 'create']
        );

        Route::post(
            '/kamar',
            [KamarController::class, 'store']
        );

        Route::get(
            '/kamar/{id}/edit',
            [KamarController::class, 'edit']
        );

        Route::put(
            '/kamar/{id}',
            [KamarController::class, 'update']
        );

        Route::delete(
            '/kamar/{id}',
            [KamarController::class, 'destroy']
        );

        /*
        |--------------------------------------------------------------------------
        | BOOKING
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/booking',
            [BookingController::class, 'index']
        );
    });

require __DIR__ . '/settings.php';

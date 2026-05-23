<?php

use App\Http\Controllers\Admin\AdminBookingController;
use App\Http\Controllers\Admin\AdminDashboard;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\KamarController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\BookingController;

Route::get('/', [LandingController::class, 'index']);
Route::get('/detail/{id}', [LandingController::class, 'show']);

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get(
        'dashboard',
        [AdminDashboard::class, 'index']
    )->name('dashboard');

    Route::get('/user', [UserController::class, 'index']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);

    Route::get('/kamar', [KamarController::class, 'index']);
    Route::delete('/kamar/{id}', [KamarController::class, 'destroy']);
    Route::get('/kamar/create', [KamarController::class, 'create']);
    Route::post('/kamar', [KamarController::class, 'store']);
    Route::get('/kamar/{id}/edit', [KamarController::class, 'edit']);
    Route::put('/kamar/{id}', [KamarController::class, 'update']);


    Route::get('/admin/booking', [AdminBookingController::class, 'index']);
    Route::put(
        '/admin/booking/{id}/approve',
        [AdminBookingController::class, 'approve']
    );

    Route::put(
        '/admin/booking/{id}/reject',
        [AdminBookingController::class, 'reject']
    );

    Route::post(
        '/notification/{id}/read',
        [AdminBookingController::class, 'readNotification']
    );
});

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::get(
            '/my-booking',
            [BookingController::class, 'index']
        );

        Route::post(
            '/booking/{kamar}',
            [BookingController::class, 'store']
        );
    }
);

require __DIR__ . '/settings.php';

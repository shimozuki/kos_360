<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Kamar;
use App\Models\User;

use Inertia\Inertia;

class AdminDashboard extends Controller
{
    public function index()
    {
        $totalKamar = Kamar::count();

        $totalPenyewa = User::where(
            'role',
            'penyewa'
        )->count();

        $totalBooking = Booking::count();

        $bookingPending = Booking::where(
            'status',
            'pending'
        )->count();

        $chart = Booking::selectRaw(
            "TO_CHAR(created_at, 'Mon') as bulan,
     COUNT(*) as total"
        )
            ->groupBy('bulan')
            ->get();

        return Inertia::render(
            'dashboard',
            [

                'totalKamar' => $totalKamar,

                'totalPenyewa' => $totalPenyewa,

                'totalBooking' => $totalBooking,

                'bookingPending' => $bookingPending,

                'chart' => $chart,

            ]
        );
    }
}

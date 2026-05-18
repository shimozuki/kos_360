<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with([
            'user',
            'kamar'
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'admin/booking/index',
            [
                'bookings' => $bookings
            ]
        );
    }

    public function updateStatus(
        Request $request,
        $id
    ) {

        $booking =
            Booking::findOrFail($id);

        $booking->status =
            $request->status;

        $booking->save();

        return back();
    }
}

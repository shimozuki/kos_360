<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Notifications\DatabaseNotification;

class AdminBookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with([
            'user',
            'kamar'
        ])
            ->latest()
            ->paginate(10);

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

    public function approve($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->status = 'approved';

        $booking->save();

        return redirect()->back();
    }

    public function reject($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->status = 'rejected';

        $booking->save();

        return redirect()->back();
    }

    public function readNotification($id)
    {
        $notification =
            auth()
            ->user()
            ->notifications()
            ->find($id);

        if ($notification) {

            $notification->markAsRead();
        }

        return redirect('/admin/booking');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kamar;
use App\Models\User;
use App\Notifications\BookingNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('kamar')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(6);

        return Inertia::render(
            'booking/index',
            [
                'bookings' => $bookings
            ]
        );
    }

    public function store(
        Request $request,
        Kamar $kamar
    ) {

        $request->validate([

            'tanggal_masuk' => 'required|date',

            'durasi' => 'required|integer|min:1',

            'catatan' => 'nullable',

        ]);


        $booking = Booking::create([

            'user_id' => auth()->id(),

            'kamar_id' => $kamar->id,

            'tanggal_masuk' =>
            $request->tanggal_masuk,

            'durasi' =>
            $request->durasi,

            'catatan' =>
            $request->catatan,

            'status' => 'pending',

        ]);

        $admin = User::where(
            'role',
            'admin'
        )->first();

        $admin->notify(
            new BookingNotification($booking)
        );

        return redirect('/my-booking');
    }
}

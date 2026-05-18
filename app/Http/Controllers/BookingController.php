<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kamar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(
        Request $request,
        Kamar $kamar
    ) {

        $request->validate([

            'tanggal_masuk' => 'required|date',

            'durasi' => 'required|integer|min:1',

            'catatan' => 'nullable',

        ]);


        Booking::create([

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

        return Inertia::render('kamar/show', [

            'kamar' => $kamar,

            'user' => auth()->user(),

        ]);
    }
}

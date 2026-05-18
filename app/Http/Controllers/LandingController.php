<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $kamers = Kamar::latest()
            ->take(6)
            ->get();

        return Inertia::render('home', [
            'kamers' => $kamers
        ]);
    }

    public function show($id)
    {
        $kamar = Kamar::with('multimedia')
            ->findOrFail($id);

        return Inertia::render('show', [
            'kamar' => [
                ...$kamar->toArray(),
                'multimedia' => $kamar->multimedia ?? [],
            ]
        ]);
    }
}

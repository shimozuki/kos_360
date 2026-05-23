<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use App\Models\Multimedia;
use Inertia\Inertia;
use Illuminate\Http\Request;

class KamarController extends Controller
{
    public function index()
    {
        $kamers = Kamar::latest()
            ->paginate(10);

        return Inertia::render('kamar/index', [
            'kamers' => $kamers
        ]);
    }

    public function create()
    {
        return Inertia::render('kamar/create');
    }

    public function store(Request $request)
    {
        $request->validate([

            'kode_kamar' => 'required',
            'harga' => 'required',
            'deskripsi' => 'required',

        ]);

        $thumbnail = null;

        if ($request->hasFile('thumbnail')) {

            $thumbnail = $request
                ->file('thumbnail')
                ->store('kamar', 'public');
        }

        $kamar = Kamar::create([

            'kode_kamar' => $request->kode_kamar,
            'nama_kamar' => "-",
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi,
            'status' => $request->status,

            'thumbnail' => $thumbnail,

            'wifi' => $request->wifi ?? false,
            'ac' => $request->ac ?? false,
            'fully_furnished' => $request->fully_furnished ?? false,
            'kamar_mandi_dalam' => $request->kamar_mandi_dalam ?? false,
            'parkir' => $request->parkir ?? false,
            'cctv' => $request->cctv ?? false,

            'fasilitas_tambahan' => $request->fasilitas_tambahan,

        ]);

        /*
    |--------------------------------------------------------------------------
    | MULTIMEDIA
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('gallery')) {

            foreach ($request->file('gallery') as $file) {

                $path = $file->store(
                    'multimedia',
                    'public'
                );

                $mime = $file->getMimeType();

                $type = 'image';

                if (str_contains($mime, 'video')) {

                    $type = 'video';
                } elseif (
                    str_contains($file->getClientOriginalName(), '360')
                ) {

                    $type = 'photo360';
                }

                Multimedia::create([

                    'kamar_id' => $kamar->id,
                    'type' => $type,
                    'file' => $path,

                ]);
            }
        }

        return redirect('/kamar')->with(
            'success',
            'Kamar berhasil ditambahkan'
        );
    }

    public function edit($id)
    {
        $kamar = Kamar::findOrFail($id);

        return Inertia::render('kamar/edit', [
            'kamar' => $kamar
        ]);
    }

    public function update(Request $request, $id)
    {
        $kamar = Kamar::findOrFail($id);

        /*
    |--------------------------------------------------------------------------
    | THUMBNAIL
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('thumbnail')) {

            $thumbnail = $request
                ->file('thumbnail')
                ->store('kamar', 'public');

            $kamar->thumbnail = $thumbnail;
        }

        /*
    |--------------------------------------------------------------------------
    | UPDATE DATA
    |--------------------------------------------------------------------------
    */

        $kamar->kode_kamar = $request->kode_kamar;
        $kamar->nama_kamar = "-";
        $kamar->harga = $request->harga;
        $kamar->deskripsi = $request->deskripsi;
        $kamar->status = $request->status;

        $kamar->wifi = $request->wifi ?? false;
        $kamar->ac = $request->ac ?? false;
        $kamar->fully_furnished =
            $request->fully_furnished ?? false;

        $kamar->kamar_mandi_dalam =
            $request->kamar_mandi_dalam ?? false;

        $kamar->parkir =
            $request->parkir ?? false;

        $kamar->cctv =
            $request->cctv ?? false;

        $kamar->fasilitas_tambahan =
            $request->fasilitas_tambahan;

        $kamar->save();

        /*
    |--------------------------------------------------------------------------
    | MULTIMEDIA BARU
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('gallery')) {

            foreach ($request->file('gallery') as $file) {

                $path = $file->store(
                    'multimedia',
                    'public'
                );

                $mime = $file->getMimeType();

                $type = 'image';

                if (str_contains($mime, 'video')) {

                    $type = 'video';
                } elseif (
                    str_contains(
                        $file->getClientOriginalName(),
                        '360'
                    )
                ) {

                    $type = 'photo360';
                }

                Multimedia::create([

                    'kamar_id' => $kamar->id,
                    'type' => $type,
                    'file' => $path,

                ]);
            }
        }

        return redirect('/kamar')->with(
            'success',
            'Kamar berhasil diupdate'
        );
    }

    public function destroy($id)
    {
        $kamar = Kamar::findOrFail($id);

        $kamar->delete();

        return redirect()->back();
    }
}

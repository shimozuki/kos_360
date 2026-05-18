<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kamar extends Model
{
    use HasFactory;

    protected $table = 'kamers';

    protected $fillable = [

        'kode_kamar',
        'nama_kamar',
        'harga',
        'deskripsi',
        'status',
        'thumbnail',
        'wifi',
        'ac',
        'fully_furnished',
        'kamar_mandi_dalam',
        'parkir',
        'cctv',
        'fasilitas_tambahan',

    ];

    protected $casts = [
        'harga' => 'integer',
        'wifi' => 'boolean',
        'ac' => 'boolean',
        'fully_furnished' => 'boolean',
        'kamar_mandi_dalam' => 'boolean',
        'parkir' => 'boolean',
        'cctv' => 'boolean',

    ];

    public function multimedia()
    {
        return $this->hasMany(Multimedia::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}

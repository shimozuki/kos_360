<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class KamarFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [

            'kode_kamar' => 'KM-' . fake()->unique()->numberBetween(100, 999),

            'nama_kamar' => fake()->randomElement([
                'Kamar Exclusive',
                'Kamar Premium',
                'Kamar Deluxe',
                'Kamar Standard',
                'Kamar VIP',
            ]),

            'harga' => fake()->randomElement([
                500000,
                750000,
                1000000,
                1250000,
                1500000,
            ]),

            'fasilitas' => implode(', ', fake()->randomElements([
                'AC',
                'WiFi',
                'Kamar Mandi Dalam',
                'Kasur',
                'Lemari',
                'Meja Belajar',
                'TV',
                'Dapur Bersama',
            ], 4)),

            'deskripsi' => fake()->paragraph(),

            'status' => fake()->randomElement([
                'tersedia',
                'dipesan',
                'terisi',
            ]),

            'thumbnail' => 'https://picsum.photos/seed/' . fake()->uuid() . '/600/400',

        ];
    }
}

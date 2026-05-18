<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // admin default
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'phone' => '08123456789',
            'address' => 'Admin Address',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // dummy users
        User::factory(50)->create();
    }
}

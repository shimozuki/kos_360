<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kamers', function (Blueprint $table) {

            $table->id();

            $table->string('kode_kamar')->unique();

            $table->string('nama_kamar');

            $table->bigInteger('harga');

            $table->text('fasilitas');

            $table->text('deskripsi')->nullable();

            $table->enum('status', [
                'tersedia',
                'dipesan',
                'terisi',
                'maintenance'
            ])->default('tersedia');

            $table->string('thumbnail')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kamers');
    }
};

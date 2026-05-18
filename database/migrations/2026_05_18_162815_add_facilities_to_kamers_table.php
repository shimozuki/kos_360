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
        Schema::table('kamers', function (Blueprint $table) {

            $table->boolean('wifi')
                ->default(false);

            $table->boolean('ac')
                ->default(false);

            $table->boolean('fully_furnished')
                ->default(false);

            $table->boolean('kamar_mandi_dalam')
                ->default(false);

            $table->boolean('parkir')
                ->default(false);

            $table->boolean('cctv')
                ->default(false);

            $table->text('fasilitas_tambahan')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kamers', function (Blueprint $table) {

            $table->dropColumn([
                'wifi',
                'ac',
                'fully_furnished',
                'kamar_mandi_dalam',
                'parkir',
                'cctv',
                'fasilitas_tambahan',
            ]);
        });
    }
};

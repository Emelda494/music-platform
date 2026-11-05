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
        Schema::create('artist_playlist', function (Blueprint $table) {
            $table->id();

            $table->foreignId('playlist_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('artist_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->timestamps();

            // prevent duplicate artist in same playlist
            $table->unique(['playlist_id', 'artist_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artist_playlist');
    }
};
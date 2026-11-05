<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Artist;

class ArtistController extends Controller
{
    /**
     * GET /api/artists
     */
    public function index()
    {
        return response()->json(Artist::latest()->get(), 200);
    }

    /**
     * GET /api/artists/{artist}
     */
    public function show(Artist $artist)
    {
        return response()->json($artist, 200);
    }

    /**
     * POST /api/artists
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => ['required','string','max:255'],
            'genre'     => ['nullable','string','max:255'],
            'bio'       => ['nullable','string'],
            'image_url' => ['nullable','string','max:255'],
        ]);

       
        $artist = Artist::create([
            'user_id'   => $request->user()->id,
            'name'      => $validated['name'],
            'genre'     => $validated['genre'] ?? null,
            'bio'       => $validated['bio'] ?? null,
            'image_url' => $validated['image_url'] ?? null,
        ]);

        return response()->json($artist, 201);
    }

    /**
     * PUT/PATCH /api/artists/{artist}
     */
    public function update(Request $request, Artist $artist)
    {
        
        if ($artist->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'name'      => ['sometimes','required','string','max:255'],
            'genre'     => ['nullable','string','max:255'],
            'bio'       => ['nullable','string'],
            'image_url' => ['nullable','string','max:255'],
        ]);

        $artist->update($validated);

        return response()->json($artist, 200);
    }

    /**
     * DELETE /api/artists/{artist}
     */
    public function destroy(Request $request, Artist $artist)
    {
       
        if ($artist->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $artist->delete();

        return response()->json(null, 204);
    }
}
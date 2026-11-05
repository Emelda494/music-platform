<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Song;
use App\Models\Like;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index()
    {
        return Song::with(['artist', 'user'])->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'artist_id' => ['required', 'exists:artists,id'],
            'title' => ['required', 'string', 'max:255'],
            'genre' => ['nullable', 'string', 'max:255'],
            'duration_seconds' => ['nullable', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
        ]);

        $song = Song::create([
            'artist_id' => $validated['artist_id'],
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'genre' => $validated['genre'] ?? null,
            'duration_seconds' => $validated['duration_seconds'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return $song->load(['artist', 'user']);
    }

    public function destroy(Request $request, Song $song)
    {
        
        $isOwner = $song->user_id === $request->user()->id;

        
        $isAdmin = (bool) ($request->user()->is_admin ?? false);

        if (!($isOwner || $isAdmin)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $song->delete();
        return response()->json(['message' => 'Deleted']);
    }
    public function toggleLike(Request $request, Song $song)
    {
        $userId = $request->user()->id;

        $existing = Like::where('user_id', $userId)
            ->where('song_id', $song->id)
            ->first();

        if ($existing) {
            $existing->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => $userId,
                'song_id' => $song->id,
            ]);
            $liked = true;
        }

        $likesCount = Like::where('song_id', $song->id)->count();

        return response()->json([
            'liked' => $liked,
            'likes_count' => $likesCount,
        ]);
    }
}
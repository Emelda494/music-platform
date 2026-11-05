<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Song;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    // Toggle like/unlike
    public function toggle(Request $request, Song $song)
    {
        $user = $request->user();

        $existing = Like::where('user_id', $user->id)
            ->where('song_id', $song->id)
            ->first();

        if ($existing) {
            $existing->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => $user->id,
                'song_id' => $song->id,
            ]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $song->likes()->count(),
        ]);
    }
}
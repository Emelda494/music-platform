<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User; 

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'genre',
        'bio',
        'image_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function songs()
{
    return $this->hasMany(Song::class);
}
}
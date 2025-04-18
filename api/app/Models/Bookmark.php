<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    /** @use HasFactory<\Database\Factories\BookmarkFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'file_id'];
    protected $hidden = ['user_id', 'id'];

    public $timestamps = false;
}

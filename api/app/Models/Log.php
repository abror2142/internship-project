<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    /** @use HasFactory<\Database\Factories\LogFactory> */
    use HasFactory;

    protected $fillable  = ['action', 'user_id', 'successful'];

    public $timestamps = false;

    public function user() {
        return $this->belongsTo(User::class);
    }
}

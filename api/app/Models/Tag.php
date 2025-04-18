<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /** @use HasFactory<\Database\Factories\TagFactory> */
    use HasFactory;

    protected $fillable = ['name', 'created_at'];
    protected $hidden = ['pivot'];
    public $timestamps = false;

    public function files()
    {
        return $this->belongsToMany(File::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /** @use HasFactory<\Database\Factories\FileFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'path', 'user_id', 'size', 'storage', 'file_type_id'];

    protected $hidden = ['user_id', 'file_type_id'];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function fileType()
    {
        return $this->belongsTo(FileType::class);
    }
}

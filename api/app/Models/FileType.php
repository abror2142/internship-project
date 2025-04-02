<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileType extends Model
{
    /** @use HasFactory<\Database\Factories\FileTypeFactory> */
    use HasFactory;

    protected $fillable = ['name', 'isEnabled', 'image'];

    public function fileExtensions () {
        return $this->hasMany(FileExtension::class);
    }
}

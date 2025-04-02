<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileExtension extends Model
{
    /** @use HasFactory<\Database\Factories\FileExtensionFactory> */
    use HasFactory;
    protected $fillable = ['name', 'isEnabled', 'image', 'file_type_id'];

    public function fileType () {
        return $this->belongsTo(FileType::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class File extends Model
{
    /** @use HasFactory<\Database\Factories\FileFactory> */
    use HasFactory, Searchable;

    protected $fillable = ['name', 'description', 'path', 'user_id', 'size', 'storage', 'file_type_id', 'actions'];

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

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'user_id' => $this->user_id,
            'tags' => $this->tags->pluck('name')->toArray(),
        ];
    }

}

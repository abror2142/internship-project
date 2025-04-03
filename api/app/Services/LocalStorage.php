<?php

namespace App\Services;

use App\Contracts\StorageInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\Flysystem\Visibility;

class LocalStorage implements StorageInterface {
    protected $storage;

    public function __construct(){
        $this->storage = Storage::disk('local');
    }

    public function upload($file, $path) 
    {
        try {
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $file->name = $fileName;
            $this->storage->putFile($path, $file, Visibility::PRIVATE);
        } catch (\Throwable $th) {
            $fileName = null;
        }
        return $fileName;
    }

    public function download($filePath)
    {

    }

    public function delete($filePath)
    {
        
    }
}
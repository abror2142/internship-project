<?php

namespace App\Services;

use App\Contracts\StorageInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LocalStorage implements StorageInterface {
    protected $storage;

    public function __construct(){
        $this->storage = Storage::disk('public');
    }

    public function upload($file, $path) 
    {
        try {
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $this->storage->putFileAs($path, $file, $fileName);
        } catch (\Throwable $th) {
            $fileName = null;
        }
        return $fileName;
    }

    public function download($filePath)
    {   
        $path = env('DEFAULT_FILE_PATH') . '/'. $filePath;
        if($this->storage->exists($path)){
            return  env('BASE_URL') . '/' . $path;
        }
        return null;
    }

    public function delete($filePath)
    {
        $path = env('DEFAULT_FILE_PATH') . '/' .$filePath;
        if($this->storage->exists($path)){
            return $this->storage->delete($path);
        }
        return null;
    }
}
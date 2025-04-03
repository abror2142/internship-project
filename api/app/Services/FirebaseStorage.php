<?php

namespace App\Services;

use App\Contracts\StorageInterface;
use Illuminate\Support\Str;

class FirebaseStorage implements StorageInterface {
    protected $bucket;

    public function __construct() {
        $this->bucket = app('firebase.storage')->getBucket();
    }

    public function upload($file, $path) 
    {   
        try {
            $fileName = $path . '/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
            $fileStream = fopen($file->getPathname(), 'r');
            $this->bucket->upload($fileStream, ['name' => $fileName]);
        } catch (\Throwable $th) {
            $fileName = null;
        }
        return $fileName;
    }       

    public function download($filePath)
    {
        $expires = new \DateTime('tomorrow');
        $object = $this->bucket->object($filePath);
        if($object->exists()){
            return $object->signedUrl($expires);
        }
        return null;
    }

    public function delete($filePath)
    {
        $object = $this->bucket->object($filePath);
        if($object->exists()){
            return $object->delete();
        }
        return null;
    }
}
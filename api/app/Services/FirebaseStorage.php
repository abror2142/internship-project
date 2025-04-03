<?php

namespace App\Services;

use App\Contracts\StorageInterface;
use Illuminate\Support\Str;

class FirebaseStorage implements StorageInterface {
    public function upload($file, $path) 
    {   
        try {
            $fileName = $path . '/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
            $fileStream = fopen($file->getPathname(), 'r');
            app('firebase.storage')
                ->getBucket('forms-7f0e4.firebasestorage.app')
                ->upload($fileStream, ['name' => $fileName]);
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
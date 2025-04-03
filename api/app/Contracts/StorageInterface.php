<?php

namespace App\Contracts;

interface StorageInterface {
    public function upload($file, $path);
    public function download($filePath);
    public function delete($filePath);
}
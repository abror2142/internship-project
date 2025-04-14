<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileExtensionRequest;
use App\Http\Requests\UpdateFileExtensionRequest;
use App\Models\FileExtension;

class FileExtensionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all extensions
        return FileExtension::all();
    }

    /**
     * Display a listing of the resource.
     */
    public function enabled()
    {
        // Return all extensions
        return FileExtension::where('isEnabled', 1)->select(['id', 'name', 'image', 'file_type_id'])->with('fileType:id,name,image')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileExtensionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FileExtension $fileExtension)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileExtensionRequest $request, FileExtension $fileExtension)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FileExtension $fileExtension)
    {
        //
    }
}

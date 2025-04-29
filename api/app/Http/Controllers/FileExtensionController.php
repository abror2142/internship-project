<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileExtensionRequest;
use Illuminate\Http\Request;
use App\Models\FileExtension;

class FileExtensionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all extensions
        return FileExtension::with('fileType:id,name,image')->get();
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
    public function update(Request $request, FileExtension $fileExtension)
    {
        $request->validate([
            '*.id' => 'required|integer',
            '*.name' => 'required|string|max:50',
            '*.image' => 'string|nullable',
            '*.isEnabled' => 'required|number'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FileExtension $fileExtension)
    {
        //
    }
}

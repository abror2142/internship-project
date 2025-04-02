<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileTypeRequest;
use App\Http\Requests\UpdateFileTypeRequest;
use App\Models\FileType;

class FileTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FileType $fileType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileTypeRequest $request, FileType $fileType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FileType $fileType)
    {
        //
    }
}

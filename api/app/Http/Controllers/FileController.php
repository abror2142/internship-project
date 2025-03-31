<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\UpdateFileRequest;
use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Tag;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all files
        return response()->json([
            'files' => File::with(['tags:id,name'])->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Store a file
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|max:255',
            'path' => 'string',
            'tags' => 'array'
        ]);
        
        $user = auth()->user();

        $file = File::create([
            'name' => $request->name,
            'description' => $request->description,
            'path' => $request->path,
            'user_id' => $user->getAuthIdentifier()
        ]);

        $tags = collect($request->tags)->map(function ($tagName) {
            return Tag::firstOrCreate(attributes: ['name' => $tagName])->id;
        });

        $file->tags()->sync($tags);

        return response()->json([
            'file' => $file,
            'message' => 'Successfully uploded!'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        // Return one File
        return $file;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        // Update file
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|max:255',
            'path' => 'string',
            'tags' => 'array'
        ]);
        
        $user = auth()->user();
        $fields = [
            'name' => $request->name,
            'description' => $request->description,
            'path' => $request->path,
            'user_id' => $user->getAuthIdentifier()
        ];
        
        $file->update($fields);

        $tags = collect($request->tags)->map(function ($tagName) {
            return Tag::firstOrCreate(attributes: ['name' => $tagName])->id;
        });

        $file->tags()->sync($tags);

        return response()->json([
            'file' => $file,
            'message' => 'Successfully updated!'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        // Delete given file
        $file.delete();
        return response()->json([
            'message' => 'File deleted successfully!'
        ]);
    }
}

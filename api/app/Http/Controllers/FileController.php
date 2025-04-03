<?php

namespace App\Http\Controllers;

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
            // 'tags' => 'array'
        ]);

        $file = $request->file('file');
        $extension = $file->getExtension();

        $path = app('firebase_storage')->upload($file, env('DEFAULT_FILE_PATH'));
        
        if($path === null) {
            return response()->json(['message' => 'File not uploaded!'], 400);
        }

        $file = File::create([
            'name' => $request->name,
            'description' => $request->description,
            'path' => str($path),
            'size' => $file->getSize(),
            'user_id' => auth()->user()->getAuthIdentifier()
        ]);

        $tags = [];

        $file->tags()->sync($tags);

        return response()->json([
            'file' => $file,
            'message' => 'Successfully uploded!',
            'extension' => $extension
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        $url = app('firebase_storage')->download($file['path']);
        return response()->json([
            'file' => $file,
            'url' => $url
        ]);
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
            'tags' => 'array'
        ]);
        
        $fields = [
            'name' => $request->name,
            'description' => $request->description
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
        app('firebase_storage')->delete($file->path);
        $file->delete();
        return response()->json([
            'message' => 'File deleted successfully!'
        ]);
    }
}

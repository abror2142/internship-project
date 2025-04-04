<?php

namespace App\Http\Controllers;

use App\Models\FileType;
use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Tag;

class FileController extends Controller
{
    protected $storage;

    public function __construct(){
        $this->storage = app(config('settings.storage'));
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all files
        $user = auth()->user();
        if($user->hasRole('admin')){
            return File::with(['tags:id,name', 'fileType:id,name,image'])->get();
        }
        return File::where('user_id', $user->id)->with(['tags:id,name', 'fileType:id,name,image'])->get();
    }

    public function recent()
    {
        // Return all files
        $user = auth()->user();
        // dd( File::with(['tags:id,name', 'type:id,name,image'])->orderBy('created_at')->get());
        if($user->hasRole('admin')){
            return File::with(['tags:id,name', 'fileType:id,name,image'])->orderBy('created_at')->get();
        }
        return File::where('user_id', $user->id)->with(['tags:id,name', 'fileType:id,name,image'])->orderByDesc('created_at')->get();
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
            'type' => 'required|exists:file_types,name'
            // 'tags' => 'array'
        ]);

        $file = $request->file('file');
        $extension = $file->getExtension();
        
        
        $path = $this->storage->upload($file, env('DEFAULT_FILE_PATH'));
        
        if($path === null) {
            return response()->json(['message' => 'File not uploaded!'], 400);
        }
        $type = FileType::where('name', $request->type)->first();

        $file = File::create([
            'name' => $request->name,
            'description' => $request->description,
            'path' => str($path),
            'size' => $file->getSize(),
            'file_type_id' => $type['id'],
            'storage' => config('settings.storage'),
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
        $url = $this->storage->download($file['path']);
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
        $this->storage->delete($file->path);
        $file->delete();
        return response()->json([
            'message' => 'File deleted successfully!'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\FileType;
use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Tag;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    protected $storage;

    public function __construct(){
        if(config('settings.storage') !== 'api'){
            $this->storage = app(config('settings.storage'));
        } else {
            $this->storage = null;
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Return all files
        $user = auth()->user();

        if($user->hasRole('admin')){
            return File::with(['tags:id,name', 'fileType:id,name,image'])->get();
        }

        $query = File::where('user_id', $user->id)->with(['tags:id,name', 'fileType:id,name,image']);
        
        if($request->query('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('name', $request->query('tag'));
            });
        }

        if($request->query('type')) {
            $query->whereHas('fileType', function ($q) use ($request) {
                $q->where('name', $request->query('type'));
            });
        }
        
        if($request->query('storage')) {
            $query->where('storage', $request->query('storage'));
        }

        $metric = 1024 * 1024; // Default Value is MegaByte
        if($request->query('metric')){
            if($request->query('metric') === 'kb'){
                $metric = 1024;
            } else if ($request->query('metric') === 'gb') {
                $metric = 1024 * 1024 * 1024;
            } else if($request->query('metric') === 'b') {
                $metric = 1;
            }
        }

        if($request->query('min') && is_numeric($request->query('min'))) {
            $min = $metric * $request->query('min');
            $query->where('size', '>', $min); 
        }

        if($request->query('max') && is_numeric($request->query('max'))) {
            $min = $metric * $request->query('max');
            $query->where('size', '<', $min); 
        }

        return $query->get();
    }

    public function recent()
    {
        // Return all files
        $user = auth()->user();
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
            'type' => 'required|exists:file_types,name',
            'tags' => 'array',
            'path' => 'nullable|string',
            'size' => 'nullable|integer'
        ]);

        if(config('settings.storage') !== 'api') {
            $file = $request->file('file');
            $extension = $file->getExtension();
            $path = $this->storage->upload($file, env('FILE_PATH'));
            $size = $file->getSize();
        } else {
            $path = $request->path;
            $size = $request->size;
        }
          
        if($path === null) {
            return response()->json(['message' => 'File not uploaded!'], 400);
        }

        $type = FileType::where('name', $request->type)->first();

        $file = File::create([
            'name' => $request->name,
            'description' => $request->description,
            'path' => str($path),
            'size' => $size,
            'file_type_id' => $type['id'],
            'storage' => config('settings.storage'),
            'user_id' => auth()->user()->getAuthIdentifier()
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
        if(config('settings.storage') === 'api'){
            $url = $file['path'];
        }else {
            $url = $this->storage->download($file['path']);
        }
        return response()->json([
            'file' => $file,
            'url' => $url
        ]);
    }

    public function download(File $file)
    {
        if($file['storage'] === 'firebase'){
            return app('firebase')->download($file['path']);
        } else if ($file['storage'] === 'local') {
            return app('local')->download($file['path']);
        } else if ($file['storage'] === 'api') {
            return $file['path'];
        }
        return null;
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
        if($file['storage'] === 'firebase'){
            app('firebase')->delete($file['path']);
        } else if ($file['storage'] === 'local') {
            app('local')->delete($file['path']);
        } 
        $file->delete();
        return response()->json([
            'message' => 'File deleted successfully!'
        ]);
    }
}

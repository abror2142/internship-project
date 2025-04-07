<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return list of all tags;
        $tags = Tag::select("id", "name")->get();
        return response($tags, 200);
    }

    public function usedTags() 
    {
        $user = auth()->user();
        $files = File::where('user_id', $user->getAuthIdentifier())->get();
        $tags = [];

        foreach ($files as $file) {
            foreach ($file->tags as $tag) {
                if(!in_array($tag->name, $tags))
                    array_push($tags, $tag->name);
                # code...
            }
            # code...
        }
        return $tags;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Create a tag.
        $fields = $request->validate([
            'name' => 'required|max:50'
        ]);

        $tag = Tag::create($fields);

        return response()->json([
            'message' => 'Tag created successfully.',
            'tag' => $tag
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        // Display a tag.
        return response()->json(['tag' => $tag], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        // Update a tag.
        $fields = $request->validate([
            'name' => 'required|max:50'
        ]);

        $tag->update($fields);

        return response()->json([
            'message' => 'Tag updated successfully!'
        ], 200);
    }  

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        // Delete a tag.
        $tag->delete();
        return response()->json([
            'message' => 'Tag deleted successfully!'
        ], 204);
    }

    public function merge(Request $request)
    {
        $request->validate([
            'from' => 'required|max:50|exists:tags,name',
            'to' => 'required|max:50|exists:tags,name'
        ]);

        $tagToKeep = Tag::where('name', $request->to)->first();
        $tagToRemove = Tag::where('name', $request->from)->first();

        if($tagToKeep && $tagToRemove) {
            $tagToRemove->files()->update(['tag_id' => $tagToKeep->id]);
            
            $tagToRemove->delete();
            return response()->json([
                'message' => 'Tags merged successfully!'
            ], 200);
        }
        
        return response()->json([
            'message' => 'Tag not found.'
        ], 400);
    }
}

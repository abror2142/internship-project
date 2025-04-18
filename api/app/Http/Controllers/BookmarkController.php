<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarkRequest;
use App\Http\Requests\UpdateBookmarkRequest;
use App\Models\Bookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
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
    public function store(Request $request)
    {
        //
        $request->validate([
            'file_id' => 'required|exists:files,id'
        ]);

        $user = auth()->user();
        $bookmark = Bookmark::create([
            'user_id' => $user->id,
            'file_id' => $request->file_id
        ]);

        return response()->json([
            'message' => 'Successfully bookmarked!',
            'bookmark' => $bookmark
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookmark $bookmark)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookmarkRequest $request, Bookmark $bookmark)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark)
    {
        //
    }
}

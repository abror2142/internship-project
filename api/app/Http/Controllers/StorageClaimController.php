<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStorageClaimRequest;
use App\Http\Requests\UpdateStorageClaimRequest;
use App\Models\StorageClaim;
use Illuminate\Http\Request;

class StorageClaimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return StorageClaim::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'plan_id' => 'required|exists:plans,id'
        ]);

        $user = auth()->user();
        
        $storageClaim = StorageClaim::create([
            'user_id' => $user->id,
            'plan_id' => $request->plan_id
        ]);

        return response()->json([
            'message' => 'Successfully Requested!',
            'claim' => $storageClaim
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StorageClaim $storageClaim)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStorageClaimRequest $request, StorageClaim $storageClaim)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StorageClaim $storageClaim)
    {
        //
    }
}

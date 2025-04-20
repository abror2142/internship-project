<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStorageClaimRequest;
use App\Http\Requests\UpdateStorageClaimRequest;
use App\Models\ClaimStatus;
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
        return StorageClaim::with(['user:id,name,storage', 'plan:id,name,sizeLabel', 'claimStatus:id,name'])->get();
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
            'plan_id' => $request->plan_id,
            'claim_status_id' => ClaimStatus::where('name', 'sent')->first()->id,
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

    public function newClaimsCount()
    {
        $status = ClaimStatus::where('name', 'sent')->first()->id;
        $count = StorageClaim::where('claim_status_id', $status)->count();
        return response()->json(['count' => $count]);
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

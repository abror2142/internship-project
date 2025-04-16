<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserInfoRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserInfo;

class UserInfoController extends Controller
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
    public function store(StoreUserInfoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = auth()->user();
        $userInfo = UserInfo::firstOrCreate(['user_id' => $user->id])->refresh();
        $userInfo->load('country:id,name,code');
        return $userInfo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $userInfo = auth()->user()->userInfo;
  
        $fields = $request->validate([
            'birthdate' => 'nullable|date',
            'job' => 'nullable|string|max:255',
            'country_id' => 'nullable|integer|exists:countries,id',
            'phoneNumber' => 'nullable|string|max:50',
            'address' => 'nullable|max:255'
        ]);

        $userInfo->update($fields);
        return $userInfo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserInfo $userInfo)
    {
        //
    }
}

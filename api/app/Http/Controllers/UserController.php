<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function deactivateUser (Request $request) 
    {
        $request->validate([
            'users' => 'array',
            'users.*' => 'numeric|exists:users,id'
        ]);

        foreach ($request->users as $id) {
            $user = User::where('id', $id)->first();
            if($user && $user->is_active){
                $user->update(['is_active' => false]);
            }
        }

        return response()->json(['message' => 'Users has been deactivated successfully!'], 200);
    }

    public function activateUser (Request $request)
    {   
        $request->validate([
            'users' => 'array',
            'users.*' => 'numeric|exists:users,id'
        ]);

        foreach ($request->users as $id) {
            $user = User::where('id', $id)->first();
            if($user && !$user->is_active){
                $user->update(['is_active' => true]);
            }
        }

        return response()->json(['message' => 'Users has been activated successfully!'], 200);
    }

    public function updateStorage (Request $request) 
    {
        $request->validate([
            'users' => 'array',
            'users.*' => 'numeric|exists:users,id',
            'storage' => 'required|integer'
        ]);
        
        $newStorage = $request->storage;
        foreach ($request->users as $id) {
            $user = User::where('id', $id)->first();
            if($user){
                $user->update(['storage' => $newStorage]);
            }
        }
        
        return response()->json(['message' => 'Users storage updated successfully!'], 200);
    }

    public function addAdminRole (Request $request)
    {
        $request->validate([
            'users' => 'array',
            'users.*' => 'numeric|exists:users,id'
        ]);

        foreach ($request->users as $id) {
            $user = User::where('id', $id)->first();
            if($user && !$user->hasRole('admin')){
                $user->assignRole('admin');
            }
        }
        return response()->json(['message' => "Admin role attached to users successfully!"], 200);
    }

    public function deleteUsers (Request $request)
    {
        $request->validate([
            'users' => 'array',
            'users.*' => 'numeric|exists:users,id'
        ]);

        foreach ($request->users as $id) {
            $user = User::where('id', $id)->first();
            if($user){
                $user->delete();
            }
        }
        return response()->json(['message' => "Users deleted successfully!"], 204);
    }

    public function removeAdminRole (Request $request)
    {
        $request->validate([
            'users' => 'array',
            'users.*' => 'numeric|exists:users,id'
        ]);

        foreach ($request->users as $id) {
            $user = User::where('id', $id)->first();
            if($user && $user->hasRole('admin')){
                $user->removeRole('admin');
            }
        }
        return response()->json(['message' => "Admin role removed from users successfully!"], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // List all users.
        return response()->json(User::with('roles:name')->paginate(10), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Create a new user.
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'required|max:10',
        ]);

        if(!Role::where('name', $request->role)->exists()){
            return response()->json(['message' => "Role {$request->role} does not exist."], 400);
        };

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password)
        ]);

        $user->assignRole($request->role);
        
        return response()->json([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name']
            ],
            'message' => 'User has been created successfully.'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // Displays one user.
        $user->load(['roles:id,name']);
        return response()->json($user, 200);
    }

        /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Update a user.
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user->update($fields);

        return response()->json([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name']
            ],
            'message' => 'User has been updated successfully.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Delete a user.
        $user->delete();
        return response()->json(['message' => 'User has been deleted.'], 204);
    }

    public function storageInfo () 
    {
        $user = auth()->user();
        $used = File::where('user_id', $user->id)->sum('size');
        $total = $user->storage;
        return response()->json([
            'used' => $used,
            'total' => $total
        ]);
    }

    public function updateImage(Request $request) 
    {
        $request->validate([
            'image' => 'required|string'
        ]);

        $user = auth()->user();
        $user->update(['image' => $request->image]);

        return $user;
    }

}

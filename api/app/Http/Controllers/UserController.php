<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function deactivateUser (User $user) 
    {
        if(!$user->is_active){
            return response()->json(['message' => 'This user is already not active!'], 400);
        }
        $user->update(['is_active' => false]);
        return response()->json(['message' => 'User has been blocked successfully!'], 200);
    }

    public function activateUser (User $user)
    {   
        if($user->is_active){
            return response()->json(['message' => 'This user is already active!'], 400);
        }
        $user->update(['is_active' => true]);
        return response()->json(['message' => 'User has been activated successfully!'], 200);
    }

    public function updateStorage (Request $request, User $user) 
    {
        $request->validate([
            'storage' => 'required|integer|gt:0'
        ]);

        $newStorage = $request->storage;

        $user->update(['storage' => $newStorage]);
        return response()->json(['message' => 'User Storage updated successfully!'], 200);
    }

    public function addAdminRole (User $user)
    {
        if($user->hasRole('admin')){
            return response()->json(['message' => 'This user has already admin role.'], 400);
        }

        $user->assignRole('admin');
        return response()->json(['message' => "Admin role attached to {$user->name} successfully!"], 200);
    }

    public function removeAdminRole (User $user)
    {
        if(!$user->hasRole('admin')){
            return response()->json(['message' => 'This user does not have admin role.'], 400);
        }

        $user->removeRole('admin');
        return response()->json(['message' => "Admin role removed from {$user->name} successfully!"], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // List all users.
        return response()->json(['users' => User::all()], 200);
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
        return response()->json(['user' => $user], 200);
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

}

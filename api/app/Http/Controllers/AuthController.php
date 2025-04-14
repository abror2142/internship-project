<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Auth;

class AuthController extends Controller
{
    // Register
    public function register (Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $fields['storage'] = config(key: 'settings.storage_size_limit');
        $user = User::create($fields);
        $user->assignRole(roles: 'user');

        $token = Auth::login($user);
        
        return response()->json([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'image' => '',
                'roles' => $user->roles->pluck('name')
            ],
            'token' => $token
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        return $this->respondWithToken($token, $user);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        $user = auth()->user(); 
        return response()->json([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'image' => '',
                'roles' => $user->roles->pluck('name'),
                'storage' => [
                    'allocated' => (int) $user['storage'],
                    'used' => $user['used']
                ]
            ]
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $token = auth()->refresh();
            $user = auth()->user();
            return response()->json(['token'=>$token]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unauthenticated!'
            ], 401);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'image' => '',
                'roles' => $user->roles->pluck('name'),
                'storage' => [
                    'allocated' => (int) $user['storage'],
                    'used' => $user['used']
                ]
            ],
            'token' => $token,
        ]);
    }
}

<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware(['auth:api']);
Route::get('/me',[AuthController::class, 'me'])->middleware('auth:api');
Route::get('/user',[AuthController::class, 'user'])->middleware('auth:api');
Route::post('/refresh',[AuthController::class, 'refresh']);

Route::get('/files', [FileController::class, 'index']);
Route::get('/files/{file}', [FileController::class, 'show']);
Route::delete('/files/{file}', [FileController::class, 'destroy'])->middleware('auth:api');
Route::post('/files', [FileController::class, 'store'])->middleware('auth:api');
Route::put('/files/{file}', [FileController::class, 'update'])->middleware('auth:api');

Route::resource('tags', TagController::class)->except(['destroy', 'merge', 'edit']);

# Admin operations.
Route::middleware(['auth:api', 'role:admin'])->group(function(): void {

    # Tag management.
    Route::post('/tags/merge', [TagController::class, 'merge']);
    Route::delete('/tags', [TagController::class, 'destroy']);

    # System configuration.
    Route::post('/settings', [SettingsController::class, 'update']);

    # Individual Operations on a user.
    Route::post('/user/{user}/activate', [UserController::class, 'activateUser']);
    Route::post('/user/{user}/deactivate', [UserController::class, 'deactivateUser']);
    Route::post('/user/{user}/storage', [UserController::class, 'updateStorage']);
    Route::post('/user/{user}/make-admin', [UserController::class, 'addAdminRole']);
    Route::post('/user/{user}/remove-admin', [UserController::class, 'removeAdminRole']);

    # CRUD Operations on users
   Route::resource('users', UserController::class)->except(['edit']); 
});
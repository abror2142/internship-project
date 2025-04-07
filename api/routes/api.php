<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FileUrlController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ActionLogger;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware(['auth:api']);
Route::get('/me',[AuthController::class, 'me'])->middleware('auth:api');
Route::get('/user',[AuthController::class, 'user'])->middleware('auth:api');
Route::post('/refresh',[AuthController::class, 'refresh']);
Route::get('/user/storage-info',[UserController::class, 'storageInfo'])->middleware('auth:api');

Route::get('/files/recent', [FileController::class, 'recent'])->middleware('auth:api');
Route::get('/files', [FileController::class, 'index'])->middleware(['auth:api']);
Route::post('/files', [FileController::class, 'store'])->middleware(['auth:api', ActionLogger::class . ':upload']);
Route::get('/files/{file}', [FileController::class, 'show'])->middleware('auth:api');
Route::delete('/files/{file}', [FileController::class, 'destroy'])->middleware(['auth:api', ActionLogger::class . ':delete']);
Route::get('/search', [FileController::class, 'search'])->middleware(['auth:api', ActionLogger::class . ':search']);
Route::get('/my-tags', [TagController::class, 'usedTags'])->middleware(['auth:api']);

Route::get('/files-url', [FileUrlController::class, 'index']);
Route::get('/files-url/{file}', [FileUrlController::class, 'show']);
Route::delete('/files-url/{file}', [FileUrlController::class, 'destroy'])->middleware('auth:api');
Route::post('/files-url', [FileUrlController::class, 'store'])->middleware('auth:api');
Route::put('/files-url/{file}', [FileUrlController::class, 'update'])->middleware('auth:api');

Route::resource('tags', TagController::class)->except(['destroy', 'merge', 'edit']);
Route::get('/settings', [SettingsController::class, 'index'])->middleware('auth:api');

# Admin operations.
Route::middleware(['auth:api', 'role:admin'])->group(function(): void {

    # Tag management.
    Route::post('/tags/merge', [TagController::class, 'merge']);
    Route::delete('/tags', [TagController::class, 'destroy']);

    # System configuration.
    Route::post('/settings', [SettingsController::class, 'update']);

    # Individual Operations on a user.
    Route::post('/users/unblock', [UserController::class, 'activateUser']);
    Route::post('/users/block', [UserController::class, 'deactivateUser']);
    Route::post('/users/storage', [UserController::class, 'updateStorage']);
    Route::post('/users/make-admin', [UserController::class, 'addAdminRole']);
    Route::post('/users/remove-admin', [UserController::class, 'removeAdminRole']);
    Route::post('/users/delete-list', [UserController::class, 'deleteUsers']);

    # CRUD Operations on users
   Route::resource('users', UserController::class)->except(['edit']); 
});
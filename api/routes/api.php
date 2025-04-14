<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FileTypeController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ActionLogger;
use App\Http\Controllers\FileExtensionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware(['auth:api']);
Route::get('/me',[AuthController::class, 'me'])->middleware('auth:api');
Route::get('/user',[AuthController::class, 'user'])->middleware('auth:api');
Route::post('/refresh',[AuthController::class, 'refresh']);
Route::get('/user/storage-info',[UserController::class, 'storageInfo'])->middleware('auth:api');

Route::controller(FileController::class)
    ->prefix('files')
    ->name('files.')
    ->middleware(['auth:api'])
    ->group(function () {
        Route::get('/recent', 'recent')->name('recent');
        Route::get('/{file}/related', 'related')->name('related');
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->middleware(ActionLogger::class . ':upload')->name('store');
        Route::put('/{file}', 'update')->name('update');
        Route::get('/{file}', 'show')->name('show');
        Route::get('/{file}/download', 'download')->name('download');
        Route::delete('/{file}', 'destroy')
            ->middleware(ActionLogger::class . ':delete')
            ->name('destroy');
    }
);

Route::get('/search', [FileController::class, 'search'])->middleware(['auth:api', ActionLogger::class . ':search']);
Route::get('/my-tags', [TagController::class, 'usedTags'])->middleware(['auth:api']);


Route::resource('tags', TagController::class)->except(['destroy', 'merge', 'edit']);
Route::get('/settings', [SettingsController::class, 'index'])->middleware('auth:api');

Route::get('/types', [FileTypeController::class, 'index']);
Route::get('/extensions/enabled', [FileExtensionController::class, 'enabled']);

# Admin operations.
Route::middleware(['auth:api', 'role:admin'])->group(function(): void {

    # Tag management.
    Route::post('/tags/merge', [TagController::class, 'merge']);
    Route::delete('/tags/{tag}', [TagController::class, 'destroy']);

    # System configuration.
    Route::post('/settings', [SettingsController::class, 'update']);
    Route::get('/extensions', [FileExtensionController::class, 'index']);

    # Individual Operations on a user.
    Route::post('/users/unblock', [UserController::class, 'activateUser']);
    Route::post('/users/block', [UserController::class, 'deactivateUser']);
    Route::post('/users/storage', [UserController::class, 'updateStorage']);
    Route::post('/users/make-admin', [UserController::class, 'addAdminRole']);
    Route::post('/users/remove-admin', [UserController::class, 'removeAdminRole']);
    Route::post('/users/delete-list', [UserController::class, 'deleteUsers']);

    # CRUD Operations on users
   Route::resource('users', UserController::class)->except(['edit']); 

   # Logs
   Route::get('/logs', [LogController::class, 'index']);
});

Route::fallback(function () {
    return response()->json(['message' => 'Route not found!'], 404);
});
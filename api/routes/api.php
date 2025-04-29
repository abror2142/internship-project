<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FileTypeController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StorageClaimController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserInfoController;
use App\Http\Middleware\ActionLogger;
use App\Http\Controllers\FileExtensionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlanController;

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware(['auth:api']);
Route::get('/me',[UserController::class, 'me'])->middleware('auth:api');
Route::get('/user',[AuthController::class, 'user'])->middleware('auth:api');
Route::post('/refresh',[AuthController::class, 'refresh']);
Route::put('/update/image',[UserController::class, 'updateImage']);
Route::get('/user/storage-info',[UserController::class, 'storageInfo'])->middleware('auth:api');

Route::get('/plans', [PlanController::class, 'index']);
Route::post('/claim-storage', [StorageClaimController::class, 'store'])->middleware(['auth:api']);

Route::controller(FileController::class)
    ->prefix('files')
    ->name('files.')
    ->middleware(['auth:api'])
    ->group(function () {
        Route::get('/recent', 'recent')->name('recent');
        Route::get('/suggested', 'suggested')->name('recent');
        Route::get('/{file}/related', 'related')->name('related');
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->middleware(ActionLogger::class . ':upload')->name('store');
        Route::put('/{file}', 'update')->name('update');
        Route::get('/{file}', 'show')->name('show');
        Route::delete('/{file}', 'destroy')
        ->middleware(ActionLogger::class . ':delete')
        ->name('destroy');
    }
);

# This is a separate route because it does not require permissions.
Route::get('/files/{file}/download', [FileController::class, 'download'])->name('download');

Route::get('/search', [FileController::class, 'search'])->middleware(['auth:api', ActionLogger::class . ':search']);
Route::get('/my-tags', [TagController::class, 'usedTags'])->middleware(['auth:api']);

Route::resource('tags', TagController::class)->except(['destroy', 'merge', 'edit']);
Route::get('/settings', [SettingsController::class, 'index'])->middleware('auth:api');
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/user-info', [UserInfoController::class, 'show'])->middleware(['auth:api']);
Route::put('/user-info', [UserInfoController::class, 'update'])->middleware(['auth:api']);

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
    Route::put('/extensions', [FileExtensionController::class, 'update']);
    Route::get('/claims', [StorageClaimController::class, 'index']);
    Route::get('/new-claims/count', [StorageClaimController::class, 'newClaimsCount']);

    # Individual Operations on a user.
    Route::post('/users/unblock', [UserController::class, 'activateUser'])->middleware([ActionLogger::class . ':activate-user']);
    Route::post('/users/block', [UserController::class, 'deactivateUser'])->middleware([ActionLogger::class . ':deactivate-user']);
    Route::post('/users/storage', [UserController::class, 'updateStorage'])->middleware([ActionLogger::class . ':update-storage']);
    Route::post('/users/make-admin', [UserController::class, 'addAdminRole'])->middleware([ActionLogger::class . ':make-admin']);
    Route::post('/users/remove-admin', [UserController::class, 'removeAdminRole'])->middleware([ActionLogger::class . ':remove-admin']);
    Route::post('/users/delete-list', [UserController::class, 'deleteUsers'])->middleware([ActionLogger::class . ':delete-user']);

    # CRUD Operations on users
   Route::resource('users', UserController::class)->except(['edit']); 

   # Logs
   Route::get('/logs', [LogController::class, 'index']);
});

Route::fallback(function () {
    return response()->json(['message' => 'Route not found!'], 404);
});
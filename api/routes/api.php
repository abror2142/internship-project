<?php

use App\Http\Controllers\FileController;
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

<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('search', function() {
    $query = ''; // <-- Change the query for testing.
    // Visit the /search route in your web browser to see articles that match the test $query.

    $articles = App\Models\File::search($query)->get();

    return $articles;
});


require __DIR__.'/auth.php';

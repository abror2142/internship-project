<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Individual File Size Limit
    |--------------------------------------------------------------------------
    |
    | This value is used to limit the size of the file which can be
    | uploaded by a user. 
    |
    | ** This limit can be dynamically changed by admin
    | with the help of database write to the settings table.
    |
    */

    'file_size_limit' => 10 * 1024 * 1024,  // 10 MB limit

    /*
    |--------------------------------------------------------------------------
    | Storage Size Limit for users
    |--------------------------------------------------------------------------
    |
    | This value defines the default size of the storage that will
    | be allocated to the user by default. 
    |
    | ** This limit can also be dynamically changed by admin
    | with the help of database write to the settings table. As a result,
    | new users get the newly specified amount of storage.
    |
    */

    'storage_size_limit' => 1024 * 1024 * 1024, // 1 GB limit

    /*
    |--------------------------------------------------------------------------
    | Type of Storage fo file
    |--------------------------------------------------------------------------
    |
    | This value represents the 'type' of storage the uploaded
    | file should be kept. Possible values are local, firebase, api.
    |
    | local -> stores the file in the public folder of the local storage.
    | firebase -> stores the file in the firebase storage.
    | api -> interestingly, stores the file url which is provided by frontend.
    |        by doing that the backend does not manage the file itself, but
    |        only interacts with the url. The upload/delete/read done by frontend app.
    |
    | ** This limit can also be dynamically changed by admin
    | with the help of database write to the settings table. When changed
    | the system starts to accept the requests that follow the specified 
    | settings.
    |
    */

    'storage' => 'local'  // Store in local storage.
];
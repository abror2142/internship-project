<?php

namespace App\Providers;

use App\Models\Settings;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Firebase service register.
        // e.g. app('firebase_storage') will be available inside controller
        $this->app->bind('firebase', function ($app) {
            return new \App\Services\FirebaseStorage();
        });

        // LocalStorage service register. 
        // e.g. app('local_storage') will be available inside controller
        $this->app->bind('local', function ($app) {
            return new \App\Services\LocalStorage();
        });

        // This is used to provide settings in config globally.
        // e.g. config('file_size_limit') will be available
        if (Schema::hasTable('settings')) {
            $settings = Settings::all();
            foreach ($settings as $setting) {
                config()->set("settings.{$setting->key}", $setting->value);
            }
        }

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

    }
}

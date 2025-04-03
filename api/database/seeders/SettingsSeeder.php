<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Settings Seeder.
        Settings::create(['key' => 'storage_size_limit', 'value' => 1 * 1024 * 1024 * 1024]);
        Settings::create(['key' => 'file_size_limit', 'value' => 10 * 1024 * 1024]);
        Settings::create(['key' => 'storage', 'value' => env('DEFAULT_STORAGE', 'local')]);
    }
}

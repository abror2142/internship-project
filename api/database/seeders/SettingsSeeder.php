<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Settings Seeder.
        Settings::create(['key' => 'storage_size_limit', 'value' => '1GB']);
        Settings::create(['key' => 'file_extentions', 'value' => '.png,.jpg,.jpeg,.pdf,.mp4,.mp3']);
        Settings::create(['key' => 'file_size_limit', 'value' => '10MB']);
    }
}

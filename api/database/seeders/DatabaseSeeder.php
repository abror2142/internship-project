<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SettingsSeeder::class);
        $this->call(PlanSeeder::class);
        $this->call(StatusSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(FileTypeSeeder::class);
        $this->call(FileExtensionSeeder::class);
        $this->call(CountrySeeder::class);

        $user = User::create([
            'email' => 'abror2142@gmail.com',
            'password' => '6322136Aa',
            'name' => 'Abrorbek',
            'storage' => config('settings.storage_size_limit')
        ]);
        
        $user->assignRole('user');
        $this->command->info('User Abrorbek has been created!');
    }
}

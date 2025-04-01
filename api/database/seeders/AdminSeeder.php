<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        $admin = User::updateOrCreate([
            'email' => env('ADMIN_EMAIL')
        ], [
            'name' => 'Admin',
            'password' => bcrypt(env('ADMIN_PASSWORD'))
        ]);
        if(!$admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }
        
        $this->command->info('Admin user seeded successfully!');
    }
}

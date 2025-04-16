<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create initial countries;
        Country::create(['name' => 'Uzbekistan', 'code' => 'UZ']);
        Country::create(['name' => 'Germany', 'code' => 'DE']);
        Country::create(['name' => 'Japan', 'code' => 'JP']);
        Country::create(['name' => 'Finland', 'code' => 'FN']);
    }
}

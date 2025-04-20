<?php

namespace Database\Seeders;

use App\Models\ClaimStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ClaimStatus::create(['name' => 'sent']);
        ClaimStatus::create(['name' => 'approved']);
        ClaimStatus::create(['name' => 'rejected']);
    }
}

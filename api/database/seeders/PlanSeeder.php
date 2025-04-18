<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Plans
        Plan::create([
            'name' => 'Free', 
            'description' => 'Free plan will be available all subscribers', 
            'size' => 1024 * 1024 * 1024, 
            'sizeLabel' => '1 GB', 
            'billingPeriod' => 'Not billed', 
            'duration' => 'Free forever!',
            'price' => 0.0
        ]);
        Plan::create([
            'name' => 'Silver', 
            'description' => 'Silver plan offers more storage with reasonable price!', 
            'size' => 1024 * 1024 * 1024 * 50, 
            'sizeLabel' => '50 GB', 
            'billingPeriod' => 'Every month', 
            'duration' => 'Renewed every month!',
            'price' => 9.99
        ]);
        Plan::create([
            'name' => 'Gold', 
            'description' => 'Free plan will be available all subscribers', 
            'size' => 1024 * 1024 * 1024 * 200, 
            'sizeLabel' => '200 GB', 
            'billingPeriod' => 'Every month!', 
            'duration' => 'Renewed every month!',
            'price' => 19.99
        ]);
    }
}

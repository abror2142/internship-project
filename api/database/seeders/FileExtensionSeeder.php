<?php

namespace Database\Seeders;

use App\Models\FileType;
use App\Models\FileExtension;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileExtensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed File Extensions;
        FileExtension::create([
            'name' => '.png',
            'file_type_id' => FileType::where('name', 'image')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.jpg',
            'file_type_id' => FileType::where('name', 'image')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.mp3',
            'file_type_id' => FileType::where('name', 'audio')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.mp4',
            'file_type_id' => FileType::where('name', 'video')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.pdf',
            'file_type_id' => FileType::where('name', 'document')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.json',
            'file_type_id' => FileType::where('name', 'other')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.doc',
            'file_type_id' => FileType::where('name', 'document')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.avi',
            'file_type_id' => FileType::where('name', 'video')->first()->id,
            'image' => ''
        ]);
        FileExtension::create([
            'name' => '.svg',
            'file_type_id' => FileType::where('name', 'image')->first()->id,
            'image' => ''
        ]);
    }
}

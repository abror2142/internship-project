<?php

namespace Database\Seeders;

use App\Models\FileType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed file types.
        FileType::create([
            'name' => 'image', 
            'image' => 'https://firebasestorage.googleapis.com/v0/b/forms-7f0e4.firebasestorage.app/o/file-type%2Fpicture_11441082.png?alt=media&token=bfedcd9a-37e9-4869-81fe-f9be9891f201'
        ]);
        FileType::create([
            'name' => 'video', 
            'image' => 'https://firebasestorage.googleapis.com/v0/b/forms-7f0e4.firebasestorage.app/o/file-type%2Fmultimedia_3074767.png?alt=media&token=92b43769-f4ea-493b-bedd-34e690bb7343'
        ]);
        FileType::create([
            'name' => 'document', 
            'image' => 'https://firebasestorage.googleapis.com/v0/b/forms-7f0e4.firebasestorage.app/o/file-type%2Fdocuments_8897298.png?alt=media&token=607193a4-45e4-496f-9631-3572d575d51f'
        ]);
        FileType::create([
            'name' => 'audio', 
            'image' => 'https://firebasestorage.googleapis.com/v0/b/forms-7f0e4.firebasestorage.app/o/file-type%2Fheadphone_5993501.png?alt=media&token=c57b3976-47b2-4bb6-8748-a11b83de094d'
        ]);
        FileType::create([
            'name' => 'other', 
            'image' => 'https://firebasestorage.googleapis.com/v0/b/forms-7f0e4.firebasestorage.app/o/file-type%2Fmore_4124348.png?alt=media&token=e04916ef-1228-43ad-adfe-a797518122c9'
        ]);
    }
}

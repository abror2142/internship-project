<?php

use App\Models\FileType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('file_extensions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('isEnabled')->default(true);
            $table->string('image')->nullable();
            $table->foreignIdFor(FileType::class)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_extensions');
    }
};

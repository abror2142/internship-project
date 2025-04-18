<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageClaim extends Model
{
    /** @use HasFactory<\Database\Factories\StorageClaimFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'plan_id'];
}

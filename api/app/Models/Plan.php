<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    /** @use HasFactory<\Database\Factories\PlanFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'billingPeriod', 'duration', 'size', 'sizeLabel'];
    protected $hidden = ['size'];

    public function claims () 
    {
        return $this->hasMany(StorageClaim::class);
    }
}

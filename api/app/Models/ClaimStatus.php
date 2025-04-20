<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClaimStatus extends Model
{
    //

    protected $fillable = ['name'];
    protected $hiddedn = ['id'];

    public $timestamps = false;

    public function claims () 
    {
        return $this->hasMany(StorageClaim::class);
    }
}

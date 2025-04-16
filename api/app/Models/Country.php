<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /** @use HasFactory<\Database\Factories\CountryFactory> */
    use HasFactory;

    protected $fillable = ['name', 'code'];

    public $timestamps = false;

    public function userInfos ()
    {
        return $this->hasMany(UserInfo::class);
    }
}

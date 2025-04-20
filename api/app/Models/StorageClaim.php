<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageClaim extends Model
{
    /** @use HasFactory<\Database\Factories\StorageClaimFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'plan_id', 'claim_status_id'];

    protected $hidden = ['user_id', 'plan_id', 'claim_status_id'];

    public function plan () {
        return $this->belongsTo(Plan::class);
    }

    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function claimStatus ()
    {
        return $this->belongsTo(ClaimStatus::class);
    }
}

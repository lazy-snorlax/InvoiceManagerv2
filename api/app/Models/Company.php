<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';

    protected $fillable =[
        'company_name',
        'contact_name',
        'abn',
        'account_type',
        'email',
        'phone',
        'mobile',
        'location_address',
        'location_city',
        'location_state',
        'location_post_code',
        'postal_address',
        'postal_city',
        'postal_state',
        'postal_post_code',
    ];

    protected $hidden = [];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function accountType() : HasOne
    {
        return $this->hasOne(CreditType::class, 'id', 'account_type');
    }
}
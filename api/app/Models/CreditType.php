<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditType extends Model
{
    use HasFactory;

    protected $table = 'credit_types';

    protected $fillable =[
        'description',
        'days',
    ];

    protected $hidden = [];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
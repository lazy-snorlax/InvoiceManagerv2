<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TransactionMain extends Model
{
    use HasFactory;

    protected $table = 'transaction_main';

    protected $fillable = [
        'business_no',
        'type',
        'company_no',
        'order_no',
        'payment_no',
        'payment_detail',
        'paid',
        'note',
        'date_issued',
    ];

    protected $hidden = [];

    protected $casts = [
        'date_issued' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function headers() : HasMany
    {
        return $this->hasMany(TransactionHeader::class, 'transaction_main_id', 'id');
    }

    public function company() : HasOne
    {
        return $this->hasOne(Company::class, 'id', 'company_no');
    }
}
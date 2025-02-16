<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionHeader extends Model
{
    use HasFactory;

    protected $table = 'transaction_headers';

    protected $fillable = [
        'transaction_main_id',
        'description',
    ];

    protected $hidden = [];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function lines() : HasMany
    {
        return $this->hasMany(TransactionLine::class, 'transaction_header_id', 'id');
    }

    public function main() : BelongsTo
    {
        return $this->belongsTo(TransactionMain::class, 'id', 'transaction_main_id');
    }
}
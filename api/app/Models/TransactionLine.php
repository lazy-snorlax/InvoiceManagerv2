<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionLine extends Model
{
    use HasFactory;

    protected $table = 'transaction_lines';

    protected $fillable = [
        'transaction_header_id',
        'item',
        'description',
        'tax',
        'gst',
        'cost',
        'expense',
    ];

    protected $hidden = [];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function header() : BelongsTo
    {
        return $this->belongsTo(TransactionHeader::class);
    }
}
<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceLineResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'titleNo' => $this->transaction_header_id,
            'item' => $this->item,
            'description' => $this->description,
            'tax' => $this->tax * 100,
            'gst' => $this->gst,
            'cost' => $this->cost,
            'expense' => $this->expense,
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}
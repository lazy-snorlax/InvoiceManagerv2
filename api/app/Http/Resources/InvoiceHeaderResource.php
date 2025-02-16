<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceHeaderResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'titleNo' => $this->transaction_main_id,
            'description' => $this->description,
            'created_at' => $this->created_at->format('Y-m-d'),
            'lines' => InvoiceLineResource::collection($this->whenLoaded('lines'))
        ];
    }
}
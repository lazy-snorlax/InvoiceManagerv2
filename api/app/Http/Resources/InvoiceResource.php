<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'business_no' => $this->business_no,
            'company' => $this->company_no,
            'type' => $this->type,
            'order_no' => $this->order_no,
            'payment_no' => $this->payment_no,
            'payment_detail' => $this->payment_detail,
            'paid' => $this->paid,
            'note' => $this->note,
            'created_at' => $this->created_at?->format('Y-m-d'),
            'transactions' => InvoiceHeaderResource::collection($this->whenLoaded('headers'))
        ];
    }
}
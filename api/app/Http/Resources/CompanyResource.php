<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'contact_name' => $this->contact_name,
            'account_type' => $this->whenLoaded('accountType')->id,
            'abn' => $this->abn,
            'email' => $this->email,
            'phone' => $this->phone,
            'mobile' => $this->mobile,
            'location_address' => $this->location_address,
            'location_city' => $this->location_city,
            'location_state' => $this->location_state,
            'location_post_code' => $this->location_post_code,
            'postal_address' => $this->postal_address,
            'postal_city' => $this->postal_city,
            'postal_state' => $this->postal_state,
            'postal_post_code' => $this->postal_post_code,
        ];
    }
}
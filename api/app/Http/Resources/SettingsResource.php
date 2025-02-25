<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingsResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            "id" => $this->id,
            "business_name" => $this->business_name,
            "contact_name" => $this->contact_name,
            "logo_path" => $this->logo_path,
            "phone" => $this->phone,
            "mobile" => $this->mobile,
            "email" => $this->email,
            "abn" => $this->abn,
            "address" => $this->address,
            "city" => $this->city,
            "state" => $this->state,
            "post_code" => $this->post_code,
            "note1" => $this->note1,
            "note2" => $this->note2,
        ];
    }
}
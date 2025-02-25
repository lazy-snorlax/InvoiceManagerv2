<?php

namespace App\Http\Controllers;

use App\Http\Resources\SettingsResource;
use App\Models\BusinessSetting;
use Illuminate\Http\Request;

class BusinessSettingController extends Controller
{
    public function index(Request $request)
    {
        $settings = $request->user()->businessSettings()->first();
        return new SettingsResource($settings);
    }
    
    public function store(Request $request)
    {
        $settings = new BusinessSetting();
        $settings->fill($request->only([
            "business_name",
            "contact_name",
            "logo_path",
            "phone",
            "mobile",
            "email",
            "abn",
            "address",
            "city",
            "state",
            "post_code",
            "note1",
            "note2",
        ]));
        $settings->user_id = $request->user()->id;
        $settings->save();
        return new SettingsResource($settings);
    }
    
    public function update(Request $request, $id)
    {
        $settings = BusinessSetting::findOrFail($id);
        $settings->fill($request->only([
            "business_name",
            "contact_name",
            "logo_path",
            "phone",
            "mobile",
            "email",
            "abn",
            "address",
            "city",
            "state",
            "post_code",
            "note1",
            "note2",
        ]));
        $settings->save();
        return new SettingsResource($settings);
    }
}
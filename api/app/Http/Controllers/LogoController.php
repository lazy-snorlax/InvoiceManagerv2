<?php

namespace App\Http\Controllers;

use App\Http\Resources\SettingsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LogoController extends Controller
{
    public function show(Request $request)
    {
        $settings = $request->user()->businessSettings()->first();
        abort_if($settings->logo_path == null, 501, 'Logo not found');

        return Storage::disk('local')->response($settings->logo_path);
    }

    public function store(Request $request)
    {
        // Get current settings
        $settings = $request->user()->businessSettings()->first();
        if ($request->hasFile('file')) {
            // Delete existing
            if ($settings->logo_path != null) {
                Storage::disk('local')->delete($settings->logo_path);
                $settings->logo_path = null;
                $settings->save();
            }

            // Upload new
            $file = $request->file("file");
            $path = $file->store('images');

            // Store path in model
            $settings->logo_path = $path;
            $settings->save();
        }

        return new SettingsResource($settings);
    }
}
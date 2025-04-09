<?php

namespace App\Http\Controllers;

use App\Models\FileExtension;
use Illuminate\Http\Request;
use App\Models\Settings;

class SettingsController extends Controller
{
    public function index ()
    {   
        $settings = Settings::select("key","value")->get();
        $json = $settings->map(function ($setting) {
            return [$setting->key => $setting->value]; 
        });
        
        $extensions = FileExtension::with('fileType:id,name,image')->select('id','name','isEnabled','file_type_id')->get();

        return response()->json([
            'settings' => $json,
            'extensions' => $extensions
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'key' => 'required|string|exists:settings,key',
            'value' => 'required|string',
        ]);

        // Update setting in the database
        Settings::where('key', $request->key)->update(['value' => $request->value]);

        // Dynamically update config
        config(["settings.{$request->key}" => $request->value]);

        return response()->json(['message' => 'Setting updated successfully']);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminSettingController extends Controller
{
    /**
     * Update site settings batch.
     */
    public function update(Request $request): JsonResponse
    {
        $settings = $request->input('settings', []);

        if (! is_array($settings)) {
            return response()->json([
                'success' => false,
                'message' => 'Format pengaturan tidak valid.',
            ], 422);
        }

        foreach ($settings as $key => $value) {
            if (is_string($key)) {
                $setting = SiteSetting::where('key', $key)->first();
                if ($setting) {
                    $setting->value = is_array($value) ? json_encode($value) : $value;
                    $setting->save();
                    Cache::forget("site_setting_{$key}");
                } else {
                    SiteSetting::create([
                        'key' => $key,
                        'value' => is_array($value) ? json_encode($value) : $value,
                        'group' => 'general',
                        'type' => 'text',
                    ]);
                }
            }
        }

        Cache::forget('all_site_settings_map');

        ActivityLog::record('settings.update', 'Admin memperbarui pengaturan website');

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan website berhasil disimpan.',
            'settingsMap' => SiteSetting::allMap(),
        ]);
    }
}

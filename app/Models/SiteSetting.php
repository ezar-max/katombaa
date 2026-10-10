<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
        'description',
    ];

    /**
     * Get a setting by key.
     */
    public static function getValue(string $key, mixed $default = null): mixed
    {
        return Cache::rememberForever("site_setting_{$key}", function () use ($key, $default) {
            $setting = static::where('key', $key)->first();

            return $setting ? $setting->value : $default;
        });
    }

    /**
     * Set a setting by key.
     */
    public static function setValue(string $key, mixed $value, string $group = 'general', string $type = 'text'): self
    {
        Cache::forget("site_setting_{$key}");
        Cache::forget('all_site_settings_map');

        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'group' => $group,
                'type' => $type,
            ]
        );
    }

    /**
     * Get all settings as key => value dictionary.
     *
     * @return array<string, mixed>
     */
    public static function allMap(): array
    {
        return Cache::rememberForever('all_site_settings_map', function () {
            $map = static::pluck('value', 'key')->toArray();

            // Compatibility aliases between naming conventions
            if (isset($map['maps_url']) && ! isset($map['google_maps_url'])) {
                $map['google_maps_url'] = $map['maps_url'];
            } elseif (isset($map['google_maps_url']) && ! isset($map['maps_url'])) {
                $map['maps_url'] = $map['google_maps_url'];
            }

            if (isset($map['maps_embed_url']) && ! isset($map['google_maps_embed'])) {
                $map['google_maps_embed'] = $map['maps_embed_url'];
            } elseif (isset($map['google_maps_embed']) && ! isset($map['maps_embed_url'])) {
                $map['maps_embed_url'] = $map['google_maps_embed'];
            }

            if (isset($map['seo_title']) && ! isset($map['site_title'])) {
                $map['site_title'] = $map['seo_title'];
            } elseif (isset($map['site_title']) && ! isset($map['seo_title'])) {
                $map['seo_title'] = $map['site_title'];
            }

            if (isset($map['seo_description']) && ! isset($map['meta_description'])) {
                $map['meta_description'] = $map['seo_description'];
            } elseif (isset($map['meta_description']) && ! isset($map['seo_description'])) {
                $map['seo_description'] = $map['meta_description'];
            }

            if (isset($map['seo_keywords']) && ! isset($map['meta_keywords'])) {
                $map['meta_keywords'] = $map['seo_keywords'];
            } elseif (isset($map['meta_keywords']) && ! isset($map['seo_keywords'])) {
                $map['seo_keywords'] = $map['meta_keywords'];
            }

            if (isset($map['contact_phone']) && ! isset($map['phone'])) {
                $map['phone'] = $map['contact_phone'];
            } elseif (isset($map['phone']) && ! isset($map['contact_phone'])) {
                $map['contact_phone'] = $map['phone'];
            }

            if (isset($map['contact_email']) && ! isset($map['email'])) {
                $map['email'] = $map['contact_email'];
            } elseif (isset($map['email']) && ! isset($map['contact_email'])) {
                $map['contact_email'] = $map['email'];
            }

            return $map;
        });
    }
}

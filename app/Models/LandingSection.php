<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_key',
        'title',
        'subtitle',
        'badge',
        'description',
        'image_url',
        'image_mobile_url',
        'cta_text',
        'cta_url',
        'secondary_cta_text',
        'secondary_cta_url',
        'extra_data',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'extra_data' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'summary',
        'description',
        'image_url',
        'alt_text',
        'icon',
        'highlights',
        'is_published',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'highlights' => 'array',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope for published attractions.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)->orderBy('sort_order', 'asc');
    }
}

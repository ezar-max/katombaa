<?php

namespace Tests\Feature;

use App\Models\Attraction;
use Database\Seeders\KatoombaDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicLandingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(KatoombaDataSeeder::class);
    }

    /**
     * Test public landing page loads with HTTP 200 and hydrated state.
     */
    public function test_landing_page_renders_successfully_with_hydrated_data(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('Katoomba Greenpark');
        $response->assertSee('__INITIAL_DATA__', false);
        $response->assertSee('Bojong Nangka');
    }

    /**
     * Test preview query parameter loads with isPreview true flag in initial data.
     */
    public function test_landing_page_preview_mode_renders_successfully(): void
    {
        $response = $this->get('/?preview=true');

        $response->assertStatus(200);
        $response->assertSee('"isPreview":true', false);
    }

    /**
     * Test public JSON content API returns verified structure.
     */
    public function test_public_content_api_returns_expected_json_structure(): void
    {
        $response = $this->getJson('/api/content');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'settings' => [
                    'site_name',
                    'tagline',
                    'address',
                    'google_maps_url',
                ],
                'sections',
                'attractions',
                'gallery',
                'tickets',
                'facilities',
            ],
        ]);
        $response->assertJson([
            'success' => true,
        ]);
    }

    /**
     * Test inactive items are filtered out of public content API.
     */
    public function test_inactive_attractions_are_excluded_from_public_api(): void
    {
        $inactive = Attraction::create([
            'slug' => 'wahana-rahasia-baru',
            'title' => 'Wahana Rahasia Baru',
            'category' => 'Air',
            'short_description' => 'Dalam tahap renovasi',
            'is_published' => false,
            'sort_order' => 99,
        ]);

        $response = $this->getJson('/api/content');

        $response->assertStatus(200);
        $response->assertJsonMissing([
            'title' => 'Wahana Rahasia Baru',
        ]);
    }
}

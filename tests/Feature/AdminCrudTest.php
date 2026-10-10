<?php

namespace Tests\Feature;

use App\Models\Facility;
use App\Models\LandingSection;
use App\Models\User;
use Database\Seeders\KatoombaDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(KatoombaDataSeeder::class);
        $this->admin = User::where('email', 'admin@katoomba.id')->first();
    }

    /**
     * Test authenticated admin can get initial state data bundle.
     */
    public function test_admin_can_retrieve_aggregated_initial_data(): void
    {
        $response = $this->actingAs($this->admin)->getJson('/admin/data');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'user',
                'stats',
                'activities',
                'settings',
                'settingsMap',
                'sections',
                'attractions',
                'gallery',
                'tickets',
                'facilities',
            ],
        ]);
    }

    /**
     * Test admin can update site settings.
     */
    public function test_admin_can_update_site_settings(): void
    {
        $response = $this->actingAs($this->admin)->postJson('/admin/settings', [
            'settings' => [
                'site_name' => 'Katoomba Greenpark Updated',
                'tagline' => 'Wisata Air Terfavorit Bogor',
            ],
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
        ]);

        $this->assertDatabaseHas('site_settings', [
            'key' => 'site_name',
            'value' => 'Katoomba Greenpark Updated',
        ]);
    }

    /**
     * Test admin can update a landing section.
     */
    public function test_admin_can_update_landing_section(): void
    {
        $hero = LandingSection::where('section_key', 'hero')->first();

        $response = $this->actingAs($this->admin)->putJson("/admin/sections/{$hero->id}", [
            'title' => 'Petualangan Air Keluarga Terbaik di Bogor',
            'subtitle' => 'Sensasi liburan tak terlupakan di Katoomba',
            'badge' => 'DESTINASI FAVORIT 2025',
            'is_active' => true,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('landing_sections', [
            'id' => $hero->id,
            'title' => 'Petualangan Air Keluarga Terbaik di Bogor',
        ]);
    }

    /**
     * Test admin can store and delete a ticket price.
     */
    public function test_admin_can_crud_ticket_price(): void
    {
        // 1. Create ticket
        $createRes = $this->actingAs($this->admin)->postJson('/admin/tickets', [
            'name' => 'Paket Rombongan Sekolah',
            'price' => 30000,
            'price_formatted' => 'Rp 30.000',
            'days_valid' => 'Senin - Kamis (Min. 30 pax)',
            'note' => 'Khusus rombongan sekolah & edukasi',
            'is_active' => true,
            'sort_order' => 5,
        ]);

        $createRes->assertStatus(201);
        $ticketId = $createRes->json('ticket.id');

        $this->assertDatabaseHas('ticket_prices', [
            'id' => $ticketId,
            'name' => 'Paket Rombongan Sekolah',
        ]);

        // 2. Toggle status
        $toggleRes = $this->actingAs($this->admin)->postJson("/admin/tickets/{$ticketId}/toggle");
        $toggleRes->assertStatus(200);
        $toggleRes->assertJson(['is_active' => false]);

        // 3. Delete ticket
        $deleteRes = $this->actingAs($this->admin)->deleteJson("/admin/tickets/{$ticketId}");
        $deleteRes->assertStatus(200);

        $this->assertDatabaseMissing('ticket_prices', [
            'id' => $ticketId,
        ]);
    }

    /**
     * Test admin can store and toggle facility.
     */
    public function test_admin_can_crud_facility(): void
    {
        $createRes = $this->actingAs($this->admin)->postJson('/admin/facilities', [
            'name' => 'Gazebo Tepi Danau',
            'category' => 'Kenyamanan',
            'icon' => 'TreePine',
            'description' => 'Tempat duduk bersantai dengan pemandangan danau buatan',
            'is_active' => true,
            'sort_order' => 10,
        ]);

        $createRes->assertStatus(201);
        $facilityId = $createRes->json('facility.id');

        $this->assertDatabaseHas('facilities', [
            'id' => $facilityId,
            'name' => 'Gazebo Tepi Danau',
        ]);

        // Toggle status
        $toggleRes = $this->actingAs($this->admin)->postJson("/admin/facilities/{$facilityId}/toggle");
        $toggleRes->assertStatus(200);
        $toggleRes->assertJson(['is_active' => false]);
    }

    /**
     * Test admin can update profile.
     */
    public function test_admin_can_update_profile(): void
    {
        $response = $this->actingAs($this->admin)->postJson('/admin/profile', [
            'name' => 'Super Admin Katoomba',
            'email' => 'superadmin@katoomba.id',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $this->admin->id,
            'name' => 'Super Admin Katoomba',
            'email' => 'superadmin@katoomba.id',
        ]);
    }
}

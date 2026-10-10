<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\KatoombaDataSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(KatoombaDataSeeder::class);
    }

    /**
     * Test admin login page renders with HTTP 200.
     */
    public function test_login_page_renders_successfully(): void
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200);
        $response->assertSee('Katoomba Greenpark');
        $response->assertSee('Masuk ke Dashboard');
    }

    /**
     * Test unauthenticated access to admin dashboard redirects to login.
     */
    public function test_unauthenticated_user_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    /**
     * Test unauthenticated access to admin data API redirects to login.
     */
    public function test_unauthenticated_user_cannot_access_admin_data_api(): void
    {
        $response = $this->getJson('/admin/data');

        $response->assertStatus(401);
    }

    /**
     * Test admin login fails with incorrect password.
     */
    public function test_login_fails_with_invalid_credentials(): void
    {
        $response = $this->post('/admin/login', [
            'email' => 'admin@katoomba.id',
            'password' => 'WrongPassword123!',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    /**
     * Test admin login succeeds with seeded credentials.
     */
    public function test_admin_can_login_with_valid_credentials(): void
    {
        $response = $this->post('/admin/login', [
            'email' => 'admin@katoomba.id',
            'password' => 'AdminKatoomba2025!',
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticated();
    }

    /**
     * Test admin can logout.
     */
    public function test_authenticated_admin_can_logout(): void
    {
        $admin = User::where('email', 'admin@katoomba.id')->first();

        $response = $this->actingAs($admin)->post('/admin/logout');

        $response->assertRedirect('/admin/login');
        $this->assertGuest();
    }
}

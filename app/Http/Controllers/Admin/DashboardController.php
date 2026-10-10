<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Attraction;
use App\Models\Facility;
use App\Models\GalleryItem;
use App\Models\LandingSection;
use App\Models\SiteSetting;
use App\Models\TicketPrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Display the Admin Dashboard single page shell.
     */
    public function index(): View
    {
        $user = Auth::user();

        return view('admin.index', compact('user'));
    }

    /**
     * Get aggregated initial state data for the admin application.
     */
    public function getInitialData(): JsonResponse
    {
        $user = Auth::user();

        $stats = [
            'total_attractions' => Attraction::count(),
            'published_attractions' => Attraction::where('is_published', true)->count(),
            'draft_attractions' => Attraction::where('is_published', false)->count(),
            'total_gallery' => GalleryItem::count(),
            'published_gallery' => GalleryItem::where('is_published', true)->count(),
            'active_sections' => LandingSection::where('is_active', true)->count(),
            'total_sections' => LandingSection::count(),
            'total_tickets' => TicketPrice::count(),
            'total_facilities' => Facility::count(),
            'last_updated' => SiteSetting::max('updated_at') ?? now()->toDateTimeString(),
        ];

        $activities = ActivityLog::with('user:id,name,email')
            ->orderBy('id', 'desc')
            ->limit(12)
            ->get();

        $settings = SiteSetting::orderBy('group')->get();
        $settingsMap = SiteSetting::allMap();
        $sections = LandingSection::orderBy('sort_order', 'asc')->get();
        $attractions = Attraction::orderBy('sort_order', 'asc')->get();
        $gallery = GalleryItem::orderBy('sort_order', 'asc')->get();
        $tickets = TicketPrice::orderBy('sort_order', 'asc')->get();
        $facilities = Facility::orderBy('sort_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'stats' => $stats,
                'activities' => $activities,
                'settings' => $settings,
                'settingsMap' => $settingsMap,
                'sections' => $sections,
                'attractions' => $attractions,
                'gallery' => $gallery,
                'tickets' => $tickets,
                'facilities' => $facilities,
            ],
        ]);
    }

    /**
     * Update admin profile credentials.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'current_password' => ['nullable', 'string', 'required_with:new_password'],
            'new_password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        if (! empty($validated['new_password'])) {
            if (! Hash::check($validated['current_password'], $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kata sandi saat ini tidak sesuai.',
                ], 422);
            }

            $user->password = Hash::make($validated['new_password']);
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->save();

        ActivityLog::record('profile.update', 'Admin memperbarui informasi profil');

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}

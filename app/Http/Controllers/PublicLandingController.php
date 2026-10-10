<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\Facility;
use App\Models\GalleryItem;
use App\Models\LandingSection;
use App\Models\SiteSetting;
use App\Models\TicketPrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PublicLandingController extends Controller
{
    /**
     * Display the public landing page.
     */
    public function index(Request $request): View
    {
        $isPreview = $request->boolean('preview');
        $settings = SiteSetting::allMap();

        if ($isPreview) {
            $sections = LandingSection::orderBy('sort_order', 'asc')
                ->get()
                ->keyBy('section_key');
            $attractions = Attraction::orderBy('sort_order', 'asc')->get();
            $gallery = GalleryItem::orderBy('sort_order', 'asc')->get();
            $tickets = TicketPrice::orderBy('sort_order', 'asc')->get();
            $facilities = Facility::orderBy('sort_order', 'asc')->get();
        } else {
            $sections = LandingSection::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get()
                ->keyBy('section_key');
            $attractions = Attraction::published()->get();
            $gallery = GalleryItem::published()->get();
            $tickets = TicketPrice::active()->get();
            $facilities = Facility::active()->get();
        }

        $initialData = [
            'isPreview' => $isPreview,
            'settings' => $settings,
            'sections' => $sections,
            'attractions' => $attractions,
            'gallery' => $gallery,
            'tickets' => $tickets,
            'facilities' => $facilities,
            'isAdmin' => auth()->check(),
        ];

        return view('public.index', compact(
            'settings',
            'sections',
            'attractions',
            'gallery',
            'tickets',
            'facilities',
            'initialData',
            'isPreview'
        ));
    }

    /**
     * Get published landing page content as JSON.
     */
    public function apiContent(): JsonResponse
    {
        $settings = SiteSetting::allMap();
        $sections = LandingSection::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->keyBy('section_key');

        $attractions = Attraction::published()->get();
        $gallery = GalleryItem::published()->get();
        $tickets = TicketPrice::active()->get();
        $facilities = Facility::active()->get();

        return response()->json([
            'success' => true,
            'data' => [
                'settings' => $settings,
                'sections' => $sections,
                'attractions' => $attractions,
                'gallery' => $gallery,
                'tickets' => $tickets,
                'facilities' => $facilities,
            ],
        ]);
    }

    /**
     * Get preview data (including drafts) for authenticated admin preview.
     */
    public function apiPreview(): JsonResponse
    {
        $settings = SiteSetting::allMap();
        $sections = LandingSection::orderBy('sort_order', 'asc')->get()->keyBy('section_key');
        $attractions = Attraction::orderBy('sort_order', 'asc')->get();
        $gallery = GalleryItem::orderBy('sort_order', 'asc')->get();
        $tickets = TicketPrice::orderBy('sort_order', 'asc')->get();
        $facilities = Facility::orderBy('sort_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'preview' => true,
            'data' => [
                'settings' => $settings,
                'sections' => $sections,
                'attractions' => $attractions,
                'gallery' => $gallery,
                'tickets' => $tickets,
                'facilities' => $facilities,
            ],
        ]);
    }
}

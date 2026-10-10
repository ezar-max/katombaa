<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\LandingSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSectionController extends Controller
{
    /**
     * Update a landing page section.
     */
    public function update(Request $request, LandingSection $section): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'image_mobile_url' => ['nullable', 'string'],
            'cta_text' => ['nullable', 'string', 'max:100'],
            'cta_url' => ['nullable', 'string', 'max:255'],
            'secondary_cta_text' => ['nullable', 'string', 'max:100'],
            'secondary_cta_url' => ['nullable', 'string', 'max:255'],
            'extra_data' => ['nullable', 'array'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $section->update($validated);

        ActivityLog::record(
            'section.update',
            "Admin memperbarui section {$section->section_key} ({$section->title})"
        );

        return response()->json([
            'success' => true,
            'message' => "Section {$section->section_key} berhasil diperbarui.",
            'section' => $section,
        ]);
    }

    /**
     * Toggle section active status.
     */
    public function toggleStatus(LandingSection $section): JsonResponse
    {
        $section->is_active = ! $section->is_active;
        $section->save();

        $statusStr = $section->is_active ? 'diaktifkan' : 'dinonaktifkan';
        ActivityLog::record(
            'section.toggle',
            "Admin mengubah status section {$section->section_key} menjadi {$statusStr}"
        );

        return response()->json([
            'success' => true,
            'message' => "Section {$section->section_key} berhasil {$statusStr}.",
            'is_active' => $section->is_active,
            'section' => $section,
        ]);
    }
}

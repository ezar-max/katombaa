<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Facility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminFacilityController extends Controller
{
    /**
     * Store a new facility.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'icon' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $facility = Facility::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'icon' => $validated['icon'] ?? 'CheckCircle',
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'],
            'sort_order' => $validated['sort_order'] ?? (Facility::max('sort_order') + 1),
        ]);

        ActivityLog::record('facility.create', "Admin menambahkan fasilitas: {$facility->name}");

        return response()->json([
            'success' => true,
            'message' => 'Fasilitas berhasil ditambahkan.',
            'facility' => $facility,
        ], 201);
    }

    /**
     * Update the specified facility.
     */
    public function update(Request $request, Facility $facility): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'icon' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $facility->update($validated);

        ActivityLog::record('facility.update', "Admin memperbarui fasilitas: {$facility->name}");

        return response()->json([
            'success' => true,
            'message' => 'Fasilitas berhasil diperbarui.',
            'facility' => $facility,
        ]);
    }

    /**
     * Remove the specified facility.
     */
    public function destroy(Facility $facility): JsonResponse
    {
        $name = $facility->name;
        $facility->delete();

        ActivityLog::record('facility.delete', "Admin menghapus fasilitas: {$name}");

        return response()->json([
            'success' => true,
            'message' => 'Fasilitas berhasil dihapus.',
        ]);
    }

    /**
     * Toggle active status of facility.
     */
    public function toggleStatus(Facility $facility): JsonResponse
    {
        $facility->is_active = ! $facility->is_active;
        $facility->save();

        $statusStr = $facility->is_active ? 'diaktifkan' : 'dinonaktifkan';
        ActivityLog::record('facility.toggle', "Admin mengubah status fasilitas {$facility->name} menjadi {$statusStr}");

        return response()->json([
            'success' => true,
            'message' => "Fasilitas berhasil {$statusStr}.",
            'is_active' => $facility->is_active,
            'facility' => $facility,
        ]);
    }
}

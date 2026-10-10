<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Attraction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminAttractionController extends Controller
{
    /**
     * Store a new attraction.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'summary' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'image_url' => ['nullable', 'string'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:100'],
            'highlights' => ['nullable', 'array'],
            'is_published' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $slug = Str::slug($validated['title']);
        $count = Attraction::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug = "{$slug}-".($count + 1);
        }

        $imageUrl = $validated['image_url'] ?? null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('attractions', 'public');
            $imageUrl = Storage::url($path);
        }

        $attraction = Attraction::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $validated['category'],
            'summary' => $validated['summary'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $imageUrl,
            'alt_text' => $validated['alt_text'] ?? $validated['title'],
            'icon' => $validated['icon'] ?? 'Compass',
            'highlights' => $validated['highlights'] ?? [],
            'is_published' => $validated['is_published'],
            'sort_order' => $validated['sort_order'] ?? (Attraction::max('sort_order') + 1),
        ]);

        ActivityLog::record(
            'attraction.create',
            "Admin menambahkan daya tarik baru: {$attraction->title}"
        );

        return response()->json([
            'success' => true,
            'message' => 'Daya tarik berhasil ditambahkan.',
            'attraction' => $attraction,
        ], 201);
    }

    /**
     * Update the specified attraction.
     */
    public function update(Request $request, Attraction $attraction): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'summary' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'image_url' => ['nullable', 'string'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:100'],
            'highlights' => ['nullable', 'array'],
            'is_published' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $imageUrl = $validated['image_url'] ?? $attraction->image_url;

        if ($request->hasFile('image')) {
            // Delete old uploaded file if stored locally
            if ($attraction->image_url && Str::contains($attraction->image_url, '/storage/attractions/')) {
                $oldPath = Str::after($attraction->image_url, '/storage/');
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('attractions', 'public');
            $imageUrl = Storage::url($path);
        }

        $attraction->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'summary' => $validated['summary'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $imageUrl,
            'alt_text' => $validated['alt_text'] ?? $validated['title'],
            'icon' => $validated['icon'] ?? $attraction->icon,
            'highlights' => $validated['highlights'] ?? $attraction->highlights,
            'is_published' => $validated['is_published'],
            'sort_order' => $validated['sort_order'] ?? $attraction->sort_order,
        ]);

        ActivityLog::record(
            'attraction.update',
            "Admin memperbarui daya tarik: {$attraction->title}"
        );

        return response()->json([
            'success' => true,
            'message' => 'Daya tarik berhasil diperbarui.',
            'attraction' => $attraction,
        ]);
    }

    /**
     * Remove the specified attraction.
     */
    public function destroy(Attraction $attraction): JsonResponse
    {
        $title = $attraction->title;

        if ($attraction->image_url && Str::contains($attraction->image_url, '/storage/attractions/')) {
            $oldPath = Str::after($attraction->image_url, '/storage/');
            Storage::disk('public')->delete($oldPath);
        }

        $attraction->delete();

        ActivityLog::record(
            'attraction.delete',
            "Admin menghapus daya tarik: {$title}"
        );

        return response()->json([
            'success' => true,
            'message' => 'Daya tarik berhasil dihapus.',
        ]);
    }

    /**
     * Toggle published status of attraction.
     */
    public function toggleStatus(Attraction $attraction): JsonResponse
    {
        $attraction->is_published = ! $attraction->is_published;
        $attraction->save();

        $statusStr = $attraction->is_published ? 'dipublikasikan' : 'dijadikan draf';
        ActivityLog::record(
            'attraction.toggle',
            "Admin mengubah status daya tarik {$attraction->title} menjadi {$statusStr}"
        );

        return response()->json([
            'success' => true,
            'message' => "Daya tarik berhasil {$statusStr}.",
            'is_published' => $attraction->is_published,
            'attraction' => $attraction,
        ]);
    }

    /**
     * Reorder attractions.
     */
    public function updateOrder(Request $request): JsonResponse
    {
        $order = $request->input('order', []);

        foreach ($order as $index => $id) {
            Attraction::where('id', $id)->update(['sort_order' => $index + 1]);
        }

        ActivityLog::record('attraction.reorder', 'Admin memperbarui urutan tampilan daya tarik');

        return response()->json([
            'success' => true,
            'message' => 'Urutan daya tarik berhasil diperbarui.',
            'attractions' => Attraction::orderBy('sort_order', 'asc')->get(),
        ]);
    }
}

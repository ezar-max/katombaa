<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\GalleryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminGalleryController extends Controller
{
    /**
     * Store a new gallery item.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:100'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'image_url' => ['nullable', 'string'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'is_published' => ['required', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if (! $request->hasFile('image') && empty($validated['image_url'])) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan unggah berkas gambar atau masukkan URL gambar.',
            ], 422);
        }

        $imageUrl = $validated['image_url'] ?? null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $imageUrl = Storage::url($path);
        }

        $item = GalleryItem::create([
            'title' => $validated['title'],
            'caption' => $validated['caption'] ?? null,
            'category' => $validated['category'],
            'image_url' => $imageUrl,
            'alt_text' => $validated['alt_text'] ?? $validated['title'],
            'is_published' => $validated['is_published'],
            'is_featured' => $validated['is_featured'] ?? false,
            'sort_order' => $validated['sort_order'] ?? (GalleryItem::max('sort_order') + 1),
        ]);

        ActivityLog::record('gallery.create', "Admin mengunggah foto galeri: {$item->title}");

        return response()->json([
            'success' => true,
            'message' => 'Foto galeri berhasil ditambahkan.',
            'item' => $item,
        ], 201);
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, GalleryItem $galleryItem): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:100'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'image_url' => ['nullable', 'string'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'is_published' => ['required', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $imageUrl = $validated['image_url'] ?? $galleryItem->image_url;

        if ($request->hasFile('image')) {
            if ($galleryItem->image_url && Str::contains($galleryItem->image_url, '/storage/gallery/')) {
                $oldPath = Str::after($galleryItem->image_url, '/storage/');
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('gallery', 'public');
            $imageUrl = Storage::url($path);
        }

        $galleryItem->update([
            'title' => $validated['title'],
            'caption' => $validated['caption'] ?? null,
            'category' => $validated['category'],
            'image_url' => $imageUrl,
            'alt_text' => $validated['alt_text'] ?? $validated['title'],
            'is_published' => $validated['is_published'],
            'is_featured' => $validated['is_featured'] ?? $galleryItem->is_featured,
            'sort_order' => $validated['sort_order'] ?? $galleryItem->sort_order,
        ]);

        ActivityLog::record('gallery.update', "Admin memperbarui foto galeri: {$galleryItem->title}");

        return response()->json([
            'success' => true,
            'message' => 'Foto galeri berhasil diperbarui.',
            'item' => $galleryItem,
        ]);
    }

    /**
     * Remove the specified gallery item.
     */
    public function destroy(GalleryItem $galleryItem): JsonResponse
    {
        $title = $galleryItem->title;

        if ($galleryItem->image_url && Str::contains($galleryItem->image_url, '/storage/gallery/')) {
            $oldPath = Str::after($galleryItem->image_url, '/storage/');
            Storage::disk('public')->delete($oldPath);
        }

        $galleryItem->delete();

        ActivityLog::record('gallery.delete', "Admin menghapus foto galeri: {$title}");

        return response()->json([
            'success' => true,
            'message' => 'Foto galeri berhasil dihapus.',
        ]);
    }

    /**
     * Toggle published status of gallery item.
     */
    public function toggleStatus(GalleryItem $galleryItem): JsonResponse
    {
        $galleryItem->is_published = ! $galleryItem->is_published;
        $galleryItem->save();

        $statusStr = $galleryItem->is_published ? 'dipublikasikan' : 'dijadikan draf';
        ActivityLog::record('gallery.toggle', "Admin mengubah status galeri {$galleryItem->title} menjadi {$statusStr}");

        return response()->json([
            'success' => true,
            'message' => "Foto galeri berhasil {$statusStr}.",
            'is_published' => $galleryItem->is_published,
            'item' => $galleryItem,
        ]);
    }

    /**
     * Toggle featured status of gallery item.
     */
    public function toggleFeatured(GalleryItem $galleryItem): JsonResponse
    {
        $galleryItem->is_featured = ! $galleryItem->is_featured;
        $galleryItem->save();

        $featuredStr = $galleryItem->is_featured ? 'dijadikan sorotan (featured)' : 'dihapus dari sorotan';
        ActivityLog::record('gallery.featured', "Admin {$featuredStr} untuk {$galleryItem->title}");

        return response()->json([
            'success' => true,
            'message' => "Foto galeri berhasil {$featuredStr}.",
            'is_featured' => $galleryItem->is_featured,
            'item' => $galleryItem,
        ]);
    }

    /**
     * Reorder gallery items.
     */
    public function updateOrder(Request $request): JsonResponse
    {
        $order = $request->input('order', []);

        foreach ($order as $index => $id) {
            GalleryItem::where('id', $id)->update(['sort_order' => $index + 1]);
        }

        ActivityLog::record('gallery.reorder', 'Admin memperbarui susunan galeri');

        return response()->json([
            'success' => true,
            'message' => 'Urutan foto galeri berhasil diperbarui.',
            'gallery' => GalleryItem::orderBy('sort_order', 'asc')->get(),
        ]);
    }
}

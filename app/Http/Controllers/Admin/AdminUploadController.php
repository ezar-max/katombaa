<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminUploadController extends Controller
{
    /**
     * Handle generic image upload for banner, logo, or content.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'folder' => ['nullable', 'string', 'in:uploads,banners,heroes,sections'],
        ]);

        $folder = $request->input('folder', 'uploads');
        $file = $request->file('image');

        $filename = Str::random(32).'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs($folder, $filename, 'public');
        $url = Storage::url($path);

        ActivityLog::record('media.upload', "Admin mengunggah berkas gambar baru: {$filename}");

        return response()->json([
            'success' => true,
            'message' => 'Berkas berhasil diunggah.',
            'url' => $url,
            'filename' => $filename,
        ]);
    }
}

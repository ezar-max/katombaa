<?php

use App\Http\Controllers\Admin\AdminAttractionController;
use App\Http\Controllers\Admin\AdminFacilityController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminSectionController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminTicketController;
use App\Http\Controllers\Admin\AdminUploadController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\PublicLandingController;
use Illuminate\Support\Facades\Route;

// Public Website Routes
Route::get('/', [PublicLandingController::class, 'index'])->name('home');
Route::get('/api/content', [PublicLandingController::class, 'apiContent'])->name('api.content');

// Admin Auth Routes
Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.submit');
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

// Protected Admin Routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // Admin Shell & Data
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/data', [DashboardController::class, 'getInitialData'])->name('admin.data');
    // Profile
    Route::match(['post', 'put'], '/profile', [DashboardController::class, 'updateProfile'])->name('admin.profile.update');

    // Live Preview API
    Route::get('/preview-data', [PublicLandingController::class, 'apiPreview'])->name('admin.preview.data');

    // Global Settings
    Route::match(['post', 'put'], '/settings', [AdminSettingController::class, 'update'])->name('admin.settings.update');

    // Landing Sections
    Route::match(['post', 'put', 'patch'], '/sections/{section}', [AdminSectionController::class, 'update'])->name('admin.sections.update');
    Route::match(['post', 'patch'], '/sections/{section}/toggle', [AdminSectionController::class, 'toggleStatus'])->name('admin.sections.toggle');

    // Attractions CRUD
    Route::post('/attractions', [AdminAttractionController::class, 'store'])->name('admin.attractions.store');
    Route::match(['post', 'put', 'patch'], '/attractions/{attraction}', [AdminAttractionController::class, 'update'])->name('admin.attractions.update');
    Route::delete('/attractions/{attraction}', [AdminAttractionController::class, 'destroy'])->name('admin.attractions.destroy');
    Route::match(['post', 'patch'], '/attractions/{attraction}/toggle', [AdminAttractionController::class, 'toggleStatus'])->name('admin.attractions.toggle');
    Route::post('/attractions/reorder', [AdminAttractionController::class, 'updateOrder'])->name('admin.attractions.reorder');

    // Gallery Items CRUD
    Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('admin.gallery.store');
    Route::match(['post', 'put', 'patch'], '/gallery/{galleryItem}', [AdminGalleryController::class, 'update'])->name('admin.gallery.update');
    Route::delete('/gallery/{galleryItem}', [AdminGalleryController::class, 'destroy'])->name('admin.gallery.destroy');
    Route::match(['post', 'patch'], '/gallery/{galleryItem}/toggle', [AdminGalleryController::class, 'toggleStatus'])->name('admin.gallery.toggle');
    Route::match(['post', 'patch'], '/gallery/{galleryItem}/feature', [AdminGalleryController::class, 'toggleFeatured'])->name('admin.gallery.feature');
    Route::post('/gallery/reorder', [AdminGalleryController::class, 'updateOrder'])->name('admin.gallery.reorder');

    // Ticket Prices CRUD
    Route::post('/tickets', [AdminTicketController::class, 'store'])->name('admin.tickets.store');
    Route::match(['post', 'put', 'patch'], '/tickets/{ticket}', [AdminTicketController::class, 'update'])->name('admin.tickets.update');
    Route::delete('/tickets/{ticket}', [AdminTicketController::class, 'destroy'])->name('admin.tickets.destroy');
    Route::match(['post', 'patch'], '/tickets/{ticket}/toggle', [AdminTicketController::class, 'toggleStatus'])->name('admin.tickets.toggle');
    Route::match(['post', 'patch'], '/tickets/{ticket}/toggle-status', [AdminTicketController::class, 'toggleStatus'])->name('admin.tickets.toggle-status');

    // Facilities CRUD
    Route::post('/facilities', [AdminFacilityController::class, 'store'])->name('admin.facilities.store');
    Route::match(['post', 'put', 'patch'], '/facilities/{facility}', [AdminFacilityController::class, 'update'])->name('admin.facilities.update');
    Route::delete('/facilities/{facility}', [AdminFacilityController::class, 'destroy'])->name('admin.facilities.destroy');
    Route::match(['post', 'patch'], '/facilities/{facility}/toggle', [AdminFacilityController::class, 'toggleStatus'])->name('admin.facilities.toggle');
    Route::match(['post', 'patch'], '/facilities/{facility}/toggle-status', [AdminFacilityController::class, 'toggleStatus'])->name('admin.facilities.toggle-status');

    // Media Upload
    Route::post('/upload', [AdminUploadController::class, 'upload'])->name('admin.upload');

    // SPA Sub-routes fallback for client-side navigation inside Admin
    Route::get('/{any}', [DashboardController::class, 'index'])->where('any', '.*');
});

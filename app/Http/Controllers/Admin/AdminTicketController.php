<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\TicketPrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminTicketController extends Controller
{
    /**
     * Store a new ticket price.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'price_formatted' => ['nullable', 'string', 'max:100'],
            'days_valid' => ['nullable', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:500'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['price_formatted'])) {
            $validated['price_formatted'] = $validated['price'] > 0
                ? 'Rp '.number_format($validated['price'], 0, ',', '.')
                : 'Gratis';
        }

        $ticket = TicketPrice::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'price_formatted' => $validated['price_formatted'],
            'days_valid' => $validated['days_valid'] ?? null,
            'note' => $validated['note'] ?? null,
            'is_active' => $validated['is_active'],
            'sort_order' => $validated['sort_order'] ?? (TicketPrice::max('sort_order') + 1),
        ]);

        ActivityLog::record('ticket.create', "Admin menambahkan paket tiket: {$ticket->name}");

        return response()->json([
            'success' => true,
            'message' => 'Paket tiket berhasil ditambahkan.',
            'ticket' => $ticket,
        ], 201);
    }

    /**
     * Update the specified ticket price.
     */
    public function update(Request $request, TicketPrice $ticket): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'price_formatted' => ['nullable', 'string', 'max:100'],
            'days_valid' => ['nullable', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:500'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['price_formatted'])) {
            $validated['price_formatted'] = $validated['price'] > 0
                ? 'Rp '.number_format($validated['price'], 0, ',', '.')
                : 'Gratis';
        }

        $ticket->update($validated);

        ActivityLog::record('ticket.update', "Admin memperbarui paket tiket: {$ticket->name}");

        return response()->json([
            'success' => true,
            'message' => 'Paket tiket berhasil diperbarui.',
            'ticket' => $ticket,
        ]);
    }

    /**
     * Remove the specified ticket price.
     */
    public function destroy(TicketPrice $ticket): JsonResponse
    {
        $name = $ticket->name;
        $ticket->delete();

        ActivityLog::record('ticket.delete', "Admin menghapus paket tiket: {$name}");

        return response()->json([
            'success' => true,
            'message' => 'Paket tiket berhasil dihapus.',
        ]);
    }

    /**
     * Toggle active status of ticket price.
     */
    public function toggleStatus(TicketPrice $ticket): JsonResponse
    {
        $ticket->is_active = ! $ticket->is_active;
        $ticket->save();

        $statusStr = $ticket->is_active ? 'diaktifkan' : 'dinonaktifkan';
        ActivityLog::record('ticket.toggle', "Admin mengubah status tiket {$ticket->name} menjadi {$statusStr}");

        return response()->json([
            'success' => true,
            'message' => "Paket tiket berhasil {$statusStr}.",
            'is_active' => $ticket->is_active,
            'ticket' => $ticket,
        ]);
    }
}

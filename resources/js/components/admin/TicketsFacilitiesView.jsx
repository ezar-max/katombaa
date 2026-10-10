import React, { useState } from 'react';
import { 
    Ticket, 
    Sparkles, 
    Plus, 
    Pencil, 
    Trash2, 
    Eye, 
    EyeOff, 
    CheckCircle2, 
    AlertCircle, 
    RefreshCw, 
    DollarSign,
    Layers,
    SlidersHorizontal,
    Coffee,
    Car,
    Waves,
    Droplets,
    TreePine,
    ShieldCheck,
    Store,
    Utensils,
    Music,
    Footprints,
    Info
} from 'lucide-react';
import { api } from '../../utils/api';

const AVAILABLE_ICONS = [
    { name: 'Waves', label: 'Kolam / Air', icon: Waves },
    { name: 'Droplets', label: 'Wahana Basah', icon: Droplets },
    { name: 'Coffee', label: 'Kantin / Kafe', icon: Coffee },
    { name: 'Utensils', label: 'Resto / Kuliner', icon: Utensils },
    { name: 'Car', label: 'Area Parkir', icon: Car },
    { name: 'TreePine', label: 'Taman / Gazebo', icon: TreePine },
    { name: 'ShieldCheck', label: 'Keamanan / Locker', icon: ShieldCheck },
    { name: 'Store', label: 'Toko Souvenir', icon: Store },
    { name: 'Music', label: 'Panggung Musik', icon: Music },
    { name: 'Footprints', label: 'Jogging Track', icon: Footprints },
    { name: 'Sparkles', label: 'Fasilitas Premium', icon: Sparkles },
    { name: 'CheckCircle', label: 'Umum / Standar', icon: CheckCircle2 }
];

export default function TicketsFacilitiesView({ initialTickets = [], initialFacilities = [], onDataChange }) {
    const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'facilities'
    const [tickets, setTickets] = useState(initialTickets);
    const [facilities, setFacilities] = useState(initialFacilities);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    // Modals
    const [ticketModalOpen, setTicketModalOpen] = useState(false);
    const [facilityModalOpen, setFacilityModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ open: false, type: null, item: null });

    // Forms
    const [ticketForm, setTicketForm] = useState({
        id: null,
        name: '',
        price: 35000,
        price_formatted: 'Rp 35.000',
        days_valid: 'Senin - Jumat (08.00 - 17.00 WIB)',
        note: 'Termasuk akses seluruh kolam renang anak & perosotan waterpark',
        is_active: true,
        sort_order: 1
    });

    const [facilityForm, setFacilityForm] = useState({
        id: null,
        name: '',
        category: 'Umum',
        icon: 'Waves',
        description: '',
        is_active: true,
        sort_order: 1
    });

    const showNotify = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    // --- TICKET HANDLERS ---
    const openAddTicket = () => {
        setTicketForm({
            id: null,
            name: '',
            price: 40000,
            price_formatted: 'Rp 40.000',
            days_valid: 'Sabtu - Minggu & Libur Nasional',
            note: '',
            is_active: true,
            sort_order: tickets.length + 1
        });
        setTicketModalOpen(true);
    };

    const openEditTicket = (t) => {
        setTicketForm({
            id: t.id,
            name: t.name,
            price: t.price,
            price_formatted: t.price_formatted || `Rp ${Number(t.price).toLocaleString('id-ID')}`,
            days_valid: t.days_valid || '',
            note: t.note || '',
            is_active: Boolean(t.is_active),
            sort_order: t.sort_order || 1
        });
        setTicketModalOpen(true);
    };

    const handleTicketSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            ...ticketForm,
            price: Number(ticketForm.price),
            is_active: Boolean(ticketForm.is_active),
            sort_order: Number(ticketForm.sort_order)
        };

        try {
            if (ticketForm.id) {
                const res = await api.put(`/admin/tickets/${ticketForm.id}`, payload);
                if (res.success) {
                    setTickets(prev => prev.map(item => item.id === ticketForm.id ? res.ticket : item));
                    showNotify('success', 'Paket tiket berhasil diperbarui');
                    setTicketModalOpen(false);
                    if (onDataChange) onDataChange();
                }
            } else {
                const res = await api.post('/admin/tickets', payload);
                if (res.success) {
                    setTickets(prev => [...prev, res.ticket]);
                    showNotify('success', 'Paket tiket baru berhasil ditambahkan');
                    setTicketModalOpen(false);
                    if (onDataChange) onDataChange();
                }
            }
        } catch (err) {
            showNotify('error', err.response?.data?.message || 'Gagal menyimpan data tiket');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTicketStatus = async (ticket) => {
        try {
            const res = await api.patch(`/admin/tickets/${ticket.id}/toggle-status`);
            if (res.success) {
                setTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, is_active: res.is_active } : t));
                showNotify('success', res.message);
                if (onDataChange) onDataChange();
            }
        } catch (err) {
            showNotify('error', 'Gagal memperbarui status tiket');
        }
    };

    // --- FACILITY HANDLERS ---
    const openAddFacility = () => {
        setFacilityForm({
            id: null,
            name: '',
            category: 'Umum',
            icon: 'Waves',
            description: '',
            is_active: true,
            sort_order: facilities.length + 1
        });
        setFacilityModalOpen(true);
    };

    const openEditFacility = (f) => {
        setFacilityForm({
            id: f.id,
            name: f.name,
            category: f.category || 'Umum',
            icon: f.icon || 'CheckCircle',
            description: f.description || '',
            is_active: Boolean(f.is_active),
            sort_order: f.sort_order || 1
        });
        setFacilityModalOpen(true);
    };

    const handleFacilitySubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            ...facilityForm,
            is_active: Boolean(facilityForm.is_active),
            sort_order: Number(facilityForm.sort_order)
        };

        try {
            if (facilityForm.id) {
                const res = await api.put(`/admin/facilities/${facilityForm.id}`, payload);
                if (res.success) {
                    setFacilities(prev => prev.map(item => item.id === facilityForm.id ? res.facility : item));
                    showNotify('success', 'Fasilitas berhasil diperbarui');
                    setFacilityModalOpen(false);
                    if (onDataChange) onDataChange();
                }
            } else {
                const res = await api.post('/admin/facilities', payload);
                if (res.success) {
                    setFacilities(prev => [...prev, res.facility]);
                    showNotify('success', 'Fasilitas baru berhasil ditambahkan');
                    setFacilityModalOpen(false);
                    if (onDataChange) onDataChange();
                }
            }
        } catch (err) {
            showNotify('error', err.response?.data?.message || 'Gagal menyimpan fasilitas');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFacilityStatus = async (facility) => {
        try {
            const res = await api.patch(`/admin/facilities/${facility.id}/toggle-status`);
            if (res.success) {
                setFacilities(prev => prev.map(f => f.id === facility.id ? { ...f, is_active: res.is_active } : f));
                showNotify('success', res.message);
                if (onDataChange) onDataChange();
            }
        } catch (err) {
            showNotify('error', 'Gagal memperbarui status fasilitas');
        }
    };

    // --- DELETE HANDLER ---
    const confirmDelete = (type, item) => {
        setDeleteModal({ open: true, type, item });
    };

    const executeDelete = async () => {
        const { type, item } = deleteModal;
        if (!item) return;

        setIsLoading(true);
        try {
            if (type === 'ticket') {
                const res = await api.delete(`/admin/tickets/${item.id}`);
                if (res.success) {
                    setTickets(prev => prev.filter(t => t.id !== item.id));
                    showNotify('success', res.message);
                }
            } else if (type === 'facility') {
                const res = await api.delete(`/admin/facilities/${item.id}`);
                if (res.success) {
                    setFacilities(prev => prev.filter(f => f.id !== item.id));
                    showNotify('success', res.message);
                }
            }
            setDeleteModal({ open: false, type: null, item: null });
            if (onDataChange) onDataChange();
        } catch (err) {
            showNotify('error', 'Gagal menghapus data');
        } finally {
            setIsLoading(false);
        }
    };

    // Render icon component helper
    const renderIcon = (iconName) => {
        const match = AVAILABLE_ICONS.find(i => i.name === iconName);
        const IconComponent = match ? match.icon : CheckCircle2;
        return <IconComponent className="w-5 h-5 text-[#0F3D5F]" />;
    };

    return (
        <div className="space-y-6">
            {/* Header with Title and Tabs */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#0F3D5F] flex items-center gap-2">
                        <Ticket className="w-6 h-6 text-[#059669]" />
                        Kelola Tiket Masuk & Fasilitas
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Atur struktur tarif tiket pengunjung dan fasilitas penunjang di Katoomba Greenpark
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                        <button
                            type="button"
                            onClick={() => setActiveTab('tickets')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                activeTab === 'tickets' 
                                    ? 'bg-white text-[#0F3D5F] shadow-xs' 
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Tiket Masuk ({tickets.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('facilities')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                activeTab === 'facilities' 
                                    ? 'bg-white text-[#0F3D5F] shadow-xs' 
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Fasilitas ({facilities.length})
                        </button>
                    </div>

                    {activeTab === 'tickets' ? (
                        <button
                            type="button"
                            onClick={openAddTicket}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all shadow-xs"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Tiket
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={openAddFacility}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all shadow-xs"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Fasilitas
                        </button>
                    )}
                </div>
            </div>

            {/* Notification Alert */}
            {notification && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border ${
                    notification.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                    {notification.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <p className="text-sm font-medium">{notification.message}</p>
                </div>
            )}

            {/* TAB CONTENT: TICKETS */}
            {activeTab === 'tickets' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {tickets.map((t) => (
                            <div 
                                key={t.id} 
                                className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                                    t.is_active ? 'border-slate-200 hover:border-[#0F3D5F]/30 hover:shadow-md' : 'border-slate-200 opacity-60 bg-slate-50'
                                }`}
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            t.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-700'
                                        }`}>
                                            {t.is_active ? 'Aktif Tayang' : 'Draft / Nonaktif'}
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">Urutan #{t.sort_order}</span>
                                    </div>

                                    <h3 className="font-bold text-lg text-slate-900">{t.name}</h3>
                                    <div className="mt-2 mb-3">
                                        <div className="text-2xl font-extrabold text-[#0F3D5F]">
                                            {t.price_formatted || (t.price > 0 ? `Rp ${Number(t.price).toLocaleString('id-ID')}` : 'Gratis')}
                                        </div>
                                        {t.days_valid && (
                                            <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                                                <Info className="w-3.5 h-3.5 text-slate-400" />
                                                {t.days_valid}
                                            </p>
                                        )}
                                    </div>

                                    {t.note && (
                                        <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                            {t.note}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => toggleTicketStatus(t)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            t.is_active 
                                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                        }`}
                                    >
                                        {t.is_active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        {t.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => openEditTicket(t)}
                                            className="p-2 rounded-lg text-slate-600 hover:text-[#0F3D5F] hover:bg-slate-100 transition-all"
                                            title="Edit Tiket"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => confirmDelete('ticket', t)}
                                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            title="Hapus Tiket"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {tickets.length === 0 && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h4 className="font-bold text-slate-700">Belum Ada Paket Tiket</h4>
                            <p className="text-sm text-slate-500 mt-1">Klik tombol "Tambah Tiket" untuk menambahkan paket tiket masuk.</p>
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT: FACILITIES */}
            {activeTab === 'facilities' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {facilities.map((f) => (
                            <div 
                                key={f.id}
                                className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                                    f.is_active ? 'border-slate-200 hover:border-[#0F3D5F]/30 hover:shadow-md' : 'border-slate-200 opacity-60 bg-slate-50'
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                            {renderIcon(f.icon)}
                                        </div>
                                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                            {f.category}
                                        </span>
                                    </div>

                                    <h4 className="font-bold text-slate-900">{f.name}</h4>
                                    {f.description && (
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                            {f.description}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => toggleFacilityStatus(f)}
                                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                                            f.is_active ? 'bg-slate-100 text-slate-700' : 'bg-emerald-50 text-emerald-700'
                                        }`}
                                    >
                                        {f.is_active ? 'Aktif' : 'Off'}
                                    </button>

                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => openEditFacility(f)}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0F3D5F] hover:bg-slate-100 transition-all"
                                            title="Edit Fasilitas"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => confirmDelete('facility', f)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            title="Hapus Fasilitas"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {facilities.length === 0 && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h4 className="font-bold text-slate-700">Belum Ada Fasilitas</h4>
                            <p className="text-sm text-slate-500 mt-1">Klik tombol "Tambah Fasilitas" untuk mendaftarkan fasilitas penunjang.</p>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL: TICKET FORM */}
            {ticketModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#0F3D5F]">
                                {ticketForm.id ? 'Edit Paket Tiket' : 'Tambah Paket Tiket Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setTicketModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleTicketSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Nama Paket Tiket *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={ticketForm.name}
                                    onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                                    placeholder="Contoh: Tiket Weekday (Senin - Jumat)"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F] focus:ring-2 focus:ring-[#0F3D5F]/10"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Harga Numerik (Rp) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="1000"
                                        value={ticketForm.price}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setTicketForm({ 
                                                ...ticketForm, 
                                                price: val,
                                                price_formatted: val > 0 ? `Rp ${val.toLocaleString('id-ID')}` : 'Gratis'
                                            });
                                        }}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F] focus:ring-2 focus:ring-[#0F3D5F]/10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Format Tampilan Harga
                                    </label>
                                    <input
                                        type="text"
                                        value={ticketForm.price_formatted}
                                        onChange={(e) => setTicketForm({ ...ticketForm, price_formatted: e.target.value })}
                                        placeholder="Contoh: Rp 35.000"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F] focus:ring-2 focus:ring-[#0F3D5F]/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Hari / Jam Berlaku
                                </label>
                                <input
                                    type="text"
                                    value={ticketForm.days_valid}
                                    onChange={(e) => setTicketForm({ ...ticketForm, days_valid: e.target.value })}
                                    placeholder="Contoh: Senin - Jumat (08.00 - 17.00 WIB)"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F] focus:ring-2 focus:ring-[#0F3D5F]/10"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Catatan / Inklusi Tiket
                                </label>
                                <textarea
                                    rows="2"
                                    value={ticketForm.note}
                                    onChange={(e) => setTicketForm({ ...ticketForm, note: e.target.value })}
                                    placeholder="Contoh: Termasuk seluruh akses kolam renang anak & perosotan waterpark"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F] focus:ring-2 focus:ring-[#0F3D5F]/10"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Urutan Tampilan
                                    </label>
                                    <input
                                        type="number"
                                        value={ticketForm.sort_order}
                                        onChange={(e) => setTicketForm({ ...ticketForm, sort_order: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                    />
                                </div>
                                <div className="flex items-center pt-5">
                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={ticketForm.is_active}
                                            onChange={(e) => setTicketForm({ ...ticketForm, is_active: e.target.checked })}
                                            className="w-4 h-4 rounded text-[#0F3D5F] focus:ring-[#0F3D5F]"
                                        />
                                        <span className="text-sm font-semibold text-slate-700">Aktifkan Tiket</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setTicketModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-5 py-2 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all flex items-center gap-2"
                                >
                                    {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                                    Simpan Tiket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: FACILITY FORM */}
            {facilityModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#0F3D5F]">
                                {facilityForm.id ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setFacilityModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleFacilitySubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Nama Fasilitas *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={facilityForm.name}
                                    onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                                    placeholder="Contoh: Gazebo Santai Keluarga"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Kategori *
                                    </label>
                                    <select
                                        value={facilityForm.category}
                                        onChange={(e) => setFacilityForm({ ...facilityForm, category: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                    >
                                        <option value="Umum">Umum</option>
                                        <option value="Kenyamanan">Kenyamanan</option>
                                        <option value="Kuliner">Kuliner</option>
                                        <option value="Ibadah">Ibadah</option>
                                        <option value="Keamanan">Keamanan</option>
                                        <option value="Kendaraan">Kendaraan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Pilih Ikon
                                    </label>
                                    <select
                                        value={facilityForm.icon}
                                        onChange={(e) => setFacilityForm({ ...facilityForm, icon: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                    >
                                        {AVAILABLE_ICONS.map((ic) => (
                                            <option key={ic.name} value={ic.name}>
                                                {ic.name} ({ic.label})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Deskripsi Singkat
                                </label>
                                <textarea
                                    rows="2"
                                    value={facilityForm.description}
                                    onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                                    placeholder="Contoh: Tempat duduk teduh untuk istirahat keluarga di tepi kolam dan danau"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Urutan
                                    </label>
                                    <input
                                        type="number"
                                        value={facilityForm.sort_order}
                                        onChange={(e) => setFacilityForm({ ...facilityForm, sort_order: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                    />
                                </div>
                                <div className="flex items-center pt-5">
                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={facilityForm.is_active}
                                            onChange={(e) => setFacilityForm({ ...facilityForm, is_active: e.target.checked })}
                                            className="w-4 h-4 rounded text-[#0F3D5F] focus:ring-[#0F3D5F]"
                                        />
                                        <span className="text-sm font-semibold text-slate-700">Aktifkan Fasilitas</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFacilityModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-5 py-2 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all flex items-center gap-2"
                                >
                                    {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                                    Simpan Fasilitas
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: DELETE CONFIRMATION */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">Konfirmasi Hapus</h4>
                        <p className="text-sm text-slate-500 mt-2">
                            Apakah Anda yakin ingin menghapus {deleteModal.type === 'ticket' ? 'paket tiket' : 'fasilitas'}{' '}
                            <strong className="text-slate-700">"{deleteModal.item?.name}"</strong>?
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteModal({ open: false, type: null, item: null })}
                                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={executeDelete}
                                disabled={isLoading}
                                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-all"
                            >
                                Ya, Hapus Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

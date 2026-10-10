import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Compass, Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { apiRequest } from '../../utils/api';

export default function AttractionsView({ data = {}, onUpdate, showToast }) {
    const attractions = data.attractions || [];

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        category: 'Wahana Air',
        summary: '',
        description: '',
        image_url: '',
        alt_text: '',
        icon: 'Waves',
        highlights: ['', ''],
        is_published: true,
    });

    const categories = ['Semua', 'Wahana Air', 'Danau & Alam', 'Edukasi & Satwa', 'Hobi & Relaksasi', 'Fasilitas & Event'];

    const filtered = attractions.filter(a => {
        const matchSearch = a.title?.toLowerCase().includes(search.toLowerCase()) ||
            a.summary?.toLowerCase().includes(search.toLowerCase());
        const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
        return matchSearch && matchCat;
    });

    const openAddModal = () => {
        setEditingItem(null);
        setForm({
            title: '',
            category: 'Wahana Air',
            summary: '',
            description: '',
            image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
            alt_text: '',
            icon: 'Waves',
            highlights: ['Wahana Aman & Terawat', 'Didampingi Pengawas'],
            is_published: true,
        });
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setForm({
            title: item.title || '',
            category: item.category || 'Wahana Air',
            summary: item.summary || '',
            description: item.description || '',
            image_url: item.image_url || '',
            alt_text: item.alt_text || '',
            icon: item.icon || 'Waves',
            highlights: Array.isArray(item.highlights) && item.highlights.length > 0 ? [...item.highlights] : [''],
            is_published: item.is_published,
        });
        setModalOpen(true);
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'attractions');

        setUploading(true);
        try {
            const res = await apiRequest('/admin/upload', {
                method: 'POST',
                body: formData,
            });
            setForm(prev => ({ ...prev, image_url: res.url }));
            showToast('Foto wahana berhasil diunggah!', 'success');
        } catch (err) {
            showToast(err.message || 'Gagal mengunggah foto.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleHighlightChange = (idx, val) => {
        const next = [...form.highlights];
        next[idx] = val;
        setForm({ ...form, highlights: next });
    };

    const addHighlight = () => {
        setForm({ ...form, highlights: [...form.highlights, ''] });
    };

    const removeHighlight = (idx) => {
        setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== idx) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...form,
                highlights: form.highlights.filter(h => h.trim().length > 0),
            };

            if (editingItem) {
                await apiRequest(`/admin/attractions/${editingItem.id}`, {
                    method: 'POST',
                    body: payload,
                });
                showToast('Daya tarik berhasil diperbarui!', 'success');
            } else {
                await apiRequest('/admin/attractions', {
                    method: 'POST',
                    body: payload,
                });
                showToast('Daya tarik baru berhasil ditambahkan!', 'success');
            }

            setModalOpen(false);
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal menyimpan data.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (item) => {
        try {
            const res = await apiRequest(`/admin/attractions/${item.id}/toggle`, {
                method: 'POST',
            });
            showToast(res.message, 'success');
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal mengubah status.', 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmItem) return;
        try {
            await apiRequest(`/admin/attractions/${deleteConfirmItem.id}`, {
                method: 'DELETE',
            });
            showToast('Daya tarik berhasil dihapus.', 'success');
            setDeleteConfirmItem(null);
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal menghapus data.', 'error');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F3D5F]">
                        Kelola Daya Tarik & Wahana Wisata
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Tambah, edit, sesuaikan urutan, dan ubah status tayang wahana di halaman publik
                    </p>
                </div>
                <button
                    type="button"
                    onClick={openAddModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Wahana Baru</span>
                </button>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama wahana..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                    />
                </div>

                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                selectedCategory === cat
                                    ? 'bg-[#0F3D5F] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table & Card List */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#F4F5F7] text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                            <tr>
                                <th className="py-3.5 px-4">Wahana</th>
                                <th className="py-3.5 px-4">Kategori</th>
                                <th className="py-3.5 px-4">Ringkasan</th>
                                <th className="py-3.5 px-4 text-center">Status</th>
                                <th className="py-3.5 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {filtered.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image_url || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=150&q=80'}
                                                alt={item.title}
                                                className="w-14 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                                            />
                                            <div>
                                                <div className="font-bold text-[#0F3D5F] text-xs">
                                                    {item.title}
                                                </div>
                                                <div className="text-[10px] text-slate-400 mt-0.5">
                                                    slug: /{item.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-[11px] text-slate-700">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 max-w-xs">
                                        <div className="line-clamp-2 text-slate-600">
                                            {item.summary || item.description}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(item)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] border transition ${
                                                item.is_published
                                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                            }`}
                                        >
                                            {item.is_published ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
                                            <span>{item.is_published ? 'Tayang' : 'Draf'}</span>
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="inline-flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(item)}
                                                className="p-1.5 rounded-lg text-[#0F3D5F] hover:bg-slate-100 transition"
                                                title="Edit Wahana"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteConfirmItem(item)}
                                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                                                title="Hapus Wahana"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-slate-400 text-xs">
                            Tidak ada daya tarik yang cocok dengan pencarian.
                        </div>
                    )}
                </div>
            </div>

            {/* Add / Edit Modal Dialog */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#0F3D5F]">
                                {editingItem ? 'Edit Daya Tarik Wisata' : 'Tambah Daya Tarik Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Nama Wahana</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                        placeholder="Contoh: Waterpark & Ember Tumpah"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                    >
                                        <option value="Wahana Air">Wahana Air</option>
                                        <option value="Danau & Alam">Danau & Alam</option>
                                        <option value="Edukasi & Satwa">Edukasi & Satwa</option>
                                        <option value="Hobi & Relaksasi">Hobi & Relaksasi</option>
                                        <option value="Fasilitas & Event">Fasilitas & Event</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat</label>
                                    <input
                                        type="text"
                                        value={form.summary}
                                        onChange={(e) => setForm({ ...form, summary: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                        placeholder="Deskripsi satu kalimat untuk preview card..."
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block font-bold text-slate-700 mb-1">Deskripsi Lengkap</label>
                                    <textarea
                                        rows="3"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none leading-relaxed"
                                        placeholder="Penjelasan mendalam tentang fasilitas, kedalaman air, dan aktivitas..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Foto Wahana */}
                            <div className="pt-2">
                                <label className="block font-bold text-slate-700 mb-1.5">Foto Wahana</label>
                                <div className="flex items-center gap-3">
                                    {form.image_url && (
                                        <img
                                            src={form.image_url}
                                            alt="Preview"
                                            className="w-16 h-14 rounded-xl object-cover border border-slate-200"
                                        />
                                    )}
                                    <input
                                        type="text"
                                        value={form.image_url}
                                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                        placeholder="https://... atau unggah berkas"
                                    />
                                    <label className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer transition flex items-center gap-1.5 whitespace-nowrap">
                                        <Upload className="w-3.5 h-3.5" />
                                        <span>{uploading ? 'Mengunggah...' : 'Unggah'}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUpload}
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Highlights List */}
                            <div className="pt-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-bold text-slate-700">Poin Keunggulan / Fasilitas Spesifik</label>
                                    <button
                                        type="button"
                                        onClick={addHighlight}
                                        className="text-emerald-700 hover:underline font-bold"
                                    >
                                        + Tambah Baris
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {form.highlights.map((h, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={h}
                                                onChange={(e) => handleHighlightChange(i, e.target.value)}
                                                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                                placeholder="Contoh: Ember Tumpah Raksasa"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeHighlight(i)}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Publication status */}
                            <div className="pt-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={form.is_published}
                                    onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                                    className="rounded border-slate-300 text-[#0F3D5F] focus:ring-[#0F3D5F]"
                                />
                                <label htmlFor="is_published" className="font-semibold text-slate-700 cursor-pointer">
                                    Langsung publikasikan ke halaman landing page
                                </label>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2 rounded-xl bg-[#0F3D5F] hover:bg-[#0A2C45] text-white font-bold shadow-md shadow-[#0F3D5F]/20 disabled:opacity-50"
                                >
                                    {submitting ? 'Menyimpan...' : 'Simpan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-900">
                            Konfirmasi Hapus Wahana
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Apakah Anda yakin ingin menghapus wahana <strong className="text-red-600">{deleteConfirmItem.title}</strong>? Data yang dihapus tidak dapat dikembalikan.
                        </p>
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(null)}
                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-sm"
                            >
                                Ya, Hapus Wahana
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

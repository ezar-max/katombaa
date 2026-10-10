import React, { useState } from 'react';
import { Camera, Plus, Trash2, Edit2, Star, Eye, EyeOff, Upload, X, Check } from 'lucide-react';
import { apiRequest } from '../../utils/api';

export default function GalleryView({ data = {}, onUpdate, showToast }) {
    const gallery = data.gallery || [];

    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: '',
        caption: '',
        category: 'Wahana Air',
        image_url: '',
        alt_text: '',
        is_published: true,
        is_featured: false,
    });

    const categories = ['Semua', 'Wahana Air', 'Danau & Alam', 'Mini Zoo', 'Event & Gedung'];

    const filtered = selectedCategory === 'Semua'
        ? gallery
        : gallery.filter(g => g.category === selectedCategory);

    const openAddModal = () => {
        setEditingItem(null);
        setForm({
            title: '',
            caption: '',
            category: 'Wahana Air',
            image_url: '',
            alt_text: '',
            is_published: true,
            is_featured: false,
        });
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setForm({
            title: item.title || '',
            caption: item.caption || '',
            category: item.category || 'Wahana Air',
            image_url: item.image_url || '',
            alt_text: item.alt_text || '',
            is_published: item.is_published,
            is_featured: item.is_featured,
        });
        setModalOpen(true);
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'gallery');

        setUploading(true);
        try {
            const res = await apiRequest('/admin/upload', {
                method: 'POST',
                body: formData,
            });
            setForm(prev => ({ ...prev, image_url: res.url }));
            showToast('Foto galeri berhasil diunggah!', 'success');
        } catch (err) {
            showToast(err.message || 'Gagal mengunggah foto.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingItem) {
                await apiRequest(`/admin/gallery/${editingItem.id}`, {
                    method: 'POST',
                    body: form,
                });
                showToast('Foto galeri berhasil diperbarui!', 'success');
            } else {
                await apiRequest('/admin/gallery', {
                    method: 'POST',
                    body: form,
                });
                showToast('Foto baru berhasil ditambahkan ke galeri!', 'success');
            }

            setModalOpen(false);
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal menyimpan foto galeri.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleStatus = async (item) => {
        try {
            const res = await apiRequest(`/admin/gallery/${item.id}/toggle`, {
                method: 'POST',
            });
            showToast(res.message, 'success');
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal mengubah status.', 'error');
        }
    };

    const handleToggleFeatured = async (item) => {
        try {
            const res = await apiRequest(`/admin/gallery/${item.id}/feature`, {
                method: 'POST',
            });
            showToast(res.message, 'success');
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal mengubah status sorotan.', 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmItem) return;
        try {
            await apiRequest(`/admin/gallery/${deleteConfirmItem.id}`, {
                method: 'DELETE',
            });
            showToast('Foto galeri berhasil dihapus.', 'success');
            setDeleteConfirmItem(null);
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal menghapus foto.', 'error');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F3D5F]">
                        Kelola Galeri Foto Wisata
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Unggah foto keindahan destinasi, atur kategori, teks caption, dan status publikasi
                    </p>
                </div>
                <button
                    type="button"
                    onClick={openAddModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Unggah Foto Baru</span>
                </button>
            </div>

            {/* Categories Tabs */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap gap-1.5">
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

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                    >
                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
                            <img
                                src={item.image_url}
                                alt={item.alt_text || item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0F3D5F]/90 text-white backdrop-blur-md">
                                    {item.category}
                                </span>
                                {item.is_featured && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1 shadow-sm">
                                        <Star className="w-2.5 h-2.5 fill-current" />
                                        <span>Featured</span>
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="text-xs font-bold text-[#0F3D5F] line-clamp-1 mb-1">
                                    {item.title}
                                </h4>
                                {item.caption && (
                                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                        {item.caption}
                                    </p>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => handleToggleStatus(item)}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
                                        item.is_published
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                            : 'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}
                                >
                                    {item.is_published ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
                                    <span>{item.is_published ? 'Tayang' : 'Draf'}</span>
                                </button>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleFeatured(item)}
                                        className={`p-1.5 rounded-lg transition ${
                                            item.is_featured ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:bg-slate-100'
                                        }`}
                                        title={item.is_featured ? 'Hapus sorotan' : 'Jadikan sorotan'}
                                    >
                                        <Star className={`w-4 h-4 ${item.is_featured ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(item)}
                                        className="p-1.5 rounded-lg text-[#0F3D5F] hover:bg-slate-100 transition"
                                        title="Edit Foto"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteConfirmItem(item)}
                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                                        title="Hapus Foto"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-400 text-xs border border-slate-200">
                    Belum ada foto dalam kategori ini.
                </div>
            )}

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#0F3D5F]">
                                {editingItem ? 'Edit Foto Galeri' : 'Unggah Foto Baru'}
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
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Judul Foto</label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                    placeholder="Contoh: Keseruan Bermain Air di Waterpark"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                    >
                                        <option value="Wahana Air">Wahana Air</option>
                                        <option value="Danau & Alam">Danau & Alam</option>
                                        <option value="Mini Zoo">Mini Zoo</option>
                                        <option value="Event & Gedung">Event & Gedung</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Alt Text (Aksesibilitas)</label>
                                    <input
                                        type="text"
                                        value={form.alt_text}
                                        onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                        placeholder="Deskripsi singkat gambar untuk SEO"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Keterangan / Caption</label>
                                <textarea
                                    rows="2"
                                    value={form.caption}
                                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none leading-relaxed"
                                    placeholder="Ceritakan momen yang terekam pada foto..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1.5">Berkas Gambar / URL</label>
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
                                        required
                                        value={form.image_url}
                                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                        placeholder="https://... atau klik tombol unggah"
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

                            <div className="pt-2 flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={form.is_published}
                                        onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                                        className="rounded border-slate-300 text-[#0F3D5F] focus:ring-[#0F3D5F]"
                                    />
                                    <span>Publikasikan ke Galeri</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={form.is_featured}
                                        onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                                    />
                                    <span>Jadikan Sorotan (Featured)</span>
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
                                    {submitting ? 'Menyimpan...' : 'Simpan Foto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirmItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-900">
                            Konfirmasi Hapus Foto
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Apakah Anda yakin ingin menghapus foto <strong className="text-red-600">{deleteConfirmItem.title}</strong>? Berkas gambar di server juga akan dibersihkan secara aman.
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
                                Ya, Hapus Foto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

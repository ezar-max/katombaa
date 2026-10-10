import React, { useState } from 'react';
import { Save, Upload, Eye, ToggleLeft, ToggleRight, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { apiRequest } from '../../utils/api';

export default function HeroView({ data = {}, onUpdate, showToast }) {
    const heroSection = data.sections?.find(s => s.section_key === 'hero') || {};

    const [form, setForm] = useState({
        title: heroSection.title || '',
        subtitle: heroSection.subtitle || '',
        badge: heroSection.badge || '',
        description: heroSection.description || '',
        image_url: heroSection.image_url || '',
        image_mobile_url: heroSection.image_mobile_url || '',
        cta_text: heroSection.cta_text || '',
        cta_url: heroSection.cta_url || '',
        secondary_cta_text: heroSection.secondary_cta_text || '',
        secondary_cta_url: heroSection.secondary_cta_url || '',
        is_active: heroSection.is_active !== false,
        extra_data: heroSection.extra_data || { stats: [] },
    });

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'heroes');

        setUploading(true);
        try {
            const res = await apiRequest('/admin/upload', {
                method: 'POST',
                body: formData,
            });
            setForm(prev => ({ ...prev, image_url: res.url }));
            showToast('Foto banner hero berhasil diunggah!', 'success');
        } catch (err) {
            showToast(err.message || 'Gagal mengunggah foto hero.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await apiRequest(`/admin/sections/${heroSection.id}`, {
                method: 'PUT',
                body: form,
            });
            showToast('Hero section berhasil diperbarui!', 'success');
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal memperbarui hero section.', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in max-w-5xl">
            {/* Header bar with save button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F3D5F]">
                        Kelola Hero Section (Banner Utama)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Sesuaikan headline, foto latar, tombol aksi, serta status publikasi banner landing page
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, is_active: !prev.is_active }))}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                            form.is_active
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                    >
                        {form.is_active ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                        <span>{form.is_active ? 'Status: Tayang (Aktif)' : 'Status: Disembunyikan'}</span>
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F3D5F] hover:bg-[#0A2C45] text-white text-xs font-bold shadow-md shadow-[#0F3D5F]/20 transition disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Menyimpan...' : 'Simpan Hero Section'}</span>
                    </button>
                </div>
            </div>

            {/* Live Mini Preview */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden p-6 sm:p-8 text-white relative shadow-xl">
                <div className="absolute inset-0 z-0">
                    <img
                        src={form.image_url || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'}
                        alt="Preview Hero"
                        className="w-full h-full object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A2C45] via-[#0F3D5F]/90 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>{form.badge || 'Wisata Ramah Keluarga'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2">
                        {form.title || 'Headline Utama Wisata'}
                    </h3>
                    <p className="text-xs text-emerald-200 font-medium mb-3">
                        {form.subtitle || 'Subheadline Destinasi'}
                    </p>
                    <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed mb-5">
                        {form.description || 'Deskripsi pengenalan singkat destinasi...'}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                            {form.cta_text || 'Tombol Utama'}
                        </span>
                        {form.secondary_cta_text && (
                            <span className="px-4 py-2 rounded-full bg-white/15 text-white text-xs font-semibold border border-white/30">
                                {form.secondary_cta_text}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Form Edit Controls */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Headline Utama (H1)
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Harmoni Wisata Air & Alam Asri untuk Seluruh Keluarga"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Subheadline / Slogan Pendukung
                        </label>
                        <input
                            type="text"
                            value={form.subtitle}
                            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Destinasi Rekreasi Hijau 3 Hektar di Gunung Putri, Bogor"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Teks Label Badge
                        </label>
                        <input
                            type="text"
                            value={form.badge}
                            onChange={(e) => setForm({ ...form, badge: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Wisata Ramah Keluarga & Anak"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Deskripsi Lengkap Hero
                        </label>
                        <textarea
                            rows="3"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none leading-relaxed"
                            placeholder="Tuliskan narasi pembuka yang menggugah selera liburan keluarga..."
                        ></textarea>
                    </div>
                </div>

                {/* Banner Image Upload & URL */}
                <div className="pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                        Foto Latar Belakang Hero
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1 w-full">
                            <input
                                type="text"
                                value={form.image_url}
                                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                placeholder="https://... atau unggah berkas langsung"
                            />
                        </div>
                        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition border border-slate-200 whitespace-nowrap">
                            <Upload className="w-4 h-4 text-[#0F3D5F]" />
                            <span>{uploading ? 'Mengunggah...' : 'Unggah Foto Baru'}</span>
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

                {/* CTA Button Links */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Label Tombol Utama (Primary CTA)
                        </label>
                        <input
                            type="text"
                            value={form.cta_text}
                            onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Informasi Kunjungan"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            URL Tujuan Tombol Utama
                        </label>
                        <input
                            type="text"
                            value={form.cta_url}
                            onChange={(e) => setForm({ ...form, cta_url: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="#informasi-pengunjung"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Label Tombol Kedua (Secondary CTA)
                        </label>
                        <input
                            type="text"
                            value={form.secondary_cta_text}
                            onChange={(e) => setForm({ ...form, secondary_cta_text: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Jelajahi Daya Tarik"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            URL Tujuan Tombol Kedua
                        </label>
                        <input
                            type="text"
                            value={form.secondary_cta_url}
                            onChange={(e) => setForm({ ...form, secondary_cta_url: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="#daya-tarik"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

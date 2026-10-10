import React, { useState } from 'react';
import { Save, Upload, ToggleLeft, ToggleRight, Sparkles, Plus, Trash2 } from 'lucide-react';
import { apiRequest } from '../../utils/api';

export default function AboutView({ data = {}, onUpdate, showToast }) {
    const aboutSection = data.sections?.find(s => s.section_key === 'about') || {};

    const [form, setForm] = useState({
        title: aboutSection.title || '',
        subtitle: aboutSection.subtitle || '',
        badge: aboutSection.badge || '',
        description: aboutSection.description || '',
        image_url: aboutSection.image_url || '',
        cta_text: aboutSection.cta_text || '',
        cta_url: aboutSection.cta_url || '',
        is_active: aboutSection.is_active !== false,
        extra_data: aboutSection.extra_data || { features: [] },
    });

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const features = form.extra_data?.features || [];

    const handleFeatureChange = (index, value) => {
        const next = [...features];
        next[index] = value;
        setForm(prev => ({
            ...prev,
            extra_data: { ...prev.extra_data, features: next },
        }));
    };

    const addFeature = () => {
        setForm(prev => ({
            ...prev,
            extra_data: {
                ...prev.extra_data,
                features: [...features, ''],
            },
        }));
    };

    const removeFeature = (index) => {
        const next = features.filter((_, i) => i !== index);
        setForm(prev => ({
            ...prev,
            extra_data: { ...prev.extra_data, features: next },
        }));
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'sections');

        setUploading(true);
        try {
            const res = await apiRequest('/admin/upload', {
                method: 'POST',
                body: formData,
            });
            setForm(prev => ({ ...prev, image_url: res.url }));
            showToast('Foto section tentang berhasil diunggah!', 'success');
        } catch (err) {
            showToast(err.message || 'Gagal mengunggah foto.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await apiRequest(`/admin/sections/${aboutSection.id}`, {
                method: 'PUT',
                body: form,
            });
            showToast('Section tentang destinasi berhasil disimpan!', 'success');
            if (onUpdate) onUpdate();
        } catch (err) {
            showToast(err.message || 'Gagal menyimpan section.', 'error');
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
                        Kelola Section Tentang Destinasi
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Perbarui narasi sejarah, konsep eko-rekreasi, foto representatif, dan poin keunggulan
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
                        <span>{form.is_active ? 'Status: Ditampilkan' : 'Status: Disembunyikan'}</span>
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F3D5F] hover:bg-[#0A2C45] text-white text-xs font-bold shadow-md shadow-[#0F3D5F]/20 transition disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Sub-judul / Badge Label
                        </label>
                        <input
                            type="text"
                            value={form.subtitle}
                            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Tentang Katoomba Greenpark"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Judul Section
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Oase Rekreasi Terpadu di Jantung Gunung Putri"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Deskripsi Narasi Profil
                        </label>
                        <textarea
                            rows="4"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none leading-relaxed"
                            placeholder="Tuliskan narasi lengkap konsep taman rekreasi..."
                        ></textarea>
                    </div>
                </div>

                {/* Foto Profil Destinasi */}
                <div className="pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                        Foto Ilustrasi Tentang Destinasi
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {form.image_url && (
                            <img
                                src={form.image_url}
                                alt="Preview About"
                                className="w-24 h-20 rounded-xl object-cover border border-slate-200 shadow-sm"
                            />
                        )}
                        <div className="flex-1 w-full">
                            <input
                                type="text"
                                value={form.image_url}
                                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                placeholder="https://... atau unggah berkas"
                            />
                        </div>
                        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition border border-slate-200 whitespace-nowrap">
                            <Upload className="w-4 h-4 text-[#0F3D5F]" />
                            <span>{uploading ? 'Mengunggah...' : 'Ganti Foto'}</span>
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

                {/* Poin-poin Keunggulan (Dynamic List) */}
                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Poin-poin Keunggulan Wisata
                        </label>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Poin</span>
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={feat}
                                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                                    placeholder="Contoh: Kawasan asri nan teduh..."
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFeature(i)}
                                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition"
                                    title="Hapus baris ini"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}

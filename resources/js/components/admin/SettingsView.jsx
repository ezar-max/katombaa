import React, { useState } from 'react';
import { Save, Globe, Phone, Share2, MapPin, CheckCircle, RefreshCw } from 'lucide-react';
import { apiRequest } from '../../utils/api';

export default function SettingsView({ data = {}, onUpdate, showToast }) {
    const initialMap = data.settingsMap || {};
    const [form, setForm] = useState({ ...initialMap });
    const [saving, setSaving] = useState(false);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await apiRequest('/admin/settings', {
                method: 'POST',
                body: { settings: form },
            });
            showToast('Pengaturan website berhasil disimpan!', 'success');
            if (onUpdate) {
                onUpdate();
            }
        } catch (err) {
            showToast(err.message || 'Gagal menyimpan pengaturan.', 'error');
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
                        Pengaturan Global Website
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Konfigurasi identitas destinasi, kontak resmi, alamat, dan tautan media sosial
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F3D5F] hover:bg-[#0A2C45] text-white text-xs font-bold shadow-md shadow-[#0F3D5F]/20 transition disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
                </button>
            </div>

            {/* Identitas Destinasi */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-[#0F3D5F] uppercase tracking-wider">
                        Identitas & Branding Wisata
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Nama Destinasi Wisata
                        </label>
                        <input
                            type="text"
                            value={form.site_name || ''}
                            onChange={(e) => handleChange('site_name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Katoomba Greenpark"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Tagline / Slogan
                        </label>
                        <input
                            type="text"
                            value={form.tagline || ''}
                            onChange={(e) => handleChange('tagline', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Taman Rekreasi Air & Alam Keluarga di Bogor"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Teks Logo Navbar
                        </label>
                        <input
                            type="text"
                            value={form.logo_text || ''}
                            onChange={(e) => handleChange('logo_text', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="KATOOMBA"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Subteks Logo Navbar
                        </label>
                        <input
                            type="text"
                            value={form.logo_subtext || ''}
                            onChange={(e) => handleChange('logo_subtext', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="GREENPARK BOGOR"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Deskripsi Profil Destinasi (Singkat)
                    </label>
                    <textarea
                        rows="3"
                        value={form.site_description || ''}
                        onChange={(e) => handleChange('site_description', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none leading-relaxed"
                        placeholder="Deskripsi ringkas profil destinasi wisata..."
                    ></textarea>
                </div>
            </div>

            {/* Kontak & Jam Operasional */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-[#0F3D5F] uppercase tracking-wider">
                        Kontak & Jam Operasional
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Nomor Telepon Kantor
                        </label>
                        <input
                            type="text"
                            value={form.contact_phone || ''}
                            onChange={(e) => handleChange('contact_phone', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="(021) 867-0099"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Nomor WhatsApp Resmi (Tanpa tanda + atau spasi)
                        </label>
                        <input
                            type="text"
                            value={form.contact_whatsapp || ''}
                            onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="6281283839900"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Alamat Email Resmi
                        </label>
                        <input
                            type="email"
                            value={form.contact_email || ''}
                            onChange={(e) => handleChange('contact_email', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="info@katoombagreenpark.id"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Jam Operasional
                        </label>
                        <input
                            type="text"
                            value={form.operational_hours || ''}
                            onChange={(e) => handleChange('operational_hours', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="Setiap Hari: 08.00 – 17.00 WIB"
                        />
                    </div>
                </div>
            </div>

            {/* Alamat & Google Maps */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-[#0F3D5F] uppercase tracking-wider">
                        Alamat Fisik & Google Maps
                    </h3>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Alamat Lengkap Terverifikasi
                    </label>
                    <textarea
                        rows="2"
                        value={form.address || ''}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none leading-relaxed"
                        placeholder="Jl. Raya Bojong Nangka..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Tautan URL Google Maps
                        </label>
                        <input
                            type="url"
                            value={form.maps_url || ''}
                            onChange={(e) => handleChange('maps_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="https://maps.app.goo.gl/..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            URL Embed Google Maps Iframe
                        </label>
                        <input
                            type="text"
                            value={form.maps_embed_url || ''}
                            onChange={(e) => handleChange('maps_embed_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="https://www.google.com/maps/embed?..."
                        />
                    </div>
                </div>
            </div>

            {/* Media Sosial */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-[#0F3D5F] uppercase tracking-wider">
                        Tautan Media Sosial Resmi
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Instagram URL
                        </label>
                        <input
                            type="url"
                            value={form.instagram_url || ''}
                            onChange={(e) => handleChange('instagram_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="https://instagram.com/..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Facebook URL
                        </label>
                        <input
                            type="url"
                            value={form.facebook_url || ''}
                            onChange={(e) => handleChange('facebook_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="https://facebook.com/..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            YouTube URL
                        </label>
                        <input
                            type="url"
                            value={form.youtube_url || ''}
                            onChange={(e) => handleChange('youtube_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F3D5F] focus:outline-none"
                            placeholder="https://youtube.com/@..."
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

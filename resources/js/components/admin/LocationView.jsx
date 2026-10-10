import React, { useState } from 'react';
import { 
    MapPin, 
    Navigation, 
    ExternalLink, 
    Save, 
    CheckCircle2, 
    AlertCircle, 
    RefreshCw, 
    Clock, 
    Phone, 
    Mail, 
    Compass, 
    Car, 
    Train, 
    Bus,
    Eye
} from 'lucide-react';
import { api } from '../../utils/api';

export default function LocationView({ initialSection, initialSettings = {}, onDataChange }) {
    const [section, setSection] = useState(initialSection || {
        id: null,
        section_key: 'location',
        badge: 'PANDUAN LOKASI & RUTE',
        title: 'Akses Mudah Menuju Surga Rekreasi Katoomba',
        subtitle: 'Terletak strategis di kawasan Bojong Nangka, Gunung Putri, Bogor.',
        description: '',
        cta_text: 'Buka di Google Maps',
        cta_url: 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9',
        is_active: true
    });

    const [settings, setSettings] = useState({
        address: initialSettings.address || 'Jl. Raya Bojong Nangka No. 8, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16963',
        google_maps_url: initialSettings.google_maps_url || 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9',
        google_maps_embed: initialSettings.google_maps_embed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.978252243501!2d106.9157207!3d-6.3967847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699478f69d300b%3A0x8aa86bf09d737409!2sKatoomba%20Greenpark!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
        operating_hours: initialSettings.operating_hours || 'Setiap Hari: 08.00 - 17.00 WIB',
        phone: initialSettings.phone || '+62 812-3456-7890',
        email: initialSettings.email || 'info@katoomba.id'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotify = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Update settings
            const settingsRes = await api.put('/admin/settings', {
                settings: {
                    address: settings.address,
                    google_maps_url: settings.google_maps_url,
                    google_maps_embed: settings.google_maps_embed,
                    operating_hours: settings.operating_hours,
                    phone: settings.phone,
                    email: settings.email
                }
            });

            // 2. Update section if exists
            let sectionRes = null;
            if (section && section.id) {
                sectionRes = await api.put(`/admin/sections/${section.id}`, {
                    badge: section.badge,
                    title: section.title,
                    subtitle: section.subtitle,
                    description: section.description,
                    cta_text: section.cta_text,
                    cta_url: settings.google_maps_url,
                    is_active: Boolean(section.is_active)
                });
                if (sectionRes.success) {
                    setSection(sectionRes.section);
                }
            }

            if (settingsRes.success) {
                showNotify('success', 'Data lokasi, peta Google Maps, dan rute berhasil disimpan.');
                if (onDataChange) onDataChange();
            }
        } catch (err) {
            showNotify('error', err.response?.data?.message || 'Gagal menyimpan data lokasi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#0F3D5F] flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-[#059669]" />
                        Kelola Lokasi, Peta & Panduan Rute
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Atur alamat resmi, tautan Google Maps verified, kode embed peta, dan jam operasional
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={settings.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all"
                    >
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                        Buka di Maps
                    </a>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all shadow-xs"
                    >
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Simpan Perubahan
                    </button>
                </div>
            </div>

            {/* Notification */}
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

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Form Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Section Header Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center justify-between">
                            <span>Teks Bagian Rute & Peta</span>
                            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={section.is_active}
                                    onChange={(e) => setSection({ ...section, is_active: e.target.checked })}
                                    className="w-4 h-4 rounded text-[#0F3D5F] focus:ring-[#0F3D5F]"
                                />
                                Aktifkan Bagian Lokasi
                            </label>
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Badge / Kategori Tag
                            </label>
                            <input
                                type="text"
                                value={section.badge || ''}
                                onChange={(e) => setSection({ ...section, badge: e.target.value })}
                                placeholder="Contoh: PANDUAN LOKASI & RUTE"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Judul Bagian (Title)
                            </label>
                            <input
                                type="text"
                                value={section.title || ''}
                                onChange={(e) => setSection({ ...section, title: e.target.value })}
                                placeholder="Contoh: Akses Mudah Menuju Surga Rekreasi Katoomba"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Subjudul / Keterangan Singkat
                            </label>
                            <textarea
                                rows="2"
                                value={section.subtitle || ''}
                                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                                placeholder="Contoh: Terletak strategis di kawasan Bojong Nangka, Gunung Putri, Bogor..."
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>
                    </div>

                    {/* Google Maps & Address Settings Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-[#0F3D5F]" />
                            Pengaturan Alamat & Google Maps
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Alamat Lengkap Fisik *
                            </label>
                            <textarea
                                rows="3"
                                required
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                placeholder="Jl. Raya Bojong Nangka No. 8..."
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                Alamat fisik yang tampil di landing page, footer, dan kartu informasi pengunjung.
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Tautan Google Maps Langsung (Shortlink / URL) *
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    required
                                    value={settings.google_maps_url}
                                    onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                                    placeholder="https://maps.app.goo.gl/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F] pr-10"
                                />
                                <ExternalLink className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                                Tautan yang dibuka saat pengunjung mengklik tombol "Buka Petunjuk Arah" atau "Google Maps".
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                URL Embed Peta Google Maps (iframe src) *
                            </label>
                            <textarea
                                rows="3"
                                required
                                value={settings.google_maps_embed}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    // Extract src if user pasted whole iframe tag
                                    if (val.includes('<iframe') && val.includes('src="')) {
                                        const match = val.match(/src="([^"]+)"/);
                                        if (match) val = match[1];
                                    }
                                    setSettings({ ...settings, google_maps_embed: val });
                                }}
                                placeholder="https://www.google.com/maps/embed?pb=..."
                                className="w-full px-4 py-2 font-mono text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                Salin URL embed dari Google Maps ("Bagikan" &rarr; "Sematkan peta" &rarr; salin link di atribut <code>src</code>).
                            </p>
                        </div>
                    </div>

                    {/* Operational and Contact Details */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#0F3D5F]" />
                            Jam Buka & Kontak Wisata
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Jam Operasional
                            </label>
                            <input
                                type="text"
                                value={settings.operating_hours}
                                onChange={(e) => setSettings({ ...settings, operating_hours: e.target.value })}
                                placeholder="Setiap Hari: 08.00 - 17.00 WIB"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    No. Telepon / WhatsApp
                                </label>
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    placeholder="+62 812-3456-7890"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Email Resmi
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    placeholder="info@katoomba.id"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Map Preview & Route Guide Highlights */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Live Map Preview Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <Eye className="w-4 h-4 text-[#0F3D5F]" />
                                Pratinjau Langsung Google Maps
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                                Live Embed
                            </span>
                        </div>

                        <div className="w-full h-72 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                            {settings.google_maps_embed ? (
                                <iframe
                                    src={settings.google_maps_embed}
                                    title="Pratinjau Google Maps Katoomba Greenpark"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center p-6 text-center text-slate-400 text-sm">
                                    Masukkan URL embed Google Maps untuk melihat pratinjau interaktif di sini.
                                </div>
                            )}
                        </div>

                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                            <div className="flex items-start gap-2 text-xs text-slate-600">
                                <MapPin className="w-4 h-4 text-[#0F3D5F] shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-800">Alamat:</span>
                                    <p className="mt-0.5">{settings.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                                <Clock className="w-4 h-4 text-[#059669] shrink-0" />
                                <div>
                                    <span className="font-bold text-slate-800">Jam Operasional:</span> {settings.operating_hours}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rute Transportasi Pedoman */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[#059669]" />
                            Panduan Rute Transportasi
                        </h4>
                        
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                                    <Car className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <h5 className="font-bold text-slate-800">Kendaraan Pribadi (Tol Jagorawi)</h5>
                                    <p className="text-slate-500 mt-0.5">
                                        Keluar Gerbang Tol Gunung Putri / Cimanggis, lalu arahkan kendaraan menuju Bojong Nangka (± 15-20 menit).
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                                    <Train className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <h5 className="font-bold text-slate-800">Kereta Commuter Line (KRL)</h5>
                                    <p className="text-slate-500 mt-0.5">
                                        Turun di Stasiun Nambo atau Stasiun Cibinong, lanjutkan perjalanan dengan transportasi online menuju Katoomba Greenpark (± 10 km).
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                                    <Bus className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <h5 className="font-bold text-slate-800">Angkutan Umum & Bis</h5>
                                    <p className="text-slate-500 mt-0.5">
                                        Dapat menaiki angkutan rute Cileungsi - Gunung Putri, turun di persimpangan Bojong Nangka.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

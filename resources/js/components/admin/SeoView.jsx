import React, { useState } from 'react';
import { 
    Search, 
    Share2, 
    Globe, 
    Save, 
    CheckCircle2, 
    AlertCircle, 
    RefreshCw, 
    Video, 
    Upload, 
    Eye 
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TikTokIcon } from '../common/SocialIcons';
import { api } from '../../utils/api';

export default function SeoView({ initialSettings = {}, onDataChange }) {
    const [settings, setSettings] = useState({
        site_title: initialSettings.site_title || 'Katoomba Greenpark — Destinasi Rekreasi Keluarga & Waterpark Gunung Putri Bogor',
        site_tagline: initialSettings.site_tagline || 'Taman Rekreasi Terpadu & Waterpark Alami di Bojong Nangka, Gunung Putri',
        meta_description: initialSettings.meta_description || 'Nikmati keseruan liburan keluarga di Katoomba Greenpark, Bojong Nangka, Gunung Putri, Bogor. Waterpark dengan kolam renang anak, kolam olympic, danau buatan dengan bebek kayuh, mini zoo, kolam pemancingan, dan Phinisi Hall.',
        meta_keywords: initialSettings.meta_keywords || 'katoomba greenpark, wisata bogor, waterpark gunung putri, kolam renang bojong nangka, liburan keluarga bogor, wisata air bogor',
        og_image: initialSettings.og_image || 'https://images.unsplash.com/photo-1582650625119-3a31f8418bb9?auto=format&fit=crop&w=1200&q=80',
        instagram_url: initialSettings.instagram_url || 'https://instagram.com/katoomba_greenpark',
        facebook_url: initialSettings.facebook_url || 'https://facebook.com/katoombagreenpark',
        youtube_url: initialSettings.youtube_url || 'https://youtube.com',
        tiktok_url: initialSettings.tiktok_url || 'https://tiktok.com'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotify = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'seo');

        try {
            const res = await api.post('/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.success) {
                setSettings(prev => ({ ...prev, og_image: res.url }));
                showNotify('success', 'Gambar Open Graph berhasil diunggah.');
            }
        } catch (err) {
            showNotify('error', 'Gagal mengunggah gambar Open Graph.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.put('/admin/settings', { settings });
            if (res.success) {
                showNotify('success', 'Pengaturan SEO dan Meta Sosial berhasil disimpan.');
                if (onDataChange) onDataChange();
            }
        } catch (err) {
            showNotify('error', err.response?.data?.message || 'Gagal menyimpan pengaturan SEO.');
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
                        <Search className="w-6 h-6 text-[#059669]" />
                        Optimasi Mesin Pencari (SEO) & Media Sosial
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Atur meta tags pencarian Google, thumbnail Open Graph media sosial, dan tautan jejaring sosial
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all shadow-xs"
                >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan Pengaturan SEO
                </button>
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
                {/* Left Column: Form Controls */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Meta Search Engine Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#0F3D5F]" />
                            Meta Tags Mesin Pencari (Google)
                        </h3>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Meta Judul Halaman (Title) *
                                </label>
                                <span className={`text-xs ${settings.site_title.length > 70 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                                    {settings.site_title.length}/70 karakter
                                </span>
                            </div>
                            <input
                                type="text"
                                required
                                value={settings.site_title}
                                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                                placeholder="Katoomba Greenpark — ..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Tagline Destinasi
                            </label>
                            <input
                                type="text"
                                value={settings.site_tagline}
                                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                                placeholder="Taman Rekreasi Terpadu & Waterpark Alami..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Meta Deskripsi (Google Snippet) *
                                </label>
                                <span className={`text-xs ${settings.meta_description.length > 160 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                                    {settings.meta_description.length}/160 karakter
                                </span>
                            </div>
                            <textarea
                                rows="3"
                                required
                                value={settings.meta_description}
                                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                                placeholder="Deskripsi ringkas dan menarik tentang Katoomba Greenpark..."
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Kata Kunci (Keywords)
                            </label>
                            <input
                                type="text"
                                value={settings.meta_keywords}
                                onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                                placeholder="katoomba greenpark, wisata gunung putri bogor, ..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                            <p className="text-xs text-slate-400 mt-1">Pisahkan kata kunci dengan tanda koma (,).</p>
                        </div>
                    </div>

                    {/* Open Graph Image Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-[#0F3D5F]" />
                            Gambar Open Graph (Social Sharing Thumbnail)
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                URL Gambar Thumbnail (1200 x 630 px disarankan)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={settings.og_image}
                                    onChange={(e) => setSettings({ ...settings, og_image: e.target.value })}
                                    placeholder="https://..."
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer transition-all">
                                    {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                    Unggah
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                            Tautan Jejaring Sosial Resmi
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                                    Instagram URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.instagram_url}
                                    onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                    placeholder="https://instagram.com/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    <FacebookIcon className="w-4 h-4 text-blue-600" />
                                    Facebook URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.facebook_url}
                                    onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                                    placeholder="https://facebook.com/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        <YoutubeIcon className="w-4 h-4 text-red-600" />
                                        YouTube URL
                                    </label>
                                    <input
                                        type="url"
                                        value={settings.youtube_url}
                                        onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                                        placeholder="https://youtube.com/..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        <TikTokIcon className="w-4 h-4 text-slate-800" />
                                        TikTok URL
                                    </label>
                                    <input
                                        type="url"
                                        value={settings.tiktok_url}
                                        onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
                                        placeholder="https://tiktok.com/@..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Visual Previews */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Google Search Snippet Preview */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <Search className="w-4 h-4 text-blue-600" />
                                Pratinjau di Hasil Pencarian Google
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold">
                                Google SERP
                            </span>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-sans space-y-1">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <div className="w-4 h-4 rounded-full bg-[#0F3D5F] flex items-center justify-center text-white text-[9px] font-bold">K</div>
                                <span className="text-slate-800 font-medium truncate">https://katoomba.id</span>
                            </div>
                            <h5 className="text-blue-700 text-base font-semibold hover:underline cursor-pointer line-clamp-1 leading-snug">
                                {settings.site_title || 'Katoomba Greenpark — Destinasi Wisata'}
                            </h5>
                            <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                                {settings.meta_description || 'Deskripsi singkat destinasi wisata keluarga di Bojong Nangka, Gunung Putri Bogor...'}
                            </p>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">
                            Simulasi tampilan bagaimana pengguna Google melihat website Anda pada hasil penelusuran.
                        </p>
                    </div>

                    {/* Social Media Card (Open Graph) Preview */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <Share2 className="w-4 h-4 text-emerald-600" />
                                Pratinjau Berbagi Tautan (WhatsApp / Facebook)
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                                Open Graph
                            </span>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs">
                            <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                                {settings.og_image ? (
                                    <img
                                        src={settings.og_image}
                                        alt="Open Graph preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1582650625119-3a31f8418bb9?auto=format&fit=crop&w=1200&q=80';
                                        }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                                        Tidak ada gambar thumbnail
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-1">
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                    katoomba.id
                                </p>
                                <h5 className="font-bold text-slate-900 text-sm line-clamp-1">
                                    {settings.site_title}
                                </h5>
                                <p className="text-xs text-slate-500 line-clamp-2">
                                    {settings.meta_description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

import React from 'react';
import { Compass, Camera, Layers, Ticket, CheckCircle2, Clock, ArrowUpRight, Plus, Eye, Sparkles, Activity } from 'lucide-react';

export default function OverviewView({ data = {}, onNavigate, onRefresh }) {
    const stats = data.stats || {};
    const activities = data.activities || [];
    const attractions = data.attractions || [];
    const gallery = data.gallery || [];
    const sections = data.sections || [];

    const cards = [
        {
            title: 'Daya Tarik Wisata',
            count: stats.total_attractions || 0,
            sub: `${stats.published_attractions || 0} Terpublikasi • ${stats.draft_attractions || 0} Draf`,
            icon: Compass,
            color: 'bg-emerald-500',
            tab: 'attractions',
        },
        {
            title: 'Koleksi Galeri Foto',
            count: stats.total_gallery || 0,
            sub: `${stats.published_gallery || 0} Tayang di Publik`,
            icon: Camera,
            color: 'bg-blue-600',
            tab: 'gallery',
        },
        {
            title: 'Section Landing Page',
            count: stats.active_sections || 0,
            sub: `Dari total ${stats.total_sections || 0} section aktif`,
            icon: Layers,
            color: 'bg-indigo-600',
            tab: 'hero',
        },
        {
            title: 'Paket Tiket Masuk',
            count: stats.total_tickets || 0,
            sub: 'Harga resmi terverifikasi',
            icon: Ticket,
            color: 'bg-amber-500',
            tab: 'tickets',
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-[#0F3D5F] to-[#0A2C45] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Katoomba Greenpark CMS</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                        Selamat Datang, {data.user?.name || 'Administrator'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        Kelola seluruh konten landing page, galeri visual, informasi tiket, dan jam operasional Katoomba Greenpark langsung dari panel ini. Semua perubahan langsung terhubung secara dinamis ke halaman publik.
                    </p>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => onNavigate('attractions')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Daya Tarik</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate('gallery')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition border border-white/20"
                        >
                            <Camera className="w-4 h-4" />
                            <span>Unggah Foto Galeri</span>
                        </button>
                        <a
                            href="/?preview=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
                        >
                            <Eye className="w-4 h-4 text-emerald-300" />
                            <span>Pratinjau Halaman Publik</span>
                        </a>
                    </div>
                </div>

                {/* Decorative Background Graphic */}
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <div
                            key={i}
                            onClick={() => onNavigate(c.tab)}
                            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-200 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl ${c.color} text-white flex items-center justify-center shadow-md`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F3D5F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                            </div>
                            <div className="text-2xl font-extrabold text-[#0F3D5F] tracking-tight">
                                {c.count}
                            </div>
                            <div className="text-xs font-bold text-slate-700 mt-1">
                                {c.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                                {c.sub}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 2 Columns: Attractions Status & Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Attractions & Content Summary */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-bold text-[#0F3D5F] flex items-center gap-2">
                            <Compass className="w-4 h-4 text-emerald-600" />
                            <span>Daftar Daya Tarik & Wahana</span>
                        </h3>
                        <button
                            type="button"
                            onClick={() => onNavigate('attractions')}
                            className="text-xs font-semibold text-[#0F3D5F] hover:underline"
                        >
                            Kelola Semua →
                        </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {attractions.slice(0, 5).map((item) => (
                            <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image_url || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=150&q=80'}
                                        alt={item.title}
                                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                                    />
                                    <div>
                                        <div className="text-xs font-bold text-[#0F3D5F]">
                                            {item.title}
                                        </div>
                                        <div className="text-[11px] text-slate-500">
                                            Kategori: {item.category}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    item.is_published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {item.is_published ? 'Publik' : 'Draf'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Recent Activity Log */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-bold text-[#0F3D5F] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-600" />
                            <span>Riwayat Aktivitas CMS</span>
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">Terakhir dicatat</span>
                    </div>

                    <div className="space-y-4">
                        {activities.slice(0, 6).map((log) => (
                            <div key={log.id} className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-slate-100 text-[#0F3D5F] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                                    •
                                </div>
                                <div className="flex-1 text-xs">
                                    <div className="font-semibold text-slate-800">
                                        {log.description}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                                        <span>{new Date(log.created_at).toLocaleString('id-ID')}</span>
                                        <span>• {log.user?.name || 'Admin'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {activities.length === 0 && (
                            <div className="text-center py-8 text-xs text-slate-400">
                                Belum ada riwayat aktivitas tercatat.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

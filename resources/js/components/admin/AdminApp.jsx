import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    Settings, 
    Sparkles, 
    Info, 
    Compass, 
    Image as ImageIcon, 
    Ticket, 
    MapPin, 
    Search, 
    UserCheck, 
    LogOut, 
    ExternalLink, 
    Eye, 
    Menu, 
    X, 
    Bell, 
    CheckCircle2, 
    AlertCircle, 
    RefreshCw, 
    ChevronRight,
    Smartphone,
    Monitor,
    Tablet
} from 'lucide-react';
import { api, getCsrfToken } from '../../utils/api';

// Subviews
import OverviewView from './OverviewView';
import SettingsView from './SettingsView';
import HeroView from './HeroView';
import AboutView from './AboutView';
import AttractionsView from './AttractionsView';
import GalleryView from './GalleryView';
import TicketsFacilitiesView from './TicketsFacilitiesView';
import LocationView from './LocationView';
import SeoView from './SeoView';
import ProfileView from './ProfileView';

export default function AdminApp() {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [toast, setToast] = useState(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop | tablet | mobile

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4500);
    };

    const loadData = async (isBackground = false) => {
        if (!isBackground) setLoading(true);
        else setRefreshing(true);

        try {
            const res = await api.get('/admin/data');
            if (res.success && res.data) {
                setData(res.data);
            }
        } catch (err) {
            showToast('Gagal memuat data dari server.', 'error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Handle logout securely with Laravel CSRF POST
    const handleLogout = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/admin/logout';

        const token = document.createElement('input');
        token.type = 'hidden';
        token.name = '_token';
        token.value = getCsrfToken();
        form.appendChild(token);

        document.body.appendChild(form);
        form.submit();
    };

    const navItems = [
        { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard, badge: null },
        { id: 'settings', label: 'Pengaturan Situs', icon: Settings, badge: null },
        { id: 'hero', label: 'Hero Section', icon: Sparkles, badge: null },
        { id: 'about', label: 'Tentang Kami', icon: Info, badge: null },
        { id: 'attractions', label: 'Wahana & Atraksi', icon: Compass, badge: data?.attractions?.length || null },
        { id: 'gallery', label: 'Galeri Foto', icon: ImageIcon, badge: data?.gallery?.length || null },
        { id: 'tickets', label: 'Tiket & Fasilitas', icon: Ticket, badge: null },
        { id: 'location', label: 'Lokasi & Peta', icon: MapPin, badge: null },
        { id: 'seo', label: 'SEO & Media Sosial', icon: Search, badge: null },
        { id: 'profile', label: 'Profil Saya', icon: UserCheck, badge: null },
    ];

    const currentNav = navItems.find(i => i.id === activeTab) || navItems[0];

    // Helper to find section by key
    const getSection = (key) => {
        return data?.sections?.find(s => s.section_key === key) || null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7]">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-[#0F3D5F]/20 border-t-[#0F3D5F] rounded-full animate-spin mx-auto mb-4"></div>
                    <h3 className="font-bold text-[#0F3D5F] text-lg">Katoomba CMS Admin</h3>
                    <p className="text-xs text-slate-500 mt-1">Mengambil data konfigurasi & konten...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row font-['Plus_Jakarta_Sans',sans-serif]">
            {/* MOBILE SIDEBAR BACKDROP */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-xs"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A2C45] text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static shrink-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Brand Logo & Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="h-10 w-auto object-contain filter drop-shadow-md"
                        />
                        <div>
                            <h1 className="font-extrabold text-base tracking-tight leading-none text-white">
                                KATOOMBA
                            </h1>
                            <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mt-1">
                                CMS Dashboard
                            </p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-white/60 hover:text-white p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Destination Badge info */}
                <div className="px-6 py-3 bg-[#0F3D5F]/40 border-b border-white/5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="truncate">Gunung Putri, Bogor, Jawa Barat</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-[#0F3D5F] to-[#1E5683] text-white shadow-sm font-semibold' 
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge !== null && (
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Admin Footer & Logout */}
                <div className="p-4 border-t border-white/10 bg-[#082236]">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-[#0F3D5F] text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                                {data?.user?.name ? data.user.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="truncate">
                                <p className="text-xs font-semibold text-white truncate">
                                    {data?.user?.name || 'Admin Katoomba'}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                    {data?.user?.email || 'admin@katoomba.id'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-all border border-rose-500/20"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Keluar (Logout)
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header Bar */}
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
                            title="Buka Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-semibold text-slate-800 hidden sm:inline">CMS Admin</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                            <span className="font-bold text-[#0F3D5F]">{currentNav.label}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {/* Refresh Button */}
                        <button
                            type="button"
                            onClick={() => loadData(true)}
                            disabled={refreshing}
                            className="p-2 rounded-xl text-slate-500 hover:text-[#0F3D5F] hover:bg-slate-100 transition-all"
                            title="Segarkan Data"
                        >
                            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#0F3D5F]' : ''}`} />
                        </button>

                        {/* Live Preview Modal Button */}
                        <button
                            type="button"
                            onClick={() => setPreviewModalOpen(true)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                        >
                            <Eye className="w-3.5 h-3.5 text-[#0F3D5F]" />
                            <span className="hidden sm:inline">Pratinjau Live</span>
                        </button>

                        {/* Visit Website Link */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F3D5F] hover:bg-[#0A2C45] text-white text-xs font-semibold transition-all shadow-xs"
                        >
                            <span className="hidden sm:inline">Kunjungi Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </header>

                {/* Dynamic Content Views */}
                <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
                    {activeTab === 'overview' && (
                        <OverviewView 
                            data={data} 
                            setActiveTab={setActiveTab}
                            onUpdate={() => loadData(true)}
                            showToast={showToast}
                        />
                    )}

                    {activeTab === 'settings' && (
                        <SettingsView 
                            data={data} 
                            onUpdate={() => loadData(true)}
                            showToast={showToast}
                        />
                    )}

                    {activeTab === 'hero' && (
                        <HeroView 
                            section={getSection('hero')} 
                            onUpdate={() => loadData(true)}
                            showToast={showToast}
                        />
                    )}

                    {activeTab === 'about' && (
                        <AboutView 
                            section={getSection('about')} 
                            onUpdate={() => loadData(true)}
                            showToast={showToast}
                        />
                    )}

                    {activeTab === 'attractions' && (
                        <AttractionsView 
                            initialAttractions={data?.attractions || []} 
                            onUpdate={() => loadData(true)}
                            showToast={showToast}
                        />
                    )}

                    {activeTab === 'gallery' && (
                        <GalleryView 
                            initialGallery={data?.gallery || []} 
                            onUpdate={() => loadData(true)}
                            showToast={showToast}
                        />
                    )}

                    {activeTab === 'tickets' && (
                        <TicketsFacilitiesView 
                            initialTickets={data?.tickets || []} 
                            initialFacilities={data?.facilities || []}
                            onDataChange={() => loadData(true)}
                        />
                    )}

                    {activeTab === 'location' && (
                        <LocationView 
                            initialSection={getSection('location')}
                            initialSettings={data?.settingsMap || {}}
                            onDataChange={() => loadData(true)}
                        />
                    )}

                    {activeTab === 'seo' && (
                        <SeoView 
                            initialSettings={data?.settingsMap || {}}
                            onDataChange={() => loadData(true)}
                        />
                    )}

                    {activeTab === 'profile' && (
                        <ProfileView 
                            user={data?.user || {}}
                            onUserUpdate={(updatedUser) => {
                                setData(prev => ({ ...prev, user: updatedUser }));
                                showToast('Data profil berhasil diperbarui', 'success');
                            }}
                        />
                    )}
                </main>
            </div>

            {/* FLOATING TOAST NOTIFICATION */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 transition-all animate-bounce ${
                    toast.type === 'success' 
                        ? 'bg-emerald-900 text-white border-emerald-700' 
                        : 'bg-rose-900 text-white border-rose-700'
                }`}>
                    {toast.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <span className="text-sm font-semibold">{toast.message}</span>
                </div>
            )}

            {/* LIVE PREVIEW MODAL */}
            {previewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
                    <div className="bg-slate-900 rounded-2xl w-full h-[90vh] max-w-6xl flex flex-col overflow-hidden shadow-2xl border border-slate-700">
                        {/* Modal Header */}
                        <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">Pratinjau Live Website</span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-full">
                                    Hydrated Database Data
                                </span>
                            </div>

                            {/* Viewport switchers */}
                            <div className="flex items-center gap-1 bg-slate-700 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setPreviewDevice('desktop')}
                                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                                        previewDevice === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Monitor className="w-4 h-4" />
                                    <span className="hidden sm:inline">Desktop</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewDevice('tablet')}
                                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                                        previewDevice === 'tablet' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Tablet className="w-4 h-4" />
                                    <span className="hidden sm:inline">Tablet</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewDevice('mobile')}
                                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                                        previewDevice === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Smartphone className="w-4 h-4" />
                                    <span className="hidden sm:inline">Mobile</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPreviewModalOpen(false)}
                                className="text-slate-400 hover:text-white p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body / Iframe */}
                        <div className="flex-1 bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
                            <div className={`h-full transition-all duration-300 bg-white rounded-xl overflow-hidden shadow-2xl ${
                                previewDevice === 'desktop' 
                                    ? 'w-full' 
                                    : previewDevice === 'tablet' 
                                    ? 'w-[768px]' 
                                    : 'w-[375px]'
                            }`}>
                                <iframe
                                    src="/?preview=true"
                                    title="Live Website Preview"
                                    className="w-full h-full border-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

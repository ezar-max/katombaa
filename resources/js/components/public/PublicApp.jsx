import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Attractions from './Attractions';
import VisitorInfo from './VisitorInfo';
import Location from './Location';
import Gallery from './Gallery';
import CTASection from './CTASection';
import Footer from './Footer';
import LoginModal from './LoginModal';
import { Eye, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PublicApp() {
    const rawData = window.__INITIAL_DATA__ || {};

    const [settings, setSettings] = useState(rawData.settings || {});
    const [sections, setSections] = useState(rawData.sections || {});
    const [attractions, setAttractions] = useState(rawData.attractions || []);
    const [gallery, setGallery] = useState(rawData.gallery || []);
    const [tickets, setTickets] = useState(rawData.tickets || []);
    const [facilities, setFacilities] = useState(rawData.facilities || []);
    const [isPreview, setIsPreview] = useState(false);
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Admin authentication state matching Gunung Putri behavior
    const [isAdmin, setIsAdmin] = useState(() => {
        try {
            return localStorage.getItem('gp-admin-authed') === '1' || !!rawData.isAdmin;
        } catch {
            return !!rawData.isAdmin;
        }
    });

    const [editGalleryMode, setEditGalleryMode] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(() => {
        try {
            return localStorage.getItem('gp-upload-banner-dismissed') === '1';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        const onAdminChange = () => {
            try {
                const authed = localStorage.getItem('gp-admin-authed') === '1' || !!window.__INITIAL_DATA__?.isAdmin;
                setIsAdmin(authed);
                if (authed) {
                    setBannerDismissed(false);
                }
            } catch {
                setIsAdmin(!!window.__INITIAL_DATA__?.isAdmin);
            }
        };

        window.addEventListener('gp-admin-change', onAdminChange);
        return () => window.removeEventListener('gp-admin-change', onAdminChange);
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('preview') === '1') {
            setIsPreview(true);
            loadPreviewData();
        }
        if (urlParams.get('login') === '1' || urlParams.get('login') === 'true' || window.location.hash === '#login') {
            setIsLoginModalOpen(true);
        }
    }, []);

    const loadPreviewData = async () => {
        setLoadingPreview(true);
        try {
            const res = await fetch('/admin/preview-data', {
                headers: { 'Accept': 'application/json' },
            });
            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    setSettings(json.data.settings || {});
                    setSections(json.data.sections || {});
                    setAttractions(json.data.attractions || []);
                    setGallery(json.data.gallery || []);
                    setTickets(json.data.tickets || []);
                    setFacilities(json.data.facilities || []);
                }
            }
        } catch (e) {
            console.error('Failed to load preview data:', e);
        } finally {
            setLoadingPreview(false);
        }
    };

    const handleLogout = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || window.__CSRF_TOKEN__ || '';
            await fetch('/admin/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
        } catch (e) {}

        try {
            localStorage.setItem('gp-admin-authed', '0');
        } catch {}
        window.dispatchEvent(new Event('gp-admin-change'));
        setIsAdmin(false);
        setEditGalleryMode(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Gunung Putri Floating Admin Banner when Admin is logged in */}
            {isAdmin && !bannerDismissed && (
                <div className="upload-banner" role="status">
                    <div className="upload-banner-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <div className="upload-banner-text">
                        <strong>Mode Admin Aktif:</strong>{" "}
                        <span>Atur galeri foto (drag &amp; drop, ubah ukuran, edit caption) langsung di halaman.</span>
                    </div>
                    <div className="upload-banner-actions">
                        <button
                            type="button"
                            className="upload-banner-btn"
                            onClick={() => {
                                setEditGalleryMode(true);
                                const el = document.getElementById('galeri');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Atur Galeri
                        </button>
                        <button
                            type="button"
                            className="upload-banner-btn ghost"
                            onClick={handleLogout}
                        >
                            Keluar
                        </button>
                    </div>
                    <button
                        type="button"
                        className="upload-banner-close"
                        onClick={() => {
                            setBannerDismissed(true);
                            try { localStorage.setItem('gp-upload-banner-dismissed', '1'); } catch {}
                        }}
                        aria-label="Tutup"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Admin Preview Top Banner */}
            {isPreview && (
                <div style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 110,
                    background: '#f59e0b',
                    color: '#0f172a',
                    padding: '8px 16px',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Eye className="w-4 h-4" />
                        <span>Mode Pratinjau Admin Aktif (Termasuk Konten Draf &amp; Perubahan Belum Tayang)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                            type="button"
                            onClick={loadPreviewData}
                            disabled={loadingPreview}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '4px 10px',
                                borderRadius: 4,
                                background: 'rgba(0,0,0,0.1)',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: 12
                            }}
                        >
                            <RefreshCw className={`w-3 h-3 ${loadingPreview ? 'animate-spin' : ''}`} />
                            <span>Segarkan</span>
                        </button>
                        <a
                            href="/admin"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '4px 12px',
                                borderRadius: 4,
                                background: '#0f172a',
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: 12
                            }}
                        >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Kembali ke Admin</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Navigation Bar */}
            <Navigation settings={settings} />

            {/* Main Content Sections */}
            <main className="flex-1">
                {/* 1. Hero Section */}
                <Hero
                    section={sections.hero || {}}
                    settings={settings}
                />

                {/* 2. About Section */}
                <About
                    section={sections.about || {}}
                    settings={settings}
                />

                {/* 3. Attractions (Wahana & Daya Tarik) */}
                <Attractions
                    section={sections.attractions || {}}
                    attractions={attractions}
                    settings={settings}
                />

                {/* 4. Visitor Information & Tickets */}
                <VisitorInfo
                    section={sections.visitor_info || {}}
                    tickets={tickets}
                    facilities={facilities}
                    settings={settings}
                />

                {/* 5. Location & Route Guide */}
                <Location
                    section={sections.location || {}}
                    settings={settings}
                />

                {/* 6. Gallery Section with Gunung Putri live editing features */}
                <Gallery
                    section={sections.gallery || {}}
                    gallery={gallery}
                    isAdmin={isAdmin}
                    editModeProp={editGalleryMode}
                />

                {/* 7. Final Call to Action & Contact Form */}
                <CTASection
                    section={sections.cta || {}}
                    settings={settings}
                />
            </main>

            {/* Footer with exact Gunung Putri Admin Gate & Links */}
            <Footer 
                settings={settings} 
                onOpenLogin={() => setIsLoginModalOpen(true)}
                isAdmin={isAdmin}
                onLogout={handleLogout}
            />

            {/* Admin Login Popup Modal matching Gunung Putri 1:1 */}
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={() => {
                    setIsAdmin(true);
                    setBannerDismissed(false);
                }}
            />
        </div>
    );
}

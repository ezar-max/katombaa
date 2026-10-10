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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('preview') === '1') {
            setIsPreview(true);
            loadPreviewData();
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

    return (
        <div className="min-h-screen flex flex-col bg-white">
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
                        <span>Mode Pratinjau Admin Aktif (Termasuk Konten Draf & Perubahan Belum Tayang)</span>
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

            {/* Main Content Sections in exact Gunung Putri order */}
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

                {/* 6. Gallery Section */}
                <Gallery
                    section={sections.gallery || {}}
                    gallery={gallery}
                />

                {/* 7. Final Call to Action & Contact Form */}
                <CTASection
                    section={sections.cta || {}}
                    settings={settings}
                />
            </main>

            {/* Footer */}
            <Footer settings={settings} />
        </div>
    );
}

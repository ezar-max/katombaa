import React, { useState, useEffect } from 'react';

export default function Navigation({ settings = {} }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');

    const navItems = [
        { id: 'beranda', label: 'Beranda', href: '#beranda' },
        { id: 'tentang', label: 'Tentang', href: '#tentang' },
        { id: 'daya-tarik', label: 'Daya Tarik', href: '#daya-tarik' },
        { id: 'informasi-pengunjung', label: 'Tiket & Fasilitas', href: '#informasi-pengunjung' },
        { id: 'lokasi', label: 'Lokasi', href: '#lokasi' },
        { id: 'galeri', label: 'Galeri', href: '#galeri' },
        { id: 'kontak', label: 'Kontak', href: '#kontak' },
    ];

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            // Active section detection
            const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean);
            const scrollPos = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                if (sec && sec.offsetTop <= scrollPos) {
                    setActiveSection(sec.id);
                    break;
                }
            }
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const whatsappNumber = settings.contact_whatsapp || '6281283839900';
    const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent('Halo Katoomba Greenpark, saya ingin informasi wisata dan tiket.')}`;

    return (
        <header className={`nav ${scrolled ? 'nav-bg' : ''}`}>
            <div className="container nav-inner">
                {/* Brand Logo */}
                <a href="#beranda" onClick={(e) => scrollTo(e, '#beranda')} className="nav-logo" aria-label={settings.site_name || 'Katoomba Greenpark'}>
                    <img
                        src="/images/logo.png"
                        alt={settings.site_name || 'Katoomba Greenpark'}
                        style={{
                            height: 48,
                            width: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                            background: 'transparent',
                            filter: scrolled ? 'none' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                            transition: 'all .25s ease'
                        }}
                    />
                </a>

                {/* Desktop Nav Links */}
                <nav className="nav-links">
                    {navItems.map((l) => (
                        <a
                            key={l.id}
                            href={l.href}
                            className={`nav-link ${activeSection === l.id ? 'active' : ''}`}
                            onClick={(e) => scrollTo(e, l.href)}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                {/* Right CTA */}
                <a
                    className="btn btn-primary nav-cta"
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '10px 20px', fontSize: 13 }}
                >
                    Hubungi Kami
                </a>

                {/* Mobile Burger Button */}
                <button
                    className="nav-burger"
                    aria-label="Menu"
                    onClick={() => setMobileOpen((o) => !o)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24, height: 24 }}>
                        {mobileOpen ? (
                            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                        ) : (
                            <>
                                <path d="M3 7h18" strokeLinecap="round" />
                                <path d="M3 12h18" strokeLinecap="round" />
                                <path d="M3 17h18" strokeLinecap="round" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Slide Drawer */}
            <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
                {navItems.map((l) => (
                    <a
                        key={l.id}
                        href={l.href}
                        onClick={(e) => scrollTo(e, l.href)}
                    >
                        {l.label}
                    </a>
                ))}
                <div style={{ marginTop: 'auto', paddingTop: 24 }}>
                    <a
                        className="btn btn-primary"
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Hubungi via WhatsApp
                    </a>
                </div>
            </div>
        </header>
    );
}

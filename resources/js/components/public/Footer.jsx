import React from 'react';
import { Lock } from 'lucide-react';

function IconWhatsApp() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.5 1.34 5.02L2 22l5.13-1.32A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.4 14.27c-.23.65-1.34 1.25-1.86 1.31-.5.06-1.14.08-1.84-.12-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.23.56.78 1.93.85 2.07.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.37-.44.5-.14.14-.29.29-.13.57.16.29.71 1.17 1.52 1.89.99.88 1.83 1.16 2.1 1.3.27.14.43.12.59-.07.16-.19.7-.81.89-1.09.19-.29.36-.24.62-.15.26.09 1.64.77 1.92.91.28.14.46.21.53.33.05.12.05.71-.18 1.36z" />
        </svg>
    );
}

function IconInstagram() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.22.41a3.7 3.7 0 0 1 1.37.89c.42.42.68.82.89 1.37.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22a3.7 3.7 0 0 1-.89 1.37c-.42.42-.82.68-1.37.89-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.37-.89 3.7 3.7 0 0 1-.89-1.37c-.16-.42-.36-1.05-.41-2.22C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.21-.55.47-.95.89-1.37s.82-.68 1.37-.89c.42-.16 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.51 0-4.74.06-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83s-.62.76-.83 1.27c-.15.39-.33.97-.38 2.04C2.68 8.49 2.67 8.85 2.67 12s0 3.51.07 4.74c.05 1.07.23 1.65.38 2.04.21.51.44.88.83 1.27s.76.62 1.27.83c.39.15.97.33 2.04.38 1.23.06 1.59.07 4.74.07s3.51 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.21.88-.44 1.27-.83s.62-.76.83-1.27c.15-.39.33-.97.38-2.04.06-1.23.07-1.59.07-4.74s0-3.51-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 0 0-.83-1.27 3.4 3.4 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.23-.06-1.59-.07-4.74-.07zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26zM18 6.65a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
        </svg>
    );
}

function IconFacebook() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v6.98A10 10 0 0 0 22 12z" />
        </svg>
    );
}

export default function Footer({ settings = {} }) {
    const siteName = settings.site_name || 'Katoomba Greenpark';
    const address = settings.address || 'Jl. Raya Bojong Nangka, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16963';
    const phone = settings.contact_phone || '(021) 867-0099';
    const whatsapp = settings.contact_whatsapp || '6281283839900';
    const cleanWa = whatsapp.replace(/[^0-9]/g, '');
    const email = settings.contact_email || 'info@katoombagreenpark.id';
    const instagram = settings.instagram_url || 'https://instagram.com/katoombagreenpark';
    const facebook = settings.facebook_url || 'https://facebook.com/katoombagreenpark';
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent('Halo Katoomba Greenpark, saya ingin informasi kunjungan.')}`;

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-grid">
                        {/* Col 1: Brand & Identity */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <img
                                    src="/images/logo.png"
                                    alt={siteName}
                                    style={{
                                        height: 48,
                                        width: 'auto',
                                        objectFit: 'contain',
                                        background: '#fff',
                                        borderRadius: 8,
                                        padding: '3px 8px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                    }}
                                />
                                <div className="footer-brand" style={{ margin: 0 }}>
                                    {siteName.toUpperCase()}
                                </div>
                            </div>
                            <p className="footer-desc">
                                Destinasi eko-rekreasi keluarga seluas 3 hektar dengan kolam renang waterpark anak, danau sepeda air, mini zoo edukasi satwa, pemancingan keluarga, dan Gedung Phinisi di Bojong Nangka, Gunung Putri, Bogor.
                            </p>
                        </div>

                        {/* Col 2: Navigation Links */}
                        <div className="footer-col">
                            <h4>NAVIGASI</h4>
                            <ul>
                                <li><a href="#beranda">Beranda</a></li>
                                <li><a href="#tentang">Tentang Kami</a></li>
                                <li><a href="#daya-tarik">Wahana & Daya Tarik</a></li>
                                <li><a href="#informasi-pengunjung">Tiket & Fasilitas</a></li>
                                <li><a href="#lokasi">Lokasi & Rute</a></li>
                                <li><a href="#galeri">Galeri Foto</a></li>
                                <li><a href="#kontak">Hubungi Kami</a></li>
                            </ul>
                        </div>

                        {/* Col 3: Contact Info */}
                        <div className="footer-col">
                            <h4>KONTAK & JAM BUKA</h4>
                            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.85)', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div>
                                    <strong style={{ color: 'var(--c-white)' }}>Alamat:</strong><br />
                                    {address}
                                </div>
                                <div>
                                    <strong style={{ color: 'var(--c-white)' }}>Telepon:</strong> {phone}<br />
                                    <strong style={{ color: 'var(--c-white)' }}>WhatsApp:</strong> +{cleanWa}
                                </div>
                                <div>
                                    <strong style={{ color: 'var(--c-white)' }}>Email:</strong> {email}
                                </div>
                                <div>
                                    <strong style={{ color: 'var(--c-white)' }}>Jam Operasional:</strong><br />
                                    Setiap Hari: 08.00 – 17.00 WIB
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div>
                            &copy; {currentYear} {siteName}. All rights reserved.
                        </div>

                        <div className="footer-socials">
                            <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <IconInstagram />
                            </a>
                            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <IconFacebook />
                            </a>
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <IconWhatsApp />
                            </a>
                        </div>
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', margin: 0 }}>
                            Katoomba Greenpark &mdash; Wisata Keluarga Bojong Nangka, Kec. Gunung Putri, Kabupaten Bogor.
                        </p>
                        <a
                            href="/admin/login"
                            className="admin-gate-link"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}
                        >
                            <Lock className="w-3 h-3" />
                            <span>Portal Admin CMS</span>
                        </a>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Action Button */}
            <a
                className="wa-fab"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat WhatsApp Katoomba"
            >
                <span className="wa-label">Chat via WhatsApp</span>
                <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M16.004 3.2C8.93 3.2 3.2 8.93 3.2 16c0 2.27.6 4.49 1.74 6.45L3.2 28.8l6.55-1.7A12.74 12.74 0 0 0 16 28.8C23.07 28.8 28.8 23.07 28.8 16S23.07 3.2 16.004 3.2zm0 23.06c-1.95 0-3.86-.52-5.53-1.51l-.4-.24-3.89 1.01 1.04-3.79-.26-.4a10.45 10.45 0 0 1-1.6-5.53c0-5.78 4.7-10.48 10.48-10.48 2.8 0 5.43 1.09 7.41 3.07s3.07 4.61 3.07 7.41c-.01 5.78-4.71 10.46-10.48 10.46zm5.74-7.84c-.31-.16-1.86-.92-2.14-1.02-.29-.1-.5-.16-.7.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.69.08-.31-.16-1.33-.49-2.53-1.56-.94-.83-1.57-1.87-1.75-2.18-.18-.31-.02-.48.13-.63.13-.13.31-.34.46-.51.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53-.18-.01-.39-.01-.6-.01s-.55.08-.84.39-1.1 1.08-1.1 2.63 1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.39 4.76.75.33 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.86-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.07-.13-.28-.21-.59-.36z" />
                </svg>
            </a>
        </>
    );
}

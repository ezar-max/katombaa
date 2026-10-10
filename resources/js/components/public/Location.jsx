import React from 'react';

function ArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: 8 }}>
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Location({ section = {}, settings = {} }) {
    if (section.is_active === false) {
        return null;
    }

    const title = section.title || 'Akses Strategis di Koridor Gunung Putri';
    const subtitle = section.subtitle || 'LOKASI & AKSES';
    const description = section.description || 'Katoomba Greenpark berada di Jl. Raya Bojong Nangka, sangat mudah dicapai baik menggunakan kendaraan pribadi maupun transportasi online dari berbagai penjuru Jabodetabek.';
    const mapsUrl = settings.maps_url || 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9';
    const address = settings.address || 'Jl. Raya Bojong Nangka, Bojong Nangka, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16963';
    const embedUrl = settings.maps_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.676128092211!2d106.9026123!3d-6.4365376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eac8ee6a6ed1%3A0xa5d3e1faf60d2437!2sKATOOMBA%20GREENPARK!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid';

    const nearbyData = [
        {
            category: 'Akses Tol',
            items: ['Tol Jagorawi (Exit GT Gunung Putri / Cibubur)', 'Tol Cimanggis - Cibitung', 'Tol JORR 2 / Jatikarya'],
        },
        {
            category: 'Transit & Stasiun',
            items: ['LRT Jabodebek Harjamukti (± 20 menit)', 'Stasiun KRL Nambo & Cibinong', 'Ojek & Taksi Online 24 Jam'],
        },
        {
            category: 'Kawasan Sekitar',
            items: ['Bojong Nangka', 'Cikeas Udik', 'Kota Wisata Cibubur', 'Cileungsi', 'Cibinong'],
        },
        {
            category: 'Jam Buka',
            items: ['Setiap Hari: 08.00 – 17.00 WIB', 'Loket Tiket Tutup: 16.30 WIB'],
        },
    ];

    return (
        <section id="lokasi" className="bg-white">
            <div className="container">
                <div className="sec-head">
                    <span className="eyebrow">{subtitle}</span>
                    <h2>{title}</h2>
                    <div className="divider" />
                    <p className="lead">{description}</p>
                </div>

                <div className="location-grid">
                    <div className="map-frame">
                        <iframe
                            src={embedUrl}
                            title="Lokasi Katoomba Greenpark"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--c-blue)', marginBottom: 6 }}>Alamat Lengkap</h4>
                        <p style={{ color: 'var(--c-ink-soft)', marginBottom: 20, lineHeight: 1.6 }}>{address}</p>

                        <a
                            className="btn btn-primary"
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginBottom: 32 }}
                        >
                            <span>Buka di Google Maps</span>
                            <ArrowRight />
                        </a>

                        <div className="nearby-list">
                            {nearbyData.map((row, i) => (
                                <div className="nearby-row" key={i}>
                                    <div className="nearby-cat">{row.category}</div>
                                    <div className="nearby-items">
                                        {row.items.map((it, j) => (
                                            <span key={j}>{it}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

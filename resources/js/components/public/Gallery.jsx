import React, { useState } from 'react';
import Img from '../common/Img';

export default function Gallery({ section = {}, gallery = [] }) {
    if (section.is_active === false) {
        return null;
    }

    const [lightboxIndex, setLightboxIndex] = useState(null);

    const title = section.title || 'Galeri Potret Destinasi';
    const subtitle = section.subtitle || 'DOKUMENTASI & GALERI';
    const description = section.description || 'Koleksi potret keasrian alam, keseruan wahana air, dan kehangatan kebersamaan pengunjung di Katoomba Greenpark.';

    const items = (gallery && gallery.length > 0) ? gallery : [
        { id: 1, title: 'Kolam Waterpark & Ember Tumpah', image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', span: 'wide' },
        { id: 2, title: 'Sepeda Air Bebek di Danau', image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', span: '' },
        { id: 3, title: 'Keluarga Bersantai di Saung', image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80', span: 'tall' },
        { id: 4, title: 'Mini Zoo Kelinci Lucu', image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80', span: '' },
        { id: 5, title: 'Kolam Renang Semi-Olimpik Dewasa', image_url: 'https://images.unsplash.com/photo-1582650625119-3a31f8418bb9?auto=format&fit=crop&w=800&q=80', span: '' },
        { id: 6, title: 'Gedung Phinisi Gathering Hall', image_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80', span: 'wide' },
    ];

    return (
        <section id="galeri" className="bg-grey">
            <div className="container">
                <div className="sec-head gallery-head">
                    <div>
                        <span className="eyebrow">{subtitle}</span>
                        <h2>{title}</h2>
                        <div className="divider" />
                        <p className="lead">{description}</p>
                    </div>
                </div>

                <div className="gallery-grid">
                    {items.map((g, i) => {
                        const isWide = g.span === 'wide' || i === 0 || i === 5;
                        const isTall = g.span === 'tall' || i === 2;
                        return (
                            <div
                                key={g.id || i}
                                className={`gallery-item ${isWide ? 'wide' : ''} ${isTall ? 'tall' : ''}`}
                                onClick={() => setLightboxIndex(i)}
                            >
                                <Img
                                    src={g.image_url}
                                    alt={g.title || 'Galeri Foto'}
                                    caption={g.title || 'Foto Galeri'}
                                />
                                <div className="gallery-caption">{g.title || g.caption}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {lightboxIndex !== null && items[lightboxIndex] && (
                <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
                    <button
                        type="button"
                        className="lightbox-close"
                        aria-label="Tutup"
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(null);
                        }}
                    >
                        ✕
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={items[lightboxIndex].image_url}
                            alt={items[lightboxIndex].title}
                        />
                        <div className="lightbox-caption">{items[lightboxIndex].title || items[lightboxIndex].caption}</div>
                    </div>
                </div>
            )}
        </section>
    );
}

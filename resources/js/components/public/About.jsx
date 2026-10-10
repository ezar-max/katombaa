import React from 'react';
import Img from '../common/Img';

function ArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: 8 }}>
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function About({ section = {}, settings = {} }) {
    if (section.is_active === false) {
        return null;
    }

    const title = section.title || 'Pesona Wisata Terpadu di Jantung Bojong Nangka';
    const subtitle = section.subtitle || 'TENTANG KATOOMBA GREENPARK';
    const badge = section.badge || 'Kawasan Wisata Rekreasi & Alam Hijau';
    const description = section.description || 'Katoomba Greenpark menghadirkan ruang rekreasi keluarga yang memadukan keseruan wisata air modern dengan keteduhan ruang terbuka hijau. Berdiri di atas lahan seluas kurang lebih 3 hektar di Bojong Nangka, kawasan ini dirancang sebagai tempat istirahat dan petualangan yang aman, nyaman, dan edukatif bagi anak-anak maupun orang dewasa.';
    const imageUrl = section.image_url || 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80';
    const ctaText = section.cta_text || 'Informasi Tiket & Fasilitas';
    const ctaUrl = section.cta_url || '#informasi-pengunjung';

    const stats = [
        { value: '3 Ha', label: 'Luas Area Hijau & Rekreasi Terpadu' },
        { value: '6+', label: 'Wahana Air & Edukasi Satwa Jinak' },
        { value: '2.500+', label: 'Kapasitas Pengunjung Harian Nyaman' },
        { value: '100%', label: 'Suasana Alam Asri & Ramah Keluarga' },
    ];

    return (
        <section id="tentang" className="bg-white">
            <div className="container">
                <div className="about-grid">
                    <div className="about-text">
                        <span className="eyebrow">{subtitle}</span>
                        <h2 style={{ marginTop: 14 }}>{title}</h2>
                        <div className="divider" />
                        <p className="lead">
                            {description}
                        </p>
                        <p className="lead" style={{ fontSize: 15, marginTop: 16 }}>
                            Dilengkapi kolam renang waterpark anak dengan ember tumpah ceria, kolam renang semi-olimpik, danau rekreasi sepeda air, mini zoo satwa jinak, kolam pemancingan, serta Gedung Phinisi yang ikonik untuk berbagai acara komunitas dan gathering keluarga.
                        </p>
                        <div style={{ marginTop: 28 }}>
                            <a className="btn btn-primary" href={ctaUrl}>
                                <span>{ctaText}</span>
                                <ArrowRight />
                            </a>
                        </div>
                    </div>
                    <div className="about-image">
                        <Img
                            src={imageUrl}
                            alt="Tentang Katoomba Greenpark"
                            caption="Katoomba Greenpark (4:5)"
                        />
                    </div>
                </div>

                <div className="stats">
                    {stats.map((s, i) => (
                        <div className="stat" key={i}>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

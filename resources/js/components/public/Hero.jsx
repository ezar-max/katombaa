import React, { useRef, useEffect } from 'react';
import Img from '../common/Img';

function ArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: 8 }}>
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function useParallax(strength = 0.35) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const y = window.scrollY;
                el.style.transform = `translate3d(0, ${y * strength}px, 0)`;
                raf = null;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [strength]);
    return ref;
}

export default function Hero({ section = {}, settings = {} }) {
    if (section.is_active === false) {
        return null;
    }

    const parallaxRef = useParallax(0.35);

    const title = section.title || 'Harmoni Wisata Air & Alam Asri untuk Seluruh Keluarga';
    const subtitle = section.subtitle || 'Destinasi rekreasi hijau 3 hektar dengan waterpark anak, danau buatan, dan wahana edukasi di Bojong Nangka, Gunung Putri, Bogor.';
    const badge = section.badge || 'DESTINASI WISATA KELUARGA DI BOGOR';
    const ctaText = section.cta_text || 'Informasi Tiket & Fasilitas';
    const ctaUrl = section.cta_url || '#informasi-pengunjung';
    const secondaryCtaText = section.secondary_cta_text || 'Jelajahi Daya Tarik';
    const secondaryCtaUrl = section.secondary_cta_url || '#daya-tarik';
    const imageUrl = section.image_url || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80';

    return (
        <section className="hero hero-v1" id="beranda">
            <div className="hero-image">
                <div ref={parallaxRef} style={{ width: '100%', height: '100%' }}>
                    <Img
                        src={imageUrl}
                        alt={title}
                        caption="Katoomba Greenpark Hero (1920×1200)"
                        style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center 15%' }}
                    />
                </div>
            </div>
            <div className="hero-overlay" />
            <div className="container hero-content">
                <span className="eyebrow">{badge}</span>
                <h1 style={{ marginTop: 18 }}>{title}</h1>
                <p className="hero-sub">{subtitle}</p>
                <div className="hero-ctas">
                    <a className="btn btn-primary" href={ctaUrl}>
                        <span>{ctaText}</span>
                        <ArrowRight />
                    </a>
                    <a className="btn btn-ghost" href={secondaryCtaUrl}>
                        {secondaryCtaText}
                    </a>
                </div>
            </div>
            <div className="scroll-hint">Scroll</div>
        </section>
    );
}

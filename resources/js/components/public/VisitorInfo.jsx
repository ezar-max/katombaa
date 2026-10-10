import React, { useState } from 'react';

function ArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: 8 }}>
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function VisitorInfo({ section = {}, tickets = [], facilities = [], settings = {} }) {
    if (section.is_active === false) {
        return null;
    }

    const [activeTab, setActiveTab] = useState(0);

    const title = section.title || 'Tarif Tiket & Panduan Wisata';
    const subtitle = section.subtitle || 'INFORMASI PENGUNJUNG';
    const description = section.description || 'Pastikan agenda rekreasi keluarga Anda berjalan lancar dengan menyimak informasi jam operasional, tarif tiket resmi, serta kelengkapan fasilitas yang kami sediakan.';
    const whatsapp = settings.contact_whatsapp || '6281283839900';
    const cleanWa = whatsapp.replace(/[^0-9]/g, '');

    const tips = section.extra_data?.tips || [
        'Disarankan membawa pakaian renang ganti dan handuk pribadi.',
        'Disediakan loker penyimpanan aman untuk barang berharga Anda.',
        'Tersedia saung dan gazebo teduh yang dapat digunakan bersantai.',
        'Patuhi tata tertib kolam renang dan awasi anak-anak saat bermain air.',
    ];

    const tabs = [
        { id: 'tickets', label: 'Tiket Masuk & Paket', meta: `${tickets.length} pilihan tarif` },
        { id: 'facilities', label: 'Fasilitas Penunjang', meta: `${facilities.length} fasilitas` },
        { id: 'schedule', label: 'Jam Buka & Ketentuan', meta: 'Jadwal operasional' },
    ];

    return (
        <section id="informasi-pengunjung" className="bg-white">
            <div className="container">
                <div className="sec-head">
                    <span className="eyebrow">{subtitle}</span>
                    <h2>{title}</h2>
                    <div className="divider" />
                    <p className="lead">{description}</p>
                </div>

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: 44 }}>
                    {tabs.map((t, i) => (
                        <button
                            key={t.id}
                            type="button"
                            className={`tab ${activeTab === i ? 'active' : ''}`}
                            onClick={() => setActiveTab(i)}
                        >
                            <span className="tab-label">{t.label}</span>
                            <span className="tab-meta">{t.meta}</span>
                        </button>
                    ))}
                </div>

                {/* Tab 0: Tickets */}
                {activeTab === 0 && (
                    <>
                        <div className="units-grid" style={{ marginBottom: 48 }}>
                            {tickets.map((t) => {
                                const waUrl = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent(`Halo Admin Katoomba, saya ingin tanya tiket ${t.name}.`)}`;
                                return (
                                    <div key={t.id} className="unit-detail-card">
                                        <div className="unit-detail-body">
                                            <span className="unit-tag" style={{ display: 'inline-block', marginBottom: 10 }}>
                                                {t.days_valid || 'TIKET RESMI'}
                                            </span>
                                            <div className="unit-detail-head">
                                                <h3 className="unit-detail-name">{t.name}</h3>
                                                <span className="unit-detail-size">
                                                    {t.price_formatted || (t.price > 0 ? `Rp ${t.price.toLocaleString('id-ID')}` : 'Gratis')}
                                                </span>
                                            </div>

                                            <p style={{ fontSize: 14, color: 'var(--c-ink-soft)', marginBottom: 20, lineHeight: 1.6 }}>
                                                {t.note || 'Akses penuh wahana kolam renang waterpark, taman rekreasi anak, dan fasilitas umum.'}
                                            </p>

                                            <div className="unit-features" style={{ marginBottom: 24 }}>
                                                <div className="feature-chip">
                                                    <CheckIcon />
                                                    <span>Kolam Renang</span>
                                                </div>
                                                <div className="feature-chip">
                                                    <CheckIcon />
                                                    <span>Saung & Gazebo</span>
                                                </div>
                                                <div className="feature-chip">
                                                    <CheckIcon />
                                                    <span>Kamar Bilas</span>
                                                </div>
                                                <div className="feature-chip">
                                                    <CheckIcon />
                                                    <span>Mini Zoo Satwa</span>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--c-grey-2)' }}>
                                                <a
                                                    href={waUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-ghost"
                                                    style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '10px 18px' }}
                                                >
                                                    <span>Tanya Tiket via WhatsApp</span>
                                                    <ArrowRight />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Group Booking Banner */}
                        <div style={{
                            background: 'var(--c-grey)',
                            borderRadius: 'var(--radius)',
                            padding: '32px 36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 24,
                            flexWrap: 'wrap'
                        }}>
                            <div>
                                <span className="unit-tag" style={{ display: 'block', marginBottom: 6 }}>
                                    PAKET KHUSUS ROMBONGAN
                                </span>
                                <h3 style={{ fontSize: 22, color: 'var(--c-navy)', margin: 0 }}>
                                    Kunjungan Sekolah, Arisan, atau Gathering Komunitas?
                                </h3>
                                <p style={{ fontSize: 14, color: 'var(--c-ink-soft)', margin: '6px 0 0', maxWidth: 640 }}>
                                    Dapatkan potongan harga spesial rombongan, reservasi area saung eksklusif, serta pendamping kegiatan.
                                </p>
                            </div>
                            <a
                                href={`https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent('Halo Admin Katoomba, saya ingin konsultasi paket rombongan/gathering.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <span>Konsultasi Paket Rombongan</span>
                                <ArrowRight />
                            </a>
                        </div>
                    </>
                )}

                {/* Tab 1: Facilities */}
                {activeTab === 1 && (
                    <div className="units-grid">
                        {facilities.map((fac) => (
                            <div key={fac.id} className="unit-card" style={{ padding: 24 }}>
                                <span className="unit-tag">FASILITAS</span>
                                <div className="unit-name" style={{ fontSize: 20, marginTop: 8 }}>
                                    {fac.name}
                                </div>
                                <div className="divider" style={{ margin: '12px 0' }} />
                                <p style={{ fontSize: 14, color: 'var(--c-ink-soft)', margin: 0, lineHeight: 1.6 }}>
                                    {fac.description || 'Fasilitas penunjang kebersihan dan kenyamanan pengunjung di area wisata.'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 2: Operating Hours & Rules */}
                {activeTab === 2 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                        <div className="unit-card" style={{ padding: 36 }}>
                            <span className="unit-tag">JADWAL RESMI</span>
                            <h3 style={{ fontSize: 24, color: 'var(--c-navy)', margin: '8px 0 12px' }}>
                                Jam Operasional
                            </h3>
                            <div className="divider" />
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 600, color: 'var(--c-blue)', margin: '20px 0 8px' }}>
                                08.00 – 17.00 <span style={{ fontSize: 18, color: 'var(--c-ink-soft)' }}>WIB</span>
                            </div>
                            <p style={{ fontSize: 14, color: 'var(--c-ink-soft)', lineHeight: 1.65 }}>
                                Buka setiap hari dari Senin hingga Minggu, termasuk hari libur nasional dan cuti bersama. Loket tiket ditutup pukul 16.30 WIB.
                            </p>
                        </div>

                        <div className="unit-card" style={{ padding: 36 }}>
                            <span className="unit-tag">PANDUAN KUNJUNGAN</span>
                            <h3 style={{ fontSize: 24, color: 'var(--c-navy)', margin: '8px 0 12px' }}>
                                Tips & Tata Tertib
                            </h3>
                            <div className="divider" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
                                {tips.map((t, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'var(--c-ink)', lineHeight: 1.5 }}>
                                        <div style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            background: 'var(--c-grey-2)',
                                            color: 'var(--c-blue)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: 11,
                                            flexShrink: 0,
                                            marginTop: 2
                                        }}>
                                            ✓
                                        </div>
                                        <span>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

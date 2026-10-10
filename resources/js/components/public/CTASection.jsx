import React, { useState } from 'react';

function ArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: 8 }}>
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconWhatsApp() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.5 1.34 5.02L2 22l5.13-1.32A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.4 14.27c-.23.65-1.34 1.25-1.86 1.31-.5.06-1.14.08-1.84-.12-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.23.56.78 1.93.85 2.07.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.37-.44.5-.14.14-.29.29-.13.57.16.29.71 1.17 1.52 1.89.99.88 1.83 1.16 2.1 1.3.27.14.43.12.59-.07.16-.19.7-.81.89-1.09.19-.29.36-.24.62-.15.26.09 1.64.77 1.92.91.28.14.46.21.53.33.05.12.05.71-.18 1.36z" />
        </svg>
    );
}

function IconPhone() {
    return (
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconMail() {
    return (
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconPin() {
    return (
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function CTASection({ section = {}, settings = {} }) {
    if (section.is_active === false) {
        return null;
    }

    const [form, setForm] = useState({ name: '', phone: '', interest: '', message: '' });
    const [sent, setSent] = useState(false);

    const title = section.title || 'Rencanakan Liburan Keluarga Anda';
    const subtitle = section.subtitle || 'HUBUNGI KAMI';
    const description = section.description || 'Dapatkan informasi reservasi gathering, paket rombongan sekolah, atau sewa area acara dengan menghubungi tim pengelola Katoomba Greenpark.';

    const whatsapp = settings.contact_whatsapp || '6281283839900';
    const cleanWa = whatsapp.replace(/[^0-9]/g, '');
    const phone = settings.contact_phone || '(021) 867-0099';
    const email = settings.contact_email || 'info@katoombagreenpark.id';
    const address = settings.address || 'Jl. Raya Bojong Nangka, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16963';

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const submit = (e) => {
        e.preventDefault();
        const msg = [
            'Halo Pengelola Katoomba Greenpark,',
            '',
            `Nama   : ${form.name || '-'}`,
            `Telp   : ${form.phone || '-'}`,
            `Minat  : ${form.interest || 'Informasi Wisata'}`,
            `Pesan  : ${form.message || '-'}`,
        ].join('\n');
        window.open(`https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
        setSent(true);
    };

    return (
        <section id="kontak" className="bg-blue">
            <div className="container">
                <div className="contact-grid">
                    <div>
                        <span className="eyebrow" style={{ color: 'rgba(255,255,255,.75)' }}>{subtitle}</span>
                        <h2 style={{ marginTop: 14, color: 'var(--c-white)' }}>{title}</h2>
                        <div className="divider" style={{ background: 'rgba(255,255,255,.3)' }} />
                        <p className="lead" style={{ maxWidth: 480, color: 'rgba(255,255,255,.85)' }}>{description}</p>

                        <div className="contact-info-list">
                            <div className="contact-row">
                                <div className="contact-icon"><IconWhatsApp /></div>
                                <div>
                                    <div className="contact-label">WhatsApp Resmi</div>
                                    <div className="contact-value">
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent('Halo Katoomba Greenpark, saya ingin informasi wisata.')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            +{cleanWa}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-row">
                                <div className="contact-icon"><IconPhone /></div>
                                <div>
                                    <div className="contact-label">Telepon Pengelola</div>
                                    <div className="contact-value">
                                        <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>{phone}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-row">
                                <div className="contact-icon"><IconMail /></div>
                                <div>
                                    <div className="contact-label">Email Resmi</div>
                                    <div className="contact-value">
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-row">
                                <div className="contact-icon"><IconPin /></div>
                                <div>
                                    <div className="contact-label">Alamat Destinasi</div>
                                    <div className="contact-value" style={{ lineHeight: 1.5 }}>{address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <form className="form" onSubmit={submit}>
                            <div className="field-row">
                                <div className="field">
                                    <label>Nama Lengkap</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nama Anda"
                                        value={form.name}
                                        onChange={(e) => update('name', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>No. WhatsApp</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="08xx-xxxx-xxxx"
                                        value={form.phone}
                                        onChange={(e) => update('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label>Keperluan Kunjungan</label>
                                <select
                                    value={form.interest}
                                    onChange={(e) => update('interest', e.target.value)}
                                    required
                                >
                                    <option value="">Pilih keperluan...</option>
                                    <option value="Tiket Masuk & Wahana Air">Tiket Masuk & Wahana Air</option>
                                    <option value="Paket Rombongan Sekolah / TK">Paket Rombongan Sekolah / TK</option>
                                    <option value="Gathering Komunitas / Kantor">Gathering Komunitas / Kantor</option>
                                    <option value="Sewa Gedung Phinisi / Acara">Sewa Gedung Phinisi / Acara</option>
                                    <option value="Lainnya">Pertanyaan Lainnya</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Pesan / Pertanyaan</label>
                                <textarea
                                    placeholder="Tuliskan tanggal rencana kunjungan, perkiraan jumlah orang, atau pertanyaan lainnya…"
                                    value={form.message}
                                    onChange={(e) => update('message', e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">
                                <span>{sent ? 'Terkirim — Buka WhatsApp' : 'Kirim via WhatsApp'}</span>
                                <ArrowRight />
                            </button>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 4 }}>
                                Form ini akan membuka aplikasi WhatsApp dengan pesan terisi otomatis tanpa perlu simpan nomor.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

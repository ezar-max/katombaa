import React, { useState } from 'react';
import Img from '../common/Img';

export default function Attractions({ section = {}, attractions = [], settings = {} }) {
    if (section.is_active === false) {
        return null;
    }

    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const title = section.title || 'Daya Tarik & Wahana Unggulan';
    const subtitle = section.subtitle || 'DAYA TARIK UNGGULAN';
    const description = section.description || 'Dari keseruan cipratan waterpark anak hingga keteduhan memancing dan berperahu di tepian danau buatan, setiap sudut Katoomba Greenpark dirancang untuk menghadirkan kebahagiaan seluruh keluarga.';

    // Extract categories with counts
    const categoryCounts = attractions.reduce((acc, a) => {
        const cat = a.category || 'Lainnya';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});

    const categories = [
        { label: 'Semua Wahana', count: `${attractions.length} wahana`, val: 'Semua' },
        ...Object.keys(categoryCounts).map(cat => ({
            label: cat,
            count: `${categoryCounts[cat]} wahana`,
            val: cat
        }))
    ];

    const filtered = selectedCategory === 'Semua'
        ? attractions
        : attractions.filter(a => a.category === selectedCategory);

    return (
        <section id="daya-tarik" className="bg-grey">
            <div className="container">
                <div className="sec-head">
                    <span className="eyebrow">{subtitle}</span>
                    <h2>{title}</h2>
                    <div className="divider" />
                    <p className="lead">{description}</p>
                </div>

                {/* Filter Tabs */}
                {categories.length > 2 && (
                    <div className="tabs" style={{ marginBottom: 48 }}>
                        {categories.map((cat) => (
                            <button
                                key={cat.val}
                                type="button"
                                className={`tab ${selectedCategory === cat.val ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.val)}
                            >
                                <span className="tab-label">{cat.label}</span>
                                <span className="tab-meta">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Alternating Tower Split Layout */}
                {filtered.map((item, idx) => {
                    const isFlipped = idx % 2 === 1;
                    const features = [
                        { note: 'KATEGORI', name: item.category || 'Wahana Wisata', size: item.suitable_for || 'Semua Usia' },
                        { note: 'JADWAL', name: 'Buka Harian', size: '08.00 – 17.00 WIB' },
                        { note: 'AKSES', name: item.price_info || 'Termasuk Tiket', size: 'Pintu Masuk Utama' },
                        { note: 'SUASANA', name: 'Asri & Alami', size: 'Area Teduh Hijau' },
                    ];

                    return (
                        <div key={item.id} className={`tower ${isFlipped ? 'flip' : ''}`}>
                            <div className="tower-image">
                                <Img
                                    src={item.image_url}
                                    alt={item.title}
                                    caption={`Wahana: ${item.title}`}
                                />
                            </div>
                            <div>
                                <span className="unit-tag" style={{ display: 'inline-block', marginBottom: 6 }}>
                                    {item.category}
                                </span>
                                <h3 className="tower-name">{item.title}</h3>
                                <div className="divider" />
                                <p className="tower-desc">
                                    {item.description || item.short_description}
                                </p>
                                <div className="unit-list">
                                    {features.map((f, fIdx) => (
                                        <div key={fIdx} className="unit-card">
                                            <span className="unit-tag">{f.note}</span>
                                            <div className="unit-name">{f.name}</div>
                                            <div className="unit-size">{f.size}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

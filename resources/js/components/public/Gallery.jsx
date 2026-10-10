import React, { useState, useEffect } from 'react';
import Img from '../common/Img';

const GALLERY_LS_KEY = 'katoomba_gallery_overrides_v1';

function IconEditPencil() {
    return (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
    );
}

function IconDrag() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <circle cx="8" cy="6" r="1.5" /><circle cx="16" cy="6" r="1.5" />
            <circle cx="8" cy="12" r="1.5" /><circle cx="16" cy="12" r="1.5" />
            <circle cx="8" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" />
        </svg>
    );
}

function IconSpan({ span }) {
    return (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {span === 'wide' && <rect x="3" y="7" width="18" height="10" rx="1.5" />}
            {span === 'tall' && <rect x="7" y="3" width="10" height="18" rx="1.5" />}
            {(!span || span === 'normal') && <rect x="6" y="6" width="12" height="12" rx="1.5" />}
        </svg>
    );
}

const DEFAULT_GALLERY = [
    { id: 1, title: 'Kolam Waterpark & Ember Tumpah', image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', span: 'wide' },
    { id: 2, title: 'Sepeda Air Bebek di Danau', image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', span: '' },
    { id: 3, title: 'Keluarga Bersantai di Saung', image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80', span: 'tall' },
    { id: 4, title: 'Mini Zoo Kelinci Lucu', image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80', span: '' },
    { id: 5, title: 'Kolam Renang Semi-Olimpik Dewasa', image_url: 'https://images.unsplash.com/photo-1582650625119-3a31f8418bb9?auto=format&fit=crop&w=800&q=80', span: '' },
    { id: 6, title: 'Gedung Phinisi Gathering Hall', image_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80', span: 'wide' },
];

export default function Gallery({ section = {}, gallery = [], isAdmin = false, editModeProp = false }) {
    if (section.is_active === false) {
        return null;
    }

    const rawList = (gallery && gallery.length > 0) ? gallery : DEFAULT_GALLERY;
    const baseItems = rawList.map((g, i) => ({
        ...g,
        _key: `g_${g.id || i}`,
        span: g.span || (i === 0 || i === 5 ? 'wide' : i === 2 ? 'tall' : ''),
        caption: g.caption || g.title || ''
    }));

    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem(GALLERY_LS_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length === baseItems.length) {
                    return parsed;
                }
            }
        } catch (e) {}
        return baseItems;
    });

    const [editMode, setEditMode] = useState(editModeProp);
    const [dragIndex, setDragIndex] = useState(null);
    const [renamingIdx, setRenamingIdx] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Synchronize editMode if parent toggles it
    useEffect(() => {
        if (editModeProp !== undefined) {
            setEditMode(editModeProp);
        }
    }, [editModeProp]);

    // Save overrides on item change
    useEffect(() => {
        try {
            localStorage.setItem(GALLERY_LS_KEY, JSON.stringify(items));
        } catch (e) {}
    }, [items]);

    // Lightbox keyboard controls
    useEffect(() => {
        if (lightboxIndex === null) return;
        document.body.style.overflow = 'hidden';
        function onKey(e) {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + items.length) % items.length);
            if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % items.length);
        }
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [lightboxIndex, items.length]);

    const title = section.title || 'Galeri Potret Destinasi';
    const subtitle = section.subtitle || 'DOKUMENTASI & GALERI';
    const description = section.description || 'Koleksi potret keasrian alam, keseruan wahana air, dan kehangatan kebersamaan pengunjung di Katoomba Greenpark.';

    function cycleSpan(idx) {
        setItems((prev) => prev.map((it, i) => {
            if (i !== idx) return it;
            const next = it.span === 'wide' ? 'tall' : it.span === 'tall' ? '' : 'wide';
            return { ...it, span: next };
        }));
    }

    function renameCaption(idx, value) {
        setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, title: value, caption: value } : it)));
    }

    function onDragStart(e, idx) {
        setDragIndex(idx);
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
        }
    }

    function onDragOver(e, idx) {
        e.preventDefault();
        if (dragIndex === null || dragIndex === idx) return;
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
    }

    function onDrop(e, idx) {
        e.preventDefault();
        if (dragIndex === null || dragIndex === idx) return;
        setItems((prev) => {
            const next = [...prev];
            const [moved] = next.splice(dragIndex, 1);
            next.splice(idx, 0, moved);
            return next;
        });
        setDragIndex(null);

        // Optional sync to backend API
        syncOrderBackend(idx);
    }

    function syncOrderBackend() {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || window.__CSRF_TOKEN__ || '';
        const ids = items.map(it => it.id).filter(id => typeof id === 'number');
        if (ids.length > 0 && csrfToken) {
            fetch('/admin/gallery/reorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ order: ids })
            }).catch(() => {});
        }
    }

    function resetLayout() {
        try {
            localStorage.removeItem(GALLERY_LS_KEY);
        } catch (e) {}
        setItems(baseItems);
    }

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

                    {isAdmin && (
                        <div className="gallery-edit-controls">
                            <button
                                type="button"
                                className={`btn-edit-toggle ${editMode ? 'active' : ''}`}
                                onClick={() => setEditMode((v) => !v)}
                            >
                                <IconEditPencil />
                                <span>{editMode ? 'Selesai Atur Galeri' : 'Atur Galeri'}</span>
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    className="btn-edit-reset"
                                    onClick={resetLayout}
                                >
                                    Reset urutan
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {isAdmin && editMode && (
                    <div className="gallery-edit-hint">
                        Geser (drag) foto untuk urutan baru &middot; klik ikon ukuran untuk ubah lebar/tinggi &middot; klik keterangan untuk ganti nama
                    </div>
                )}

                <div className="gallery-grid">
                    {items.map((g, i) => {
                        const isWide = g.span === 'wide';
                        const isTall = g.span === 'tall';
                        return (
                            <div
                                key={g._key || g.id || i}
                                className={`gallery-item ${isWide ? 'wide' : ''} ${isTall ? 'tall' : ''} ${editMode ? 'editing' : ''}`}
                                draggable={editMode}
                                onDragStart={(e) => onDragStart(e, i)}
                                onDragOver={(e) => onDragOver(e, i)}
                                onDrop={(e) => onDrop(e, i)}
                                onClick={() => {
                                    if (!editMode) setLightboxIndex(i);
                                }}
                            >
                                <Img
                                    src={g.image_url}
                                    alt={g.title || 'Galeri Foto'}
                                    caption={g.title || 'Foto Galeri'}
                                />

                                {!editMode && (
                                    <div className="gallery-caption">{g.title || g.caption}</div>
                                )}

                                {editMode && (
                                    <div className="gallery-edit-overlay">
                                        <div className="gallery-drag-handle" title="Geser untuk urutan ulang">
                                            <IconDrag />
                                        </div>
                                        <button
                                            type="button"
                                            className="gallery-span-btn"
                                            title="Ubah ukuran (normal / lebar / tinggi)"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                cycleSpan(i);
                                            }}
                                        >
                                            <IconSpan span={g.span} />
                                            <span>{g.span === 'wide' ? 'Lebar' : g.span === 'tall' ? 'Tinggi' : 'Normal'}</span>
                                        </button>
                                        {renamingIdx === i ? (
                                            <input
                                                autoFocus
                                                className="gallery-caption-input"
                                                defaultValue={g.title || g.caption}
                                                onClick={(e) => e.stopPropagation()}
                                                onBlur={(e) => {
                                                    renameCaption(i, e.target.value);
                                                    setRenamingIdx(null);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') e.target.blur();
                                                    if (e.key === 'Escape') setRenamingIdx(null);
                                                }}
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                className="gallery-caption-edit"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRenamingIdx(i);
                                                }}
                                            >
                                                {g.title || g.caption || 'Beri keterangan…'}
                                            </button>
                                        )}
                                    </div>
                                )}
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

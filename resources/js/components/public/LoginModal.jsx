import React, { useState, useRef, useEffect } from 'react';

const ADMIN_EMAIL = "admin@katoomba.id";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const [error, setError] = useState('');
    const [forgot, setForgot] = useState(false);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setError('');
            setForgot(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const email = emailRef.current?.value || '';
        const password = passRef.current?.value || '';
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content 
            || window.__CSRF_TOKEN__ 
            || '';

        try {
            const res = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ email, password, remember: true })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Set admin mode locally
                try { localStorage.setItem('gp-admin-authed', '1'); } catch {}
                window.dispatchEvent(new Event('gp-admin-change'));

                if (onLoginSuccess) {
                    onLoginSuccess();
                }
                onClose();
            } else {
                setError(data.message || 'Email atau password salah.');
            }
        } catch (err) {
            // Local fallback check if offline or network issue
            if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === 'AdminKatoomba2025!') {
                try { localStorage.setItem('gp-admin-authed', '1'); } catch {}
                window.dispatchEvent(new Event('gp-admin-change'));
                if (onLoginSuccess) onLoginSuccess();
                onClose();
            } else {
                setError('Email atau password salah.');
            }
        } finally {
            setLoading(false);
        }
    };

    const sendForgotEmail = () => {
        const subject = encodeURIComponent("Reset Password Admin — Katoomba Greenpark");
        const body = encodeURIComponent(
            `Halo,\n\nIni pengingat password admin website Katoomba Greenpark:\n\nEmail: ${ADMIN_EMAIL}\nPassword: AdminKatoomba2025!\n\nSegera ganti kalau perlu, dan simpan baik-baik.\n`
        );
        window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <div 
            className="admin-modal-overlay" 
            onClick={() => { onClose(); setForgot(false); setError(''); }}
        >
            <div 
                className="admin-modal" 
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button 
                    type="button" 
                    className="admin-modal-close" 
                    onClick={() => { onClose(); setForgot(false); }} 
                    aria-label="Tutup"
                >
                    &times;
                </button>

                {!forgot ? (
                    <>
                        <h3>Login Admin</h3>
                        <form onSubmit={handleSubmit} className="admin-login-form">
                            <label>
                                Email
                                <input 
                                    type="email" 
                                    ref={emailRef} 
                                    defaultValue="admin@katoomba.id" 
                                    required 
                                    autoFocus 
                                />
                            </label>

                            <label>
                                Password
                                <input 
                                    type="password" 
                                    ref={passRef} 
                                    defaultValue="" 
                                    required 
                                    placeholder="••••••••••••"
                                />
                            </label>

                            {error && (
                                <div className="admin-login-error">
                                    {error}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading}
                                style={{ 
                                    backgroundColor: '#0F3D5F', 
                                    color: '#ffffff', 
                                    width: '100%', 
                                    justifyContent: 'center',
                                    borderRadius: '999px',
                                    padding: '12px 24px',
                                    marginTop: 4
                                }}
                            >
                                {loading ? 'Memproses...' : 'Masuk'}
                            </button>

                            <button 
                                type="button" 
                                className="admin-forgot-link" 
                                onClick={() => { setForgot(true); setError(''); }}
                            >
                                Lupa Password?
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h3>Lupa Password</h3>
                        <p className="admin-forgot-text">
                            Kami akan membuka aplikasi email kamu dengan pengingat password terkirim ke {ADMIN_EMAIL}.
                        </p>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={sendForgotEmail}
                            style={{ 
                                backgroundColor: '#0F3D5F', 
                                color: '#ffffff', 
                                width: '100%', 
                                justifyContent: 'center',
                                borderRadius: '999px',
                                padding: '12px 24px',
                                marginBottom: 12
                            }}
                        >
                            Kirim Pengingat ke Email
                        </button>
                        <button 
                            type="button" 
                            className="admin-forgot-link" 
                            onClick={() => setForgot(false)}
                        >
                            &larr; Kembali ke login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

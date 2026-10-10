import React, { useState } from 'react';
import { 
    UserCheck, 
    Lock, 
    Mail, 
    Shield, 
    Save, 
    CheckCircle2, 
    AlertCircle, 
    RefreshCw, 
    KeyRound, 
    User,
    Check
} from 'lucide-react';
import { api } from '../../utils/api';

export default function ProfileView({ user = {}, onUserUpdate }) {
    const [profile, setProfile] = useState({
        name: user.name || 'Admin Katoomba',
        email: user.email || 'admin@katoomba.id'
    });

    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotify = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            name: profile.name,
            email: profile.email
        };

        if (passwordData.new_password) {
            payload.current_password = passwordData.current_password;
            payload.new_password = passwordData.new_password;
            payload.new_password_confirmation = passwordData.new_password_confirmation;
        }

        try {
            const res = await api.put('/admin/profile', payload);
            if (res.success) {
                showNotify('success', res.message || 'Profil berhasil diperbarui.');
                setPasswordData({
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                });
                if (onUserUpdate && res.user) {
                    onUserUpdate(res.user);
                }
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal memperbarui profil.';
            showNotify('error', errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#0F3D5F] flex items-center gap-2">
                        <UserCheck className="w-6 h-6 text-[#059669]" />
                        Pengaturan Profil & Keamanan Admin
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Kelola data identitas akun administrator dan kata sandi masuk CMS
                    </p>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border ${
                    notification.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                    {notification.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <p className="text-sm font-medium">{notification.message}</p>
                </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Account Identity Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-[#0F3D5F]/10 text-[#0F3D5F] flex items-center justify-center font-bold">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Identitas Akun</h3>
                            <p className="text-xs text-slate-500">Informasi nama tampilan dan alamat email login</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Nama Lengkap Administrator *
                            </label>
                            <input
                                type="text"
                                required
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Alamat Email Login *
                            </label>
                            <input
                                type="email"
                                required
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>
                    </div>
                </div>

                {/* Password Security Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Ubah Kata Sandi</h3>
                            <p className="text-xs text-slate-500">Kosongkan jika tidak ingin mengubah kata sandi</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Kata Sandi Saat Ini
                            </label>
                            <input
                                type="password"
                                value={passwordData.current_password}
                                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                placeholder="Masukkan kata sandi lama Anda"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Kata Sandi Baru (Min. 8 karakter)
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.new_password}
                                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                    placeholder="Masukkan kata sandi baru"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Konfirmasi Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.new_password_confirmation}
                                    onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                                    placeholder="Ulangi kata sandi baru"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0F3D5F]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F3D5F] text-white text-sm font-semibold hover:bg-[#0A2C45] transition-all shadow-md"
                    >
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Simpan Perubahan Akun
                    </button>
                </div>
            </form>
        </div>
    );
}

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk Admin — Katoomba Greenpark</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css'])
</head>
<body class="min-h-screen bg-gradient-to-br from-[#0A2C45] via-[#0F3D5F] to-[#14233A] flex items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
    <div class="w-full max-w-md">
        <!-- Brand Header -->
        <div class="text-center mb-8">
            <a href="/" class="inline-flex items-center gap-2 text-white/90 hover:text-white mb-3 text-xs tracking-widest font-semibold uppercase transition">
                <span>← Kembali ke Website Publik</span>
            </a>
            <img src="/images/logo.png" alt="Logo Katoomba" class="h-16 w-auto mx-auto mb-4 bg-white rounded-xl p-2 shadow-2xl object-contain">
            <h1 class="text-2xl font-bold text-white tracking-tight">Katoomba CMS Admin</h1>
            <p class="text-sm text-slate-300 mt-1">Kelola konten dan informasi wisata Katoomba Greenpark</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/40">
            @if ($errors->any())
                <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <div class="font-semibold mb-1">Gagal Masuk:</div>
                    <ul class="list-disc list-inside space-y-0.5 text-xs">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @if (session('status'))
                <div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium">
                    {{ session('status') }}
                </div>
            @endif

            <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-5">
                @csrf

                <div>
                    <label for="email" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Alamat Email Admin
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value="{{ old('email', 'admin@katoomba.id') }}"
                        required
                        autofocus
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F3D5F] focus:border-transparent text-sm bg-slate-50/50 hover:bg-white transition"
                        placeholder="admin@katoomba.id"
                    >
                </div>

                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label for="password" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Kata Sandi
                        </label>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F3D5F] focus:border-transparent text-sm bg-slate-50/50 hover:bg-white transition"
                        placeholder="••••••••••••"
                    >
                </div>

                <div class="flex items-center justify-between pt-1">
                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="remember"
                            class="rounded border-slate-300 text-[#0F3D5F] focus:ring-[#0F3D5F]"
                        >
                        <span class="text-xs text-slate-600 font-medium">Ingat sesi saya</span>
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full py-3.5 px-4 bg-[#0F3D5F] hover:bg-[#0A2C45] text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-[#0F3D5F]/25 flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                    <span>Masuk ke Dashboard</span>
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </form>

            <div class="mt-6 pt-6 border-t border-slate-100 text-center">
                <div class="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span class="font-semibold text-slate-700">Kredensial Seeder Bawaan:</span><br>
                    Email: <code class="text-[#0F3D5F] font-bold">admin@katoomba.id</code><br>
                    Password: <code class="text-[#0F3D5F] font-bold">AdminKatoomba2025!</code>
                </div>
            </div>
        </div>

        <div class="text-center mt-6 text-xs text-white/50">
            &copy; {{ date('Y') }} Katoomba Greenpark • Protected Administration Panel
        </div>
    </div>
</body>
</html>

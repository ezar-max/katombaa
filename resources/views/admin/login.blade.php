<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin — Katoomba Greenpark</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css'])
</head>
<body class="min-h-screen bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif] relative">
    
    <!-- Background overlay simulating public landing page context -->
    <div class="fixed inset-0 -z-10 bg-cover bg-center opacity-30 filter blur-sm" style="background-image: url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80');"></div>

    <!-- Popup Modal Card - Matching Gunung Putri Design -->
    <div class="relative w-full max-w-[420px] bg-[#FAF8F5] rounded-3xl p-7 md:p-8 shadow-2xl border border-black/5 animate-in fade-in zoom-in-95 duration-150">
        <!-- Close Button returning to public home -->
        <a 
            href="/" 
            class="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
            aria-label="Kembali ke Beranda"
        >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </a>

        <!-- Title -->
        <h1 class="text-2xl font-bold text-[#1E3A5F] mb-6">
            Login Admin
        </h1>

        <!-- Brand context tag for accessibility & SEO -->
        <div class="sr-only">Katoomba Greenpark</div>

        <!-- Alert messages -->
        @if ($errors->any())
            <div class="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
            </div>
        @endif

        @if (session('status'))
            <div class="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                {{ session('status') }}
            </div>
        @endif

        <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-4">
            @csrf

            <div>
                <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value="{{ old('email', 'admin@katoomba.id') }}"
                    required
                    autofocus
                    class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent transition"
                    placeholder="admin@katoomba.id"
                >
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    class="w-full px-4 py-3 bg-[#F1F0F2] border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:bg-white focus:border-transparent transition"
                    placeholder="••••••••••••"
                >
            </div>

            <input type="hidden" name="remember" value="1">

            <div class="pt-2">
                <button
                    type="submit"
                    style="background-color: #1E3A5F; color: #ffffff;"
                    class="w-full py-3.5 px-6 rounded-full hover:opacity-90 font-semibold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                    <span>Masuk</span>
                    <span class="sr-only">Masuk ke Dashboard</span>
                </button>
            </div>

            <div class="text-center pt-2">
                <a 
                    href="javascript:void(0)" 
                    onclick="alert('Untuk pemulihan kata sandi, silakan hubungi super administrator sistem Katoomba Greenpark.');"
                    class="text-xs text-[#1E3A5F] hover:underline font-medium cursor-pointer"
                >
                    Lupa Password?
                </a>
            </div>
        </form>
    </div>
</body>
</html>

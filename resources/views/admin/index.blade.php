<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>CMS Admin Dashboard — Katoomba Greenpark</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/admin.jsx'])
</head>
<body class="bg-[#F4F5F7] text-[#14233A] antialiased selection:bg-[#0F3D5F] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
    <div id="admin-app">
        <!-- Loading State before React Hydrates -->
        <div class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <div class="w-12 h-12 border-4 border-[#0F3D5F]/20 border-t-[#0F3D5F] rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-sm font-medium text-slate-600">Memuat Dashboard Katoomba Greenpark...</p>
            </div>
        </div>
    </div>
</body>
</html>

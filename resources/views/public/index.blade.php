<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings['seo_title'] ?? 'Katoomba Greenpark — Wisata Rekreasi Keluarga di Gunung Putri Bogor' }}</title>
    <meta name="description" content="{{ $settings['seo_description'] ?? 'Taman wisata air dan edukasi keluarga seluas 3 hektar di Bojong Nangka, Gunung Putri, Bogor.' }}">
    <meta name="keywords" content="{{ $settings['seo_keywords'] ?? 'katoomba greenpark, wisata bogor, waterpark gunung putri' }}">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Metadata -->
    <meta property="og:title" content="{{ $settings['seo_title'] ?? 'Katoomba Greenpark' }}">
    <meta property="og:description" content="{{ $settings['seo_description'] ?? 'Taman rekreasi keluarga di Gunung Putri Bogor.' }}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ $sections['hero']->image_url ?? 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80' }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-white text-slate-800 antialiased selection:bg-[#0F3D5F] selection:text-white">
    <!-- Server Data Hydration -->
    <script>
        window.__INITIAL_DATA__ = {!! json_encode($initialData) !!};
        window.__CSRF_TOKEN__ = "{{ csrf_token() }}";
    </script>

    <!-- React Public App Mount Point -->
    <div id="public-app">
        <!-- Semantic Noscript / Initial HTML for Search Engines -->
        <noscript>
            <div class="p-8 max-w-4xl mx-auto">
                <h1 class="text-3xl font-bold text-[#0F3D5F] mb-4">{{ $settings['site_name'] ?? 'Katoomba Greenpark' }}</h1>
                <p class="text-lg text-slate-600 mb-6">{{ $settings['site_description'] ?? '' }}</p>
                <h2 class="text-2xl font-semibold mb-2">Lokasi & Alamat</h2>
                <p class="mb-4">{{ $settings['address'] ?? '' }}</p>
                <h2 class="text-2xl font-semibold mb-2">Jam Operasional</h2>
                <p class="mb-4">{{ $settings['operational_hours'] ?? '' }}</p>
                <h2 class="text-2xl font-semibold mb-2">Kontak WhatsApp</h2>
                <p>https://wa.me/{{ $settings['contact_whatsapp'] ?? '' }}</p>
            </div>
        </noscript>
    </div>
</body>
</html>

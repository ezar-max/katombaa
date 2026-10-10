<?php

namespace Database\Seeders;

use App\Models\Attraction;
use App\Models\Facility;
use App\Models\GalleryItem;
use App\Models\LandingSection;
use App\Models\SiteSetting;
use App\Models\TicketPrice;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class KatoombaDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@katoomba.id'],
            [
                'name' => 'Administrator Katoomba',
                'password' => Hash::make('AdminKatoomba2025!'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Global Site Settings
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'Katoomba Greenpark', 'group' => 'general', 'type' => 'text', 'description' => 'Nama resmi destinasi wisata'],
            ['key' => 'tagline', 'value' => 'Taman Rekreasi Air, Alam & Edukasi Keluarga di Bogor', 'group' => 'general', 'type' => 'text', 'description' => 'Slogan singkat destinasi'],
            ['key' => 'site_description', 'value' => 'Taman rekreasi keluarga seluas 3 hektar di Bojong Nangka, Gunung Putri, Bogor. Dilengkapi waterpark anak & dewasa, mini zoo edukatif, danau sepeda air, pemancingan, dan Phinisi Hall.', 'group' => 'general', 'type' => 'textarea', 'description' => 'Deskripsi ringkas profil destinasi'],
            ['key' => 'logo_text', 'value' => 'KATOOMBA', 'group' => 'general', 'type' => 'text', 'description' => 'Teks branding logo'],
            ['key' => 'logo_subtext', 'value' => 'GREENPARK BOGOR', 'group' => 'general', 'type' => 'text', 'description' => 'Subteks branding logo'],
            ['key' => 'accent_color', 'value' => '#059669', 'group' => 'appearance', 'type' => 'color', 'description' => 'Warna aksen tema (Emerald Green alam)'],

            // Contact & Location
            ['key' => 'contact_phone', 'value' => '(021) 867-0099', 'group' => 'contact', 'type' => 'text', 'description' => 'Nomor telepon kantor / pengelola'],
            ['key' => 'contact_whatsapp', 'value' => '6281283839900', 'group' => 'contact', 'type' => 'text', 'description' => 'Nomor WhatsApp resmi (format internasional)'],
            ['key' => 'contact_email', 'value' => 'info@katoombagreenpark.id', 'group' => 'contact', 'type' => 'text', 'description' => 'Email korespondensi resmi'],
            ['key' => 'address', 'value' => 'Jl. Raya Bojong Nangka, Bojong Nangka, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16963', 'group' => 'contact', 'type' => 'textarea', 'description' => 'Alamat lengkap destinasi'],
            ['key' => 'maps_url', 'value' => 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9', 'group' => 'contact', 'type' => 'text', 'description' => 'Tautan Google Maps destinasi'],
            ['key' => 'maps_embed_url', 'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.676128092211!2d106.9026123!3d-6.4365376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eac8ee6a6ed1%3A0xa5d3e1faf60d2437!2sKATOOMBA%20GREENPARK!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid', 'group' => 'contact', 'type' => 'textarea', 'description' => 'URL Embed iframe Google Maps'],
            ['key' => 'operational_hours', 'value' => 'Setiap Hari: 08.00 – 17.00 WIB', 'group' => 'contact', 'type' => 'text', 'description' => 'Jam buka operasional'],

            // Social Media
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/katoombagreenpark', 'group' => 'social', 'type' => 'text', 'description' => 'Akun Instagram'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/katoombagreenpark', 'group' => 'social', 'type' => 'text', 'description' => 'Laman Facebook'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/@katoombagreenpark', 'group' => 'social', 'type' => 'text', 'description' => 'Kanal YouTube'],

            // SEO
            ['key' => 'seo_title', 'value' => 'Katoomba Greenpark — Wisata Rekreasi Keluarga & Waterpark Gunung Putri Bogor', 'group' => 'seo', 'type' => 'text', 'description' => 'Meta Title SEO'],
            ['key' => 'seo_description', 'value' => 'Taman rekreasi keluarga seluas 3 hektar di Gunung Putri, Bogor. Wahana waterpark anak, mini zoo edukasi, danau sepeda bebek air, kolam pemancingan, dan Phinisi Hall.', 'group' => 'seo', 'type' => 'textarea', 'description' => 'Meta Description SEO'],
            ['key' => 'seo_keywords', 'value' => 'katoomba greenpark, katoomba green park, wisata bogor, waterpark gunung putri, kolam renang bojong nangka, wisata keluarga bogor', 'group' => 'seo', 'type' => 'text', 'description' => 'Kata kunci SEO'],
        ];

        foreach ($settings as $item) {
            SiteSetting::updateOrCreate(['key' => $item['key']], $item);
        }

        // 3. Landing Sections
        $sections = [
            [
                'section_key' => 'hero',
                'title' => 'Harmoni Wisata Air & Alam Asri untuk Seluruh Keluarga',
                'subtitle' => 'Destinasi Rekreasi Hijau 3 Hektar di Gunung Putri, Bogor',
                'badge' => 'Wisata Ramah Keluarga & Anak',
                'description' => 'Nikmati kesegaran wahana waterpark tematik, berinteraksi di mini zoo edukatif, santai mengayuh perahu bebek air di danau buatan, dan abadikan momen kebersamaan tak terlupakan di tengah suasana alam yang rindang.',
                'image_url' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80',
                'image_mobile_url' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
                'cta_text' => 'Informasi Kunjungan',
                'cta_url' => '#informasi-pengunjung',
                'secondary_cta_text' => 'Jelajahi Daya Tarik',
                'secondary_cta_url' => '#daya-tarik',
                'extra_data' => [
                    'stats' => [
                        ['label' => 'Luas Kawasan', 'value' => '± 3 Hektar'],
                        ['label' => 'Wahana & Fasilitas', 'value' => '10+ Pilihan'],
                        ['label' => 'Kapasitas Area', 'value' => '1.500+ Pengunjung'],
                        ['label' => 'Rating Google Maps', 'value' => '4.2 ★ (Ribuan Ulasan)'],
                    ],
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'section_key' => 'about',
                'title' => 'Oase Rekreasi Terpadu di Jantung Gunung Putri',
                'subtitle' => 'Tentang Katoomba Greenpark',
                'badge' => 'Konsep Eko-Rekreasi',
                'description' => 'Katoomba Greenpark menghadirkan ruang rekreasi keluarga yang memadukan keseruan wisata air modern dengan keteduhan ruang terbuka hijau. Berdiri di atas lahan seluas kurang lebih 3 hektar di Bojong Nangka, kawasan ini dirancang sebagai tempat istirahat dan petualangan yang aman, nyaman, dan edukatif bagi anak-anak maupun orang dewasa.',
                'image_url' => 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
                'cta_text' => 'Lihat Lokasi di Google Maps',
                'cta_url' => 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9',
                'secondary_cta_text' => null,
                'secondary_cta_url' => null,
                'extra_data' => [
                    'features' => [
                        'Kawasan asri nan teduh dengan ratusan pohon rindang penyejuk suasana',
                        'Kolam renang anak berstandar aman dengan pengawasan life guard bersiaga',
                        'Ruang terbuka hijau ideal untuk gathering sekolah, komunitas, dan reuni keluarga',
                        'Akses jalan strategis dan dekat dari kawasan pemukiman Gunung Putri dan Cibubur',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'section_key' => 'attractions',
                'title' => 'Daya Tarik & Wahana Pilihan',
                'subtitle' => 'Petualangan Seru untuk Segala Usia',
                'badge' => 'Aktivitas Wisata',
                'description' => 'Dari percikan kesegaran waterpark hingga ketenangan memancing di tepian danau, setiap sudut Katoomba Greenpark dirancang untuk menghadirkan senyuman bagi seluruh keluarga.',
                'image_url' => null,
                'cta_text' => null,
                'cta_url' => null,
                'extra_data' => null,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'section_key' => 'gallery',
                'title' => 'Galeri & Sudut Suasana Destinasi',
                'subtitle' => 'Potret Keceriaan di Katoomba Greenpark',
                'badge' => 'Dokumentasi Visual',
                'description' => 'Koleksi foto otentik keindahan alam, keceriaan wahana air, serta momen hangat kebersamaan para pengunjung di taman wisata kami.',
                'image_url' => null,
                'cta_text' => null,
                'cta_url' => null,
                'extra_data' => null,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'section_key' => 'visitor_info',
                'title' => 'Panduan & Informasi Kunjungan',
                'subtitle' => 'Semua yang Perlu Anda Ketahui Sebelum Tiba',
                'badge' => 'Info Praktis',
                'description' => 'Pastikan agenda rekreasi keluarga Anda berjalan lancar dengan menyimak informasi jam operasional, tarif tiket resmi, serta kelengkapan fasilitas yang kami sediakan.',
                'image_url' => null,
                'cta_text' => null,
                'cta_url' => null,
                'extra_data' => [
                    'tips' => [
                        'Disarankan membawa pakaian renang ganti dan handuk pribadi.',
                        'Disediakan loker penyimpanan aman untuk barang berharga Anda.',
                        'Tersedia saung dan gazebo teduh yang dapat digunakan bersantai.',
                        'Patuhi tata tertib kolam renang dan awasi anak-anak saat bermain air.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'section_key' => 'location',
                'title' => 'Lokasi & Rute Perjalanan',
                'subtitle' => 'Akses Mudah dan Strategis di Gunung Putri',
                'badge' => 'Petunjuk Arah',
                'description' => 'Katoomba Greenpark berada di Jl. Raya Bojong Nangka, sangat mudah dicapai baik menggunakan kendaraan pribadi maupun transportasi online dari berbagai penjuru Jabodetabek.',
                'image_url' => null,
                'cta_text' => 'Buka Rute di Google Maps',
                'cta_url' => 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9',
                'extra_data' => [
                    'access_routes' => [
                        'Dari Tol Jagorawi: Keluar di Gerbang Tol Gunung Putri atau Cibubur, lalu lanjutkan ke arah Jl. Raya Bojong Nangka (± 15-20 menit).',
                        'Dari Cileungsi / Cibubur: Menuju arah Jl. Mercedes Benz / Bojong Nangka, ikuti penunjuk jalan ke Katoomba Greenpark.',
                        'Dari Stasiun LRT Harjamukti: Dapat melanjutkan perjalanan menggunakan taksi atau ojek online (± 25 menit).',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'section_key' => 'cta',
                'title' => 'Jadwalkan Liburan Keluarga Penuh Senyum Akhir Pekan Ini',
                'subtitle' => 'Katoomba Greenpark Menanti Kehadiran Anda',
                'badge' => 'Mari Berkunjung',
                'description' => 'Ciptakan kenangan indah bersama keluarga, teman sekolah, atau rekan kerja di taman rekreasi air dan alam paling asri di Gunung Putri, Bogor.',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
                'cta_text' => 'Buka Google Maps',
                'cta_url' => 'https://maps.app.goo.gl/MPwufWpXvf7MrVZM9',
                'secondary_cta_text' => 'Chat WhatsApp Pengelola',
                'secondary_cta_url' => 'https://wa.me/6281283839900',
                'extra_data' => null,
                'is_active' => true,
                'sort_order' => 7,
            ],
        ];

        foreach ($sections as $section) {
            LandingSection::updateOrCreate(['section_key' => $section['section_key']], $section);
        }

        // 4. Attractions (Verified from Katoomba Greenpark info)
        $attractions = [
            [
                'title' => 'Waterpark & Kolam Anak Tematik',
                'slug' => 'waterpark-kolam-anak-tematik',
                'category' => 'Wahana Air',
                'summary' => 'Kolam rekreasi air ceria dengan seluncuran spiral, perosotan mini, dan ember tumpah raksasa.',
                'description' => 'Area utama favorit anak-anak dengan kedalaman air yang dirancang ramah dan aman (sekitar 40-70 cm). Dilengkapi wahana ember tumpah yang menyiramkan kesegaran air setiap beberapa menit, seluncuran melingkar, dan semprotan air air mancur yang memicu tawa riang si kecil.',
                'image_url' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
                'alt_text' => 'Wahana kolam renang anak dan waterpark Katoomba Greenpark',
                'icon' => 'Waves',
                'highlights' => ['Ember Tumpah Raksasa', 'Seluncuran Spiral & Mini', 'Kedalaman Ramah Balita', 'Pengawasan Life Guard'],
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Kolam Renang Semi-Olimpik Dewasa',
                'slug' => 'kolam-renang-dewasa',
                'category' => 'Wahana Air',
                'summary' => 'Kolam renang berukuran luas dengan air jernih segar untuk berenang santai maupun olahraga.',
                'description' => 'Didedikasikan bagi pengunjung dewasa dan remaja yang ingin berenang dengan leluasa. Memiliki kedalaman yang memadai dengan kualitas air yang terjaga kebersihannya serta dikelilingi pepohonan teduh untuk kenyamanan bersantai di tepi kolam.',
                'image_url' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
                'alt_text' => 'Kolam renang dewasa semi olimpik di Katoomba Greenpark',
                'icon' => 'Activity',
                'highlights' => ['Kedalaman 1.2 - 1.6 Meter', 'Air Terawat & Jernih', 'Tepi Kolam Santai', 'Pemandangan Hijau'],
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Danau Rekreasi & Sepeda Bebek Air',
                'slug' => 'danau-sepeda-bebek-air',
                'category' => 'Danau & Alam',
                'summary' => 'Danau buatan yang tenang di mana pengunjung dapat mengayuh perahu bebek air mengelilingi perairan asri.',
                'description' => 'Nikmati sensasi mengapung di danau buatan dengan sepeda air berbentuk bebek. Dikelilingi lanskap pepohonan hijau yang sejuk, wahana ini menjadi tempat favorit bagi orang tua dan anak untuk saling mengobrol dan menikmati semilir angin sejuk.',
                'image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                'alt_text' => 'Danau buatan dan sepeda air bebek Katoomba Greenpark',
                'icon' => 'Compass',
                'highlights' => ['Perahu Sepeda Bebek Air', 'Danau Tenang & Asri', 'Romantis & Santai', 'Dilengkapi Pelampung'],
                'is_published' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Mini Zoo Edukasi Satwa',
                'slug' => 'mini-zoo-edukasi-satwa',
                'category' => 'Edukasi & Satwa',
                'summary' => 'Kebun binatang mini tempat anak-anak mengenal dan berinteraksi langsung dengan aneka satwa jinak.',
                'description' => 'Sarana belajar luar ruangan yang menyenangkan. Pengunjung cilik dapat melihat dari dekat dan memberi pakan hewan-hewan lucu seperti kelinci, rusa tutul, kura-kura, dan aneka unggas unik di habitat mini yang terawat.',
                'image_url' => 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80',
                'alt_text' => 'Area mini zoo dan satwa ramah anak di Katoomba Greenpark',
                'icon' => 'Heart',
                'highlights' => ['Memberi Makan Kelinci & Rusa', 'Edukasi Sayang Satwa', 'Kandang Bersih & Aman', 'Interaktif untuk Balita'],
                'is_published' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Kolam Pemancingan Keluarga',
                'slug' => 'kolam-pemancingan-keluarga',
                'category' => 'Hobi & Relaksasi',
                'summary' => 'Area pemancingan air tawar yang luas dan teduh, tempat ideal menyalurkan hobi di akhir pekan.',
                'description' => 'Area kolam pemancingan yang luas dinaungi pepohonan rindang. Cocok untuk melepas penat di akhir pekan sambil melatih kesabaran bersama keluarga. Pengunjung dapat menyewa peralatan pancing atau membawa perlengkapan sendiri.',
                'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                'alt_text' => 'Spot kolam pemancingan ikan di Katoomba Greenpark',
                'icon' => 'Anchor',
                'highlights' => ['Kolam Teduh & Luas', 'Ikan Air Tawar Segar', 'Sewa Alat Pancing', 'Suasana Tenang'],
                'is_published' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Phinisi Function Hall & Event Space',
                'slug' => 'phinisi-function-hall',
                'category' => 'Fasilitas & Event',
                'summary' => 'Gedung serbaguna ikonik berdesain kapal Phinisi untuk pernikahan, perpisahan sekolah, dan gathering.',
                'description' => 'Gedung megah ikonik bergaya kapal tradisional Phinisi yang siap menampung ratusan hingga ribuan tamu undangan. Menjadi lokasi favorit untuk resepsi pernikahan bernuansa alam, seminar organisasi, gathering instansi, dan perpisahan sekolah.',
                'image_url' => 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
                'alt_text' => 'Gedung serbaguna Phinisi Function Hall di Katoomba Greenpark',
                'icon' => 'Building',
                'highlights' => ['Desain Unik Kapal Phinisi', 'Kapasitas s.d 1.000 Tamu', 'Paket Pernikahan & Gathering', 'Fasilitas Audio & Panggung'],
                'is_published' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($attractions as $attraction) {
            Attraction::updateOrCreate(['slug' => $attraction['slug']], $attraction);
        }

        // 5. Gallery Items
        $gallery = [
            [
                'title' => 'Keceriaan Seluncuran Waterpark',
                'caption' => 'Anak-anak menikmati wahana seluncuran dan ember tumpah di kolam rekreasi air.',
                'category' => 'Wahana Air',
                'image_url' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
                'alt_text' => 'Waterpark anak di Katoomba Greenpark',
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Panorama Danau Hijau & Pepohonan',
                'caption' => 'Pemandangan danau rekreasi dengan latar dedaunan rindang dan udara sejuk.',
                'category' => 'Danau & Alam',
                'image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
                'alt_text' => 'Danau asri Katoomba Greenpark Bogor',
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Interaksi Hangat di Mini Zoo',
                'caption' => 'Memberi makan satwa jinak menjadi momen edukasi favorit bagi buah hati.',
                'category' => 'Mini Zoo',
                'image_url' => 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1000&q=80',
                'alt_text' => 'Satwa jinak di mini zoo Katoomba Greenpark',
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Gedung Phinisi yang Megah',
                'caption' => 'Ikon Phinisi Function Hall yang megah siap menyambut berbagai event akbar.',
                'category' => 'Event & Gedung',
                'image_url' => 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
                'alt_text' => 'Phinisi Hall Katoomba Greenpark',
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Kolam Renang Semi-Olimpik',
                'caption' => 'Kawasan kolam renang dewasa yang terawat bersih dan nyaman untuk berolahraga.',
                'category' => 'Wahana Air',
                'image_url' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
                'alt_text' => 'Kolam renang dewasa Katoomba Greenpark',
                'is_published' => true,
                'is_featured' => false,
                'sort_order' => 5,
            ],
            [
                'title' => 'Taman Bersantai & Gazebo Teduh',
                'caption' => 'Rerumputan hijau dan gazebo teduh untuk berkumpul dan piknik bersama keluarga.',
                'category' => 'Danau & Alam',
                'image_url' => 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1000&q=80',
                'alt_text' => 'Gazebo dan taman hijau Katoomba Greenpark',
                'is_published' => true,
                'is_featured' => false,
                'sort_order' => 6,
            ],
        ];

        foreach ($gallery as $item) {
            GalleryItem::updateOrCreate(['title' => $item['title']], $item);
        }

        // 6. Ticket Prices
        $tickets = [
            [
                'name' => 'Tiket Masuk Reguler (Hari Kerja)',
                'price' => 35000,
                'price_formatted' => 'Rp 35.000',
                'days_valid' => 'Senin – Jumat (Weekday)',
                'note' => 'Sudah termasuk akses seluruh kolam renang waterpark, kolam dewasa, dan area mini zoo edukatif.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Tiket Masuk Akhir Pekan & Hari Libur',
                'price' => 40000,
                'price_formatted' => 'Rp 40.000',
                'days_valid' => 'Sabtu, Minggu & Hari Libur Nasional',
                'note' => 'Sudah termasuk akses seluruh kolam renang waterpark, ember tumpah, dan jelajah area hijau mini zoo.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Balita (Tinggi Badan < 80 cm)',
                'price' => 0,
                'price_formatted' => 'Gratis',
                'days_valid' => 'Setiap Hari',
                'note' => 'Bebas biaya tiket masuk untuk balita dengan tinggi badan di bawah 80 cm (didampingi orang tua).',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($tickets as $ticket) {
            TicketPrice::updateOrCreate(['name' => $ticket['name']], $ticket);
        }

        // 7. Facilities
        $facilities = [
            ['name' => 'Gazebo & Saung Keluarga', 'category' => 'Kenyamanan', 'icon' => 'Home', 'description' => 'Tersedia saung-saung kayu teduh untuk istirahat dan makan bersama di samping kolam.', 'is_active' => true, 'sort_order' => 1],
            ['name' => 'Kafe & Kantin Kuliner', 'category' => 'Kuliner', 'icon' => 'Utensils', 'description' => 'Pilihan makanan, jajanan hangat, kelapa muda, dan aneka minuman segar terjangkau.', 'is_active' => true, 'sort_order' => 2],
            ['name' => 'Kamar Bilas & Ruang Ganti', 'category' => 'Kebersihan', 'icon' => 'ShowerHead', 'description' => 'Kamar mandi bilas bersih terpisah pria dan wanita dengan pasokan air lancar.', 'is_active' => true, 'sort_order' => 3],
            ['name' => 'Loker Penitipan Barang', 'category' => 'Keamanan', 'icon' => 'Lock', 'description' => 'Fasilitas loker aman untuk menyimpan barang bawaan Anda selama berenang.', 'is_active' => true, 'sort_order' => 4],
            ['name' => 'Mushola Bersih & Nyaman', 'category' => 'Ibadah', 'icon' => 'Building2', 'description' => 'Tempat ibadah yang tenang, terawat, dan dilengkapi sarana wudhu yang memadai.', 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Area Parkir Luas', 'category' => 'Aksesibilitas', 'icon' => 'Car', 'description' => 'Lahan parkir memadai untuk bus pariwisata besar, mobil pribadi, dan sepeda motor.', 'is_active' => true, 'sort_order' => 6],
            ['name' => 'Ruang P3K & Ruang Laktasi', 'category' => 'Kesehatan', 'icon' => 'HeartPulse', 'description' => 'Fasilitas pertolongan pertama serta ruang privat yang nyaman bagi ibu menyusui.', 'is_active' => true, 'sort_order' => 7],
            ['name' => 'Life Guard Bersiaga', 'category' => 'Keamanan', 'icon' => 'ShieldCheck', 'description' => 'Petugas penyelamat kolam terlatih yang siap mengawasi keamanan pengunjung.', 'is_active' => true, 'sort_order' => 8],
        ];

        foreach ($facilities as $facility) {
            Facility::updateOrCreate(['name' => $facility['name']], $facility);
        }
    }
}

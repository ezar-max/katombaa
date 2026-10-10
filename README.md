# Katoomba Greenpark — Website Promosi Destinasi Wisata & CMS Admin Dashboard

Website promosi destinasi wisata modern terpadu dan dashboard Content Management System (CMS) untuk **Katoomba Greenpark** (Bojong Nangka, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat).

Aplikasi dibangun menggunakan arsitektur **Laravel 12 (PHP 8.3)** sebagai backend API, authentication provider, dan SSR host layout, dipadukan dengan **React 19**, **Tailwind CSS 4**, dan **Vite 8** untuk frontend landing page dan dashboard admin single page application (SPA).

---

## 🌟 Referensi & Desain Sistem

- **Lokasi Nyata Destinasi:** [Google Maps — Katoomba Greenpark](https://maps.app.goo.gl/MPwufWpXvf7MrVZM9) (Jl. Raya Bojong Nangka, Kec. Gunung Putri, Bogor, Jawa Barat 16963)
- **Inspirasi UI/UX:** [Gunung Putri Square](https://www.gunungputri.co.id/)
- **Desain Visual:**
  - Warna Utama: Navy Blue (`#0F3D5F`), Deep Blue (`#0A2C45`), Soft Blue (`#1E5683`)
  - Aksen Alam: Emerald Green (`#059669` / `#10B981`)
  - Latar Belakang & Netral: Clean Grey (`#F4F5F7`), Slate Grey (`#E7EAEF`), Ink Slate (`#14233A`)
  - Tipografi: **Plus Jakarta Sans** (Google Fonts)
  - Desain Elemen: Pill navigation bars, glassmorphic floating headers, rounded cards, editorial gallery grids, micro-interactions halus.

---

## 🚀 Fitur Utama

### 1. Public Landing Page (React 19 SPA)
- **Hero Section:** Headline visual imersif, background gambar berkualitas tinggi dengan deep blue gradient overlay, quick highlights bar, tombol CTA arah rute & informasi tiket.
- **Tentang Kami (About Section):** Narasi destinasi seluas ± 3 hektar, fasilitas unggulan, nilai edukasi alam, dan komitmen kebersihan.
- **Wahana & Atraksi (Attractions Section):** Daftar wahana unggulan terverifikasi (Waterpark anak dengan perosotan spiral & ember tumpah, Kolam semi-olimpik dewasa, Danau rekreasi sepeda bebek kayuh, Mini Zoo satwa jinak, Kolam pemancingan air tawar, dan Phinisi Function Hall).
- **Galeri Foto Editorial (Gallery Section):** Grid galeri asimetris berstandar editorial dengan filter kategori dinamis (*Semua, Wahana Air, Danau & Alam, Mini Zoo, Event & Gedung*) dan Lightbox interaktif layar penuh dengan navigasi keyboard.
- **Informasi Kunjungan & Tiket (Visitor Info):** Struktur tiket akurat (Weekday Rp 35.000, Weekend & Libur Nasional Rp 40.000, Balita <80cm Gratis), jam buka operasional (08.00–17.00 WIB), panduan tips berkunjung, serta grid fasilitas penunjang.
- **Lokasi & Panduan Rute (Location Section):** Embed Google Maps interaktif terverifikasi, alamat fisik lengkap, tautan langsung ke aplikasi Google Maps, dan panduan rute transportasi (Tol Jagorawi exit Gn. Putri/Cimanggis, KRL Stasiun Nambo/Cibinong, angkutan umum).
- **Call-to-Action (CTA) & Footer:** Quick WhatsApp contact link, media sosial resmi, sitemap navigasi, dan hak cipta.
- **SSR Hydration & SEO Ready:** Injeksi data dari database langsung ke HTML awal melalui `window.__INITIAL_DATA__`, meta tag Open Graph lengkap, dan noscript fallback untuk bot mesin pencari.
- **Live Preview Mode:** Mendukung pratinjau live perubahan draft via query `?preview=true` dengan notifikasi banner khusus admin.

### 2. Admin Authentication & Security
- Halaman login terproteksi di `/admin/login` dengan styling Gunung Putri yang elegan.
- Session-based Laravel authentication dengan rate-limiting (proteksi brute force).
- Regenerasi session ID saat login sukses untuk mencegah *session fixation attack*.
- Proteksi CSRF penuh via header `X-CSRF-TOKEN` pada semua request API Axios/Fetch.
- Audit Activity Logging yang mencatat setiap aksi penambahan, pembaruan, dan penghapusan data oleh administrator.

### 3. CMS Admin Dashboard (React SPA)
- **Ringkasan (Overview):** Metrik statistik jumlah wahana, galeri, seksi landing page, tiket, fasilitas, serta timeline aktivitas log terbaru.
- **Pengaturan Situs (Settings):** Nama destinasi, tagline, logo branding, nomor telepon kantor, nomor WhatsApp resmi, email korespondensi.
- **Hero Section:** Pengelolaan judul utama, subjudul, teks tombol aksi, URL target, dan gambar banner desktop & mobile.
- **Tentang Kami:** Pengelolaan narasi profil, sorotan statistik (luas area, kapasitas), dan gambar ilustrasi.
- **Wahana & Atraksi (CRUD):** Tambah, edit, hapus, atur urutan tampilan (*reorder*), dan switch aktif/draft wahana.
- **Galeri Foto (CRUD):** Tambah foto baru, edit takarir (caption), ganti kategori, toggle featured item, dan hapus foto.
- **Tiket & Fasilitas:** Pengelolaan tarif tiket (harga nominal, label hari, ketentuan) dan daftar fasilitas pengunjung lengkap dengan pemilih ikon (*icon selector*).
- **Lokasi & Peta:** Pengaturan alamat fisik, shortlink Google Maps, URL iframe embed peta dengan pratinjau interaktif langsung (*live embed preview*).
- **SEO & Media Sosial:** Pengaturan meta title, meta description, keywords, Open Graph image URL dengan pratinjau kartu Google SERP dan simulasi kartu share WhatsApp/Facebook.
- **Profil Admin:** Pembaruan nama pengguna, email, dan penggantian kata sandi dengan verifikasi password lama.
- **Multi-Device Live Preview Modal:** Modal pratinjau interaktif tanpa meninggalkan dashboard dengan simulator tampilan Desktop, Tablet, dan Smartphone.

---

## 🔑 Kredensial Akun Administrator

- **URL Login:** `/admin/login`
- **Email:** `admin@katoomba.id`
- **Password:** `AdminKatoomba2025!`

---

## 🛠️ Stack Teknologi

| Komponen | Teknologi |
|---|---|
| **Backend Framework** | Laravel 12.x (PHP 8.3+) |
| **Frontend Framework** | React 19.x, React DOM 19.x |
| **Styling & CSS** | Tailwind CSS 4.x, Vanilla CSS (`app.css`) |
| **Icon Library** | Lucide React (`lucide-react`) + SVG Social Icons |
| **Build Tool** | Vite 8.x + `@tailwindcss/vite` + `@vitejs/plugin-react` |
| **Database** | SQLite (`database.sqlite`) |
| **Testing** | PHPUnit 11.x, Laravel Testing Suite (18 tests, 69 assertions, 100% pass) |
| **Code Style** | Laravel Pint (`vendor/bin/pint`) |

---

## 💻 Panduan Instalasi & Menjalankan Project

### 1. Clone & Masuk Direktori Project
```bash
git clone <repository_url>
cd katomba
```

### 2. Install Dependency PHP & JavaScript
```bash
composer install
npm install
```

### 3. Konfigurasi Environment File
Salin file `.env.example` ke `.env` (jika belum ada):
```bash
cp .env.example .env
php artisan key:generate
```

Pastikan konfigurasi database di `.env` mengarah ke SQLite:
```env
DB_CONNECTION=sqlite
```

### 4. Buat Symlink Storage Media
```bash
php artisan storage:link
```

### 5. Jalankan Migrasi & Seeder Data Otentik
```bash
php artisan migrate:fresh --seed
```
*Seeder akan membuat akun admin `admin@katoomba.id` dan seluruh konten otentik Katoomba Greenpark.*

### 6. Build atau Jalankan Frontend Asset
Untuk mode pengembangan (*Hot Module Replacement*):
```bash
npm run dev
```

Untuk mode produksi bundle:
```bash
npm run build
```

### 7. Jalankan Server Lokal Laravel
```bash
php artisan serve
```
Buka browser pada:
- **Landing Page Publik:** `http://localhost:8000/`
- **Dashboard CMS Admin:** `http://localhost:8000/admin` (atau `/admin/login`)

---

## 🧪 Menjalankan Pengujian Otomatis (Automated Tests)

Semua fungsionalitas publik dan admin telah dilindungi oleh automated feature tests:
```bash
php artisan test --compact
```
Hasil:
```json
{"tool":"phpunit","result":"passed","tests":18,"passed":18,"assertions":69}
```

Format kode sesuai standar Laravel Pint:
```bash
vendor/bin/pint --format agent
```

---

## 📄 Lisensi
Project ini dikembangkan sebagai portal promosi pariwisata berstandar enterprise berlisensi **MIT**.

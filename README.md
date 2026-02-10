# Mangrove Nusantara

Platform kolaboratif untuk mendokumentasikan dan berbagi praktik restorasi mangrove di Indonesia menggunakan Nuxt.js dan Leaflet.

## Fitur Utama

### Layout
- **Header**: Logo dan navigasi menu lengkap (Beranda, Praktik Baik, Ruang Narasi, Peta Mangrove, Komunitas, Data & Insight)
- **Body**: Konten halaman yang responsif
- **Footer**: Informasi kontak, tautan cepat, dan sosial media

### Halaman Beranda (/)
1. **Hero Section** - Ringkasan visi platform
2. **Peta Interaktif** dengan:
   - Marker lokasi praktik restorasi mangrove
   - Filter berdasarkan provinsi dan status
   - Modal card saat marker diklik
3. **Highlight Ruang Narasi** - 3 post pilihan terbaik
4. **CTA Section** - 3 tombol call-to-action:
   - Bagikan Ceritamu
   - Lihat Praktik Baik
   - Jelajahi Peta Mangrove

### Halaman Praktik Baik (/praktik-baik)
- Database praktik restorasi mangrove dalam bentuk card grid
- Setiap card menampilkan:
  - Judul kegiatan
  - Pelaku (peran perempuan)
  - Lokasi lengkap
  - Ringkasan singkat
  - Tahun dan status
- Fitur filter dan pencarian
- Klik card untuk ke halaman detail

### Halaman Detail Praktik (/detail/[id])
1. **Identitas Praktik**
   - Nama praktik
   - Lokasi (GPS + Administrasi)
   - Tahun pelaksanaan
   - Status (Berjalan/Selesai)

2. **Peran Perempuan**
   - Inisiator
   - Pemimpin Komunitas
   - Pelaksana Lapangan

3. **Deskripsi Praktik** - Detail lengkap program
4. **Dampak** - Hasil positif yang dicapai
5. **Media Pendukung**
   - Galeri foto
   - Video dokumentasi
   - File audio
   - Dokumen pendukung (PDF)

### Halaman Ruang Narasi (/ruang-narasi)
- Kumpulan User Generated Content (UGC)
- Card menampilkan:
  - Judul narasi
  - Penulis dan peran
  - Ringkasan singkat
  - Tipe media (video/audio/artikel/gambar)
  - Lokasi dan tanggal
  - Tags
- Filter berdasarkan media type dan tags
- Pencarian narasi

### Halaman Detail Narasi (/ruang-narasi/[id])
- Konten lengkap narasi
- Media player (video/audio)
- Informasi penulis
- Tags
- Narasi terkait

### Halaman Peta Mangrove (/peta-mangrove)
- Peta fullscreen dengan filter
- Interaktif dengan marker dan tooltip

### Halaman Komunitas & Data Insight
- Placeholder page (Coming Soon)
- Deskripsi fitur yang akan datang

## Tech Stack

- **Framework**: Nuxt.js 4.3.1
- **UI Framework**: Vue.js 3.5.28
- **Styling**: Tailwind CSS 6.14.0
- **Maps**: Leaflet 1.9.4
- **Language**: TypeScript

## Instalasi

### Prerequisites
- Node.js versi 22.x (direkomendasikan)
- npm atau yarn
- fnm (untuk manajemen versi Node.js)

### Langkah Instalasi

1. Pastikan menggunakan Node.js v22:
```bash
fnm use v22
```

2. Masuk ke direktori proyek:
```bash
cd mangrove-map
```

3. Install dependensi:
```bash
npm install
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser dan akses:
```
http://localhost:3000
```

## Struktur Proyek

```
mangrove-map/
├── assets/
│   └── css/
│       └── main.css              # Global CSS
├── components/
│   ├── Header.vue                # Header dengan navbar
│   ├── Footer.vue                # Footer dengan info kontak
│   ├── MangroveMap.vue           # Komponen peta (deprecated)
│   └── MapWithFilters.vue        # Peta dengan filter lokasi & status
├── data/
│   ├── mangrove-practices.ts     # Data praktik restorasi (5 data)
│   └── narasi-posts.ts           # Data ruang narasi (8 data)
├── pages/
│   ├── index.vue                 # Halaman beranda (4 section)
│   ├── praktik-baik.vue          # Database praktik baik
│   ├── peta-mangrove.vue         # Peta fullscreen
│   ├── komunitas.vue             # Placeholder komunitas
│   ├── data-insight.vue          # Placeholder data & insight
│   ├── ruang-narasi/
│   │   ├── index.vue             # List narasi
│   │   └── [id].vue              # Detail narasi
│   └── detail/
│       └── [id].vue              # Detail praktik
├── public/
│   └── images/                   # Folder untuk gambar statis
├── app.vue                       # Root component dengan layout
├── nuxt.config.ts                # Konfigurasi Nuxt
├── tailwind.config.js            # Konfigurasi Tailwind CSS
├── tsconfig.json                 # TypeScript config
└── package.json
```

## Scripts

### Development
- `npm run dev` - Menjalankan development server dengan hot reload
  - Akses: `http://localhost:3000`

### Production Build & Testing
- `npm run generate` - Generate static site ke `.output/public/`
- `npm run preview` - Preview production build dengan web server lokal
  - Akses: `http://localhost:4173/mangrove-map/`
  - **PENTING**: Gunakan ini untuk testing, JANGAN buka file HTML langsung

### Deployment
- `git push` - Deploy otomatis via GitHub Actions ke GitHub Pages
- `npm run deploy` - Deploy manual ke GitHub Pages (opsional)

### ⚠️ Testing Production Build: Do's and Don'ts

**✅ BENAR - Gunakan Web Server:**
```bash
npm run generate    # Build static files
npm run preview     # Preview dengan web server
```

**❌ SALAH - Jangan Buka File Langsung:**
```bash
# JANGAN buka .output/public/index.html langsung di browser
# Ini akan menyebabkan "MIME type tidak diizinkan" error
```

**Kenapa?**
- Browser memblokir JavaScript modules dari `file://` protocol
- Static site memerlukan HTTP server untuk serve files dengan benar
- Lihat [TROUBLESHOOTING.md](TROUBLESHOOTING.md#1-error-mime-type-tidak-diizinkan-saat-membuka-file-lokal) untuk detail

## Deployment ke GitHub Pages

Website ini sudah dikonfigurasi untuk deployment otomatis ke GitHub Pages menggunakan GitHub Actions.

### Quick Start Deployment

1. **Push ke GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/mangrove-map.git
git push -u origin main
```

2. **Aktifkan GitHub Pages:**
   - Buka Settings → Pages di repository GitHub
   - Source: pilih **GitHub Actions**

3. **Akses Website:**
   - URL: `https://username.github.io/mangrove-map/`
   - Deployment otomatis setiap push ke branch main

### Dokumentasi Lengkap

Lihat [DEPLOYMENT.md](DEPLOYMENT.md) untuk:
- Panduan lengkap deployment
- Setup custom domain
- Troubleshooting
- Deploy manual
- Environment variables

### File Konfigurasi Deployment

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `nuxt.config.ts` - Konfigurasi baseURL untuk GitHub Pages
- `public/.nojekyll` - Disable Jekyll processing

## Data

### Praktik Restorasi Mangrove
File: `data/mangrove-practices.ts`

5 data praktik di berbagai lokasi:
- Brebes, Jawa Tengah
- Jakarta Utara, DKI Jakarta
- Surabaya, Jawa Timur
- Tarakan, Kalimantan Utara
- Aceh Besar, Aceh

### Ruang Narasi
File: `data/narasi-posts.ts`

8 narasi dengan berbagai tipe media:
- Video (3 post)
- Audio (2 post)
- Gambar (3 post)

## Fitur Filter

### Peta dengan Filter
- Filter berdasarkan Provinsi
- Filter berdasarkan Status (Berjalan/Selesai)
- Counter jumlah praktik yang ditampilkan
- Reset filter

### Halaman Praktik Baik
- Pencarian berdasarkan judul, lokasi, ringkasan
- Filter provinsi
- Filter status
- Counter hasil pencarian

### Halaman Ruang Narasi
- Pencarian berdasarkan judul, deskripsi, penulis
- Filter tipe media (Video/Audio/Artikel/Gambar)
- Filter berdasarkan tags
- Counter hasil pencarian

## Kustomisasi

### Menambah Data Praktik Baru
Edit file `data/mangrove-practices.ts` dan tambahkan objek praktik baru.

### Menambah Narasi Baru
Edit file `data/narasi-posts.ts` dan tambahkan objek narasi baru.

### Styling
- Edit `tailwind.config.js` untuk kustomisasi tema
- Edit `assets/css/main.css` untuk global styles
- Gunakan utility classes Tailwind di komponen Vue

### Mengubah Logo
Edit komponen `components/Header.vue` bagian logo SVG atau ganti dengan gambar.

## Deployment

### Static Site Generation
```bash
npm run generate
```

File hasil generate di `.output/public/` dapat di-deploy ke:
- Netlify
- Vercel
- GitHub Pages
- Hosting static file lainnya

### Server-Side Rendering
```bash
npm run build
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Roadmap

Fitur yang akan dikembangkan:
- [ ] Halaman Komunitas (direktori, forum, kalender event)
- [ ] Halaman Data & Insight (dashboard, statistik, analisis)
- [ ] Form untuk submit praktik baru
- [ ] Form untuk submit narasi baru
- [ ] User authentication
- [ ] Admin panel
- [ ] Integrasi media player sebenarnya
- [ ] Export data ke CSV/Excel
- [ ] Multi-language support

## Kontribusi

Untuk menambahkan data atau fitur:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

ISC

## Kontak

Untuk pertanyaan atau saran:
- Email: info@mangrovenusantara.org
- Website: https://mangrovenusantara.org (placeholder)

---

Dibuat dengan ❤️ untuk konservasi mangrove Indonesia

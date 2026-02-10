# Panduan Deploy ke GitHub Pages

Panduan lengkap untuk deploy website Mangrove Nusantara ke GitHub Pages.

## Prerequisites

- Akun GitHub
- Git terinstall di komputer
- Repository GitHub (buat jika belum ada)

## Langkah-Langkah Deployment

### 1. Inisialisasi Git Repository (jika belum)

```bash
cd mangrove-map
git init
git add .
git commit -m "Initial commit: Mangrove Nusantara website"
```

### 2. Buat Repository di GitHub

1. Buka https://github.com/new
2. Beri nama repository: `mangrove-map` (atau nama lain yang Anda inginkan)
3. **Jangan** centang "Initialize with README" (karena sudah ada di lokal)
4. Klik "Create repository"

### 3. Link Repository Lokal ke GitHub

Ganti `username` dengan username GitHub Anda:

```bash
git remote add origin https://github.com/username/mangrove-map.git
git branch -M main
git push -u origin main
```

### 4. Aktifkan GitHub Pages

1. Buka repository di GitHub
2. Klik tab **Settings**
3. Scroll ke bagian **Pages** (di menu sebelah kiri)
4. Pada **Source**, pilih **GitHub Actions**
5. Klik **Save**

### 5. Deployment Otomatis

GitHub Actions akan otomatis men-deploy website setiap kali ada push ke branch `main`.

**Cara kerja:**
- Setiap push ke branch `main` akan trigger workflow
- Workflow akan build proyek dengan `npm run generate`
- Hasil build akan di-deploy ke GitHub Pages
- Website bisa diakses di: `https://username.github.io/mangrove-map/`

### 6. Cek Status Deployment

1. Buka tab **Actions** di repository GitHub
2. Lihat workflow "Deploy to GitHub Pages"
3. Tunggu sampai selesai (hijau ✓)
4. Akses website di URL GitHub Pages

## URL Website

Setelah deployment berhasil, website dapat diakses di:

```
https://username.github.io/mangrove-map/
```

Ganti `username` dengan username GitHub Anda.

## Custom Domain (Opsional)

Jika ingin menggunakan custom domain:

### 1. Buat file CNAME

```bash
echo "yourdomain.com" > public/CNAME
```

### 2. Setting DNS

Di provider domain Anda, tambahkan record:

**Untuk subdomain (www atau lainnya):**
```
Type: CNAME
Name: www (atau subdomain lain)
Value: username.github.io
```

**Untuk apex domain (tanpa www):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. Update Nuxt Config

Edit `nuxt.config.ts`:

```typescript
app: {
  baseURL: '/', // Ubah dari '/mangrove-map/' ke '/'
  // ...
}
```

### 4. Aktifkan Custom Domain di GitHub

1. Settings → Pages
2. Masukkan domain di "Custom domain"
3. Klik "Save"
4. Tunggu DNS check selesai
5. Centang "Enforce HTTPS"

## Deploy Manual (Alternatif)

Jika ingin deploy manual tanpa GitHub Actions:

### 1. Install gh-pages

```bash
npm install gh-pages --save-dev
```

### 2. Generate dan Deploy

```bash
npm run deploy
```

Script ini akan:
1. Generate static files (`npm run generate`)
2. Push folder `.output/public` ke branch `gh-pages`

### 3. Setting GitHub Pages

- Settings → Pages
- Source: Deploy from branch `gh-pages`
- Folder: `/ (root)`

## Update Website

Setiap kali ingin update website:

```bash
git add .
git commit -m "Deskripsi perubahan"
git push
```

GitHub Actions akan otomatis deploy ulang.

## Troubleshooting

### Problem: 404 saat membuka halaman

**Solusi:**
1. Pastikan `baseURL` di `nuxt.config.ts` sudah benar
2. Pastikan file `.nojekyll` ada di folder `public/`
3. Cek di Settings → Pages apakah source sudah benar

### Problem: CSS/JS tidak load

**Solusi:**
1. Cek `baseURL` di `nuxt.config.ts`
2. Untuk repo `mangrove-map`, gunakan: `baseURL: '/mangrove-map/'`
3. Untuk custom domain, gunakan: `baseURL: '/'`

### Problem: Workflow gagal

**Solusi:**
1. Cek tab Actions untuk melihat error
2. Pastikan Node version di workflow (v22) sesuai
3. Pastikan dependencies terinstall dengan benar

### Problem: Peta tidak muncul

**Solusi:**
- Leaflet memerlukan client-side rendering
- Sudah dihandle dengan `ClientOnly` component
- Jika masih error, cek browser console

## Monitoring

### Cek Build Status

Badge untuk README:

```markdown
![Deploy Status](https://github.com/username/mangrove-map/actions/workflows/deploy.yml/badge.svg)
```

### Analytics (Opsional)

Tambahkan Google Analytics atau Plausible untuk tracking visitor:

1. Daftar di service analytics
2. Tambahkan tracking code di `nuxt.config.ts`

## Backup & Version Control

Selalu gunakan Git untuk version control:

```bash
# Cek status
git status

# Lihat history
git log

# Rollback ke commit sebelumnya
git revert HEAD

# Lihat perubahan
git diff
```

## Environment Variables

Jika ada environment variables:

1. Buat file `.env.example` (contoh tanpa nilai rahasia)
2. Tambahkan secrets di GitHub:
   - Settings → Secrets and variables → Actions
   - New repository secret
3. Gunakan di workflow:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

## Tips

1. **Test Lokal Dulu**: Selalu test dengan `npm run generate && npm run preview` sebelum push
2. **Commit Teratur**: Commit perubahan secara berkala dengan pesan yang jelas
3. **Gunakan Branch**: Untuk fitur besar, buat branch baru lalu merge ke main
4. **Backup Data**: Export data praktik dan narasi secara berkala

## Support

Jika ada masalah:
1. Cek dokumentasi Nuxt: https://nuxt.com/docs
2. Cek GitHub Pages docs: https://docs.github.com/pages
3. Buat issue di repository

---

**Selamat! Website Anda sudah live di internet!** 🎉

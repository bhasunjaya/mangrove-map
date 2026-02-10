# Quick Fix: GitHub Actions Error

## Error yang Anda Alami

```
Error: Dependencies lock file is not found in /home/runner/work/mangrove-map/mangrove-map. 
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

## ✅ Solusi Cepat (sudah diimplementasikan)

File-file berikut sudah diupdate:

### 1. `.gitignore` - package-lock.json tidak lagi diabaikan
File ini sekarang akan di-commit ke repository.

### 2. `.github/workflows/deploy.yml` - Workflow yang lebih robust
Workflow sekarang bisa handle dengan atau tanpa `package-lock.json`:
- Jika ada lock file → gunakan `npm ci` (faster)
- Jika tidak ada → gunakan `npm install`

## 🚀 Langkah yang Perlu Anda Lakukan

### Opsi A: Commit package-lock.json (Recommended)

```bash
# 1. Pastikan Anda di folder proyek
cd mangrove-map

# 2. Add package-lock.json
git add package-lock.json

# 3. Commit
git commit -m "fix: add package-lock.json for GitHub Actions"

# 4. Push ke GitHub
git push
```

GitHub Actions akan otomatis running ulang dan seharusnya berhasil!

### Opsi B: Push semua perubahan

Jika belum push semua perubahan terbaru:

```bash
# 1. Add semua file
git add .

# 2. Commit
git commit -m "fix: update deployment configuration"

# 3. Push
git push
```

## 🔍 Verifikasi

Setelah push, cek di GitHub:

1. **Actions Tab**
   - Repository → Actions
   - Lihat workflow "Deploy to GitHub Pages" running
   - Tunggu sampai selesai (hijau ✓)

2. **Pages Tab**
   - Settings → Pages
   - Pastikan URL sudah tersedia
   - Klik URL untuk test website

## 📋 Checklist

- [ ] File `package-lock.json` ada di repository
- [ ] File `.github/workflows/deploy.yml` terupdate
- [ ] File `.gitignore` tidak block `package-lock.json`
- [ ] Push ke GitHub sudah dilakukan
- [ ] GitHub Actions workflow running (cek tab Actions)

## ❓ Masih Error?

Cek file lengkap troubleshooting: **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

Atau coba:

### Debug Lokal
```bash
# Test build lokal
npm run generate

# Pastikan tidak ada error
# Cek output di .output/public/
ls -la .output/public/
```

### Cek File Status
```bash
# Cek apakah package-lock.json tracked
git status

# Pastikan tidak di .gitignore
cat .gitignore | grep package-lock
```

### Force Add (jika masih di-ignore)
```bash
git add -f package-lock.json
git commit -m "fix: force add package-lock.json"
git push
```

## 🎯 Expected Result

Setelah fix, workflow akan:
1. ✅ Checkout code
2. ✅ Setup Node.js v22
3. ✅ Install dependencies (npm ci atau npm install)
4. ✅ Generate static site
5. ✅ Upload artifact
6. ✅ Deploy to GitHub Pages

Website akan live di: `https://USERNAME.github.io/mangrove-map/`

## 💡 Pro Tips

1. **Selalu commit package-lock.json** untuk reproducible builds
2. **Test lokal dulu** dengan `npm run generate` sebelum push
3. **Monitor GitHub Actions** setiap push untuk deteksi error cepat
4. **Use branch** untuk testing deployment fix tanpa ganggu main

---

Need more help? See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) atau [DEPLOYMENT.md](DEPLOYMENT.md)

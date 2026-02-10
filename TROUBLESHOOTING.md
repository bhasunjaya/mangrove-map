# Troubleshooting Deployment

## Common Issues dan Solusinya

### 1. Error: Dependencies lock file is not found

**Error:**
```
Error: Dependencies lock file is not found in /home/runner/work/mangrove-map/mangrove-map. 
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

**Penyebab:**
File `package-lock.json` tidak di-commit ke repository.

**Solusi:**

#### Opsi A: Commit package-lock.json (Recommended)

1. Pastikan `package-lock.json` tidak di `.gitignore`
2. Commit file tersebut:
```bash
git add package-lock.json
git commit -m "Add package-lock.json for reproducible builds"
git push
```

#### Opsi B: Update Workflow

File `.github/workflows/deploy.yml` sudah dikonfigurasi untuk handle kedua situasi:
- Jika `package-lock.json` ada → gunakan `npm ci` (faster)
- Jika tidak ada → gunakan `npm install`

```yaml
- name: Install dependencies
  run: |
    if [ -f package-lock.json ]; then
      npm ci
    else
      npm install
    fi
```

### 2. Error: 404 Page Not Found

**Penyebab:**
Base URL tidak sesuai dengan nama repository.

**Solusi:**

Edit `nuxt.config.ts`:
```typescript
app: {
  baseURL: process.env.NODE_ENV === 'production' ? '/NAMA-REPO-ANDA/' : '/',
  // ...
}
```

Jika repository name: `mangrove-map`, maka:
```typescript
baseURL: process.env.NODE_ENV === 'production' ? '/mangrove-map/' : '/',
```

Jika menggunakan custom domain:
```typescript
baseURL: '/',
```

### 3. Error: CSS/JS tidak load

**Penyebab:**
Asset path tidak correct karena baseURL salah.

**Solusi:**
1. Cek `baseURL` di `nuxt.config.ts`
2. Pastikan ada trailing slash: `/mangrove-map/` (bukan `/mangrove-map`)
3. Push ulang perubahan

### 4. Workflow Failed dengan Node version error

**Penyebab:**
Node version tidak compatible.

**Solusi:**

Update `.github/workflows/deploy.yml`:
```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '22'  # Pastikan version 22
```

### 5. Build berhasil tapi halaman blank

**Penyebab:**
- SPA mode (ssr: false) memerlukan 200.html fallback
- JavaScript error di browser

**Solusi:**
1. Cek browser console untuk error
2. Pastikan di `nuxt.config.ts`:
   ```typescript
   ssr: false,
   nitro: {
     preset: 'static'
   }
   ```
3. Clear browser cache dan refresh

### 6. Leaflet Map tidak muncul

**Penyebab:**
Leaflet memerlukan client-side rendering.

**Solusi:**
Sudah dihandle dengan `ClientOnly` component:
```vue
<ClientOnly>
  <MapWithFilters />
</ClientOnly>
```

Jika masih error, cek:
1. Network tab untuk Leaflet CSS/JS loading
2. Console error
3. Pastikan Leaflet CSS di-import di `nuxt.config.ts`

### 7. GitHub Actions timeout

**Penyebab:**
Build memakan waktu terlalu lama.

**Solusi:**
1. Pastikan `node_modules` di `.gitignore`
2. Gunakan `npm ci` untuk faster install (default jika ada lock file)
3. Tambah timeout di workflow jika perlu:
   ```yaml
   - name: Build
     run: npm run generate
     timeout-minutes: 10
   ```

### 8. Permission denied saat deploy

**Penyebab:**
GitHub Actions tidak punya permission untuk deploy ke Pages.

**Solusi:**
1. Settings → Actions → General
2. Scroll ke "Workflow permissions"
3. Pilih "Read and write permissions"
4. Save
5. Re-run workflow

### 9. Custom domain tidak work

**Penyebab:**
DNS belum propagate atau konfigurasi salah.

**Solusi:**

1. **Buat CNAME file:**
   ```bash
   echo "yourdomain.com" > public/CNAME
   git add public/CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Setup DNS di domain provider:**
   
   Untuk subdomain (www):
   ```
   Type: CNAME
   Name: www
   Value: username.github.io
   TTL: 3600
   ```
   
   Untuk apex domain (@):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   TTL: 3600
   ```

3. **Update nuxt.config.ts:**
   ```typescript
   baseURL: '/',  // Bukan '/mangrove-map/'
   ```

4. **GitHub Settings:**
   - Settings → Pages
   - Custom domain: yourdomain.com
   - Save
   - Tunggu DNS check (hijau)
   - Enable "Enforce HTTPS"

5. **Tunggu DNS propagation** (5-48 jam)

### 10. Deploy berhasil tapi update tidak muncul

**Penyebab:**
Browser cache atau CDN cache.

**Solusi:**
1. Hard refresh: `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Buka di incognito/private mode
4. Tunggu beberapa menit untuk CDN propagation
5. Cek timestamp di GitHub Actions untuk memastikan deploy terbaru

## Tips Debugging

### 1. Cek GitHub Actions Logs

1. Repository → Actions tab
2. Klik workflow run yang failed
3. Klik job "build"
4. Expand step yang error
5. Baca error message lengkap

### 2. Test Local Build

Sebelum push, test dulu:
```bash
# Build static site
npm run generate

# Preview
npm run preview
# atau
npx serve .output/public

# Test dengan baseURL production
NODE_ENV=production npm run generate
npx serve .output/public -p 3000
```

Akses: `http://localhost:3000/mangrove-map/`

### 3. Validate HTML Output

```bash
npm run generate
ls -la .output/public/
cat .output/public/index.html
```

Pastikan:
- File `index.html` ada
- File `.nojekyll` ada
- Folder `assets/` berisi CSS/JS
- Asset paths benar (relative atau dengan baseURL)

### 4. Check Repository Settings

GitHub Repository Settings yang perlu dicek:
- **Pages**:
  - Source: GitHub Actions ✓
  - Custom domain (jika ada)
  - HTTPS enforced ✓
- **Actions**:
  - Allow all actions ✓
  - Workflow permissions: Read and write ✓

### 5. Useful Commands

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clean build
rm -rf .nuxt .output
npm run generate

# Check for errors
npm run build -- --debug

# Verify files
find .output/public -type f | head -20
```

## Getting Help

Jika masih ada masalah:

1. **GitHub Issues**: Buat issue di repository dengan:
   - Error message lengkap
   - Screenshot GitHub Actions log
   - Link repository
   - Langkah-langkah yang sudah dicoba

2. **Nuxt Documentation**: https://nuxt.com/docs/getting-started/deployment

3. **GitHub Pages Documentation**: https://docs.github.com/pages

4. **Stack Overflow**: Tag dengan `nuxt3`, `github-pages`, `github-actions`

## Checklist Sebelum Deploy

- [ ] `package-lock.json` di-commit (atau workflow handle missing lock file)
- [ ] `baseURL` di `nuxt.config.ts` sesuai nama repo
- [ ] File `.nojekyll` ada di `public/`
- [ ] Test `npm run generate` berhasil lokal
- [ ] Test preview dengan `npm run preview`
- [ ] `.gitignore` tidak block file penting
- [ ] GitHub Pages enabled di Settings
- [ ] Workflow permissions correct
- [ ] Branch `main` exist dan default

## Preventive Measures

1. **Selalu test lokal** sebelum push
2. **Commit package-lock.json** untuk reproducible builds
3. **Use semantic commit messages** untuk tracking
4. **Monitor GitHub Actions** setelah push
5. **Keep dependencies updated** tapi test dulu

---

Jika ada error yang tidak tercantum di sini, silakan buat issue dengan detail lengkap!

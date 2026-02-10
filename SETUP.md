# Mangrove Nusantara - Quick Setup

## Local Development

### 1. Install Node.js v22
```bash
# Using fnm
fnm install 22
fnm use 22
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Buka browser: http://localhost:3000

## Deploy to GitHub Pages

### 1. Create GitHub Repository
- Go to https://github.com/new
- Name: `mangrove-map`
- Create repository

### 2. Push Code
```bash
git init
git add .
git commit -m "Initial commit: Mangrove Nusantara"
git remote add origin https://github.com/YOUR_USERNAME/mangrove-map.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to repository Settings → Pages
- Source: Select **GitHub Actions**
- Wait for deployment to complete

### 4. Access Website
Your website will be available at:
```
https://YOUR_USERNAME.github.io/mangrove-map/
```

## Important Notes

⚠️ **Update baseURL in nuxt.config.ts** if your repository name is different:
```typescript
baseURL: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

📖 **Full documentation:** See [DEPLOYMENT.md](DEPLOYMENT.md)

## Project Structure

```
mangrove-map/
├── pages/              # Route pages
├── components/         # Vue components
├── data/              # Data files
├── assets/            # CSS & assets
└── .github/workflows/ # GitHub Actions
```

## Need Help?

- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
- See [README.md](README.md) for full documentation
- Create an issue on GitHub

Happy coding! 🌱

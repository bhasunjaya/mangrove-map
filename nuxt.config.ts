// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  css: [
    'leaflet/dist/leaflet.css',
    '~/assets/css/main.css'
  ],
  
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/mangrove-map/' : '/',
    buildAssetsDir: 'assets',
    head: {
      title: 'Peta Praktik Restorasi Mangrove',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Peta interaktif praktik restorasi mangrove di Indonesia' }
      ]
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['leaflet']
    }
  },

  // Enable static site generation
  ssr: false,
  
  // Configure for GitHub Pages
  nitro: {
    preset: 'static'
  }
})

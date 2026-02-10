<template>
  <div>
    <!-- 1. Hero Section - Ringkasan Visi Platform -->
    <section class="bg-gradient-to-r from-green-700 to-green-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Mangrove Nusantara
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Platform kolaboratif untuk mendokumentasikan, berbagi, dan merayakan praktik restorasi mangrove di Indonesia
          </p>
          <p class="text-lg text-green-200 max-w-4xl mx-auto leading-relaxed">
            Kami percaya bahwa setiap cerita restorasi mangrove adalah inspirasi bagi yang lain. 
            Dengan mengangkat peran perempuan dalam konservasi, kami membangun gerakan restorasi 
            yang inklusif dan berkelanjutan untuk masa depan pesisir Indonesia yang lebih hijau.
          </p>
        </div>
      </div>
    </section>

    <!-- 2. Peta Section dengan Filter -->
    <section id="peta" class="bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Peta Praktik Restorasi Mangrove
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Jelajahi praktik restorasi mangrove di berbagai wilayah Indonesia. 
            Gunakan filter untuk menemukan praktik berdasarkan lokasi dan status.
          </p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <ClientOnly>
            <MapWithFilters map-class="w-full h-[600px]" />
          </ClientOnly>
        </div>
      </div>
    </section>

    <!-- 3. Highlight Ruang Narasi -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ruang Narasi Pilihan
            </h2>
            <p class="text-lg text-gray-600">
              Cerita inspiratif dari para pelaku restorasi mangrove
            </p>
          </div>
          <NuxtLink 
            to="/ruang-narasi"
            class="hidden md:inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
          >
            Lihat Semua
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            v-for="post in featuredPosts" 
            :key="post.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer"
            @click="navigateToNarasi(post.id)"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="post.thumbnail" 
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div class="absolute top-4 right-4">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    post.mediaType === 'video' ? 'bg-red-100 text-red-800' :
                    post.mediaType === 'audio' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  ]"
                >
                  {{ post.mediaType === 'video' ? 'Video' : post.mediaType === 'audio' ? 'Audio' : 'Artikel' }}
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ post.shortDescription }}
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{{ post.author }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center md:hidden">
          <NuxtLink 
            to="/ruang-narasi"
            class="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
          >
            Lihat Semua Narasi
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. CTA Section -->
    <section class="bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Mari Bergabung dalam Gerakan Restorasi
          </h2>
          <p class="text-xl text-green-100">
            Setiap aksi kecil berkontribusi pada perubahan besar
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <!-- CTA 1: Bagikan Cerita -->
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-opacity-20 transition">
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Bagikan Ceritamu</h3>
            <p class="text-green-100 mb-6">
              Ceritakan pengalaman dan praktik restorasimu untuk menginspirasi yang lain
            </p>
            <button class="bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition">
              Tulis Cerita
            </button>
          </div>

          <!-- CTA 2: Lihat Praktik Baik -->
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-opacity-20 transition">
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Lihat Praktik Baik</h3>
            <p class="text-green-100 mb-6">
              Pelajari metode dan strategi restorasi mangrove yang telah terbukti berhasil
            </p>
            <NuxtLink 
              to="/praktik-baik"
              class="inline-block bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition"
            >
              Jelajahi Praktik
            </NuxtLink>
          </div>

          <!-- CTA 3: Jelajahi Peta -->
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-opacity-20 transition">
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Jelajahi Peta</h3>
            <p class="text-green-100 mb-6">
              Temukan lokasi praktik restorasi mangrove di seluruh Indonesia
            </p>
            <NuxtLink 
              to="/peta-mangrove"
              class="inline-block bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition"
            >
              Buka Peta
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { narasiPosts } from '~/data/narasi-posts'

useHead({
  title: 'Beranda - Mangrove Nusantara'
})

const featuredPosts = computed(() => {
  return narasiPosts.filter(post => post.featured).slice(0, 3)
})

const navigateToNarasi = (id: string) => {
  navigateTo(`/ruang-narasi/${id}`)
}
</script>

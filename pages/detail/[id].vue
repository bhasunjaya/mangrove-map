<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with back button -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <NuxtLink 
          to="/"
          class="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Peta
        </NuxtLink>
      </div>
    </div>

    <div v-if="practice" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Image -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <img 
          :src="practice.fotoUtama" 
          :alt="practice.namaPraktik"
          class="w-full h-96 object-cover"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- 1. Identitas Praktik -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">
              {{ practice.namaPraktik }}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Lokasi GPS -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Koordinat GPS</h3>
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="text-gray-900">{{ practice.lokasi.gps.lat }}, {{ practice.lokasi.gps.lng }}</p>
                    <a 
                      :href="`https://www.google.com/maps?q=${practice.lokasi.gps.lat},${practice.lokasi.gps.lng}`"
                      target="_blank"
                      class="text-sm text-green-600 hover:text-green-700 underline"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <!-- Lokasi Administrasi -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Lokasi Administrasi</h3>
                <div class="text-gray-900">
                  <p>Desa: {{ practice.lokasi.desa }}</p>
                  <p>Kabupaten: {{ practice.lokasi.kabupaten }}</p>
                  <p>Provinsi: {{ practice.lokasi.provinsi }}</p>
                </div>
              </div>

              <!-- Tahun Pelaksanaan -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Tahun Pelaksanaan</h3>
                <p class="text-gray-900 text-lg font-semibold">{{ practice.tahunPelaksanaan }}</p>
              </div>

              <!-- Status -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Status Program</h3>
                <span 
                  :class="[
                    'inline-block px-4 py-2 rounded-full text-sm font-medium',
                    practice.status === 'berjalan' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  ]"
                >
                  {{ practice.status === 'berjalan' ? 'Sedang Berjalan' : 'Selesai' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 2. Peran Perempuan -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Peran Perempuan</h2>
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="peran in practice.peranPerempuan" 
                :key="peran"
                class="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium"
              >
                {{ formatPeran(peran) }}
              </span>
            </div>
          </div>

          <!-- 3. Deskripsi Praktik -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Deskripsi Praktik</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ practice.deskripsi }}</p>
          </div>

          <!-- 4. Dampak -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Dampak Program</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ practice.dampak }}</p>
          </div>

          <!-- 5. Media Pendukung -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Media Pendukung</h2>
            
            <!-- Foto -->
            <div v-if="practice.mediaPendukung.foto.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Galeri Foto</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <img 
                  v-for="(foto, index) in practice.mediaPendukung.foto" 
                  :key="index"
                  :src="foto" 
                  :alt="`Foto ${index + 1}`"
                  class="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                />
              </div>
            </div>

            <!-- Video -->
            <div v-if="practice.mediaPendukung.video.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Video</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(video, index) in practice.mediaPendukung.video" 
                  :key="index"
                  class="flex items-center text-gray-700 hover:text-green-600"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ video }}
                </li>
              </ul>
            </div>

            <!-- Audio -->
            <div v-if="practice.mediaPendukung.audio.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Audio</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(audio, index) in practice.mediaPendukung.audio" 
                  :key="index"
                  class="flex items-center text-gray-700 hover:text-green-600"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  {{ audio }}
                </li>
              </ul>
            </div>

            <!-- Dokumen -->
            <div v-if="practice.mediaPendukung.dokumen.length > 0">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Dokumen Pendukung</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(dokumen, index) in practice.mediaPendukung.dokumen" 
                  :key="index"
                  class="flex items-center text-gray-700 hover:text-green-600"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ dokumen }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Informasi Ringkas</h3>
            <div class="space-y-4 text-sm">
              <div>
                <p class="text-gray-500 font-medium">Lokasi</p>
                <p class="text-gray-900">{{ practice.lokasi.provinsi }}</p>
              </div>
              <div>
                <p class="text-gray-500 font-medium">Tahun</p>
                <p class="text-gray-900">{{ practice.tahunPelaksanaan }}</p>
              </div>
              <div>
                <p class="text-gray-500 font-medium">Status</p>
                <p class="text-gray-900">{{ practice.status === 'berjalan' ? 'Sedang Berjalan' : 'Selesai' }}</p>
              </div>
              <div>
                <p class="text-gray-500 font-medium">Peran Perempuan</p>
                <p class="text-gray-900">{{ practice.peranPerempuan.length }} Peran</p>
              </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-gray-700 text-sm leading-relaxed">
                {{ practice.ringkasan }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Praktik tidak ditemukan</h2>
      <NuxtLink 
        to="/"
        class="text-green-600 hover:text-green-700 font-medium"
      >
        Kembali ke Peta
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mangrovePractices } from '~/data/mangrove-practices'

const route = useRoute()
const practiceId = route.params.id as string

const practice = mangrovePractices.find(p => p.id === practiceId)

if (practice) {
  useHead({
    title: `${practice.namaPraktik} - Peta Restorasi Mangrove`
  })
}

const formatPeran = (peran: string) => {
  const peranMap: Record<string, string> = {
    'inisiator': 'Inisiator',
    'pemimpin komunitas': 'Pemimpin Komunitas',
    'pelaksana lapangan': 'Pelaksana Lapangan'
  }
  return peranMap[peran] || peran
}
</script>

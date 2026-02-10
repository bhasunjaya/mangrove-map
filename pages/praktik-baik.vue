<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-green-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Praktik Baik Restorasi Mangrove
        </h1>
        <p class="text-xl text-green-100 max-w-3xl">
          Database praktik restorasi mangrove yang telah terbukti memberikan dampak positif 
          bagi lingkungan dan masyarakat pesisir
        </p>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="bg-white border-b sticky top-16 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari praktik..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Filter Provinsi -->
          <select 
            v-model="filterProvinsi"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Semua Provinsi</option>
            <option v-for="prov in provinsiList" :key="prov" :value="prov">
              {{ prov }}
            </option>
          </select>

          <!-- Filter Status -->
          <select 
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Semua Status</option>
            <option value="berjalan">Sedang Berjalan</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Results Info -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p class="text-gray-600">
        Menampilkan <span class="font-semibold text-gray-900">{{ filteredPractices.length }}</span> 
        dari <span class="font-semibold text-gray-900">{{ mangrovePractices.length }}</span> praktik
      </p>
    </section>

    <!-- Practices Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div v-if="filteredPractices.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="practice in filteredPractices"
          :key="practice.id"
          :to="`/detail/${practice.id}`"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
        >
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="practice.fotoUtama" 
              :alt="practice.namaPraktik"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div class="absolute top-4 right-4">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  practice.status === 'berjalan' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                ]"
              >
                {{ practice.status === 'berjalan' ? 'Berjalan' : 'Selesai' }}
              </span>
            </div>
          </div>

          <div class="p-5">
            <!-- Judul Kegiatan -->
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition line-clamp-2">
              {{ practice.namaPraktik }}
            </h3>

            <!-- Pelaku (Peran Perempuan) -->
            <div class="mb-3">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="peran in practice.peranPerempuan.slice(0, 2)" 
                  :key="peran"
                  class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                >
                  {{ formatPeran(peran) }}
                </span>
                <span 
                  v-if="practice.peranPerempuan.length > 2"
                  class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                >
                  +{{ practice.peranPerempuan.length - 2 }}
                </span>
              </div>
            </div>

            <!-- Lokasi -->
            <div class="flex items-start text-gray-600 mb-3">
              <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm">
                {{ practice.lokasi.desa }}, {{ practice.lokasi.kabupaten }}, {{ practice.lokasi.provinsi }}
              </span>
            </div>

            <!-- Ringkasan -->
            <p class="text-gray-600 text-sm line-clamp-3 mb-4">
              {{ practice.ringkasan }}
            </p>

            <!-- Tahun -->
            <div class="flex items-center text-sm text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Tahun {{ practice.tahunPelaksanaan }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Tidak ada praktik ditemukan</h3>
        <p class="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian</p>
        <button 
          @click="resetFilters"
          class="text-green-600 hover:text-green-700 font-semibold"
        >
          Reset Filter
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mangrovePractices } from '~/data/mangrove-practices'

useHead({
  title: 'Praktik Baik - Mangrove Nusantara'
})

const searchQuery = ref('')
const filterProvinsi = ref('')
const filterStatus = ref('')

const provinsiList = computed(() => {
  return [...new Set(mangrovePractices.map(p => p.lokasi.provinsi))].sort()
})

const filteredPractices = computed(() => {
  return mangrovePractices.filter(practice => {
    const matchSearch = !searchQuery.value || 
      practice.namaPraktik.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      practice.lokasi.desa.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      practice.lokasi.kabupaten.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      practice.ringkasan.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchProvinsi = !filterProvinsi.value || practice.lokasi.provinsi === filterProvinsi.value
    const matchStatus = !filterStatus.value || practice.status === filterStatus.value
    
    return matchSearch && matchProvinsi && matchStatus
  })
})

const formatPeran = (peran: string) => {
  const peranMap: Record<string, string> = {
    'inisiator': 'Inisiator',
    'pemimpin komunitas': 'Pemimpin',
    'pelaksana lapangan': 'Pelaksana'
  }
  return peranMap[peran] || peran
}

const resetFilters = () => {
  searchQuery.value = ''
  filterProvinsi.value = ''
  filterStatus.value = ''
}
</script>

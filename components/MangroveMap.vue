<template>
  <div>
    <div id="map" class="w-full h-screen"></div>
    
    <!-- Modal Card -->
    <div 
      v-if="selectedPractice" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="relative">
          <img 
            :src="selectedPractice.fotoUtama" 
            :alt="selectedPractice.namaPraktik"
            class="w-full h-64 object-cover rounded-t-lg"
          />
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ selectedPractice.namaPraktik }}
          </h2>
          
          <div class="flex items-center text-gray-600 mb-4">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ selectedPractice.lokasi.desa }}, {{ selectedPractice.lokasi.kabupaten }}, {{ selectedPractice.lokasi.provinsi }}</span>
          </div>
          
          <p class="text-gray-700 mb-4 leading-relaxed">
            {{ selectedPractice.ringkasan }}
          </p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                selectedPractice.status === 'berjalan' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              ]"
            >
              {{ selectedPractice.status === 'berjalan' ? 'Sedang Berjalan' : 'Selesai' }}
            </span>
            <span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Tahun {{ selectedPractice.tahunPelaksanaan }}
            </span>
          </div>
          
          <NuxtLink 
            :to="`/detail/${selectedPractice.id}`"
            class="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center"
          >
            Lihat Detail Lengkap
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MangrovePractice } from '~/data/mangrove-practices'
import { mangrovePractices } from '~/data/mangrove-practices'

const selectedPractice = ref<MangrovePractice | null>(null)

let map: any = null
let L: any = null

onMounted(async () => {
  // Import Leaflet only on client side
  if (process.client) {
    L = await import('leaflet')
    
    // Initialize map centered on Indonesia
    map = L.map('map').setView([-2.5, 118.0], 5)
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map)
    
    // Custom icon for mangrove markers
    const mangroveIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
    
    // Add markers for each practice
    mangrovePractices.forEach((practice) => {
      const marker = L.marker(
        [practice.lokasi.gps.lat, practice.lokasi.gps.lng],
        { icon: mangroveIcon }
      ).addTo(map)
      
      marker.on('click', () => {
        selectedPractice.value = practice
      })
      
      // Add tooltip
      marker.bindTooltip(practice.namaPraktik, {
        permanent: false,
        direction: 'top'
      })
    })
  }
})

const closeModal = () => {
  selectedPractice.value = null
}
</script>

<style scoped>
#map {
  z-index: 1;
}
</style>

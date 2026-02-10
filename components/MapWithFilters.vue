<template>
  <div class="relative">
    <!-- Filters -->
    <div class="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <h3 class="font-semibold text-gray-900 mb-3">Filter Praktik</h3>
      
      <!-- Lokasi Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
        <select 
          v-model="selectedProvinsi"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Semua Provinsi</option>
          <option v-for="prov in provinsiList" :key="prov" :value="prov">
            {{ prov }}
          </option>
        </select>
      </div>

      <!-- Status Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select 
          v-model="selectedStatus"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Semua Status</option>
          <option value="berjalan">Sedang Berjalan</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>

      <!-- Reset Button -->
      <button 
        @click="resetFilters"
        class="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition text-sm font-medium"
      >
        Reset Filter
      </button>

      <!-- Results Counter -->
      <div class="mt-3 text-sm text-gray-600 text-center">
        Menampilkan {{ filteredPractices.length }} dari {{ mangrovePractices.length }} praktik
      </div>
    </div>

    <div id="map" :class="mapClass"></div>
    
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
import { ref, computed, onMounted, watch } from 'vue'
import type { MangrovePractice } from '~/data/mangrove-practices'
import { mangrovePractices } from '~/data/mangrove-practices'

interface Props {
  mapClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  mapClass: 'w-full h-screen'
})

const selectedPractice = ref<MangrovePractice | null>(null)
const selectedProvinsi = ref('')
const selectedStatus = ref('')

let map: any = null
let L: any = null
let markers: any[] = []

// Get unique provinces
const provinsiList = computed(() => {
  return [...new Set(mangrovePractices.map(p => p.lokasi.provinsi))].sort()
})

// Filtered practices
const filteredPractices = computed(() => {
  return mangrovePractices.filter(practice => {
    const matchProvinsi = !selectedProvinsi.value || practice.lokasi.provinsi === selectedProvinsi.value
    const matchStatus = !selectedStatus.value || practice.status === selectedStatus.value
    return matchProvinsi && matchStatus
  })
})

onMounted(async () => {
  if (process.client) {
    L = await import('leaflet')
    
    map = L.map('map').setView([-2.5, 118.0], 5)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map)
    
    updateMarkers()
  }
})

// Update markers when filters change
watch([selectedProvinsi, selectedStatus], () => {
  updateMarkers()
})

const updateMarkers = () => {
  if (!L || !map) return
  
  // Remove existing markers
  markers.forEach(marker => marker.remove())
  markers = []
  
  const mangroveIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  
  // Add markers for filtered practices
  filteredPractices.value.forEach((practice) => {
    const marker = L.marker(
      [practice.lokasi.gps.lat, practice.lokasi.gps.lng],
      { icon: mangroveIcon }
    ).addTo(map)
    
    marker.on('click', () => {
      selectedPractice.value = practice
    })
    
    marker.bindTooltip(practice.namaPraktik, {
      permanent: false,
      direction: 'top'
    })
    
    markers.push(marker)
  })
  
  // Fit bounds to show all markers if there are any
  if (markers.length > 0) {
    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.1))
  }
}

const resetFilters = () => {
  selectedProvinsi.value = ''
  selectedStatus.value = ''
}

const closeModal = () => {
  selectedPractice.value = null
}
</script>

<style scoped>
#map {
  z-index: 1;
}
</style>

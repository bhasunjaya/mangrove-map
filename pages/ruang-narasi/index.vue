<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Ruang Narasi
        </h1>
        <p class="text-xl text-purple-100 max-w-3xl">
          Kumpulan cerita, pengalaman, dan inspirasi dari para pelaku restorasi mangrove di Indonesia
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="bg-white border-b sticky top-16 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari narasi..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Filter Media Type -->
          <select 
            v-model="filterMediaType"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Semua Media</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="text">Artikel</option>
            <option value="image">Gambar</option>
          </select>

          <!-- Filter Tag -->
          <select 
            v-model="filterTag"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Semua Tag</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Results Info -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p class="text-gray-600">
        Menampilkan <span class="font-semibold text-gray-900">{{ filteredPosts.length }}</span> 
        dari <span class="font-semibold text-gray-900">{{ narasiPosts.length }}</span> narasi
      </p>
    </section>

    <!-- Posts Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.id"
          :to="`/ruang-narasi/${post.id}`"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
        >
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="post.thumbnail" 
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            
            <!-- Media Type Badge -->
            <div class="absolute top-4 right-4">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  post.mediaType === 'video' ? 'bg-red-100 text-red-800' :
                  post.mediaType === 'audio' ? 'bg-purple-100 text-purple-800' :
                  post.mediaType === 'image' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                ]"
              >
                {{ getMediaTypeLabel(post.mediaType) }}
              </span>
            </div>

            <!-- Media Icon -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div v-if="post.mediaType === 'video'" class="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <div v-else-if="post.mediaType === 'audio'" class="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-7.072a5 5 0 00-1.414 1.414" />
                </svg>
              </div>
            </div>
          </div>

          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition line-clamp-2">
              {{ post.title }}
            </h3>

            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              {{ post.shortDescription }}
            </p>

            <!-- Author -->
            <div class="flex items-center text-sm text-gray-600 mb-3">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ post.author }}</span>
            </div>

            <!-- Location & Date -->
            <div class="flex items-center justify-between text-xs text-gray-500">
              <div class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{{ post.location }}</span>
              </div>
              <span>{{ formatDate(post.date) }}</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1 mt-3">
              <span 
                v-for="tag in post.tags.slice(0, 3)" 
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Tidak ada narasi ditemukan</h3>
        <p class="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian</p>
        <button 
          @click="resetFilters"
          class="text-purple-600 hover:text-purple-700 font-semibold"
        >
          Reset Filter
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { narasiPosts } from '~/data/narasi-posts'

useHead({
  title: 'Ruang Narasi - Mangrove Nusantara'
})

const searchQuery = ref('')
const filterMediaType = ref('')
const filterTag = ref('')

const allTags = computed(() => {
  const tags = new Set<string>()
  narasiPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredPosts = computed(() => {
  return narasiPosts.filter(post => {
    const matchSearch = !searchQuery.value || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.shortDescription.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchMediaType = !filterMediaType.value || post.mediaType === filterMediaType.value
    const matchTag = !filterTag.value || post.tags.includes(filterTag.value)
    
    return matchSearch && matchMediaType && matchTag
  })
})

const getMediaTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'video': 'Video',
    'audio': 'Audio',
    'text': 'Artikel',
    'image': 'Gambar'
  }
  return labels[type] || type
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}

const resetFilters = () => {
  searchQuery.value = ''
  filterMediaType.value = ''
  filterTag.value = ''
}
</script>

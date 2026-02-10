<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <NuxtLink 
        to="/ruang-narasi"
        class="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-6"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Ruang Narasi
      </NuxtLink>

      <!-- Hero Image -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <img 
          :src="post.thumbnail" 
          :alt="post.title"
          class="w-full h-96 object-cover"
        />
      </div>

      <!-- Content -->
      <article class="bg-white rounded-lg shadow-lg p-8">
        <!-- Media Type Badge -->
        <div class="mb-4">
          <span 
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium inline-block',
              post.mediaType === 'video' ? 'bg-red-100 text-red-800' :
              post.mediaType === 'audio' ? 'bg-purple-100 text-purple-800' :
              post.mediaType === 'image' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            ]"
          >
            {{ getMediaTypeLabel(post.mediaType) }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ post.title }}
        </h1>

        <!-- Meta Info -->
        <div class="flex flex-wrap gap-4 text-gray-600 mb-6 pb-6 border-b">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <p class="font-semibold">{{ post.author }}</p>
              <p class="text-sm text-gray-500">{{ post.authorRole }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{{ post.location }}</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ formatDate(post.date) }}</span>
          </div>
        </div>

        <!-- Short Description -->
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p class="text-gray-700 italic">{{ post.shortDescription }}</p>
        </div>

        <!-- Media Player -->
        <div v-if="post.mediaUrl" class="mb-8">
          <div v-if="post.mediaType === 'video'" class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <p class="text-white">Video Player: {{ post.mediaUrl }}</p>
          </div>
          <div v-else-if="post.mediaType === 'audio'" class="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-7.072a5 5 0 00-1.414 1.414" />
              </svg>
              <p class="text-gray-600">Audio Player: {{ post.mediaUrl }}</p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="prose max-w-none mb-8">
          <p class="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {{ post.content }}
          </p>
        </div>

        <!-- Tags -->
        <div class="pt-6 border-t">
          <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Narasi Terkait</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedPosts"
            :key="related.id"
            :to="`/ruang-narasi/${related.id}`"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img 
              :src="related.thumbnail" 
              :alt="related.title"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">
                {{ related.title }}
              </h3>
              <p class="text-sm text-gray-600 line-clamp-2">
                {{ related.shortDescription }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Narasi tidak ditemukan</h2>
      <NuxtLink 
        to="/ruang-narasi"
        class="text-purple-600 hover:text-purple-700 font-medium"
      >
        Kembali ke Ruang Narasi
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { narasiPosts } from '~/data/narasi-posts'

const route = useRoute()
const postId = route.params.id as string

const post = narasiPosts.find(p => p.id === postId)

if (post) {
  useHead({
    title: `${post.title} - Ruang Narasi`
  })
}

const relatedPosts = computed(() => {
  if (!post) return []
  
  return narasiPosts
    .filter(p => p.id !== postId && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)
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
    month: 'long', 
    day: 'numeric' 
  }).format(date)
}
</script>

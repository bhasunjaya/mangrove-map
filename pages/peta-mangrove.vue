<template>
  <div>
    <ClientOnly>
      <MapWithFilters map-class="w-full h-[calc(100vh-4rem)]" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Peta Mangrove - Mangrove Nusantara'
})
</script>

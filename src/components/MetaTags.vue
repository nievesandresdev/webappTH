<!-- MetaTags.vue -->
<template>
  <div style="display: none;">
    <!-- Componente invisible que maneja los meta tags -->
  </div>
</template>

<script setup>
import { useHotelStore } from '@/stores/modules/hotel'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { getMetaTagsApi } from '@/api/services/hotel.services'

const hotelStore = useHotelStore()
const route = useRoute()

async function updateMetaTags() {
  try {
    const params = {
      path: route.path,
      url: window.location.href
    }
    
    const response = await getMetaTagsApi(params)
    
    if (response.ok && response.data) {
      const metaData = response.data
      
      // Actualizar título
      document.title = metaData.title
      
      // Actualizar meta tags
      updateMetaTag('og:title', metaData.title)
      updateMetaTag('og:description', metaData.description)
      updateMetaTag('og:image', metaData.image)
      updateMetaTag('og:url', metaData.url)
      updateMetaTag('og:type', metaData.type)
      updateMetaTag('og:site_name', metaData.site_name)
      
      // Twitter Card
      updateMetaTag('twitter:title', metaData.title)
      updateMetaTag('twitter:description', metaData.description)
      updateMetaTag('twitter:image', metaData.image)
    }
  } catch (error) {
    console.error('Error updating meta tags:', error)
  }
}

function updateMetaTag(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.querySelector(`meta[name="${property}"]`)
  }
  if (meta) {
    meta.setAttribute('content', content)
  }
}

// Actualizar meta tags cuando cambie la ruta
watch(() => route.path, updateMetaTags)

// Actualizar meta tags al montar el componente
onMounted(updateMetaTags)
</script> 
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
    console.log('Actualizando meta tags...')
    const params = {
      path: route.path,
      url: window.location.href
    }
    
    const response = await getMetaTagsApi(params)
    console.log('Meta tags response:', response)
    
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
  if (!content) return

  let meta = document.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.querySelector(`meta[name="${property}"]`)
  }
  
  // Si no existe el meta tag, lo creamos
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(property.includes('og:') ? 'property' : 'name', property)
    document.head.appendChild(meta)
  }
  
  meta.setAttribute('content', content)
  console.log(`Meta tag actualizado: ${property} = ${content}`)
}

// Actualizar meta tags cuando cambie la ruta
watch(() => route.path, () => {
  console.log('Ruta cambió:', route.path)
  updateMetaTags()
})

// Actualizar meta tags cuando los datos del hotel estén disponibles
watch(() => hotelStore.hotelDataStorage, (newValue) => {
  console.log('Datos del hotel actualizados:', newValue)
  if (newValue) {
    updateMetaTags()
  }
}, { deep: true })

// Actualizar meta tags al montar el componente
onMounted(() => {
  console.log('Componente montado')
  updateMetaTags()
})
</script> 
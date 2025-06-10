<!-- MetaTags.vue -->
<template>
  <!-- Este componente no renderiza nada visualmente -->
</template>

<script setup>
import { useHotelStore } from '@/stores/modules/hotel'
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'

const hotelStore = useHotelStore()
const route = useRoute()

watchEffect(() => {
  const hotelData = hotelStore.hotelDataStorage
  const routeName = route.name
  
  if (hotelData?.name) {
    let title = ''
    let description = ''
    
    // Configurar título según la ruta
    if (routeName === 'Home') {
      title = `${hotelData.name} | Inicio`
      description = `Bienvenido a ${hotelData.name}. Descubre nuestros servicios y comodidades.`
    } else if (routeName) {
      const routeTitle = routeName
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
      title = `${hotelData.name} | ${routeTitle}`
      description = `${routeTitle} en ${hotelData.name}`
    }

    // Actualizar meta tags
    document.title = title
    
    // OpenGraph
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', hotelData.logo || hotelData.image)
    updateMetaTag('og:url', window.location.href)
    
    // Twitter Card
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', hotelData.logo || hotelData.image)
  }
})

function updateMetaTag(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.querySelector(`meta[name="${property}"]`)
  }
  if (meta) {
    meta.setAttribute('content', content)
  }
}
</script> 
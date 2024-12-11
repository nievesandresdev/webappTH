// src/composables/useMediaQuery.js

import { ref, onMounted, onUnmounted } from 'vue'

export const useMediaQuery = () => {
  // Definir los puntos de quiebre
  const BREAKPOINTS = {
    smallmobile: 0,
    mobile: 300,
    tablet: 768,
    desktop: 1024
  }

  // Estado reactivo para detectar el tamaño
  
  const isSmallMobile = ref(false)
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  // Función para actualizar el estado según el tamaño de la ventana
  const updateScreenSize = () => {
    const width = window.innerWidth
        isSmallMobile.value = width < BREAKPOINTS.smallmobile
        isMobile.value = width < BREAKPOINTS.mobile
        isTablet.value = width < BREAKPOINTS.tablet
        isDesktop.value = width >= BREAKPOINTS.desktop
  }

  // Configurar para escuchar cambios en el tamaño de la ventana
  onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
  })

  // Limpiar cuando el componente sea destruido
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize)
  })

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    BREAKPOINTS
  }
}

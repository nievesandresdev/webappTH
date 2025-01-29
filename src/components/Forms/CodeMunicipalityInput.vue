<template>
    <div class="relative">
      <div 
        class="w-full flex items-center border h-10 px-2"
        :class="[
          'rounded-[10px]',
          hasError ? 'hborder-alert-negative htext-alert-negative' : 'hborder-black-100'
        ]"
      >
        <!-- Ícono de ubicación -->
        <img class="w-5 h-5 mr-2" src="/assets/icons/WA.pin-point.svg" alt="location-icon">
        
        <input
          v-model="searchQuery"
          @input="handleInput"
          @blur="handleBlur"
          placeholder="Escribe tu código postal o municipio"
          class="w-full h-full border-none p-0 rounded-[10px] flex-grow py-3 lato text-sm font-medium"
        />
        
        <!-- Ícono de desplegable -->
        <img class="w-5 h-5" src="/assets/icons/WA.chevron.DOWN.svg" alt="chevron-down">
      </div>
      
      <!-- Listado de sugerencias -->
      <ul
        v-if="isDropdownOpen && placeSuggestions.length > 0"
        class="absolute z-10 w-full bg-gradient-h rounded-[20px] shadow-guest max-h-[267px] overflow-y-auto"
      >
        <li
          v-for="(place, index) in placeSuggestions"
          :key="place.id"
          @mousedown="selectPlace(formatPlace(place))"
          class="px-2 py-4 lato text-sm font-bold leading-[16px]"
          :class="{'hborder-top-gray-400': index > 0}"
        >
          <!-- AQUÍ usamos la función formatPlace(place) para mostrar "41007, Sevilla" -->
          {{ formatPlace(place) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import mapboxgl from 'mapbox-gl'
  
  // Tu token de Mapbox
  mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const searchQuery = ref(props.modelValue)
  const placeSuggestions = ref([])
  const isDropdownOpen = ref(false)
  const hasError = ref(false)
  const isSelecting = ref(false)
  
  // Función para formatear la sugerencia con "código postal, municipio"
  function formatPlace(place) {
  // 1. Intentar extraer desde place.context
  const postalCodeObj = place.context?.find(ctx => ctx.id.startsWith('postcode'))
  const municipalityObj = place.context?.find(ctx => ctx.id.startsWith('place'))
  
  // 2. Inicializamos code y municipality con lo que haya en context (si existe)
  let code = postalCodeObj?.text || ''
  let municipality = municipalityObj?.text || ''
  
  // 3. Si el resultado principal en sí mismo es un postcode, pisamos el code
  if (place.place_type.includes('postcode')) {
    code = place.text
  }
  
  // 4. Si es un place (ciudad), pisamos el municipality
  if (place.place_type.includes('place') || place.place_type.includes('locality')) {
    municipality = place.text
  }
  
  // 5. Retornar en formato "XXXX, Municipio" si tenemos ambos
  if (code && municipality) {
    return `${code}, ${municipality}`
  } else if (code) {
    return code
  } else if (municipality) {
    return municipality
  }
  
  // 6. Si no tenemos nada de lo anterior, fallback a place.place_name
  return place.place_name
}

  
  // Llamar a la API de Mapbox con types=place,postcode
  async function searchPlaces(query) {
  if (!query) {
    placeSuggestions.value = []
    return
  }
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json
      ?access_token=${mapboxgl.accessToken}
      &autocomplete=true
      &types=locality,place,postcode
      &language=es
      &limit=5`.replace(/\s+/g, '')

    const res = await fetch(url)
    const data = await res.json()

    placeSuggestions.value = data.features || []
  } catch (error) {
    console.error('Error en la búsqueda de Mapbox:', error)
    placeSuggestions.value = []
  }
}

  
  // Observar cambios en searchQuery para hacer la búsqueda
  watch(searchQuery, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      searchPlaces(newVal)
      isDropdownOpen.value = true
      hasError.value = false
    }
  })
  
  // Eventos
  function handleInput() {
    isDropdownOpen.value = true
    hasError.value = false
  }
  
  function handleBlur() {
    console.log('test handleBlur')
    if (!isSelecting.value) {
      validateInput()
      isDropdownOpen.value = false
    }
  }
  
  function selectPlace(place) {
    console.log('test place',place)
    isSelecting.value = true
    // Guardar el valor formateado en el input
    searchQuery.value = place
    emit('update:modelValue', searchQuery.value)
    hasError.value = false
    isDropdownOpen.value = false
    
    // setTimeout(() => {
      isSelecting.value = false
    // }, 100)
  }
  
  // Permitir que el usuario escriba libremente un valor que no venga de la lista
  function validateInput() {
    if (searchQuery.value && searchQuery.value.trim() !== '') {
      emit('update:modelValue', searchQuery.value)
      hasError.value = false
    } else {
      emit('update:modelValue', null)
      hasError.value = true
    }
  }
  </script>
  
  <style scoped>
  input::placeholder {
    color: #A0A0A0;
    font-family: Lato;
    font-size: 14px;
    font-weight: 500;
  }
  </style>
  
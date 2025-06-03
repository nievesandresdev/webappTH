<template>
    <div class="relative" ref="inputMunicipality">
      <div 
        class="w-full flex items-center border-[2px] h-10 px-2"
        :class="[
          'rounded-[10px]',
          hasError ? 'hborder-alert-negative htext-alert-negative' : '',
          {
            'hborder-black-100': focusOn,
            'hborder-gray-400': !focusOn,
          }
        ]"
      >
        <!-- Ícono de ubicación -->
        <img class="w-5 h-5 mr-2" src="/assets/icons/WA.pin-point.svg" alt="location-icon">
        <!-- typeResults.includes('postcode') && focusOn ? 'number' : 'text' -->
        <input
          type="text"
          v-model="searchQuery"
          @input="handleInput"
          @blur="handleBlur"
          @focus="focusOn = true"
          :placeholder="placeholder"
          class="w-full h-full border-none p-0 rounded-[10px] flex-grow py-3 lato text-sm font-medium"
          :inputmode="props.typeResults.includes('postcode') ? 'numeric' : 'text'"
          :pattern="props.typeResults.includes('postcode') ? '^[0-9]*$' : '.*'"
        />
        
        <!-- Ícono de desplegable -->
        <img 
            v-if="!typeResults.includes('postcode')"
            class="w-5 h-5" 
            src="/assets/icons/WA.chevron.DOWN.svg" 
            alt="chevron-down"
            @click="handleChevronClick"
        >
      </div>
      
      <!-- Listado de sugerencias -->
      <ul
        v-if="(isDropdownOpen || openDefaultList) && placeSuggestions?.length > 0"
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
  import { ref, watch, onMounted, onBeforeUnmount, toRefs } from 'vue'
  import mapboxgl from 'mapbox-gl'

  import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()

  
  // Tu token de Mapbox
  mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    selectedCountry: {
      type: String,
      default: 'ES'
    },
    typeResults: {
      type: String,
      default: 'locality,place'
    },
    formatResult: {
      type: String,
      default: ''
    },
    countryName: {
      type: String,
      default: 'España'
    }
  })
  
  const { countryName } = toRefs(props)
  const emit = defineEmits(['update:modelValue', 'hasError'])
  
  const searchQuery = ref(props.modelValue)
  const placeSuggestions = ref([])
  const isDropdownOpen = ref(false)
  const hasError = ref(false)
  const isSelecting = ref(false)
  const focusOn = ref(false)
  const openDefaultList = ref(false)
  const inputMunicipality = ref(null)
  function formatPlace(place) {
    // Extraer datos
    const postalCodeObj = place.context?.find(ctx => ctx.id.startsWith('postcode'))
    const municipalityObj = place.context?.find(ctx => ctx.id.startsWith('place'))
    
    let code = postalCodeObj?.text || ''
    let municipality = municipalityObj?.text || ''
    
    // Si queremos mostrar direcciones y la sugerencia es 'address'
    if (props.formatResult == 'address' && place.place_type.includes('address')) {
      return place.place_name
    }

    // Sobrescribir código si es postcode
    if (place.place_type.includes('postcode')) {
      code = place.text
    }
    
    // Sobrescribir municipio si es place/locality
    if (place.place_type.includes('place') || place.place_type.includes('locality')) {
      municipality = place.text
    }
    
    // Retornar en formato "code, municipality" si ambos existen
    if (code && municipality) return `${code}, ${municipality}`
    if (code) return code
    if (municipality) return municipality
    
    // Fallback
    return place.place_name
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
  
  // Llamar a la API de Mapbox con types=place,postcode
  async function searchPlaces(query) {
    if (!query) {
      placeSuggestions.value = []
      return
    }
    // console.log('props.selectedCountry', props.selectedCountry)
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json
        ?access_token=${mapboxgl.accessToken}
        &autocomplete=true
        &types=${props.typeResults}
        &language=${localeStore.localeCurrent}
        &country=${props.selectedCountry}
        &limit=5`.replace(/\s+/g, '')

      const res = await fetch(url)
      const data = await res.json()
      // console.log('data',data)
      placeSuggestions.value = data.features || []
      return placeSuggestions.value;
    } catch (error) {
      console.error('Error en la búsqueda de Mapbox:', error)
      placeSuggestions.value = []
    }
  }

  const handleChevronClick = async () => {
    if(openDefaultList.value){
      handleBlur();
      return;
    }
    openDefaultList.value = true
    hasError.value = false
    emit('hasError', hasError.value)
    if (!placeSuggestions.value?.length) {
      let countryAbbr = countryName.value?.slice(0,3) ?? 'esp'
      let defaultCaracters = ['AR'].includes(props.selectedCountry) ? 'a' : '11';
      let stringDefault = props.typeResults.includes('postcode') ? defaultCaracters : countryAbbr
      let search = searchQuery.value?.trim() ? searchQuery.value?.trim() : stringDefault
      placeSuggestions.value = await searchPlaces(search)
    }
  }
 
  const onClickOutside = (event) => {
    if (inputMunicipality.value && !inputMunicipality.value.contains(event.target)) {
      isDropdownOpen.value = false
      openDefaultList.value = false
      placeSuggestions.value = []
    }
  }

  
  // Eventos
  function handleInput() {
    // if(props.typeResults.includes('postcode')){
    //   searchQuery.value = searchQuery.value.replace(/\D/g, '')
    // }
    isDropdownOpen.value = true;
    hasError.value = false
    emit('hasError', hasError.value)
    searchPlaces(searchQuery.value)
  }
  
  function handleBlur() {
    focusOn.value = false;
    if (!isSelecting.value) {
      validateInput()
      isDropdownOpen.value = false
      openDefaultList.value = false
    }
  }
  
  function selectPlace(place) {
    focusOn.value = false;
    isSelecting.value = true
    // Guardar el valor formateado en el input
    searchQuery.value = place
    emit('update:modelValue', searchQuery.value)
    hasError.value = false
    emit('hasError', hasError.value)
    isDropdownOpen.value = false
    openDefaultList.value = false
    
    // setTimeout(() => {
      isSelecting.value = false
    // }, 100)
  }
  
  // Permitir que el usuario escriba libremente un valor que no venga de la lista
  function validateInput() {
    // if (searchQuery.value && searchQuery.value.trim() !== '') {
      emit('update:modelValue', searchQuery.value)
      hasError.value = false
      emit('hasError', hasError.value)
    // } else {
    //   emit('update:modelValue', null)
    //   // hasError.value = true
    // }
  }

  watch(
  () => props.modelValue,
  newVal => {
    if(newVal?.trim()){
      searchQuery.value = newVal;
    }
    
  }
)
  </script>
  
  <style scoped>
  input::placeholder {
    color: #A0A0A0;
    font-family: Lato;
    font-size: 14px;
    font-weight: 500;
  }
  </style>
  
<template>
  <div class="relative">
    <div
      class="w-full flex items-center border-[2px] h-10 px-2"
      :class="[
        'rounded-[10px]',
        hasError && Boolean(searchQuery) ? 'hborder-alert-negative htext-alert-negative' : '',
        {
          'hborder-black-100': isFocused,
          'hborder-gray-400': !isFocused,
        }
      ]"
    >
      <img class="w-5 h-5 mr-2" src="/assets/icons/WA.flag.svg" alt="">
      <input
        v-model="searchQuery"
        @input="handleInput"
        @keydown.enter="handleEnter"
        @blur="handleBlur"
        @focus="handleFocus"
        :placeholder="placeholder"
        class="w-full h-full border-none p-0 rounded-[10px] flex-grow py-3 text-[10px] sp:text-sm lato font-medium leading-[12px] sp:leading-[16px]"
      />
      <img class="w-5 h-5" src="/assets/icons/WA.chevron.DOWN.svg" alt="">
    </div>

    <ul
      v-if="isDropdownOpen && filteredCountries.length > 0"
      class="absolute z-10 w-full bg-gradient-h rounded-[20px] shadow-guest max-h-[267px] overflow-y-auto"
    >
      <li
        v-for="(country, index) in filteredCountries"
        :key="country.codeCountry"
        @mousedown="selectCountry(country.translateCountry[currentLanguage], country)"
        class="px-2 py-4 cursor-pointer hover:bg-gray-100 lato text-sm font-bold leading-[16px]"
        :class="{'hborder-top-gray-400': index > 0}"
      >
        {{ country.translateCountry[currentLanguage] }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import mapboxgl from 'mapbox-gl'

// Tu token de Mapbox
mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

// Reemplaza la lógica anterior (getPhoneCodesApi) por esta función que llama a Mapbox
async function fetchCountriesFromMapbox(query) {
  try {
    // Escapa el string de búsqueda:
    const encodedQuery = encodeURIComponent(query)

    // Puedes ajustar los parámetros según tus necesidades:
    // - types=country: Forzamos que solo busque países
    // - language=es: Resultados en español (si están disponibles)
    // - limit=10: Cantidad máxima de resultados
    // IMPORTANTE: necesitas tu token de Mapbox en mapboxgl.accessToken
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${mapboxgl.accessToken}&autocomplete=true&types=country&language=es&limit=10`
    const res = await fetch(url)
    const data = await res.json()

    // De data.features tomamos lo que nos interesa.
    // Transformamos cada país en un objeto { codeCountry, translateCountry: { es: '...' } }
    return data.features.map(feature => {
      // A veces la propiedad short_code viene en feature.properties.short_code
      // y se suele expresar como "us", "es", "mx", etc.
      // Si no existe, tratamos de obtenerla del "id", que suele ser "country.us", etc.
      const code = feature.properties?.short_code
        ? feature.properties.short_code.toUpperCase()
        : feature.id.split('.')[1]?.toUpperCase() || ''

      return {
        codeCountry: code,
        translateCountry: {
          // Usamos place_name en español; si quisieras algo más corto,
          // podrías usar feature.text (depende de tu preferencia).
          es: feature.place_name
        }
      }
    })
  } catch (error) {
    console.error('Error en la búsqueda de países:', error)
    return []
  }
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue','selectedCountryCode'])

// Data principal
const searchQuery = ref(props.modelValue ?? '')
const countries = ref([])           // aquí guardamos los resultados "crudos" de Mapbox
const uniqueCountries = ref([])      // aquí iremos depurando duplicados
const currentLanguage = ref('es')
const isDropdownOpen = ref(false)
const hasError = ref(false)
const isSelecting = ref(false)
const isFocused = ref(false)

// Este computed sigue la lógica antigua para quitar duplicados según codeCountry.
const filteredCountries = computed(() => {
  // Primero quitamos duplicados basándonos en codeCountry
  uniqueCountries.value = Array.from(
    new Map(countries.value.map(c => [c.codeCountry, c])).values()
  )

  // Si no hay texto en el input, devolvemos todo
  if (!searchQuery.value) {
    return uniqueCountries.value
  }

  // Normalizamos para filtrar localmente (en caso de que quieras filtrar adicionalmente)
  const query = searchQuery.value.trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return uniqueCountries.value.filter(country => {
    const countryName = country.translateCountry[currentLanguage.value]
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    return countryName.includes(query)
  })
})

// Evento al escribir en el input
const handleInput = async () => {
  isDropdownOpen.value = true
  hasError.value = false

  // Llamamos a Mapbox solo si hay algo que buscar
  if (searchQuery.value.trim()) {
    countries.value = await fetchCountriesFromMapbox(searchQuery.value.trim())
  } else {
    countries.value = []
  }
}

// Validación al presionar Enter
const handleEnter = () => {
  validateInput()
  isDropdownOpen.value = false
}

// Validación al perder foco
const handleBlur = () => {
  isFocused.value = false
  // Solo si no está haciendo clic en una opción
  if (!isSelecting.value) {
    validateInput()
    isDropdownOpen.value = false
  }
}

const handleFocus = () => {
  isDropdownOpen.value = true
  isFocused.value = true
}

// Verifica si el país realmente existe en la lista
const validateInput = () => {
  // Quitamos espacios en blanco
  searchQuery.value = searchQuery.value.trim()

  const selectedCountry = uniqueCountries.value.find(country =>
    country.translateCountry[currentLanguage.value].toLowerCase() === searchQuery.value.toLowerCase()
  )

  if (selectedCountry) {
    emit('selectedCountryCode', selectedCountry.codeCountry)
    emit('update:modelValue', selectedCountry.translateCountry[currentLanguage.value])
    hasError.value = false
  } else {
    // Si no lo encuentra, establecemos un código por defecto o lo que se requiera.
    emit('selectedCountryCode', 'ES')
    emit('update:modelValue', null)
    hasError.value = true
  }
}

// Cuando el usuario hace clic en una opción del dropdown
const selectCountry = (countryName, fullData) => {
  isSelecting.value = true
  searchQuery.value = countryName

  emit('selectedCountryCode', fullData.codeCountry)
  emit('update:modelValue', countryName)
  hasError.value = false
  isDropdownOpen.value = false

  // Pequeño delay para que el blur no cierre el menú
  setTimeout(() => {
    isSelecting.value = false
  }, 100)
}
</script>

<style scoped>
input::placeholder {
  color: #A0A0A0;
  font-family: Lato;
  font-size: 14px;
  font-weight: 500;
  line-height: 10px;
}
</style>

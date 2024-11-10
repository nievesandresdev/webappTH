<template>
  <div class="relative w-full h-[337px] shadow-md border-b border-white rounded-b-[20px] overflow-hidden" @touchstart="touchStart" @touchend="touchEnd">
    <!-- Botón de regresar -->
    <button
      v-show="showButtonBack"
      class="inline-flex items-center gap-2 p-1 absolute top-2 left-2 z-10 rounded-lg border border-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md cursor-pointer"
      @click="goBack"
    >
      <img src="/assets/icons/WA.chevron.svg" alt="Back Icon" />
    </button>

    <div
      v-for="(image, index) in formattedImages"
      :key="image.id"
      class="w-full h-full bg-cover bg-center absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
      :style="{ backgroundImage: `url(${image.url})` }"
      v-show="currentSlide === index"
    >
    </div>

    <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="w-2.5 h-2.5 bg-transparent border-2 border-white rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
        :class="{ 'bg-white': currentSlide === index }"
        @click="setSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'

// Recibir la lista de imágenes como una prop
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  facility: {
    type: Object,
    required: true
  },
  showButtonBack: {
    type: Boolean,
    default: false
  }
})

// Función para formatear las URLs de las imágenes
const $formatImage = (payload) => {
  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
  let { url, type, urlDefault } = payload

  if (url && url.startsWith("blob:")) return url

  if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg'

  if (urlDefault) return url

  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
  type = type ?? type_d

  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url
}

const formattedImages = computed(() => {
  return props.images?.map(image => ({
    ...image,
    url: $formatImage(image)
  }))
})

const currentSlide = ref(0)
let startX = 0

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % formattedImages.value.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + formattedImages.value.length) % formattedImages.value.length
}

function setSlide(index) {
  currentSlide.value = index
}

function touchStart(event) {
  startX = event.touches[0].clientX
}

function touchEnd(event) {
  const endX = event.changedTouches[0].clientX
  const diff = startX - endX

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

function goBack() {
  window.history.back()
}
</script>

<style scoped>
.slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease;
}
</style>

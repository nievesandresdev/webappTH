<template>
  <div class="slider-container" @touchstart="touchStart" @touchend="touchEnd">
    <div
      v-for="(image, index) in formattedImages"
      :key="image.id"
      class="slide"
      :style="{ backgroundImage: `url(${image.url})` }"
      v-show="currentSlide === index"
    >
      <!-- Imagen de fondo completa en cada slide -->
    </div>
    <div class="controls">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="control-btn"
        :class="{ active: currentSlide === index }"
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
  }
})

// Función para formatear las URLs de las imágenes
const $formatImage = (payload) => {
  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
  let { url, type, urlDefault } = payload

  // Verifica si la URL es de tipo `blob:` (preview imagen)
  if (url && url.startsWith("blob:")) return url

  if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg'

  if (urlDefault) return url

  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
  type = type ?? type_d

  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url
}

// Usamos computed para procesar las imágenes con $formatImage
const formattedImages = computed(() => {
  return props.images.map(image => ({
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
</script>

<style scoped>
.slider-container {
  width: 100%;
  height: 337px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #FFF;
}

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

.controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.control-btn {
  width: 10px;
  height: 10px;
  background-color: transparent;
  border: 2px solid #FFF;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

.control-btn.active {
  background-color: #FFF;
}

.control-btn:hover {
  opacity: 1;
}
</style>

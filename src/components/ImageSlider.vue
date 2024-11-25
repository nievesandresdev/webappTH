<template>
  <div class="relative w-full h-[337px] shadow-md border-b border-white rounded-b-[20px] overflow-hidden mockup:w-mockup mockup:h-mockup" @touchstart="touchStart" @touchend="touchEnd">
    <!-- Botón de Regreso -->
    <button
      v-show="showButtonBack"
      class="inline-flex items-center gap-2 p-1 absolute top-2 left-2 z-10 rounded-lg border border-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md cursor-pointer"
      @click="goBack"
    >
      <img src="/assets/icons/WA.chevron.svg" alt="Back Icon" />
    </button>

    <!-- Imágenes del Carrusel -->
    <div
      v-for="(image, index) in formattedImages"
      :key="index"
      class="w-full h-full bg-cover bg-center absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
      :style="{ backgroundImage: `url(${image.url})` }"
      v-show="currentSlide === index"
    >
    </div>

    <!-- Puntos de Paginación -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(imageIndex, position) in positionMap"
        :key="position"
        class="w-2.5 h-2.5 border border-white rounded-full transition-colors duration-300 ease-in-out"
        :class="{
          'bg-white': imageIndex !== null && Math.round(currentSlide) === imageIndex,
          'bg-transparent cursor-pointer': imageIndex !== null,
          'cursor-default opacity-50': imageIndex === null
        }"
        @click="setSlide(imageIndex)"
        :disabled="imageIndex === null"
        :aria-label="imageIndex !== null ? `Ir a la imagen ${imageIndex + 1}` : 'Sin imagen'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

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
});

// Función para formatear las URLs de las imágenes
const $formatImage = (payload) => {
  if (typeof payload === 'string') {
    return payload; // Retorna la cadena directamente
  }

  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
  let { url, type, urlDefault } = payload;

  if (url && url.startsWith("blob:")) return url;

  if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg';

  if (urlDefault) return url;

  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
  type = type ?? type_d;

  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};

// Array de imágenes formateadas
const formattedImages = computed(() => {
  return props.images?.map(image => {
    const formattedUrl = $formatImage(image);
    return {
      url: formattedUrl
    };
  });
});

const currentSlide = ref(0);
let startX = 0;

// Mapeo de posiciones para los puntos de paginación
const positionMap = computed(() => {
  const numImages = formattedImages.value.length;
  let map = [];

  if (numImages >= 4) {
    // Distribuir imágenes uniformemente a los 4 círculos
    const step = (numImages - 1) / 3; // Dividido en 3 intervalos
    map = [
      0,
      Math.round(step * 1),
      Math.round(step * 2),
      numImages - 1
    ];
  } else if (numImages === 3) {
    // Saltar la segunda posición
    map = [0, null, 1, 2];
  } else if (numImages === 2) {
    // Saltar la segunda y tercera posición
    map = [0, null, null, 1];
  } else if (numImages === 1) {
    // Solo una imagen en la primera posición
    map = [0, null, null, null];
  } else {
    // Sin imágenes
    map = [null, null, null, null];
  }

  return map;
});

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % formattedImages.value.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + formattedImages.value.length) % formattedImages.value.length;
}

function setSlide(imageIndex) {
  if (imageIndex !== null) {
    currentSlide.value = imageIndex;
  }
}

function touchStart(event) {
  startX = event.touches[0].clientX;
}

function touchEnd(event) {
  const endX = event.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

function goBack() {
  window.history.back();
}
</script>

analiza ese componente llamado ImageSlider.vue
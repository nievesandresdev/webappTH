<template>
  <div class="relative w-full shadow-md border-b border-white rounded-b-[20px] overflow-hidden  h-[200px] sp:h-[337px]" @touchstart="touchStart" @touchend="touchEnd" :class="{ 'mt-[0px]': showButtonBack ,'mt-[75px]': !showButtonBack}">
    <button
      v-show="showButtonBack"
      class="inline-flex items-center gap-2 p-1 w-[25px] h-[25px] sp:w-auto sp:h-auto absolute top-2 left-2 z-10 rounded-lg border border-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md cursor-pointer ease-in-out"
      @click="goBack"
    >
      <img src="/assets/icons/WA.chevron.svg" alt="Back Icon" />
    </button>

    <button
      v-show="showButtonShared"
      class="inline-flex items-center gap-2 p-1 w-[25px] h-[25px] sp:w-auto sp:h-auto absolute top-2 right-2 z-10 rounded-lg border border-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md cursor-pointer ease-in-out"
      @click="isModalShareOpen"
    >
      <img src="/assets/icons/arrow-up-from-bracket.svg" alt="Share Icon" />
    </button>

    <img
      v-for="(image, index) in imagesComplete"
      :key="image.id"
      :src="image"
      class="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
      :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
    />


    <div
      v-if="images.length > 1"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
    >
      <button
        v-for="(dot, index) in visibleDots"
        :key="index"
        class="sp:w-2.5 sp:h-2.5 w-[6px] h-[6px] bg-transparent border border-white rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
        :class="{ 'bg-white': currentDotIndex === index }"
        @click="setSlide(dot.realIndex)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import router from '@/router';
import { useShare } from "@/composables/useShare";
const { shareContent } = useShare();
const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: ['/storage/gallery/general-1.jpg']
  },
  facility: {
    type: Object,
    required: true
  },
  showButtonBack: {
    type: Boolean,
    default: false
  },
  showButtonShared: {
    type: Boolean,
    default: false
  },
  imgDefault: {
    type: String,
    default: '/storage/gallery/general-1.jpg'
  },
  from: {
    type: String,
    default: null
  },
  nameShared: {
    type: String,
    default: null
  },
  typeShared: {
    type: String,
    default: 'hotel'
  },
  msgShared: {
    type: String,
    default: 'Regístrate en nuestra estancia y echa un vistazo a esta instalación de nuestro hotel en su WebApp'
  }
})



const $formatImage = (payload) => {
  
  let { url, type, urlDefault } = payload

  if (url && url.startsWith("blob:")) return url

  if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg'

  if (urlDefault) return url

  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
  type = type ?? type_d

  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url
}

const imagesComplete = computed(() => {
  //return props.images.map(image => $formatImage(image))
  return props.images.length === 0 ? [URL_STORAGE+props.imgDefault] : props.images;
})

const formattedImages = computed(() => {
  return props.images?.map(image => ({
    ...image,
    url: $formatImage(image)
  }))
})

const currentSlide = ref(0)
const maxDots = 4 // Maximum number of dots to display

const currentDotIndex = computed(() => {
  if (props.images.length <= maxDots || currentSlide.value < 2) {
    return currentSlide.value
  } else if (currentSlide.value >= props.images.length - 1) {
    return maxDots - 1
  } else {
    return 2
  }
})

const visibleDots = computed(() => {
  if (props.images.length > maxDots) {
    const start = Math.max(0, Math.min(currentSlide.value - 2, props.images.length - maxDots))
    return props.images.slice(start, start + maxDots).map((image, index) => ({
      ...image,
      realIndex: start + index
    }))
  }
  return props.images.map((image, index) => ({
    ...image,
    realIndex: index
  }))
})

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


  if(props.from === 'facility' && window.history.state?.back === null){
    router.push({
      name: 'FacilityList',
    })
  }else if(props.from === 'experiences' && window.history.state?.back === null){
    router.push({
      name: 'ExperienceList',
    })
  }else if(props.from === 'places' && window.history.state?.back === null){
    router.push({
      name: 'PlaceList',
    })

  }else if (window.history.state?.back) {
    window.history.back();
  }

  /* if (window.history.state?.back) {
    window.history.back();
  } else {
    window.location.href = '/ruta-especifica'; // Cambia '/ruta-especifica' por la URL deseada
  } */
}

function isModalShareOpen () {
    let data = {
        title: props.nameShared,
        text: props.msgShared,
        url: window.location.href,
        combineTitle: true
    }
    shareContent(data);
};


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

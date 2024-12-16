<template>
  <div ref="carousel" class="carousel-container overflow-x-auto pb-4" :class="{'mb-[55px]' : !marginBotton}" @scroll="saveScrollPosition">
    <div class="flex gap-4 w-max">
      <div
        v-for="d in data"
        :key="d.id"
        class="flex flex-col justify-center w-[253px] h-[232px] rounded-[20px] border border-white shadow-lg bg-gradient-h"
        style="box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);"
        @click="handleClick(d)"
      >
        <div class="relative w-full h-full rounded-t-[20px] overflow-hidden">
          <img 
            :src="$formatImage({ url: d.image?.url || '', type: d.image?.type })" 
            alt="Image" 
            class="w-full h-full"
            :class="cover ? 'object-cover' : 'object-fill'" 
          />
          <div v-if="d.ad_tag" class="absolute bottom-2 left-2 flex items-center justify-center gap-1 px-2 py-1 text-white bg-[#FAFAFA] border border-white shadow-lg rounded-[18px]" style="box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);">
            <p class="text-[12px] font-bold lato text-[#333] uppercase">{{ d.ad_tag }}</p>
          </div>
        </div>
        <p class="text-[14px] font-bold text-[#333] lato px-4 pt-4 mb-4 card-text flex justify-start">
          {{ truncateText(d.title) }}

        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel'

const emit = defineEmits(['itemClick']);

const props = defineProps({
  data: Array,
  onClick: Function, 
  clickParams: {
    type: Object,
    default: () => ({}) 
  },
  marginBotton: Boolean,
  cover: Boolean
});

const hotelStore = useHotelStore()
const hotelData = computed(() => hotelStore.hotelData)

const carousel = ref(null);

const saveScrollPosition = () => {
  if (carousel.value) {
    sessionStorage.setItem('carouselScrollPosition', carousel.value.scrollLeft);
  }
};

const restoreScrollPosition = () => {
  const savedPosition = sessionStorage.getItem('carouselScrollPosition');
  if (carousel.value && savedPosition) {
    carousel.value.scrollLeft = parseInt(savedPosition, 10);
  }
};

onMounted(() => {
  restoreScrollPosition();
});

const $formatImage = (payload) => {
  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
  let { url, type, urlDefault } = payload

  if (url && url.startsWith("blob:")) return url
  if (!url || !URL_STORAGE) return URL_STORAGE+hotelData.value.image
  if (urlDefault) return url

  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
  type = type ?? type_d

  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url
}


const handleClick = (item) => {
  emit('itemClick', item.id);
  if (props.onClick) {
    props.onClick(item, props.clickParams);
  }
};


const truncateText = (text) => { return text.length > 60 ? text.substring(0, 60)  : text; };
</script>

<style scoped>
.carousel-container {
  overflow-x: auto;
  scrollbar-width: none; 
 
}

.carousel-container::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}

.card-text {
  height: 70px;
  line-height: 1.5em;
  overflow: hidden;
  display: block;
  width: 100%;
  word-wrap: break-word;
}

</style>

<template>
  <div ref="carousel" class="carousel-container overflow-x-auto pb-4" @scroll="saveScrollPosition">
    <div class="flex gap-4 w-max">
      <div
        v-for="d in data"
        :key="d.id"
        class="flex flex-col items-center w-[232px] h-[212px] rounded-[20px] border border-white shadow-lg bg-gradient-h"
        style="box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);"
      >
        <div class="relative w-full h-32 rounded-t-[20px] overflow-hidden">
          <img 
            :src="$formatImage({ url: d.image?.url || '', type: d.image?.type })" 
            alt="Image" 
            class="w-full h-full object-cover" 
          />
          <div v-if="d.ad_tag" class="absolute bottom-2 left-2 flex items-center justify-center gap-1 px-2 py-1 text-white bg-[#FAFAFA] border border-white shadow-lg rounded-[18px]" style="box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);">
            <p class="text-[12px] font-bold lato text-[#333] uppercase">{{ d.ad_tag }}</p>
          </div>
        </div>
        <p class="text-[14px] font-bold text-[#333] lato px-4 pt-4 mb-4 card-text">
          {{ d.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  data : Object
});

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
  console.log(props.data);
});

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
  height: 4em;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

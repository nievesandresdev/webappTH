<template>
  <SectionBarTab 
    title="Instalaciones" 
    :tabs="[ 
      { name: 'Información', routeName: 'ShowHotel', icon: '/assets/icons/WA.alojamiento.svg' },
      { name: 'Instalaciones', routeName: 'FacilityList', icon: '/assets/icons/WA.Instalaciones.svg' }
    ]"
    :hotel="hotelData"
  />
  <div class="bg-[#FAFAFA] mb-[100px]">
    <div 
     class="px-4 space-y-4"
      :class="{
        'mt-[168px]' : hotelData.show_facilities == 1 && hotelData.show_profile == 1,
        'mt-[105px]' : hotelData.show_facilities == 0 || hotelData.show_profile == 0,
      }"
    >
      
      <div
        v-for="facility in facilities"
        :key="facility.id"
        @click="goToFacilityShow(facility.id)"
        class="flex flex-col rounded-lg border border-white shadow-md bg-gradient-to-r bg-gradient-100 cursor-pointer"
      >
        <div class="relative w-full h-[226px] rounded-t-lg overflow-hidden">
          <img
            v-if="facility.image"
            :src="$formatImage({ url: facility.image?.url || '', type: facility.image?.type })"
            alt="Facility Image"
            class="w-full h-full object-cover"
          />
          <div v-if="facility.ad_tag" class="absolute bottom-2 left-2 flex items-center justify-center gap-1 px-2 py-1 text-white bg-[#FAFAFA] border border-white shadow-lg rounded-[18px]" style="box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);">
            <p class="text-[12px] font-bold lato text-[#333] uppercase">{{ facility.ad_tag }}</p>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-[18px] font-bold lato">{{ facility.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
import SectionBarTab from '@/components/SectionBarTab.vue';
import { useHotelStore } from '@/stores/modules/hotel';

const hotelStore = useHotelStore();
const facilities = ref([]);

const hotelData = computed(() => hotelStore.hotelData);

const $formatImage = (payload) => {
  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
  let { url, type, urlDefault } = payload;

  if (url && url.startsWith("blob:")) return url;
  if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg';
  if (urlDefault) return url;

  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
  type = type ?? type_d;

  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};

const goToFacilityShow = (id) => {
  router.push({ name: 'ShowFacility', params: { id } });
};

onMounted(async () => {
  const response = await hotelStore.$getCrossellings();
  facilities.value = response.crosselling_facilities;
});
</script>

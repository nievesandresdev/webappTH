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
    <div class="px-4 space-y-4 mt-[168px] ">
      <div
        v-for="facility in facilities"
        :key="facility.id"
        class="flex flex-col rounded-lg border border-white shadow-md bg-gradient-to-r bg-gradient-100"
      >
        <img
          v-if="facility.image"
          :src="$formatImage({ url: facility.image?.url || '', type: facility.image?.type })"
          alt="Facility Image"
          class="w-full h-[226px] object-cover rounded-t-lg"
        />
        <div class="p-4">
          <h3 class="text-[18px] font-bold lato">{{ facility.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue';
import SectionBarTab from '@/components/SectionBarTab.vue';
import { useHotelStore } from '@/stores/modules/hotel';

const hotelStore = useHotelStore();
const facilities = ref([]);

const hotelData = computed(() => hotelStore.hotelData)

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



onMounted(async () => {
  const response = await hotelStore.$getCrossellings();
  facilities.value = response.crosselling_facilities;
});
</script>


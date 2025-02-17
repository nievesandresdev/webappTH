<template>

    <PageTransitionGlobal module="facility">

      <div class="bg-[#FAFAFA] mb-[50px] sp:mb-[100px]">
        <div
            class="px-2 sp:px-4 space-y-2 sp:space-y-4"
          :class="{
            'mt-[86px] sp:mt-[168px]' : hotelData?.show_facilities == 1 && hotelData?.show_profile == 1,
            'mt-[60px] sp:mt-[105px]' : hotelData?.show_facilities == 0 || hotelData?.show_profile == 0,
          }"
        >
          
          <div
            v-for="facility in facilities"
            :key="facility.id"
            @click="goToFacilityShow(facility.id)"
            class="flex flex-col rouded-[10px] sp:rounded-[20px] border border-white shadow-md bg-gradient-to-r bg-gradient-100 cursor-pointer"
          >
          
            <div class="relative w-full h-[110px] sp:h-[226px] rounded-t-lg overflow-hidden">
              <img
                :src="$formatImage({ url: facility.image?.url || '', type: facility.image?.type })"
                alt="Facility Image"
                class="w-full h-full object-cover"
              />

              <div v-if="facility.ad_tag" class="absolute bottom-1 sp:bottom-2 left-1 sp:left-2 flex items-center justify-center gap-0.5 sp:gap-1 px-1 sp:px-2 py-0.5 sp:py-1 text-white bg-[#FAFAFA] border border-white shadow-lg rounded-[9px] sp:rounded-[18px]" style="box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);">
                <p class="text-[7px] sp:text-[12px] font-bold lato text-[#333] uppercase">{{ facility.ad_tag }}</p>
              </div>
            </div>
            <div class="p-2 sp:p-4">
              <h3 class="text-[12px] sp:text-[18px] font-bold lato">{{ facility.title }}</h3>
            </div>
          </div>
        </div>
      </div>

    </PageTransitionGlobal>

</template>

<script setup>
import { ref, onMounted, computed, watch, provide, inject } from 'vue';
import router from '@/router';
import SectionBarTab from '@/components/SectionBarTab.vue';
import { useHotelStore } from '@/stores/modules/hotel';

import AppHeader from '@/layout/Components/AppHeader.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const hotelStore = useHotelStore();
const facilities = ref([]);

// import TransitionBook from '@/components/Transition/TransitionBook.vue';
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { isMockup } from '@/utils/utils.js'
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();

const hotelData = inject('hotelData');


const $formatImage = ({ url, type, urlDefault }) => {
  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;


  // Si no hay URL, intenta usar la imagen del hotel o una predeterminada
  if (!url) {
    const hotelImage = `${URL_STORAGE}${hotelData.value.image}`;
     
    return hotelImage;
  }

  // Si la URL comienza con "blob:", la retornamos directamente
  if (url.startsWith('blob:')) return url;

  // Si es de tipo CDN o tiene HTTPS, retornamos la URL directamente
  if (type === 'CDN' || url.includes('https://')) return url;

  // Si es de almacenamiento local, construimos la URL completa
  return `${URL_STORAGE}${url}`;
};



const goToFacilityShow = (id) => {
  router.push({ name: 'ShowFacility', params: { id } });
};

startLoading(SECTIONS.FACILITY.GLOBAL);
// onMounted(async () => {
//   // console.log('onMounted facility');
//   console.log(hotelData.value, 'hotelData.facility')
//   if (hotelData.value) {
  //   }
// });

watch(hotelData, (valueCurrent, valueOld) => {
  if (!valueOld && valueCurrent) {
    loadData();
  }
}, { immediate: true });

async function loadData () {
  const response = await hotelStore.$getCrossellings();
  facilities.value = response.crosselling_facilities;
  if (hotelStore.hotelData.show_facilities !== 1 && hotelStore.hotelData.show_profile === 1) {
    router.push({ name: 'ShowHotel', query: { mockup: isMockup() } });
  }
  if (hotelStore.hotelData.show_facilities !== 1 && hotelStore.hotelData.show_profile !== 1) {
    router.push({ name: 'Home', query: { mockup: isMockup() } });
  }
  stopLoading(SECTIONS.FACILITY.GLOBAL);
}

function changeTab (r) {
  router.push({ name: r });
}
</script>

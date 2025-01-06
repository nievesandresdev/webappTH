<template>
  <!-- <SectionBarTab 
    :title="$t('hotel.facilities')" 
    :tabs="[ 
       { name: $t('hotel.information'), routeName: 'ShowHotel', icon: '/assets/icons/WA.alojamiento.svg' },
       { name: $t('hotel.facilities'), routeName: 'FacilityList', icon: '/assets/icons/WA.Instalaciones.svg' }
    ]"
    :hotel="hotelData"
  /> -->
  <AppHeader
    :title="hotelData.show_profile == 1 ? hotelData.type : 'Instalaciones'"
    :tabs="tabs.tabsHeader"
    fixed
  />

  <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />

  <div class="bg-[#FAFAFA] mb-[50px] sp:mb-[100px]">
    <div 
     class="px-2 sp:px-4 space-y-2 sp:space-y-4"
      :class="{
        'mt-[86px] sp:mt-[168px]' : hotelData.show_facilities == 1 && hotelData.show_profile == 1,
        'mt-[60px] sp:mt-[105px]' : hotelData.show_facilities == 0 || hotelData.show_profile == 0,
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
import SectionBarTab from '@/components/SectionBarTab.vue';
import { useHotelStore } from '@/stores/modules/hotel';
import { useTabs } from '@/stores/modules/tabs'; 

import AppHeader from '@/layout/Components/AppHeader.vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

const hotelStore = useHotelStore();
const facilities = ref([]);

const tabs = useTabs(); 

const hotelData = computed(() => hotelStore.hotelData);

const tabsHeader = ref([]);

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

onMounted(async () => {
  const response = await hotelStore.$getCrossellings();
  facilities.value = response.crosselling_facilities;
   //if(tabs.tabsHeader.length === 0){
    loadTabsHeader();
  //}
});

function loadTabsHeader () {
    const tabInformation = {
      title: t('hotel.information'),
      exclude: hotelData.show_profile,
      iconDefault: 'WA.alojamiento',
      iconSelected: `WA.alojamiento`,
      routeName: 'ShowHotel',
      isActive: router.currentRoute.value.name === 'ShowHotel',
      onClick: () => changeTab('ShowHotel'),
    }
    const tabFacility = {
      title: t('hotel.facilities'),
      exclude: hotelData.show_facility,
      iconDefault: 'WA.Instalaciones',
      iconSelected: `WA.Instalaciones`,
      routeName: 'FacilityList',
      isActive: router.currentRoute.value.name === 'FacilityList',
      onClick: () => changeTab('FacilityList'),
    }
    tabsHeader.value  = [tabInformation, tabFacility];
    // tabsHeader.value = typeplaces.value.map(item => {
    //     return {
    //         title: $t('hotel.information'),
    //         exclude: false,
    //         iconDefault: `${item.icon}`,
    //         iconSelected: `${item.icon}.DEFAULT`,
    //         isActive: item.id == formFilter.typeplace,
    //         onClick: () => changeCategory([], item.id),
    //     };
    // });

    tabs.setTabsHeader([tabInformation, tabFacility]);
}

function changeTab (r) {
  router.push({ name: r });
}
</script>

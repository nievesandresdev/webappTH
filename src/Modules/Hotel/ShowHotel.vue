<template>
  <SectionBarTab 
    :title="hotelData.show_profile == 1 ? hotelData.type : 'Instalaciones'" 
    :tabs="[
      { name: 'Información', routeName: 'ShowHotel', icon: '/assets/icons/WA.alojamiento.svg' },
      { name: 'Instalaciones', routeName: 'FacilityList', icon: '/assets/icons/WA.Instalaciones.svg' }
    ]"
    :hotel="hotelData"
  />
  <div 
      class="bg-[#FAFAFA]"
      :class="{
        'mt-[140px]' : hotelData.show_facilities == 1 && hotelData.show_profile == 1,
        'mt-[60px]' : hotelData.show_facilities == 0 || hotelData.show_profile == 0,
      }"
    >
    <!-- Slider de imágenes -->
    <ImageSlider :images="hotelData.images" />

    <div class="flex flex-col mt-2 px-4">
      <h1 class="lato text-[18px] font-bold text-[#333] mb-[7px]">
        {{ hotelData.name }}
      </h1>

      <StarRating v-if="hotelData.category !== null" :category="hotelData.category" />

      <p
        :class="isExpanded ? 'text-sm font-normal lato text-[#333] mt-3' : 'text-sm font-normal lato text-[#333] truncate-description mt-3'"
      >
        {{ hotelData.description }}
      </p>

      <p
        @click="isExpanded = !isExpanded"
        class="text-[14px] font-bold lato underline text-[#333] mt-3 text-right cursor-pointer"
      >
        {{ isExpanded ? 'Ver menos' : 'Ver más' }}
      </p>

      <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div>

      <HotelActionButtons
        :hotelData="hotelData"
        :buttonsHome="hotelData.buttons_home"
        @wifi-click="handleWifi"
        @call-click="handleCall"
        @legal-click="handleLegalText"
        @share-click="isModalOpen = true"
      />

      <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div>
        
      <HotelInfoGeneral :hotelData="hotelData" />

      <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div>

      <div class="flex items-center gap-4 mb-4">
        <p class="text-[16px] font-bold text-[#333333] lato">Instalaciones</p>
        <div class="border-t border-[#E9E9E9] flex-grow ml-2"></div>
        <span @click="goToFacilities()" class="underline lato text-sm font-bold">Ver todo</span>
      </div>

      <CardSlider :data="facilities" @itemClick="handleGoFacility"  />

      <div class="flex items-center gap-4 mb-4">
        <p class="text-[16px] font-bold text-[#333333] lato">Nuestras redes</p>
        <div class="border-t border-[#E9E9E9] flex-grow ml-2"></div>
      </div>
      

      <HotelRRSS :hotelData="hotelData" />

    </div>
  </div>

  <!-- Modal de Wifi -->
  <BottomModal :isOpen="modalWifi && !$utils.isMockup()" @update:isOpen="modalWifi = $event">
    <div class="flex flex-col items-start">
      <div class="flex items-center gap-1 mb-4 lato">
        <img src="/assets/icons/WA.wifi.svg" class="w-8 h-8 text-[#333333]" alt="WiFi Icon" />
        <p class="text-[20px] font-bold text-[#333333] lato">Wifi</p>
      </div>
    </div>
    <div class="flex items-center justify-center p-8 gap-2 rounded-[20px] border border-[#E9E9E9] bg-gradient-h h-full">
      <p class="text-[16px] text-[#333333] font-semibold text-center lato">
        El alojamiento cuenta con servicio de internet WiFi gratuito
      </p>
    </div>
  </BottomModal>

  <!-- Políticas y Normas -->
  <BottomModal :isOpen="modalLegal && !$utils.isMockup()" @update:isOpen="modalLegal = $event">
    <div class="flex flex-col items-start">
      <div class="flex items-center gap-1 mb-4 lato">
        <img src="/assets/icons/WA.normas.svg" class="w-8 h-8 text-[#333333]" alt="Normas Icon" />
        <p class="text-[20px] font-bold text-[#333333] lato">Políticas y Normas</p>
      </div>
    </div>
    <div v-for="policie in hotelData.policies" :key="policie" class="p-4 gap-2 rounded-[20px] border border-[#E9E9E9] bg-gradient-h h-full space-y-4 mb-4">
      <div class="text-[#333333] text-sm">
        <p class="font-bold mb-2 lato text-[16px]">{{ policie.title }}</p>
        <p class="font-normal text-sm lato">{{ policie.description }}</p>
        <div class="border-t border-[#E9E9E9] my-2" v-show="policie.penalization == 1"></div>
        <p v-show="policie.penalization == 1">
          <span class="font-bold lato text-sm">Penalización: </span>
          <span class="font-normal lato text-sm">{{ policie.penalization_details }}</span>
        </p>
      </div>
    </div>
  </BottomModal>

  <!-- Compartir Estancia -->
  <ShareStayModal />
</template>

<script setup>
import ImageSlider from '@/components/ImageSlider.vue'
import StarRating from './Components/StarRating.vue'
import HotelActionButtons from './Components/HotelActionButtons.vue'
import HotelRRSS from './Components/HotelRRSS.vue'
import HotelInfoGeneral from './Components/HotelInfoGeneral.vue'
import CardSlider from '@/components/CardSlider.vue'
import BottomModal from '@/Modules/User/Components/BottomModal.vue'
import { useHotelStore } from '@/stores/modules/hotel'
import { computed, ref, onMounted,provide } from 'vue'
import SectionBarTab from '@/components/SectionBarTab.vue';
import ShareStayModal from '@/Modules/User/Components/ShareStayModal.vue'
import router from '@/router'

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();

const isModalOpen = ref(false);


const hotelStore = useHotelStore()
const hotelData = computed(() => hotelStore.hotelData)

const isExpanded = ref(false)
const modalWifi = ref(false)
const modalLegal = ref(false)
const facilities = ref([]);

const stayData = ref({})
const shareUrl = ref('')



const handleCall = () => {
  if (hotelData.value.phone) {
    window.open(`tel:${hotelData.value.phone}`)
  } else {
    console.warn('Número de teléfono no disponible.')
  }
}

const handleWifi = () => {
  modalWifi.value = true
}

const handleLegalText = () => {
  modalLegal.value = true
}



onMounted(async() => {
  const r = await hotelStore.$getCrossellings()
  
  facilities.value =  r.crosselling_facilities;

  stayData.value = stayStore.getLocalStay();
  shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData.subdomain,null,`e=${stayData.value.id}`);
  

  if (hotelStore.hotelData.show_profile !== 1) {
    // Redirigir a FacilityList si show_profile es 0
    router.push({ name: 'FacilityList' })
  }

})

const handleGoFacility = (id) => {
  router.push({ name: 'ShowFacility', params: { id } });
};


const goToFacilities = () => {
  router.push({ name: 'FacilityList' })
}

provide('isModalOpen',isModalOpen)

</script>

<style scoped>

.card-text {
  height: 4em; /* Limita a dos líneas */
  line-height: 1.5em; /* Altura de cada línea */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

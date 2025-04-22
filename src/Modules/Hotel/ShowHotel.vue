<template>
      <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
        <PageTransitionGlobal module="hotel">
        
          <div
              class="bg-[#FAFAFA] pb-[100px]"
              :class="{
                'mt-[65px] sp:mt-[135px]' : hotelData?.show_facilities == 1 && hotelData?.show_profile == 1,
                'mt-[25px] sp:mt-[55px]' : hotelData?.show_facilities == 0 || hotelData?.show_profile == 0,
              }"
          >
            <!-- Slider de imágenes -->
            <!-- <ImageSlider :images="hotelData.images" /> -->
            <ImageSlider :images="hotelInfo?.images?.map(item=> hotelStore.$loadImage(item)) ?? []" />

            <div class="flex flex-col  mt-1 sp:mt-2 px-2 sp:px-4">
              <h1 class="lato text-[14px]  sp:text-[18px] font-bold text-[#333] mb-[4px] sp:mb-[7px]">
                {{ hotelData?.name }}
              </h1>


              <StarRating v-if="hotelInfo?.category !== null" :category="hotelInfo?.category" />

              <p
                :class="isExpanded ? 'text-[10px] sp:text-sm font-normal lato text-[#333] mt-2 sp:mt-3' : 'text-[10px] sp:text-sm font-normal lato text-[#333] truncate-description mt-2 sp:mt-3'"
              >
                {{localeStore.localeCurrent == 'es' ? hotelInfo?.description : hotelInfo?.translate?.description}}
              </p>

              <p
                @click="isExpanded = !isExpanded"
                class="text-[10px] sp:text-[14px] font-bold lato underline text-[#333] mt-2 sp:mt-3 text-right cursor-pointer"
                v-show="hotelInfo?.description?.length > CHARACTER_LIMIT"
              >
                {{ isExpanded ? $t('hotel.utils.see_less') : $t('hotel.utils.see_more') }}
              </p>

              <div class="border-t my-3 sp:my-6 border-[#E9E9E9]"></div>

              <HotelActionButtons
                :hotelData="hotelInfo"
                :buttonsHome="true"
                :dataWifi="dataWifi"
                @wifi-click="handleWifi"
                @call-click="handleCall"
                @legal-click="handleLegalText"
                @share-click="isModalOpen = true"
              />
              
              <!--HORARIOS DE CHECKIN Y CHECKOUT-->
              <HotelCheckInOut :hotelData="hotelInfo" v-if="hotelInfo?.checkin && hotelInfo?.checkout" /> 
              
              <!--DATA GENERAL DEL HOTEL-->
              <HotelInfoGeneral :hotelData="hotelInfo" /> 
            </div>
            

              <!-- seccion de instalaciones -->
              <div class="flex flex-col  mt-1 sp:mt-2 px-4 sp:px-4" v-show="hotelData?.show_facilities === 1">
                <div class="border-t my-3 sp:my-6 border-[#E9E9E9]"></div>

                <div class="flex items-center gap-2 sp:gap-4" v-show="hotelData?.show_facilities === 1" >
                  <p class="text-[16px] font-bold text-[#333333] lato">{{ $t('hotel.facilities') }}</p>
                  <div class="border-t border-[#E9E9E9] flex-grow ml-1 sp:ml-2"></div>
                  
                  <span @click="goToFacilities()" class="underline lato text-[8px] sp:text-sm font-bold">{{ $t('hotel.utils.see_all') }}</span>
                </div>
              </div>
              <CarouselFacilities id="1" :items="facilities" v-show="hotelData?.show_facilities === 1"/>
              <!-- fin seccion instalaciones -->

              <!-- Redes Sociales -->
              <div class="flex flex-col mt-1 sp:mt-2 px-2 sp:px-4">
                  <template  v-if="rrss">
                  <div class="flex items-center gap-4 mb-4">
                    <p class="text-[16px] font-bold text-[#333333] lato">{{ $t('hotel.utils.our_networks') }}</p>
                    <div class="border-t border-[#E9E9E9] flex-grow ml-2"></div>
                  </div >
                  <HotelRRSS :hotelData="hotelInfo" />
                </template>
              </div>
              <!-- fin redes sociales-->
          </div>

          <!-- Modal de Wifi -->
          <BottomModal 
            :isOpen="modalWifi && !$utils.isMockup() || showWifiModal" 
            @update:isOpen="modalWifi = $event"
            :scrollContentOnly="true"
          >
            <!-- Encabezado fijo -->
            <template #header>
              <div class="flex items-center gap-1 lato">
                <img src="/assets/icons/WA.wifi.svg" class="w-4 sp:w-8 h-4 sp:h-8 text-[#333333]" alt="WiFi Icon" />
                <p class="text-base sp:text-[20px] font-bold text-[#333333] lato">{{ $t('home.wifi.title') }}</p>
              </div>
            </template>

            <!-- Contenido scrolleable -->
            <div 
              v-for="data in getDataWifi" :key="data.id" 
              v-show="data.visible == 1" 
              class="flex p-2 sp:p-4 gap-1 sp:gap-2 rounded-[6px] sp:rounded-[10px] border border-[#E9E9E9] bg-gradient-h h-full mb-2 sp:mb-4"
            >
              <p class="text-[16px] text-[#333333] flex flex-col gap-1 sp:gap-2">
                <div class="flex">
                  <span class="font-bold lato text-[10px] sp:text-[14px]">{{ $t('home.wifi.red') }}</span>
                  <span class="font-normal lato text-[10px] sp:text-[14px] ml-1"> {{ data?.name ?? '' }}</span>
                </div>
                <hr>
                <div class="flex">
                  <span class="font-bold lato text-[10px] sp:text-[14px]">{{ $t('home.wifi.password') }}: </span>
                  <div class="flex justify-between w-full" v-if="data?.password">
                    <span class="font-normal lato text-[10px] sp:text-[14px] ml-1" > {{ data?.password }}</span>
                    <div class="flex gap-1 sp:gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.address)">
                      <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
                    </div>
                  </div>
                  <span class="font-normal lato text-[10px] sp:text-[14px] italic ml-1" v-else-if="data?.name?.trim()">  {{ $t('home.wifi.noPassword') }}</span>
                </div>
              </p>
            </div>
          </BottomModal>

          <!-- Políticas y Normas -->
          <BottomModal :isOpen="modalLegal && !$utils.isMockup()" @update:isOpen="modalLegal = $event" :scrollContentOnly="true">
              <template #header>
                <div class="flex items-center gap-1 lato">
                  <img src="/assets/icons/WA.normas.svg" class="w-8 h-8 text-[#333333]" alt="Normas Icon" />
                  <p class="text-[20px] font-bold text-[#333333] lato">{{ $t('home.policies.title') }}</p>
                </div>
              </template>
            <div v-for="policie in hotelInfo.policies" :key="policie" class="p-4 gap-2 rounded-[10px] border border-[#E9E9E9] bg-gradient-h h-full space-y-4 mb-4">
              <div class="text-[#333333] text-sm">
                <p class="font-bold mb-2 lato text-[16px]">{{ policie.title }}</p>
                <p class="font-normal text-sm lato">{{ policie.description }}</p>
                <div class="border-t border-[#E9E9E9] my-2" v-show="policie.penalization == 1"></div>
                <p v-show="policie.penalization == 1">
                  <span class="font-bold lato text-sm">{{ $t('home.policies.penalization') }}: </span>
                  <span class="font-normal lato text-sm">{{ policie.penalization_details }}</span>
                </p>
              </div>
            </div>
          </BottomModal>

          <!-- Compartir Estancia -->
          <ShareStayModal />

        </PageTransitionGlobal>

</template>

<script setup>
import { computed, ref, onMounted, inject, provide, watch } from 'vue';

// COMPONENTS
import ImageSlider from '@/components/ImageSlider.vue'
import StarRating from './Components/StarRating.vue'
import HotelActionButtons from './Components/HotelActionButtons.vue'
import HotelRRSS from './Components/HotelRRSS.vue'
import HotelInfoGeneral from './Components/HotelInfoGeneral.vue'
import HotelCheckInOut from './Components/HotelCheckInOut.vue'
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import { useHotelStore } from '@/stores/modules/hotel'
import { useLocaleStore } from '@/stores/modules/locale'
import ShareStayModal from '@/Modules/User/Components/ShareStayModal.vue'
import CarouselFacilities from '@/Modules/Home/Components/CarouselFacilitiesRed.vue'
// import TransitionBook from '@/components/Transition/TransitionBook.vue';

import router from '@/router'

import { getUrlParam } from '@/utils/utils.js';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { isMockup } from '@/utils/utils.js'

import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();

//legal
import { useLegalStore } from '@/stores/modules/legal';
const legalStore = useLegalStore();

import { useStayStore } from '@/stores/modules/stay';
import AppHeader from '@/layout/Components/AppHeader.vue';
const stayStore = useStayStore();
const localeStore = useLocaleStore()


import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();


const isModalOpen = ref(false);

const CHARACTER_LIMIT = 185;


const hotelStore = useHotelStore()

const isExpanded = ref(false)
const modalWifi = ref(false)
const modalLegal = ref(false)
const facilities = ref([]);
const dataWifi = ref([]);

const stayData = ref({})
const shareUrl = ref('')

const hotelData = inject('hotelData');
const hotelInfo = ref({})

const handleCall = () => {

  if (hotelInfo.value.phone) {
    window.open(`tel:${hotelInfo.value.phone}`)
  } else {
    console.warn('Número de teléfono no disponible.')
  }
}

const handleWifi = async() => {
  modalWifi.value = true
}

const handleLegalText = async() => {
  modalLegal.value = true
  /* const r = await legalStore.$getNormsByHotel()
  console.log(r, 'r'); */
}


startLoading(SECTIONS.HOTEL.GLOBAL);
onMounted(async() => {
  // console.log(hotelData.value, 'hotelData.hotel');
  // console.log('onMounted hotel');
    // if (hotelData.value) {
      // loadData(); 
    // }
    const r = await hotelStore.$getAllWifiByHotelAndVisible()
    dataWifi.value = r.data
})

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

async function loadData () {
  // await hotelStore.$load(true)
  const r = await hotelStore.$getCrossellings()
  
  facilities.value =  r.crosselling_facilities;

  stayData.value = stayStore.getLocalStay();
  shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayData.value?.id}&guestPerStay=true`);
  hotelInfo.value = await hotelStore.$findByParamsApi(hotelStore.hotelData?.id)
  

  if (hotelStore.hotelData.show_facilities === 1 && hotelStore.hotelData.show_profile !== 1) {
    router.push({ name: 'FacilityList', query: { mockup: isMockup() } });
  }
  if (hotelStore.hotelData.show_facilities !== 1 && hotelStore.hotelData.show_profile !== 1) {
    router.push({ name: 'Home', query: { mockup: isMockup() } });
  }
  stopLoading(SECTIONS.HOTEL.GLOBAL);
}

const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toastSuccess(t('messageRequest.copiedClipboard'));
    }).catch(err => {
      console.error("Error al copiar el texto: ", err);
    });
  };

/* const handleGoFacility = (id) => {
  router.push({ name: 'ShowFacility', params: { id } });
}; */


const goToFacilities = () => {
  router.push({ name: 'FacilityList' })
}

provide('isModalOpen',isModalOpen)

const rrss = computed(() => {
   return hotelData.value.instagram_url ||
          hotelData.value.facebook_url ||
          hotelData.value.pinterest_url ||
          hotelData.value.x_url;
  });

const showWifiModal = computed(() => {
  return Boolean(getUrlParam('showWifiModal'))
});

const wifiIdMockup = computed(() => {
  return Number(getUrlParam('wifiIdMockup'))
});

const getDataWifi = computed(() => {
  let newWifi = [{name:'',password:'',visible:true,id:0}]
  // let oneWifi = dataWifi.value.filter(item=> item.id == wifiIdMockup.value)
  return showWifiModal.value && wifiIdMockup.value == 0 ? newWifi : dataWifi.value;
});
  

</script>

<style scoped>

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

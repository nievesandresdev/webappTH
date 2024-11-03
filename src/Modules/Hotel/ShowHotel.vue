<template>
  <div class="bg-[#FAFAFA]">
    <!-- Slider de imágenes -->
    <ImageSlider :images="hotelData.images" />

    <div class="flex flex-col mt-2 px-4">
      <!-- Nombre del hotel -->
      <h1 class="lato text-[18px] font-bold text-[#333] mb-[7px]">
        {{ hotelData.name }}
      </h1>

      <StarRating v-if="hotelData.category !== null" :category="hotelData.category" />

      <p
        :class="isExpanded ? 'text-sm font-normal lato text-[#333]' : 'text-sm font-normal lato text-[#333] truncate-description mt-[12px]'"
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

      <!-- Componente de Botones de Acción -->
      <HotelActionButtons
        :hotelData="hotelData"
        :buttonsHome="hotelData.buttons_home"
        @wifi-click="handleWifi"
        @call-click="handleCall"
        @legal-click="handleLegalText"
        @share-click="openModalShared"
      />
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
      <p class="text-[16px] text-[#333333]  font-semibold text-center lato">
        El alojamiento cuenta con servicio de internet WiFi gratuito
      </p>
    </div>
  </BottomModal>

  <!--Políticas y Normas -->
  <BottomModal :isOpen="modalLegal && !$utils.isMockup()" @update:isOpen="modalLegal = $event">
    <div class="flex flex-col items-start">
      <div class="flex items-center gap-1 mb-4 lato">
        <img src="/assets/icons/WA.normas.svg" class="w-8 h-8 text-[#333333]" alt="Normas Icon" />
        <p class="text-[20px] font-bold text-[#333333] lato">Políticas y Normas</p>
      </div>
    </div>
    <div v-for="policie in hotelData.policies" :key="policie" class="p-4 gap-2 rounded-[20px] border border-[#E9E9E9] bg-gradient-h h-full space-y-4 mb-4">
      <div  class="text-[#333333] text-sm">
        <p class="font-bold mb-2 lato text-[16px]">{{ policie.title }}</p>
        <p class="font-normal text-sm lato">{{ policie.description }}</p>
        <div class="border-t border-[#E9E9E9] my-2" v-show="policie.penalization == 1"></div>
        <p v-show="policie.penalization == 1"><span class="font-bold lato text-sm">Penalización: </span><span class="font-normal lato text-sm">{{ policie.penalization_details }}</span> </p>
      </div>
    </div>
  </BottomModal>

  <!--Compartir Estancia -->
  <BottomModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
    <div class="flex flex-col items-start">
      <div class="flex items-center gap-2 mb-4 lato">
        <img src="/assets/icons/arrow-up-from-bracket.svg" class="w-6 h-6" alt="Arrow Icon" />
        <p class="text-[20px] font-bold text-[#333333] lato">Compartir estancia</p>
      </div>
      <a :href="whatsappShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
        <img src="/assets/icons/WA.Whatsapp.svg" class="w-6 h-6" alt="Whatsapp Icon" />
        <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Whatsapp</p>
      </a>
      <a :href="mailtoShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
        <img src="/assets/icons/WA.mail.svg" class="w-6 h-6" alt="Email Icon" />
        <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Email</p>
      </a>
      <a :href="smsShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
        <img src="/assets/icons/WA.SMS.svg" class="w-6 h-6" alt="SMS Icon" />
        <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía SMS</p>
      </a>
      <a :href="telegramShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
        <img src="/assets/icons/WA.Telegram.svg" class="w-6 h-6" alt="Telegram Icon" />
        <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Telegram</p>
      </a>
      <p class="text-[14px] font-bold lato text-[#333333]">Link para compartir la estancia</p>
      <div class="relative mt-1 w-full">
        <input
          ref="shareLinkInput"
          type="text"
          disabled
          :value="shareUrl"
          class="w-full py-2 pl-4 pr-10 text-[14px] font-medium lato text-[rgba(51,51,51,0.25)] rounded-[10px] border border-[rgba(51, 51, 51, 0.25)] bg-[rgba(250, 250, 250, 0.50)] truncate"
        />
        <button @click="copyToClipboard" class="absolute right-2 top-1/2 transform -translate-y-1/2">
          <img src="/assets/icons/WA.copy.svg" class="w-5 h-5" alt="Copy Icon" />
        </button>
      </div>
    </div>
  </BottomModal>
</template>

<script setup>
import ImageSlider from '@/components/ImageSlider.vue'
import StarRating from './Components/StarRating.vue'
import RoundedButton from '@/components/Buttons/RoundedButton.vue'
import HotelActionButtons from './Components/HotelActionsButtons.vue'
import { useHotelStore } from '@/stores/modules/hotel'
import BottomModal from '@/Modules/User/Components/BottomModal.vue'

import { computed, ref, onMounted } from 'vue'

import { useShareStay } from '@/composables/useShareStay';

const hotelName = 'Hotel Example';
const shareUrl = "https://ejemplo.com/estancia/larga-url-que-se-trunca";

const {
    isModalOpen, 
    shareLinkInput, 
    whatsappShareUrl, 
    mailtoShareUrl, 
    smsShareUrl, 
    telegramShareUrl, 
    openModalShared, 
    copyToClipboard 
} = useShareStay(hotelName, shareUrl);

const hotelStore = useHotelStore()
const hotelData = computed(() => hotelStore.hotelData)

const isExpanded = ref(false)
const modalWifi = ref(false)
const modalLegal = ref(false)

onMounted(() => {
  console.log(hotelData.value)
})

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
</script>

<style scoped>
/* Truncar la descripción a tres líneas */
.truncate-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

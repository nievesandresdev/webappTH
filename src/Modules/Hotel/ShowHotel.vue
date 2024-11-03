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

      <!-- Botones de acción -->
      <div class="flex gap-4 justify-around" v-if="hotelData.buttons_home">
        <!-- Botón de Wifi -->
        <RoundedButton
          v-if="hotelData.buttons_home.show_all || hotelData.buttons_home.show_wifi"
          iconUrl="/assets/icons/WA.wifi.svg"
          label="Wifi"
          :showLabel="true"
          @click="handleWifi()"
        />

        <!-- Botón de Llamar -->
        <RoundedButton
          v-if="hotelData.buttons_home.show_all || hotelData.buttons_home.show_call"
          iconUrl="/assets/icons/WA.llamar.svg"
          label="Llamar"
          :showLabel="true"
          @click="handleCall()"
        />

        <!-- Botón de Normas -->
        <RoundedButton
          v-if="hotelData.buttons_home.show_all || hotelData.buttons_home.show_legal_text || !hotelData.legal"
          iconUrl="/assets/icons/WA.normas.svg"
          label="Normas"
          :showLabel="true"
          @click="handleLegalText()"
        />

        <!-- Botón de Compartir Estancia -->
        <RoundedButton
          v-if="hotelData.buttons_home.show_all"
          iconUrl="/assets/icons/arrow-up-from-bracket-small.svg"
          label="Compartir Estancia"
          :showLabel="true"
        />
      </div>
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
      <!-- Texto descriptivo centrado -->
      <p class="text-[16px] text-[#333333]  font-semibold text-center">
        El alojamiento cuenta con servicio de internet WiFi gratuito
      </p>
    </div>
  </BottomModal>

  <!-- Modal de Políticas y Normas -->
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
</template>

<script setup>
import ImageSlider from '@/components/ImageSlider.vue'
import StarRating from './Components/StarRating.vue'
import RoundedButton from '@/components/Buttons/RoundedButton.vue'
import { useHotelStore } from '@/stores/modules/hotel'
import BottomModal from '@/Modules/User/Components/BottomModal.vue'

import { computed, ref, onMounted } from 'vue'

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

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
  
        <div class="flex gap-4 justify-around">
          <RoundedButton iconUrl="/assets/icons/WA.wifi.svg" label="Wifi" :showLabel="true" @click="handleWifi()" />
          <RoundedButton iconUrl="/assets/icons/WA.llamar.svg" label="Llamar" :showLabel="true" @click="handleCall()" />
          <RoundedButton iconUrl="/assets/icons/WA.normas.svg" label="Normas" :showLabel="true" />
          <RoundedButton iconUrl="/assets/icons/arrow-up-from-bracket.svg" label="Compartir Estancia" :showLabel="true" />
        </div>
      </div>
    </div>

    <BottomSheet :open-bottom-sheet="modalWifi && !$utils.isMockup()">
       sss
     
   </BottomSheet>


    
  </template>
  
  <script setup>
  import ImageSlider from '@/components/ImageSlider.vue'
  import StarRating from './Components/StarRating.vue'
  import RoundedButton from '@/components/Buttons/RoundedButton.vue'
  import BottomSheet from '@/components/Modal/BottomSheet.vue'
  import { useHotelStore } from '@/stores/modules/hotel'
  import { computed, ref, onMounted } from 'vue'
  
  const hotelStore = useHotelStore()
  const hotelData = computed(() => hotelStore.hotelData)
  
  const isExpanded = ref(false)

  const modalWifi = ref(false)
  
  onMounted(() => {
    
  })


  const handleCall = () => {
    window.open(`tel:${hotelData.value.phone}`)
  }

  const handleWifi = () => {
    modalWifi.value = true
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
  
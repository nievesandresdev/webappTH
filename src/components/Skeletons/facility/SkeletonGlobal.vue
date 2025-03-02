<template>
    <div class="mb-[50px] sp:mb-[100px] animate-pulse">
      <div 
      class="px-2 sp:px-4 space-y-2 sp:space-y-4"
        :class="hotelData?.show_facilities == 1 && hotelData?.show_profile == 1 ? 'mt-[86px] sp:mt-[168px]' : 'mt-[60px] sp:mt-[105px]'"
      >
        
        <div
          v-for="item in 5"
          :key="item"
          class="flex flex-col rouded-[10px] sp:rounded-[20px] border border-white bg-gradient-to-r bg-gradient-100 cursor-pointer"
        >
        
          <div class="relative w-full h-[110px] sp:h-[226px] rounded-t-lg overflow-hidden">
            <div
              class="w-full h-[226px] item-skeletom"
            />
          </div>
          <div class="p-2 sp:p-4">
            <div class="h-[12px] sp:h-[18px] w-full item-skeletom"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
const hotelData = computed(() => hotelStore.hotelData);

</script>
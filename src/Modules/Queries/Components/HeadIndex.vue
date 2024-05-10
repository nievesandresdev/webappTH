<template>
    <div class="queries-head hshadow p-4 md:p-5 relative">
        <div class="md:hidden">
            <img 
                @click="goBack"
                class="absolute top-4 left-4" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
            >
            <h1 class="text-center text-base font-medium">Consultas</h1>
        </div>
        <p class="mx-auto w-[650px] text-[27px] font-medium hidden md:block">
            {{nameHotel}}
        </p>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel';

const hotelStore = useHotelStore();

function goBack() {
  router.go(-1);
}

const nameHotel = computed(() => {
    let name = hotelStore.hotelData.name;
    if(!name.includes('Hotel')){
        name = 'Hotel '+hotelStore.hotelData.name
    }
    return name
})
</script>
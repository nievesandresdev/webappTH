<template>
    <div class="queries-head hshadow p-3 sp:p-4 md:p-5 relative">
        <div class="md:hidden">
            <img 
                @click="goBack"
                class="w-4 sp:w-auto absolute top-4 left-4" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
            >
            <h1 class="text-center text-xs sp:text-base font-medium mt-1 sp:mt-0">Consultas</h1>
        </div>
        <p class="mx-auto w-[650px] text-[27px] font-medium hidden md:block">
            {{nameHotel}}
        </p>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel';
import { useRouter } from 'vue-router';

const hotelStore = useHotelStore();
const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push({ name: 'Home'})
  }
}

const nameHotel = computed(() => {
    let name = hotelStore.hotelData.name;
    if(!name.includes('Hotel')){
        name = 'Hotel '+hotelStore.hotelData.name
    }
    return name
})
</script>
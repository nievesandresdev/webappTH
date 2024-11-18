<template>
    <div>
        <div 
            v-if="hotelData?.image" 
            class="bg-center bg-cover h-[265px] w-full rounded-b-[20px] shadow-guest"  
            :style="`background-image: url('${hotelStore.$loadImage(hotelData?.image)}');`"
        >
        
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const hotelData = ref(null)
onMounted(()=>{
    hotelData.value = hotelStore.hotelData;
})
</script>
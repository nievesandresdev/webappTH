<template>
    <div>
        <div 
            v-if="imgData" 
            class="bg-center bg-cover h-[142px] sp:h-[265px] w-full rounded-b-[20px] shadow-guest"  
            :style="`background-image: url('${hotelStore.$loadImage(imgData)}');`"
        ></div>
        <div class="mx-3 sp:mx-4 mt-[-12px] sp:mt-[-24px]">
            <StayCard 
                v-if="stayStore.stayData" 
                :hotel="hotelStore.hotelData" 
                :stay="stayStore.stayData" 
                :showButtonShared="true"
                :isLoading="false"
            />
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import StayCard from '@/Modules/User/Components/StayCard.vue'
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore()

const imgData = ref(null)
onMounted(()=>{
    imgData.value = {
        type : 'gallery',
        url : hotelStore.hotelData?.image
    }
    // hotelData.value = hotelStore.hotelData;
})
</script>
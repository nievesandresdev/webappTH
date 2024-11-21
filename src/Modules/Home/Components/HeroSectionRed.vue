<template>
    <div>
        <div 
            v-if="hotelStore.hotelData?.image" 
            class="bg-center bg-cover h-[142px] sp:h-[265px] w-full rounded-b-[20px] shadow-guest"  
            :style="`background-image: url('${hotelStore.$loadImage(hotelStore.hotelData?.image)}');`"
        ></div>
        <div class="w-[170px] sp:w-[343px] mx-auto mt-[-12px] sp:mt-[-24px]">
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

// const hotelData = ref(null)
onMounted(()=>{
    // hotelData.value = hotelStore.hotelData;
})
</script>
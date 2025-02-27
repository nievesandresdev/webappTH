<template>
    <div class="h-[140px] sp:h-[265px] w-full">
        <div 
            v-if="imgData" 
            class="bg-center bg-cover h-full w-full rounded-b-[20px] shadow-guest"  
            :style="`background-image: url('${hotelStore.$loadImage(imgData)}');`"
        ></div>
    </div>
    <div class="mx-3 sp:mx-4 mt-[-16px] sp:mt-[-24px]">
        <StayCard 
            v-if="hotelStore.hotelData && stayStore.stayData && !$utils.isMockup()" 
            :hotel="hotelStore.hotelData" 
            :stay="stayStore.stayData" 
            :showButtonShared="true"
            showQueryButton
            :isLoading="false"
            @stayClick="goMyStay"
        />
        <FakeStayCard v-if="$utils.isMockup()"/>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import StayCard from '@/Modules/User/Components/StayCard.vue'
import FakeStayCard from './FakeStayCard.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
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

function goMyStay(){
    router.push({ name: 'MyStay', params: { stayId:stayStore.stayData.id } });
}
</script>
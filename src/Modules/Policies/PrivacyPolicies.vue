<template>
    
    <HeadWithLang 
        go-back
        @go-back="goBack"
        text="Política de privacidad"
        title-classes="h-[28px] lato text-[20px] font-bold leading-[28px] w-[255px] text-center"
    />
        
    asdasd
</template>
<script setup>
import HeadWithLang from '@/layout/Components/HeadWithLang.vue'
import { navigateTo } from '@/utils/navigation'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore

async function goBack(){
    // await guestStore.deleteLocalGuest();
    if(hotelData){
        navigateTo('Home',{},{ acform : 'complete' })
    }else{
        router.push({ name: 'ChainLanding', query:{acform:'complete'}});
    }
    
}
</script>
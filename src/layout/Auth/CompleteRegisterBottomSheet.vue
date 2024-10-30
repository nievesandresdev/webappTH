<template>
     <BottomSheet :open-bottom-sheet="open && !$utils.isMockup()">
        <img 
            v-if="route.name !== 'Home'"
            class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg"
        />
        <div class="px-4 pt-[36px]">
            <HeadInChain 
                go-back
                @go-back="goBack"
                text="Termina de registrarte"
                title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
            />
            <div class="mt-4">
                <CompleteRegistration />
            </div>
        </div>
      
    </BottomSheet>
</template>
<script setup>
import { toRefs } from 'vue'
import { navigateTo } from '@/utils/navigation'
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue';
import CompleteRegistration from './Components/CompleteRegistration.vue';
//router
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore


const props = defineProps({
    open:{
        type: Boolean,
        default: false
    }
})

const { open } = toRefs(props)

function goBack(){
    if(hotelData){
        navigateTo('Home',{},{ acform : 'log' })
    }else{
        router.push({ name: 'ChainLanding', query:{acform:'log'}});
    }
    
}

</script>
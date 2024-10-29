<template>
     <BottomSheet :open-bottom-sheet="true">
        <img class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg">
        <div class="px-4 pt-[36px]">
            <HeadInChain 
                go-back
                @go-back="goChainLanding"
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
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue';
import CompleteRegistration from './Components/CompleteRegistration.vue';
//router
import { useRouter } from 'vue-router';
const router = useRouter();

function goChainLanding(){
    router.push({ name: 'ChainLanding', query:{acform:'log'}});
}

</script>
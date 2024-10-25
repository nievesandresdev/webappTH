<template>
    <div class="h-screen pt-8 bg-black">
        <img class="w-[133px] h-[80px] mx-auto" src="/assets/icons/WA.facebook.svg" alt="icon google">
    </div>
    <BottomSheet :open-bottom-sheet="true">
        <img class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg">
        <div class="px-4 pt-4">
            <WelcomeMsg />
            <!-- {{ $utils.capitalize($t('guest.guestLog.title')) }} -->
            <div class="mt-[96px]">
                <HeadInChain 
                    text="Inicia sesión o regístrate"
                    title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
                />
                <div class="mt-4">
                    <RegisterOrLogin />
                </div>
            </div>
        </div>
      
    </BottomSheet>
</template>
<script setup>
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import HeadInChain from './Components/HeadInChain.vue';
import WelcomeMsg from './Components/WelcomeMsg.vue';
import RegisterOrLogin from '@/layout/Auth/RegisterOrLogin.vue';
</script>
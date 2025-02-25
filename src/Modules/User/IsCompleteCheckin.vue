<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 z-[10000] w-screen h-screen"></div>
    <div class="h-screen w-screen flex flex-col justify-center">
        <img class="w-[142px] sp:w-[213px] h-[120px] sp:h-[179px] mx-auto" src="/assets/img/undraw_confirmed_f581 1.svg" alt="">
        <h1 class="mt-[32px] sp:mt-[48px] lato text-base sp:text-[20px] font-bold sp:leading-[18px] text-center">Check-in completado!</h1>
        <div class="mt-3 sp:mt-4 px-2 sp:px-4" id="success-checkin-msg" v-html="msgText">
        </div>
        <div class="mt-5 sp:mt-8 px-2 sp:px-4">
            <button 
                class="shadow-guest-2 py-1.5 sp:py-2.5 px-2 sp:px-4 sp:h-10 border rounded-[6px] sp:rounded-[10px] text-center border-white hbg-black-100 w-full"
                @click="goGuests"
            >
                <span class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] block text-white">
                    Completar otro Check-in
                </span>
            </button>
        </div>
        <div class="mt-3 sp:mt-6 text-center">
            <button class="underline lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]" @click="navigateTo('Home')">
                Ir a Inicio
            </button>
        </div>
    </div>
</template>
<script setup>
import { navigateTo } from '@/utils/navigation'
import { ref, onMounted } from 'vue'
//
import { useRouter } from 'vue-router'
const router = useRouter();
import { useLocaleStore } from '@/stores/modules/locale';
const localeStore = useLocaleStore();
import { useCheckinStore } from '@/stores/modules/checkin';
const checkinStore = useCheckinStore();

const msgText = ref(null);

onMounted(async() => {
    let settings = await checkinStore.$getAllSettings();
    const locale = localeStore.localeCurrent ?? 'es';
    msgText.value = settings?.succes_message[locale]
})

const goGuests = () => {
    router.push({ name: 'Guests' });
};
</script>
<style>
#success-checkin-msg > *{
    font-family: "Lato", sans-serif !important;
}

#success-checkin-msg > strong,
#success-checkin-msg > p{
    font-family: "Lato", sans-serif !important;
    font-size: 16px;
    font-weight: 500 !important;
    line-height: 20px;
}

@media (max-width: 224px) {
    #success-checkin-msg > strong,
    #success-checkin-msg > p{
        font-size: 10px;
        line-height: 14px;
    }   
}
</style>
<template>
    <div class="h-screen w-screen flex flex-col justify-center">
        <img class="w-[213px] h-[179px] mx-auto" src="/assets/img/undraw_confirmed_f581 1.svg" alt="">
        <h1 class="mt-[48px] lato text-[20px] font-bold leading-[18px] text-center">Check-in completado!</h1>
        <div class="mt-4 px-4" id="success-checkin-msg" v-html="msgText">
        </div>
        <div class="mt-8 px-4">
            <button 
                class="shadow-guest-2 py-2.5 px-4 h-10 border rounded-[10px] text-center border-white hbg-black-100 w-full"
                @click="goGuests"
            >
                <span class="lato text-sm font-bold leading-[16px] block text-white">
                    Completar otro Check-in
                </span>
            </button>
        </div>
        <div class="mt-6 text-center">
            <button class="underline lato text-sm font-bold leading-[16px]" @click="navigateTo('Home')">
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
    
}
</style>
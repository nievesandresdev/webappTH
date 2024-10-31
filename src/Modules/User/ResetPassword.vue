<template>
    <div class="px-8 py-10">
        <h1 v-if="hotelData.name" class="text-[30px] md:text-[40px] font-semibold leading-[32px] md:leading-[50px] text-center">
            {{hotelData.name}}
        </h1>
        <p class="text-center mt-8 text-[24px] md:text-[30px] font-medium leading-[28px] md:leading-[32px]">Restablecer contraseña</p>
        <h3 class="mt-10 text-[20px] md:text-[24px] font-semibold leading-[28px]">Hola {{guestData ? guestData.name : email}}!</h3>
        <p class="mt-4 text-lg font-medium leading-[28px]">Has solicitado un enlace para restablecer la contraseña de tu cuenta en nuestra WebApp. Haz click en el siguiente botón para iniciar el proceso.</p>
        <div class="mt-8">
            <button class="hbtn-primary w-[220px] h-10 py-2.5 px-4 text-center rounded-[10px] text-sm font-bold leading-[16px]">
                Restablecer contraseña
            </button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getUrlParam } from '@/utils/utils'
//stores
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore

const email = ref(null)
const guestData = ref(null)
onMounted(async () => {
    email.value = getUrlParam('email');
    if(email.value){
        guestData.value = await guestStore.findByEmail({email : email.value})
    }
})
</script>
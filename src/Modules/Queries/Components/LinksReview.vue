<template>
    <div class="hshadow md:shadow-none rounded-[6px] p-4 md:p-0 bg-white mb-4">
        <img 
            class="w-6 h-6 hidden md:inline-block invisible" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
        >
        <h1 class="text-base md:text-[36px] font-medium md:font-semibold md:mt-6 md:leading-10">¡Nos alegra que hayas disfrutado en {{hotelData.name}}!</h1>
        <p class="mt-2 md:mt-6 text-sm md:text-[24px] md:leading-7">Tu experiencia es muy importante, compartirla ayudaría a otros viajeros a conocernos.</p>
        <div class="buttons">
            <div class="mt-6 md:mt-10 text-center">
                <GoOtaButton customClasess="max-w-[310px] md:font-semibold" ota="google" textButton="Continuar con Google"/>
            </div>
            <div class="mt-4 md:mt-6 text-center">
                <GoOtaButton customClasess="max-w-[310px] md:font-semibold" ota="tripadvisor" textButton="Continuar con Tripadvisor" />
            </div>
            <p class="mt-6 md:mt-8 text-sm md:text-[21px] md:leading-7">Si reservaste online, podrían solicitarte tu opinión pronto.</p>
            <p class="text-sm md:text-[21px] md:leading-7">Valoramos mucho que la compartieras.</p>
            <p class="mt-2 md:mt-6 text-sm md:text-[27px] font-semibold md:font-medium text-center md:leading-7">Agradecemos tu tiempo y <br>¡Gracias por habernos elegido!</p>
        </div>
    </div>
</template>
<script setup>
import GoOtaButton from '@/components/GoOtaButton.vue'
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore
</script>
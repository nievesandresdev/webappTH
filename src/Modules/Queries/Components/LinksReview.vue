<template>
    <div class="hshadow rounded-[6px] p-4 bg-white mb-4">
        <h1 class="text-base font-medium">¡Nos alegra que hayas disfrutado en {{hotelData.name}}!</h1>
        <p class="mt-2 text-sm">Tu experiencia es muy importante, compartirla ayudaría a otros viajeros a conocernos.</p>
        <div class="buttons">
            <div class="mt-6">
                <GoOtaButton ota="google" textButton="Continuar con Google"/>
            </div>
            <div class="mt-4">
                <GoOtaButton ota="tripadvisor" textButton="Continuar con Tripadvisor" />
            </div>
            <p class="mt-6 text-sm">Si reservaste online, podrían solicitarte tu opinión pronto.</p>
            <p class="text-sm">Valoramos mucho que la compartieras.</p>
            <p class="mt-2 text-sm font-semibold text-center">Agradecemos tu tiempo y <br>¡Gracias por habernos elegido!</p>
        </div>
    </div>
</template>
<script setup>
import GoOtaButton from '@/components/GoOtaButton.vue'
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore
</script>
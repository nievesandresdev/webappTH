<template>
    <!-- head -->
    <HeadInChain text="Selecciona tu alojamiento"/>

    <!-- body -->
    <div class="py-6 px-4">
        <h4 class="lato text-base font-bold leading-[20px]">7 alojamientos de la cadena</h4>
        <div class="mt-4">
            <div class="mb-6">
                <CardHotel />
            </div>
            <CardHotel />
        </div>
    </div>
</template>
<script setup>
import HeadInChain from './Components/HeadInChain.vue'
import CardHotel from './Components/CardHotel.vue'
</script>
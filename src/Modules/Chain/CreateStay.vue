<template>
    <!-- head -->
    <HeadInChain text="Crea tu estancia" goBack/>

    <!-- body -->
    <div class="py-6 px-4">
        <CardHotel />
        <div class="mt-6">
            <FormCreateStay />
        </div>
    </div>
</template>
<script setup>
import HeadInChain from './Components/HeadInChain.vue'
import CardHotel from './Components/CardHotel.vue'
import FormCreateStay from '@/components/Dropdowns/FormCreateStay.vue'
</script>
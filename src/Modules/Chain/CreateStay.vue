<template>
    <!-- head -->
    <HeadInChain text="Crea tu estancia" goBack/>

    <!-- body -->
    <div class="py-6 px-4">
        <!-- <CardHotel /> -->
        <div class="mt-6">
            <FormCreateStay />
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import HeadInChain from './Components/HeadInChain.vue'
import CardHotel from './Components/CardHotel.vue'
import FormCreateStay from '@/components/Dropdowns/FormCreateStay.vue'
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

onMounted(() => {
    
})

</script>
<template>
    <PageTransitionGlobal module="chain" name="chain_createstay" component-name="CreateStaySkeleton">
        <div v-if="datCard">
            <CardHotel :data="datCard"/>
            <div class="mt-6">
                <FormCreateStay />
            </div>
        </div>
    </PageTransitionGlobal>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import CardHotel from './Components/CardHotel.vue'
import FormCreateStay from '@/layout/Auth/Components/FormCreateStay.vue'
//route
import { useRouter } from 'vue-router';
const router = useRouter();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();
//
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();


const datCard = ref(null)
const goBack = ref(false)

startLoading(SECTIONS.CHAIN.CREATESTAY);
onMounted(async () =>{
    datCard.value = hotelStore.hotelData;
    await sleep(1000); // 1000 ms = 1 segundo
    stopLoading(SECTIONS.CHAIN.CREATESTAY);
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

</script>
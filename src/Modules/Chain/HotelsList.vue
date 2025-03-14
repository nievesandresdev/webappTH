<template>
    <PageTransitionGlobal module="chain" name="chain_hotellist" component-name="HotelListSkeleton">
        <div>
            <h1 class="lato text-lg font-bold leading-[20px]">{{$t('auth.hotel-list.title')}}</h1>
            <h4 class="lato text-base font-bold leading-[20px] mt-4">{{hotels.length ?? 0}} {{$t('auth.hotel-list.amount-text')}}</h4>
            <div class="mt-4">
                <div class="mb-6" v-for="hotel in hotels" >
                    <CardHotel :data="hotel" clickable/>
                </div>
            </div>
        </div>
    </PageTransitionGlobal>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import CardHotel from './Components/CardHotel.vue'
//store
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
//router
import { useRouter } from 'vue-router';
const router = useRouter();
//
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();


const hotels = ref([])
startLoading(SECTIONS.CHAIN.HOTELLIST);
onMounted(async() => {
    hotels.value = await chainStore.$getHotelsList()  
    stopLoading(SECTIONS.CHAIN.HOTELLIST);
})


</script>
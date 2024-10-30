<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4">
        <HeadInChain text="Crea tu estancia" go-back @go-back="goHotelList"/>
    </div>
    <!-- body -->
    <div class="py-6 px-4">
        <CardHotel :data="hotelData"/>
        <div class="mt-6">
            <FormCreateStay />
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import HeadInChain from './Components/HeadInChain.vue'
import CardHotel from './Components/CardHotel.vue'
import FormCreateStay from '@/layout/Auth/Components/FormCreateStay.vue'
//route
import { useRouter } from 'vue-router';
const router = useRouter();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

async function goHotelList(){
    hotelStore.$deleteLocalHotel();
    router.push({ name:'HotelsList' })
}

</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>
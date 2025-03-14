<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4">
        <HeadInChain :text="$t('stay.create.title')" go-back @go-back="goHotelList"/>
    </div>
    <!-- body -->
    <div class="py-6 px-4" v-if="datCard">
        <CardHotel :data="datCard"/>
        <div class="mt-6">
            <FormCreateStay />
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import HeadInChain from './Components/HeadInChain.vue'
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

const datCard = ref(null)
const goBack = ref(false)

onMounted(() =>{
    datCard.value = hotelStore.hotelData;
})
async function goHotelList(){
    if(goBack.value) return;
    const oldSubdomain = hotelStore.oldSubdomain;
    hotelStore.$deleteLocalHotel();
    if(oldSubdomain){
        goBack.value = true;
        await hotelStore.$setAndLoadLocalHotel(hotelStore.oldSubdomain)
        await hotelStore.$deleteOldLocalHotel()
        router.push({ name:'HotelsList'  , query:{ fromStay: 'true'}})
    }else{
        router.push({ name:'HotelsList'})
    }
}

</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>
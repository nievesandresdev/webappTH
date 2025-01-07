<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4">
        <HeadInChain 
            :text="$t('stay.create.title')" 
            :go-back="Boolean(getUrlParam('fromStay'))" 
            @go-back="goStayList"
        />
    </div>

    <!-- body -->
    <div class="py-6 px-4">
        <h1 class="lato text-lg font-bold leading-[20px]">{{$t('auth.hotel-list.title')}}</h1>
        <h4 class="lato text-base font-bold leading-[20px] mt-4">{{hotels.length ?? 0}} {{$t('auth.hotel-list.amount-text')}}</h4>
        <div class="mt-4">
            <div class="mb-6" v-for="hotel in hotels" >
                <CardHotel :data="hotel" clickable/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getUrlParam } from '@/utils/utils.js'
import { navigateTo } from '@/utils/navigation'
import HeadInChain from './Components/HeadInChain.vue'
import CardHotel from './Components/CardHotel.vue'
//store
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();
//router



const hotels = ref([])
onMounted(async() => {
    hotels.value = await chainStore.$getHotelsList()  
})

async function goStayList(){
    navigateTo('MyStays')
}

</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>
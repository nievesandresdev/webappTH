<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4 z-50">
        <HeadInChain 
            :text="$t('stay.create.title')" 
            :go-back="showBackButton" 
            @go-back="goBack"
        />
    </div>
    <!-- body -->
    <div class="py-6 px-4">
        <TransitionBook
            :custom-transitions="{
                HotelsList: 2,
                CreateStayFromChain: 1,
            }"
        >
            <router-view v-slot="{ Component }">
                <component :is="Component" :key="$route.name" />
            </router-view>
        </TransitionBook>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import HeadInChain from './Components/HeadInChain.vue'
import TransitionBook from '@/components/Transition/TransitionBook.vue';
import { getUrlParam } from '@/utils/utils.js'
//
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const goBackRef = ref(false)

async function goBack(){
    if(route.name == 'HotelsList'){
        //esta opcion es para cuando ya hay una sesion iniciada
        goStayList();
    }else{
        goHotelList();
    }
}

async function goStayList(){
    console.log('test hotel', hotelStore.hotelData?.subdomain)
    router.push({ name:'MyStays', params:{ hotelSlug : hotelStore.hotelData?.subdomain}})
}

async function goHotelList(){
    // if(goBackRef.value) return;
    // goBackRef.value = true;
    const oldSubdomain = hotelStore.oldSubdomain;
    hotelStore.$deleteLocalHotel();
    if(oldSubdomain){
        await hotelStore.$setAndLoadLocalHotel(hotelStore.oldSubdomain)
        await hotelStore.$deleteOldLocalHotel()
        router.push({ name:'HotelsList'  , query:{ fromStay: 'true'}})
    }else{
        router.push({ name:'HotelsList'})
    }
}

const showBackButton = computed(()=>{
    return (route.name == 'HotelsList' && Boolean(getUrlParam('fromStay'))) || route.name == 'CreateStayFromChain';
})

</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>
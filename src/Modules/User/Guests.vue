<template>
    <MyStayHeader/>

    <div v-if="!loading" class="py-6 px-4">
        <div 
            class="mb-4"
            v-for="guest in guestsList" :key="guest.id"
        >
            <CardGuest :data="guest" @reloadGuestsList="loadGuestsList"/>
        </div>
        <div class="mt-8">
            <button
                @click="$openShareMenu()"
                class="w-full h-10 flex justify-center items-center px-4 py-2 gap-2 rounded-[10px] border bg-white border-[#333333] text-[#333333] lato text-sm font-bold hshadow-button"
            >   
                <img class="w-6 h-6 mr-2" src="/assets/icons/WA.Share.svg" alt="">
                {{ $t('stay.edit.share') }}
            </button>
        </div>
    </div>
    <div v-else class="flex justify-center mt-6">
        <Spinner width="40px" height="40px"/>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import MyStayHeader from './Components/MyStay/MyStayHeader.vue'
import CardGuest from './Components/MyStay/CardGuest.vue'
import Spinner from '@/components/Spinner.vue';
import { $openShareMenu } from '@/utils/helpers.js'
//

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const guestsList = ref(null)
const loading = ref(true);

onMounted(async() => {
    await loadGuestsList();
    loading.value = false;
    // console.log('test guestsList',guestsList.value)
})

async function loadGuestsList(){
    guestsList.value = await stayStore.getGuestsAndSortByAccess(stayStore.stayData?.id)  
}
</script>

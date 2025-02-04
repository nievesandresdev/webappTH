<template>
    <MyStayHeader/>

    <div class="py-6 px-4">
        <div 
            class="mb-4"
            v-for="guest in guestsList" :key="guest.id"
        >
            <CardGuest :data="guest"/>
        </div>
        <div class="mt-4">
            <button
                class="w-full h-10 flex justify-center items-center px-4 py-2 gap-2 rounded-[10px] border bg-white border-[#333333] text-[#333333] lato text-sm font-bold hshadow-button"
            >   
                <img class="w-6 h-6 mr-2" src="/assets/icons/WA.Share.svg" alt="">
                {{ $t('stay.edit.share') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import MyStayHeader from './Components/MyStay/MyStayHeader.vue'
import CardGuest from './Components/MyStay/CardGuest.vue'
//
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const guestsList = ref(null)

onMounted(async() => {
    guestsList.value = await stayStore.getGuestsAndSortByCurrentguestId(stayStore.stayData?.id,guestStore.guestData?.id)  
    console.log('test guestsList',guestsList.value)
})
</script>

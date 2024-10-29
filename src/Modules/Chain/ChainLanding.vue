<template>
    <div class="h-screen pt-8 bg-black">
        <img class="w-[133px] h-[80px] mx-auto" src="/assets/icons/WA.facebook.svg" alt="icon google">
    </div>
    <RegisterOrLoginBottomSheet v-if="formType == 'log'"/>
    <CompleteRegisterBottomSheet v-if="formType == 'complete'"/>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
import { getUrlParam } from '@/utils/utils';
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const props = defineProps({
    acform: {
        type:String,
        default:'log'
    }
});

onMounted(() => {
    hotelStore.$deleteLocalHotel();    
})

const formType = computed(() => props.acform);
</script>
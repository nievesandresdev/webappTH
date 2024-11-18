<template>
    <HeaderHomeRed />
    <HeroSectionRed />

    <ResetPasswordBottomSheet :open="formType == 'reset'"/>
    <RegisterOrLoginBottomSheet :open="formType == 'log' || !guestStore.guestData && formType !== 'reset'"/>
    <CompleteRegisterBottomSheet :open="formType == 'complete' || guestStore.guestData && !guestStore.guestData.name"/>
    <CreateStayBottomSheet :open="formType == 'createstay' || guestStore.guestData && guestStore.guestData.name && !stayStore.stayData && !formType"/>
</template>
<script setup>
import { onMounted, computed } from 'vue';
//forms
import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
import CreateStayBottomSheet from '@/layout/Auth/CreateStayBottomSheet.vue'
import ResetPasswordBottomSheet from '@/layout/Auth/ResetPasswordBottomSheet.vue'
//sections
import HeaderHomeRed from './Components/HeaderHomeRed.vue'
import HeroSectionRed from './Components/HeroSectionRed.vue'

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();

const props = defineProps({
    acform: {
        type:String,
        default:false
    }
});

onMounted(() => {
    //
})

const formType = computed(() => props.acform);
</script>
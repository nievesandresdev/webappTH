<template>
    <div class="h-screen bg-gray-600 w-full">
        new home page {{  String(formType == 'log') }} {{  String(!guestStore.guestData) }}
    </div>
    <RegisterOrLoginBottomSheet :open="formType == 'log' || !guestStore.guestData"/>
    <CompleteRegisterBottomSheet :open="formType == 'complete'"/>
    <CreateStayBottomSheet :open="formType == 'createstay' || guestStore.guestData && !stayStore.stayData && !formType"/>
</template>
<script setup>
import { onMounted, computed } from 'vue';
import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
import CreateStayBottomSheet from '@/layout/Auth/CreateStayBottomSheet.vue'

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();

const props = defineProps({
    acform: {
        type:String,
        default:false
    }
});

onMounted(() => {
    // let guest = guestStore.getLocalGuest();
    // console.log('home guest', guest)  

    // let stay = stayStore.getLocalStay();
    // console.log('home stay', stay)  
})

const formType = computed(() => props.acform);
</script>
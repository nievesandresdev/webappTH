<template>
    <!-- class="h-screen pt-8" -->
    <div 
        class="h-screen pt-4 px-4"
        :style="{
            backgroundColor:Number(chainStore.customizationData?.tonality_header) ? '#fafafa' :'#494949'
        }"
    >
    <!-- w-[133px]  -->
        <img 
            v-if="chainStore.$getUrlLog()"
            class="h-[80px] mx-auto" :src="chainStore.$getUrlLog()" alt="icon google"
        >
    </div>
    <ModalSession />
    
    <!-- <RegisterOrLoginBottomSheet :open="formType == 'log'"/>
    <CompleteRegisterBottomSheet :open="formType == 'complete'"/>
    <ResetPasswordBottomSheet :open="formType == 'reset'"/> -->
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import ModalSession from '@/Modules/Auth/ModalSession.vue';
// import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
// import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
// import ResetPasswordBottomSheet from '@/layout/Auth/ResetPasswordBottomSheet.vue'
import { getUrlParam } from '@/utils/utils';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
// import { useStayStore } from '@/stores/modules/stay';
// const stayStore = useStayStore();
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

// const props = defineProps({
//     acform: {
//         type:String,
//         default:'log'
//     }
// });

const customData = ref(null)
onMounted(async () => {
    hotelStore.$deleteLocalHotel();    
    // console.log('test chain', chainStore.customizationData)
    // stayStore.deleteLocalStayData();
})

// const formType = computed(() => props.acform);
</script>
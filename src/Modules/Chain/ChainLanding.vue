<template>
    <div class="h-screen pt-8" :class="`bg-[${customData?.colors[0].cod_hex}]`">
        <img 
            v-if="customData?.logo"
            class="w-[133px] h-[80px] mx-auto" :src="hotelStore.$loadImage(customData?.logo)" alt="icon google"
        >
    </div>
    <RegisterOrLoginBottomSheet :open="formType == 'log'"/>
    <CompleteRegisterBottomSheet :open="formType == 'complete'"/>
    <ResetPasswordBottomSheet :open="formType == 'reset'"/>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
import ResetPasswordBottomSheet from '@/layout/Auth/ResetPasswordBottomSheet.vue'
import { getUrlParam } from '@/utils/utils';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    acform: {
        type:String,
        default:'log'
    }
});

const customData = ref(null)
onMounted(async () => {
    hotelStore.$deleteLocalHotel();    
    customData.value = await chainStore.$getCustomatizacion();
    console.log('test customData', customData.value)
})

const formType = computed(() => props.acform);
</script>
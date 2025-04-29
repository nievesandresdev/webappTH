<template>
    <div 
        class="h-[48px] sp:h-[72px] pt-4 sp:pt-6 px-2.5 sp:px-4 text-white"
        :style="{
            backgroundColor: Number(customData?.tonality_header) ? '#fff' :'#333'
        }"
    >
        <div 
            id="container-header-home"
            class="flex items-start justify-between"
        >
            <!-- name or logo -->
            <img 
                v-if="showLogo && imgData"
                :src="hotelStore.$loadImage(imgData)"
                class="max-w-[132px] sp:max-w-[209px] max-h-[24px] sp:max-h-[48px] z-30"
            >
            <h1 v-else 
                :class="[
                    'max-w-[140px] sp:max-w-[279px] font-medium roboto',
                    classesName
                ]"
                :style="{color: Number(customData?.tonality_header) ? '#333' :'#fff'}"
            >{{ chainNameToShow }}</h1>
            <!-- avatar -->
            <AvatarButton />
        </div>
    </div>
    <div
        class="absolute left-0 top-[48px] sp:top-[70px] h-[23px] sp:h-[46px] w-full z-10"
        :style="`background: linear-gradient(180deg, ${ Number(customData?.tonality_header) ? '#fff' :'#333'} 16%, rgba(51, 51, 51, 0.00) 100%)`"
    ></div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import AvatarButton from '@/components/Buttons/AvatarButton.vue'
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore();

const customData = ref(null)
const imgData = ref(null)

onMounted(() => {
    customData.value = chainStore.customizationData;
    imgData.value = {
        type : 'gallery',
        url : customData.value?.logo
    }
    // console.log('test customData.value',customData.value)
})

const showLogo = computed(() => {
    return !Boolean(customData.value?.type_header);
});

const classesName = computed(() => {
    
    let size = 'text-[20px] sp:text-[30px] leading-[20px] sp:leading-[32px]';

    if(chainNameToShow.value && chainNameToShow.value.length > 15){
        size = 'text-[16px] sp:text-[24px] leading-[16px] sp:leading-[28px]';
    }

    return `${size} z-[150]`;
});

const chainNameToShow = computed(() => {
    return customData.value?.name ?? hotelStore.hotelData?.name;
});
</script>
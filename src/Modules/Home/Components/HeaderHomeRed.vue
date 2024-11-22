<template>
    <div 
        class="h-[36px] sp:h-[72px] pt-3 sp:pt-6 px-2 sp:px-4 text-white"
        :style="{
            backgroundColor: customData?.tonality_header ? '#fff' :'#333'
        }"
    >
        <div 
            id="container-header-home"
            class="flex items-start justify-between"
        >
            <!-- name or logo -->
            <img 
                v-if="showLogo && customData?.logo"
                :src="hotelStore.$loadImage(customData?.logo)"
                class="max-w-[132px] sp:max-w-[279px] max-h-[24px] sp:max-h-[48px] z-30"
            >
            <h1 v-else 
                :class="[
                    'max-w-[140px] sp:max-w-[279px] font-medium roboto',
                    classesName
                ]"
            >{{ chainNameToShow }}</h1>
            <!-- avatar -->
            <AvatarButton />
        </div>
    </div>
    <div
        class="absolute left-0 top-[36px] sp:top-[70px] h-[23px] sp:h-[46px] w-full z-10"
        :style="`background: linear-gradient(180deg, ${ customData?.tonality_header ? '#fff' :'#333'} 16%, rgba(51, 51, 51, 0.00) 100%)`"
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

onMounted(() => {
    customData.value = chainStore.customizationData;
})

const showLogo = computed(() => {
    return !Boolean(customData.value?.type_header);
});

const classesName = computed(() => {
    
    let size = 'text-[30px] leading-[32px]';
    let color = 'text-white';

    if(chainNameToShow.value && chainNameToShow.value.length > 15){
        size = 'text-[24px] leading-[28px]';
    }

    if(Boolean(customData.value?.tonality_header)){
        color = 'text-[#333]';
    }
    return `${size} ${color} z-[150]`;
});

const chainNameToShow = computed(() => {
    return customData.value?.name ?? hotelStore.hotelData?.name;
});

</script>
<template>
    <div class="card-list flex w-full">
        <div class="w-[111px] h-[96px] rounded-[10px] relative">
            <img
                v-if="data.place_images?.[0]?.url"
                class="object-cover w-full h-full overflow-hidden rounded-t-lg"
                :src="placeStore.$loadImage(data.place_images?.[0])"
                alt="img_act"
                loading="lazy"
            >
            <div
                v-if="data.recommended || data.place_featured"
                class="absolute bottom-0 left-0 px-[4px] pb-[8px] z-20 w-full"
            >
                <div class="rounded-full px-[4px] py-[2px] flex space-x-1 bg-white flex items-center">
                    <img
                        src="/assets/icons/WA.star.svg"
                        class="w-[12px] h-[12px]"
                    >
                    <span class="text-[10px] font-bold htext-black-100 leading-none">{{ $utils.capitalize($t('home.card-product.recommended')) }}</span>
                </div>
            </div>
        </div>
        <div class="p-[8px] flex flex-col flex-1">
            <div class="flex-1 truncate-2">
                <div class="flex items-center space-x-2 mb-2">
                    <img
                        src="/assets/icons/WA.star.svg"
                        class="w-[16px] h-[16px]"
                    >
                    <span class="text-base font-bold">{{ converStar(data.num_stars).toFixed(1) }}</span>
                    <span class="text-[10px] font-bold">({{ data.num_reviews }} reseñas)</span>
                </div>
                <p class="text-sm font-bold leading-none truncate-2 h-[28px]" v-html="data.title" />
            </div>
            <div
                class="flex items-center justify-between"
                :class="{'justify-end': !distance}"
            >
                <div
                    v-if="distance"
                    class="flex items-center space-x-[2px]"
                >
                    <img
                        src="/assets/icons/WA.pointer.svg"
                        class="w-[12px] h-[12px]"
                    >
                    <span class="text-[10px] font-bold leading-none">{{ distance }}km</span>
                </div>
                <img
                    :src="`/assets/icons/${data.categori_place.icon}.svg`"
                    class="w-6 h-6"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
const props = defineProps({
    data: {
        type: Object,
        default: () => null,
    }
});

import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();

function converStar(value){
    if(!value) return 0
    return parseFloat(value.replace(",", "."))
}

const hotelData = inject('hotelData');

const distance = computed(() => {
    return props.data.distance;
    return props.data.cityName !== hotelData.zone ? props.data.distance : null;
});

</script>

<style lang="scss">
    
    .card-list {
        border-radius: 10px;
        border: 1px solid #FFF;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }

</style>
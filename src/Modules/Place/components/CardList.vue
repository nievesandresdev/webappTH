<template>
    <div
        class="card-list flex w-full h-[48px] sp:h-[96px]" :class="class"
        @click="$router.push({ name: 'PlaceDetail', params: { id: data.id } })"
    >
        <div class="w-[45px] sp:w-[111px] h-[48px] sp:h-[96px] rounded-[10px] relative overflow-hidden">
            <img
                v-if="data.place_images?.[0]?.url"
                class="object-cover w-full h-full"
                :src="placeStore.$loadImage(data.place_images?.[0])"
                alt="img_act"
                loading="lazy"
            >
            <div
                v-if="data.recommended || data.place_featured"
                class="absolute bottom-0 left-0 px-[2px] sp:px-[4px] pb-[4px] sp:pb-[8px] z-20 w-full"
            >
                <div class="rounded-full px-[2px] sp:px-[4px] py-[1px] sp:py-[2px] flex space-x-[1px] sp:space-x-1 bg-white flex items-center">
                    <img
                        src="/assets/icons/WA.STAR.BLACK.svg"
                        class="size-[6px] sp:size-[12px]"
                    >
                    <span class="text-[4px] sp:text-[10px] font-bold htext-black-100 leading-none lato">{{ $utils.capitalize($t('home.card-product.recommended')) }}</span>
                </div>
            </div>
        </div>
        <div class="p-[4px] sp:p-[8px] flex flex-col flex-1">
            <div class="flex-1">
                <div class="flex items-center space-x-[4px] space-x-2 mb-[4px] sp:mb-2">
                    <img
                        src="/assets/icons/WA.STAR.BLACK.svg"
                        class="size-[8px] sp:size-4"
                    >
                    <span class="text-[8px] sp:text-[16px] font-bold lato leading-none">{{ converStar(data.num_stars).toFixed(1) }}</span>
                    <span class="text-[4px] sp:text-[10px] leading-none font-bold lato leading-none">({{ data.num_reviews }} reseñas)</span>
                </div>
                <div class="truncate-2  h-[16px] sp:h-[32px]">
                    <p class="text-[6px] sp:text-[14px] font-bold truncate-2 lato leading-4" v-html="data.title" />
                </div>
                <!-- {{data.id}} -->
            </div>
            <div
                class="flex items-center justify-between"
                :class="{'justify-end': !distance}"
            >
                <div
                    v-if="distance"
                    class="flex items-center h-full aspace-x-[1px] sp:space-x-[2px]"
                >
                    <div class="flex items-center justify-center">
                        <img
                            src="/assets/icons/WA.pointer.svg"
                            class="size-[6px] sp:size-[12px]"
                        >
                        <span class="text-[4px] sp:text-[10px] font-bold leading-[10px] lato">{{ distance }}km</span>
                    </div>
                </div>
                <img
                    :src="`/assets/icons/${data.categori_place.icon}.svg`"
                    class="size-3 sp:size-6"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
const props = defineProps({
    class: String,
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
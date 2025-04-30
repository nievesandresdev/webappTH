<template>
    <div
        class="card-list"
        :class="class"
        @click="$router.push({ name: 'ShowHotel' })"
    >
        <div
            class="w-full p-[2.8px] sp:p-[4px] text-center rounded-t-[10px] flex items-center justify-center gap-[2.8px] sp:gap-[4px] h-[20px]"
            :style="{ backgroundColor: chainStore.$bgColor1 }"
        >
            <img
                src="/assets/icons/WA.STAR.BLACK.svg"
                class="size-[8.4px] sp:size-[12px]"
            >
            <span class="text-[7px] sp:text-[10px] font-bold uppercase">
                {{ 'tu alojamiento' }}
            </span>
        </div>
        <div class="flex">
            <div
                class="w-[45px] sp:w-[111px] h-[48px] sp:h-[96px] relative overflow-hidden rounded-b-[10px]"
            >
                <img
                    v-if="data.image"
                    class="object-cover w-full h-full"
                    :src="hotelStore.$loadImage(data.image)"
                    alt="img_act"
                    loading="lazy"
                >
            </div>
            <div class="p-[4px] sp:p-[8px] flex flex-col flex-1">
                <div class="flex-1">
                    <!-- <div class="truncate-1  h-[16px] sp:h-[32px]"> -->
                    <div class="truncate-1  h-[12px] sp:h-[16px]">
                        <p class="text-[6px] sp:text-[14px] font-bold truncate-1 lato leading-0" v-html="data.name" />
                    </div>
                    <div class="flex items-center space-x-[4px] space-x-2 mt-[4px] sp:mt-2">
                        Tu alojamiento
                    </div>
                </div>
                <div
                    class="flex items-center justify-between mt-[4px] sp:mt-2"
                >
                    <div
                        class="flex items-center h-full aspace-x-[1px] sp:space-x-[2px]"
                    >
                        <div class="flex items-center justify-center">
                            <img
                                src="/assets/icons/WA.pointer.svg"
                                class="size-[6px] sp:size-[12px]"
                            >
                            <span class="text-[4px] sp:text-[10px] font-medium leading-[10px] lato">0.0 km</span>
                        </div>
                    </div>
                    <img
                        src="/assets/icons/WA.MENU.DEFAULT.ALOJAMIENTO.svg"
                        class="size-3 sp:size-6"
                    >
                </div>
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

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const hotelData = inject('hotelData');

</script>

<style lang="scss" scoped>
    
    .card-list {
        border-radius: 10px;
        border: 1px solid #FFF;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }

</style>
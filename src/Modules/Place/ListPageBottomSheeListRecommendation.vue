<template>
    <div
        v-if="placesRecommendated.length > 0"
        class="pt-[12px] sp:pt-[16px] pb-[12px] sp:pb-[16px] bg-[#FFF5D7]"
    >
        <div class="space-y-[6px] sp:space-y-[8px] space-y-[6px] mb-[8px] sp:mb-[12px] px-[8px] sp:px-4">
            <p class="text-[12px] sp:text-[16px] font-bold lato mb-[6px] sp:mb-[8px]">Nuestra selección para ti</p>
            <!-- <p v-if="placesRecommendated.length > 1" class="text-[10px] sp:text-[14px] font-medium lato">{{ placesRecommendated.length }} lugares</p> -->
            <ListPageBottomSheetListText  :numbersPlaces="placesRecommendated?.length" />
        </div>
        <div
            class=""
            :class="placesRecommendated.length > 1 ? 'grid grid-flow-col auto-cols-max overflow-x-auto no-scrollbar gap-[6px] sp:gap-[8px]' : 'flex w-full  px-[8px] sp:px-4'"
        >
            <div
                v-for="place in placesRecommendated"
                :key="place.id"
                class="h-[160px] sp:h-[208px] relative rounded-[10px] overflow-hidden"
                :class="placesRecommendated.length > 1 ? 'w-[120px] sp:w-[160px] first:ml-4 last:mr-4' : 'w-full'"
            >
                <div
                    class="absolute top-0 left-0 w-full p-[2.8px] sp:p-[4px] text-center rounded-t-[10px] flex items-center justify-center gap-[2.8px] sp:gap-[4px]"
                    :style="{ backgroundColor: chainStore.$bgColor1 }"
                >
                    <img
                        src="/assets/icons/WA.STAR.BLACK.svg"
                        class="size-[8.4px] sp:size-[12px]"
                    >
                    <span class="text-[7px] sp:text-[10px] font-bold uppercase">
                        {{ $t('place.detail.recommended') }}
                    </span>
                </div>
                <div
                    style="background: rgba(51, 51, 51, 0.50);"
                    
                    class="p-[8px] absolute left-0 bottom-0 w-full z-[1000] truncate-1"
                >
                    <p class="text-[14px] font-bold lato mb-[6px] sp:mb-[8px] text-white truncate-1">
                        {{ place.title }}
                    </p>
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center flex-1">
                            <img
                                src="/assets/icons/WA.pointer.svg"
                                class="size-[8.4px] sp:size-[12px] icon-white mr-[1px]"
                            >
                            <p class="text-[8.4px] sp:text-[12px] font-medium lato text-white">
                                {{ place.distance }}km
                            </p>
                        </div>
                        <img
                            :src="`/assets/icons/${place.categori_place.icon}.svg`"
                            class="size-[16.8px] sp:size-[24px] icon-white"
                        >
                    </div>
                </div>
                <img
                    class="object-cover w-full h-full"
                    :src="placeStore.$loadImage(place.place_images?.[0])"
                    alt="img_act"
                    loading="lazy"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
    // import {  } from 'vue';

    // COMPONENTS
    import ListPageBottomSheetListText from './ListPageBottomSheetListText.vue';

    // STORE
    import { useChainStore } from '@/stores/modules/chain';
    const chainStore = useChainStore();

    // PROPS
    const props = defineProps({
        placesRecommendated: {
            type: Array,
            required: true,
            default: () => ([])
        }
    });

    //STORE
    import { usePlaceStore } from '@/stores/modules/place';
    const placeStore = usePlaceStore();
    
</script>

<style scoped lang="scss">

</style>

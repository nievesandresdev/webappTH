<template>
    <div
        v-if="placesRecommendated.length > 0"
        class="pt-[12px] sp:pt-[16px] pb-[12px] sp:pb-[16px] bg-[#FFF5D7]"
    >
    <!-- mb-[12px] sp:mb-[16px] -->
        <div class="space-y-[6px] sp:space-y-[8px] space-y-[6px] px-[8px] sp:px-4">
            <p v-if="!searchingActive" class="text-[12px] sp:text-[16px] font-bold lato mb-[6px] sp:mb-[8px]">Nuestra selección para ti</p>
            <!-- <p v-if="placesRecommendated.length > 1" class="text-[10px] sp:text-[14px] font-medium lato">{{ placesRecommendated.length }} lugares</p> -->
            <ListPageBottomSheetListText  :numbersPlaces="placesRecommendated?.length || 0" />
        </div>
        <!-- <NaturalCarousel
            :classes="{
                'pt-[6px] sp:pt-[8px]': true,
                'grid grid-flow-col auto-cols-max overflow-x-auto no-scrollbar gap-[6px] sp:gap-[8px]': placesRecommendated.length > 1,
                'flex w-full  px-[8px] sp:px-4': !(placesRecommendated.length > 1)
            }"
        > -->
        <div 
            :id="`${placesRecommendated.length > 1 ? 'carousel-recommendation' : ''}`" 
        >
            <Carousel 
                :snap-align="placesRecommendated.length > 1 ? 'start' : 'center'"
                :wrap-around="false"
                :items-to-show="2.5"
            >
            <!-- first:ml-4 last:mr-4 -->
                <Slide v-for="(place, index) in placesRecommendated" :key="place.id">
                    <div
                        class="h-[160px] sp:h-[208px] relative rounded-[10px] overflow-hidden"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp(place.id, $utils.isMockup())"
                    >
                        <div
                            class="absolute top-0 left-0 w-full p-[2.8px] sp:p-[4px] text-center rounded-t-[10px] flex items-center justify-center gap-[2.8px] sp:gap-[4px] bg-[#FFD700]"
                            >
                            <!-- :style="{ backgroundColor: chainStore.$bgColor1 }" -->
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
                            <p class="text-[14px] font-bold lato mb-[6px] sp:mb-[8px] text-[--h-gray-100] truncate-1">
                                {{ place.title }}
                            </p>
                            <div class="flex items-center justify-between w-full">
                                <div class="flex items-center flex-1">
                                    <img
                                        src="/assets/icons/WA.pointer.svg"
                                        class="size-[8.4px] sp:size-[12px] mr-[1px] icon-white"
                                    >
                                    <!-- <IconPointer class="size-[8.4px] sp:size-[12px] mr-[1px]" /> -->
                                    <p class="text-[8.4px] sp:text-[12px] font-medium lato text-[--h-gray-100]">
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
                </Slide>
            </Carousel>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from 'vue';
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide } from 'vue3-carousel';

    // import IconPointer from '@/assets/icons/WA-POINTER.svg';

    // COMPONENTS
    import ListPageBottomSheetListText from './ListPageBottomSheetListText.vue';
    //
    import { useRouter } from 'vue-router';
    const router = useRouter();
    // STORE
    import { useChainStore } from '@/stores/modules/chain';
    const chainStore = useChainStore();

    const searchingActive = inject('searchingActive');
    const formFilter = inject('formFilter');

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

    let isDragging = ref(false);

    const handleMouseDown = () => {
        isDragging.value = false;
        document.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseMove = () => {
        isDragging.value = true; // Si hay movimiento, es un arrastre.
    };

    const handleMouseUp = (placeId, isMockup) => {
        document.removeEventListener('mousemove', handleMouseMove);
        if (!isDragging.value) { // Solo si no hubo arrastre.
            router.push({ name: 'PlaceDetail', params: { id: placeId } })
        }
        isDragging.value = false;
    };
    
</script>

<style>
@media (max-width: 299px) {
    #carousel-recommendation .carousel__slide {
        width: 120px !important;
    }
    #carousel-recommendation .carousel__track {
        padding: 6px 0 6px 0 !important;
        padding-right: 48px !important; /* espacio para que no se corte el último slide */
        gap: 6px !important;
    }
    #carousel-recommendation .carousel__slide:last-child {
        margin-right: 24px !important; /* margen derecho para el último slide */
    }
}
@media (min-width: 300px) {
    #carousel-recommendation .carousel__slide {
        width: 160px !important;
    }
    #carousel-recommendation .carousel__track {
        padding: 8px 0 8px 0 !important;
        padding-right: 48px !important; /* espacio para que no se corte el último slide */
        gap: 8px !important;
    }
    #carousel-recommendation .carousel__slide:last-child {
        margin-right: 24px !important; /* margen derecho para el último slide */
    }
}

</style>

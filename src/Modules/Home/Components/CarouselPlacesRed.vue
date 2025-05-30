<template>
    <div 
        :id="items.length > 1 ? 'place-cross-start' : 'place-cross-center'"
        :class="{
            'pl-2.5 sp:pl-4': items.length > 1,
            'flex justify-center': !(items.length > 1)
        }"
    >
        <Carousel 
            :items-to-show="1.3"
            snapAlign="start"
            :mouse-drag="true"
            :touch-drag="true"
            :mouse-wheel="{ threshold: 20 }"
            :clamp="true"
        >
            <Slide v-for="(item, index) in items" :key="index">
                <CarouselCard
                    :img-url="placeStore.$loadImage(item.image)"    
                    :data="item"
                    @mousedown="handleMouseDown"
                    @mouseup="handleMouseUp(item.id, $utils.isMockup())"
                    :items-length="items.length"
                >
                    <h1 class="lato text-xs sp:text-lg font-bold leading-[14px] sp:leading-[20px] truncate text-left" v-html="item.title"></h1>
                    <div class="mt-1 sp:mt-3 flex items-center gap-[3px] sp:gap-1">
                        <img class="w-3 sp:w-4 h-3 sp:h-4 mr-[3px] sp:mr-1" src="/assets/icons/WA.STAR.BLACK.svg">
                        <p class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">{{ item.num_stars }} ({{ item.num_reviews }})</p>
                    </div>
                    <div class="mt-[6px] sp:mt-2 flex items-center gap-[3px] sp:gap-1">
                        <img class="w-3 sp:w-4 h-3 sp:h-4 mr-[3px] sp:mr-1" src="/assets/icons/WA.pointer.svg">
                        <p class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">{{item.cityName}}</p>
                    </div>
                    <div class="mt-[6px] sp:mt-2 flex items-center gap-[3px] sp:gap-1">
                        <img class="w-3 sp:w-4 h-3 sp:h-4 mr-[3px] sp:mr-1" src="/assets/icons/WA.Walking.svg">
                        <p class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">{{ item.distance }} km</p>
                    </div>
                </CarouselCard>
            </Slide>
        </Carousel>
    </div>
    
</template>
<script setup>
import { ref, onMounted } from 'vue';
import CarouselCard from './CarouselCard.vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { usePlaceStore } from '@/stores/modules/place'
const placeStore = usePlaceStore()

const props =  defineProps({
    items: {
        type: Array,
        default: () => ([])
    },
    id: {
        type: String,
        default: '0'
    }
})

let isDragging = ref(false);
// const screenWidth = ref(window.innerWidth)
// const itemsToShow = ref(1.32)

onMounted(() => {
    // if(screenWidth.value < 300){
    //     itemsToShow.value = 1.22
    // }else if(screenWidth.value > 300 && screenWidth.value < 340){
    //     itemsToShow.value = 1.165
    // }else{
    //     itemsToShow.value = 1.332
    // }
})

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
        goPlace(placeId, isMockup);
    }
    isDragging.value = false;
};

function goPlace (place, isMockup) {
    if(!isMockup){
        router.push({name:'PlaceDetail',params:{id:place}})
    }
}
</script>
<style>
#place-cross-start .carousel__track {
    justify-content: start;
}

#place-cross-center .carousel__track {
    justify-content: center !important;
}

@media (max-width: 299px) {
    #place-cross-start .carousel__viewport,
    #place-cross-center .carousel__viewport {
        padding-bottom: 8px;
    }
    #place-cross-start .carousel__viewport {
        padding-right: 10px;
    }
    #place-cross-start .carousel__track{
        gap: 10px;
    }
}
@media (min-width: 300px) {
    #place-cross-start .carousel__viewport,
    #place-cross-center .carousel__viewport {
        padding-bottom: 16px;
    }
    #place-cross-start .carousel__viewport {
        padding-right: 20px;
    }
    #place-cross-start .carousel__track{
        gap: 16px;
    }
}
</style>
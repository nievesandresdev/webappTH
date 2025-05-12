<template>
    <div 
        :id="`${items.length > 1 ? 'facility-cross-mobile' : ''}`"
        class="carousel-home"
        :class="{
            'pl-2.5 sp:pl-4': items.length > 1,
            'flex justify-center': !(items.length > 1)
        }"
    >
        <Carousel 
            :items-to-show="items.length > 1 ? 1.2 : 1"
            :snap-align="items.length > 1 ? 'start' : 'center'"
        >
            <Slide v-for="(item, index) in items" :key="index">
                <CarouselCard
                    :img-url="facilityStore.$loadImage(item?.image)"    
                    :data="item"
                    @mousedown="handleMouseDown"
                    @mouseup="handleMouseUp(item.id, $utils.isMockup())"
                >
                    <div class="flex items-center h-[22px] sp:h-[32px]">
                        <p 
                            v-if="item.title"
                            class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] truncate-2t text-left"
                            v-html="item.title[0].toUpperCase() + item.title.substring(1)"
                        ></p>
                    </div>  
                </CarouselCard>
            </Slide>
        </Carousel>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import CarouselCard from './CarouselCard.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
//
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { useFacilityStore } from '@/stores/modules/facility'
const facilityStore = useFacilityStore()

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

const handleMouseDown = () => {
    isDragging.value = false;
    document.addEventListener('mousemove', handleMouseMove);
};

const handleMouseMove = () => {
    isDragging.value = true; // Si hay movimiento, es un arrastre.
};

const handleMouseUp = (facilityId, isMockup) => {
    document.removeEventListener('mousemove', handleMouseMove);
    if (!isDragging.value) { // Solo si no hubo arrastre.
        goFacility(facilityId, isMockup);
    }
    isDragging.value = false;
};

function goFacility (facility,isMockup) {
    if(!isMockup){
        router.push({name:'ShowFacility',params:{id:facility}})
    }
}

</script>
<style>



@media (max-width: 299px) {
    #facility-cross-mobile .carousel__slide {
        height: 140px;
    }
}
@media (min-width: 300px) {
    #facility-cross-mobile .carousel__slide {
        height: 232px;
    }
}
</style>
<template>
    <NaturalCarousel
        v-if="items.length > 0"   
        ref="carouselRef"
        :classes="{
            'flex gap-4 overflow-x-auto w-full py-2.5 sp:py-4 no-scrollbar px-2.5 sp:px-4': true,
            'justify-center': items.length == 1
        }"
        @item-click="handleItemClick" 
    >
        <CarouselCard
            model="place"
            v-for="(item, index) in items"
            :key="item.id"
            :img-url="placeStore.$loadImage(item.image)"    
            :data="item"
            :id="`place-${item.id}`"
        >
            <h1 class="lato text-xs sp:text-lg font-bold leading-[14px] sp:leading-[20px] truncate" v-html="item.title"></h1>
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
    </NaturalCarousel>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NaturalCarousel from '@/components/Carousel/NaturalCarousel.vue';
import CarouselCard from './CarouselCard.vue';
import { isMockup } from '@/utils/utils';
//
import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

const router = useRouter();
const carouselRef = ref(null);

function handleItemClick(e) {
    console.log('handleItemClick',e)
    const card = e.target.closest('.carousel-card-place'); // Ajusta según tu clase CSS
    console.log('handleItemClick',card)
    if (card) {
        const itemId = card.getAttribute('data-id');
        console.log('itemId',itemId)
        let placeId = itemId.split('-')[1]
        console.log('placeId',placeId)
        goPlace(placeId, isMockup());
    }
}

function goPlace(place, isMockup) {
    if (!isMockup) {
        router.push({ name: 'PlaceDetail', params: { id: place } });
    }
}
</script>
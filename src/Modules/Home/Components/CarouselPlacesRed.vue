<template>
    <div 
        v-if="items.length > 0"   
        class="flex gap-4 overflow-x-auto w-full py-2.5 sp:py-4 no-scrollbar px-2.5 sp:px-4"
        :class="{'justify-center': items.length == 1}"
    >
        <CarouselCard
            v-for="(item, index) in items"
            :img-url="placeStore.$loadImage(item.place_images?.[0])"    
            :data="item"
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
    </div>
</template>
<script setup>
import CarouselCard from './CarouselCard.vue';
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

function goFacility (facility,isMockup) {
    if(!isMockup){
        router.push({name:'ShowFacility',params:{id:facility}})
    }
}
</script>
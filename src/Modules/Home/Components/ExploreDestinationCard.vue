<template>
    <div class="flex gap-[6px] sp:gap-[10px] items-center w-[166px] sp:w-[295px] flex-shrink-0" @click="goPlace(data.id, $utils.isMockup())">
        <img 
            class="w-[54px] h-[54px] sp:w-[80px] sp:h-[80px] rounded-[6px] sp:rounded-[10px]"
            :src="placeStore.$loadImage(data.image)"
        >
        <div class="truncate">
            <h3 class="lato text-[10px] sp:text-[14px] font-bold leading-[12px] sp:leading-[16px] truncate">
                {{ data.title }}
            </h3>
            <div class="flex gap-[4px] items-center mt-1 sp:mt-2">
                <img src="/assets/icons/WA.STAR.BLACK.svg" class="w-3 sp:w-4 h-3 sp:h-4">
                <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px]">
                    {{ data.num_stars }}
                </span>
            </div>
            <div class="flex gap-[4px] items-center mt-1 sp:mt-2">
                <IconCustomColor 
                    class="w-3 sp:w-4 h-3 sp:h-4"
                    name="WA.Walking" 
                    color="#777777" 
                />
                <span class="lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px] text-[#777777]">
                    {{ data.distance }} km
                </span>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import IconCustomColor from '@/components/IconCustomColor.vue';
//
import { usePlaceStore } from '@/stores/modules/place'
const placeStore = usePlaceStore()
// ROUTER
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

function goPlace (place, isMockup) {
    if(!isMockup){
        router.push({name:'PlaceDetail',params:{id:place}})
    }
}
</script>
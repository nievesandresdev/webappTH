<template>
    <div 
        v-if="items.length > 0"  
        id="facility-cross-mobile" 
        class="flex gap-4 overflow-x-auto w-full py-2.5 sp:py-4"
        :class="{'justify-center': items.length == 1}"
    >
        <CarouselCard
            v-for="(item, index) in items"
            :img-url="facilityStore.$loadImage(item?.image)"    
            :data="item"
            @click="goFacility(item.id, $utils.isMockup())"
        >
            <div class="flex items-center max-h-[32px]">
                <p 
                class="lato text-sm font-bold leading-[16px] truncate-2"
                    v-html="item.title[0].toUpperCase() + item.title.substring(1)"
                ></p>
            </div>  
        </CarouselCard>
    </div>
</template>
<script setup>
import CarouselCard from './CarouselCard.vue';
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

function goFacility (facility,isMockup) {
    if(!isMockup){
        router.push({name:'ShowFacility',params:{id:facility}})
    }
}
</script>
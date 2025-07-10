<template>
    <section 
        v-if="crossellingsData?.crosselling_facilities?.length > 0 && hotelStore.hotelData?.show_facilities" 
    >
        <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px] mt-1 sp:mt-2">
            <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                {{ $utils.capitalize($t('home.section-facility.title')) }}
            </h2>
            <a 
                @click="goFacilities()" 
                class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline" href="javascript:void(0)"
            >
                {{ $utils.capitalize($t('home.btn-see-all')) }}
            </a>
        </div>
        <div>
            <div 
                v-if="crossellingsData?.crosselling_facilities?.length > 0"  
                id="facility-cross-mobile" 
                class="flex gap-3 sp:gap-4 overflow-x-auto w-full pt-2 sp:pt-4 pb-1 sp:pb-2 px-2.5 sp:px-4 no-scrollbar"
                :class="{'justify-center': crossellingsData?.crosselling_facilities?.length == 1}"
            >
                <CarouselCard
                    v-for="(item, index) in crossellingsData.crosselling_facilities"
                    :img-url="facilityStore.$loadImage(item?.image)"    
                    :data="item"
                    @click="goFacility(item.id, $utils.isMockup())"
                >
                    <div class="flex items-center max-h-[22px] sp:max-h-[32px]">
                        <p 
                            v-if="item.title"
                            class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] truncate-2"
                            v-html="item.title[0].toUpperCase() + item.title.substring(1)"
                        ></p>
                    </div>  
                </CarouselCard>
            </div>
        </div>
    </section>
</template>
<script setup>
import { inject } from 'vue';
import CarouselCard from './CarouselCard.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { useFacilityStore } from '@/stores/modules/facility'
const facilityStore = useFacilityStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const  crossellingsData = inject('crossellingsData')


function goFacility (facility,isMockup) {
    if(!isMockup){
        router.push({name:'ShowFacility',params:{id:facility}})
    }
}
</script>
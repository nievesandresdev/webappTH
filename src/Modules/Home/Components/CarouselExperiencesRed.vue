<template>
    <section 
        v-if="crossellingPlacesData?.crosselling_experiences?.length > 0 && hotelStore.hotelData?.show_experiences"
        class="mt-1 sp:mt-2"
    >
        <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px]">
            <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                {{ $utils.capitalize($t('home.section-experience.title')) }}
            </h2>
            <router-link :to="{name:'ExperienceList'}" class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline">
                {{ $utils.capitalize($t('home.btn-see-all')) }}
            </router-link>
        </div>
        <div>
            <div 
                v-if="crossellingPlacesData?.crosselling_experiences?.length > 0"   
                class="flex gap-4 overflow-x-auto w-full pt-2 sp:pt-4 pb-1 sp:pb-2 px-2.5 sp:px-4 no-scrollbar"
                :class="{'justify-center': crossellingPlacesData?.crosselling_experiences?.length == 1}"
            >
                <CarouselCard
                    v-for="(item, index) in crossellingPlacesData?.crosselling_experiences"
                    :img-url="experienceStore. $loadImage(item.image)"    
                    :data="item"
                    @click="goExperience(item)"
                >
                    <p 
                    class="lato text-xs sp:text-lg font-bold leading-[14px] sp:leading-[20px] max-h-[28px] sp:max-h-[40px] truncate-2"
                        v-html="item.title"
                    ></p>
                    <div class="mt-[3px] sp:mt-1 flex items-center gap-[3px] sp:gap-1 h-3 sp:h-4">
                        <img v-if="item?.reviews?.combined_average_rating" class="w-3 sp:w-4 h-3 sp:h-4 mr-[3px] sp:mr-1" src="/assets/icons/WA.STAR.BLACK.svg">
                        <p v-if="item?.reviews?.combined_average_rating" class="lato text-[10px] sp:text-sm font-bold leading-[16px]">
                            {{ item?.reviews?.combined_average_rating.toFixed(2) }} ({{ item?.reviews?.total_reviews }})
                        </p>
                    </div>
                    <h2  class="lato text-xs sp:text-lg font-bold leading-[14px] sp:leading-[20px] mt-3 h-5">
                    <template v-if="item.from_price">{{ $t('experience.card-experience.from') }} {{ $utils.formatPrice(item.from_price) }}€</template>  
                    </h2>
                    <div class="mt-2 sp:mt-3 h-3 sp:h-4">
                        <p v-if="getDuration(item)" class="lato text-[10px] sp:text-sm font-bold leading-[10px] sp:leading-[16px]">
                            <template v-if="getDuration(item).minutes <= 0">
                                {{ `${getDuration(item).hours}H ${$t('experience.card-experience.aprox')}` }}
                            </template>
                            <template v-else>
                                {{ `${getDuration(item).hours}H ${$t('experience.card-experience.and')} ${getDuration(item).minutes} ${$t('experience.card-experience.aprox')}` }}
                            </template>
                        </p>
                    </div>
                    <p class="mt-[3px] sp:mt-1 lato text-[10px] sp:text-sm font-medium leading-[10px] sp:leading-[16px]">
                        <template v-if="item.cancellation_policy == 'STANDARD'">
                            {{ $utils.capitalize($t('experience.card-experience.annulation-gratuite')) }}
                        </template>
                        <template v-else>
                            {{ $utils.capitalize($t('experience.card-experience.non-refundable')) }}
                        </template>
                    </p>
                </CarouselCard>
            </div>
        </div>
</section>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
import CarouselCard from './CarouselCard.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { useExperienceStore } from '@/stores/modules/experience'
const experienceStore = useExperienceStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const crossellingPlacesData = inject('crossellingPlacesData')
const duration = ref(null);
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


function getDuration (data) {
    if (!data.duration) null
    let hours = Math.floor(data.duration / 60)
    let minutes = data.duration % 60
    let m = {
        hours,
        minutes,
    }
    return m
}

function goExperience (exp) {
    if (exp.name_api === 'viator') {
        router.push({ name:'DetailActivity', params: { slug: exp.slug } });
    } else {
        router.push({ name: 'DetailService', params: { service: 'activity', slug: exp.slug } });
    }
}

</script>
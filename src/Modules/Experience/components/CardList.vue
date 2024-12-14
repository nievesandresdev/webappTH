<template>
    <div
        class="card-list flex w-full" :class="class"
        @click="$router.push({ name: 'ExperienceDetail', params: { slug: data.slug } })"
    >
    
        <div class="w-[55px] sp:w-[111px] rounded-[10px] relative overflow-hidden">
            <img
                v-if="data.image?.url"
                class="object-cover w-full h-full"
                :src="data.image?.image ? experienceStore.$loadImage(data.image?.image) : data.image?.url"
                alt="img_act"
                loading="lazy"
            >
            <div
                v-if="data.featured"
                class="absolute bottom-0 left-0 px-[2px] sp:px-[4px] pb-[4px] sp:pb-[8px] z-20 w-full"
            >
                <div class="rounded-full px-[2px] sp:px-[4px] py-[1px] sp:py-[2px] flex space-x-[1px] sp:space-x-1 bg-white flex items-center">
                    <img
                        src="/assets/icons/WA.STAR.BLACK.svg"
                        class="size-[6px] sp:size-[12px]"
                    >
                    <span class="text-[4px] sp:text-[10px] font-bold htext-black-100 leading-none lato">{{ ($t('home.card-product.recommended'))?.toUpperCase() }}</span>
                </div>
            </div>
        </div>
        <div class="p-[4px] sp:p-[8px] flex flex-col flex-1">
            <div class="flex items-center space-x-[4px] space-x-2 mb-[4px] sp:mb-2">
                <img
                    src="/assets/icons/WA.STAR.BLACK.svg"
                    class="size-[8px] sp:size-4"
                >
                <span class="text-[8px] sp:text-[16px] font-bold lato leading-none">{{ data.reviews?.combined_average_rating.toFixed(1) }}</span>
                <span class="text-[4px] sp:text-[10px] leading-none font-bold lato leading-none">({{ data.reviews?.total_reviews }} reseñas)</span>
            </div>
            <p class="text-[6px] sp:text-[14px] font-bold lato leading-0" v-html="data.title" />
            <!-- {{data.id}} -->
            <div
                class="flex items-center justify-between pb-[4px] sp:pb-[8px] mt-[8px] sp:mt-[16px]"
            >
                <div class="flex flex-col space-y-1 sp:space-y-2">
                    <div class="flex items-center space-x-0.5 sp:space-x-1">
                        <img
                            src="/assets/icons/WA.Clock.svg"
                            class="size-[6px] sp:size-[12px]"
                        >
                        <span v-if="duration" class="text-[5px] sp:text-[10px] font-bold lato leading-non">
                            <!-- 2 HORAS Y 30 MIN -->
                            <template v-if="duration.minutes <= 0">
                                {{ `${duration.hours} ${$t('experience.card-experience.hour').toUpperCase()}` }}
                            </template>
                            <template v-else>
                                {{ `${duration.hours} ${$t('experience.card-experience.hour').toUpperCase()} ${$t('experience.card-experience.and').toUpperCase()} ${duration.minutes} MIN` }}
                            </template>
                        </span>
                    </div>
                    <p class="text-[5px] sp:text-[10px] font-bold lato">
                        <template v-if="data.cancellation_policy == 'STANDARD'">
                            {{ $t('experience.card-experience.annulation-gratuite').toUpperCase() }}
                        </template>
                        <template v-else>
                            {{ $t('experience.card-experience.non-refundable').toUpperCase() }}
                        </template>
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-[5px] sp:text-[10px] font-medium lato leading-non">{{ $t('experience.card-experience.from') }}</p>
                    <p class="text-[9px] sp:text-[16px] font-medium lato leading-non">{{  $utils.formatPrice(data.from_price) }} €</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
const { data } = defineProps({
    class: String,
    data: {
        type: Object,
        default: () => null,
    }
});

import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();


const duration = computed(() => {
    if (!data.duration) null
    let hours = Math.floor(data.duration / 60)
    let minutes = data.duration % 60
    let m = {
        hours,
        minutes,
    }
    return m
});

function converStar(value){
    if(!value) return 0
    return parseFloat(value.replace(",", "."))
}



const hotelData = inject('hotelData');


</script>

<style lang="scss">
    
    .card-list {
        border-radius: 10px;
        border: 1px solid #FFF;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }

</style>
<template>
    <div 
        v-if="items.length > 0"   
        class="flex gap-4 overflow-x-auto w-full py-2.5 sp:py-4  no-scrollbar"
        :class="{'justify-center': items.length == 1}"
    >
        <CarouselCard
            v-for="(item, index) in items"
            :img-url="item.image?.url"    
            :data="item"
        >
            <p 
            class="lato text-lg font-bold leading-[20px] max-h-[40px] truncate-2"
                v-html="item.title"
            ></p>
            <div class="mt-1 flex items-center gap-1 h-4">
                <img v-if="item?.reviews?.combined_average_rating" class="w-4 h-4 mr-1" src="/assets/icons/WA.STAR.BLACK.svg">
                <p v-if="item?.reviews?.combined_average_rating" class="lato text-sm font-bold leading-[16px]">
                    {{ item?.reviews?.combined_average_rating.toFixed(2) }} ({{ item?.reviews?.total_reviews }})
                </p>
            </div>
            <h2  class="lato text-lg font-bold leading-[20px] mt-3 h-5">
               <template v-if="item.from_price">{{ $t('experience.card-experience.from') }} {{ $utils.formatPrice(item.from_price) }}€</template>  
            </h2>
            <div class="mt-3 h-4">
                <p v-if="getDuration(item)" class="lato text-sm font-bold leading-[16px]">
                    <template v-if="getDuration(item).minutes <= 0">
                        {{ `${getDuration(item).hours}H ${$t('experience.card-experience.aprox')}` }}
                    </template>
                    <template v-else>
                        {{ `${getDuration(item).hours}H ${$t('experience.card-experience.and')} ${getDuration(item).minutes} ${$t('experience.card-experience.aprox')}` }}
                    </template>
                </p>
            </div>
            <p class="mt-1 lato text-sm font-medium leading-[16px]">
                <template v-if="item.cancellation_policy == 'STANDARD'">
                    {{ $utils.capitalize($t('experience.card-experience.annulation-gratuite')) }}
                </template>
                <template v-else>
                    {{ $utils.capitalize($t('experience.card-experience.non-refundable')) }}
                </template>
            </p>
        </CarouselCard>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CarouselCard from './CarouselCard.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { usePlaceStore } from '@/stores/modules/place'
const placeStore = usePlaceStore()

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

</script>
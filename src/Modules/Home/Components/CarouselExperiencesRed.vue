<template>
    <div 
        :id="items.length > 1 ? 'experience-cross-start' : 'experience-cross-center'"
        :class="{
            'pl-2.5 sp:pl-4': items.length > 1,
            'flex justify-center': items.length === 1
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
                    :img-url="experienceStore. $loadImage(item.image)"    
                    :data="item"
                    @mousedown="handleMouseDown"
                    @mouseup="handleMouseUp(item, $utils.isMockup())"
                    :items-length="items.length"
                >
                    <p 
                    class="lato text-xs sp:text-lg font-bold leading-[14px] sp:leading-[20px] max-h-[28px] sp:max-h-[40px] truncate-2 text-left"
                        v-html="item.title"
                    ></p>
                    <div class="mt-[3px] sp:mt-1 flex items-center gap-[3px] sp:gap-1 h-3 sp:h-4">
                        <img v-if="item?.reviews?.combined_average_rating" class="w-3 sp:w-4 h-3 sp:h-4 mr-[3px] sp:mr-1" src="/assets/icons/WA.STAR.BLACK.svg">
                        <p v-if="item?.reviews?.combined_average_rating" class="lato text-[10px] sp:text-sm font-bold leading-[16px]">
                            {{ item?.reviews?.combined_average_rating.toFixed(2) }} ({{ item?.reviews?.total_reviews }})
                        </p>
                    </div>
                    <h2  class="lato text-xs sp:text-lg font-bold leading-[14px] sp:leading-[20px] mt-3 h-5 text-left">
                    <template v-if="item.from_price">{{ $t('experience.card-experience.from') }} {{ $utils.formatPrice(item.from_price) }}€</template>  
                    </h2>
                    <div class="mt-2 sp:mt-3 h-3 sp:h-4">
                        <p v-if="getDuration(item)" class="lato text-[10px] sp:text-sm font-bold leading-[10px] sp:leading-[16px] text-left">
                            <template v-if="getDuration(item).minutes <= 0">
                                {{ `${getDuration(item).hours}H ${$t('experience.card-experience.aprox')}` }}
                            </template>
                            <template v-else>
                                {{ `${getDuration(item).hours}H ${$t('experience.card-experience.and')} ${getDuration(item).minutes} ${$t('experience.card-experience.aprox')}` }}
                            </template>
                        </p>
                    </div>
                    <p class="mt-[3px] sp:mt-1 lato text-[10px] sp:text-sm font-medium leading-[10px] sp:leading-[16px] text-left">
                        <template v-if="item.cancellation_policy == 'STANDARD'">
                            {{ $utils.capitalize($t('experience.card-experience.annulation-gratuite')) }}
                        </template>
                        <template v-else>
                            {{ $utils.capitalize($t('experience.card-experience.non-refundable')) }}
                        </template>
                    </p>
                </CarouselCard>
            </Slide>
        </Carousel>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CarouselCard from './CarouselCard.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { useExperienceStore } from '@/stores/modules/experience'
const experienceStore = useExperienceStore()

const duration = ref(null);
let isDragging = ref(false);
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

// const screenWidth = ref(window.innerWidth)
// const itemsToShow = ref(1.32)

// onMounted(() => {
//     if(screenWidth.value < 300){
//         itemsToShow.value = 1.22
//     }else if(screenWidth.value > 300 && screenWidth.value < 340){
//         itemsToShow.value = 1.165
//     }else{
//         itemsToShow.value = 1.332
//     }
// })

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

function goExperience (exp, isMockup) {
    if(isMockup) return;
    if (exp.name_api === 'viator') {
        router.push({ name:'DetailActivity', params: { slug: exp.slug } });
    } else {
        router.push({ name: 'DetailService', params: { service: 'activity', slug: exp.slug } });
    }
}

const handleMouseDown = () => {
    isDragging.value = false;
    document.addEventListener('mousemove', handleMouseMove);
};

const handleMouseMove = () => {
    isDragging.value = true; // Si hay movimiento, es un arrastre.
};

const handleMouseUp = (exp, isMockup) => {
    document.removeEventListener('mousemove', handleMouseMove);
    if (!isDragging.value) { // Solo si no hubo arrastre.
        goExperience(exp, isMockup);
    }
    isDragging.value = false;
};

</script>
<style>
#experience-cross-start .carousel__track {
    justify-content: start;
}

#experience-cross-center .carousel__track {
    justify-content: center !important;
}
@media (max-width: 299px) {
    #experience-cross-start .carousel__viewport,
    #experience-cross-center .carousel__viewport {
        padding-bottom: 8px;
    }
    #experience-cross-start .carousel__viewport {
        padding-right: 10px;
    }
    #experience-cross-start .carousel__track{
        gap: 10px;
    }
}
@media (min-width: 300px) {
    #experience-cross-start .carousel__viewport,
    #experience-cross-center .carousel__viewport {
        padding-bottom: 16px;
    }
    #experience-cross-start .carousel__viewport {
        padding-right: 20px;
    }
    #experience-cross-start .carousel__track{
        gap: 16px;
    }
}
</style>
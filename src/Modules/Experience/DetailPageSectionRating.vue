<template>
    <div class="flex space-x-1 sp:space-x-2">
        <p class="text-[17px] sp:text-[30px] roboto font-medium leading-[18px] sp:leading-[32px]">0.0</p>
        <div class="space-y-[4px] sp:space-y-[8px]">
            <div class="flex space-x-[2px] sp:space-x-[4px]">
                <template v-for="star in 5">
                     <img
                            :src="`/assets/icons/WA.${star <= 3 ? 'star' : 'STAR.GREY'}.svg`"
                            class="size-[9px] sp:size-[16px]"
                        >
                </template>
            </div>
            <p class="text-[8px] sp:text-[14px] font-medium leading-0">0000 reseñas</p>
        </div>
    </div>
    <div class="p-3 sp:p-6 border border-color-secondary bg-gradient-100 rounded-[10px] mt-[5px] sp:mt-[8px]">
        <template v-for="(item, index) in reviewsData">
            <div class="flex justify-between items-center space-x-[16px]">
                <p class="text-[8px] sp:text-[14px] font-medium leading-0 lato">{{item.star}} estrellas</p>
                <div class="w-[84px] sp:w-[168px]">
                    <div class="progress-container">
                        <div :style="{ width: getPercentage(item.numbers) + '%',  borderRadius: getPercentage(item.numbers) == 100 ? '6px' : '6px 0px 0px 6px' }" class="progress"></div>
                    </div>
                </div>
                <p class="text-[8px] sp:text-[14px] font-medium leading-0 lato">0000</p>
            </div>
            <div
                v-if="index < reviewsData.length - 1"
                class="py-[12px] sp:py-[24px] w-full"
            >
                <div class="border-b border-[#E9E9E9]"></div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick, provide, computed, toRefs, inject } from 'vue';

const reviewsData = ref([{
    numbers: 10,
    star: 1,
}, {
    numbers: 20,
    star: 2,
},  {
    numbers: 30,
    star: 3,
}]);

const experienceViatorData = inject('experienceViatorData');

const totalReviews = computed(() => {
    return 100;
});

watch(experienceViatorData, (viatorData) => {
    // reviewsData.value = viatorData;
    console.log(viatorData, 'viatorData');
});


function getPercentage(numbersReview) {
    if (!totalReviews.value || !numbersReview) return 0; 
    let calc =  (numbersReview / totalReviews.value) * 100;
    return calc;
}



</script>

<style lang="scss">
    .progress-container {
        width: 100%;
        height: 7px;
        border-radius: 6px;
        background-color: #FFFFFF;
    }

    .progress {
        height: 100%;
        background-color: #333333;
    }

    @media (min-width: 300px) {
        .progress-container {
            height: 12px;
        }
    }
</style>
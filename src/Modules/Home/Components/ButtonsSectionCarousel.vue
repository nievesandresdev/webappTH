<template>
    <div class="" id="carousel-buttons">
        <Carousel :items-to-show="1">
            <Slide key="slide1">
                <div class="px-2 sp:px-6 flex items-start justify-between w-full">
                    <div 
                        v-for="button in buttonsMap.slice(0, 4)"
                        :key="button.name"
                        class="block max-w-[76px]"
                    >
                        <template v-if="button.show">
                            <RoundedButton
                                classContainer="mx-auto"
                                :id="`call-button-${button.name}`"
                                :iconUrl="button.iconUrl"
                                sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                                @click="handleAction(button.action)"
                            />
                            <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t(button.translate) }}</span>
                        </template>
                    </div>
                </div>
            </Slide>
            <Slide key="slide12">
                <div class="px-2 sp:px-6 flex items-start w-full gap-6">
                    <div 
                        v-for="button in buttonsMap.slice(4)"
                        :key="button.name"
                        class="block max-w-[76px]"
                    >
                        <template v-if="button.show">
                            <RoundedButton
                                classContainer="mx-auto"
                                :id="`call-button-${button.name}`"
                                :iconUrl="button.iconUrl"
                                sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                                @click="handleAction(button.action)"
                            />
                            <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t(button.translate) }}</span>
                        </template>
                    </div>
                </div>
            </Slide>
            <template #addons>
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import RoundedButton from '@/components/Buttons/RoundedButton.vue';

const emit = defineEmits(['goCall','openModalWifi','openModalRules','openModalRewards','goReserve','goCheckin'])

const buttonsMap = inject('buttonsMap')


const goCall = () => {emit('goCall')}
const openModalWifi = () => {emit('openModalWifi')}
const openModalRules = () => {emit('openModalRules')}
const openModalRewards = () => {emit('openModalRewards')}
const goReserve = () => {emit('goReserve')}
const goCheckin = () => {emit('goCheckin')}

const handleAction = (action) => {
    console.log('test handleAction', action)
    action();
}   

</script>
<style>
#carousel-buttons .carousel__pagination .carousel__pagination-button{
    background-color: #fff;
    border: 1px solid #333;
    margin: 16px 4px 0 4px;
}
#carousel-buttons .carousel__pagination .carousel__pagination-button--active{
    background-color: #333;
}
#carousel-buttons .carousel__pagination{
    margin: 0;
}

@media (max-width: 299px) {
    #carousel-buttons .carousel__pagination .carousel__pagination-button{
        width: 4px !important;
        height: 4px !important;
        margin: 8px 2px 0 2px;
    }
}
</style>

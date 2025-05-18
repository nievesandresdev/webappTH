<template>
    <div class="" id="carousel-buttons">
        <Carousel :items-to-show="1">
            <Slide key="checkin">
                <div class="px-2 sp:px-6 flex items-start justify-between w-full">
                    <!-- button checkin -->
                    <router-link v-if="showCheckinButton" :to="{name: 'Guests'}" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="checkin-button"
                            iconUrl="/assets/icons/WA.checkin.user.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.checkin') }}</span>
                    </router-link>
                    <!-- button call -->
                    <div v-if="showPhoneButton" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="call-button"
                            iconUrl="/assets/icons/WA.llamar.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="goCall"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.call') }}</span>
                    </div>
                    <!-- button wifi -->
                    <div v-if="showWifiButton" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="wifi-button"
                            iconUrl="/assets/icons/WA.wifi.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="isOpenWifi"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.wifi') }}</span>
                    </div>
                    <!-- button rules --> 
                    <div v-if="showRulesButton" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="rules-button"
                            iconUrl="/assets/icons/WA.normas.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="isOpenRules"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.rules') }}</span>
                    </div>
                    <!-- button refered -->
                    <div v-if="showReferedButton && activeButtonsCount == 5" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="refered-button"
                            iconUrl="/assets/icons/WA.referido.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="openModalRewards"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.refered') }}</span>
                    </div>
                    <!-- button refered -->
                    <div v-if="showReferedButton2 && activeButtonsCount == 5" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="refered-button"
                            iconUrl="/assets/icons/WA.referente.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="openModalRewards"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.refered') }}</span>
                    </div>
                </div>
            </Slide>
            <Slide key="refered">
                <div class="px-2 sp:px-6 flex items-start w-full gap-[36px]">
                    <!-- button refered -->
                    <div v-if="showReferedButton && activeButtonsCount > 5" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="refered-button"
                            iconUrl="/assets/icons/WA.referido.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="openModalRewards"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.refered') }}</span>
                    </div>
                    <!-- button refered -->
                    <div v-if="showReferedButton2 && activeButtonsCount > 5" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="refered-button"
                            iconUrl="/assets/icons/WA.referente.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                            @click="openModalRewards"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.refered') }}</span>
                    </div>

                    <router-link v-if="showReserveButton" :to="{name: 'ReservationStay'}" class="block max-w-[76px]">
                        <RoundedButton
                            classContainer="mx-auto"
                            id="reserve-button"
                            iconUrl="/assets/icons/WA.bookyournextstay.svg"
                            sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                        />
                        <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.reserve') }}</span>
                    </router-link>
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

const emit = defineEmits(['goCall','isOpenWifi','isOpenRules','openModalRewards'])

const showCheckinButton = inject('showCheckinButton')
const showRulesButton = inject('showRulesButton')
const showWifiButton = inject('showWifiButton')
const showPhoneButton = inject('showPhoneButton')
const showReserveButton = inject('showReserveButton')
const showReferedButton = inject('showReferedButton')
const showReferedButton2 = inject('showReferedButton2')
const activeButtonsCount = inject('activeButtonsCount')

const goCall = () => {emit('goCall')}
const isOpenWifi = () => {emit('isOpenWifi')}
const isOpenRules = () => {emit('isOpenRules')}
const openModalRewards = () => {emit('openModalRewards')}

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

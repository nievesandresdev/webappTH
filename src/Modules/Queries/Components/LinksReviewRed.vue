<template>
    <div :class="{'hshadow md:shadow-none rounded-[20px] sp:p-4 p-2 md:p-0 sp:mb-4 mb-2 md:mb-0 bg-gradient-h border border-color-secondary': !inModal}">
        <!-- <img 
            class="w-6 h-6 hidden md:inline-block invisible" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
        > -->
        <h1 
            id="title-container-request"
            :class="{
                'lato text-[10px] sp:text-base md:text-[36px] font-medium md:font-semibold md:mt-6 leading-3 sp:leading-5 md:leading-[110%]':!inModal,
                'lato text-[20px] font-bold leading-[28px]':inModal,
                }" 
            v-html="requestTexts?.title"
        ></h1>
        <div 
            id="description-container1"
            class="description-container1 mt-3 md:mt-6" 
            v-html="requestTexts?.text1"
        ></div>
        <div class="buttons flex flex-col gap-4">
            <div v-if="requestTexts?.otas_enabled?.booking && requestTexts?.buttonAnchor">
                <GoOtaButton ota="booking" textButton="Continuar en Booking"/>
            </div>
            <div v-if="requestTexts?.otas_enabled?.expedia && requestTexts?.buttonAnchor">
                <GoOtaButton ota="expedia" textButton="Continuar en Expedia"/>
            </div>
            <div v-if="requestTexts?.otas_enabled?.tripadvisor && requestTexts?.buttonAnchor">
                <GoOtaButton ota="tripadvisor" textButton="Continuar en Tripadvisor" />
            </div>
            <div v-if="requestTexts?.otas_enabled?.google && requestTexts?.buttonAnchor">
                <GoOtaButton ota="google" textButton="Continuar en Google"/>
            </div>
            <div v-if="requestTexts?.otas_enabled?.airbnb && requestTexts?.buttonAnchor">
                <GoOtaButton ota="airbnb" textButton="Continuar en Airbnb"/>
            </div>
        </div>
        <div 
            id="description-container2" 
            class="description-container2 mt-3 sp:mt-6 md:mt-8" 
            v-html="requestTexts?.text2"
        ></div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, inject } from 'vue';
import GoOtaButton from '@/components/Buttons/GoOtaButton.vue'

const period = inject('period')
const requestTexts = inject('requestTexts')

const props = defineProps({
    inModal:{
        type: Boolean,
        default:false
    },
})

</script>
<style>
#title-container-request > *,
#description-container1 > *,
#description-container2 > *{
    font-family: "Lato", sans-serif !important;
}

.description-container2
.description-container2 > strong,
.description-container1 > p,
.description-container2 > p{
    font-family: "Lato", sans-serif !important;
    font-size: 16px;
    font-weight: 700 !important;
    line-height: 20px;
}

.description-container2 > strong{
    font-weight: 500;
}

@media (min-width: 768px) {
    .description-container1 > p{
        font-size: 24px;
        line-height: 130%;
    }
    .description-container2 > p{
        font-size: 21px;
    }
    .description-container2 > strong{
        font-size: 27px;
        font-weight: 600;
    }
}

.description-container2 > .ql-align-center{
    text-align: center;
}

@media (max-width: 224px) {
    .description-container2 > strong,
    .description-container1 > p,
    .description-container2 > p{
        font-size: 10px;
        line-height: 12px;
    }
}
</style>
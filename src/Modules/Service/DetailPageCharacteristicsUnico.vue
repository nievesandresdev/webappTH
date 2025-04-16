<template>
    <div class="sp:pb-[16px] mt-[36] sp:mt-[48px] card-recommendation p-2 sp:p-4 space-y-[9px] sp:space-y-[12px] mb-[18px] sp:mb-[24px]">
        <h3 class="text-[9px] sp:text-[16px] lato font-bold leading-none">{{ $t('experience.detail-page.title-general-information') }}</h3>
        <div
            v-if="serviceData?.duration && serviceData?.fields_visibles?.includes('DURATION')"
            class="flex items-center space-x-[9px] sp:space-x-[12px]"
        >
            <img src="/assets/icons/WA.Clock.svg" class="size-2 sp:size-4" />
            <p class="text-[7px] sp:text-[14px] leading-none">{{ calculateDuration(serviceData?.duration) }}</p>
        </div>
        <div
            v-if="serviceData?.availability && serviceData?.fields_visibles?.includes('AVAILABILITY')"
            class="flex items-center space-x-[9px] sp:space-x-[12px]"
        >
            <img src="/assets/icons/Wa.reserva.svg" class="size-2 sp:size-4" />
            <p class="text-[7px] sp:text-[14px] leading-none">{{ serviceData?.availability }}</p>
        </div>
        <div
            v-if="serviceData?.address && serviceData?.fields_visibles?.includes('ADDRESS')"
            class="flex items-center space-x-[9px] sp:space-x-[12px]"
        >
            <img src="/assets/icons/WA.pointer.svg" class="size-2 sp:size-4" />
            <p class="text-[7px] sp:text-[14px] leading-none">{{ serviceData?.address }}</p>
        </div>
        <div
            v-if="serviceData?.fields_visibles?.includes('ACCESSIBLE')"
            class="flex items-center space-x-[9px] sp:space-x-[12px]"
        >
            <img src="/assets/icons/WA.PaperTicket.svg" class="size-2 sp:size-4" />
            <p class="text-[7px] sp:text-[14px] leading-none">{{ $t('service.detail-page.accessibility') }}</p>
        </div>
        <div
            v-if="serviceData?.languages?.length > 0 && serviceData?.fields_visibles?.includes('LANGUAGES')"
            class="flex items-center space-x-[9px] sp:space-x-[12px]"
        >
            <img src="/assets/icons/WA.Idiomas.svg" class="size-2 sp:size-4" />
            <p class="text-[7px] sp:text-[14px] leading-none">{{ `${$t('service.detail-page.offered-in')}: ${serviceData?.languages?.map(lg => $utils.capitalize($t(`language.${lg}`))).join(', ')}` }}</p>
        </div>
    </div>
    <div v-if="serviceData?.requeriment && serviceData?.fields_visibles?.includes('REQUIREMENT')" class="sp:pb-[16px] card-recommendation p-2 sp:p-4 space-y-[9px] sp:space-y-[12px]"> 
        <h3 class="text-[9px] sp:text-[16px] lato font-bold leading-none">{{ $t('service.detail-page.requeriments.title') }}</h3>
        <p class="text-[7px] sp:text-[14px] leading-none font-medium">{{ serviceData?.requeriment }}</p>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const serviceData = inject('serviceData');

function calculateDuration(duration) {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    
    if (hours === 0 && minutes > 0) {
        return `${minutes} minutos`;
    }
    if (hours > 0 && minutes > 0) {
        return `${hours} Horas y ${minutes} minutos`;
    }
    return `${hours} Horas`;
}
</script>

<style lang="scss">
.card-recommendation {
    border-radius: 10px;
    border: 1px solid #E9E9E9;
    background:  linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
}
</style>

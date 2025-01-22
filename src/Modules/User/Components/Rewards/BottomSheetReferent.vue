<template>
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('profile.rewards.button-recommend')" 
        @handleClick="openModalConfirmReservation" 
        :img-header="'/assets/icons/rewards/referent.svg'"
    >
        <div class="flex flex-col gap-3">
            <span class="font-bold sp:text-xl lato text-[12px]">{{ $t('profile.rewards.referent.title') }}</span>
            <div class="flex flex-col">
                <div class="flex gap-1">
                    <div class="flex sp:w-6 sp:h-6 sp:p-2 w-4 h-4 p-1 flex-col justify-center items-center gap-2 rounded-full border border-gray-400 bg-white">
                        <span class="text-center sp:text-sm text-[10px] font-semibold lato">1</span>
                    </div>
                    <span class="lato font-bold sp:text-[16px] text-[10px]">{{ $t('profile.rewards.referent.titleReferred', { amount: amountReferredFormat }) }}</span>
                </div>
                <p class="lato sp:text-sm font-normal text-[10px]">
                     {{ $t('profile.rewards.referent.descerptionReferred', { amount: amountReferredFormat }) }} 
                </p>
            </div>
            <div class="flex flex-col">
                <div class="flex gap-1">
                    <div class="flex sp:w-6 sp:h-6 sp:p-2 w-4 h-4 p-1 flex-col justify-center items-center gap-2 rounded-full border border-gray-400 bg-white">
                        <span class="text-center sp:text-sm text-[10px] font-semibold lato">2</span>
                    </div>

                    <span class="lato font-bold sp:text-[16px] text-[10px]">{{ $t('profile.rewards.referent.titleReferent', { amount: amountReferentFormat }) }}</span>
                </div>
                <p class="lato sp:text-sm font-normal text-[10px]">
                    {{ $t('profile.rewards.referent.descerptionReferent', { amount: amountReferentFormat }) }}
                </p>
            </div>
        </div>
    </GeneralBottomSheet>
</template>
<script setup>
import GeneralBottomSheet from '@/components/Modal/GeneralBottomSheet.vue';
import { computed, inject } from 'vue';

const openModal = inject('openModalReferent');
const hotelData = inject('hotelData');

const formatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const amountReferredFormat = computed(() => {
    if(hotelData.referrals.type_discount == 'percentage') {
        return  `${hotelData.referrals.amount}%`
    } else {
        return `${formatter.format(hotelData.referrals.amount)}€`
    }
});

const amountReferentFormat = computed(() => {
    if(hotelData.referent.type_discount == 'percentage') {
        return  `${hotelData.referent.amount}%`
    } else {
        return `${formatter.format(hotelData.referent.amount)}€`
    }
});

const closeModal = () => {
    openModal.value = false;
}



</script>
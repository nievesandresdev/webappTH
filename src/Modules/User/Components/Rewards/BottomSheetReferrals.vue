<template>
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('profile.rewards.button-recommend')" 
        @handleClick="openModalConfirmReservation" 
        :img-header="'/assets/icons/rewards/referred.svg'"
    >
        <div class="flex flex-col gap-3">
            <span class="font-bold sp:text-xl lato text-[14px]">{{ $t('profile.rewards.referrals.title') }}</span>
            <div class="flex flex-col">
                <span class="lato font-bold sp:text-lg text-[12px]">{{ $t('profile.rewards.referrals.discount', { amount: amountFormat }) }}</span>
                <p class="lato sp:text-sm font-normal text-[9px]">
                    {{ $t('profile.rewards.referrals.description', { amount: amountFormat} ) }}
                    
                </p>
            </div>
        </div>
    </GeneralBottomSheet>
</template>
<script setup>
import GeneralBottomSheet from '@/components/Modal/GeneralBottomSheet.vue';
import { computed, inject } from 'vue';

import { useShare } from "@/composables/useShare";
const { shareContent } = useShare();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const openModal = inject('openModalReferrals');
const hotelData = inject('hotelData');

const formatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const amountFormat = computed(() => {
    if(hotelData.referrals?.type_discount == 'percentage') {
        return  `${hotelData.referrals?.amount}%`
    } else {
        return `${formatter.format(hotelData.referrals?.amount)}€`
    }
    
});

const openModalConfirmReservation = () => {
    const data = {
        title: '¡Obtén un descuento especial!',
        text: `Usa mi código de referido para obtener ${amountFormat.value} de descuento en tu compra en ${hotelData.name}.\n\nCódigo: _${hotelData.referrals?.code}_\n\nPara canjearlo:\n\n${hotelData.referrals?.description}`,

    };
    shareContent(data);
}

const closeModal = () => {
    openModal.value = false;
}



</script>
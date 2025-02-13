<template>
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('profile.rewards.button-recommend')" 
        @handleClick="openModalShareReferrals" 
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
import { computed, inject, defineProps } from 'vue';

import { useShare } from "@/composables/useShare";
const { shareContent } = useShare();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const openModal = inject('openModalReferrals');

const props = defineProps({
    hotelRewards: {
        type: Object,
        required: true
    }
});

const formatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});


const amountFormat = computed(() => {
    if(props.hotelRewards.referrals?.type_discount == 'percentage') {
        return  `${props.hotelRewards.referrals?.amount}%`
    } else {
        return `${formatter.format(props.hotelRewards.referrals?.amount)}€`

    }
    
});

const openModalShareReferrals = () => {
    const data = {
        title: '¡Obtén un descuento especial!',
        text: `Usa mi código de referido para obtener ${amountFormat.value} de descuento en tu compra en ${props.hotelRewards.referrals?.url}.\n\nCódigo: _${props.hotelRewards.referrals?.code}_\n\nPara canjearlo:\n${props.hotelRewards.referrals?.description}\n\n`,
        url: `${props.hotelRewards.referrals?.url}`


    };
    shareContent(data);
}

const closeModal = () => {
    openModal.value = false;
}



</script>
<template>
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('profile.rewards.button-recommend')" 
        @handleClick="openModalShare" 
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
import { computed, inject, defineProps } from 'vue';


import { useShare } from "@/composables/useShare";
const { shareContent } = useShare();

import { useRewardsStore } from '@/stores/modules/rewards';
const rewardsStore = useRewardsStore();

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();

const openModal = inject('openModalReferent');

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

const amountReferredFormat = computed(() => {
    if(props.hotelRewards.referrals.type_discount == 'percentage') {
        return  `${props.hotelRewards.referrals.amount}%`
    } else {
        return `${formatter.format(props.hotelRewards.referrals.amount)}€`
    }
});

const amountReferentFormat = computed(() => {
    if(props.hotelRewards.referent.type_discount == 'percentage') {
        return  `${props.hotelRewards.referent.amount}%`
    } else {
        return `${formatter.format(props.hotelRewards.referent.amount)}€`
    }
});

const openModalShare = async () => {

    let params = {  
        hotel_id: props.hotelRewards.referent.hotel_id,
        guest_id: guestStore.guestData.id,
        stay_id: stayStore.stayData.id,
        reward_id: props.hotelRewards.referent.id,
    }

    const response = await rewardsStore.$createCodeReferent(params);
    const dataShared = response.data;


    const data = {
        title: '¡Obtén un descuento especial!',

        text: `Usa mi código de referido para obtener ${amountReferredFormat.value} de descuento en tu compra en \n\n ${props.hotelRewards.name}\n\nCódigo: _${dataShared.code}_\n\nPara canjearlo:\n\n${props.hotelRewards.referrals?.description}\n`,
        url : dataShared.full_url,

    };

    shareContent(data);
}

const closeModal = () => {
    openModal.value = false;
}




</script>
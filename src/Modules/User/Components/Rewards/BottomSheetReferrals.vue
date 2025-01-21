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
            <span class="font-bold text-xl lato">¡Recomienda a un amigo!</span>
            <div class="flex flex-col">
                <span class="lato font-bold text-lg">{{ $t('profile.rewards.referrals.discount', { amount: amountFormat }) }}</span>
                <p class="lato text-sm font-normal">
                    {{ $t('profile.rewards.referrals.description', { amount: amountFormat} ) }}
                    
                </p>
            </div>
        </div>
    </GeneralBottomSheet>
</template>
<script setup>
import GeneralBottomSheet from '@/components/Modal/GeneralBottomSheet.vue';
import { computed, inject } from 'vue';

const openModal = inject('openModalReferrals');
const hotelData = inject('hotelData');

const formatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const amountFormat = computed(() => {
    if(hotelData.referrals.type_discount == 'percentage') {
        return  `${hotelData.referrals.amount}%`
    } else {
        return `${formatter.format(hotelData.referrals.amount)}€`
    }
});

const closeModal = () => {
    openModal.value = false;
}



</script>
<template>
    <!-- modal sheet bottom info hotel -->
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('profile.rewards.button-recommend')" 
        @handleClick="openModalConfirmReservation" 
    >
        aqui estoy 
    </GeneralBottomSheet>
</template>
<script setup>
import GeneralBottomSheet from '@/components/Modal/GeneralBottomSheet.vue';
import { inject } from 'vue';

const openModal = inject('openModalRewards');

</script>
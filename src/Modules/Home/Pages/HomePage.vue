<template>
    <div>
        {{ $t('home.title') }} <br>
        {{ hotel?.name }}

    </div>
</template>

<script setup>
    import { useHotelStore } from '@/stores/modules/hotel'

    const hotelStore = useHotelStore();

    const hotel = hotelStore.hotel
</script>

<style>
</style>
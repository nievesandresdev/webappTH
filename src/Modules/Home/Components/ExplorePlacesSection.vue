<template>
    <section class="px-3 sp:px-4 my-1 sp:my-2" v-if="hotelStore?.hotelData?.show_places">
        <ExplorePlacesStyleA v-if="orderSections?.placesExploreSection?.style == 1" />
        <ExplorePlacesStyleB v-else-if="orderSections?.placesExploreSection?.style == 2" />
    </section>
</template>
<script setup>
import { inject } from 'vue';
//
import ExplorePlacesStyleA from './ExplorePlacesStyleA.vue';
import ExplorePlacesStyleB from './ExplorePlacesStyleB.vue';
//
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const orderSections = inject('orderSections')

</script>
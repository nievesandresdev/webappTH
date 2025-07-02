<template>
    <FeaturedPlacesSlider 
            v-if="orderSections?.placesRecommendationSection?.style === 1"
            :places="data"
        />

        <FeaturedPlacesDotsSlider 
            v-if="orderSections?.placesRecommendationSection?.style === 2"
            :places="data"
        />
</template>
<script setup>
import FeaturedPlacesSlider from './FeaturedPlacesSlider.vue';
import FeaturedPlacesDotsSlider from './FeaturedPlacesDotsSlider.vue';
import { inject } from 'vue';
const orderSections = inject('orderSections')

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
</script>
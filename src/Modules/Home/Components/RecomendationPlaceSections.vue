<template>
    <FeaturedPlacesSlider 
            v-if="orderSections?.placesRecommendationSection?.style === 1"
            :places="allPlaces"
        />

        <FeaturedPlacesDotsSlider 
            v-if="orderSections?.placesRecommendationSection?.style === 2"
            :places="allPlaces"
        />
</template>
<script setup>
import FeaturedPlacesSlider from './FeaturedPlacesSlider.vue';
import FeaturedPlacesDotsSlider from './FeaturedPlacesDotsSlider.vue';
import { inject, computed } from 'vue';
const orderSections = inject('orderSections')
const crossellingPlacesData = inject('crossellingPlacesData')

// Computed para combinar todos los lugares
const allPlaces = computed(() => {
    if (!crossellingPlacesData.value) return [];
    
    return [
        ...(crossellingPlacesData.value.crosselling_places_whatvisit || []),
        ...(crossellingPlacesData.value.crosselling_places_whereeat || []),
        ...(crossellingPlacesData.value.crosselling_places_leisure || [])
    ];
});
</script>
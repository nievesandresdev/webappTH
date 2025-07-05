<template>
    <div class="my-1 sp:my-2">
        <div class="flex items-center gap-2 px-3 ml-1 mb-2">
            <img src="/assets/icons/WA.STAR.BLACK.svg" class="sp:w-6 sp:h-6 w-4 h-4" alt="star">
            <h2 class="lato sp:text-[20px] text-[13px] font-bold">
                {{ $t('home.recomendation-places.title') }}
            </h2>
        </div>
        <FeaturedPlacesSlider 
            v-if="orderSections?.placesRecommendationSection?.style === 1"
            :places="allPlaces"
        />

        <FeaturedPlacesDotsSlider 
            v-if="orderSections?.placesRecommendationSection?.style === 2"
            :places="allPlaces"
        />
    </div>
    
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
    
    // Forzar el orden correcto: whatvisit SIEMPRE primero, whereeat segundo, leisure tercero
    const whatvisitPlaces = crossellingPlacesData.value.crosselling_places_whatvisit || [];
    const whereeatPlaces = crossellingPlacesData.value.crosselling_places_whereeat || [];
    const leisurePlaces = crossellingPlacesData.value.crosselling_places_leisure || [];
    
    const places = [
        ...whatvisitPlaces,
        ...whereeatPlaces,
        ...leisurePlaces
    ];

    
    return places;
});
</script>
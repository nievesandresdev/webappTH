<template>
<<<<<<< HEAD
    <div class="flex items-center gap-2 px-3 py-2 ml-1 mb-2">
        <img src="/assets/icons/WA.STAR.BLACK.svg" class="w-6 h-6" alt="star">
        <h2 class="lato text-[20px] font-bold">
            {{ $t('home.recomendation-places.title') }}
        </h2>
    </div>
    <FeaturedPlacesSlider 
        v-if="orderSections?.placesRecommendationSection?.style === 2"
        :places="allPlaces"
    />

    <FeaturedPlacesDotsSlider 
        v-if="orderSections?.placesRecommendationSection?.style === 1"
        :places="allPlaces"
    />
=======
    <div class="my-1 sp:my-2">
        <div class="flex items-center gap-2 px-3 ml-1 mb-2">
            <img src="/assets/icons/WA.STAR.BLACK.svg" class="w-6 h-6" alt="star">
            <h2 class="lato text-[20px] font-bold">
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
    
>>>>>>> 80b0601586565ab2128d78295d18f67ba8424222
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
    
    const places = [
        ...(crossellingPlacesData.value.crosselling_places_whatvisit || []),
        ...(crossellingPlacesData.value.crosselling_places_whereeat || []),
        ...(crossellingPlacesData.value.crosselling_places_leisure || [])
    ];

    //console.log('All Places:', places);
    return places;
});
</script>
<template>
    <div class="flex gap-1 sp:gap-2 items-center">
        <img src="/assets/icons/WA.MENU.DEFAULT.DESTINO.svg" class="w-4 h-4 sp:w-6 sp:h-6">
        <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[20px] sp:leading-[28px]">{{ $t('home.explore-destination') }}</h2>
        <a 
            class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline ml-auto" href="javascript:void(0)"
            @click="goToPlaces()"
        >
            {{ $utils.capitalize($t('home.explore-title')) }}
        </a>
    </div>
    <div class="mt-2 sp:mt-4 overflow-x-auto mr-[-16px] no-scrollbar flex flex-col gap-[6px] sp:gap-2">
        <div class="flex gap-2 sp:gap-4 items-center">
            <ExploreDestinationCard 
                v-for="item in data.crosselling_places_whatvisit" 
                :key="item" 
                :data="item"
            />
        </div>
        <div class="flex gap-2 sp:gap-4 items-center">
            <ExploreDestinationCard v-for="item in data.crosselling_places_whereeat" :key="item" :data="item" />
        </div>
        <div class="flex gap-2 sp:gap-4 items-center">
            <ExploreDestinationCard v-for="item in data.crosselling_places_leisure" :key="item" :data="item" />
        </div>
    </div>
</template>
<script setup>
import { computed, inject } from 'vue';
import ExploreDestinationCard from './ExploreDestinationCard.vue'
//
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
//
import { useRouter } from 'vue-router'
const router = useRouter()
//
const data = inject('crossellingPlacesData')


const goToPlaces = () => {
    if (firstCategory.value) {
        
        // router.push({
        //     path: '/place-detail', // Ajusta esta ruta según tu configuración
        //     query: { id: selectedCategory.id }
        // });

        console.log('selectedCategory', firstCategory.value)

        router.push({
        name: 'PlaceList',
        query: { categoriplace: firstCategory.value.categori_place.id, typeplace: firstCategory.value.type_place.id, city: firstCategory.value.cityName, featured: false, mockup: false, all_cities: false }
    })
    } else {
        console.warn('No hay lugares disponibles para redirección');
    }
}

const firstCategory = computed(() => {
    // Definir el orden de prioridad de las categorías
    const categories = [
        'crosselling_places_whatvisit',
        'crosselling_places_whereeat', 
        'crosselling_places_leisure'
    ];
    
    // Buscar la primera categoría con elementos
    let selectedCategory = null;
    for (const category of categories) {
        if (data.value[category] && data.value[category].length > 0) {
            selectedCategory = data.value[category][0];
            break;
        }
    }
    
   

    return selectedCategory
})
</script>
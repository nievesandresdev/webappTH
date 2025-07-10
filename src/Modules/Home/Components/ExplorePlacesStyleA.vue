<template>
    <div class="flex gap-1 sp:gap-2 items-center">
        <img src="/assets/icons/WA.MENU.DEFAULT.DESTINO.svg" class="w-4 h-4 sp:w-6 sp:h-6">
        <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[20px] sp:leading-[28px]">{{ $t('home.explore-places', { typeLodging: $formatTypeLodging() }) }}</h2>
        <a 
            class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline ml-auto" href="javascript:void(0)"
            @click="goToPlaces(data[0])"
        >
            {{ $utils.capitalize($t('home.explore-title')) }}
        </a>
    </div>
    <div class="mt-2 sp:mt-4">
        <img 
            src="/assets/img/fake-mapa-place-home.svg" 
            class="w-full h-[76px] sp:h-[133px]"
            @click="goToPlaces(data[0])"
        >
        <p class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] mt-1 sp:mt-2 text-[#777777]">
            {{ $t('home.explore-places-text', { totalPlaces: totalPlaces }) }}
        </p>
        <div class="mt-1 sp:mt-2 flex items-center gap-1 sp:gap-2 overflow-x-auto no-scrollbar">
            <template v-for="item in data">
                <!-- v-if="isVisible(item.categori_places_id)" -->
                <div 
                    @click="goToPlaces(item)"
                    class="p-0.5 sp:p-1 flex items-center gap-[2px] sp:gap-1 border border-[#bfbfbf80] rounded-[2px] flex-shrink-0"
                >
                    <img :src="`/assets/icons/${icons[item.categori_places_id]}.svg`" class="w-3 sp:w-4 h-3 sp:h-4">
                    <p class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px]">
                        {{ item.count_places }} {{  item.name }}
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { computed, inject } from 'vue';
//
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
//
import { useRouter } from 'vue-router'
const router = useRouter()
//
const data = inject('placeCategories')
// http://localhost:81/nobuhotelsevillatex/lugares?categoriplace=2&typeplace=5&all_cities=false&city=Sevilla&featured=false&mockup=false
const totalPlaces = computed(() => {
    return data.value.reduce((acc, item) => acc + item.count_places, 0)
})

const goToPlaces = (item) =>{
    router.push({
        name: 'PlaceList',
        query: { categoriplace: item.categori_places_id, typeplace: item.type_places_id, city: item.city_places, featured: false, mockup: false, all_cities: false }
    })
}
// const isVisible = (categoryId) =>{
//     if(!hotelStore.hotelData) return true;
//     return !hotelStore.hotelData?.hidden_categories?.includes(categoryId)
// }

const icons = {
    1: 'WA.MONUMENTOS',
    2: 'WA.MUSEOS',
    3: 'WA.NATURALEZA',
    5: 'WA.RESTAURANTES',
    4: 'WA.COFFE',
    7: 'WA.VIDANOCTURNA',
    9: 'WA.OCIO',
    10: 'WA.OTROS', 
}
</script>
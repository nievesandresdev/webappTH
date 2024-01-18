<template>
    <div class="container-fluid-landing">
        <div class="desktop-list-breadcrumb mt-10 mb-8 hidden md:flex items-center">
            <router-link to="/" class="text-sm font-medium htext-gray-500 no-link">
                Home    
            </router-link>
            <p class="htext-gray-500 lg:mx-1">
                <img class="w-3.5 icon-gray-500" src="/assets/icons/1.TH.I.dropdown-right.svg">
            </p>
            <router-link to="/places" class="text-sm font-medium htext-gray-500 no-link">{{$t('place.detail.titleList')}}</router-link>
            <p class="htext-gray-500 lg:mx-1">
                <img class="w-3.5 icon-gray-500" src="/assets/icons/1.TH.I.dropdown-right.svg">
            </p>
            <router-link 
                :to="`/places?typeplace=${placeData?.type_place?.id}&categoriplace=${placeData?.first_category_place}`"
                class="text-sm font-medium htext-gray-500 no-link"
            >
                {{ $t('place.types.'+slufy(placeData?.type_place?.name)) }}
            </router-link>
            <p class="htext-gray-500 lg:mx-1">
                <img class="w-3.5 icon-gray-500" src="/assets/icons/1.TH.I.dropdown-right.svg">
            </p>
            <router-link 
                :to="`/places?typeplace=${placeData?.type_place?.id}&categoriplace=${placeData?.categori_places_id}`"
                class="text-sm font-medium htext-gray-500 no-link"
            >
                {{ $t('place.categories.'+slufy(placeData?.category)) }}
            </router-link>
            <p class="htext-gray-500 lg:mx-1">
                <img class="w-3.5 icon-gray-500" src="/assets/icons/1.TH.I.dropdown-right.svg">
            </p>
            <p class="text-sm font-medium htext-gray-500">
                {{ placeData?.title }}
            </p>
        </div>
    </div>
</template>
<script setup>
import { slufy } from '@/utils/utils';

    const props = defineProps({
        placeData:{
            type:Object,
            default:{}
        }
    })
    
</script>

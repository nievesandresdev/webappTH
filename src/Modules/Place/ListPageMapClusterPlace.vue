<template>
    <BaseMap
        :center="coordCenter"
    >
        <template v-slot:controls>
            <MapboxMarker :lng-lat="coordCenter">
                <img
                    src="/assets/icons/WA.MAP.POINTER.svg"
                >
            </MapboxMarker>
            <!-- Agregar iconos personalizados por categoría -->
            <MapboxImage id="monumentos" src="/assets/icons/WA.MAP.POINTER.MONUMENTOS.png" />
            <MapboxImage id="museos" src="/assets/icons/WA.MAP.POINTER.MUSEOS.png" />
            <MapboxCluster
                :data="dataMarkets"
                unclustered-point-layer-type="symbol"
                :unclustered-point-layout="{
                    'icon-image': ['get', 'category'], // Usa la propiedad 'category' como id del icono
                    'icon-size': 1.5
                }"
                @mb-feature-click="clickPlace"
            />
        </template>
    </BaseMap>
</template>

<script setup>
import { computed, inject } from 'vue';
  import { MapboxMap, MapboxMarker, MapboxCluster, MapboxImage } from '@studiometa/vue-mapbox-gl';
//   import 'mapbox-gl/dist/mapbox-gl.css';
  
import BaseMap from '@/components/Maps/BaseMap.vue';

// INJECT
const hotelData = inject('hotelData');

// DATA STATIC
const dataMarkets = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-5.992893, 37.386091] // La Giralda
            },
            "properties": {
                "name": "La Giralda",
                "description": "Antiguo alminar convertido en campanario de la Catedral de Sevilla.",
                "category": "monumentos"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-5.993382, 37.382641] // Catedral de Sevilla
            },
            "properties": {
                "name": "Catedral de Sevilla",
                "description": "Una de las catedrales góticas más grandes del mundo.",
                "category": "museos"
            }
        },
    ]
}


const coordCenter = computed(() => {
    return [Number(hotelData.longitude), Number(hotelData.latitude)];
});

function clickPlace () {
    
}

</script>
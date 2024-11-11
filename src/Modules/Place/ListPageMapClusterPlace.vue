<template>
    <BaseMap
        :center="coordCenter"
        height-map="650px"
    >
        <template v-slot:controls>
            <MapboxMarker :lng-lat="coordCenter">
                <img
                    src="/assets/icons/WA.MAP.POINTER.svg"
                >
            </MapboxMarker>
            <!-- Agregar iconos personalizados por categoría -->
            <MapboxImage id="monumento" src="/assets/icons/WA.MAP.POINTER.MONUMENTOS.png" />
            <MapboxImage id="museo" src="/assets/icons/WA.MAP.POINTER.MUSEOS.png" />
            <MapboxImage id="naturaleza" src="/assets/icons/WA.MAP.POINTER.NATURALEZA.png" />
            <MapboxCluster
                :data="transformedPointersData"
                unclustered-point-layer-type="symbol"
                :unclustered-point-layout="{
                    'icon-image': ['get', 'category'], // Usa la propiedad 'category' como id del icono
                    'icon-size': 1.5
                }"
                :unclustered-point-paint="null"
                @mb-feature-click="handleMapClick"
            />
        </template>
    </BaseMap>
</template>

<script setup>
import { computed, inject, toRaw, onMounted, defineEmits } from 'vue';
  import { MapboxMap, MapboxMarker, MapboxCluster, MapboxImage } from '@studiometa/vue-mapbox-gl';
//   import 'mapbox-gl/dist/mapbox-gl.css';
  
import BaseMap from '@/components/Maps/BaseMap.vue';

const emits = defineEmits(['clickMapCluster']);

// INJECT
const hotelData = inject('hotelData');
const pointersData = inject('pointersData');

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
                "category": "monumento"
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
                "category": "museo"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-5.992551, 37.386208] // Catedral de Sevilla
            },
            "properties": {
                "name": "Torre La Giralda",
                "description": "Una de las catedrales góticas más grandes del mundo.",
                "category": "museo"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-5.97069, 37.384064] // Catedral de Sevilla
            },
            "properties": {
                "name": "Estadio Ramón Sánchez-Pizjuán",
                "description": "Una de las catedrales góticas más grandes del mundo.",
                "category": "museo"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-5.98929, 37.394798] // Catedral de Sevilla
            },
            "properties": {
                "name": "Palacio de las Dueñas",
                "description": "Una de las catedrales góticas más grandes del mundo.",
                "category": "monumento"
            }
        },
    ]
}

const transformedPointersData = computed(() => {
    return JSON.parse(JSON.stringify(pointersData.value)); // Crear una copia inmutable
});


const coordCenter = computed(() => {
    return [Number(hotelData.longitude), Number(hotelData.latitude)];
});

function handleMapClick ($event) {
    emits('clickMapCluster', $event)
}

</script>
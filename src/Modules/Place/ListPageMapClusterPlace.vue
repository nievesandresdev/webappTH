<template>
    <BaseMap
        ref="baseMapRef"
        :center="coordCenter"
        :height-map="windowWidth >= 250 ? heightDinamic : heightDinamic"
        @mb-click="handleMapClick($event, 'map')"
    >
        <template v-slot:controls>
            <MapboxMarker :lng-lat="coordCenter">
                <img
                    class="h-[40px] sp:h-[50px] object-cover"
                    src="/assets/icons/WA.map-pointer.png"
                >
            </MapboxMarker>
            <!-- Agregar iconos personalizados por categoría -->
            <MapboxImage id="monumentos" src="/assets/icons/WA.MAP.POINTER.MONUMENTOS.png" />
            <MapboxImage id="museos" src="/assets/icons/WA.MAP.POINTER.MUSEOS.png" />
            <MapboxImage id="naturaleza" src="/assets/icons/WA.MAP.POINTER.NATURALEZA.png" />

            <MapboxImage id="restaurantes" src="/assets/icons/WA.MAP.POINTER.RESTAURANTES.png" />
            <MapboxImage id="cafeterias-y-postres" src="/assets/icons/WA.MAP.POINTER.CAFETERIASYPOSTRES.png" />

            <MapboxImage id="compras" src="/assets/icons/WA.MAP.POINTER.COMPRAS.png" />
            <MapboxImage id="otros" src="/assets/icons/WA.MAP.POINTER.OTROS.png" />
            <MapboxImage id="vida-nocturna" src="/assets/icons/WA.MAP.POINTER.VIDANOCTURNA.png" />

            <MapboxCluster
                :data="transformedPointersData"
                unclustered-point-layer-type="symbol"
                :unclustered-point-layout="{
                    'icon-image': ['get', 'category'], 
                    'icon-size':windowWidth >= 250 ? 0.063 : 0.02
                }"
                :clusterMinPoints="5"
                :clusters-paint="{ 'circle-color': 'rgba(0, 123, 255, 0.5)', 'circle-radius': 40 }"
                @mb-feature-click="handleMapClickCluster($event, 'cluster')"
            />
        </template>
    </BaseMap>
</template>

<script setup>
import { computed, inject, toRaw, onMounted, defineEmits, ref, watch } from 'vue';
  import { MapboxMap, MapboxMarker, MapboxCluster, MapboxImage } from '@studiometa/vue-mapbox-gl';
//   import 'mapbox-gl/dist/mapbox-gl.css';
  
import BaseMap from '@/components/Maps/BaseMap.vue';
// positionBottomSheet
const emits = defineEmits(['clickMapCluster']);

// INJECT
const hotelData = inject('hotelData');
const pointersData = inject('pointersData');
const positionBottomSheet = inject('positionBottomSheet');
const searchingActive = inject('searchingActive');


 const windowWidth = window.innerWidth;
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

const baseMapRef = ref(null);

watch(searchingActive, function(valNew, valOld) {
    if (valOld && !valNew ) {
        baseMapRef.value.focusOnPoint(Number(hotelData.value.longitude), Number(hotelData.value.latitude));
    }
});

const heightDinamic = computed(() => {
    // if (positionBottomSheet.value == 'bottom')
        return '73vh';
    // else
        // return '60vh';


});

const transformedPointersData = computed(() => {
    return JSON.parse(JSON.stringify(pointersData.value)); // Crear una copia inmutable
});


const coordCenter = computed(() => {
    return [Number(hotelData.value.longitude), Number(hotelData.value.latitude)];
});

function handleMapClick ($event, typCap) {
    
    // if ($event.type === 'click') {
    //     baseMapRef.value.focusOnPoint(Number(hotelData.longitude), Number(hotelData.latitude));
    //     return;
    // }
    // if ($event.type === 'click') {
    //     baseMapRef.value.focusOnPoint(Number(hotelData.longitude), Number(hotelData.latitude));
    // }
    // console.log($event, 'handleMapClick');
    emits('clickMapCluster', {event: $event, type: typCap });
}
function handleMapClickCluster ($event, typCap) {
    emits('clickMapCluster', {event: $event, type: typCap });
}
</script>
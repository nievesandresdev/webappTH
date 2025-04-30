<template>
    <div>
        <!-- <pre>{{ transformedPointersData }}</pre> -->
    <BaseMap
        ref="baseMapRef"
        :center="coordCenter"
        :height-map="windowWidth >= 250 ? '168px' : '90px'"
        :showExpand="true"
        :transition="false"
    >
        <template v-slot:controls>
            <!-- <MapboxMarker :lng-lat="coordCenter">
                <img
                    class="w-[40px] sp:w-[65px]"
                    :src="`${iconsMaps[categorySlug]}`"
                >
            </MapboxMarker> -->

            <MapboxImage id="hotel" src="/assets/icons/WA.map-pointer.png" />

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
                    'icon-size': [
                        'match',
                        ['get', 'category'],
                        'hotel', 0.09,
                        /* default size if category doesn't match */
                        0.09
                    ]
                }"
                :clusterMinPoints="5"
                :clusters-paint="{ 'circle-color': 'rgba(0, 123, 255, 0.5)', 'circle-radius': 40 }"
            />
        </template>
    </BaseMap>
    </div>
</template>

<script setup>

import { computed, inject, toRaw, onMounted, defineEmits, ref } from 'vue';
import { MapboxMap, MapboxMarker, MapboxCluster, MapboxImage } from '@studiometa/vue-mapbox-gl';
import mapboxgl from 'mapbox-gl';

import $utils from '@/utils/utils';

import BaseMap from '@/components/Maps/BaseMap.vue';

const placeData = inject('placeData');
const hotelData = inject('hotelData');
const baseMapRef = ref(null);

const windowWidth = window.innerWidth;

onMounted(() => {
    const map = baseMapRef.value?.map; // accede al mapa de Mapbox real
    if (!map || !placeData.value || !hotelData.value) return;
    const bounds = new mapboxgl.LngLatBounds();

    // Agrega los dos puntos al bounds
    bounds.extend([hotelData.value.longitude, hotelData.value.latitude]);
    bounds.extend([placeData.value.metting_point_longitude, placeData.value.metting_point_latitude]);

    // Ajusta el mapa para que abarque ambos
    map.fitBounds(bounds, {
        padding: 50, // espacio alrededor
        maxZoom: 15,
        duration: 1000
    });
});

const coordCenter = computed(() => {
    if (!placeData.value) return;
    return [placeData.value.metting_point_longitude, placeData.value.metting_point_latitude];
});

const iconsMaps = {
    monumentos: "/assets/icons/WA.MAP.POINTER.MONUMENTOS.png",
    museos: "/assets/icons/WA.MAP.POINTER.MUSEOS.png",
    naturaleza: "/assets/icons/WA.MAP.POINTER.NATURALEZA.png",

    restaurantes: "/assets/icons/WA.MAP.POINTER.RESTAURANTES.png",
    "cafeterias-y-postres": "/assets/icons/WA.MAP.POINTER.CAFETERIASYPOSTRES.png",

    compras: "/assets/icons/WA.MAP.POINTER.COMPRAS.png",
    otros: "/assets/icons/WA.MAP.POINTER.OTROS.png",
    "vida-nocturna": "/assets/icons/WA.MAP.POINTER.VIDANOCTURNA.png",
}

const categorySlug = computed(() => {
    return $utils.slufy(placeData.value?.category);
});

const transformedPointersData = computed(() => {
    let categoryName = $utils.slufy(placeData.value?.categori_place?.name);
    let features = [
        {
            id: hotelData.value.id,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [hotelData.value.longitude, hotelData.value.latitude]
            },
            properties: {
                category: 'hotel',
                id: hotelData.value.id,
                name: hotelData.value.name,
            }
        },
        {
            id: placeData.value.id,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [placeData.value.metting_point_longitude, placeData.value.metting_point_latitude]
            },
            properties: {
                category: categoryName,
                id: placeData.value.id,
                name: placeData.value.name,
            }
        }
    ];
    let cluster = {
        type: "FeatureCollection",
        features: features
    }
    return cluster;
});

</script>
<template>
    <div>
    <BaseMap
        :center="coordCenter"
        :height-map="windowWidth >= 250 ? '168px' : '90px'"
        :showExpand="true"
        :transition="false"
    >
        <template v-slot:controls>
            <MapboxMarker :lng-lat="coordCenter">
                <img
                    class="w-[40px] sp:w-[65px]"
                    :src="`${iconsMaps[categorySlug]}`"
                >
            </MapboxMarker>
        </template>
    </BaseMap>
    </div>
</template>

<script setup>

import { computed, inject, toRaw, onMounted, defineEmits } from 'vue';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';

import BaseMap from '@/components/Maps/BaseMap.vue';

import $utils from '@/utils/utils';

const placeData = inject('placeData');

const windowWidth = window.innerWidth;

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

</script>
<template>
    <div
        v-if="center?.[0] && center?.[1]"
        :class="['relative', `h-[${heightMap}]`]"
    >
          <MapboxMap
            :style="{ height: heightMap }"
            :access-token="TOKEN"
            ref="mapboxMap"
            map-style="mapbox://styles/mapbox/streets-v11"
            :center="center"
            :zoom="zoom"
        >
            <slot name="controls"></slot>
        </MapboxMap>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
  import { MapboxMap } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

// PROPS
const props = defineProps({
  center: {
    type: Array,
    default: () => null, // Coordenadas predeterminadas (longitud, latitud)
  },
  zoom: {
    type: Number,
    default: 15, // Zoom predeterminado
  },
  heightMap: {
    type: String,
    default: '400px', // Altura predeterminada del mapa
  },
  
});


// DATA
  const mapboxMap = ref();

// COMPUTED
const map = computed(() => mapboxMap.value.map);

onMounted(() => {

});

// FUNCTIONS


</script>

<style lang="scss" scoped>
    
.map-container {
  width: 100%;
  height: 400px; /* Asegura que el mapa ocupe toda la altura de la pantalla */
  margin: 0;
  padding: 0;
}

</style>
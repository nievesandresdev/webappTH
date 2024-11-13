<template>
    <div
        v-if="center?.[0] && center?.[1]"
        class="relative"
        :class="{ 'h-screen': isFullScreen }"
        :style="{ height: isFullScreen ? '100vh' : heightMap }"
        ref="mapContainer"
      >

          <!-- Botón para Pantalla Completa -->
          <button
            v-if="showExpand"
            @click="toggleFullScreen"
            class="absolute top-2 right-2 z-10 inline-flex items-center gap-2 p-1 border border-white bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] fullscreen-button"
          >
            <img
              :src="isFullScreen ? '/assets/icons/WA.Compress.svg' : '/assets/icons/WA.Expand.svg'"
              :alt="isFullScreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'"
              class="w-6 h-6"
            />
          </button>
          <MapboxMap
            class="h-full"
            :access-token="TOKEN"
            ref="mapboxMap"
            map-style="mapbox://styles/mapbox/streets-v11"
            :center="center"
            :zoom="zoom"
            @map-click="handleMapClick"
        >
            <slot name="controls"></slot>
        </MapboxMap>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed,onUnmounted } from 'vue';
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
  showExpand: {
    type: Boolean,
    default: false,
  },
  
});


// DATA
const mapContainer = ref(null);
const mapboxMap = ref();
const mapboxRef = ref();

// COMPUTED
const map = computed(() => mapboxMap.value.map);

// ESTADO
const isFullScreen = ref(false);

// FUNCIÓN PARA PANTALLA COMPLETA
function toggleFullScreen() {
  const elem = mapContainer.value;

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      console.error(`Error al intentar habilitar el modo de pantalla completa: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// EVENTOS PARA DETECTAR CAMBIOS EN PANTALLA COMPLETA
function onFullScreenChange() {
  isFullScreen.value = !!document.fullscreenElement;
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullScreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange);
});


</script>

<style lang="scss" scoped>
    
.map-container {
  width: 100%;
  height: 400px; /* Asegura que el mapa ocupe toda la altura de la pantalla */
  margin: 0;
  padding: 0;
}

.fullscreen-button {
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12),
              0px 3px 1px 0px rgba(0, 0, 0, 0.04);
  border-radius: 6px;
}

</style>
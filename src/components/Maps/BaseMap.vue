<template>
  <div
      v-if="center?.[0] && center?.[1]"
      class="relative"
      :class="[
                isFullScreen ? 'fullscreen' : '',
                props.transition ? 'transition-height duration-500 ease-in-out' : ''
              ]"
      :style="!isFullScreen ? `height: ${heightMap};` : ''"
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
            @mb-created="handleMapLoad"
            @mb-click="handleMapClick"
          >
            <!-- @mb-created="(mapInstance) => map = mapInstance" -->

            <!-- @map-click="handleMapClick"/ -->
            <slot name="controls"></slot>
          </MapboxMap>

  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed,onUnmounted, defineEmits, watch, nextTick, defineExpose } from 'vue';
  import { MapboxMap } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const emits = defineEmits(['mb-click']);

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
  fullFront: {
    type: Boolean,
    default: false,
  },
  transition: { // Mantiene la transicion por defecto, la elimina si paso false
    type: Boolean,
    default: true,
  },
});


// DATA
const mapContainer = ref(null);
const map = ref(null);

// ESTADO
const isFullScreen = ref(false);

// FUNCIÓN PARA PANTALLA COMPLETA
function toggleFullScreen() {
  const elem = mapContainer.value;

  if (!isFullScreen.value) {
    // Agregar clase para simular pantalla completa
    elem.classList.add('fullscreen');
    isFullScreen.value = true;
  } else {
    // Quitar clase de pantalla completa
    elem.classList.remove('fullscreen');
    isFullScreen.value = false;
  }
}

watch(() => props.heightMap, (newHeight) => {
  if (map.value) {
    nextTick(() => {
      map.value.resize(); 
    });
  }
});


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


const handleMapClick = (event) => {
  focusOnPoint(event.lngLat.lng, event.lngLat.lat); // Llama a focusOnPoint con las coordenadas
  emits('mb-click', event);
};

const handleMapLoad = (mapInstance) => {
  map.value = mapInstance;

  mapInstance.on('style.load', () => {
    const layers = mapInstance.getStyle().layers;

    if (!layers || !Array.isArray(layers)) {
      // console.error('No se encontraron capas en el estilo del mapa.');
      return;
    }

    // console.log('Capas disponibles en el mapa:', layers.map(layer => layer.id)); // Inspeccionar capas

    layers.forEach((layer) => {
      if (
        layer.id.includes('place') || // Ocultar etiquetas de lugares
        layer.id.includes('poi') || // Ocultar puntos de interés
        layer.id.includes('transit') || // Ocultar transporte público
        layer.id.includes('rail') // Ocultar etiquetas de estaciones de tren
      ) {
        try {
          mapInstance.removeLayer(layer.id); // Eliminar la capa del mapa
          // console.log(`Capa eliminada: ${layer.id}`);
        } catch (err) {
          console.warn(`No se pudo eliminar la capa ${layer.id}:`, err.message);
        }
      }
    });
  });
};

function focusOnPoint(lng, lat, zoom = 15) {
  if (!lng || !lat || !map.value) {
    return;
  }
  if (map.value) {
    map.value.flyTo({
      center: [lng, lat],
      zoom, // Usa el nivel de zoom especificado en las props
      essential: true, // Para una animación más fluida
    });
  }
}

defineExpose({ focusOnPoint });

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

.transition-height {
  transition: height 0.5s ease-in-out;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // z-index: 4; /* Asegúrate de que esté por encima de otros elementos */
}

</style>
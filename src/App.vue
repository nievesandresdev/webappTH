<template>
  <div id="app">
    <!-- Preloader -->
    <LoadPage v-if="activeRequests > 0" />

    <!-- Resto de la aplicación -->
    <router-view />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
import { computed } from 'vue';
import { usePreloaderStore } from '@/stores/modules/preloader';
import LoadPage from '@/shared/LoadPage.vue'; // Asegúrate de que la ruta sea correcta

defineComponent({ name: 'App' });

const preloaderStore = usePreloaderStore();
const activeRequests = computed(() => preloaderStore.activeRequests);
</script>



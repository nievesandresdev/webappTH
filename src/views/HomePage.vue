<template>
  <Layout>
    <div>
      <h1>Home Page Huesped</h1>
      <p>{{ testMessage }}</p>
      <p>  La ruta actual es: {{ $route.name }}</p>
    </div>
  </Layout>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Layout from '@/layout/AppLayout.vue'
  const testMessage = ref('Cargando...');
  onMounted(() => {
    testMessage.value = process.env.VUE_APP_TEST_MESSAGE || 'Variable no definida';
  });
  
  </script>
  
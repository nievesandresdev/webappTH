<template>
    <div>
      <h1>Home Page Huesped</h1>
      <p>{{ testMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'HomePage',
    setup() {
      const testMessage = ref('Cargando...');
  
      onMounted(() => {
        testMessage.value = process.env.VUE_APP_TEST_MESSAGE || 'Variable no definida';
      });
  
      return {
        testMessage
      };
    }
  };
  </script>
  
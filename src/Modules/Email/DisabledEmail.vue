<template>
    <div class="min-h-screen flex items-center justify-center bg-white text-center p-4">
      <div class="max-w-md">
        <h1 class="text-lg font-semibold text-black mb-4">
          Te has dado de baja con éxito. Ya no recibirás estos correos.
        </h1>
        <p class="text-black">
          ¿Ha sido un error?
          <a href="/reactivar-correos" class="text-blue-600 underline">
            Haz clic aquí para volver a activarlos.
          </a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  onMounted(() => {
    const gParam = route.query.g
    console.log('Código recibido (g):', gParam)
  })
  </script>
  
<template>
    <div class="min-h-screen flex items-center justify-center bg-white text-center p-4">
      <div class="max-w-md">
        <h1 class="text-[16px] text-[#333] mb-4 roboto font-medium ">
          Te has dado de baja con éxito. Ya no recibirás estos correos.
        </h1>
        <p class="text-[#333] font-medium text-[16px] roboto">
          ¿Ha sido un error? Haz
          <a @click="reactivateEmail" class="text-[#333] underline">
             clic aquí
          </a>
          &nbsp;para volver a activarlos.
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

  const reactivateEmail = () => {
    console.log('Reactivando correo...')
  }
  </script>
  
<template>
    <div class="min-h-screen flex items-center justify-center bg-white text-center p-4">
      <div class="max-w-md" v-if="!enabledEmail">
        <h1 class="text-[16px] text-[#333] mb-4 roboto font-medium ">
          Te has dado de baja con éxito. Ya no recibirás estos correos.
        </h1>
        <p class="text-[#333] font-medium text-[16px] roboto">
          ¿Ha sido un error? Haz
          <a @click="reactivateEmail" class="text-[#333] underline cursor-pointer">
             clic aquí
          </a>
          &nbsp;para volver a activarlos.
        </p>
      </div>
      <div class="max-w-md" v-else>
        <h1 class="text-[16px] text-[#333] mb-4 roboto font-medium ">
          Se ha reactivado tu suscripción
        </h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useEmailStore } from '@/stores/modules/email'

  const route = useRoute()
  const emailStore = useEmailStore()
  const gParam = ref(route.query.g)

  const enabledEmail = ref(false)

  onMounted(async () => {
    try {
      let params = {
        guest_id: gParam.value
      }
      const response = await emailStore.$disabledEmail(params)
      
      // Verificar si el correo ya está desactivado
      if (response.data.guest && response.data.guest.off_email === true) {
        // Si está desactivado, activarlo automáticamente
        const reactivateResponse = await emailStore.$reactivateEmail(params)
        enabledEmail.value = true
      }
      // Si no está desactivado, mantiene el flujo normal
    } catch (error) {
      console.error('Error al procesar la solicitud:', error)
    }
  })

  const reactivateEmail = async () => {
    try {
      let params = {
        guest_id: gParam.value
      }
      const response = await emailStore.$reactivateEmail(params)
      enabledEmail.value = true
    } catch (error) {
      console.error('Error al reactivar el correo:', error)
    }
  }
  </script>
  
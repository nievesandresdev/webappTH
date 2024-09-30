<!-- src/components/Login.vue -->
<template>
    <div class="login-container">
      <button @click="signInWithGoogle" class="google-sign-in">
        Continuar con Google
      </button>
    </div>
    <div v-if="dataGuest" class="mt-10">
        <h1 class="text-base leading-5 mt-2">{{  dataGuest.firstName }}</h1>
        <h1 class="text-base leading-5 mt-2">{{  dataGuest.lastName }}</h1>
        <h1 class="text-base leading-5 mt-2">{{  dataGuest.email }}</h1>
        <img class="w-10 h-10 rounded-full mt-6" :src="dataGuest.avatar" alt="">
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { authWithGoogle } from '@/api/services/guest.services'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  onMounted(() => {
    console.log('Origen actual:', window.location.origin)
  })

  const dataGuest = ref(null);

  function signInWithGoogle() {
    // Inicializar el flujo de Google Sign-In
    window.google.accounts.id.initialize({
      client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID, // Reemplaza con tu Client ID
      callback: handleCredentialResponse,
    })
  
    // Mostrar el prompt de Google
    window.google.accounts.id.prompt()
  }
  
  async function handleCredentialResponse(response) {
    console.log('response', response)
    const token = response.credential
    
    let data = { token };
    const res = await authWithGoogle(data);
    dataGuest.value = res.data;
    console.log('test res',res)
    
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .google-sign-in {
    background-color: #4285F4;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .google-sign-in:hover {
    background-color: #357ae8;
  }
  </style>
  
  <!-- <script setup>
  import { authWithGoogle } from '@/api/services/guest.services'

  async function signInWithGoogle(){
    const res = await authWithGoogle();
    console.log('test res',res)
  }
  </script> -->
  
  
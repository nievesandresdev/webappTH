<!-- src/components/Login.vue -->
<template>
    <div class="login-container">
      <button @click="signInWithGoogle" class="google-sign-in">
        Continuar con Google
      </button>
    </div>
    <div v-if="dataGuest.email" class="mt-10 p-4 hbg-gray-200 shadow rounded-[10px] mx-6">
      <h1 class="text-xl font-medium leading-5 mb-6">Datos obtenidos:</h1>
      <h1 class="text-base leading-5">ID: {{  dataGuest.googleId }}</h1>
        <h1 class="text-base leading-5 mt-2">NAMES: {{  dataGuest.names }}</h1>
        <h1 class="text-base leading-5 mt-2">{{  dataGuest.email }}</h1>
        <img class="w-10 h-10 rounded-full mt-6" :src="dataGuest.avatar" alt="">
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue'
  import { authWithGoogle } from '@/api/services/guest.services'
  import { getUrlParam } from '@/utils/utils.js'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  onMounted(() => {
    let names = getUrlParam('names')
    let googleId = getUrlParam('googleId')
    let email = getUrlParam('email')
    let avatar = getUrlParam('avatar')
    console.log('email',email)
    names ? dataGuest.names = names : null;
    googleId ? dataGuest.googleId = googleId : null;
    email ? dataGuest.email = email : null;
    avatar ? dataGuest.avatar = avatar : null;
    console.log('dataGuest',dataGuest)
  })

  const dataGuest = reactive({
    names:null,
    email:null,
    avatar:null,
    googleId:null,
  });

  function signInWithGoogle() {
    const currentUrl = window.location.href
    console.log('currentUrl',window.location.href)
    // Redirigir al usuario a la API para iniciar el flujo de autenticación
    window.location.href = `${process.env.VUE_APP_API_URL_BACKEND_GENERAL}/guest/auth/google?redirect=${encodeURIComponent(currentUrl)}`
  }
  
  // async function handleCredentialResponse(response) {
  //   console.log('response', response)
  //   const token = response.credential
    
  //   let data = { token };
  //   const res = await authWithGoogle(data);
  //   dataGuest.value = res.data;
  //   console.log('test res',res)
    
  // }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
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

  
  
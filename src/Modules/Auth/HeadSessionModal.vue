<template>
    <transition name="fade">
      <!-- Usamos una key dinámica para disparar la transición al cambiar el título -->
      <HeadInChain 
        :key="showEnterPassword ? 'auth.log.title' : titleKey"
        :text="showEnterPassword ? $t('auth.log.title') : $t(titleKey)"
        title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
        :go-back="showEnterPassword || formType == 'complete'"
        @go-back="goBack"
      />
    </transition>
  </template>
  
  <script setup>
  import { computed, inject, ref, watch } from 'vue'
  import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue'
  import { navigateTo } from '@/utils/navigation'
  import { useHotelStore } from '@/stores/modules/hotel'
  const hotelStore = useHotelStore()
  import { useGuestStore } from '@/stores/modules/guest'
  const guestStore = useGuestStore()
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  
  const emit = defineEmits(['back'])
  
  const formType = ref(route.query.acform ?? 'log')
  
  watch(
    () => route.query.acform,
    (newAcform, oldAcform) => {
      console.log('acform ha cambiado de', oldAcform, 'a', newAcform);
      formType.value = newAcform;
    }
  );
  
  const showEnterPassword = inject('showEnterPassword')
  
  const titleKey = computed(() => {
    switch (formType.value) {
      case 'log':
        return 'auth.log-or-register.title'
      case 'complete':
        return 'auth.register.title'
      case 'reset':
        return 'auth.reset-pass.title'
      case 'createstay':
        return 'stay.create.title'
      default:
        return 'auth.log-or-register.title'
    }
  });
  
  async function goBack(){
    if(showEnterPassword.value){
      showEnterPassword.value = false;
      return;
    }
    await guestStore.deleteLocalGuest();
    if(hotelStore.hotelData){
      navigateTo('Home',{},{ acform : 'log' })
    } else {
      router.push({ name: 'ChainLanding', query:{ acform:'log' }});
    }
    emit('back');
  }
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }
  </style>
  
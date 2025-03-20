<template>
    <!-- Se utiliza "appear" para que al montar se ejecute la animación de aparición -->
    <Transition name="bottom" appear>
      <div v-if="openBottomSheet" class="fixed left-0 bottom-0 flex w-screen items-center justify-center z-[9500]">
        <div class="w-full bg-[#fafafa] rounded-t-[20px] relative pb-4"><!--pb-14-->
          <slot></slot>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { toRefs } from 'vue'
  const props = defineProps({
    openBottomSheet: Boolean,
  })
  const { openBottomSheet } = toRefs(props)
  </script>
  
  <style scoped>
  /* Animación para la aparición (appear): efecto fade */
  .bottom-appear-active {
    transition: opacity 0.6s ease;
  }
  .bottom-appear-from {
    opacity: 0;
  }
  .bottom-appear-to {
    opacity: 1;
  }
  
  /* Opcional: animación para enter si se requiere (en este caso igual a appear) */
  .bottom-enter-active {
    transition: opacity 0.6s ease;
  }
  .bottom-enter-from {
    opacity: 0;
  }
  .bottom-enter-to {
    opacity: 1;
  }
  
  /* Animación para la salida (leave): slide hacia abajo */
  .bottom-leave-active {
    transition: transform 0.6s ease;
  }
  .bottom-leave-from {
    transform: translateY(0);
  }
  .bottom-leave-to {
    transform: translateY(100vh);
  }
  </style>
  
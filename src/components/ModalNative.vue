<template>
    <Transition>
      <div
        v-if="modalNativeIsOpen"
        class="fixed inset-0 bg-black/50 z-[6001]"
        @click="modalNativeIsOpen = false"
      ></div>
    </Transition>
    <Transition>
      <div
        v-if="modalNativeIsOpen"
        :class="`${position} m-auto bg-white left-0 right-0 z-[6002] rounded-[10px] ${customClasses}`"
        :style="{ width: width, top: top }"
      >
        <slot></slot>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  
  const props = defineProps({
    width: {
      type: String,
      default: '300px',
    },
    top: {
      type: String,
      default: '40%',
    },
    customClasses: {
      type: String,
      default: '',
    },
    position : {
      type: String,
      default: 'absolute'
    }
  });
  
  const modalNativeIsOpen = inject('modalNativeIsOpen');
  </script>
  
  <style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  </style>
  
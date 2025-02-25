<template>
    <Transition>
      <div
        v-if="modalNativeIsOpen || openProp"
        class="fixed inset-0 bg-modal z-[6001]"
        @click="close"
      ></div>
    </Transition>
    <Transition>
      <div
        v-if="modalNativeIsOpen || openProp"
        :class="`${position} m-auto bg-gradient-h left-0 right-0 z-[6002] rounded-[20px] ${customClasses}`"
        :style="{ width: width, top: top }"
      >
        <slot></slot>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  
  const emit = defineEmits(['closeModal'])

  const props = defineProps({
    width: {
      type: String,
      default: '300px',
    },
    top: {
      type: String,
      default: '35%',
    },
    customClasses: {
      type: String,
      default: '',
    },
    position : {
      type: String,
      default: 'absolute'
    },
    openProp : {
      type: Boolean,
      default: false
    }
  });
  
  const modalNativeIsOpen = inject('modalNativeIsOpen');

  function close(){
    if(modalNativeIsOpen){
      modalNativeIsOpen.value = false;
    }
    emit('closeModal')
  }
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

  .bg-modal{
    background-color: rgba(0, 0, 0, 0.32);
  }

  </style>
  
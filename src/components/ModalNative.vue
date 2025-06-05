<template>
    <!-- <Transition>
      <div
        v-if="modalNativeIsOpen || openProp"
        class="fixed inset-0 bg-modal z-[6001]"
        @click="close"
      ></div>
    </Transition> -->
    <Transition>
      <div
        v-if="modalNativeIsOpen || openProp"
        class="fixed inset-0 z-[6002] flex justify-center items-center bg-modal"
         @click.self="close"
        >
        <div
          :class="`m-auto bg-gradient-h rounded-[20px] ${customClasses}`"
          :style="{ width: width}"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { inject, watch, onUnmounted } from 'vue';
  
  const emit = defineEmits(['closeModal'])

  const props = defineProps({
    width: {
      type: String,
      default: '300px',
    },
    customClasses: {
      type: String,
      default: '',
    },
    openProp : {
      type: Boolean,
      default: false
    }
  });
  
  const modalNativeIsOpen = inject('modalNativeIsOpen');

  watch(
    () => (modalNativeIsOpen ? modalNativeIsOpen.value : props.openProp),
    (isOpen) => {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    },
    { immediate: true }
  )

  onUnmounted(() => (document.body.style.overflow = ''))

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
  
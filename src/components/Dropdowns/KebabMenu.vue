<template>
    <div v-if="isOpen"  class="fixed w-screen h-screen z-40 top-0 left-0"></div>
    <div class="relative">
      <!-- Botón que abre el dropdown -->
      <div @click="toggleDropdown" class="cursor-pointer">
        <slot name="trigger"></slot>
      </div>
  
      <!-- Menú desplegable -->
      <div 
        v-if="isOpen" 
        class="absolute right-0 mt-4 w-[264px] rounded-[20px] shadow-guest-2 bg-gradient-h z-50 overflow-hidden border border-white"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, provide } from 'vue';
  
  const isOpen = ref(false);
  
  // Función para alternar la apertura/cierre del menú
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  // Cierra el dropdown si se hace clic fuera del contenedor
  const closeDropdown = (event) => {
    if (!event.target.closest('.relative')) {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', closeDropdown);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
  });
  
  // Función para cerrar el menú que se proveerá a los hijos
  const closeMenu = () => {
    isOpen.value = false;
  };
  
  // Proveer la función para que las opciones puedan cerrarlo
  provide('closeMenu', closeMenu);
  </script>
  
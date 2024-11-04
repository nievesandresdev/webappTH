<template>
    <div class="flex flex-col items-center">
      <!-- Botón con icono -->
      <button class="flex items-center p-2 gap-2 rounded-full border border-white bg-gradient-h shadow-md">
        <img :src="iconUrl" class="w-[32px] h-[32px]" alt="Icon" />
      </button>
      <p v-if="showLabel" class="mt-2 text-[12px] font-bold text-[#333] lato text-center max-w-[80px]">{{ label }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    iconUrl: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''  
    },
    showLabel: {
      type: Boolean,
      default: false  
    }
  })
  </script>
  
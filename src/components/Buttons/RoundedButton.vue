<template>
   <div
      class="flex flex-col items-center"
      :class="classContainer"
    >
      <!-- Botón con icono -->
      <button 
        :id="id"
        class="flex items-center p-1 sp:p-2 gap-1 sp:gap-2 border border-white bg-gradient-h shadow-md"
        :class="classButton"
      >
        <img :src="iconUrl" :class="sizeIcons" alt="Icon" />
      </button>
      <p v-if="showLabel" class="mt-[4px] sp:mt-2 text-[8px] sp:text-[12px] font-bold text-[#333] lato text-center sp:max-w-[40px] sp:max-w-[80px]">{{ label }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    id: {
      type: String,
      required: 'button-id'
    },
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
    },
    sizeIcons: {
      type: String,
      default: 'size-[20px] sp:size-[32px]'
    },
    classContainer: {
      type: String,
      default: ''
    },
    classButton: {
      type: String,
      default: 'rounded-full'
    }
  })
  </script>
  
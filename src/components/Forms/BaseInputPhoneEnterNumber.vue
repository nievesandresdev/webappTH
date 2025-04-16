<template>
    <div class="h-full flex-grow">
      <input
        type="number"
        placeholder="Nº teléfono"
        class="border-none w-full h-full px-1 sp:px-2 py-1.5 sp:py-3 lato text-sm font-medium leading-[14px] rounded-r-[6px] sp:rounded-r-[10px]"
        :class="[bgColor]"
        :value="modelValue"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        :disabled="disabled"
      />
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue'
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
  })
  
  const disabled = inject('disabled')
  const emit = defineEmits(['update:modelValue','onBlur','onFocus'])
  
  // Emitimos el cambio cuando el usuario escribe en el input
  function onInput(event) {
    emit('update:modelValue', event.target.value)
  }

  function onFocus() {
    emit('onFocus')
  } 

  function onBlur() {
    emit('onBlur')
  }
  </script>
  
  <style scoped>
  input::placeholder{
    font-size: 14px;
    font-family: 'lato';
    font-weight: 500;
    color: #A0A0A0;
    line-height: 14px;
  }
  @media (max-width: 224px) {
    input::placeholder{
      font-size: 10px;
      line-height: 10px;
    }
  }
  
  </style>
  
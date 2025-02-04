<template>
    <div 
      class="h-full rounded-input border flex-grow"
      :class="{'border-[#333]':!hasError,'hborder-alert-negative':hasError}"
    >
      <input
        type="number"
        placeholder="Nº teléfono"
        class="border-none w-full h-full px-2 py-3 rounded-input text-sm leading-[14px]"
        :value="modelValue"
        @blur="onBlur"
        @input="onInput"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
  })
  
  const emit = defineEmits(['update:modelValue','onBlur'])
  
  // Emitimos el cambio cuando el usuario escribe en el input
  function onInput(event) {
    emit('update:modelValue', event.target.value)
  }

  function onBlur() {
    emit('onBlur')
  }
  </script>
  
  <style scoped>
  .rounded-input {
    border-radius: 0px 10px 10px 0px;
  }
  input::placeholder{
    font-size: 14px;
    font-family: 'lato';
    color: #A0A0A0;
    line-height: 14px;
  }
  </style>
  
<!-- BaseInputPhone.vue -->
<template>
    <div class="flex h-7 sp:h-10 rounded-[6px] sp:rounded-[10px]">
      <!-- Dropdown con la lista de códigos -->
      <div 
        class="px-1 sp:px-2 rounded-dropdown border border-r-none"
        :class="{'border-[#333]':!hasError,'hborder-alert-negative':hasError}"
      >
        <!-- Notar el nuevo `@selected-code-length="onCodeLength"` -->
        <BaseInputPhoneCodeDropdown
          v-model="selectedCode"
        />
      </div>
      <!-- Campo del número de teléfono -->
      <BaseInputPhoneEnterNumber v-model="localNumber" @onBlur="onBlur" :hasError="hasError"/>
    </div>
    <p
        v-if="hasError"
        class="lato text-xs font-bold leading-[12px] sp:leading-[16px] htext-alert-negative"
    >Introduzca un numero de telefono valido</p>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import BaseInputPhoneCodeDropdown from './BaseInputPhoneCodeDropdown.vue'
  import BaseInputPhoneEnterNumber from './BaseInputPhoneEnterNumber.vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: null
    }
  })
  const emit = defineEmits(['update:modelValue','onBlur','handleError'])
  
  // Variables internas
  const selectedCode = ref('+34')
  const localNumber = ref('')
  const hasError = ref(false)
  
  
  // Cada vez que cambie modelValue, lo parseamos
  // watch(
  //   () => props.modelValue,
  //   (newVal) => {
  //     parsePhone(newVal)
  //   },
  //   { immediate: true }
  // )
  
  // Cada vez que cambien selectedCode o localNumber => reconstruimos
  watch([selectedCode, localNumber], () => {
    validateNumber(localNumber.value);
    const combined = buildPhone()
    emit('update:modelValue', combined)
  })
  
  function onBlur() {
    emit('onBlur')
  }

  function validateNumber(number){
    // console.log('test number?.length',number?.length)
    if(number?.length > 4 && number?.length < 11){
      hasError.value  = false;
    }else{
      hasError.value  = true;
    }

    if(!number?.length) hasError.value  = false;
    emit('handleError',hasError.value)
  }
  
  function buildPhone() {
    return selectedCode.value + localNumber.value
  }
  </script>
  
  <style scoped>
  .rounded-dropdown {
    border-radius: 10px 0px 0px 10px;
  }

  @media (max-width: 224px) {
    .rounded-dropdown {
      border-radius: 6px 0px 0px 6px;
    }
}
  </style>
  
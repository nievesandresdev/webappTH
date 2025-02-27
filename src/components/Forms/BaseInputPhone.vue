<!-- BaseInputPhone.vue -->
<template>
    <div v-show="loading" class="flex justify-center">
        <Spinner width="40px" height="40px"/>
    </div>
    <div  v-show="!loading" class="flex h-7 sp:h-10 rounded-[6px] sp:rounded-[10px]">
      <!-- Dropdown con la lista de códigos -->
      <div 
        class="px-1 sp:px-2 rounded-dropdown border border-r-none"
        :class="{'border-[#333]':!hasError,'hborder-alert-negative':hasError}"
      >
        <!-- Notar el nuevo `@selected-code-length="onCodeLength"` -->
        <BaseInputPhoneCodeDropdown
          ref="phoneDropdownRef"
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
  import Spinner from '@/components/Spinner.vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: null
    }
  })
  const emit = defineEmits(['update:modelValue','onBlur','handleError','loading'])
  
  // Variables internas
  const selectedCode = ref('+34')
  const localNumber = ref('')
  const hasError = ref(false)
  const phoneDropdownRef = ref(null)
  const loading = ref(true)

  
  // Cada vez que cambien selectedCode o localNumber => reconstruimos
  watch([selectedCode, localNumber], () => {
    validateNumber(localNumber.value);
    const combined = buildPhone()
    emit('update:modelValue', combined)
  })

  // Watch para acceder a la lista de códigos expuesta en el dropdown
  watch(
    () => phoneDropdownRef.value?.codes,
    (codes) => {
      // console.log('test codes',codes)
      if (props.modelValue && codes && codes.length) {
        const found = codes.find(c => props.modelValue.startsWith(c.value))
        // console.log('test found',found)
        if (found) {
          selectedCode.value = found.value
          localNumber.value = props.modelValue.slice(found.value.length)
        } else {
          selectedCode.value = '+34'
          localNumber.value = props.modelValue
        }
        loading.value = false
        emit('loading',loading.value )
      }
      if(!props.modelValue) loading.value = false;
    },
    { immediate: true }
  )
  
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
  
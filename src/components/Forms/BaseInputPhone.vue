<!-- BaseInputPhone.vue -->
<template>
    <div v-show="loading" class="flex justify-center">
        <Spinner width="40px" height="40px"/>
    </div>
    <label v-if="textLabel && !loading" class="text-[10px] sp:text-sm font-bold mb-1 block lato leading-[12px] sp:leading-[16px]">
        {{$t('profile.page_personal_info.form.number_phone.label')}}
    </label>
    <div 
        v-show="!loading" 
        class="flex h-7 sp:h-10 rounded-[6px] sp:rounded-[10px] border-[2px]"
        :class="[borderColor]"
    >
      <!-- Dropdown con la lista de códigos -->
      <div class="px-1 sp:px-2 border-r-[2px] rounded-l-[6px] sp:rounded-l-[10px]" :class="[borderColor, bgColor]">
        <!-- Notar el nuevo `@selected-code-length="onCodeLength"` -->
        <BaseInputPhoneCodeDropdown
          ref="phoneDropdownRef"
          v-model="selectedCode"
        />
      </div>
      <!-- Campo del número de teléfono -->
      <BaseInputPhoneEnterNumber 
        v-model="localNumber" 
        @onBlur="onBlur" 
        @onFocus="onFocus" 
        :hasError="hasError" 
        :bgColor="bgColor"
      />
    </div>
    <p
        v-if="hasError"
        class="lato text-xs font-bold leading-[12px] sp:leading-[16px] htext-alert-negative"
    >Introduzca un numero de telefono valido</p>
  </template>
  
  <script setup>
  import { ref, watch, computed, provide } from 'vue'
  import BaseInputPhoneCodeDropdown from './BaseInputPhoneCodeDropdown.vue'
  import BaseInputPhoneEnterNumber from './BaseInputPhoneEnterNumber.vue'
  import Spinner from '@/components/Spinner.vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: null
    },
    textLabel: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue','onBlur','handleError','loading'])
  
  // Variables internas
  const selectedCode = ref('+34')
  const localNumber = ref('')
  const hasError = ref(false)
  const phoneDropdownRef = ref(null)
  const loading = ref(true)
  const isFocused = ref(false)
  const openCodesDropdown = ref(false)

  provide('openCodesDropdown', openCodesDropdown)
  provide('disabled', props.disabled)

  const borderColor = computed(() => {
    if(props.disabled) return 'hborder-disabled-2';
    if((isFocused.value || openCodesDropdown.value) && !hasError.value) return 'hborder-black-100';
    if(hasError.value) return 'hborder-alert-negative'
    return 'hborder-gray-400'
  })

  const bgColor = computed(() => {
    if(props.disabled) return 'hbg-disabled-2';
    return 'bg-white';
  })

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
    isFocused.value = false
    emit('onBlur')
  }

  function onFocus() {
    isFocused.value = true
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
  
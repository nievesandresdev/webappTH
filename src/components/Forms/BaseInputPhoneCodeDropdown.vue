<template>
    <div class="h-full w-[64px] sp:w-auto">
      <!-- Sección “vista previa” donde se ve, por ejemplo, ES +34 -->
      <div class="flex items-center h-full" @click="toggleOpen">
        <img class="w-[14px] sp:w-5 h-[11px] sp:h-5 mr-1 sp:mr-2" src="/assets/icons/WA.llamar.svg" alt="">
        <div class="h-[28px] sp:h-[24px]">
          <!-- Muestra algo como 'ES' y '+34'. Aquí podrías mostrar el label exacto que quieras -->
          <span class="inline lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px] sp:pr-1">
            <!-- Ejemplo: si en `selectedItem.label` está "ES +34", lo partimos o mostramos completo. -->
            {{ selectedItem ? selectedItem.label.split(' ')[0] : 'ES' }}
          </span>
          <span class="inline lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px]">
            {{ selectedItem ? selectedItem.label.split(' ')[1] : '+34' }}
          </span>
        </div>
        <img v-if="!disabled" class="w-[14px] sp:w-5 h-[14px] sp:h-5 ml-1 sp:ml-2" src="/assets/icons/1.TH.I.DROPDOWN.svg" alt="">
      </div>
  
      <!-- Fondo oscuro para cerrar el modal -->
      <div
        v-show="open"
        class="fixed top-0 left-0 w-screen h-screen z-40"
        @click="open = false"
      ></div>
  
      <!-- La lista desplegable -->
      <div
        v-show="open"
        class="fixed w-full h-[70vh] z-[6000] px-4 top-0 bottom-0 left-0 my-auto"
      >
        <div 
          ref="scrollContainer"
          class="w-full h-full rounded-[20px] bg-gradient-h shadow-guest overflow-y-auto"
        >
          <div
            v-for="(item, index) in codes"
            :key="index"
            class="px-3 py-4 flex items-center gap-2 w-full"
            :class="['border-t border-color-secondary', index > 0]"
            @click="selectCode(item)"
          >
            <div class="w-4 h-4">
              <img 
                    v-if="selectedItem && selectedItem.label.split(' ')[1] == item.value"
                    class="w-full h-full" 
                    src="/assets/icons/WA.check.svg"
                >
            </div>
            <!-- Se muestra, por ejemplo, España (ES +34) o en su defecto el label original "ES +34" -->
            <p class="lato text-sm font-bold leading-[16px]">
                {{ item.translateCountry[currentLang] }} ({{ item.label }})
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted, computed, nextTick, inject  } from 'vue'
  import { getPhoneCodesApi } from '@/api/services/utility.services'
  
  // v-model para el prefijo
  const props = defineProps({
    modelValue: {
      type: String,
      default: '+34'
    }
  })
  const emit = defineEmits(['update:modelValue'])

  
  // Idioma actual por defecto en inglés
  const currentLang = ref('en')
  const scrollContainer = ref(null)

  
  // Estado local
  const open = inject('openCodesDropdown')
  const disabled = inject('disabled')
  const codes = ref([])
  onMounted(async () => {
    const response = await getPhoneCodesApi()
    codes.value = response.data
  
    sortCodes() // ← Llamamos a la función para ordenar y poner el seleccionado primero
  })
  
  function toggleOpen() {
    if(disabled) return;
    open.value = !open.value
    // Si acabamos de abrir el menú, esperamos el render y hacemos scrollTop = 0
    if (open.value) {
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = 0
        }
      })
    }
  }
  
  function selectCode(item) {
    emit('update:modelValue', item.value)
    sortCodes(item.value);
    open.value = false
    }
  
  // Computed para hallar el ítem seleccionado
  const selectedItem = computed(() => {
    if (!codes.value.length) return
    
    return codes.value.find(c => c.value === props.modelValue)
  })
  
  // --- NUEVA FUNCIÓN PARA ORDENAR Y REUBICAR ---
  function sortCodes(valueCode = null) {
    let code = valueCode ?? props.modelValue;
    // Ordena alfabéticamente según el idioma actual
    codes.value.sort((a, b) => {
      const nameA = a.translateCountry[currentLang.value]
      const nameB = b.translateCountry[currentLang.value]
      return nameA.localeCompare(nameB)
    })
    
    // Mueve el código seleccionado al inicio
    const selectedIndex = codes.value.findIndex(c => c.value === code)
    if (selectedIndex > -1) {
      const [selected] = codes.value.splice(selectedIndex, 1)
      codes.value.unshift(selected)
    }
  }

  defineExpose({ codes }) 
  </script>
  
  
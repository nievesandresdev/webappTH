<template>
  <div class="relative">
      <div 
        class="w-full flex items-center border h-10 px-2"
        :class="[
          'rounded-[10px]',
          hasError ? 'hborder-alert-negative htext-alert-negative' : 'hborder-black-100'
        ]"
      >
        <img class="w-5 h-5 mr-2" src="/assets/icons/WA.flag.svg" alt="">
        <input
          v-model="searchQuery"
          @input="handleInput"
          @keydown.enter="handleEnter"
          @blur="handleBlur"
          :placeholder="placeholder"
          class="w-full h-full border-none p-0 rounded-[10px] flex-grow py-3"
        />
        <img class="w-5 h-5" src="/assets/icons/WA.chevron.DOWN.svg" alt="">
      </div>
    
      <ul
        v-if="isDropdownOpen && filteredCountries.length > 0"
        class="absolute z-10 w-full bg-gradient-h rounded-[20px] shadow-guest max-h-[267px] overflow-y-auto"
      >
        <li
          v-for="(country, index) in filteredCountries"
          :key="country.codeCountry"
          @mousedown="selectCountry(country.translateCountry[currentLanguage])"
          class="px-2 py-4 cursor-pointer hover:bg-gray-100 lato text-sm font-bold leading-[16px]"
          :class="{'hborder-top-gray-400': index > 0}"
        >
          {{ country.translateCountry[currentLanguage] }}
        </li>
      </ul>
  </div>
</template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getPhoneCodesApi } from '@/api/services/utility.services';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const searchQuery = ref(props.modelValue ?? '');
  const countries = ref([]);
  const currentLanguage = ref('es'); // Simulación de idioma actual
  const isDropdownOpen = ref(false);
  const hasError = ref(false);
  const isSelecting = ref(false); // Bandera para evitar el @blur al seleccionar
  
  onMounted(async () => {
    const response = await getPhoneCodesApi();
    countries.value = response.data;
  });
  
  const filteredCountries = computed(() => {
    if (!searchQuery.value) return [];
    const query = searchQuery.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    return countries.value.filter(country => {
      const countryName = country.translateCountry[currentLanguage.value].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return countryName.includes(query);
    });
  });
  
  const handleInput = () => {
    isDropdownOpen.value = true;
    hasError.value = false; // Resetear el error al escribir
  };
  
  const handleEnter = () => {
    validateInput();
    isDropdownOpen.value = false;
  };
  
  const handleBlur = () => {
    if (!isSelecting.value) { // Solo ejecutar si no se está seleccionando una opción
      validateInput();
      isDropdownOpen.value = false;
    }
  };
  
  const validateInput = () => {
     // eliminar espacios al inicio y al final:
    searchQuery.value = searchQuery.value.trim();

    const selectedCountry = countries.value.find(country =>
      country.translateCountry[currentLanguage.value].toLowerCase() === searchQuery.value.toLowerCase()
    );
    if (selectedCountry) {
      emit('update:modelValue', selectedCountry.translateCountry[currentLanguage.value]);
      hasError.value = false;
    } else {
        emit('update:modelValue', null);
      hasError.value = true;
    }
  };
  
  const selectCountry = (country) => {
    isSelecting.value = true; // Activar la bandera
    searchQuery.value = country;
    emit('update:modelValue', country);
    hasError.value = false;
    isDropdownOpen.value = false;
  
    // Desactivar la bandera después de un pequeño retraso
    setTimeout(() => {
      isSelecting.value = false;
    }, 100);
  };
  </script>
  
  <style scoped>
  input::placeholder{
    color: #A0A0A0;
    font-family: Lato;
    font-size: 14px;
    font-weight: 500;
    /* line-height: 16px; */
  }
  </style>
<template>
  <Menu as="div" class="relative inline-block text-left">
      <div>
          <MenuButton class="flex items-center">
              <img class="w-5 h-5 inline-block" :src="`/assets/icons/languages/${modelValue}.svg`" :alt="lg">
              <img
                  class="ml-1 w-6 h-6"
                  :class="{ 'rotate-180': toggleLang }"
                  src="/assets/icons/1.TH.I.DROPDOWN.svg"
                  alt="1.TH.DROPDOWNSHAPE"
              >
          </MenuButton>
      </div>

      <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
      >
          <MenuItems class="absolute left-0 origin-top-right rounded-lg bg-white shadow w-full z-[300]">
              <MenuItem v-for="(lg, index) in localeStore.availableLocation" :key="index">
                  <button
                      class="flex p-3 hover:bg-gray-100 w-full text-left"
                      :class="{ 'hidden': modelValue === lg }"
                      @click="updateLocale(lg)"
                  >
                      <img class="block mx-auto w-4" :src="`/assets/icons/languages/${lg}.svg`" :alt="lg">
                  </button>
              </MenuItem>
          </MenuItems>
      </transition>
  </Menu>
</template>

<script setup>
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { defineProps } from 'vue'
  import { useLocaleStore } from '@/stores/modules/locale'
  const localeStore = useLocaleStore()

  const props = defineProps({
      modelValue: String
  });
  
  const emit = defineEmits(['update:modelValue'])

  const lgsAll = [
      { value: 'es', srcIcon: '/assets/icons/español.svg' },
      { value: 'fr', srcIcon: '/assets/icons/frances.svg' },
      { value: 'en', srcIcon: '/assets/icons/ingles.svg' },
  ];

  function updateLocale(lg) {
      emit('update:modelValue', lg);
      localeStore.$change(lg)
  }
</script>


<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
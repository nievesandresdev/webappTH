<template>
  <Menu as="div" class="relative inline-block text-left">
      <div>
          <MenuButton class="p-2 flex items-center">
              <img v-if="modelValue === 'es'" class="w-4 h-4 inline-block" src="/assets/icons/español.svg" alt="">
              <img v-if="modelValue === 'fr'" class="w-4 h-4 inline-block" src="/assets/icons/frances.svg" alt="">
              <img v-if="modelValue === 'en'" class="w-4 h-4 inline-block" src="/assets/icons/ingles.svg" alt="">
              <img
                  class="ml-2 w-4"
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
              <MenuItem v-for="(item, index) in lgsAll" :key="index">
                  <button
                      class="flex p-3 hover:bg-gray-100 w-full text-left"
                      :class="{ 'hidden': modelValue === item.value }"
                      @click="updateLocale(item.value)"
                  >
                      <img class="block mx-auto w-4" :src="item.srcIcon" :alt="item.value">
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
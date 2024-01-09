<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="p-2 flex items-center"
        >
            <img  v-if="localeStore.localeCurrent == 'es'" class="w-4 h-4 inline-block" src="/assets/icons/español.svg" alt="">
            <img  v-if="localeStore.localeCurrent == 'fr'" class="w-4 h-4 inline-block" src="/assets/icons/frances.svg" alt="">
            <img  v-if="localeStore.localeCurrent == 'en'" class="w-4 h-4 inline-block" src="/assets/icons/ingles.svg" alt="">

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
        <MenuItems
          class="absolute left-0 origin-top-right rounded-lg bg-white shadow w-full"
        >
            <MenuItem
                v-for="(item, index) in lgsAll"
                :key="index"
            >
                <a 
                    class="flex p-3 hover:bg-gray-100"
                    :class="localeStore.localeCurrent == item.value ? 'hidden':''"
                    @click.prevent="changeLocale(item.value)"
                >
                    <img class="block mx-auto w-4" :src="item.srcIcon" :alt="item.srcIcon">
                </a>
            </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
</template>

<script setup>
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
    import { ref, inject, watch } from 'vue'
    import { useLocaleStore } from '@/stores/modules/locale'

    const lgsAll = ref([
        {value: 'es', srcIcon: '/assets/icons/español.svg'},
        {value: 'fr', srcIcon: '/assets/icons/frances.svg'},
        {value: 'en', srcIcon: '/assets/icons/ingles.svg'},
    ])
    const toggleLang = ref(false)
    // const modal_lang = inject('modal_lang')
    const localeStore = useLocaleStore()

    // watch(modal_lang, (value) => {
    //     if (value) {
    //         document.body.classList.add('no-scroll')
    //     } else {
    //         document.body.classList.remove('no-scroll')
    //     }
    // })

    //function
    function changeLocale (lg) {
        // modal_lang.value = false
        localeStore.$changeAndReload(lg)
    }

</script>

<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
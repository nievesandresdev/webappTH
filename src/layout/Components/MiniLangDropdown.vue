<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="hbtn-blur p-2 rounded-md flex items-center"
        >
            <img  v-if="localeStore.localeCurrent == 'es'" class="w-4 h-4 inline-block" src="/assets/icons/espana.png" alt="">
            <img  v-if="localeStore.localeCurrent == 'fr'" class="w-4 h-4 inline-block" src="/assets/icons/francia.png" alt="">
            <img  v-if="localeStore.localeCurrent == 'en'" class="w-4 h-4 inline-block" src="/assets/icons/reino-unido.png" alt="">

            <img
                class="ml-1 w-3 sp:w-4 icon-white"
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
                    class="cursor-pointer text-sm flex justify-between items-center p-3 hover:bg-gray-100"
                    :class="localeStore.localeCurrent == item.value ? 'hidden':''"
                    @click.prevent="changeLocale(item.value)"
                >
                    <img class="block w-4 h-4 mx-auto" :src="item.srcIcon" :alt="item.srcIcon">
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
        {label: 'Español', value: 'es', srcIcon: '/assets/icons/espana.png'},
        {label: 'Francés', value: 'fr', srcIcon: '/assets/icons/francia.png'},
        {label: 'Inglés', value: 'en', srcIcon: '/assets/icons/reino-unido.png'},
    ])
    const toggleLang = ref(false)
    const modal_lang = inject('modal_lang')
    const localeStore = useLocaleStore()

    watch(modal_lang, (value) => {
        if (value) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    })

    //function
    function changeLocale (lg) {
        modal_lang.value = false
        localeStore.$changeAndReload(lg)
    }

</script>

<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
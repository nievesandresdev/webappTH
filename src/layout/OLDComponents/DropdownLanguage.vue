<template>
    <Menu as="div" class="relative inline-block text-left ml-3.5 sp:ml-6">
      <div>
        <MenuButton
          class="hbtn-blur p-2 rounded-md flex items-center"
        >
            <template
              v-for="(lg, index) in localeStore.availableLocation"
            :key="index"
            >
              <img
                v-if="localeStore.localeCurrent == 'es'"
                class="w-4 sp:w-[22px] inline-block"
                :src="`/assets/icons/languages/${lg}.svg`"
                alt=""
              >
            </template>
            <!-- <img  v-if="localeStore.localeCurrent == 'fr'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/francia.png" alt="">
            <img  v-if="localeStore.localeCurrent == 'en'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/reino-unido.png" alt=""> -->

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
          class="absolute right-0 w-48 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow ring-1 ring-black/5 focus:outline-none mt-4 px-[8px] py-[8px] z-50"
        >
            <MenuItem
                v-for="(item, index) in lgsAll"
                :key="index"
            >
                <a class="cursor-pointer text-sm flex justify-between items-center p-1"  @click.prevent="changeLocale(item.value)">
                    <span>
                        <img class="inline-block mr-1" :src="item.srcIcon" :alt="item.srcIcon" width="25">
                        {{ item.label }}
                    </span>
                    <img v-if="localeStore.localeCurrent == item.value" class=" inline-block icon-green" src="/assets/icons/TH.I.CHECK.BLACK.svg" alt="TH.I.CHECK.BLACK">
                </a>
            </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
</template>

<script setup>
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
    import { ref, inject, watch,onMounted } from 'vue'
    import { useLocaleStore } from '@/stores/modules/locale'

    const lgsAll = ref([
        {label: 'Español', value: 'es', srcIcon: '/assets/icons/espana.png'},
        {label: 'Francés', value: 'fr', srcIcon: '/assets/icons/francia.png'},
        {label: 'Inglés', value: 'en', srcIcon: '/assets/icons/reino-unido.png'},
    ])
    const toggleLang = ref(false)
    const localeStore = useLocaleStore()

    //function
    function changeLocale (lg) {
        localeStore.$changeAndReload(lg)
    }
    // onMounted(() => {
    // })

</script>

<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
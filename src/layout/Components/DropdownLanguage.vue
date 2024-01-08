<template>
    <div class=" dropdown dropdown-bottom dropdown-end ml-3.5 sp:ml-6">
        <button 
            id="toggle-lang-menu" class="hbtn-blur p-2 rounded-md flex items-center"
            role="button"
            tabindex="0"
            @click="toggleDropdown"
            :class="{'hcursor-mobile':$utils.isMockup()}"
            :disabled="$utils.isMockup()"
        >
                <img  v-if="localeStore.localeCurrent == 'es'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/espana.png" alt="">
                <img  v-if="localeStore.localeCurrent == 'fr'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/francia.png" alt="">
                <img  v-if="localeStore.localeCurrent == 'en'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/reino-unido.png" alt="">

                <img
                    class="ml-1 w-3 sp:w-4 icon-white"
                    :class="{ 'rotate-180': toggleLang }"
                    src="/assets/icons/1.TH.I.DROPDOWN.svg"
                    alt="1.TH.DROPDOWNSHAPE"
                >
        </button>
        <ul tabindex="0" class="dropdown-content z-[1] menu px-[8px] py-[8px] shadow bg-white rounded-lg w-48 mt-4">
            <li
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
            </li>
        </ul>
    </div>
</template>

<script setup>
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
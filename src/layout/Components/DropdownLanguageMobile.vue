<template>
    <div ref="ref_lang_menu" class="absolute top-0 right-0  mt-[4px] sp:mt-[16px] mr-[3px] sp:mr-[8px] md:hidden" style="z-index: 1000 !important;">
        <button 
            id="toggle-lang-menu" class="hbtn-blur p-2 rounded-md flex items-center" 
            @click="toggleDropdown"
            :class="{'hcursor-mobile':$utils.isMockup()}"
            :disabled="$utils.isMockup()"
        >
            <img v-if="localeStore.localeCurrent == 'es'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/espana.png" alt="">
            <img v-if="localeStore.localeCurrent == 'fr'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/francia.png" alt="">
            <img v-if="localeStore.localeCurrent == 'en'" class="w-4 sp:w-[22px] inline-block" src="/assets/icons/reino-unido.png" alt="">
<!-- rotate-180 -->
            <img
                class="ml-1 w-3 sp:w-4 icon-white"
                src="/assets/icons/1.TH.I.DROPDOWN.svg"
                alt="1.TH.DROPDOWNSHAPE"
            >
    </button>
    </div>
    <div
        v-if="modalLocale"
        class="inline-block bg-black bg-opacity-75 w-screen h-screen z-[2000] fixed top-0 left-0 md:hidden"
        @click="modalLocale = false"
    >
    </div>
    <div v-if="modalLocale" class="bg-white opacity-100 w-screen h-[45%] z-50 rounded-t-xl px-4 pb-4 pt-[20px] md:hidden z-[4000] fixed bottom-0 left-0">
        <div class="text-center relative mb-6 bg-white">
            <button class="absolute left-0" @click="modalLocale = false">
                <img 
                    src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" 
                    class="w-6 h-6"
                >
            </button>
            <h2 class="text-sm font-medium inline-block">{{ $utils.capitalize($t('layout.dropdownLanguage.title')) }}</h2>
        </div>
        <ul class="bg-white">
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
    import { ref, watch } from 'vue'
    import { useLocaleStore } from '@/stores/modules/locale'

    const modalLocale = ref(false)
    const lgsAll = ref([
        {label: 'Español', value: 'es', srcIcon: '/assets/icons/espana.png'},
        {label: 'Francés', value: 'fr', srcIcon: '/assets/icons/francia.png'},
        {label: 'Inglés', value: 'en', srcIcon: '/assets/icons/reino-unido.png'},
    ])
    const localeStore = useLocaleStore()


    watch(modalLocale, (value) => {
        if (value) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    })

    //function
    function toggleDropdown () {
        modalLocale.value = true
    }

    function changeLocale (lg) {
        console.log('primero',lg)
        localeStore.$changeAndReload(lg)
    }

</script>

<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
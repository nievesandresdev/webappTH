<template>
    <div ref="ref_lang_menu">
        <button 
            id="toggle-lang-menu" class="flex items-center" 
            @click="toggleDropdown"
            :class="{'hcursor-mobile':$utils.isMockup()}"
            :disabled="$utils.isMockup()"
        >
            <img class="w-5 h-5 inline-block" :src="`/assets/icons/languages/${localeStore.localeCurrent}.svg`" :alt="localeStore.localeCurrent">
            <img
                  class="ml-1 w-6 h-6"
                  :class="{ 'rotate-180': toggleLang }"
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
    <div v-if="modalLocale" class="bg-white opacity-100 w-screen rounded-t-xl md:hidden z-[4000] fixed bottom-0 left-0 text-center">
        <span class="w-[64px] h-1 hbg-gray-200 inline-block rounded-full"></span>
        <div class="mt-1.5 relative px-4">
            <img 
                class="w-6 h-6 absolute left-4 cursor-pointer" 
                src="/assets/icons/close.svg" 
                @click="modalLocale = false"
            >
            <h2 class="text-center text-sm font-medium">{{ $utils.capitalize($t('layout.dropdownLanguage.title')) }}</h2>
        </div>

         
        <ul class="bg-white mt-4">
            <li     
                v-for="(lg, index) in localeStore.dropdownLangs"
                :key="index"
                class="p-4 relative hover-gray-100"
                @click.prevent="changeLocale(lg.abbreviation)"
            >
                <div class="absolute w-full bottom-0 left-0 px-4">
                    <div class="hbg-gray-400 h-[1px] rounded-full"></div>
                </div>
                <a class="flex justify-between items-center">
                    <span class="text-sm font-medium flex items-center">
                        <img
                            class="mr-2 w-6 h-6"
                            :src="`/assets/icons/languages/${lg.abbreviation}.svg`"
                            :alt="lg"
                        >
                        {{ $utils.capitalize($t(`language.${lg.abbreviation}`)) }}
                    </span>
                    <img v-if="localeStore.localeCurrent == lg" class="w-6 h-6" src="/assets/icons/Checkcircle.svg" alt="Checkcircle icon">
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick } from 'vue'

     import { useRouter } from 'vue-router'
    const route = useRouter()

    import { useLocaleStore } from '@/stores/modules/locale'
    import { useGuestStore } from '@/stores/modules/guest'

    const modalLocale = ref(false)
    const localeStore = useLocaleStore()
    const guestStore = useGuestStore()

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

    async function changeLocale (lg) {
        await guestStore.updateLanguage(lg)
        localeStore.$load(lg)
         modalLocale.value = false
    }

</script>

<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
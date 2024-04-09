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
                v-for="(item, index) in lgsAll"
                :key="index"
                class="p-4 relative hover-gray-100"
                @click.prevent="changeLocale(item.value)"
            >
                <div class="absolute w-full bottom-0 left-0 px-4">
                    <div class="hbg-gray-400 h-[1px] rounded-full"></div>
                </div>
                <a class="flex justify-between items-center">
                    <span class="text-sm font-medium flex items-center">
                        <img class="mr-2 w-6 h-6" :src="item.srcIcon" :alt="item.srcIcon">
                        {{ item.label }}
                    </span>
                    <img v-if="localeStore.localeCurrent == item.value" class="w-6 h-6" src="/assets/icons/Checkcircle.svg" alt="Checkcircle icon">
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
    const lgsAll = ref([
        {label: 'Español', value: 'es', srcIcon: '/assets/icons/1.TH.español.svg'},
        {label: 'Inglés', value: 'en', srcIcon: '/assets/icons/1.TH.INGLES.svg'},
        {label: 'Francés', value: 'fr', srcIcon: '/assets/icons/1.TH.frances.svg'},
    ])
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
        route.replace({ name: 'Home', query: {lang: lg} }).then(() => {
            window.location.reload();
        })
           
    }

</script>

<style>
    .no-scroll {
  overflow: hidden !important;
}
</style>
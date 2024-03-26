import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
    
    // STATE
    const localeCurrent = ref(localStorage.getItem('locale') ?? 'es')
    const availableLocation = ref(['es', 'en', 'fr'])

    // ACTIONS
    function $change (lg) {
        localStorage.setItem('locale', lg)
        // console.log('changeAndReload',localStorage.getItem('locale'))
        i18n.global.locale.value = lg
        localeCurrent.value = lg
    }

    function $load (languageParam = null) {
        // console.log('i18n.global.locale')
        const urlParams = new URLSearchParams(window.location.search)
        let locale = localStorage.getItem('locale') ?? urlParams.get('lang');
        locale = languageParam || locale;
        locale = availableLocation.value.includes(locale) ? locale : 'es';
        $change(locale);
    }

    function $changeAndReload (lg) {
        $change(lg)
        window.location.reload()
    }

    //
    return {
        localeCurrent,
        $change,
        $load,
        $changeAndReload,
    }

})
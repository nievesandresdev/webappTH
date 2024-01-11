import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
    
    // STATE
    const localeCurrent = ref(localStorage.getItem('locale') || 'es')

    // ACTIONS
    function $change (lg) {
        localStorage.setItem('locale', lg)
        i18n.global.locale = lg
        localeCurrent.value = lg
    }

    function $load () {
        const urlParams = new URLSearchParams(window.location.search)
        let locale = urlParams.get('lang') || localeCurrent.value
        $change(locale)
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
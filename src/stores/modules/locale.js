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

    function $loadByUrl () {
        const urlParams = new URLSearchParams(window.location.search)
        const locale = urlParams.get('lang')
        if (!locale) return
        localStorage.setItem('locale', locale)
        i18n.global.locale = locale
        localeCurrent.value = locale
        // window.location.reload()
    }

    function $changeAndReload (lg) {
        $change(lg)
        window.location.reload()
    }

    //
    return {
        localeCurrent,
        $change,
        $loadByUrl,
        $changeAndReload,
    }

})
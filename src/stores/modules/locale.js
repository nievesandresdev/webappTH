import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllApi,
} from '@/api/services/language.services'

export const useLocaleStore = defineStore('locale', () => {
    
    // STATE
    const localeCurrent = ref(localStorage.getItem('locale') ?? 'es')
    const availableLocation = ref(['es', 'en', 'fr'])

    async function $apiGetAll () {
        const response = await getAllApi()
        const { ok, data } = response
        if (ok) {
            return availableLocation.value = data
        }
        return [];     
    }

    // ACTIONS
    function $change (lg) {
        localStorage.setItem('locale', lg)
        // console.log('changeAndReload',localStorage.getItem('locale'))
        i18n.global.locale.value = lg
        localeCurrent.value = lg
    }

    function $load (languageParam = null) {
        // console.log('i18n.global.locale')
        const urlParams = new URLSearchParams(window.location.search);
        let locale = urlParams.get('lang') || languageParam || localStorage.getItem('locale');
        $change(locale);
        return locale;
    }

    function $changeAndReload (lg) {
        $change(lg)
        window.location.reload()
    }

    //
    return {
        $apiGetAll,
        localeCurrent,
        $change,
        $load,
        $changeAndReload,
        availableLocation,
    }

})
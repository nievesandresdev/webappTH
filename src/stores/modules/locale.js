import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllApi,
    getForItemApi
} from '@/api/services/language.services'

export const useLocaleStore = defineStore('locale', () => {
    
    // STATE
    const localeCurrent = ref(localStorage.getItem('locale') ?? 'es')
    const availableLocation = ref(['es', 'en', 'fr','it','de','pt','ca','eu','gl','nl'])
    const dropdownLangs = ref([])
    const availableLocationNotSelected = ref(availableLocation.value.filter(item => item !== localeCurrent.value))

    async function $apiGetAll () {
        const response = await getAllApi()
        const { ok, data } = response
        if (ok) {
            return availableLocation.value = data
        }
        return [];     
    }

    async function $apiGetAllForItem () {
        let params = { 
            languages: availableLocation.value,
            selected : localeCurrent.value
        };
        const response = await getForItemApi(params)
        const { ok, data } = response
        if (ok) {
            // return availableLocation.value = data
            dropdownLangs.value = data;
            return data
        }
        return [];     
    }

    // ACTIONS
    function $change (lg) {
        localStorage.setItem('locale', lg)
        let guestData = JSON.parse(localStorage.getItem('guestData'));
        //solo se actualiza la data en caso de que existe la sesison
        if(guestData){
            guestData.lang_web = lg; 
            localStorage.setItem('guestData', JSON.stringify(guestData));
        }
        i18n.global.locale.value = lg
        localeCurrent.value = lg
        $apiGetAllForItem()

    }

    function $load (languageParam = null) {
        
        const urlParams = new URLSearchParams(window.location.search);
        let locale = urlParams.get('lang') || languageParam || localStorage.getItem('locale');
        $change(locale);
        return locale;
    }

    function $changeAndReload (lg) {
        $change(lg)
        window.location.reload()
    }

    function $loadByURL (languageParam = null) {
        
        const urlParams = new URLSearchParams(window.location.search);
        let locale = urlParams.get('lang') || languageParam;
        if(locale){
            localStorage.setItem('locale', locale)
            i18n.global.locale.value = locale
            localeCurrent.value = locale
            return locale;   
        }
    }

    //
    return {
        $apiGetAll,
        localeCurrent,
        $apiGetAllForItem,
        $change,
        $load,
        $changeAndReload,
        availableLocation,
        dropdownLangs,
        $loadByURL
    }

})
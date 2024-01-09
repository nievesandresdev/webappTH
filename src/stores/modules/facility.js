import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

export const useFacilityStore = defineStore('facility', () => {
    
    // STATE

    // ACTIONS
    function $loadImage (path) {
        let { URL_STORAGE } = mainStore
        let url = `${URL_STORAGE}/storage/facility/${path}`
        return url
    }

    //
    return {
        $loadImage,
    }

})
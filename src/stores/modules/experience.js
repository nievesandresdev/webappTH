import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllApi,
} from '@/api/services/experiencia.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

export const useExperienceStore = defineStore('experience', () => {
    
    // STATE

    // ACTIONS
    function $loadImage (path) {
        let { URL_STORAGE } = mainStore
        let url = `${URL_STORAGE}/storage/places/${path}`
        return url
    }

    async function $apiGetAll (params) {
        const response = await getAllApi(params)
        console.log(response, 'response')
        return response
    }

    //
    return {
        $apiGetAll,
    }

})
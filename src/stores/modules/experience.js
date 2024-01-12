import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllApi,
    getNumbersByFiltersApi,
    findBySlugApi,
    findInVIatorByShortIdApi,
    findSchedulesInVIatorApi,
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
        // console.log(response, 'response')
        return response
    }
    
    async function $apiGetNumbersByFilters (params) {
        const response = await getNumbersByFiltersApi(params)
        // console.log(response, 'response')
        return response
    }

    async function $apiFindBySlug (params) {
        const response = await findBySlugApi(params)
        return response
    }

    async function $apiFindInVIatorByShortId (params) {
        const response = await findInVIatorByShortIdApi(params)
        return response
    }

    async function $apiFindSchedulesInVIator (params) {
        const response = await findSchedulesInVIatorApi(params)
        // console.log(response, 'response')
        return response
    }

    //
    return {
        $apiGetAll,
        $apiGetNumbersByFilters,
        $apiFindBySlug,
        $apiFindInVIatorByShortId,
        $apiFindSchedulesInVIator,
    }

})
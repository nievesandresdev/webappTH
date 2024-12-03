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

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

export const useExperienceStore = defineStore('experience', () => {
    
    // STATE

    // ACTIONS

    function getHotelParams(params = {}) {
        const { id: idHotel, name: nameHotel, zone: zoneHotel } = hotelStore.hotelData;
        return {
            hotel: { id: idHotel, name: nameHotel, zone: zoneHotel },
            ...params
        };
    }

    function $loadImage (path) {
        let { URL_STORAGE } = mainStore
        let url = `${URL_STORAGE}/storage/experiences/${path}`
        return url
    }

    async function $apiGetAll (params) {
        let newParams = getHotelParams(params);
        const response = await getAllApi(newParams)
        // console.log(response, 'response')
        return response
    }
    
    async function $apiGetNumbersByFilters (params) {
        let newParams = getHotelParams(params);
        const response = await getNumbersByFiltersApi(newParams)
        // console.log(response, 'response')
        return response
    }

    async function $apiFindBySlug (params) {
        let newParams = getHotelParams(params);
        const response = await findBySlugApi(newParams)
        return response
    }

    async function $apiFindInVIatorByShortId (params) {
        let newParams = getHotelParams(params);
        const response = await findInVIatorByShortIdApi(newParams)
        return response
    }

    async function $apiFindSchedulesInVIator (params) {
        let newParams = getHotelParams(params);
        const response = await findSchedulesInVIatorApi(newParams)
        // console.log(response, 'response')
        return response
    }

    //
    return {
        $loadImage,
        $apiGetAll,
        $apiGetNumbersByFilters,
        $apiFindBySlug,
        $apiFindInVIatorByShortId,
        $apiFindSchedulesInVIator,
    }

})
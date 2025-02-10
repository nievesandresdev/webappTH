import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
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
    const dataFilter = {
        duration: [],
        score: [],
        price_min: null,
        price_max: null,
        search:null,
        city: null,
        all_cities: false,
        free_cancelation: false,
        featured: false,
    }
    const dataFilterGlobal = reactive(JSON.parse(JSON.stringify(dataFilter)));

    const hotelData = computed(() => {
        return hotelStore.hotelData ?? null;
    });

    // MUTATIONS
    function setDataFilterList (dataFormFilterInList) {
        Object.assign(dataFilterGlobal, dataFormFilterInList);
    }

    // ACTIONS

    function getHotelParams(params = {}) {
        const { id: idHotel, name: nameHotel, zone: zoneHotel, city_id: cityId } = hotelData.value;
        return {
            hotel: { id: idHotel, name: nameHotel, zone: cityId },
            ...params
        };
    }

    function $loadImage (item) {
        let { URL_STORAGE } = mainStore
        let { image: path, type, url, api } = item ?? {};
        if (api) {
            return url;
        }
        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/places/${item?.image}`;
    }
    // function formatImage (item) {
    //     let { image: path, type, url, api } = item ?? {};
    //     if (api) {
    //         return url;
    //     }
    //     if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
    //     return `${URL_STORAGE}/storage/places/${item?.image}`;
    // }

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
        dataFilterGlobal,
        setDataFilterList,
        $loadImage,
        $apiGetAll,
        $apiGetNumbersByFilters,
        $apiFindBySlug,
        $apiFindInVIatorByShortId,
        $apiFindSchedulesInVIator,
    }

})
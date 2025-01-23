import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllConforApi,
    getAllTransportApi,
} from '@/api/services/service.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

export const useServiceStore = defineStore('service', () => {
    
    // STATE
    const dataFilter = {
        price_min: null,
        price_max: null,
        search: null,
        type: 'CONFORT',
    }
    const dataFilterGlobal = reactive(JSON.parse(JSON.stringify(dataFilter)));

        // MUTATIONS
        function setDataFilterList (dataFormFilterInList) {
            Object.assign(dataFilterGlobal, dataFormFilterInList);
        }

    // ACTIONS
    function $loadImage (item,custom = null) {
        let { image: path, type, url } = item ?? {};
        let { URL_STORAGE } = mainStore;
        
        // let model = 'places';
        // if(type == "gallery" || url?.includes('storage')) model = 'gallery'; 

        // let urlFull = `${URL_STORAGE}/storage/${model}/${path}`
        // return urlFull

        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/confort/${path}`;

    }

    function getHotelParams(params = {}) {
        const { id: idHotel, name: nameHotel, zone: zoneHotel } = hotelStore.hotelData;
        return {
            hotel: { id: idHotel, name: nameHotel, zone: zoneHotel },
            ...params
        };
    }

    async function $apiDetAllConforApi (params) {
        let newParams = getHotelParams(params);
        const response = await getAllConforApi(newParams)
        // console.log(response, 'response')
        return response
    }
    async function $apiDetAllTransportApi (params) {
        let newParams = getHotelParams(params);
        const response = await getAllTransportApi(newParams)
        // console.log(response, 'response')
        return response
    }

    //
    return {
        dataFilterGlobal,
        setDataFilterList,
        $apiDetAllConforApi,
        $apiDetAllTransportApi,
        $loadImage,
    }

})
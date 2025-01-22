import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllConforApi,
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

    //
    return {
        dataFilterGlobal,
        setDataFilterList,
        $apiDetAllConforApi,
    }

})
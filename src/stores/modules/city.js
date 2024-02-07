import { defineStore } from 'pinia'

import {
    getAllApi,
} from '@/api/services/city.services'

export const useCityStore = defineStore('city', () => {
    
    // STATE

    // ACTIONS
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
import { defineStore } from 'pinia'

import {
    getAllApi,
    getNearCitiesDataApi
} from '@/api/services/city.services'

export const useCityStore = defineStore('city', () => {
    
    // STATE

    // ACTIONS
    async function $apiGetAll (params) {
        const response = await getAllApi(params)
        console.log(response, 'response')
        return response
    }

    async function $getNearCitiesData (params) {
        const response = await getNearCitiesDataApi(params)
        console.log(response, 'response')
        return response
    }

    //
    return {
        $apiGetAll,
        $getNearCitiesData
    }

})
import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getCurrentPeriodApi,
    getRecentlySortedResponsesApi,
    firstOrCreateApi,
    saveResponseApi
} from '@/api/services/query.services'

export const useQueryStore = defineStore('query', () => {
    
    // STATE

    // ACTIONS
    async function $getCurrentPeriod (data) {

        const response = await getCurrentPeriodApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getRecentlySortedResponses (data) {

        const response = await getRecentlySortedResponsesApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $firstOrCreate (params) {

        const response = await firstOrCreateApi(params)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $saveResponse (params) {

        const response = await saveResponseApi(params)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    //
    return {
        $getCurrentPeriod,
        $getRecentlySortedResponses,
        $firstOrCreate,
        $saveResponse
    }

})
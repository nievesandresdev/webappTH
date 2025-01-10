import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    getRequestDataApi
} from '@/api/services/requestSettings.services'

export const useRequestSettingStore = defineStore('requestSettings', () => {
    
    // STATE

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getRequestData (period) {
        let data = { period };
        const response = await getRequestDataApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    //
    return {
        $getAll,
        $getRequestData
    }

})
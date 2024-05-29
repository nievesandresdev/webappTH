import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    getPostStayRequestDataApi
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

    async function $getPostStayRequestData () {

        const response = await getPostStayRequestDataApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    //
    return {
        $getAll,
        $getPostStayRequestData
    }

})
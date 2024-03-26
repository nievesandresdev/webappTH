import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
} from '@/api/services/querySettings.services'

export const useQuerySettingsStore = defineStore('querySettings', () => {
    
    // STATE

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }



    //
    return {
        $getAll,
    }

})
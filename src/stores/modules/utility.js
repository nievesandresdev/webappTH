import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getExpAndPlaceBySaearchApi,
} from '@/api/services/utility.services'

export const useUtilityStore = defineStore('utility', () => {
    
    // STATE

    // ACTIONS

    async function $apiGetExpAndPlaceBySaearch (data) {

        const response = await getExpAndPlaceBySaearchApi(data)
        // console.log(response, 'search res')
        return response
         
    }



    //
    return {
        $apiGetExpAndPlaceBySaearch,
    }

})
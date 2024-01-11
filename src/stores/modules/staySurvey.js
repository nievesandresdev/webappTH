import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    storeApi,
} from '@/api/services/staySurvey.services'

export const useStaySurveyStore = defineStore('staySurvey', () => {
    
    // STATE

    // ACTIONS

    async function $store (data) {

        const response = await storeApi(data)
        console.log(response, 'survey res')
        return response
         
    }



    //
    return {
        $store,
    }

})
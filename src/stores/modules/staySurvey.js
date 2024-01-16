import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    storeApi,
    findByParamsApi,
} from '@/api/services/staySurvey.services'

export const useStaySurveyStore = defineStore('staySurvey', () => {
    
    // STATE
    const surveyData = ref(null)

    // ACTIONS

    async function $findByParams (data) {
        const response = await findByParamsApi(data)
        if (response.ok) {
            surveyData.value = response.data
        }
        return response
         
    }
    async function $store (data) {

        const response = await storeApi(data)
        if (response.ok) {
            surveyData.value = response.data
        }
        return response
         
    }



    //
    return {
        surveyData,
        $store,
        $findByParams,
    }

})
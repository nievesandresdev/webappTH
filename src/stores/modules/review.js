import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getHotelDetailApi,
    getDataOTASApi
} from '@/api/services/reviews.services'


export const useReviewStore = defineStore('review', () => {
    const URL_BASE_BACKEND_REVIEW = process.env.VUE_APP_API_URL_REVIEW
        
    // STATE

    // ACTIONS
    async function $getHotelDetail (params) {
        
        const response = await getHotelDetailApi(params)
        
        if(response.ok) return response.data
        return []
    }

    async function $getDataOTAS (params) {
        
        const response = await getDataOTASApi(params)
        if(response.ok) return response.data
        return []
    }

    //
    return {
        $getHotelDetail,
        $getDataOTAS,
    }

})
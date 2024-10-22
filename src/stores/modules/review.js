import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getHotelDetailApi,
    getDataOTASApi
} from '@/api/services/reviews.services'


export const useReviewStore = defineStore('review', () => {
    
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
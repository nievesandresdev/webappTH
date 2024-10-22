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
        console.log('getHotelDetail ',response)
        // if(response.ok) return response.data
        // return []
    }

    async function $getDataOTAS (params) {
        const response = await getDataOTASApi(params)
        console.log('getDataOTAS ',response)
        // if(response.ok) return response.data
        // return []
    }

    //
    return {
        $getHotelDetail,
        $getDataOTAS,
    }

})
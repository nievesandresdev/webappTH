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
        console.log('test getHotelDetail params',params)
        const response = await getHotelDetailApi(params)
        console.log('test getHotelDetail',response)
        if(response.ok) return response.data
        return []
    }

    async function $getDataOTAS (params) {
        console.log('test getDataOTAS params',params)
        const response = await getDataOTASApi(params)
        console.log('test getDataOTAS',response)
        if(response.ok) return response.data
        return []
    }

    //
    return {
        $getHotelDetail,
        $getDataOTAS,
    }

})
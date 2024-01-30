import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
} from '@/api/services/hotelOta.services'

export const useHotelOtaStore = defineStore('hotelOta', () => {
    
    // STATE
    const hotelOtasData = ref([])

    // ACTIONS

    async function $getAll () {

        const response = await getAllApi()
        const { ok, data } = response
        if (ok) {
            return data
        }
        return;       
         
    }



    //
    return {
        hotelOtasData,
        $getAll,
    }

})
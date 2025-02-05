// getGeneralApi
import { defineStore } from 'pinia'

import {
    getNormsByHotelApi
} from '@/api/services/legal.services'

export const useLegalStore = defineStore('legal', () => {
    
    // STATE

    // ACTIONS
    async function $getNormsByHotel () {
        const response = await getNormsByHotelApi()
        const { ok } = response   
        return ok ? response.data : [];
    }

    //
    return {
        $getNormsByHotel
    }

})
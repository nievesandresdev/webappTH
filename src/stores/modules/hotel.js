import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    findByParamsApi,
    getCrossellingsApi,
} from '@/api/services/hotel.services'

export const useHotelStore = defineStore('hotel', () => {
    
    // STATE
    const hotelData = ref(null)
    const subdomain = ref(localStorage.getItem('subdomain') || null)

    // ACTIONS

    async function $load () {
        if (hotelData.value) return
        
        let params = {
            subdomain: subdomain.value,
        }
        const response = await findByParamsApi(params)
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $getCrossellings () {

        const response = await getCrossellingsApi()
        const { ok, data } = response
        if (ok) {
            return data
        }
        return;        
    }



    //
    return {
        hotelData,
        subdomain,
        $load,
        $getCrossellings,
    }

})
import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    findByParamsApi,
} from '@/api/services'

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
        console.log(response.ok)
        return response.data
    }

    //
    return {
        hotelData,
        subdomain,
        $load,
    }

})
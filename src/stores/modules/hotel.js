import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    findByParamsApi,
} from '@/api/services'

export const useHotelStore = defineStore('hotel', () => {
    
    // STATE
    const hotelData = ref(null)

    // ACTIONS
    async function $load () {
        if (hotelData.value) return
        const urlParams = new URLSearchParams(window.location.search)
        const subdomain = urlParams.get('subdomain')
        let params = {
            subdomain,
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
        $load,
    }

})
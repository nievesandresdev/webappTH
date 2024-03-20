import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    findByParamsApi,
    getCrossellingsApi,
} from '@/api/services/hotel.services'

// import { useMainStore } from '@/stores'
// const mainStore = useMainStore()

export const useHotelStore = defineStore('hotel', () => {
    
    // STATE
    const hotelData = ref(null)
    const subdomain = ref(localStorage.getItem('subdomain') || null)
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
    // ACTIONS

    function $loadImage (url) {
        if (!url) return;
        let type = url.includes('https://') ? 'CDN' : 'STORAGE';
        console.log(process.env.VUE_APP_STORAGE_URL, 'process.env.VUE_APP_STORAGE_URL')
        url = type != 'CDN' ? `${URL_STORAGE}${url}` : url;
        console.log(url, 'url')
        return url;
    }

    async function $load () {
        if (hotelData.value) return
        
        let params = {
            subdomain: localStorage.getItem('subdomain'),
        }
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await findByParamsApi(params)
        const { ok } = response

        hotelData.value = ok ? response.data : null
        // console.log('hotelData',hotelData.value)
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
        $loadImage,
    }

})
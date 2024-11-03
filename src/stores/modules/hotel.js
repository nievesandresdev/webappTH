import { defineStore } from 'pinia'
import { ref, reactive  } from 'vue'

import {
    findByParamsApi,
    getCrossellingsApi,
    getChatHoursApi,
    findByIdApi,
    buildUrlWebAppApi
} from '@/api/services/hotel.services'

// import { useMainStore } from '@/stores'
// const mainStore = useMainStore()

export const useHotelStore = defineStore('hotel', () => {
    


    // STATE
    const hotelData = ref(null)
    const chatHours = ref(null)
    const subdomain = ref(localStorage.getItem('subdomain') || null)
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
    // ACTIONS

    function $loadImage (url) {
        if (!url) return;
        let type = url.includes('https://') ? 'CDN' : 'STORAGE';
        // console.log(process.env.VUE_APP_STORAGE_URL, 'process.env.VUE_APP_STORAGE_URL')
        url = type != 'CDN' ? `${URL_STORAGE}${url}` : url;
        // console.log(url, 'url')
        return url;
    }

    async function $load () {
        if (hotelData.value || !localStorage.getItem('subdomain')) return
        
        let params = {
            subdomain: localStorage.getItem('subdomain'),
        }
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
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

    async function $loadChatHours () {
        const response = await getChatHoursApi()
        // console.log('chatHoursResponse',response)
        const { ok, data } = response
        chatHours.value = ok ? response.data : null
        // console.log('chatHoursloadChatHours',chatHours.value)
        return response.data
    }

    async function $findByIdApi (id) {
        const response = await findByIdApi(id)
        return response
    }

    async function $setAndLoadLocalHotel (subdomainString) {
        localStorage.setItem('subdomain',subdomainString)
        subdomain.value = subdomainString;
        $load()
    }

    function $deleteLocalHotel () {
        localStorage.removeItem('subdomain',subdomain)
        subdomain.value = null;
        hotelData.value = null;
    }
    
    async function $buildUrlWebApp (slugHotel, uri, paramsString) {
        let params = {slugHotel, uri, paramsString}
        const response = await buildUrlWebAppApi(params)
        console.log('test buildUrlWebApp',response)
        return response.ok ? response.data : null;
    }

    //
    return {
        hotelData,
        chatHours,
        subdomain,
        $load,
        $getCrossellings,
        $loadImage,
        $loadChatHours,
        $findByIdApi,
        $setAndLoadLocalHotel,
        $deleteLocalHotel,
        $buildUrlWebApp
    }

})
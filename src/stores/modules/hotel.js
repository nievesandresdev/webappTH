import { defineStore } from 'pinia'
import { ref, reactive  } from 'vue'

import {
    findByParamsApi,
    getCrossellingsApi,
    getChatHoursApi,
    findByIdApi,
    buildUrlWebAppApi
} from '@/api/services/hotel.services'

 import { useMainStore } from '@/stores'
 

export const useHotelStore = defineStore('hotel', () => {
    


    // STATE
    const hotelData = ref(null)
    const chatHours = ref(null)
    const subdomain = ref(localStorage.getItem('subdomain') || null)
    const oldSubdomain = ref(null)
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
    const mainStore = useMainStore()
    // ACTIONS

    function $loadImage (item) {
        let { image: path, type, url } = item ?? {};
        let { URL_STORAGE } = mainStore;
        
        // let model = 'places';
        // if(type == "gallery" || url?.includes('storage')) model = 'gallery'; 

        // let urlFull = `${URL_STORAGE}/storage/${model}/${path}`
        // return urlFull

        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/places/${path}`;

    }

    async function $load (reload = false) {
        if ( (hotelData.value || !localStorage.getItem('subdomain')) && !reload) return
        let params = {
            subdomain: localStorage.getItem('subdomain'),
        }
        
        const response = await findByParamsApi(params)
        // console.log('test response',response)
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
        // console.log('test chatHoursResponse',response)
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
        // console.log('test',subdomain.value)
        $load(true)//reload
    }

    async function $setOldLocalHotel (subdomainString) {
        localStorage.setItem('OldHotelSubdomain',subdomainString)
        oldSubdomain.value = subdomainString;
    }

    async function $deleteLocalHotel () {
        localStorage.removeItem('subdomain')
        subdomain.value = null;
        hotelData.value = null;
    }

    async function $deleteOldLocalHotel () {
        localStorage.removeItem('OldHotelSubdomain')
        oldSubdomain.value = null;
    }


    async function $changeCurrentHotelData (newHotelId, newsubdomain) {
        if(newHotelId == hotelData.value.id) return;
        await $deleteLocalHotel();
        $setAndLoadLocalHotel(newsubdomain)
    }
    
    async function $buildUrlWebApp (slugHotel, uri, paramsString) {
        let params = {slugHotel, uri, paramsString}
        const response = await buildUrlWebAppApi(params)
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
        $buildUrlWebApp,
        $changeCurrentHotelData,
        $setOldLocalHotel,
        $deleteOldLocalHotel,
        oldSubdomain
    }

})
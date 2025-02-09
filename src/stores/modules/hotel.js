import { defineStore } from 'pinia'
import { ref, reactive, computed  } from 'vue'
import router from '@/router'
import {
    findByParamsApi,
    getCrossellingsApi,
    getChatHoursApi,
    findByIdApi,
    buildUrlWebAppApi,
    getRewardsByHotel
} from '@/api/services/hotel.services'


 import { useMainStore } from '@/stores'
 import { useAuthStore } from '@/stores/modules/auth';
 
 

export const useHotelStore = defineStore('hotel', () => {

    // STATE
    const hotelData = ref(null)
    const chatHours = ref(null)
    const subdomain = ref(localStorage.getItem('subdomain') || null)
    const oldSubdomain = ref(null)
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL
    const mainStore = useMainStore()
    const authStore = useAuthStore()
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

    /* async function $load (reload = false, routeInfo = null) {
        
        let noHotelIfSubdomain = !Boolean(hotelData.value) && !!localStorage.getItem('subdomain');
        let reloadAndSubdomain  = reload && !!localStorage.getItem('subdomain');

        if ( noHotelIfSubdomain || reloadAndSubdomain){
            let params = {
                subdomain: localStorage.getItem('subdomain'),
            }
            const response = await findByParamsApi(params)
            const { ok } = response
            hotelData.value = ok ? response.data : null
            // console.log('test hotel',hotelData.value)
        }
        
        authStore.$validateSession(routeInfo);
        return hotelData.value;
        
    } */

    async function $load (reload = false, routeInfo = null) {
        let noHotelIfSubdomain = !Boolean(hotelData.value) && !!localStorage.getItem('subdomain');
        let reloadAndSubdomain  = reload && !!localStorage.getItem('subdomain');
    
        if (noHotelIfSubdomain || reloadAndSubdomain) {
            let params = {
                subdomain: localStorage.getItem('subdomain'),
            }
            const response = await findByParamsApi(params);
            console.log('test se cargo el hotel', hotelData.value?.name);
            const { ok } = response;
            
            if (ok && response.data) {
                hotelData.value = response.data;
    
                // Verificamos que hotelData.value tenga los datos esperados antes de almacenarlos
                if (hotelData.value && hotelData.value.id) {
                    localStorage.setItem('hotelId', hotelData.value.id);
                    localStorage.setItem('hotelData', JSON.stringify(hotelData.value));
                }
            } else {
                hotelData.value = null; // Si no se obtuvo datos, aseguramos que sea null
            }
        }
    
        authStore.$validateSession(routeInfo);
        return hotelData.value;
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
        await $load(true)//reload
    }

    async function $setOldLocalHotel (subdomainString) {
        localStorage.setItem('OldHotelSubdomain',subdomainString)
        oldSubdomain.value = subdomainString;
    }

    async function $deleteLocalHotel () {
        console.log('test deleteLocalHotel');
        localStorage.removeItem('subdomain')
        subdomain.value = null;
        hotelData.value = null;
    }

    async function $deleteOldLocalHotel () {
        localStorage.removeItem('OldHotelSubdomain')
        oldSubdomain.value = null;
    }

    async function $getRewardsByHotel (id) {
        const response = await getRewardsByHotel(id)
        return response
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
    const hotelDataComputed = computed(() => {
        return hotelData.value
    });
    
    return {
        hotelData:hotelDataComputed,
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
        oldSubdomain,
        $getRewardsByHotel
    }


})
import { defineStore } from 'pinia'
import { ref, reactive, computed  } from 'vue'
import router from '@/router'
import {
    findByParamsApi,
    getCrossellingsApi,
    getChatHoursApi,
    findByIdApi,
    buildUrlWebAppApi,
    getRewardsByHotel,
    getMainDataApi,
    getDataLegalpi,
    getAllWifiHotel,
    getAllByHotelAndVisible,
    getActiveHotelButtons,
    getOrderSectionsApi
} from '@/api/services/hotel.services'


 import { useMainStore } from '@/stores'
 import { useAuthStore } from '@/stores/modules/auth';
 
 

export const useHotelStore = defineStore('hotel', () => {

    // STATE
    const hotelData = ref(null)
    const hotelDataStorage = ref(localStorage.getItem('hotelData') ? JSON.parse(localStorage.getItem('hotelData')) : null)
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

    async function $load (reload = false, routeInfo = null) {
        let noHotelIfSubdomain = !Boolean(hotelData.value) && !!localStorage.getItem('subdomain');
        let reloadAndSubdomain  = reload && !!localStorage.getItem('subdomain');
        // console.log('test vallocalsubdomain',!!localStorage.getItem('subdomain'));
        // console.log('test reloadAndSubdomain',reloadAndSubdomain);
        if (noHotelIfSubdomain || reloadAndSubdomain) {
            let params = {
                subdomain: localStorage.getItem('subdomain'),
            }
            const response = await getMainDataApi(params);
            // console.log('test se cargo el hotel', response.data);
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
        // console.log('test subdomain',subdomain.value)
        await $load(true)//reload
    }

    async function $setOldLocalHotel (subdomainString) {
        localStorage.setItem('OldHotelSubdomain',subdomainString)
        oldSubdomain.value = subdomainString;
    }

    async function $deleteLocalHotel () {
        // console.log('test deleteLocalHotel');
        localStorage.removeItem('subdomain')
        localStorage.removeItem('hotelData')
        localStorage.removeItem('hotelId')
        subdomain.value = null;
        hotelData.value = null;
        hotelDataStorage.value = null;
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
        if(newHotelId == hotelDataStorage.value.id) return;
        await $deleteLocalHotel();
        $setAndLoadLocalHotel(newsubdomain)
    }
    
    async function $buildUrlWebApp (slugHotel, uri, paramsString) {
        let params = {slugHotel, uri, paramsString}
        const response = await buildUrlWebAppApi(params)
        return response.ok ? response.data : null;
    }
    const hotelDataComputed = computed(() => {
        localStorage.setItem('hotelData', JSON.stringify(hotelData.value));
        hotelDataStorage.value = hotelData.value;
        return hotelData.value
    });

    async function $findByParamsApi (id) {
        let params ={id} 
        const response = await findByParamsApi(params)
        return response.data
    }

    async function $getDataLegal () {
        const response = await getDataLegalpi()
        const { ok } = response
        return ok ? response.data : {}
    }
    
    async function $getAllWifiHotel () {
        const response = await getAllWifiHotel()
        return response
    }

    async function $getAllWifiByHotelAndVisible () {
        const response = await getAllByHotelAndVisible()
        return response
    }

    async function $getActiveHotelButtons () {
        const response = await getActiveHotelButtons()
        if(response.ok) {
            return response.data
        }
        return null
    }

    async function $getOrderSections () {
        const response = await getOrderSectionsApi()
        return response
    }

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
        $getRewardsByHotel,
        $findByParamsApi,
        hotelDataStorage,
        $getDataLegal,
        $getAllWifiHotel,
        $getAllWifiByHotelAndVisible,
        $getActiveHotelButtons,
        $getOrderSections
    }


})
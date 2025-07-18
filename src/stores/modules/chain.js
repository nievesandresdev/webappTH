import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUrlParam } from '@/utils/utils.js'
import { useMainStore } from '@/stores'

import {
    getHotelsListApi,
    findBySubdomainApi,
    getCustomatizacionApi,
    getStaysGuestByChainApi
} from '@/api/services/chain.services'

export const useChainStore = defineStore('chain', () => {
    
    const mainStore = useMainStore()
     // STATE
     const chainSubdomain = ref(localStorage.getItem('chainSubdomain') || '');
     const chainData = ref(localStorage.getItem('chainData') || null);
     const customizationData = ref(null);
    // ACTIONS
    async function $getHotelsList(params = {}) {
        const response = await getHotelsListApi(params)
        return response.ok ? response.data : []; 
        
    }

    function $setChainSubdomain(subdomain) {
        if(subdomain){
            chainSubdomain.value = subdomain
            localStorage.setItem('chainSubdomain', subdomain)
        }
        return  subdomain
    }

    async function $goRegisterOrLoginEmail(params) {
        // const response = await registerOrLoginWEmailApi(params)
        // return response.ok ? response.data : null;
    }

    async function $loadChainSubdomain(){
        const ENV = process.env.VUE_APP_ENVIROMENT || 'locale'
        let subdomain = ENV === 'locale' ? extractChainSubdomainToQuery() : extractChainSubdomaintoHost()
        $setChainSubdomain(subdomain)
        return subdomain
    }
    
    const extractChainSubdomainToQuery = () => {
        const chainSubdomain = getUrlParam('chainsubdomain') || null
        return chainSubdomain
    }
    
    const extractChainSubdomaintoHost = () => {
        const hostname = window.location.hostname; // Obtiene el hostname de la URL actual
        const partes = hostname.split('.'); // Divide el hostname en partes separadas por puntos
        const slugHotel = partes[0]; // El slug del hotel es la primera parte
        return slugHotel;
    }

    async function $loadChainData(){
        const response = await findBySubdomainApi()
        await $getCustomatizacion();
        if(response.ok){
            chainData.value = response.data;
            localStorage.setItem('chainData', JSON.stringify(chainData.value))
            return   chainData.value; 
        }
        return null; 
        
        
    }

    async function $getCustomatizacion() {
        
        // if (customizationData.value) return customizationData.value;
        const response = await getCustomatizacionApi([]);
        let customization = response.ok ? response.data : null;
        if (customization) {
            customizationData.value = customization;
        }
        return customizationData.value;
    }

    async function $getStaysGuestByChain (guestId, stayId) { 
        let params = {
            chainId : chainData.value.id,
            guestId,
            stayId
        }
        const response = await getStaysGuestByChainApi(params)
        return response
    }

    function $getUrlLog () {
        if(!customizationData.value?.logo) return null;
        
        let { URL_STORAGE } = mainStore;

        return `${URL_STORAGE}${customizationData.value?.logo}`;

    }
    //

    const $bgColor0 = computed(() => {
        return customizationData.value?.colors[0].cod_hex;
    });

    const $colorContrast0 = computed(() => {
        return customizationData.value?.colors[0].contrast_color;
    });

    const $bgColor1 = computed(() => {
        return customizationData.value?.colors[1].cod_hex;
    });

    const $colorContrast1 = computed(() => {
        return customizationData.value?.colors[1].contrast_color;
    });

    const $name = computed(() => {
        return customizationData.value?.name;
    });

    return {
        chainSubdomain,
        $setChainSubdomain,
        $loadChainSubdomain,
        $goRegisterOrLoginEmail,
        $getHotelsList,
        $loadChainData,
        chainData,
        customizationData,
        $getCustomatizacion,
        $getStaysGuestByChain,
        $bgColor0,
        $colorContrast0,
        $bgColor1,
        $colorContrast1,
        $name,
        $getUrlLog
    }

})
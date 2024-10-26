import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUrlParam } from '@/utils/utils.js'
import {
    getHotelsListApi
} from '@/api/services/chain.services'

export const useChainStore = defineStore('chain', () => {
    
     // STATE
     const chainSubdomain = ref(localStorage.getItem('chainSubdomain') || '')

    // ACTIONS
    async function $getHotelsList() {
        const response = await getHotelsListApi([])
        console.log('test response',response.data)
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

    //
    return {
        chainSubdomain,
        $setChainSubdomain,
        $loadChainSubdomain,
        $goRegisterOrLoginEmail,
        $getHotelsList
    }

})
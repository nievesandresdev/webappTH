import { defineStore } from 'pinia'

import { 
    findByEmailApi
} from '@/api/services/guest.services';

import {
    registerOrLoginWEmailApi,
    updateGuestByIdApi,
    confirmPasswordApi
} from '@/api/services/auth.services'

import { useGuestStore } from '@/stores/modules/guest';



export const useAuthStore = defineStore('auth', () => {
    
    const guestStore = useGuestStore()
    // STATE

    // ACTIONS
    async function $registerOrLogin (params) {
        const currentUrl = window.location.href
        let chainSubdomain = localStorage.getItem('chainSubdomain')
        window.location.href = `${process.env.VUE_APP_API_URL_BACKEND_GENERAL}/guest/auth/google?redirect=${encodeURIComponent(currentUrl)}&chainSubdomain=${chainSubdomain}&subdomain=${params.subdomain}`
    }

    async function $goRegisterOrLoginEmail (params) {
        // const response = await registerOrLoginWEmailApi(params)
        return response.ok ? response.data : null;
    }

    async function $updateGuestById (params) {
        const response = await updateGuestByIdApi(params)
        return response.ok ? response.data : null;
    }

    async function $sendPasswordAndLogin (params) {
        const response = await confirmPasswordApi(params)
        if(response.ok && response.data){
            guestStore.setLocalGuest(response.data)
            return response.data;
        }
        return null
    }

    //
    return {
        $registerOrLogin,
        $updateGuestById,
        $sendPasswordAndLogin
    }

})
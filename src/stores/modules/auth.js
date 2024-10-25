import { defineStore } from 'pinia'

import {
    registerOrLoginWEmailApi
} from '@/api/services/auth.services'

export const useAuthStore = defineStore('auth', () => {
    
    // STATE

    // ACTIONS
    async function $registerOrLogin (params) {
        const currentUrl = window.location.href
        window.location.href = `${process.env.VUE_APP_API_URL_BACKEND_GENERAL}/guest/auth/google?redirect=${encodeURIComponent(currentUrl)}`
    }

    async function $goRegisterOrLoginEmail (params) {
        // const response = await registerOrLoginWEmailApi(params)
        return response.ok ? response.data : null;
    }

    //
    return {
        $registerOrLogin
    }

})
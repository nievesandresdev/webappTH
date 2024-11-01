import { defineStore } from 'pinia'
import { navigateTo } from '@/utils/navigation'
import { 
    findByEmailApi
} from '@/api/services/guest.services';

import {
    registerOrLoginWEmailApi,
    updateGuestByIdApi,
    confirmPasswordApi,
    sendResetLinkEmailApi,
    resetPasswordApi
} from '@/api/services/auth.services'

import { useGuestStore } from '@/stores/modules/guest';
import { useStayStore } from '@/stores/modules/stay';



export const useAuthStore = defineStore('auth', () => {
    
    const guestStore = useGuestStore()
    const stayStore = useStayStore()
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

    async function $sendResetLinkEmail (email) {
        let params = {email}
        const response = await sendResetLinkEmailApi(params)
        return response.ok ? response.data : null;
    }

    async function $resetPassword (token, newPassword) {
        let params = {newPassword , token}
        const response = await resetPasswordApi(params)
        return response.ok ? response.data : null;
    }

    async function $logout (token, newPassword) {
        stayStore.deleteLocalStayData()
        guestStore.deleteLocalGuest()
        navigateTo('Home')
    }

    //
    return {
        $registerOrLogin,
        $updateGuestById,
        $sendPasswordAndLogin,
        $sendResetLinkEmail,
        $resetPassword,
        $logout
    }

})
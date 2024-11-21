import { defineStore } from 'pinia'
import { navigateTo } from '@/utils/navigation'
import router from '@/router'
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
import { useChainStore } from '@/stores/modules/chain';
import { useHotelStore } from '@/stores/modules/hotel';



export const useAuthStore = defineStore('auth', () => {
    
    const guestStore = useGuestStore()
    const stayStore = useStayStore()
    const chainStore = useChainStore()
    const hotelStore = useHotelStore()
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

    async function $logoutAndCreateStay () {

        stayStore.deleteLocalStayData()
        const chainType = chainStore?.chainData?.type;
        // Determinar la ruta de redirección basada en el tipo de cadena
        if(chainType === 'INDEPENDENT'){
            navigateTo('Home',{},{ acform : 'createstay' })
        }else{
            router.push({ name:'HotelsList' })
        }
        
    }

    async function $logout () {
        stayStore.deleteLocalStayData()
        guestStore.deleteLocalGuest()
        const chainType = chainStore?.chainData?.type;
        // Determinar la ruta de redirección basada en el tipo de cadena
        if(chainType === 'INDEPENDENT'){
            navigateTo('Home')
        }else{
            await hotelStore.$deleteLocalHotel();
            router.push({ name:'ChainLanding' })
        }
    }

    //
    return {
        $registerOrLogin,
        $updateGuestById,
        $sendPasswordAndLogin,
        $sendResetLinkEmail,
        $resetPassword,
        $logout,
        $logoutAndCreateStay
    }

})
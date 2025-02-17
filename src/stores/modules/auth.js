import { ref } from 'vue'
import { defineStore } from 'pinia'
import { navigateTo } from '@/utils/navigation'
import router from '@/router'
import { getUrlParam, isMockup } from '@/utils/utils'
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
import { useHistoryStore } from '@/stores/modules/history';



export const useAuthStore = defineStore('auth', () => {
    
    const guestStore = useGuestStore()
    const stayStore = useStayStore()
    const chainStore = useChainStore()
    const hotelStore = useHotelStore()
    const historyStore = useHistoryStore()
    // STATE
    const sessionActive = ref(false)

    // ACTIONS
    async function $registerOrLoginSN (params) {
        const currentUrl = window.location.href
        let chainSubdomain = localStorage.getItem('chainSubdomain')
        window.location.href = `${process.env.VUE_APP_API_URL_BACKEND_GENERAL}/guest/auth/${params.type}?redirect=${encodeURIComponent(currentUrl)}&chainSubdomain=${chainSubdomain}&subdomain=${params.subdomain}&hotelId=${params.hotelId}`
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
            // console.log('test redirect logoutAndCreateStay1')
            navigateTo('Home',{},{ acform : 'createstay' })
        }else{
            // console.log('test redirect logoutAndCreateStay2')
            router.push({ name:'HotelsList' })
        }
        
    }

    async function $logout () {
        await stayStore.deleteLocalStayData()
        await guestStore.deleteLocalGuest()
        localStorage.removeItem('startedWebappBy')
        const chainType = chainStore?.chainData?.type;
        // Determinar la ruta de redirección basada en el tipo de cadena
        historyStore.$clearHistory();
        if(chainType === 'INDEPENDENT'){
            navigateTo('Home')
        }else{
            await hotelStore.$deleteLocalHotel();
            router.push({ name:'ChainLanding' })
        }
    }

    async function $logIn (email) {
        if(!stayStore?.stayData){
            //aqui entra solo si no hay una estancia cargada antes de culminar registro
            await guestStore.findAndValidLastStayAndLogHotel({
                guestEmail : email, 
                chainId : chainStore.chainData.id, 
                hotelId : hotelStore.hotelData?.id
            })
        }else{
            //aqui entra si ya hay una estancia cargada (viene por url)
            if(Boolean(sessionStorage.getItem('guestPerStay'))){
                let response = await guestStore.createAccessInStay()
                if(response?.stay){
                    //actualizar estancia
                    await stayStore.setStayData(response.stay)
                    await hotelStore.$setAndLoadLocalHotel(response.stay.hotelSubdomain)
                }
            }else{
                //sino elimina la estancia actual para que el huesped tenga que crear una
                await stayStore.deleteLocalStayData()
            }
        }
        //redireccionar segun corresponda
        await $redirectAfterLogin()
    }

    async function $getStatusSession () {
        let guestData = localStorage.getItem('guestData');
        let stayData = localStorage.getItem('stayData');
        let hotelData = localStorage.getItem('stayData');
        let guestDataObj = JSON.parse(guestData);
        let stayDataObj = JSON.stringify(stayData);
        let hotelDataObj = JSON.stringify(hotelData);
        sessionActive.value = 
            Boolean(hotelStore.hotelData) && Boolean(guestStore.guestData) && Boolean(stayStore.stayData) ||
            Boolean(hotelData) && Boolean(guestData) && Boolean(guestDataObj.name) && Boolean(stayData) && hotelDataObj.id == stayDataObj.hotel_id;
        ;    
    }

    async function $validateSession (to = null, next = null) {
        if(isMockup()) return;
        $getStatusSession();
        const viewsIgnored = ['Home','HotelsList','CreateStayFromChain','PrivacyPolicies'];
        if(!to || to && viewsIgnored.includes(to.name)) return; 
        //
        let currentSubdomainHotel = localStorage.getItem('subdomain');
        if(sessionActive.value && to?.name == 'ChainLanding'){
            // console.log('test validateSession 1')
            next({ name: 'Home', params :{ hotelSlug: currentSubdomainHotel }, query: to.query });
        }else{
            let sudmainsChain = chainStore.chainData.hotels_subdomains;
            
            let validSubdomain = sudmainsChain.includes(currentSubdomainHotel);
            //guardo la vista actual para redireccionar luego en el login
            $setStartedWebappBy(to)
            //en caso de que no exista session
            //
            if(!sessionActive.value && to?.name !== 'ChainLanding'){
                if(!isMockup() && validSubdomain){
                    //si hay un subdominio de hotel cargado va a la home
                    // console.log('test validateSession 2',sessionActive.value)
                    next({ name:'Home', params: { hotelSlug: currentSubdomainHotel} })
                }else{
                    // console.log('test validateSession 3',sessionActive.value)
                    next({ name:'ChainLanding' })
                }
            }   
        }
    }

    async function $setStartedWebappBy (to) {
        
        const viewsIgnored = ['ChainLanding'];
        if(viewsIgnored.includes(to.name) || sessionActive.value) return; 
        let startedWebappByRoute = {
            name: to.name,
            params: to.params,
            query: to.query
        };
        localStorage.setItem('startedWebappBy',JSON.stringify(startedWebappByRoute))
    }

    async function $goStartedWebappBy(optional = false) {
        if(isMockup()) return;
        const route =  JSON.parse(localStorage.getItem('startedWebappBy'));
        if(route?.name){
            localStorage.removeItem('startedWebappBy')
            // console.log('test goStartedWebappBy 1',route.name)
            router.push({ name: route.name, params: route.params, query: route.query })
        }else{
            if(optional) return
            // console.log('test goStartedWebappBy 2')
            router.push({ name:'Home', params: { hotelSlug: hotelStore.hotelData.subdomain} })
        }
    }

    async function $redirectAfterLogin() {
        //
        //limpiar
        // localStorage.removeItem('guestPerStay')
        sessionStorage.removeItem('guestPerStay')
        if(stayStore.stayData){
            await $goStartedWebappBy();
        }else{
            if(hotelStore.hotelData){
                // console.log('test redirectAfterLogin 1')
                navigateTo('Home',{},{ acform : 'createstay' })
            }else{
                //logica para cuando no se halla cargado un hotel
                // console.log('test redirectAfterLogin 2')
                router.push({ name:'HotelsList' })
            }
        }
    }

    async function $goLoginBySocialNetwork() {
        const param = getUrlParam('action')
        if(param == 'toLogin'){
            await $goStartedWebappBy(true)
        }
    }

    async function $validateStayGuestRelation() {
        console.log('test guestData',guestStore.guestData)
        if(stayStore.stayData && guestStore.guestData && guestStore.guestData.name){
            console.log('test staydata',stayStore.stayData)
            //ids de huespedes registrados en la estancia
            let guestsIds = stayStore.stayData.guestsIds;
            console.log('test guestsIds',guestsIds)
            let validGuest = guestsIds.includes(guestStore.guestData.id);
            console.log('test guestsIds',guestsIds)
            if(!validGuest){
                console.log('test delete data guest');
                guestStore.deleteLocalGuest();
            }
        }
    }

    return {
        $registerOrLoginSN,
        $updateGuestById,
        $sendPasswordAndLogin,
        $sendResetLinkEmail,
        $resetPassword,
        $logout,
        $logoutAndCreateStay,
        $validateSession,
        sessionActive,
        $goStartedWebappBy,
        $logIn,
        $redirectAfterLogin,
        $goLoginBySocialNetwork,
        $validateStayGuestRelation
    }

})
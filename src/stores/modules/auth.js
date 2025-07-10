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
    resetPasswordApi,
    createTokenSessionByGoogleApi,
    autenticateWithGuestDemoApi,
    createTokenSessionByFacebookApi
} from '@/api/services/auth.services'

import { useGuestStore } from '@/stores/modules/guest';
import { useStayStore } from '@/stores/modules/stay';
import { useChainStore } from '@/stores/modules/chain';
import { useHotelStore } from '@/stores/modules/hotel';
import { useHistoryStore } from '@/stores/modules/history';
import { useQueryStore } from '@/stores/modules/query';


export const useAuthStore = defineStore('auth', () => {
    
    const guestStore = useGuestStore()
    const stayStore = useStayStore()
    const chainStore = useChainStore()
    const hotelStore = useHotelStore()
    const historyStore = useHistoryStore()
    const queryStore = useQueryStore();
    // STATE
    const sessionActive = ref(false)
    const token = ref(localStorage.getItem('token'));

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
        const response = await updateGuestByIdApi(params);
        if (response.ok && response.data){
            localStorage.setItem('token', response.data?.token);
            return response.data?.guest;
        }
        return null;
    }

    async function $sendPasswordAndLogin (params) {

        const response = await confirmPasswordApi(params)
        if(response.ok && response.data){
            // console.log('test response',response.data.token);
            localStorage.setItem('token', response.data?.token);
            // Borrar tutorial para que se muestre al iniciar sesión
            localStorage.removeItem('webapp_tutorial_dismissed')
            guestStore.setLocalGuest(response.data?.guest);
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
        // Borrar tutorial para que se muestre en la próxima sesión
        localStorage.removeItem('webapp_tutorial_dismissed')
        const chainType = chainStore?.chainData?.type;
        // Determinar la ruta de redirección basada en el tipo de cadena
        if(chainType === 'INDEPENDENT'){
            navigateTo('Home',{},{ acform : 'createstay' })
        }else{
            router.push({ name:'HotelsList' })
        }
        
    }

    async function $logout () {
        //el popup debe abrirse para la proxima sesion si amerita
        queryStore.$closeSessionPopUp();
        await stayStore.deleteLocalStayData()
        await guestStore.deleteLocalGuest()
        localStorage.removeItem('startedWebappBy')
        localStorage.removeItem('token')
        // Borrar tutorial para que se muestre en la próxima sesión
        localStorage.removeItem('webapp_tutorial_dismissed')
        const chainType = chainStore?.chainData?.type;
        // Determinar la ruta de redirección basada en el tipo de cadena
        historyStore.$clearHistory();
        if(chainType === 'INDEPENDENT'){
            navigateTo('Home')
        } else {
            await hotelStore.$deleteLocalHotel();
            router.push({ name:'ChainLanding' })
        }
    }

    async function $logIn (email) {
        // Borrar tutorial para que se muestre al iniciar sesión
        localStorage.removeItem('webapp_tutorial_dismissed')
        
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
            Boolean(hotelStore.hotelData) && Boolean(guestStore.guestData) && Boolean(guestStore.guestData.name) && Boolean(stayStore.stayData) ||
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
            console.log('test $validateSession 1')
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
                    console.log('test $validateSession 2')
                    next({ name:'Home', params: { hotelSlug: currentSubdomainHotel} })
                }else{
                    console.log('test $validateSession 3')
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
            console.log('test $goStartedWebappBy 1')
            
            router.push({ name: route.name, params: route.params, query: route.query })
        }else{
            if(optional) return
            console.log('test $goStartedWebappBy 2')
            router.push({ name:'Home', params: { hotelSlug: localStorage.getItem('subdomain')} })
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
                navigateTo('Home',{},{ acform : 'createstay' })
            }else{
                
                //logica para cuando no se halla cargado un hotel
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

    async function $validateStayGuestRelation(next) {
        if(stayStore.stayData && guestStore.guestData && guestStore.guestData.name){
            
            //ids de huespedes registrados en la estancia
            let guestsIds = stayStore.stayData.guestsIds;
            
            let validGuest = guestsIds.includes(guestStore.guestData.id);
            let logFrom = getUrlParam('m')

            if(!validGuest && logFrom !== 'google'){
                guestStore.deleteLocalGuest();
                $newHomeOrChain(next)
            }
        }
    }

    async function $newHomeOrChain(next) {
        
        if(isMockup()) return;
        let subdomainHotel = localStorage.getItem('subdomain');
        if(subdomainHotel){
            console.log('test $newHomeOrChain 1');
            next({ name:'Home', params: { hotelSlug: subdomainHotel} })
        }else{
            console.log('test $newHomeOrChain 2');
            next({ name:'ChainLanding' })
        }
         
    }

    async function $createTokenSessionByGoogle(googleId) {
        let body = {
            googleId,
        }
        const response = await createTokenSessionByGoogleApi(body);
        if (!response?.ok) return;
        return response.data
    }

    async function $createTokenSessionByFacebook(facebookId) {
        let body = {
            facebookId,
        }
        const response = await createTokenSessionByFacebookApi(body);
        if (!response?.ok) return;
        return response.data
    }

    async function $loginByGoogle(guestId, googleId) {  
        const {token, guest } = await $createTokenSessionByGoogle(googleId);
        localStorage.setItem('token', token);
        // Borrar tutorial para que se muestre al iniciar sesión
        localStorage.removeItem('webapp_tutorial_dismissed')
        let localGuest = guestStore.getLocalGuest();
        if(!localGuest || localGuest && Number(localGuest.id) !== Number(guestId)){
            guestStore.setLocalGuest(guest);
        }
    }

    async function $loginByFacebook(guestId, facebookId) {
        const {token, guest } = await $createTokenSessionByFacebook(facebookId);
        localStorage.setItem('token', token);
        // Borrar tutorial para que se muestre al iniciar sesión
        localStorage.removeItem('webapp_tutorial_dismissed')
        let localGuest = guestStore.getLocalGuest();
        if(!localGuest || localGuest && Number(localGuest.id) !== Number(guestId)){
            guestStore.setLocalGuest(guest);
        }
    }

    async function $autenticateWithGuestDemo () {
        try {
            const response = await autenticateWithGuestDemoApi();
            if(response.ok && response.data){
                localStorage.setItem('token', response.data?.token);
            }
        } catch (error) {
            console.log('autenticateWithGuestDemo', error);
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
        $loginByGoogle,
        $redirectAfterLogin,
        $goLoginBySocialNetwork,
        $validateStayGuestRelation,
        $autenticateWithGuestDemo,
        $loginByFacebook
    }

})
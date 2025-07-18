import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { 
    findByIdApi,
    saveOrUpdateApi,
    sendMailToApi,
    updateLanguageApi,
    findByEmailApi,
    findAndValidLastStayApi,
    updatePasswordToApi,
    updateDataGuest,
    createAccessInStayApi,
    deleteGuestOfStayApi,
    saveAndFindValidLastStayApi,
    saveCheckinDataApi,
    deleteCheckinDataApi,
    sendContactEmailApi,
    getContactEmailsByStayIdApi
} from '@/api/services/guest.services';
import { getUrlParam } from '@/utils/utils.js'
import { useStayStore } from '@/stores/modules/stay'
import { useHotelStore } from '@/stores/modules/hotel'
import { useLocaleStore } from '@/stores/modules/locale'
import { useQueryStore } from '@/stores/modules/query';
import { useChainStore } from '@/stores/modules/chain';
import router from '@/router';

export const useGuestStore = defineStore('guest', () => {
    
    // STATE
    const guestData = ref(getLocalGuest());
    const guestId = ref(getUrlParam('g'))
    const stayId = ref(null)
    //stay store
    const queryStore = useQueryStore()
    const hotelStore = useHotelStore()
    const stayStore = useStayStore()
    const chainStore = useChainStore()
    const { stayData } = stayStore
    // LOCALE
    const localeStore = useLocaleStore()

    // COMPUTED
    

    // ACTIONS
    async function loadLocalGuest () {
        guestId.value = getUrlParam('g');
        if(!guestId.value) return null;
    
        if(guestId.value){
            const response = await findByIdApi(guestId.value)
            const { ok } = response   
            if(ok && response.data){
                guestData.value = ok ? response.data : null
                localStorage.setItem('guestId', guestData.value.id)
                localStorage.setItem('guestData', JSON.stringify(response.data))
                localeStore.$load(guestData.value.lang_web)
                await findLastStay(guestData.value.id);
                await queryStore.$existingPendingQuery()
            }else{
                guestData.value = null;
            }
        }
        return guestData.value
    }

    async function findById (guestId) {    
        const response = await findByIdApi(guestId)
        const { ok } = response   
        return ok ? response.data : null;
    }

    async function findByIdInSetLocalGuest (guestId) {    
        const response = await findByIdApi(guestId)
        const { ok } = response   
        guestData.value = ok ? response.data : null;
        if(guestData){
            localStorage.setItem('guestId', guestData.value.id)
            localStorage.setItem('guestData', JSON.stringify(guestData.value))
        }
    }

    async function findByEmail (params) {    
        const response = await findByEmailApi(params)
        const { ok } = response   
        return ok ? response.data : null;
    }

    async function saveOrUpdate (data, reload = false) {
        alert('test')
        const response = await saveOrUpdateApi(data)
        const { ok } = response   
        if(ok && response.data){
            localStorage.setItem('guestId', response.data.id)
            localStorage.setItem('guestData', JSON.stringify(response.data))
            guestData.value = response.data;
            if(guestData.value){
                await findLastStay(guestData.value.id);
                await queryStore.$existingPendingQuery()
                let stayId = localStorage.getItem('stayId')
                if(!stayId && getUrlParam('e')){
                    // console.log('entro para crear estancias url')
                    stayStore.loadLocalStay();
                }
            }
            if(reload){
                window.location.reload();
            }
        }else{
            guestData.value = null;
        }
        return guestData.value
    }

    async function saveOrUpdateByEmail (data) {
        const response = await saveOrUpdateApi(data)
        const { ok } = response   
        if(ok && response.data){
            return response.data
        }
        return null
    }

    async function updateLanguage (lg) {
        if (!guestData.value?.id) return;
        let data = {
            language: lg,
            guest_id: guestData.value.id
        }
        const response = await updateLanguageApi(data)  
        const { ok } = response
        if(ok && response.data){
            // console.log(lg, 'updateLanguage')
            // localeStore.$load(lg)
            // window.location.reload()
        }
    }

    async function findAndValidLastStay (params) {
        const response = await findAndValidLastStayApi(params)
        const { ok } = response
        if(ok){
            return response.data;
        }
        return null
    }

    async function saveAndFindValidLastStay (params) {
        const response = await saveAndFindValidLastStayApi(params)
        // console.log('test response',response)
        const { ok } = response
        if(ok){
            return response.data;
        }
        return null
    }

    async function findAndValidLastStayAndLogHotel (params) {
        const response = await findAndValidLastStayApi(params)
        const { ok } = response
        if(ok && response.data.stay){
            await stayStore.setStayData(response.data.stay,false)
            await hotelStore.$setAndLoadLocalHotel(response.data.stay.hotelSubdomain)
            return response.data
        }
        return null
    }

    async function sendMailTo (params) {
        const response = await sendMailToApi(params)
        const { ok } = response   
        if(ok){
            return response.data
        }
        return false
    }

    function getLocalGuest() {
        let localData = localStorage.getItem('guestData');
        if(!localData) return null;
        return localData ? JSON.parse(localData) : null;
    }

    async function updateLocalGuest() {
        const response = await findByIdApi(guestData.value.id)
        if(response.ok){
            guestData.value = response.data;
            localStorage.getItem('guestData',JSON.stringify(response.data));
        }
    }

    function setLocalGuest(data) {
        guestData.value = data;
        localStorage.setItem('guestId', guestData.value.id)
        localStorage.setItem('guestData', JSON.stringify(data))
        return guestData.value;
    }

    async function deleteLocalGuest() {
        console.log('test deleteLocalGuest')
        guestData.value = null;
        localStorage.removeItem('guestId')
        localStorage.removeItem('guestData')
    }

    
    //
    async function createAccessInStay () {
        let params ={
            stayId: stayStore?.stayData?.id,
            guestId: guestData.value?.id,
            chainId: chainStore.chainData.id
        }
        const response = await createAccessInStayApi(params)
        const { ok } = response   
        if(ok){
            return response.data
        }
        return null
    }

    async function deleteGuestOfStay (guestId) {
        let params = {
            stayId: stayStore?.stayData?.id,
            guestId: guestId,
            chainId: chainStore.chainData.id,
            hotelId: hotelStore.hotelData.id,
        }
        const response = await deleteGuestOfStayApi(params)
        const { ok } = response   
        if(ok){
            await stayStore.reloadLocalStay()
            return response.data
        }
        return false
    }

    const guestDataComputed = computed(() => {
        return guestData.value
    });

    const $updatePassword  = async (data) => {
        const response = await updatePasswordToApi(data)
        
        return response
    }

    const $updateDataGuest = async (data) => {
        const response = await updateDataGuest(data)

        return response
    }

    const $updateLocalGuestData = (responseData) => {
        let guestData = JSON.parse(localStorage.getItem('guestData'));
    
        // Guarda el objeto actualizado en el localStorage
        localStorage.setItem('guestData', JSON.stringify(responseData));
        guestData.value = responseData;
        return guestData.value;
    };
    
    const $saveCheckinData = async (data) => {
        const response = await saveCheckinDataApi(data)
        
        const { ok } = response   
        if(ok){
            if(response.data.id == guestData.value.id){
                setLocalGuest(response.data)
            }
            return response.data
        }
        return false
    }

    const $deleteCheckinData = async (guestId) => {
        const response = await deleteCheckinDataApi({id:guestId})
        
        const { ok } = response   
        if(ok){
            return response.data
        }
        return false
    }

    const $sendContactEmail = async (data) => {
        const response = await sendContactEmailApi(data)
        return response;
    }

    const $getContactEmailsByStayId = async (data) => {
        const response = await getContactEmailsByStayIdApi(data)
        return response;
    }
    

    return {
        guestData:guestDataComputed,
        // loadLocalGuest,
        saveOrUpdate,
        saveOrUpdateByEmail,
        $updatePassword,
        $updateDataGuest,
        updateLanguage,
        sendMailTo,
        getLocalGuest,
        updateLocalGuest,
        findById,
        findByEmail,
        findByIdInSetLocalGuest,
        setLocalGuest,
        findAndValidLastStay,
        deleteLocalGuest,
        $updateLocalGuestData,
        createAccessInStay,
        deleteGuestOfStay,
        saveAndFindValidLastStay,
        findAndValidLastStayAndLogHotel,
        $saveCheckinData,
        $deleteCheckinData,
        $sendContactEmail,
        $getContactEmailsByStayId
    }

})
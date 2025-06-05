import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
    findAndValidAccessApi,
    createAndInviteGuestApi,
    existingStayThenMatchAndInviteApi,
    getGuestsAndSortByCurrentguestIdApi,
    getGuestsAndSortByAccessApi,
    updateStayAndGuestsApi,
    deleteGuestOfStayApi,
    existingThenMatchOrSaveApi,
    existsAndValidateApi,
    findbyIdApi
} from '@/api/services/stay.services';
import { getUrlParam } from '@/utils/utils.js'
import { useQueryStore } from '@/stores/modules/query';
import { useGuestStore } from '@/stores/modules/guest';
import { useLocaleStore } from '@/stores/modules/locale';
import { useChatStore } from '@/stores/modules/chat';


export const useStayStore = defineStore('stay', () => {
    
    const queryStore = useQueryStore()
    const guestStore = useGuestStore()
    const chatStore = useChatStore()
    // STATE
    const stayData = ref(getLocalStay())
    const stayId = ref(getUrlParam('e') || null)
    const guestId = ref(getUrlParam('g') || null)
    // LOCALE
    const localeStore = useLocaleStore()

    const lodingStayData = ref(true);

    // ACTIONS
    async function loadLocalStay () {
        stayId.value = getUrlParam('e');
        if(!stayId.value) return null;
        let dataGuest = guestStore.getLocalGuest();
        let params = {
            stayId: stayId.value,
            guestId: dataGuest.id,
            guestEmail:dataGuest.email
        }
        let currentStayResponse = await existingThenMatchOrSaveApi(params);
        if(currentStayResponse.ok){
            await setStayData(currentStayResponse.data)
            await queryStore.$existingPendingQuery()
        }
        return stayData.value;
    }

    async function createAndInviteGuest(data) {
        guestId.value = data.guestId;
        const response = await createAndInviteGuestApi(data)
        const { ok } = response
        if(ok){
            stayData.value = ok ? response.data : null
            setStayData(stayData.value)
            await queryStore.$existingPendingQuery()
        }else{
            stayData.value = null;
        }
        return stayData.value
    }

    async function setStayData (data) {
        if(!data) return;
        stayData.value = data;
        localStorage.setItem('stayId', stayData.value.id)
        localStorage.setItem('stayData', JSON.stringify(stayData.value))
        let formattedLangs = {
            en: 'en',
            es: 'es',
            fr: 'fr',
        }
        let otherFomattedLangs = {
            'Inglés': 'en',
            'Español': 'es',
            'Francés': 'fr',
        }
        let lang = otherFomattedLangs[stayData.value.language] ?? formattedLangs[stayData.value.language]
        // console.log(lang, 'setStayData')
        chatStore.unreadMsgs();
        queryStore.$existingPendingQuery()
        localeStore.$load(lang)
    }

    async function existingStayThenMatchAndInvite (params) {
        const response = await existingStayThenMatchAndInviteApi(params)
        const { ok } = response   
        if(ok){
            setStayData(response.data)
            await queryStore.$existingPendingQuery()
        }
        return stayData.value
    }

    async function getGuestsAndSortByCurrentguestId (stayId,guestId) {
        const response = await getGuestsAndSortByCurrentguestIdApi(stayId,guestId)
        const { ok } = response   
        if(ok){
            return response.data;
        }
        return []
    }

    async function getGuestsAndSortByAccess (stayId) {
        const response = await getGuestsAndSortByAccessApi(stayId)
        const { ok } = response   
        if(ok){
            return response.data;
        }
        return []
    }

    async function updateStayAndGuests (params) {
        let response = await updateStayAndGuestsApi(params);
        if(response.ok && response.data && response.data.id == stayData.value.id){
            await reloadLocalStay()
        }
        return response.ok ? response.data : null;
    }
    
    async function deleteGuestOfStay (stayId,guestId) {
        const response = await deleteGuestOfStayApi(stayId,guestId)
        const { ok } = response   
        if(ok){
            let reloadStay = await loadLocalStay();
            return true;
        }
        return []
    }

    async function existsAndValidate (stayId) {
        let params = {stayId}
        const response = await existsAndValidateApi(params)
        const { ok } = response   
        if(ok && response.data){
            return true;
        }
        return false
    }

    function getLocalStay() {
        let localData = localStorage.getItem('stayData');
        if(!localData) return null;
        return localData ? JSON.parse(localData) : null;
    }

    async function deleteLocalStayData () {
        stayData.value = null;
        localStorage.removeItem('stayId')
        localStorage.removeItem('stayData')
    }

    async function findByIdInSetLocalStay (stayId) {  
        
        if(stayData.value?.id == stayId) return;
        const response = await findbyIdApi(stayId)
        const { ok } = response   
        stayData.value = ok ? response.data : null;
        if(stayData.value){
            localStorage.setItem('stayId', stayData.value.id)
            localStorage.setItem('stayData', JSON.stringify(stayData.value))
        }
    }

    /* async function reloadLocalStay () {    
        
        const response = await findbyIdApi(stayData.value.id)
        const { ok } = response   
        stayData.value = ok ? response.data : null;
        if(stayData){
            localStorage.setItem('stayId', stayData?.value?.id)
            localStorage.setItem('stayData', JSON.stringify(stayData?.value))
        }

    } */
    async function reloadLocalStay() {
        if (!stayData.value) {
            
            lodingStayData.value = true; 
        }
        const response = await findbyIdApi(stayData.value ? stayData.value.id : null);
        const { ok } = response;
    
    
        if (ok && response.data) {
            stayData.value = response.data;
    
            if (stayData.value && stayData.value.id) {
                localStorage.setItem('stayId', stayData.value.id);
                localStorage.setItem('stayData', JSON.stringify(stayData.value));
            }
    
            lodingStayData.value = false; 
        } else {
            lodingStayData.value = false;
        }
    }
        
        
        

    async function findById (stayId) {    
        const response = await findbyIdApi(stayId)
        const { ok } = response   
        return  ok ? response.data : null;
    }
    // GETTERS
    const stayDataComputed = computed(() => {
        if(stayData.value){
            // chatStore.unreadMsgs();
        }
        return stayData.value
    });
    const completelyVisited = computed(() => Number(stayData.value.number_guests) == stayData.value.uniqueAccessesCount);
    
    return {
        stayData:stayDataComputed,
        setStayData,
        loadLocalStay,
        createAndInviteGuest,
        existingStayThenMatchAndInvite,
        completelyVisited,
        getGuestsAndSortByCurrentguestId,
        updateStayAndGuests,
        deleteGuestOfStay,
        getLocalStay,
        existsAndValidate,
        deleteLocalStayData,
        findByIdInSetLocalStay,
        reloadLocalStay,
        findById,
        getGuestsAndSortByAccess,
        lodingStayData
    }

})
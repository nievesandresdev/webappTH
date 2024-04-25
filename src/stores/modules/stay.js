import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
    findAndValidAccessApi,
    createAndInviteGuestApi,
    existingStayThenMatchAndInviteApi,
    getGuestsAndSortByCurrentguestIdApi,
    updateStayAndGuestsApi,
    deleteGuestOfStayApi,
    existingThenMatchOrSaveApi,
    existsAndValidateApi
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

    // ACTIONS
    async function loadLocalStay () {
        stayId.value = getUrlParam('e');
        if(!stayId.value) return null;
        let dataGuest = guestStore.getLocalGuest();
        // console.log('loadLocalStay - dataGuest',dataGuest)
        let params = {
            stayId: stayId.value,
            guestId: dataGuest.id,
            guestEmail:dataGuest.email
        }
        // console.log('params',params)
        let currentStayResponse = await existingThenMatchOrSaveApi(params);
        // console.log('existingThenMatchOrSaveApi',currentStayResponse)
        if(currentStayResponse.ok){
            await setStayData(currentStayResponse.data)
            await queryStore.$existingPendingQuery()
        }
        return stayData.value;
    }
    // async function loadLocalStay () {
        // if(stayData.value && !stayId.value) return stayData.value
        // if(!stayData.value && !stayId.value && localStorage.getItem('stayId')) stayId.value = localStorage.getItem('stayId');
        // let params = {
        //     stayId: stayId.value,
        //     guestId: guestId.value ?? localStorage.getItem('guestId'),
        //     guestEmail:null
        // }
        // if(stayId.value){
        //     const response = await findAndValidAccessApi(params)
        //     const { ok } = response   
        //     if(ok && response.data){
        //         stayData.value = ok ? response.data : null
        //         if(localStorage.getItem('guestId')){
        //             params.guestEmail = guestStore.guestData?.email;
        //             let saveAccess = await existingThenMatchOrSaveApi(params);
        //             // if(saveAccess.ok && (stayData.value?.id !== saveAccess?.data?.id)){
        //             //     stayData.value = ok ? saveAccess.data : null
        //             //     localStorage.setItem('stayId', stayData.value.id)
        //             //     router.push({name: 'Home',params:{e:stayData.value.id}})
        //             // }
        //         }
        //         return response.data
        //     }else{
        //         stayData.value = null;
        //         localStorage.removeItem('stayId')
        //         return null
        //     }
        // }
        
        // return stayData.value
    // }

    async function createAndInviteGuest(data) {
        guestId.value = data.guestId;
        const response = await createAndInviteGuestApi(data)
        const { ok } = response
        if(ok){
            stayData.value = ok ? response.data : null
            setStayData(stayData.value)
            // await queryStore.$existingPendingQuery()
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
        localeStore.$load(lang)
        // await queryStore.$existingPendingQuery()
        // await loadLocalStay();
    }

    async function existingStayThenMatchAndInvite (params) {
        const response = await existingStayThenMatchAndInviteApi(params)
        // console.log('existingStayThenMatchAndInviteApi',response)
        const { ok } = response   
        if(ok){
            // console.log('despues de soliciutd',response.data)
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

    async function updateStayAndGuests (params) {
        let response = await updateStayAndGuestsApi(params);
        // console.log('updateStayAndGuestsApi',response)
        if(response.ok && response.data){
            // let reloadStay = await loadLocalStay();
            await setStayData(response.data)
            return true;
        }
        return false;
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
        // console.log('existsAndValidateApi',response)
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

    function cleanStayData () {
        stayData.value = null;
        localStorage.removeItem('stayId')
        localStorage.removeItem('stayData')
    }

    // GETTERS
    const stayDataComputed = computed(() => {
        // console.log('stayDataComputed',stayData.value)
        if(stayData.value){
            chatStore.unreadMsgs();
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
        cleanStayData
    }

})
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
    findAndValidAccessApi,
    createAndInviteGuestApi,
    existingStayThenMatchAndInviteApi,
    getGuestsAndSortByCurrentguestIdApi,
    updateStayAndGuestsApi,
    deleteGuestOfStayApi,
    existingThenMatchOrSaveApi
} from '@/api/services/stay.services';
import { getUrlParam } from '@/utils/utils.js'
import { useQueryStore } from '@/stores/modules/query';
import { useGuestStore } from '@/stores/modules/guest';

export const useStayStore = defineStore('stay', () => {
    
    const queryStore = useQueryStore()
    const guestStore = useGuestStore()
    const router = useRouter();
    // STATE
    const stayData = ref(null)
    const stayId = ref(getUrlParam('e') || null)
    const guestId = ref(getUrlParam('g') || null)

    // ACTIONS
    async function loadLocalStay () {
        console.log('loadLocalStay');
        if(stayData.value && !stayId.value) return stayData.value
        if(!stayData.value && !stayId.value && localStorage.getItem('stayId')) stayId.value = localStorage.getItem('stayId');
        let params = {
            stayId: stayId.value,
            guestId: guestId.value,
            guestEmail:null
        }
        console.log('stayId.value',stayId.value)
        if(stayId.value){
            const response = await findAndValidAccessApi(params)
            const { ok } = response   
            if(ok && response.data){
                stayData.value = ok ? response.data : null
                console.log('guestId',localStorage.getItem('guestId'))
                if(localStorage.getItem('guestId')){
                    params.guestEmail = guestStore.guestData?.email;
                    console.log('params',params)
                    let saveAccess = await existingThenMatchOrSaveApi(params);
                    console.log('existingThenMatchOrSaveApi',saveAccess)
                    // if(saveAccess.ok && (stayData.value?.id !== saveAccess?.data?.id)){
                    //     stayData.value = ok ? saveAccess.data : null
                    //     localStorage.setItem('stayId', stayData.value.id)
                    //     router.push({name: 'Home',params:{e:stayData.value.id}})
                    // }
                }
                await queryStore.$existingPendingQuery()
                return response.data
            }else{
                stayData.value = null;
                localStorage.removeItem('stayId')
                return null
            }
        }
        
        return stayData.value
    }

    async function createAndInviteGuest(data) {
        guestId.value = data.guestId;
        const response = await createAndInviteGuestApi(data)
        const { ok } = response   
        if(ok){
            stayData.value = ok ? response.data : null
            setStayData(stayData.value,true)
            localStorage.setItem('stayId', stayData.value.id)
        }else{
            stayData.value = null;
        }
        return stayData.value
    }

    async function setStayData (data) {
        stayData.value = data;
        console.log('setStayData',stayData.value)
        localStorage.setItem('stayId', stayData.value.id)
        await loadLocalStay();
    }

    async function existingStayThenMatchAndInvite (params) {
        const response = await existingStayThenMatchAndInviteApi(params)
        const { ok } = response   
        if(ok){
            stayData.value = ok ? response.data : null
            localStorage.setItem('stayId', stayData.value.id)
            router.push({name: 'Home',params:{e:stayData.value.id}})
            // window.location.reload();
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
        if(response.ok && response.data){
            let reloadStay = await loadLocalStay();
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

    // GETTERS
    const stayDataComputed = computed(() => stayData.value);
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
        deleteGuestOfStay
    }

})
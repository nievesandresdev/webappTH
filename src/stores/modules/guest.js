import { defineStore } from 'pinia'
import { ref } from 'vue'

import { 
    findByIdApi,
    saveOrUpdateApi,
    findLastStayApi
} from '@/api/services/guest.services';
import { getUrlParam } from '@/utils/utils.js'
import { useStayStore } from '@/stores/modules/stay'

export const useGuestStore = defineStore('guest', () => {
    
    // STATE
    const guestData = ref(null)
    const guestId = ref(getUrlParam('g') || null)
    const stayId = ref(getUrlParam('e') || null)
    //stay store
    const stayStore = useStayStore()
    const { stayData } = stayStore
    // ACTIONS
    // http://localhost:81/?e=34&lang=es&subdomain=nobuhotelsevilla&g=9
    async function loadLocalGuest () {
        if(guestData.value && !guestId.value) return guestData.value
        if(!guestData.value && !guestId.value && localStorage.getItem('guestId')) guestId.value = localStorage.getItem('guestId');
        
    
        if(guestId.value){
            const response = await findByIdApi(guestId.value)
            const { ok } = response   
            if(ok && response.data){
                guestData.value = ok ? response.data : null
                localStorage.setItem('guestId', guestData.value.id)
                findLastStay(guestData.value.id);
            }else{
                guestData.value = null;
            }
        }
        console.log('loadLocalGuest',guestData.value)
        return guestData.value
    }

    async function saveOrUpdate (data) {
        const response = await saveOrUpdateApi(data)
        const { ok } = response   
        if(ok && response.data){
            guestData.value = ok ? response.data : null
            localStorage.setItem('guestId', guestData.value.id)
            await findLastStay(guestData.value.id);
        }else{
            guestData.value = null;
        }
        console.log('saveOrUpdate',guestData.value)
        return guestData.value
    }

    async function findLastStay (guestId) {
        
        const response = await findLastStayApi(guestId)
        const { ok } = response   
        if(ok){
            stayStore.setStayData(response.data)
            console.log('findLastStay',response.data)
            return response.data
        }
        console.log('findLastStay',null)
        if(stayId.value){
            const response = await stayStore.loadLocalStay();
            console.log('entro',response)
        }
        return null
    }

    //
    return {
        guestData,
        loadLocalGuest,
        saveOrUpdate
    }

})
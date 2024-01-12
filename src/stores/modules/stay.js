import { defineStore } from 'pinia'
import { ref } from 'vue'

import { 
    findAndValidAccessApi,
    createAndInviteGuestApi
} from '@/api/services/stay.services';
import { getUrlParam } from '@/utils/utils.js'

export const useStayStore = defineStore('stay', () => {
    
    // STATE
    const stayData = ref(null)
    const stayId = ref(getUrlParam('e') || null)
    const guestId = ref(getUrlParam('g') || null)

    // ACTIONS
    async function loadLocalStay () {
        if(stayData.value && !stayId.value) return stayData.value
        if(!stayData.value && !stayId.value && localStorage.getItem('stayId')) stayId.value = localStorage.getItem('stayId');
        let params = {
            stayId: stayId.value,
            guestId: guestId.value,
        }
        if(stayId.value){
            const response = await findAndValidAccessApi(params)
            const { ok } = response   
            if(ok && response.data){
                stayData.value = ok ? response.data : null
                localStorage.setItem('stayId', stayData.value.id)
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
        const response = await createAndInviteGuestApi(data)
        const { ok } = response   
        if(ok){
            stayData.value = ok ? response.data : null
            localStorage.setItem('stayId', stayData.value.id)
        }else{
            stayData.value = null;
        }
        return stayData.value
    }
    function setStayData (data) {
        stayData.value = data;
        localStorage.setItem('stayId', stayData.value.id)
    }
    //
    return {
        stayData,
        setStayData,
        loadLocalStay,
        createAndInviteGuest
    }

})
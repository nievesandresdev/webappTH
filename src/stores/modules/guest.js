import { defineStore } from 'pinia'
import { ref } from 'vue'

import { 
    findByIdApi 
} from '@/api/services/guest.services';
import { getUrlParam } from '@/utils/utils.js'

export const useGuestStore = defineStore('guest', () => {
    
    // STATE
    const guestData = ref(null)
    const guestId = ref(getUrlParam('g') || null)

    // ACTIONS
    async function loadLocalGuest () {
        if(guestId.value){
            const response = await findByIdApi(guestId.value)
            const { ok } = response   
            if(ok && response.data){
                guestData.value = ok ? response.data : null
                console.log('useGuestStore',guestData.value)
            }else{
                guestData.value = null;
            }
        }
        // 
        return response.data
    }

    //
    return {
        guestData,
        loadLocalGuest
    }

})
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { 
    findAndValidAccessApi 
} from '@/api/services/stay.services';
import { getUrlParam } from '@/utils/utils.js'

export const useStayStore = defineStore('guest', () => {
    
    // STATE
    const stayData = ref(null)
    const stayId = ref(getUrlParam('e') || null)
    const guestId = ref(getUrlParam('g') || null)
    const subject = ref(getUrlParam('subject') || null)
    const webLang = ref(getUrlParam('lang') || null)
    const subdomain = ref(getUrlParam('subdomain') || null)

    // ACTIONS
    async function loadLocalStay () {
        
        let params = {
            stayId: stayId.value,
            subject: subject.value,
            guestId: guestId.value,
            webLang: webLang.value,
            subdomain: subdomain.value,
        }
        if(stayId.value){
            const response = await findAndValidAccessApi(params)
            console.log('useStayStore',response.data)
            const { ok } = response   
            if(ok && response.data){
                stayData.value = ok ? response.data : null
                localStorage.setItem('stayId', stayData.value.id)
            }else{
                stayData.value = null;
                localStorage.removeItem('stayId')
            }
        }
        // 
        
        return response.data
    }

    //
    return {
        stayData,
        loadLocalStay
    }

})
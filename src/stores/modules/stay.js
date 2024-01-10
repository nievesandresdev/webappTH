import { defineStore } from 'pinia'
import { ref } from 'vue'

import { 
    findAndValidAccessApi 
} from '@/api/services/stay.services';
import { getUrlParam } from '@/utils/utils.js'

export const useStayStore = defineStore('stay', () => {
    
    // STATE
    const stayData = ref(null)
    const stayId = ref(getUrlParam('e') || null)
    const guestId = ref(getUrlParam('g') || null)
    const subject = ref(getUrlParam('subject') || null)
    const webLang = ref(getUrlParam('lang') || null)
    const subdomain = ref(getUrlParam('subdomain') || null)

    // ACTIONS
    async function loadLocalStay () {
        // if (stayData.value) return
        
        let params = {
            stayId: stayId.value,
            subject: subject.value,
            guestId: guestId.value,
            webLang: webLang.value,
            subdomain: subdomain.value,
        }
        const response = await findAndValidAccessApi(params)
        console.log('useStayStore',response.data)
        const { ok } = response
        if(ok && response.data){
            stayData.value = ok ? response.data : null
            localStorage.setItem('stayId', stayData.value.id)
        }
        // e=34&g=9&lang=es&subdomain=nobuhotelsevilla&subject=invited
        
        return response.data
    }

    //
    return {
        stayData,
        loadLocalStay
    }

})
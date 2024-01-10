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

    // ACTIONS
    async function loadLocalStay () {
        if(stayData.value && !stayId.value) return stayData.value
        if(!stayData.value && !stayId.value && localStorage.getItem('stayId')) stayId.value = localStorage.getItem('stayId');
        let params = {
            stayId: stayId.value,
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
    function setStayData (data) {
        console.log('setStayData',data)
        stayData.value = data;
        localStorage.setItem('stayId', stayData.value.id)
    }
    //
    return {
        stayData,
        setStayData,
        loadLocalStay
    }

})
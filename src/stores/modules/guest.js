import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { 
    findByIdApi,
    saveOrUpdateApi,
    findLastStayApi,
    sendMailToApi,
    updateLanguageApi,
} from '@/api/services/guest.services';
import { getUrlParam } from '@/utils/utils.js'
import { useStayStore } from '@/stores/modules/stay'
import { useLocaleStore } from '@/stores/modules/locale'
import { useQueryStore } from '@/stores/modules/query';

export const useGuestStore = defineStore('guest', () => {
    
    // STATE
    const guestData = ref(null)
    const guestId = ref(getUrlParam('g') || null)
    const stayId = ref(getUrlParam('e') || null)
    //stay store
    const queryStore = useQueryStore()
    const stayStore = useStayStore()
    const { stayData } = stayStore
    // LOCALE
    const localeStore = useLocaleStore()

    // COMPUTED
    

    // ACTIONS
    // http://localhost:81/?e=34&lang=es&subdomain=nobuhotelsevilla&g=9
    async function loadLocalGuest () {
        // console.log('loadLocalGuest');
        if(guestData.value && !guestId.value) return guestData.value
        if(!guestData.value && !guestId.value && localStorage.getItem('guestId')) guestId.value = localStorage.getItem('guestId');
        
    
        if(guestId.value){
            const response = await findByIdApi(guestId.value)
            const { ok } = response   
            if(ok && response.data){
                console.log('entro')
                guestData.value = ok ? response.data : null
                localStorage.setItem('guestId', guestData.value.id)
                localeStore.$load(guestData.value.lang_web)
                await queryStore.$existingPendingQuery()
                findLastStay(guestData.value.id);
            }else{
                guestData.value = null;
                
            }
        }

        return guestData.value
    }

    async function saveOrUpdate (data) {
        const response = await saveOrUpdateApi(data)
        const { ok } = response   
        if(ok && response.data){
            guestData.value = ok ? response.data : null
            localStorage.setItem('guestId', guestData.value.id)
            await queryStore.$existingPendingQuery()
            await findLastStay(guestData.value.id);
        }else{
            guestData.value = null;
        }
        return guestData.value
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
            localeStore.$load(lg)
            window.location.reload()
        }
    }

    async function findLastStay (guestId) {
        if(localStorage.getItem('stayId')) return;
        const response = await findLastStayApi(guestId)
        const { ok } = response   
        if(ok){
            await queryStore.$existingPendingQuery()
            stayStore.setStayData(response.data,false)
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
    //
    return {
        guestData,
        loadLocalGuest,
        saveOrUpdate,
        updateLanguage,
        sendMailTo
    }

})
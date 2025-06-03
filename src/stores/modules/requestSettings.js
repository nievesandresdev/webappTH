import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import {
    getAllApi,
    getRequestDataApi
} from '@/api/services/requestSettings.services'

export const useRequestSettingStore = defineStore('requestSettings', () => {
    
    // STATE
    const requestData = ref(null);
    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getRequestData (period, guestName) {
        let data = { period, guestName };
        const response = await getRequestDataApi(data)
        const { ok } = response   
        if(ok){
            requestData.value = response.data
            return response.data
        }
    }

    async function $setRequestData(data) {
        requestData.value = data;
    }

    const requestDataComputed = computed(() => {
        return requestData.value;
    });

    //
    return {
        $getAll,
        $getRequestData,
        $setRequestData,
        requestData:requestDataComputed
    }

})
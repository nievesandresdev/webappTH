import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    saveApi
} from '@/api/services/stayAccess.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

export const useStayAccessStore = defineStore('stayAccess', () => {
    
    // STATE

    // ACTIONS
    async function $save () {
        const response = await saveApi()
        console.log('stayAccess $save',response)
        if(response.ok) return response.data
        return null
    }

    //
    return {
        $save
    }

})
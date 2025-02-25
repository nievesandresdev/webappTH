import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllSettingsApi
} from '@/api/services/stay.services';

export const useCheckinStore = defineStore('checkin', () => {
    
    // STATE
    async function $getAllSettings () {
        const response = await getAllSettingsApi()
        const { ok, data } = response
        if (ok) {
            return data
        }
        return [];     
    }

    //
    return {
        $getAllSettings
    }

})
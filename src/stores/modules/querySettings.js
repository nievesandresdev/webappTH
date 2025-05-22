import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    getAllApi,
} from '@/api/services/querySettings.services'

export const useQuerySettingsStore = defineStore('querySettings', () => {
    
    // STATE
    const settings = ref(null);

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $setSettings (data) {
        settings.value = data;
    }


    const settingsComputed = computed(() => {
        return settings.value
    });
    //
    return {
        $getAll,
        $setSettings,
        settings:settingsComputed
    }

})
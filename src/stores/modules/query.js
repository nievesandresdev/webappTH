import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { $currentPeriod } from '@/utils/helpers';

import {
    getCurrentPeriodApi,
    getRecentlySortedResponsesApi,
    firstOrCreateApi,
    saveResponseApi,
    existingPendingQueryApi,
    visitedApi,
    getCurrentAndSettingsQueryApi
} from '@/api/services/query.services'

import { useQuerySettingsStore } from '@/stores/modules/querySettings'
import { useRequestSettingStore } from '@/stores/modules/requestSettings'

export const useQueryStore = defineStore('query', () => {
    
    const querySettingsStore = useQuerySettingsStore()
    const requestSettingsStore = useRequestSettingStore()
    // STATE
    const pendingQuery = ref(false);
    const currentQuery = ref(null);
    const isOpenPopUp = ref(false);
    

    // ACTIONS
    async function $getCurrentPeriod (data) {

        const response = await getCurrentPeriodApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
        return null;
    }

    async function $getRecentlySortedResponses (data) {
        const response = await getRecentlySortedResponsesApi(data)
        // console.log('test response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $firstOrCreate (params) {

        const response = await firstOrCreateApi(params)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $saveResponse (params) {
        // console.log('params',params)
        const response = await saveResponseApi(params)
        // console.log('response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $visited (params) {

        const response = await visitedApi(params)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $existingPendingQuery () {
        let params = {
            stayId :localStorage.getItem('stayId'),
            guestId :localStorage.getItem('guestId'),
        };
        if(params.stayId && params.guestId){
            const response = await existingPendingQueryApi(params)
            const { ok } = response   
            if(ok){
                pendingQuery.value = response.data;
            }
        }
    }

    async function $setPendingQuery(value) {
        pendingQuery.value = value;
    }

    async function $setCurrentQuery(value) {
        currentQuery.value = value;
    }

    async function $getCurrentAndSettingsQuery(stayId, guestId, period, guestName) {
        let params = {stayId, guestId, period, guestName};
        const response = await getCurrentAndSettingsQueryApi(params)
        const { ok } = response   
        if(ok){
            $setCurrentQuery(response.data.query)
            await querySettingsStore.$setSettings(response.data.settings)
            await requestSettingsStore.$setRequestData(response.data.requestData)
            return response.data
        }
    }
    //

    const hasPendingQuery = computed(() => {
        return pendingQuery.value;
    });

    const currentQueryComputed = computed(() => {
        return currentQuery.value
    });

    function $setIsOpenPopUp(value) {
        if($currentPeriod() == 'pre-stay') return;
        isOpenPopUp.value = value;
    }

    function $openPopUp() {
        let localOpen = localStorage.getItem('queryPopUpHasBeenOpen')
        // console.log('localOpen',localOpen)
        if(localOpen !== 'true'){
            $setIsOpenPopUp(true)
        }
    }

    function $firstOpenPopUp() {
        $openPopUp()
        localStorage.setItem('queryPopUpHasBeenOpen', true);
    }

    function $closeSessionPopUp() {
        localStorage.setItem('queryPopUpHasBeenOpen', false);
    }
    return {
        $getCurrentPeriod,
        $getRecentlySortedResponses,
        $firstOrCreate,
        $saveResponse,
        $existingPendingQuery,
        $visited,
        $setPendingQuery,
        $getCurrentAndSettingsQuery,
        $setIsOpenPopUp,
        $openPopUp,
        $firstOpenPopUp,
        $closeSessionPopUp,
        $setCurrentQuery,
        //
        hasPendingQuery,
        currentQuery:currentQueryComputed,
        isOpenPopUp
    }

})
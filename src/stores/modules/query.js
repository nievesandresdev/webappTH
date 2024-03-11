import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import {
    getCurrentPeriodApi,
    getRecentlySortedResponsesApi,
    firstOrCreateApi,
    saveResponseApi,
    existingPendingQueryApi,
    visitedApi
} from '@/api/services/query.services'

export const useQueryStore = defineStore('query', () => {
    
    // STATE
    const pendingQuery = ref([]);

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

        const response = await saveResponseApi(params)
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
        console.log('existingPendingQuery',params)
        const response = await existingPendingQueryApi(params)
        console.log('existingPendingQuery',response.data)
        const { ok } = response   
        if(ok){
            pendingQuery.value = response.data;
        }
    }

    async function $setPendingQuery(value) {
        pendingQuery.value = value;
    }
    //

    const hasPendingQuery = computed(() => {
        console.log('hasPendingQuery',pendingQuery.value)
        return pendingQuery.value;
    });
    return {
        $getCurrentPeriod,
        $getRecentlySortedResponses,
        $firstOrCreate,
        $saveResponse,
        $existingPendingQuery,
        $visited,
        $setPendingQuery,
        //
        hasPendingQuery
    }

})
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getAllApi,
    findByIdApi
} from '@/api/services/facility.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

export const useFacilityStore = defineStore('facility', () => {
    
    // STATE

    // ACTIONS
    function $loadImage (path) {
        let { URL_STORAGE } = mainStore
        let url = `${URL_STORAGE}/storage/facility${path}`
        return url
    }

    async function $getAll () {
        const response = await getAllApi()
        if(response.ok) return response.data
        return []
    }

    async function $findById(id) {
        const response = await findByIdApi(id)
        if(response.ok) return response.data
        return []
    }

    //
    return {
        $loadImage,
        $getAll,
        $findById
    }

})
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
    function $loadImage (item) {
        let { image: path, type, url } = item ?? {};
        let { URL_STORAGE } = mainStore;
        
        // let model = 'places';
        // if(type == "gallery" || url?.includes('storage')) model = 'gallery'; 

        // let urlFull = `${URL_STORAGE}/storage/${model}/${path}`
        // return urlFull

        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/places/${path}`;

    }

    async function $getAll () {
        let params = {visible: 1}
        //
        const response = await getAllApi(params)
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
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
    function $loadImage (img) {
        if (!img) return '';
        let { URL_STORAGE } = mainStore
        let { type, url } = img
        // console.log(img, 'img')
        // console.log(`'type: '${type}, 'url: '${url}`)
        if (type === 'CDN') return url
        if (url?.includes('storage/gallery')) return `${URL_STORAGE}${url}`
        if (!type) return URL_STORAGE+'/storage/facility'+url;
        return `${URL_STORAGE}${url}`

        // url = type != 'CDN' ? `${URL_STORAGE}${url}` : url
        // return url
    }

    async function $getAll () {
        let params = {visible: 1}
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
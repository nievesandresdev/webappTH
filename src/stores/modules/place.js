import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllApi,
    getCategoriesByTypeApi,
    getTypePlacesApi,
    getRatingCountsPlacesApi,
    findByIdApi,
    getDataReviewsApi,
    getReviewsByRatingApi
} from '@/api/services/place.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

export const usePlaceStore = defineStore('place', () => {
    
    // STATE

    // ACTIONS
    function $loadImage (path) {
        let { URL_STORAGE } = mainStore
        let url = `${URL_STORAGE}/storage/places/${path}`
        return url
    }

    async function $apiGetAll (params) {
        const response = await getAllApi(params)
        return response
    }
    async function $apiGetCategoriesByType (params) {
        const response = await getCategoriesByTypeApi(params)
        return response
    }
    async function $apiGetTypePlaces (params) {
        const response = await getTypePlacesApi(params)
        return response
    }

    async function $getRatingCountsPlaces (params) {
        const response = await getRatingCountsPlacesApi(params)
        return response
    }

    async function $findById (params) {
        const response = await findByIdApi(params)
        return response
    }

    async function $findById (params) {
        const response = await findByIdApi(params)
        return response
    }

    async function $getDataReviews (id) {
        const response = await getDataReviewsApi({id})
        return response
    }

    async function $getReviewsByRating (params) {
        const response = await getReviewsByRatingApi(params)
        return response
    }

    //
    return {
        $loadImage,
        $apiGetAll,
        $apiGetCategoriesByType,
        $apiGetTypePlaces,
        $getRatingCountsPlaces,
        $findById,
        $getDataReviews,
        $getReviewsByRating
    }

})
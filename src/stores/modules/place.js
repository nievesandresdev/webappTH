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
    getReviewsByRatingApi,
    getCrossellingApi,
} from '@/api/services/place.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

export const usePlaceStore = defineStore('place', () => {
    
    // STATE

    // ACTIONS
    function $loadImage (path) {
        let { URL_STORAGE } = mainStore
        let url = `${URL_STORAGE}/storage/places/${path}`
        return url
    }

    async function $apiGetAll (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await getAllApi(newParams)
        return response
    }
    async function $apiGetCategoriesByType (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await getCategoriesByTypeApi(newParams)
        return response
    }
    async function $apiGetTypePlaces (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await getTypePlacesApi(newParams)
        return response
    }

    async function $getRatingCountsPlaces (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await getRatingCountsPlacesApi(newParams)
        return response
    }

    async function $findById (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await findByIdApi(newParams)
        return response
    }

    async function $getDataReviews (id) {
        const response = await getDataReviewsApi({id})
        return response
    }

    async function $getReviewsByRating (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await getReviewsByRatingApi(newParams)
        return response
    }
    async function $getCrosselling (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await getCrossellingApi(newParams)
        const { ok, data } = response
        if (ok) {
            return data
        }
        return;       
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
        $getReviewsByRating,
        $getCrosselling,
    }

})
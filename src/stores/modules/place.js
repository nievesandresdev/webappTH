import { defineStore } from 'pinia'
import { ref, reactive  } from 'vue'
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
    getPointerApi,
} from '@/api/services/place.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

export const usePlaceStore = defineStore('place', () => {
    
    // STATE
    const dataFilter = {
        categoriplace: [],
        typeplace: null,
        points: [],
        distances: [],
        all_cities: false,
        search:null,
        city: null,
        featured: false,
    }
    const dataFilterGlobal = reactive(JSON.parse(JSON.stringify(dataFilter)));

    // MUTATIONS
    function setDataFilterList (dataFormFilterInList) {
        Object.assign(dataFilterGlobal, dataFormFilterInList);
    }

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

    async function $apiGetAll (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude},
            ...params
        }
        const response = await getAllApi(newParams)
        return response
    }
    async function $apiGetPointer (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude},
            ...params
        }
        const response = await getPointerApi(newParams)
        return response
    }
    async function $apiGetCategoriesByType (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude } =  hotelStore.hotelData
        let newParams = {
            hiddenCategoriPlaces: hotelStore?.hotelData?.hidden_categories ?? [],
            hiddenTypePlaces: hotelStore?.hotelData?.hidden_type_places ?? [],
            hotel: { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude},
            ...params
        }
        const response = await getCategoriesByTypeApi(newParams)
        return response
    }
    async function $apiGetTypePlaces (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude } =  hotelStore.hotelData
        
        let newParams = {
            hiddenCategoriPlaces: hotelStore?.hotelData?.hidden_categories ?? [],
            hiddenTypePlaces: hotelStore?.hotelData?.hidden_type_places ?? [],
            hotel: { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude},
            ...params
        }
        const response = await getTypePlacesApi(newParams)
        return response
    }

    async function $getRatingCountsPlaces (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude},
            ...params
        }
        const response = await getRatingCountsPlacesApi(newParams)
        return response
    }

    async function $findById (params, config = { showPreloader: true }) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await findByIdApi(newParams, config)
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
        let { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude } =  hotelStore.hotelData
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel, latitude, longitude},
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
        dataFilterGlobal,
        setDataFilterList,
        $loadImage,
        $apiGetPointer,
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
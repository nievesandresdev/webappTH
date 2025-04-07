import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllConforApi,
    getAllTransportApi,
    findByIdConfortApi,
    findByIdTransportApi
} from '@/api/services/service.services'

import { useMainStore } from '@/stores'
const mainStore = useMainStore()

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

export const useServiceStore = defineStore('service', () => {
    
    // STATE
    const dataFilter = {
        price_min: null,
        price_max: null,
        search: null,
        type: 'CONFORT',
    }
    const dataFilterGlobal = reactive(JSON.parse(JSON.stringify(dataFilter)));

        const hotelData = computed(() => {
            return hotelStore.hotelData;
        });

        // MUTATIONS
        function setDataFilterList (dataFormFilterInList) {
            Object.assign(dataFilterGlobal, dataFormFilterInList);
        }

    // ACTIONS
    function $loadImage (item,custom = null) {
        let { URL_STORAGE } = mainStore;

        let { image: path, type, url, api } = item ?? {};
        if (api) {
            return url;
        }
        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/places/${item?.image}`;

    }

    function getHotelParams(params = {}) {
        const { id: idHotel, name: nameHotel, zone: zoneHotel } = hotelData.value;
        return {
            hotel: { id: idHotel, name: nameHotel, zone: zoneHotel },
            ...params
        };
    }

    async function $apiDetAllConforApi (params) {
        let newParams = getHotelParams(params);
        const response = await getAllConforApi(newParams)
        // console.log(response, 'response')
        return response
    }
    async function $apiDetAllTransportApi (params) {
        let newParams = getHotelParams(params);
        const response = await getAllTransportApi(newParams)
        // console.log(response, 'response')
        return response
    }
    
    async function $findByIdConfort (id) {
        let newParams = getHotelParams({});
        const response = await findByIdConfortApi(id, newParams);
        // console.log(response, 'response')
        return response
    }
    async function $findByIdTransport (id) {
        let newParams = getHotelParams({});
        const response = await findByIdTransportApi(id, newParams);
        // console.log(response, 'response')
        return response
    }

    function calPrice (item) {
        if (!item) return;
        let { from_price: fromPrice, price: price, name_api: nameApi, type_price: typePrice, fields_visibles: fieldsValues, type: typeService, subservices } = item;
        price = price ?? fromPrice;
        price = price ? parseFloat(price) : 0;
        let priceObject = {
            price,
            isFree: false,
            isFrom: false
        }
    
        if(nameApi == 'viator') {
            priceObject.price = `${price?.toFixed(2)} €`;
        }
    
        if (typePrice == 'Activities') {
            priceObject.price =  `${price?.toFixed(2)} €`;
        }
    
        if (typeService == '2') {
            let minPrice = calMinPriceSubservices(subservices);
            if (minPrice == 0) {
                priceObject.isFree = true;
                return priceObject;
            }
            priceObject.price = `${minPrice?.toFixed(2)} €`;
            priceObject.isFrom = true;
        }
    
        if (!['1','2'].includes(typePrice) && !['PRICE'].includes(typeService)) {
            priceObject.price = `${price?.toFixed(2)} €`;
        }
    
        if (fieldsValues?.includes('PRICE')) {
            priceObject.isFree = true;
        }
        priceObject.price = `${price?.toFixed(2)}€`;
        return priceObject;
    }
    
    function calMinPriceSubservices (subservices = []) {
        let minPrice = subservices.reduce((acc, item) => {
            if (item.price < acc) {
                return item.price;
            }
            return acc;
        }, 0);
        return minPrice;
    }

    //
    return {
        dataFilterGlobal,
        setDataFilterList,
        $apiDetAllConforApi,
        $apiDetAllTransportApi,
        $loadImage,
        $findByIdConfort,
        $findByIdTransport,
        calPrice,
    }

})
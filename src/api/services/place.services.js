import { apiHttp } from '../axiosApi'
import {
    placePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('POST', `${placePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');
export const getPointerApi = (params) => apiHttp('POST', `${placePath}/getPointers`, params, { showPreloader: false }, 'API_HELPER');
export const getCategoriesByTypeApi = (params) => apiHttp('POST', `${placePath}/getCategoriesByType`, params, { showPreloader: false }, 'API_HELPER')
export const getTypePlacesApi = (params) => apiHttp('GET', `${placePath}/getTypePlaces`, params, { showPreloader: false }, 'API_HELPER')
export const getRatingCountsPlacesApi = (params) => apiHttp('GET', `${placePath}/getRatingCountsPlaces`, params, { showPreloader: false }, 'API_HELPER')
export const findByIdApi = (params, config) => apiHttp('POST', `${placePath}/findById`, params, config, 'API_HELPER')
export const getDataReviewsApi = (params) => apiHttp('GET', `${placePath}/getDataReviews`, params, { showPreloader: false }, 'API_HELPER')
export const getReviewsByRatingApi = (params) => apiHttp('GET', `${placePath}/getReviewsByRating`, params, { showPreloader: false }, 'API_HELPER')
export const getCrossellingApi = (params) => apiHttp('POST', `${placePath}/getCrosselling`, params, {}, 'API_HELPER')

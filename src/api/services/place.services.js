import { apiHttp } from '../axiosApi'
import {
    placePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('POST', `${placePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');
export const getCategoriesByTypeApi = (params) => apiHttp('POST', `${placePath}/getCategoriesByType`, params, {}, 'API_HELPER')
export const getTypePlacesApi = (params) => apiHttp('GET', `${placePath}/getTypePlaces`, params, {}, 'API_HELPER')
export const getRatingCountsPlacesApi = (params) => apiHttp('GET', `${placePath}/getRatingCountsPlaces`, params, {}, 'API_HELPER')
export const findByIdApi = (params) => apiHttp('POST', `${placePath}/findById`, params, {}, 'API_HELPER')
export const getDataReviewsApi = (params) => apiHttp('GET', `${placePath}/getDataReviews`, params, {}, 'API_HELPER')
export const getReviewsByRatingApi = (params) => apiHttp('GET', `${placePath}/getReviewsByRating`, params, {}, 'API_HELPER')
export const getCrossellingApi = (params) => apiHttp('POST', `${placePath}/getCrosselling`, params, {}, 'API_HELPER')

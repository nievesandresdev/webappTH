import { apiHttp } from '../axiosApi'
import {
    placePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${placePath}/getAll`, params)
export const getCategoriesByTypeApi = (params) => apiHttp('GET', `${placePath}/getCategoriesByType`, params)
export const getTypePlacesApi = (params) => apiHttp('GET', `${placePath}/getTypePlaces`, params)
export const getRatingCountsPlacesApi = (params) => apiHttp('GET', `${placePath}/getRatingCountsPlaces`, params)

import { apiHttp } from '../axiosApi'
import {
    experiencePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('POST', `${experiencePath}/getAll`, params)
export const getNumbersByFiltersApi = (params) => apiHttp('GET', `${experiencePath}/getNumbersByFilters`, params)
export const findBySlugApi = (params) => apiHttp('GET', `${experiencePath}/findBySlug`, params)
export const findInVIatorByShortIdApi = (params) => apiHttp('GET', `${experiencePath}/findInVIatorByShortId`, params)
export const findSchedulesInVIatorApi = (params) => apiHttp('GET', `${experiencePath}/findSchedulesInVIator`, params)

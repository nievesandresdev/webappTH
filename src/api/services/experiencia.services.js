import { apiHttp } from '../axiosApi'
import {
    experiencePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('POST', `${experiencePath}/getAll`, params, { showPreloader: false }, 'API_HELPER', false, true);
export const getNumbersByFiltersApi = (params) => apiHttp('POST', `${experiencePath}/getNumbersByFilters`, params, { showPreloader: false }, 'API_HELPER', false, true);
export const findBySlugApi = (params) => apiHttp('GET', `${experiencePath}/findBySlug`, params, {}, 'API_HELPER');
export const findInVIatorByShortIdApi = (params) => apiHttp('GET', `${experiencePath}/findInVIatorByShortId`, params, { showPreloader: false }, 'API_HELPER');
export const findSchedulesInVIatorApi = (params) => apiHttp('GET', `${experiencePath}/findSchedulesInVIator`, params, { showPreloader: false }, 'API_HELPER');

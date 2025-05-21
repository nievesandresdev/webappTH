import { apiHttp } from '../axiosApi'
import {
    queryPath,
} from '../config/apiRoute'

export const getCurrentPeriodApi = (params) => apiHttp('GET', `${queryPath}/getCurrentPeriod`, params)
export const getRecentlySortedResponsesApi = (params) => apiHttp('GET', `${queryPath}/getRecentlySortedResponses`, params)
export const firstOrCreateApi = (params) => apiHttp('POST', `${queryPath}/firstOrCreate`, params, {}, 'API_GENERAL', false, true)
export const saveResponseApi = (params) => apiHttp('POST', `${queryPath}/saveResponse`, params, {}, 'API_GENERAL', false, true)
export const existingPendingQueryApi = (params) => apiHttp('GET', `${queryPath}/existingPendingQuery`, params)
export const visitedApi = (params) => apiHttp('POST', `${queryPath}/visited`, params, {}, 'API_GENERAL', false, true)
export const getCurrentAndSettingsQueryApi = (params) => apiHttp('GET', `${queryPath}/getCurrentAndSettingsQuery`, params)





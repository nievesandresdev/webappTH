import { apiHttp } from '../axiosApi'
import {
    queryPath,
} from '../config/apiRoute'

export const getCurrentPeriodApi = (params) => apiHttp('GET', `${queryPath}/getCurrentPeriod`, params)
export const getRecentlySortedResponsesApi = (params) => apiHttp('GET', `${queryPath}/getRecentlySortedResponses`, params)
export const firstOrCreateApi = (params) => apiHttp('POST', `${queryPath}/firstOrCreate`, params)
export const saveResponseApi = (params) => apiHttp('POST', `${queryPath}/saveResponse`, params)
export const existingPendingQueryApi = (params) => apiHttp('GET', `${queryPath}/existingPendingQuery`, params)
export const visitedApi = (params) => apiHttp('POST', `${queryPath}/visited`, params)




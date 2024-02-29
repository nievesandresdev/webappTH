import { apiHttp } from '../axiosApi'
import {
    queryPath,
} from '../config/apiRoute'

export const getCurrentPeriodApi = (params) => apiHttp('GET', `${queryPath}/getCurrentPeriod`, params)
export const getRecentlySortedResponsesApi = (params) => apiHttp('GET', `${queryPath}/getRecentlySortedResponses`)
export const firstOrCreateApi = (params) => apiHttp('POST', `${queryPath}/firstOrCreate`, params)
export const saveResponseApi = (params) => apiHttp('POST', `${queryPath}/saveResponse`, params)


import { apiHttp } from '../axiosApi'
import {
    stayAccessPath,
} from '../config/apiRoute'

export const saveApi = (data) => apiHttp('POST', `${stayAccessPath}/save`, data , { showPreloader: false }, 'API_GENERAL', false, true)	
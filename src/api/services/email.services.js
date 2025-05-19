import { apiHttp } from '../axiosApi'
import {
    emailPath,
} from '../config/apiRoute'

export const disabledEmail = (params) => apiHttp('POST', `${emailPath}/disabledEmail`, params , { showPreloader: false }, 'API_GENERAL', false, true)
export const reactivateEmail = (params) => apiHttp('POST', `${emailPath}/reactivateEmail`, params , { showPreloader: false }, 'API_GENERAL', false, true)
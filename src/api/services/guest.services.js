import { apiHttp } from '../axiosApi'
import {
    guestPath,
} from '../config/apiRoute'

export const findByIdApi = (id) => apiHttp('GET', `${guestPath}/findByIdApi/${id}`)
export const saveOrUpdateApi = (data) => apiHttp('POST', `${guestPath}/saveOrUpdateApi/`,data)
export const findLastStayApi = (id) => apiHttp('GET', `${guestPath}/findLastStayApi/${id}`)

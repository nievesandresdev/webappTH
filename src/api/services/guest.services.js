import { apiHttp } from '../axiosApi'
import {
    guestPath,
} from '../config/apiRoute'

export const findByIdApi = (id) => apiHttp('GET', `${guestPath}/findByIdApi/${id}`)
export const findByEmailApi = (data) => apiHttp('GET', `${guestPath}/findByEmail/`, data)
export const saveOrUpdateApi = (data) => apiHttp('POST', `${guestPath}/saveOrUpdateApi/`, data)
export const updateLanguageApi = (data) => apiHttp('POST', `${guestPath}/updateLanguageApi/`, data,  { showPreloader: false })
export const findLastStayApi = (id) => apiHttp('GET', `${guestPath}/findLastStayApi/${id}`)
export const findAndValidLastStayApi = (params) => apiHttp('GET', `${guestPath}/findAndValidLastStay`, params)
export const sendMailToApi = (params) => apiHttp('POST', `${guestPath}/sendMailTo/`, params)


export const authWithGoogle = (data) => apiHttp('POST', `${guestPath}/auth/google`,data)
export const authWithGoogleCallback = () => apiHttp('GET', `${guestPath}/auth/google-callback`)

export const updatePasswordToApi = (data) => apiHttp('POST', `${guestPath}/updatePasswordGuest`, data)
export const updateDataGuest = (data) => apiHttp('POST', `${guestPath}/updateDataGuest`, data,{},'API_GENERAL',true)

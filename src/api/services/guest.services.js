import { apiHttp } from '../axiosApi'
import {
    guestPath,
} from '../config/apiRoute'

export const findByIdApi = (id) => apiHttp('GET', `${guestPath}/findByIdApi/${id}`)
export const findByEmailApi = (data) => apiHttp('GET', `${guestPath}/findByEmail/`, data)
export const saveOrUpdateApi = (data) => apiHttp('POST', `${guestPath}/saveOrUpdateApi/`, data, {}, 'API_GENERAL', false, true)
export const updateLanguageApi = (data) => apiHttp('POST', `${guestPath}/updateLanguageApi/`, data,  { showPreloader: false }, 'API_GENERAL', false, true)
export const findAndValidLastStayApi = (params) => apiHttp('GET', `${guestPath}/findAndValidLastStay`, params)
export const saveAndFindValidLastStayApi = (params) => apiHttp('GET', `${guestPath}/saveAndFindValidLastStay`, params)
export const sendMailToApi = (params) => apiHttp('POST', `${guestPath}/sendMailTo/`, params, {}, 'API_GENERAL', false, true)
export const createAccessInStayApi = (params) => apiHttp('POST', `${guestPath}/createAccessInStay/`, params, {}, 'API_GENERAL', false, true)
export const deleteGuestOfStayApi = (params) => apiHttp('POST', `${guestPath}/deleteGuestOfStay/`, params, {}, 'API_GENERAL', false, true)

export const authWithGoogle = (data) => apiHttp('POST', `${guestPath}/auth/google`,data, {}, 'API_GENERAL', false, true)
export const authWithGoogleCallback = () => apiHttp('GET', `${guestPath}/auth/google-callback`)

export const updatePasswordToApi = (data) => apiHttp('POST', `${guestPath}/updatePasswordGuest`, data, {}, 'API_GENERAL', false, true)
export const updateDataGuest = (data) => apiHttp('POST', `${guestPath}/updateDataGuest`, data,{},'API_GENERAL',true, true)

export const saveCheckinDataApi = (params) => apiHttp('POST', `${guestPath}/saveCheckinData/`, params, {}, 'API_GENERAL', false, true)
export const deleteCheckinDataApi = (params) => apiHttp('POST', `${guestPath}/deleteCheckinData/`, params, {}, 'API_GENERAL', false, true)

export const sendContactEmailApi = (params) => apiHttp('POST', `${guestPath}/sendContactEmail/`, params, { showPreloader: false }, 'API_GENERAL', false, true)
export const getContactEmailsByStayIdApi = (params) => apiHttp('GET', `${guestPath}/getContactEmailsByStayId/`, params)

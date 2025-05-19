import { apiHttp } from '../axiosApi'
import {
    stayPath,
    checkinPath
} from '../config/apiRoute'

export const findAndValidAccessApi = (params) => apiHttp('GET', `${stayPath}/findAndValidAccess`, params)
export const existsAndValidateApi = (params) => apiHttp('GET', `${stayPath}/existsAndValidate`, params)
export const createAndInviteGuestApi = (params) => apiHttp('POST', `${stayPath}/createAndInviteGuest`, params, {}, 'API_GENERAL', false, true)
export const existingStayThenMatchAndInviteApi = (params) => apiHttp('POST', `${stayPath}/existingStayThenMatchAndInvite`, params, {}, 'API_GENERAL', false, true)
export const existingThenMatchOrSaveApi = (params) => apiHttp('POST', `${stayPath}/existingThenMatchOrSave`, params, {}, 'API_GENERAL', false, true)
export const getGuestsAndSortByCurrentguestIdApi = (stayId,guestId) => apiHttp('GET', `${stayPath}/getGuestsAndSortByCurrentguestIdApi/${stayId}/${guestId}`)
export const getGuestsAndSortByAccessApi = (stayId) => apiHttp('GET', `${stayPath}/getGuestsAndSortByAccess/${stayId}`)
export const updateStayAndGuestsApi = (params) => apiHttp('POST', `${stayPath}/updateStayAndGuests`, params, {}, 'API_GENERAL', false, true)
export const deleteGuestOfStayApi = (stayId,guestId) => apiHttp('POST', `${stayPath}/deleteGuestOfStay/${stayId}/${guestId}`, {}, {}, 'API_GENERAL', false, true)
export const findbyIdApi = (stayId) => apiHttp('GET', `${stayPath}/findbyId/${stayId}`)

//checkin
export const getAllSettingsApi = (params) => apiHttp('GET', `${stayPath}/${checkinPath}/getAllSettings`, params)
export const sendPassportImageApi = (formData) => apiHttp('POST', `${stayPath}/${checkinPath}/sendPassportImage`, formData,{},'API_GENERAL',true, true)

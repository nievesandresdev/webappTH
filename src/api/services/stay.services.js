import { apiHttp } from '../axiosApi'
import {
    stayPath,
} from '../config/apiRoute'

export const findAndValidAccessApi = (params) => apiHttp('GET', `${stayPath}/findAndValidAccess`, params)
export const existsAndValidateApi = (params) => apiHttp('GET', `${stayPath}/existsAndValidate`, params)
export const createAndInviteGuestApi = (params) => apiHttp('POST', `${stayPath}/createAndInviteGuest`, params)
export const existingStayThenMatchAndInviteApi = (params) => apiHttp('POST', `${stayPath}/existingStayThenMatchAndInvite`, params)
export const existingThenMatchOrSaveApi = (params) => apiHttp('POST', `${stayPath}/existingThenMatchOrSave`, params)
export const getGuestsAndSortByCurrentguestIdApi = (stayId,guestId) => apiHttp('GET', `${stayPath}/getGuestsAndSortByCurrentguestIdApi/${stayId}/${guestId}`)
export const updateStayAndGuestsApi = (params) => apiHttp('POST', `${stayPath}/updateStayAndGuests`, params)
export const deleteGuestOfStayApi = (stayId,guestId) => apiHttp('POST', `${stayPath}/deleteGuestOfStay/${stayId}/${guestId}`)
export const findbyIdApi = (stayId) => apiHttp('GET', `${stayPath}/findbyId/${stayId}`)
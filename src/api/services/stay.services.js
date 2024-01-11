import { apiHttp } from '../axiosApi'
import {
    stayPath,
} from '../config/apiRoute'

export const findAndValidAccessApi = (params) => apiHttp('GET', `${stayPath}/findAndValidAccess`, params)
export const createAndInviteGuestApi = (params) => apiHttp('POST', `${stayPath}/createAndInviteGuest`, params)
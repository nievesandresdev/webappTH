import { apiHttp } from '../axiosApi'
import {
    guestPath,
    authPath
} from '../config/apiRoute'

export const registerOrLoginWEmailApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/registerOrLoginWEmailApi`, params)
export const updateGuestByIdApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/updateById`, params)
export const confirmPasswordApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/confirmPassword`, params)
export const sendResetLinkEmailApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/sendResetLinkEmail`, params)
export const resetPasswordApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/resetPassword`, params)
export const createTokenSessionByGoogleApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/google/login`, params)
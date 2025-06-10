import { apiHttp } from '../axiosApi'
import {
    guestPath,
    authPath
} from '../config/apiRoute'

export const registerOrLoginWEmailApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/registerOrLoginWEmailApi`, params, {}, 'API_GENERAL', false, true)
export const updateGuestByIdApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/updateById`, params, {}, 'API_GENERAL', false, true)
export const confirmPasswordApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/confirmPassword`, params, {}, 'API_GENERAL', false, true)
export const sendResetLinkEmailApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/sendResetLinkEmail`, params, {}, 'API_GENERAL', false, true)
export const resetPasswordApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/resetPassword`, params, {}, 'API_GENERAL', false, true)
export const createTokenSessionByGoogleApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/google/login`, params, {}, 'API_GENERAL', false, true)
export const createTokenSessionByFacebookApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/facebook/login`, params, {}, 'API_GENERAL', false, true)
export const autenticateWithGuestDemoApi = () => apiHttp('POST', `${guestPath}/${authPath}/guestDefault`, {}, {}, 'API_GENERAL')
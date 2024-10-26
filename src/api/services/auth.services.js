import { apiHttp } from '../axiosApi'
import {
    guestPath,
    authPath
} from '../config/apiRoute'

export const registerOrLoginWEmailApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/registerOrLoginWEmailApi`, params)
export const updateGuestByIdApi = (params) => apiHttp('POST', `${guestPath}/${authPath}/updateById`, params)


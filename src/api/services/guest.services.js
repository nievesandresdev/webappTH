import { apiHttp } from '../axiosApi'
import {
    guestPath,
} from '../config/apiRoute'

export const findByIdApi = (id) => apiHttp('GET', `${guestPath}/findByIdApi/${id}`)
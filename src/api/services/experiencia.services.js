import { apiHttp } from '../axiosApi'
import {
    experiencePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${experiencePath}/getAll`, params)

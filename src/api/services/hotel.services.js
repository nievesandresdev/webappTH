import { apiHttp } from '../axiosApi'
import {
    hotelPath,
} from '../config/apiRoute'

export const findByParamsApi = (params) => apiHttp('GET', `${hotelPath}/findByParams`, params)
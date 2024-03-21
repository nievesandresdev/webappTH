import { apiHttp } from '../axiosApi'
import {
    cityPath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${cityPath}/getAll`, params , { showPreloader: false })
export const getNearCitiesDataApi = () => apiHttp('GET', `${cityPath}/getNearCitiesData`, null , { showPreloader: false })
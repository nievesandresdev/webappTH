import { apiHttp } from '../axiosApi'
import {
    facilityPath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${facilityPath}/getAll`, params)
export const findByIdApi = (id) => apiHttp('GET', `${facilityPath}/findById/${id}`)

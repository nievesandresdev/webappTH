import { apiHttp } from '../axiosApi'
import {
    facilityPath,
} from '../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${facilityPath}/getAll`)
export const findByIdApi = (id) => apiHttp('GET', `${facilityPath}/findById/${id}`)

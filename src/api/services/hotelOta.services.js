import { apiHttp } from '../axiosApi'
import {
    hotelOtaPath,
} from '../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${hotelOtaPath}/getAll` , null , { showPreloader: false })
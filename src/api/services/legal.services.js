import { apiHttp } from '../axiosApi'
import {
    legalPath
} from '../config/apiRoute'

export const getNormsByHotelApi = () => apiHttp('GET', `${legalPath}/getNormsByHotel`, []);
import { apiHttp } from '../axiosApi'
import {
    hotelPath,
} from '../config/apiRoute'

export const findHotelApi = () => apiHttp('GET', `${hotelPath}/find`)
import { apiHttp } from '../axiosApi'
import {
    hotelPath,
} from '../config/apiRoute'

export const findByParamsApi = (params) => apiHttp('GET', `${hotelPath}/findByParams`, params)
export const getCrossellingsApi = () => apiHttp('GET', `${hotelPath}/getAllCrossellings`)
export const getChatHoursApi = () => apiHttp('GET', `${hotelPath}/getChatHours`)
//findById
export const findByIdApi = (id) => apiHttp('GET', `${hotelPath}/findById/${id}`,[],{showPreloader:false})
//staysByHotel
export const staysByHotel = (id) => apiHttp('GET', `${hotelPath}/getStayByHotel/${id}`,[],{showPreloader:false})
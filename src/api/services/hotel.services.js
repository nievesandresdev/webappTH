import { apiHttp } from '../axiosApi'
import {
    hotelPath,
    wifiNetworksPath,
} from '../config/apiRoute'

export const findByParamsApi = (params) => apiHttp('GET', `${hotelPath}/findByParams`, params)
export const getCrossellingsApi = () => apiHttp('GET', `${hotelPath}/getAllCrossellings`)
export const getChatHoursApi = () => apiHttp('GET', `${hotelPath}/getChatHours`)
export const buildUrlWebAppApi = (params) => apiHttp('GET', `${hotelPath}/buildUrlWebApp`, params)
export const getMainDataApi = (params) => apiHttp('GET', `${hotelPath}/getMainData`, params)
export const getDataLegalpi = () => apiHttp('GET', `${hotelPath}/getDataLegal`, [])

export const findByIdApi = (id) => apiHttp('GET', `${hotelPath}/findById/${id}`,[])
export const getRewardsByHotel = (id) => apiHttp('GET', `${hotelPath}/getRewardsByHotel`,[])

//wifi
export const getAllWifiHotel = () => apiHttp('GET', `${hotelPath}/${wifiNetworksPath}/getAllByHotel`,[]);
//getAllByHotelAndVisible
export const getAllByHotelAndVisible = () => apiHttp('GET', `${hotelPath}/${wifiNetworksPath}/getAllByHotelAndVisible`);


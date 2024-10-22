import { apiHttp } from '../axiosApi'
import {
    hotelsReviewPath,
} from '../config/apiRoute'


export const getHotelDetailApi = (params) => apiHttp('GET', `${hotelsReviewPath}/findByParams`, params, {}, 'API_REVIEW')
export const getDataOTASApi = (params) => apiHttp('GET', `hotelOtas/getByParams`,params,{},'API_REVIEW')


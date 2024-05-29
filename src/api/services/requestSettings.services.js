import { apiHttp } from '../axiosApi'
import {
    requestSettingsPath,
} from '../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${requestSettingsPath}/getAll`, [])
export const getPostStayRequestDataApi = () => apiHttp('GET', `${requestSettingsPath}/getPostStayRequestData`, [])

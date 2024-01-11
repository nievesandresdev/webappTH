import { apiHttp } from '../axiosApi'
import {
    utilityPath,
} from '../config/apiRoute'

export const getExpAndPlaceBySaearchApi = (data) => apiHttp('GET', `${utilityPath}/getExpAndPlaceBySaearch`, data)
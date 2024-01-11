import { apiHttp } from '../axiosApi'
import {
    staySurveyPath,
} from '../config/apiRoute'

export const storeApi = (data) => apiHttp('POST', `${staySurveyPath}`, data)
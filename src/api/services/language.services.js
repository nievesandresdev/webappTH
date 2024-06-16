import { apiHttp } from '../axiosApi'
import {
    languagePath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${languagePath}/getAll`, params, {})
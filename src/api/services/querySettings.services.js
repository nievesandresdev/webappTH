import { apiHttp } from '../axiosApi'
import {
    querySettingsPath,
} from '../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${querySettingsPath}/getAll`, [])


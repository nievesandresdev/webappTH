import { apiHttp } from '../axiosApi'
import {
    conforServicePath,
} from '../config/apiRoute'

export const getAllConforApi = (params) => apiHttp('POST', `${conforServicePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');

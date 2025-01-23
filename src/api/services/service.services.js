import { apiHttp } from '../axiosApi'
import {
    conforServicePath,
    transportServicePath,
} from '../config/apiRoute'

export const getAllConforApi = (params) => apiHttp('POST', `${conforServicePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');
export const getAllTransportApi = (params) => apiHttp('POST', `${transportServicePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');

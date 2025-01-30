import { apiHttp } from '../axiosApi'
import {
    conforServicePath,
    transportServicePath,
} from '../config/apiRoute'

export const getAllConforApi = (params) => apiHttp('POST', `${conforServicePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');
export const getAllTransportApi = (params) => apiHttp('POST', `${transportServicePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');

export const findByIdConfortApi = (id, params) => apiHttp('GET', `${conforServicePath}/${id}`, params, { showPreloader: true }, 'API_HELPER');
export const findByIdTransportApi = (id, params) => apiHttp('GET', `${transportServicePath}/${id}`, params, { showPreloader: true }, 'API_HELPER');

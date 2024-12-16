import { apiHttp } from '../axiosApi'
import {
    chainPath
} from '../config/apiRoute'

export const registerOrLoginWEmailApi = (params) => apiHttp('POST', `${chainPath}/registerOrLoginWEmailApi`, params);
export const getHotelsListApi = (params) => apiHttp('GET', `${chainPath}/getHotelsList`, params);
export const findBySubdomainApi = () => apiHttp('GET', `${chainPath}/findBySubdomain/`, {}, { showPreloader: false });
export const getCustomatizacionApi = () => apiHttp('GET', `${chainPath}/getCustomatizacion/`, {}, { showPreloader: false });
export const getStaysGuestByChainApi = (params) => apiHttp('GET', `${chainPath}/getStaysGuest`, params);
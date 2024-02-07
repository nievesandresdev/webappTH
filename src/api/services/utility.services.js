import { apiHttp } from '../axiosApi'
import {
    utilityPath,
} from '../config/apiRoute'

export const getExpAndPlaceBySaearchApi = (data) => apiHttp('GET', `${utilityPath}/getExpAndPlaceBySaearch`, data, { showPreloader: false })
// export const getPhoneCodesApi = () => apiHttp('GET', `${utilityPath}/getPhoneCodesApi`, [], { showPreloader: false })
export const getPhoneCodesApi = () => `${utilityPath}/getPhoneCodesApi`;